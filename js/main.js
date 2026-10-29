/**
 * Studio Wdech: page interactions
 *
 *  1. Mobile navigation toggle
 *  2. Weekly class schedule (day tabs + "sign up" buttons)
 *  3. Scroll-reveal animation for sections
 *  4. Booking form (demo only, nothing is sent anywhere)
 */
(function () {
  "use strict";

  /* ---------- 1. Mobile navigation ---------- */

  var toggle = document.getElementById("menu-toggle");
  var nav = document.getElementById("site-nav");

  var ICON_OPEN = "\u2715";   // ✕
  var ICON_CLOSED = "\u2630"; // ☰

  function setMenu(open) {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? ICON_OPEN : ICON_CLOSED;
  }

  toggle.addEventListener("click", function () {
    setMenu(!nav.classList.contains("open"));
  });

  nav.addEventListener("click", function (event) {
    if (event.target.tagName === "A") {
      setMenu(false);
    }
  });

  /* ---------- 2. Class schedule ---------- */

  var CLASS_LENGTH = "50 min";

  // Sample data. In a real project this would come from the studio's booking system.
  var SCHEDULE = [
    {
      short: "Pon", name: "Poniedziałek",
      classes: [
        { time: "07:30", title: "Reformer", level: "Wszystkie poziomy" },
        { time: "09:00", title: "Mat Pilates", level: "Początkujący" },
        { time: "18:00", title: "Barre", level: "Średni" },
        { time: "19:15", title: "Reformer", level: "Średni" }
      ]
    },
    {
      short: "Wt", name: "Wtorek",
      classes: [
        { time: "08:00", title: "Stretching", level: "Wszystkie poziomy" },
        { time: "17:30", title: "Reformer", level: "Początkujący" },
        { time: "18:45", title: "Mat Pilates", level: "Średni" }
      ]
    },
    {
      short: "Śr", name: "Środa",
      classes: [
        { time: "07:30", title: "Reformer", level: "Wszystkie poziomy" },
        { time: "09:00", title: "Barre", level: "Początkujący" },
        { time: "18:00", title: "Reformer", level: "Początkujący" },
        { time: "19:15", title: "Stretching", level: "Wszystkie poziomy" }
      ]
    },
    {
      short: "Czw", name: "Czwartek",
      classes: [
        { time: "08:00", title: "Mat Pilates", level: "Początkujący" },
        { time: "17:30", title: "Barre", level: "Średni" },
        { time: "18:45", title: "Reformer", level: "Średni" }
      ]
    },
    {
      short: "Pt", name: "Piątek",
      classes: [
        { time: "07:30", title: "Reformer", level: "Wszystkie poziomy" },
        { time: "17:00", title: "Stretching", level: "Wszystkie poziomy" }
      ]
    },
    {
      short: "Sob", name: "Sobota",
      classes: [
        { time: "09:00", title: "Reformer", level: "Początkujący" },
        { time: "10:15", title: "Mat Pilates", level: "Wszystkie poziomy" }
      ]
    },
    {
      short: "Nd", name: "Niedziela",
      classes: [
        { time: "10:00", title: "Stretching", level: "Wszystkie poziomy" },
        { time: "11:15", title: "Reformer", level: "Wszystkie poziomy" }
      ]
    }
  ];

  var dayTabs = document.getElementById("days");
  var slotList = document.getElementById("slots");
  var classInput = document.getElementById("selected-class");
  var bookingSection = document.getElementById("zapis");

  // Small helper: create an element with an optional class and text
  function createElement(tag, className, text) {
    var element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
  }

  function createSlot(day, item) {
    var row = createElement("div", "slot");

    var info = createElement("div");
    info.appendChild(createElement("b", "", item.title));
    info.appendChild(createElement("small", "", item.level + " \u00b7 " + CLASS_LENGTH));

    var button = createElement("button", "", "Zapisz się");
    button.type = "button";
    button.addEventListener("click", function () {
      // Pre-fill the form with the chosen class and jump to it
      classInput.value = day.name + " " + item.time + " \u00b7 " + item.title;
      bookingSection.scrollIntoView({ behavior: "smooth" });
    });

    row.appendChild(createElement("span", "t", item.time));
    row.appendChild(info);
    row.appendChild(button);
    return row;
  }

  function renderDay(index) {
    var day = SCHEDULE[index];

    // Day tabs
    dayTabs.innerHTML = "";
    SCHEDULE.forEach(function (entry, i) {
      var tab = createElement("button", "day", entry.short);
      tab.type = "button";
      tab.setAttribute("aria-pressed", String(i === index));
      tab.addEventListener("click", function () {
        renderDay(i);
      });
      dayTabs.appendChild(tab);
    });

    // Classes for the selected day
    slotList.innerHTML = "";
    day.classes.forEach(function (item) {
      slotList.appendChild(createSlot(day, item));
    });
  }

  renderDay(0);

  /* ---------- 3. Scroll reveal ---------- */

  var blocks = document.querySelectorAll(".rv");

  function reveal(element) {
    element.classList.add("in");
  }

  if (!("IntersectionObserver" in window)) {
    blocks.forEach(reveal);
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    blocks.forEach(function (block) {
      observer.observe(block);
    });
  }

  /* ---------- 4. Booking form (demo) ---------- */

  var form = document.getElementById("booking-form");
  var nameInput = document.getElementById("name");
  var message = document.getElementById("form-message");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!nameInput.value.trim()) {
      message.textContent = "Podaj imię, aby kontynuować.";
      return;
    }

    message.textContent =
      "Dziękuję! To projekt koncepcyjny, formularz nie wysyła danych.";
  });
})();
