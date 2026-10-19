(function () {
  "use strict";

  var config = window.APP_CONFIG || {};
  var apiBaseUrl = config.apiBaseUrl || "/api/people";
  var contactEmail = config.contactEmail || "colaborar@fatos-e-evidencias.example";

  var statusEl = document.getElementById("status");
  var breadcrumbEl = document.getElementById("breadcrumb");
  var headerEl = document.getElementById("person-header");
  var factsSectionEl = document.getElementById("facts-section");
  var factsGridEl = document.getElementById("facts-grid");
  var evidenceModalEl = document.getElementById("evidence-modal");
  var evidenceTitleEl = document.getElementById("evidence-title");
  var evidenceCountEl = document.getElementById("evidence-count");
  var evidenceBodyEl = document.getElementById("evidence-body");
  var btnNext = document.getElementById("btn-next");
  var btnClose = document.getElementById("btn-close");
  var btnCloseIcon = document.getElementById("btn-close-icon");
  var contactLink = document.getElementById("contact-link");

  var currentFacts = [];
  var openFactIndex = -1;

  function setContactLink() {
    if (contactLink) {
      contactLink.href = "mailto:" + contactEmail;
    }
  }

  function extractSlug(pathname) {
    var match = pathname.match(/^\/p\/([^/]+)\/?$/);
    if (!match) {
      return null;
    }
    try {
      return decodeURIComponent(match[1]);
    } catch (err) {
      return match[1];
    }
  }

  function getFactItems() {
    return factsGridEl.querySelectorAll(".fact-item");
  }

  function clearFactOpenState() {
    var items = getFactItems();
    for (var i = 0; i < items.length; i += 1) {
      items[i].classList.remove("is-open");
      var box = items[i].querySelector(".fact-box");
      if (box) {
        box.classList.remove("is-open");
      }
    }
  }

  function isModalOpen() {
    return evidenceModalEl.open === true;
  }

  function countLabel(count, singular, plural) {
    return count + " " + (count === 1 ? singular : plural);
  }

  function showStatus(kind, message) {
    statusEl.hidden = false;
    statusEl.className = "status status--" + kind;
    statusEl.textContent = message;
    breadcrumbEl.hidden = true;
    breadcrumbEl.innerHTML = "";
    headerEl.hidden = true;
    headerEl.innerHTML = "";
    factsSectionEl.hidden = true;
    closeEvidenceModal();
    factsGridEl.innerHTML = "";
  }

  function hideStatus() {
    statusEl.hidden = true;
    statusEl.textContent = "";
    statusEl.className = "status";
  }

  function closeEvidenceModal() {
    openFactIndex = -1;
    clearFactOpenState();
    evidenceTitleEl.textContent = "";
    evidenceCountEl.textContent = "";
    evidenceBodyEl.innerHTML = "";
    if (isModalOpen()) {
      evidenceModalEl.close();
    }
  }

  function formatDate(value) {
    if (!value) {
      return "";
    }
    var parts = String(value).split("-");
    if (parts.length === 3) {
      return parts[2] + "/" + parts[1] + "/" + parts[0];
    }
    return String(value);
  }

  function renderEvidenceRows(fact) {
    var evidences = Array.isArray(fact.evidences) ? fact.evidences : [];
    evidenceTitleEl.textContent = fact.title || "Fato sem título";
    evidenceCountEl.textContent =
      evidences.length === 1
        ? "1 evidência encontrada"
        : evidences.length + " evidências encontradas";
    evidenceBodyEl.innerHTML = "";
    if (evidences.length === 0) {
      var emptyRow = document.createElement("tr");
      var emptyCell = document.createElement("td");
      emptyCell.colSpan = 3;
      emptyCell.textContent = "Nenhuma evidência cadastrada para este fato.";
      emptyRow.appendChild(emptyCell);
      evidenceBodyEl.appendChild(emptyRow);
      return;
    }

    for (var i = 0; i < evidences.length; i += 1) {
      var item = evidences[i];
      var row = document.createElement("tr");

      var titleCell = document.createElement("td");
      var link = document.createElement("a");
      link.href = item.url || "#";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = item.title || "Sem título";
      titleCell.appendChild(link);

      var descCell = document.createElement("td");
      descCell.textContent = item.description || "";

      var dateCell = document.createElement("td");
      dateCell.textContent = formatDate(item.date);

      row.appendChild(titleCell);
      row.appendChild(descCell);
      row.appendChild(dateCell);
      evidenceBodyEl.appendChild(row);
    }
  }

  function openFact(index) {
    if (index < 0 || index >= currentFacts.length) {
      closeEvidenceModal();
      return;
    }

    var fact = currentFacts[index];
    openFactIndex = index;
    clearFactOpenState();

    var items = getFactItems();
    if (items[index]) {
      items[index].classList.add("is-open");
      var box = items[index].querySelector(".fact-box");
      if (box) {
        box.classList.add("is-open");
      }
    }

    renderEvidenceRows(fact);

    if (!isModalOpen()) {
      if (typeof evidenceModalEl.showModal === "function") {
        evidenceModalEl.showModal();
      } else {
        evidenceModalEl.setAttribute("open", "");
      }
    }

    btnClose.focus();
  }

  function renderBreadcrumb(name) {
    breadcrumbEl.hidden = false;
    breadcrumbEl.innerHTML = "";
    var list = document.createElement("ol");
    var homeItem = document.createElement("li");
    var homeLink = document.createElement("a");
    homeLink.href = "/";
    homeLink.textContent = "Início";
    homeItem.appendChild(homeLink);
    var sep = document.createElement("li");
    sep.setAttribute("aria-hidden", "true");
    sep.textContent = "/";
    var current = document.createElement("li");
    current.setAttribute("aria-current", "page");
    current.textContent = name;
    list.appendChild(homeItem);
    list.appendChild(sep);
    list.appendChild(current);
    breadcrumbEl.appendChild(list);
  }

  function renderPerson(person) {
    hideStatus();
    closeEvidenceModal();

    currentFacts = Array.isArray(person.facts) ? person.facts : [];
    var totalEvidences = 0;
    for (var n = 0; n < currentFacts.length; n += 1) {
      if (Array.isArray(currentFacts[n].evidences)) {
        totalEvidences += currentFacts[n].evidences.length;
      }
    }

    renderBreadcrumb(person.name);

    headerEl.hidden = false;
    headerEl.innerHTML = "";

    var photoWrap = document.createElement("div");
    photoWrap.className = "person-hero__photo";
    var img = document.createElement("img");
    img.src = person.photoUrl;
    img.alt = "Foto de " + person.name;
    var accent = document.createElement("div");
    accent.className = "person-hero__accent";
    accent.setAttribute("aria-hidden", "true");
    photoWrap.appendChild(img);
    photoWrap.appendChild(accent);

    var copy = document.createElement("div");
    copy.className = "person-hero__copy";
    var name = document.createElement("h1");
    name.className = "person-hero__name";
    name.textContent = person.name;
    var summary = document.createElement("p");
    summary.className = "person-hero__summary";
    var factWord = currentFacts.length === 1 ? "fato verificado" : "fatos verificados";
    var sustain = currentFacts.length === 1 ? "sustentado" : "sustentados";
    var evidenceWord = totalEvidences === 1 ? "evidência" : "evidências";
    summary.textContent =
      currentFacts.length +
      " " +
      factWord +
      ", " +
      sustain +
      " por " +
      totalEvidences +
      " " +
      evidenceWord +
      ".";
    copy.appendChild(name);
    copy.appendChild(summary);

    headerEl.appendChild(photoWrap);
    headerEl.appendChild(copy);

    document.title = person.name + " — Fatos e Evidências";

    factsGridEl.innerHTML = "";
    factsSectionEl.hidden = false;

    for (var i = 0; i < currentFacts.length; i += 1) {
      (function (index) {
        var fact = currentFacts[index];
        var item = document.createElement("div");
        item.className = "fact-item";
        item.dataset.factIndex = String(index);

        var button = document.createElement("button");
        button.type = "button";
        button.className = "fact-box";
        var title = document.createElement("span");
        title.className = "fact-box__title";
        title.textContent = fact.title || "Fato sem título";

        var evidences = Array.isArray(fact.evidences) ? fact.evidences : [];
        var meta = document.createElement("span");
        meta.className = "fact-box__meta";
        var count = document.createElement("span");
        count.className = "fact-box__count";
        count.textContent = countLabel(evidences.length, "evidência", "evidências");
        var action = document.createElement("span");
        action.className = "fact-box__action";
        action.appendChild(document.createTextNode("Ver"));
        action.insertAdjacentHTML(
          "beforeend",
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg>'
        );
        meta.appendChild(count);
        meta.appendChild(action);

        var underline = document.createElement("span");
        underline.className = "fact-box__underline";
        underline.setAttribute("aria-hidden", "true");

        button.appendChild(title);
        button.appendChild(meta);
        button.appendChild(underline);
        button.addEventListener("click", function () {
          if (openFactIndex === index && isModalOpen()) {
            closeEvidenceModal();
            return;
          }
          openFact(index);
        });

        item.appendChild(button);
        factsGridEl.appendChild(item);
      })(i);
    }
  }

  function loadPerson(slug) {
    showStatus("loading", "Carregando fatos…");

    return fetch(apiBaseUrl + "/" + encodeURIComponent(slug), {
      cache: "no-store",
    })
      .then(function (response) {
        if (response.status === 404) {
          showStatus("not-found", "Indivíduo não encontrado.");
          document.title = "Não encontrado — Fatos e Evidências";
          return null;
        }
        if (!response.ok) {
          throw new Error("HTTP " + response.status);
        }
        return response.json();
      })
      .then(function (data) {
        if (!data) {
          return;
        }
        if (!data.name || !data.photoUrl) {
          throw new Error("JSON inválido");
        }
        renderPerson(data);
      })
      .catch(function () {
        showStatus(
          "error",
          "Não foi possível carregar os dados. Tente novamente mais tarde."
        );
        document.title = "Erro — Fatos e Evidências";
      });
  }

  function init() {
    setContactLink();

    btnClose.addEventListener("click", function () {
      closeEvidenceModal();
    });

    btnCloseIcon.addEventListener("click", function () {
      closeEvidenceModal();
    });

    btnNext.addEventListener("click", function () {
      if (openFactIndex < 0) {
        return;
      }
      var nextIndex = openFactIndex + 1;
      if (nextIndex >= currentFacts.length) {
        closeEvidenceModal();
        return;
      }
      openFact(nextIndex);
    });

    evidenceModalEl.addEventListener("cancel", function (event) {
      event.preventDefault();
      closeEvidenceModal();
    });

    evidenceModalEl.addEventListener("click", function (event) {
      if (event.target === evidenceModalEl) {
        closeEvidenceModal();
      }
    });

    var slug = extractSlug(window.location.pathname);
    if (!slug) {
      showStatus(
        "not-found",
        "Indivíduo não encontrado. Use uma URL no formato /p/<slug>."
      );
      return;
    }

    loadPerson(slug);
  }

  init();
})();
