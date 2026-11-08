/* ============================================================
   STUDIO LADDAGA – Script principale
   - menu mobile
   - invio del form via Formspree (senza ricaricare la pagina)
   - animazioni leggere (nessuna libreria esterna)
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
      var applyFilter = function () {
        posts.forEach(function (post) {
          post.hidden = cat !== "tutti" && post.getAttribute("data-category") !== cat;
          if (!post.hidden) shown++;
        });
        if (count) count.textContent = shown + (shown === 1 ? " articolo" : " articoli");
      };
      if (document.startViewTransition && !calmMotion && !document.hidden) {
        document.startViewTransition(applyFilter);
      } else {
        applyFilter();
      }
    });
  });

  /* ---------- La linea dei 4 passi avanza con lo scorrimento ---------- */
  var steps = document.querySelector(".steps");
  var calmMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (steps && !calmMotion) {
    var stepItems = Array.prototype.slice.call(steps.querySelectorAll(".step"));
    steps.classList.add("steps--live");
    var ticking = false;
    var updateSteps = function () {
      var rect = steps.getBoundingClientRect();
      var view = window.innerHeight;
      var progress = (view * 0.85 - rect.top) / (rect.height + view * 0.35);
      var p = Math.min(1, Math.max(0, progress));
      steps.style.setProperty("--p", p.toFixed(3));
      // Ogni passo si accende quando la linea lo raggiunge
      stepItems.forEach(function (item, i) {
        item.classList.toggle("is-on", p >= (i + 0.1) / stepItems.length);
      });
      ticking = false;
    };
    var requestUpdate = function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateSteps);
      }
    };
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    updateSteps();
  }

  /* ---------- Intestazione: si stacca dalla pagina quando si scorre ---------- */
  var siteHeader = document.querySelector(".site-header");
  if (siteHeader) {
    var headerTicking = false;
    var updateHeader = function () {
      siteHeader.classList.toggle("is-scrolled", window.scrollY > 8);
      headerTicking = false;
    };
    window.addEventListener("scroll", function () {
      if (!headerTicking) {
        headerTicking = true;
        window.requestAnimationFrame(updateHeader);
      }
    }, { passive: true });
    updateHeader();
  }

  /* ---------- Menu: si chiude toccando fuori o con Esc ---------- */
  if (toggle && nav) {
    var closeNav = function () {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Apri il menu");
    };
    document.addEventListener("click", function (e) {
      if (nav.classList.contains("is-open") && !e.target.closest("#main-nav, .nav-toggle")) closeNav();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ---------- Barra rapida: nascosta se ripete i pulsanti visibili o mentre si scrive ---------- */
  var quickBar = document.querySelector(".quick-bar");
  if (quickBar) {
    var heroButtons = document.querySelector(".hero__copy .hero__actions, .page-hero__actions");
    var buttonsVisible = false;
    var typing = false;
    var updateBar = function () {
      quickBar.classList.toggle("is-hidden", buttonsVisible || typing);
    };
    if (heroButtons && "IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        buttonsVisible = entries[0].isIntersecting;
        updateBar();
      }, { rootMargin: "-65px 0px 0px 0px" }).observe(heroButtons);
    }
    document.addEventListener("focusin", function (e) {
      if (e.target.matches("input, textarea, select")) { typing = true; updateBar(); }
    });
    document.addEventListener("focusout", function () {
      typing = false;
      updateBar();
    });
  }

  /* ---------- Comparsa discreta: una volta sola, solo con JavaScript attivo ---------- */
  if (!calmMotion && "IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

    document.querySelectorAll(".service, .home-visit__photo, .approccio__photo, #blog .post-card, .booking-card")
      .forEach(function (el) {
        // Elementi vicini compaiono uno dopo l'altro, con un ritardo minimo
        var siblings = Array.prototype.indexOf.call(el.parentNode.children, el);
        el.style.setProperty("--d", Math.min(siblings, 5) * 70 + "ms");
        el.classList.add("anim");
        revealObserver.observe(el);
      });
  }

  /* ---------- Dal blog all'articolo: la foto della scheda diventa la copertina ---------- */
  document.querySelectorAll(".post-card").forEach(function (card) {
    card.addEventListener("click", function () {
      var photo = card.querySelector("img");
      if (photo && !calmMotion) photo.style.viewTransitionName = "copertina";
    });
  });
  window.addEventListener("pageshow", function () {
    document.querySelectorAll(".post-card img").forEach(function (photo) {
      photo.style.viewTransitionName = "";
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
