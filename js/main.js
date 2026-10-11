/* ============================================================
   STUDIO LADDAGA – Script principale
   - menu mobile
   - invio del form via Formspree (senza ricaricare la pagina)
   - animazione "reveal" discreta
   - anno corrente nel footer
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Menu mobile ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Chiudi il menu" : "Apri il menu");
    });

    // Chiude il menu quando si clicca una voce
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Anno corrente nel footer ---------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Filtro per area nell'indice del blog ---------- */
  var filters = document.querySelectorAll(".filter-pill");
  var posts = document.querySelectorAll(".post-card[data-category]");
  var count = document.getElementById("blog-count");
  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var cat = btn.getAttribute("data-filter");
      var shown = 0;
      filters.forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
      posts.forEach(function (post) {
        post.hidden = cat !== "tutti" && post.getAttribute("data-category") !== cat;
        if (!post.hidden) shown++;
      });
      if (count) count.textContent = shown + (shown === 1 ? " articolo" : " articoli");
    });
  });

  /* ---------- Invio del form (Formspree) ---------- */
  var form = document.getElementById("booking-form");
  if (!form) return;

  var status = form.querySelector(".form__status");
  var button = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Se l'ID di Formspree non è ancora stato configurato, avvisa chi gestisce il sito
    if (form.action.indexOf("IL_TUO_ID") !== -1) {
      setStatus("Il modulo non è ancora attivo: configura l'ID di Formspree (vedi il commento nell'HTML).", true);
      return;
    }

    setStatus("Invio in corso…", false);
    button.disabled = true;

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(function (res) {
        if (res.ok) {
          form.reset();
          setStatus("Richiesta inviata. Ti ricontatterò al più presto!", false, true);
        } else {
          return res.json().then(function () {
            setStatus("Si è verificato un errore. Riprova oppure scrivimi su WhatsApp.", true);
          });
        }
      })
      .catch(function () {
        setStatus("Connessione non riuscita. Riprova oppure scrivimi su WhatsApp.", true);
      })
      .finally(function () {
        button.disabled = false;
      });
  });

  function setStatus(msg, isError, isOk) {
    if (!status) return;
    status.textContent = msg;
    status.classList.toggle("is-error", !!isError);
    status.classList.toggle("is-ok", !!isOk);
  }
})();
