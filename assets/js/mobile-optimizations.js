/* ====================================================
   MOBILE OPTIMIZATION JAVASCRIPT
   Enhances mobile user experience across all pages
   ==================================================== */

(function () {
  "use strict";

  // ========== MOBILE MENU FUNCTIONALITY ==========
  function initMobileMenu() {
    const menuToggle = document.querySelector(".mobile-menu-toggle");
    const closeBtn = document.querySelector(".close-icon-menu");
    const sidebar = document.getElementById("side-bar");
    const menuOverlay = document.querySelector(".body-overlay");

    if (!menuToggle && !sidebar) return;

    // Create overlay if doesn't exist
    let overlay = document.querySelector(".mobile-menu-overlay");
    if (!overlay && sidebar) {
      overlay = document.createElement("div");
      overlay.className = "mobile-menu-overlay";
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
        display: none;
        opacity: 0;
        transition: opacity 0.3s ease;
      `;
      document.body.appendChild(overlay);
    }

    function toggleMenu() {
      if (sidebar) {
        sidebar.classList.toggle("active");
        if (overlay) {
          overlay.style.display = sidebar.classList.contains("active")
            ? "block"
            : "none";
          setTimeout(() => {
            if (sidebar.classList.contains("active")) {
              overlay.style.opacity = "1";
            } else {
              overlay.style.opacity = "0";
            }
          }, 10);
        }
      }
    }

    function closeMenu() {
      if (sidebar) {
        sidebar.classList.remove("active");
        if (overlay) {
          overlay.style.opacity = "0";
          setTimeout(() => {
            overlay.style.display = "none";
          }, 300);
        }
      }
    }

    if (menuToggle) {
      menuToggle.addEventListener("click", toggleMenu);
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", closeMenu);
    }

    if (overlay) {
      overlay.addEventListener("click", closeMenu);
    }

    // Close menu on link click
    const menuLinks = document.querySelectorAll(".mainmenu a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }

  // ========== VIEWPORT HEIGHT FIX FOR MOBILE BROWSERS ==========
  function fixViewportHeight() {
    function updateViewportHeight() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }

    updateViewportHeight();
    window.addEventListener("resize", updateViewportHeight);
    window.addEventListener("orientationchange", updateViewportHeight);
  }

  // ========== PREVENT ZOOM ON INPUT FOCUS ==========
  function preventZoomOnFocus() {
    const inputs = document.querySelectorAll("input, textarea, select");
    inputs.forEach((input) => {
      input.addEventListener("focus", function () {
        if (window.innerWidth < 768) {
          document.documentElement.style.fontSize = "16px";
        }
      });
    });
  }

  // ========== SMOOTH SCROLL WITH OFFSET FOR STICKY HEADER ==========
  function initSmoothScroll() {
    const headerHeight =
      document.querySelector(".header-one")?.offsetHeight || 60;

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (href === "#") return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
          const offsetTop = target.offsetTop - headerHeight;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      });
    });
  }

  // ========== TOUCH FEEDBACK FOR BUTTONS ==========
  function initTouchFeedback() {
    const buttons = document.querySelectorAll(
      "button, a.rts-btn, a.button, .round-btn",
    );

    buttons.forEach((btn) => {
      btn.addEventListener("touchstart", function () {
        this.style.opacity = "0.8";
      });

      btn.addEventListener("touchend", function () {
        this.style.opacity = "1";
      });
    });
  }

  // ========== LAZY LOAD IMAGES ==========
  function initLazyLoad() {
    if ("IntersectionObserver" in window) {
      const images = document.querySelectorAll("img[data-src]");

      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute("data-src");
            img.removeAttribute("data-src");
            observer.unobserve(img);
          }
        });
      });

      images.forEach((img) => imageObserver.observe(img));
    }
  }

  // ========== DETECT DEVICE TYPE ==========
  function detectDevice() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isTablet = /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent);

    if (isMobile && !isTablet) {
      document.body.classList.add("is-mobile");
    } else if (isTablet) {
      document.body.classList.add("is-tablet");
    } else {
      document.body.classList.add("is-desktop");
    }
  }

  // ========== HANDLE ORIENTATION CHANGE ==========
  function handleOrientationChange() {
    window.addEventListener("orientationchange", () => {
      // Give the browser time to update dimensions
      setTimeout(() => {
        // Adjust any layout issues that might occur with orientation change
        const header = document.querySelector(".header-one");
        if (header) {
          header.style.transition = "none";
          setTimeout(() => {
            header.style.transition = "";
          }, 100);
        }
      }, 100);
    });
  }

  // ========== FIX 100VH ON MOBILE ==========
  function fixFullHeight() {
    const elements = document.querySelectorAll("[style*='height: 100vh']");
    elements.forEach((el) => {
      el.style.height = "calc(var(--vh, 1vh) * 100)";
    });
  }

  // ========== DISABLE DOUBLE TAP ZOOM ==========
  function disableDoubleTapZoom() {
    let lastTouchEnd = 0;
    document.addEventListener(
      "touchend",
      function (event) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
          event.preventDefault();
        }
        lastTouchEnd = now;
      },
      false,
    );
  }

  // ========== HANDLE BACK BUTTON ==========
  function handleBackButton() {
    if (
      window.location.pathname !== "/" &&
      window.location.pathname !== "/index.html"
    ) {
      // Can add back button functionality if needed
    }
  }

  // ========== CHECK NETWORK STATUS ==========
  function initNetworkStatus() {
    function updateNetworkStatus() {
      if (!navigator.onLine) {
        console.warn("Device is offline");
        // Could show a notification here
      }
    }

    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);
  }

  // ========== INITIALIZE ALL ON DOM READY ==========
  function init() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
      return;
    }

    detectDevice();
    fixViewportHeight();
    preventZoomOnFocus();
    initSmoothScroll();
    initTouchFeedback();
    initLazyLoad();
    handleOrientationChange();
    fixFullHeight();
    disableDoubleTapZoom();
    handleBackButton();
    initNetworkStatus();
    initMobileMenu();
  }

  // Start initialization
  init();

  // Expose utilities globally if needed
  window.MobileOptimizer = {
    init: init,
    fixViewportHeight: fixViewportHeight,
    initMobileMenu: initMobileMenu,
  };
})();
