/* ====================================================
   NEW MOBILE NAVIGATION JAVASCRIPT
   Fresh implementation - completely independent system
   ==================================================== */

(function () {
  "use strict";

  // ========== MOBILE NAVIGATION INITIALIZATION ==========
  function initMobileNavigation() {
    // Create mobile nav HTML
    const mobileNavHTML = `
      <div class="mobile-nav-wrapper" id="mobileNavWrapper">
        <div class="mobile-nav-backdrop" id="mobileNavBackdrop"></div>
        <div class="mobile-nav-panel" id="mobileNavPanel">
          <div class="mobile-nav-header">
            <div class="mobile-nav-logo">
              <img src="${getImagePath('logo/02.svg')}" alt="SOS Infocity" />
            </div>
            <button class="mobile-nav-close" id="mobileNavClose" aria-label="Close menu">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <ul class="mobile-nav-menu" id="mobileNavMenu">
            <li><a href="${getNavPath('index.html')}">Home</a></li>
            <li><a href="${getNavPath('pages/about.html')}">About</a></li>
            <li class="has-submenu">
              <a href="javascript:void(0);" class="mobile-nav-main-link">
                Solutions
                <span class="mobile-nav-toggle-arrow"><i class="fas fa-chevron-down"></i></span>
              </a>
              <ul class="mobile-nav-submenu">
                <li><a href="${getNavPath('pages/ai-intelligent-solutions.html')}">AI-Based & Intelligent Technology</a></li>
                <li><a href="${getNavPath('pages/it-network-solutions.html')}">IT & Network Solutions</a></li>
                <li><a href="${getNavPath('pages/security-surveillance.html')}">Security & Surveillance</a></li>
                <li><a href="${getNavPath('pages/connectivity-solutions.html')}">Connectivity Solutions</a></li>
                <li><a href="${getNavPath('pages/data-bi-analytics.html')}">Data & BI Analytics</a></li>
                <li><a href="${getNavPath('pages/new-age-technologies.html')}">New Age Technologies</a></li>
                <li><a href="${getNavPath('pages/software-engineering.html')}">Software Engineering Services</a></li>
              </ul>
            </li>
            <li><a href="${getNavPath('pages/impact.html')}">Impact</a></li>
            <li><a href="${getNavPath('pages/life-at-sos.html')}">Life at SOS</a></li>
            <li><a href="${getNavPath('pages/connect.html')}">Contact</a></li>
          </ul>
          <div class="mobile-nav-cta">
            <a href="${getNavPath('pages/connect.html')}">Get Started</a>
          </div>
        </div>
      </div>
    `;

    // Insert mobile nav into body
    const navContainer = document.createElement("div");
    navContainer.innerHTML = mobileNavHTML;
    document.body.insertBefore(navContainer.firstElementChild, document.body.firstChild);

    // Add hamburger button to header
    const header = document.querySelector(".header-one");
    if (header) {
      const headerWrapper = header.querySelector(".header-wrapper-main");
      if (headerWrapper) {
        const hamburger = document.createElement("button");
        hamburger.className = "mobile-menu-btn";
        hamburger.id = "mobileMenuBtn";
        hamburger.setAttribute("aria-label", "Open menu");
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        headerWrapper.insertBefore(hamburger, headerWrapper.firstChild);
      }
    }

    // Get references to elements
    const mobileNavWrapper = document.getElementById("mobileNavWrapper");
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mobileNavClose = document.getElementById("mobileNavClose");
    const mobileNavBackdrop = document.getElementById("mobileNavBackdrop");
    const mobileNavMenu = document.getElementById("mobileNavMenu");

    if (!mobileNavWrapper || !mobileMenuBtn) return;

    // ========== OPEN/CLOSE FUNCTIONS ==========
    function openMenu() {
      mobileNavWrapper.classList.add("active");
      document.body.classList.add("mobile-nav-open");
      mobileMenuBtn.setAttribute("aria-expanded", "true");
    }

    function closeMenu() {
      mobileNavWrapper.classList.remove("active");
      document.body.classList.remove("mobile-nav-open");
      mobileMenuBtn.setAttribute("aria-expanded", "false");
    }

    // ========== EVENT LISTENERS ==========
    // Open menu on hamburger click
    mobileMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openMenu();
    });

    // Close menu on close button click
    mobileNavClose.addEventListener("click", (e) => {
      e.stopPropagation();
      closeMenu();
    });

    // Close menu on backdrop click
    mobileNavBackdrop.addEventListener("click", closeMenu);

    // ========== SUBMENU TOGGLE ==========
    const submenuItems = mobileNavMenu.querySelectorAll(".has-submenu > a");
    submenuItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const parentLi = item.closest(".has-submenu");
        parentLi.classList.toggle("active");
      });
    });

    // ========== CLOSE ON LINK CLICK ==========
    const allLinks = mobileNavMenu.querySelectorAll("a");
    allLinks.forEach((link) => {
      // Don't close for submenu toggles
      if (!link.classList.contains("mobile-nav-main-link")) {
        link.addEventListener("click", () => {
          closeMenu();
        });
      }
    });

    // Close CTA button link
    const ctaLink = document.querySelector(".mobile-nav-cta a");
    if (ctaLink) {
      ctaLink.addEventListener("click", closeMenu);
    }

    // ========== PREVENT SCROLL PROPAGATION ==========
    const mobileNavPanel = document.getElementById("mobileNavPanel");
    if (mobileNavPanel) {
      mobileNavPanel.addEventListener("touchmove", (e) => {
        e.stopPropagation();
      });
    }

    // ========== PREVENT BODY SCROLL WHEN MENU OPEN ==========
    document.addEventListener("touchmove", (e) => {
      if (mobileNavWrapper.classList.contains("active")) {
        if (!mobileNavPanel.contains(e.target)) {
          e.preventDefault();
        }
      }
    });

    // ========== CLOSE MENU ON ESCAPE KEY ==========
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileNavWrapper.classList.contains("active")) {
        closeMenu();
      }
    });

    // ========== WINDOW RESIZE HANDLING ==========
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        // Close menu if window is resized to desktop size
        if (window.innerWidth > 1199) {
          closeMenu();
        }
      }, 250);
    });

    // ========== EXPOSE API ==========
    window.MobileNav = {
      open: openMenu,
      close: closeMenu,
      toggle: () => {
        if (mobileNavWrapper.classList.contains("active")) {
          closeMenu();
        } else {
          openMenu();
        }
      },
    };
  }

  // ========== HELPER FUNCTIONS ==========
  function getImagePath(imagePath) {
    // Determine if we're on a page or index
    const isPage = window.location.pathname.includes("/pages/");
    return isPage ? `../assets/images/${imagePath}` : `assets/images/${imagePath}`;
  }

  function getNavPath(path) {
    const isPage = window.location.pathname.includes("/pages/");
    if (path.startsWith("pages/")) {
      return isPage ? path.replace("pages/", "") : path;
    }
    if (path === "index.html") {
      return isPage ? "../index.html" : "index.html";
    }
    return isPage ? `../${path}` : path;
  }

  // ========== INITIALIZE ==========
  function init() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
      return;
    }
    initMobileNavigation();
  }

  init();
})();
