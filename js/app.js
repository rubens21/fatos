(function () {
  "use strict";

  var config = window.APP_CONFIG || {};
  var apiBaseUrl = config.apiBaseUrl || "/api/people";
  var contactEmail = config.contactEmail || "colaborar@fatos-e-evidencias.example";

  var statusEl = document.getElementById("status");
  var headerEl = document.getElementById("person-header");
  var factsSectionEl = document.getElementById("facts-section");
  var factsGridEl = document.getElementById("facts-grid");
  var evidenceModalEl = document.getElementById("evidence-modal");
  var evidenceTitleEl = document.getElementById("evidence-title");
  var evidenceBodyEl = document.getElementById("evidence-body");
  var btnNext = document.getElementById("btn-next");
  var btnClose = document.getElementById("btn-close");
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

  function showStatus(kind, message) {
    statusEl.hidden = false;
    statusEl.className = "status status--" + kind;
    statusEl.textContent = message;
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
    evidenceTitleEl.textContent = "Evidências: " + fact.title;
    evidenceBodyEl.innerHTML = "";

    var evidences = Array.isArray(fact.evidences) ? fact.evidences : [];
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

  function renderPerson(person) {
    hideStatus();
    closeEvidenceModal();

    headerEl.hidden = false;
    headerEl.innerHTML = "";
    var img = document.createElement("img");
    img.className = "person-header__photo";
    img.src = person.photoUrl;
    img.alt = "Foto de " + person.name;
    var name = document.createElement("h1");
    name.className = "person-header__name";
    name.textContent = person.name;
    headerEl.appendChild(img);
    headerEl.appendChild(name);

    document.title = person.name + " — Fatos e Evidências";

    currentFacts = Array.isArray(person.facts) ? person.facts : [];
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
        button.appendChild(title);
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
