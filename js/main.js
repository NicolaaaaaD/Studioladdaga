/* ============================================================
   Studio Laddaga — JavaScript condiviso (home, blog, articoli)
   1. Menu hamburger su mobile
   2. Invio del form di prenotazione a Formspree (solo home)
   Vanilla JS, nessuna dipendenza.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- 1. Menu hamburger ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  if (toggle && nav) {
    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Chiudi il menu" : "Apri il menu");
    }

    toggle.addEventListener("click", function () {
      setOpen(!nav.classList.contains("is-open"));
    });

    // Chiude il menu quando si sceglie una voce (utile per le ancore della home)
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });

    // Chiude il menu con il tasto Esc
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* ---------- 2. Form di prenotazione (Formspree) ----------
     Senza JavaScript il form funziona comunque con l'invio classico
     verso l'URL dell'attributo action. */
  var form = document.getElementById("booking-form");
  if (!form) return;

  var status = form.querySelector(".form-status");
  var button = form.querySelector("button[type=submit]");

  function show(msg, cls) {
    status.textContent = msg;
    status.className = "form-status" + (cls ? " " + cls : "");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Finché l'ID Formspree non è stato inserito, avvisa invece di fallire
    if (form.action.indexOf("IL_TUO_ID") !== -1) {
      show("Il modulo non è ancora attivo: per ora chiamami o scrivimi su WhatsApp.", "err");
      return;
    }

    button.disabled = true;
    show("Invio in corso…");

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(function (res) {
        if (!res.ok) throw new Error("Invio non riuscito");
        form.reset();
        show("Grazie! Ti ricontatterò al più presto per fissare l'appuntamento.", "ok");
      })
      .catch(function () {
        show("Qualcosa non ha funzionato. Riprova oppure scrivimi su WhatsApp.", "err");
      })
      .finally(function () {
        button.disabled = false;
      });
  });
})();
