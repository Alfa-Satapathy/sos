

(function () {
  "use strict";
  function initMobileMenu() {
    const menuToggle = document.querySelector(".mobile-menu-toggle");
    const closeBtn = document.querySelector(".close-icon-menu");
    const sidebar = document.getElementById("side-bar");

    if (!menuToggle && !sidebar) return;
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
    const menuLinks = document.querySelectorAll(".mainmenu a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }
  function fixViewportHeight() {
    function updateViewportHeight() {
      const vh = globalThis.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }

    updateViewportHeight();
    globalThis.addEventListener("resize", updateViewportHeight);
    globalThis.addEventListener("orientationchange", updateViewportHeight);
  }
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
  function initLazyLoad() {
    if ("IntersectionObserver" in globalThis) {
      const images = document.querySelectorAll("img[data-src]");

      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            delete img.dataset.src;
            observer.unobserve(img);
          }
        });
      });

      images.forEach((img) => imageObserver.observe(img));
    }
  }
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
  function handleOrientationChange() {
    globalThis.addEventListener("orientationchange", () => {
      setTimeout(() => {
        const header = document.querySelector(".header-one");
        if (header) {
          header.style.transition = "";
        }
      }, 100);
    });
  }
  function fixFullHeight() {
    const elements = document.querySelectorAll("[style*='height: 100vh']");
    elements.forEach((el) => {
      el.style.height = "calc(var(--vh, 1vh) * 100)";
    });
  }
  function init() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
      return;
    }

    detectDevice();
    fixViewportHeight();
    preventZoomOnFocus();
    initSmoothScroll();
    initLazyLoad();
    handleOrientationChange();
    fixFullHeight();
    initMobileMenu();
  }
  init();
  globalThis.MobileOptimizer = {
    init: init,
    fixViewportHeight: fixViewportHeight,
    initMobileMenu: initMobileMenu,
  };
})();
