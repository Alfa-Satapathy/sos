/* ====================================================
   NEW MOBILE NAVIGATION JAVASCRIPT
   Fresh implementation - completely independent system
   ==================================================== */

(function () {
  "use strict";

  function normalizePath(pathname) {
    const clean = (pathname || "").replace(/\\/g, "/").split("?")[0].split("#")[0];
    if (!clean || clean === "/") return "/index.html";
    if (clean.endsWith("/")) return `${clean}index.html`;
    return clean;
  }

  function markCurrentLinks(root) {
    if (!root) return;

    const currentPath = normalizePath(window.location.pathname);
    const links = root.querySelectorAll('a[href]:not([href="#"]):not([href^="javascript"])');

    links.forEach((link) => {
      let linkPath = "";
      try {
        linkPath = normalizePath(new URL(link.getAttribute("href"), window.location.href).pathname);
      } catch {
        return;
      }

      const isMatch =
        linkPath === currentPath ||
        (linkPath.endsWith("/index.html") && currentPath.endsWith("/index.html") && linkPath === currentPath);

      if (isMatch) {
        link.classList.add("is-current");
        link.setAttribute("aria-current", "page");

        const parentDropdown = link.closest("li.has-dropdown, li.has-droupdown, li.has-submenu");
        if (parentDropdown) {
          const parentLink = parentDropdown.querySelector(":scope > a");
          if (parentLink) {
            parentLink.classList.add("is-current");
            parentLink.setAttribute("aria-current", "page");
          }
        }
      }
    });
  }

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
            <a href="${getNavPath('pages/connect.html')}">Contact Us</a>
            <a href="javascript:void(0);" aria-disabled="true" title="Workspace login link pending">Workspace Login</a>
            <a href="javascript:void(0);" aria-disabled="true" title="Access mail link pending">Access Mail</a>
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
        hamburger.innerHTML =
          '<span class="hamburger" aria-hidden="true"><span></span><span></span><span></span></span>';
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
      mobileMenuBtn.classList.add("is-open");
    }

    function closeMenu() {
      mobileNavWrapper.classList.remove("active");
      document.body.classList.remove("mobile-nav-open");
      mobileMenuBtn.setAttribute("aria-expanded", "false");
      mobileMenuBtn.classList.remove("is-open");
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
    const ctaLinks = document.querySelectorAll(".mobile-nav-cta a");
    ctaLinks.forEach((ctaLink) => {
      ctaLink.addEventListener("click", closeMenu);
    });

    // ========== PREVENT SCROLL PROPAGATION ==========
    const mobileNavPanel = document.getElementById("mobileNavPanel");
    if (mobileNavPanel) {
      mobileNavPanel.addEventListener("touchmove", (e) => {
        e.stopPropagation();
      });
    }

    // ========== PREVENT BODY SCROLL WHEN MENU OPEN ==========
    document.addEventListener(
      "touchmove",
      (e) => {
      if (mobileNavWrapper.classList.contains("active")) {
        if (!mobileNavPanel.contains(e.target)) {
          e.preventDefault();
        }
      }
      },
      { passive: false }
    );

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
    const pathname = window.location.pathname.replace(/\\/g, "/");
    const isNestedPage = pathname.includes("/pages/") || pathname.includes("/blog/");
    return isNestedPage ? `../assets/images/${imagePath}` : `assets/images/${imagePath}`;
  }

  function getNavPath(path) {
    const pathname = window.location.pathname.replace(/\\/g, "/");
    const isPage = pathname.includes("/pages/");
    const isBlog = pathname.includes("/blog/");
    if (path.startsWith("pages/")) {
      if (isPage) {
        return path.replace("pages/", "");
      }
      if (isBlog) {
        return `../${path}`;
      }
      return path;
    }
    if (path === "index.html") {
      return isPage || isBlog ? "../index.html" : "index.html";
    }
    return isPage || isBlog ? `../${path}` : path;
  }

  // ========== INITIALIZE ==========
  function init() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
      return;
    }
    initMobileNavigation();
    markCurrentLinks(document.querySelector(".header-one .nav-area"));
    markCurrentLinks(document.getElementById("mobileNavMenu"));
  }

  init();
})();
