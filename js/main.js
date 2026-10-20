(function () {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const fmt = n => n.toLocaleString("fr-FR").replace(/ /g, " ") + " FCFA";
  const img = f => "image/" + f;

  /* header + menu */
  const header = $(".header");
  const onScroll = () => header.classList.toggle("solid", scrollY > 60);
  addEventListener("scroll", onScroll); onScroll();
  const burger = $(".burger"), menu = $(".menu");
  burger.addEventListener("click", () => {
    burger.classList.toggle("open"); menu.classList.toggle("open");
  });
  $$(".menu a").forEach(a => a.addEventListener("click", () => { burger.classList.remove("open"); menu.classList.remove("open"); }));

  /* reveal */
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
  $$(".reveal").forEach(el => io.observe(el));

  /* selects */
  $$("select[data-quartier]").forEach(s => {
    s.innerHTML = '<option value="">Tous les quartiers</option>' + QUARTIERS.map(q => `<option>${q}</option>`).join("");
  });
  $$("select[data-budget]").forEach(s => {
    s.innerHTML = '<option value="">Tous les budgets</option>' + BUDGETS.map(b => `<option value="${b.v}">${b.l}</option>`).join("");
  });

  /* property card */
  const card = p => `
    <article class="prop reveal">
      <div class="prop-img" data-open="${p.id}">
        <img src="${img(p.images[0])}" alt="${p.title} à ${p.quartier}, Douala" loading="lazy">
        <span class="tag">${p.type}</span>
        <span class="count">${p.images.length} photos</span>
      </div>
      <div class="prop-body">
        <h3>${p.title}</h3>
        <p class="loc">${p.quartier}, Douala</p>
        <div class="meta"><span>${p.chambres}</span><span>${p.surface}</span></div>
        <p class="price">${fmt(p.price)} / mois</p>
        <div class="prop-actions">
          <button class="btn btn-dark" data-open="${p.id}">Voir photos</button>
          <a class="btn btn-wa" target="_blank" rel="noopener" href="https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Bonjour, je suis intéressé par : " + p.title + " (" + p.quartier + ").")}">WhatsApp</a>
        </div>
      </div>
    </article>`;

  const bindCards = root => {
    $$("[data-open]", root).forEach(el => el.addEventListener("click", () => openLb(el.dataset.open)));
    $$(".reveal", root).forEach(el => io.observe(el));
  };

  /* home featured */
  const feat = $("#featured");
  if (feat) { feat.innerHTML = PROPERTIES.map(card).join(""); bindCards(feat); }

  /* catalog */
  const list = $("#catalog");
  if (list) {
    const fType = $("#f-type"), fQ = $("#f-quartier"), fB = $("#f-budget"), cnt = $("#result-count");
    const params = new URLSearchParams(location.search);
    if (params.get("quartier")) fQ.value = params.get("quartier");
    if (params.get("budget")) fB.value = params.get("budget");
    const render = () => {
      const b = BUDGETS.find(x => x.v === fB.value);
      const res = PROPERTIES.filter(p =>
        (!fType.value || p.type === fType.value) &&
        (!fQ.value || p.quartier === fQ.value) &&
        (!b || (p.price >= b.min && p.price < b.max)));
      cnt.textContent = res.length + (res.length > 1 ? " propriétés trouvées" : " propriété trouvée");
      list.innerHTML = res.length ? res.map(card).join("") :
        `<p class="empty">Aucune propriété ne correspond à ces critères pour le moment.<br>Appelez-nous au <a href="tel:+237656976989"><b>656 976 989</b></a>, nous avons d'autres biens disponibles.</p>`;
      bindCards(list);
    };
    [fType, fQ, fB].forEach(f => f.addEventListener("change", render));
    $("#f-reset").addEventListener("click", () => { fType.value = fQ.value = fB.value = ""; render(); });
    render();
  }

  /* lightbox */
  const lb = $(".lb");
  let cur = null, idx = 0;
  function show() {
    const p = cur;
    $(".lb img", lb).src = img(p.images[idx]);
    $(".lb-cap", lb).textContent = `${p.title} — ${p.quartier} (${idx + 1}/${p.images.length})`;
    $$(".lb-thumbs img", lb).forEach((t, i) => t.classList.toggle("on", i === idx));
  }
  function openLb(id) {
    cur = PROPERTIES.find(p => p.id === id); idx = 0;
    $(".lb-thumbs", lb).innerHTML = cur.images.map((f, i) => `<img src="${img(f)}" data-i="${i}" alt="">`).join("");
    $$(".lb-thumbs img", lb).forEach(t => t.addEventListener("click", () => { idx = +t.dataset.i; show(); }));
    lb.classList.add("open"); document.body.style.overflow = "hidden"; show();
  }
  const closeLb = () => { lb.classList.remove("open"); document.body.style.overflow = ""; };
  const step = d => { idx = (idx + d + cur.images.length) % cur.images.length; show(); };
  if (lb) {
    $(".lb-x", lb).onclick = closeLb;
    $(".lb-p", lb).onclick = () => step(-1);
    $(".lb-n", lb).onclick = () => step(1);
    lb.addEventListener("click", e => { if (e.target === lb) closeLb(); });
    addEventListener("keydown", e => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") closeLb();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });
  }

  /* hero search -> catalogue */
  const hs = $("#hero-search");
  if (hs) hs.addEventListener("submit", e => {
    e.preventDefault();
    const q = new URLSearchParams();
    if (hs.quartier.value) q.set("quartier", hs.quartier.value);
    if (hs.budget.value) q.set("budget", hs.budget.value);
    location.href = "proprietes.html" + (q.toString() ? "?" + q : "");
  });

  /* contact form -> WhatsApp */
  const cf = $("#contact-form");
  if (cf) cf.addEventListener("submit", e => {
    e.preventDefault();
    const d = new FormData(cf);
    const msg = `Bonjour Gane Luxury Homes,\nNom : ${d.get("nom")}\nTéléphone : ${d.get("tel")}\nBesoin : ${d.get("besoin")}\nQuartier : ${d.get("quartier") || "—"}\nBudget : ${d.get("budget") || "—"}\n\n${d.get("message") || ""}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
  });
})();
