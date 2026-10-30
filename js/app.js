
(() => {
  "use strict";
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const CUSTOMER_KEY = "shalom_demo_customers_v1";
  const ENQUIRY_KEY = "shalom_demo_enquiries_v1";
  const readList = key => {
    try { const value = JSON.parse(localStorage.getItem(key) || "[]"); return Array.isArray(value) ? value : []; }
    catch { return []; }
  };
  const writeList = (key, list) => localStorage.setItem(key, JSON.stringify(list));
  const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, ch => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[ch]));
  const setNotice = message => {
    let node = $("#site-notice");
    if (!node) { node = document.createElement("div"); node.id = "site-notice"; node.className = "site-notice"; node.setAttribute("role","status"); document.body.append(node); }
    node.textContent = message; node.classList.add("visible");
    window.setTimeout(() => node.classList.remove("visible"), 4000);
  };
  const validateForm = form => {
    let valid = true;
    $$("input,select,textarea", form).forEach(field => {
      field.classList.remove("validation-error");
      if (!field.checkValidity()) { field.classList.add("validation-error"); valid = false; }
    });
    const message = $(".form-message", form);
    if (message) {
      message.className = "form-message" + (valid ? " success" : " error");
      message.textContent = valid ? "" : "Please check the highlighted fields and complete all required information correctly.";
    }
    if (!valid) form.reportValidity();
    return valid;
  };
  const whatsappUrl = text => "https://wa.me/27810738145?text=" + encodeURIComponent(text);

  document.addEventListener("DOMContentLoaded", () => {
    const nav = $(".nav-tabs");
    const toggle = $(".menu-toggle");
    const currentPage = location.pathname.split("/").pop() || "index.html";
    if (nav) $$(".nav-tabs a").forEach(link => {
      if ((link.getAttribute("href") || "").split("/").pop() === currentPage) {
        link.classList.add("active"); link.setAttribute("aria-current","page");
      }
    });
    if (toggle && nav) toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
      toggle.textContent = open ? "☰ Menu" : "✕ Close";
    });

    // Cross-page search uses a small searchable index, so it also works when opened as a local HTML file.
    const pages = [
      {title:"Home", url:"index.html", body:"Shalom TopUp Funeral Policy affordable funeral cover rural communities contact offices phone WhatsApp"},
      {title:"About", url:"about.html", body:"mission history vision values trustworthy affordable funeral cover"},
      {title:"Products & Benefits", url:"products.html", body:"body collection burial arrangement coffin 50 funeral programmes tent decoration audio setup grave site obituary"},
      {title:"Enquiry", url:"enquiry.html", body:"ask questions premiums policy plan waiting periods benefits enquiry form"},
      {title:"Contact & Locations", url:"contact.html", body:"Mthatha Cape Town office address phone WhatsApp 081 073 8145 073 925 6401"},
      {title:"Customer Registration", url:"register.html", body:"register customer applicant contact details consent policy interest"},
      {title:"Premium calculator", url:"index.html#premium-calculator", body:"R130 R150 monthly premium R50 joining fee estimate transport"},
      {title:"Policy rules", url:"index.html#benefits", body:"six month waiting period accidental death first premium suicide 12 months entry age 18 84"}
    ];
    const search = $("#site-search-input"), results = $("#site-search-results"), clear = $("#site-search-clear");
    const renderSearch = () => {
      if (!search || !results) return;
      const term = search.value.trim().toLocaleLowerCase();
      results.replaceChildren();
      if (!term) return;
      const found = pages.filter(page => (page.title + " " + page.body).toLocaleLowerCase().includes(term));
      if (!found.length) { results.textContent = "No matching pages found. Try “premium”, “benefits” or “contact”."; return; }
      found.forEach(page => {
        const card = document.createElement("div"); card.className = "search-result";
        const a = document.createElement("a"); a.href = page.url; a.textContent = page.title;
        const p = document.createElement("p"); p.textContent = page.body;
        card.append(a,p); results.append(card);
      });
    };
    search?.addEventListener("input", renderSearch);
    clear?.addEventListener("click", () => { if (search) search.value = ""; renderSearch(); search?.focus(); });

    // Calculator deliberately uses the published range and does not invent a transport surcharge.
    $("#premium-form")?.addEventListener("submit", event => {
      event.preventDefault();
      const members = Number($("#members-count")?.value);
      const plan = $("#plan-choice")?.value;
      const result = $("#premium-result");
      if (!Number.isInteger(members) || members < 1 || members > 30) {
        result.innerHTML = "<p>Please enter a number of family members between 1 and 30.</p>"; return;
      }
      const monthlyLow = 130, monthlyHigh = 150, joining = 50;
      result.innerHTML = `<p>Indicative monthly premium</p><p class="result-amount">R${monthlyLow}–R${monthlyHigh}</p><p>Once-off joining fee: R${joining}</p><p>Indicative first-month total: <strong>R${monthlyLow + joining}–R${monthlyHigh + joining}</strong></p><p>Family members to discuss: ${members}</p>${plan === "transport" ? "<p><strong>Transport selected:</strong> confirm the applicable rate directly with Shalom.</p>" : ""}<p class="fine-print">The published rate depends on plan and transport. Family count does not alter this estimate because a per-person rate was not supplied.</p>`;
    });

    // Enquiry form validates locally and offers a prefilled WhatsApp message.
    $("#quick-enquiry-form")?.addEventListener("submit", event => {
      event.preventDefault();
      const form = event.currentTarget;
      if (!validateForm(form)) return;
      const data = new FormData(form);
      const message = `Shalom TopUp Funeral Policy enquiry\nName: ${data.get("name")}\nPhone: ${data.get("phone")}\nTopic: ${data.get("topic")}\nMessage: ${data.get("message")}`;
      const url = whatsappUrl(message);
      const status = $(".form-message", form);
      if (status) { status.className = "form-message success"; status.textContent = "Your enquiry is valid. WhatsApp will open with a prepared message; review it before sending."; }
      const wa = $(".whatsapp-link", form); if (wa) wa.href = url;
      window.open(url, "_blank", "noopener");
      const list = readList(ENQUIRY_KEY);
      list.push({ id: Date.now(), name: String(data.get("name")), phone: String(data.get("phone")), topic: String(data.get("topic")), message: String(data.get("message")), createdAt: new Date().toISOString() });
      try { writeList(ENQUIRY_KEY, list); } catch { /* Storage may be unavailable; WhatsApp still works. */ }
    });

    // Registration is a local demo record, not an insurance application.
    $("#registration-form")?.addEventListener("submit", event => {
      event.preventDefault();
      const form = event.currentTarget;
      if (!validateForm(form)) return;
      const data = new FormData(form);
      const customers = readList(CUSTOMER_KEY);
      const email = String(data.get("email") || "").trim().toLowerCase();
      if (email && customers.some(c => String(c.email || "").toLowerCase() === email)) {
        const status = $(".form-message", form); status.className = "form-message error"; status.textContent = "A demo registration with this email already exists."; return;
      }
      const record = {
        id: "SH-" + Date.now().toString().slice(-8),
        name: String(data.get("name")).trim(), phone: String(data.get("phone")).trim(),
        email, age: Number(data.get("age")), area: String(data.get("area")).trim(),
        interest: String(data.get("interest")), createdAt: new Date().toISOString()
      };
      customers.push(record);
      try { writeList(CUSTOMER_KEY, customers); }
      catch { const status = $(".form-message", form); status.className = "form-message error"; status.textContent = "Could not save this demo record in your browser. Please try again."; return; }
      const status = $(".form-message", form); status.className = "form-message success"; status.textContent = `Thank you, ${record.name}. Demo registration ${record.id} was saved in this browser only. Shalom must confirm your application separately.`;
      form.reset();
    });

    // Demo admin dashboard: browser-local records only. This is not secure authentication.
    if ($("#admin-dashboard")) {
      const refreshAdmin = () => {
        const customers = readList(CUSTOMER_KEY), enquiries = readList(ENQUIRY_KEY);
        $("#customer-count").textContent = customers.length;
        $("#enquiry-count").textContent = enquiries.length;
        $("#latest-count").textContent = [...customers,...enquiries].filter(r => Date.now() - Date.parse(r.createdAt || 0) < 7*86400000).length;
        const customerBody = $("#admin-customers");
        customerBody.innerHTML = customers.length ? customers.slice().reverse().map(c => `<tr><td>${escapeHtml(c.id)}</td><td>${escapeHtml(c.name)}</td><td>${escapeHtml(c.phone)}</td><td>${escapeHtml(c.email || "—")}</td><td>${escapeHtml(c.interest || "—")}</td><td><button class="small-button delete-customer" data-id="${escapeHtml(c.id)}">Delete</button></td></tr>`).join("") : '<tr><td colspan="6">No demo registrations yet.</td></tr>';
        const enquiryBody = $("#admin-enquiries");
        enquiryBody.innerHTML = enquiries.length ? enquiries.slice().reverse().map(e => `<tr><td>${escapeHtml(new Date(e.createdAt).toLocaleString())}</td><td>${escapeHtml(e.name)}</td><td>${escapeHtml(e.phone)}</td><td>${escapeHtml(e.topic)}</td><td>${escapeHtml(e.message)}</td></tr>`).join("") : '<tr><td colspan="5">No saved demo enquiries yet.</td></tr>';
      };
      refreshAdmin();
      $("#admin-dashboard").addEventListener("click", event => {
        const button = event.target.closest(".delete-customer");
        if (!button) return;
        if (!window.confirm("Delete this demo registration from this browser?")) return;
        writeList(CUSTOMER_KEY, readList(CUSTOMER_KEY).filter(c => c.id !== button.dataset.id)); refreshAdmin();
      });
      $("#export-customers")?.addEventListener("click", () => {
        const records = readList(CUSTOMER_KEY);
        const csvCell = value => '"' + String(value ?? "").replace(/"/g,'""') + '"';
        const csv = [["ID","Name","Phone","Email","Age","Area","Interest","Created"], ...records.map(c => [c.id,c.name,c.phone,c.email,c.age,c.area,c.interest,c.createdAt])].map(row => row.map(csvCell).join(",")).join("\r\n");
        const blob = new Blob([csv], {type:"text/csv;charset=utf-8;"});
        const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href=url; a.download="shalom-demo-customers.csv"; a.click(); URL.revokeObjectURL(url);
      });
      $("#clear-demo-data")?.addEventListener("click", () => {
        if (!window.confirm("Clear all demo registrations and enquiries saved in this browser? This cannot be undone.")) return;
        localStorage.removeItem(CUSTOMER_KEY); localStorage.removeItem(ENQUIRY_KEY); refreshAdmin();
      });
    }

    // Scroll-to-top.
    let top = $("#back-to-top");
    if (!top) { top = document.createElement("button"); top.id = "back-to-top"; top.type = "button"; top.textContent = "↑"; top.setAttribute("aria-label","Back to top"); document.body.append(top); }
    const updateTop = () => top.classList.toggle("visible", window.scrollY > 300);
    window.addEventListener("scroll", updateTop, {passive:true}); updateTop();
    top.addEventListener("click", () => window.scrollTo({top:0,behavior:"smooth"}));

    const copyright = $(".footer-left p");
    if (copyright) copyright.innerHTML = "&copy; " + new Date().getFullYear() + " Shalom Funeral Policy. All rights reserved.";
  });
})();
