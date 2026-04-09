


(function ($) {
  'use strict';
  const isLowPowerDevice = () => {
    return globalThis.matchMedia('(max-width: 991px)').matches ||
      globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };
  const runWhenBrowserIdle = (callback, fallbackDelay = 120) => {
    if ('requestIdleCallback' in globalThis) {
      globalThis.requestIdleCallback(callback, { timeout: 1200 });
      return;
    }

    globalThis.setTimeout(callback, fallbackDelay);
  };
  const attemptPlay = function (video) {
    if (!video) {
      return;
    }

    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(function () { });
    }
  };

  const registerPlaybackHooks = function (video) {
    ['loadedmetadata', 'loadeddata', 'canplay'].forEach(function (eventName) {
      video.addEventListener(eventName, function () {
        attemptPlay(video);
      }, { passive: true });
    });
  };

  const revealElement = function (element) {
    if (!element || element.dataset.animationInitialized === 'true') {
      return;
    }

    element.dataset.animationInitialized = 'true';
    element.classList.add('rts-text-visible');
  };

  const rtsJs = {
    m: function (e) {
      rtsJs.d();
      rtsJs.methods();
    },
    d: function (e) {
      this._window = $(globalThis);
      this._document = $(document);
      this._body = $('body');
      this._html = $('html');
    },
    methods: function (e) {
      const lowPowerMode = isLowPowerDevice();

      rtsJs.preloader();
      rtsJs.sideMenu();
      rtsJs.backtoTop();
      rtsJs.vedioActivation();
      rtsJs.odoMeter();
      rtsJs.smoothScroll();
      rtsJs.optimizeBackgroundVideos();

      runWhenBrowserIdle(function () {
        rtsJs.swiperActivation();

        rtsJs.splitText(lowPowerMode);


      });
    },

    preloader: function () {
      const hideLoader = function () {
        document.querySelector('body').classList.add("loaded");
        const loaderWrapper = document.querySelector('.loader-wrapper');
        if (loaderWrapper) {
          loaderWrapper.classList.add("loaded");
        }
      };
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', hideLoader);
      } else {
        hideLoader();
      }
      setTimeout(hideLoader, 1500);
    },
    sideMenu: function () {
      $('#mobile-menu-active').metisMenu();
      $(document).on('click', '.menu-btn-toggle', function () {
        $("#side-bar").addClass("show");
        $("#anywhere-home").addClass("bgshow");
      });
      $(document).on('click', '.close-icon-menu', function () {
        $("#side-bar").removeClass("show");
        $("#anywhere-home").removeClass("bgshow");
      });
      $(document).on('click', '#anywhere-home', function () {
        $("#side-bar").removeClass("show");
        $("#anywhere-home").removeClass("bgshow");
      });
      $(document).on('click', '.onepage .mainmenu li a', function () {
        $("#side-bar").removeClass("show");
        $("#anywhere-home").removeClass("bgshow");
      });
    },
    swiperActivation: function () {
      const createSwiper = function (selector, options) {
        if (typeof Swiper === 'undefined' || !document.querySelector(selector)) {
          return null;
        }

        return new Swiper(selector, options);
      };

      $(document).ready(function () {
        createSwiper(".mySwiper-digital-agency-brand", {
          slidesPerView: 6,
          spaceBetween: 30,
          loop: true,
          speed: 1000,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          autoplay: {
            delay: 3000, // Slide will change every 3 seconds
            disableOnInteraction: false, // keeps autoplay on even if user interacts
          },
          breakpoints: {
            1500: {
              slidesPerView: 6,
            },
            1300: {
              slidesPerView: 5,
            },
            991: {
              slidesPerView: 4,
              centeredSlides: false,
            },
            767: {
              slidesPerView: 4,
              centeredSlides: false,
            },
            575: {
              slidesPerView: 3,
            },
            450: {
              slidesPerView: 3,
            },
            0: {
              slidesPerView: 2,
            }
          },
        });
      });
      $(document).ready(function () {
        createSwiper(".mySwiper-testimonails", {
          slidesPerView: 3.8,
          spaceBetween: 30,
          loop: true,
          speed: 1000,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          autoplay: {
            delay: 3000, // Slide will change every 3 seconds
            disableOnInteraction: false, // keeps autoplay on even if user interacts
          },
          breakpoints: {
            1500: {
              slidesPerView: 3.5,
            },
            1300: {
              slidesPerView: 3,
            },
            991: {
              slidesPerView: 2,
              centeredSlides: false,
            },
            767: {
              slidesPerView: 2,
              centeredSlides: false,
            },
            575: {
              slidesPerView: 1,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });
      });
      $(document).ready(function () {
        createSwiper(".mySwiper-testimonails-four", {
          slidesPerView: 3.8,
          spaceBetween: 30,
          loop: true,
          speed: 1000,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          autoplay: {
            delay: 3000, // Slide will change every 3 seconds
            disableOnInteraction: false, // keeps autoplay on even if user interacts
          },
          breakpoints: {
            1500: {
              slidesPerView: 3.4,
            },
            1300: {
              slidesPerView: 3,
            },
            991: {
              slidesPerView: 2,
              centeredSlides: false,
            },
            767: {
              slidesPerView: 2,
              centeredSlides: false,
            },
            575: {
              slidesPerView: 1,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });
      });
      $(document).ready(function () {
        createSwiper(".mySwiper-testimonials-three", {
          slidesPerView: 1,
          spaceBetween: 30,
          loop: true,
          speed: 1000,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          autoplay: {
            delay: 3000, // Slide will change every 3 seconds
            disableOnInteraction: false, // keeps autoplay on even if user interacts
          },
          breakpoints: {
            1500: {
              slidesPerView: 1,
            },
            1300: {
              slidesPerView: 1,
            },
            991: {
              slidesPerView: 1,
              centeredSlides: false,
            },
            767: {
              slidesPerView: 1,
              centeredSlides: false,
            },
            575: {
              slidesPerView: 1,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });
      });
        const productSwiper = createSwiper(".mySwiper-product-cards", {
          slidesPerView: 2,
          spaceBetween: 24,
          loop: true,
          speed: 900,
          pagination: {
            el: ".product-cards-pagination",
            clickable: true,
          },
          autoplay: {
            delay: 2800,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          },
          breakpoints: {
            1200: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 2,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });

        const productSliderEl = document.querySelector(".mySwiper-product-cards");

        if (productSliderEl && productSwiper) {
          let productWheelLocked = false;
          let productWheelUnlockTimeout;

          productSliderEl.addEventListener("wheel", function (event) {
            const wheelDelta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX;

            if (wheelDelta === 0) {
              return;
            }

            event.preventDefault();

            if (productWheelLocked || productSwiper.animating) {
              return;
            }

            productWheelLocked = true;

            if (wheelDelta < 0) {
              productSwiper.slideNext();
            } else {
              productSwiper.slidePrev();
            }

            clearTimeout(productWheelUnlockTimeout);
            productWheelUnlockTimeout = setTimeout(function () {
              productWheelLocked = false;
            }, 280);
          }, { passive: false });
        }
        const caseSwiper = createSwiper(".mySwiper-case-one", {
          slidesPerView: 4,
          spaceBetween: 30,
          loop: true,
          speed: 1000,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          breakpoints: {
            1500: {
              slidesPerView: 4,
            },
            1300: {
              slidesPerView: 4,
            },
            991: {
              slidesPerView: 3,
              centeredSlides: false,
            },
            767: {
              slidesPerView: 2,
              centeredSlides: false,
            },
            575: {
              slidesPerView: 1,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });

        const caseSliderEl = document.querySelector(".mySwiper-case-one");

        if (caseSliderEl && caseSwiper) {
          let caseWheelLocked = false;
          let caseWheelUnlockTimeout;

          caseSliderEl.addEventListener("wheel", function (event) {
            const wheelDelta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX;

            if (wheelDelta === 0) {
              return;
            }

            event.preventDefault();

            if (caseWheelLocked || caseSwiper.animating) {
              return;
            }

            caseWheelLocked = true;

            if (wheelDelta > 0) {
              caseSwiper.slideNext();
            } else {
              caseSwiper.slidePrev();
            }

            clearTimeout(caseWheelUnlockTimeout);
            caseWheelUnlockTimeout = setTimeout(function () {
              caseWheelLocked = false;
            }, 280);
          }, { passive: false });
        }
      $(document).ready(function () {
        createSwiper(".mySwiper-service-main", {
          slidesPerView: 3.8,
          spaceBetween: 30,
          loop: true,
          speed: 1000,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          breakpoints: {
            1500: {
              slidesPerView: 3.8,
            },
            1300: {
              slidesPerView: 3,
            },
            991: {
              slidesPerView: 2,
              centeredSlides: false,
            },
            767: {
              slidesPerView: 2,
              centeredSlides: false,
            },
            575: {
              slidesPerView: 1,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });
      });
      $(document).ready(function () {
        createSwiper(".mySwiper-blog", {
          slidesPerView: 3,
          spaceBetween: 30,
          loop: true,
          speed: 1000,
          pagination: {
            el: ".mySwiper-blog .swiper-pagination",
            clickable: true,
          },
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          breakpoints: {
            1500: {
              slidesPerView: 3,
            },
            1300: {
              slidesPerView: 3,
            },
            991: {
              slidesPerView: 2,
              centeredSlides: false,
            },
            767: {
              slidesPerView: 1,
              centeredSlides: false,
            },
            575: {
              slidesPerView: 1,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });
      });
      $(document).ready(function () {
        createSwiper(".mySwiper-brand-three", {
          slidesPerView: 6,
          spaceBetween: 30,
          loop: true,
          speed: 1000,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          breakpoints: {
            1500: {
              slidesPerView: 6,
            },
            1300: {
              slidesPerView: 5,
            },
            991: {
              slidesPerView: 4,
              centeredSlides: false,
            },
            767: {
              slidesPerView: 4,
              centeredSlides: false,
            },
            575: {
              slidesPerView: 3,
            },
            0: {
              slidesPerView: 3,
            }
          },
        });
      });
      $(document).ready(function () {
        createSwiper(".mySwiper-testimoanils-agency", {
          slidesPerView: 1,
          spaceBetween: 0,
          loop: true,
          speed: 1000,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
      });
      $(document).ready(function () {
        createSwiper(".mySwiper-brand-2", {
          slidesPerView: 5,
          spaceBetween: 60,
          loop: true,
          speed: 700,
          centeredSlides: true,
          autoplay: {
            delay: 2000,
            disableOnInteraction: false,
          },
          breakpoints: {
            320: {
              slidesPerView: 3,
              spaceBetween: 25,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 25,
            },
            980: {
              slidesPerView: 5,
              spaceBetween: 25,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 25,
            }
          },
        });
      });
      $(document).ready(function () {
        createSwiper(".mySwiper-team-one", {
          slidesPerView: 4,
          spaceBetween: 30,
          loop: true,
          speed: 1000,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          breakpoints: {
            1500: {
              slidesPerView: 4,
            },
            1300: {
              slidesPerView: 4,
            },
            991: {
              slidesPerView: 3,
              centeredSlides: false,
            },
            767: {
              slidesPerView: 2,
              centeredSlides: false,
            },
            575: {
              slidesPerView: 1,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });
      });
      $(document).ready(function () {
        createSwiper(".mySwiper-banner-one", {
          slidesPerView: 1,
          spaceBetween: 0,
          effect: "fade",
          loop: true,
          speed: 1500,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },

          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          breakpoints: {
            1500: {
              slidesPerView: 1,
            },
            1300: {
              slidesPerView: 1,
            },
            991: {
              slidesPerView: 1,
              centeredSlides: false,
            }
          },
        });
      });
      $(document).ready(function () {
        createSwiper(".mySwiper-brand-7", {
          slidesPerView: 3,
          spaceBetween: 30,
          loop: true,
          speed: 1500,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },

          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          breakpoints: {
            1500: {
              slidesPerView: 3,
            },
            1300: {
              slidesPerView: 2,
            },
            991: {
              slidesPerView: 2,
              centeredSlides: false,
            },
            768: {
              slidesPerView: 2,
              centeredSlides: false,
            },
            576: {
              slidesPerView: 2,
              centeredSlides: false,
            }
          },
        });
      });
      $(document).ready(function () {
        createSwiper(".mySwiper-brand-list", {
          slidesPerView: 6,
          spaceBetween: 30,
          loop: true,
          speed: 1500,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },

          autoplay: {
            delay: 2000,
            disableOnInteraction: false,
          },
          breakpoints: {
            1500: {
              slidesPerView: 6,
            },
            1300: {
              slidesPerView: 6,
            },
            991: {
              slidesPerView: 5,
              centeredSlides: false,
            },
            768: {
              slidesPerView: 4,
              centeredSlides: false,
            },
            568: {
              slidesPerView: 3,
              centeredSlides: false,
            },
            0: {
              slidesPerView: 3,
              centeredSlides: false,
            }
          },
        });
      });


    },

    optimizeBackgroundVideos: function () {
      const backgroundVideos = document.querySelectorAll('.cta-bg-video, .banner-video');
      if (!backgroundVideos.length) return;

      backgroundVideos.forEach(function (video) {
        registerPlaybackHooks(video);
        attemptPlay(video);
      });

      document.addEventListener('visibilitychange', function () {
        if (document.visibilityState !== 'visible') {
          return;
        }

        backgroundVideos.forEach(function (video) {
          if (video.paused) {
            attemptPlay(video);
          }
        });
      });

      const replayOnFirstInteraction = function () {
        backgroundVideos.forEach(function (video) {
          if (video.paused) {
            attemptPlay(video);
          }
        });

        document.removeEventListener('touchstart', replayOnFirstInteraction);
        document.removeEventListener('click', replayOnFirstInteraction);
      };

      document.addEventListener('touchstart', replayOnFirstInteraction, { passive: true, once: true });
      document.addEventListener('click', replayOnFirstInteraction, { passive: true, once: true });

      if ('IntersectionObserver' in globalThis) {
        const observer = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            const video = entry.target;

            if (entry.isIntersecting) {
              attemptPlay(video);
              return;
            }

            if (video.classList.contains('cta-bg-video')) {
              video.pause();
            }
          });
        }, {
          threshold: 0.1
        });

        backgroundVideos.forEach(function (video) {
          observer.observe(video);
        });
      }
    },

    splitText: function (lowPowerMode) {
      if (!$('.rts-text-anime-style-1').length) {
        return;
      }

      const animatedTextElements = Array.from(document.querySelectorAll('.rts-text-anime-style-1'));

      animatedTextElements.forEach(function (element) {
        element.classList.add('rts-text-reveal');
      });

      if (lowPowerMode) {
        animatedTextElements.forEach(revealElement);
        return;
      }

      if ('IntersectionObserver' in globalThis) {
        const observer = new IntersectionObserver(function (entries, observer) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              revealElement(entry.target);
              observer.unobserve(entry.target);
            }
          });
        }, {
          rootMargin: '160px 0px',
          threshold: 0.01,
        });

        animatedTextElements.forEach(function (element) {
          observer.observe(element);
        });

        return;
      }

      animatedTextElements.forEach(revealElement);
    },



    backtoTop: function () {
      $(document).ready(function () {
        "use strict";

        const progressWrap = document.querySelector('.progress-wrap');
        if (!progressWrap) return;

        if (isLowPowerDevice()) {
          const offset = 50;
          const toggleProgress = function () {
            progressWrap.classList.toggle('active-progress', globalThis.scrollY > offset);
          };

          globalThis.addEventListener('scroll', toggleProgress, { passive: true });
          toggleProgress();

          progressWrap.addEventListener('click', function (event) {
            event.preventDefault();
            globalThis.scrollTo({ top: 0, behavior: 'smooth' });
          });

          return;
        }

        const progressPath = progressWrap.querySelector('path');
        if (!progressPath) return;
        const pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
        const updateProgress = function () {
          const scroll = $(globalThis).scrollTop();
          const height = $(document).height() - $(globalThis).height();
          const progress = pathLength - (scroll * pathLength / height);
          progressPath.style.strokeDashoffset = progress;
        }
        updateProgress();
        $(globalThis).scroll(updateProgress);
        const offset = 50;
        const duration = 550;
        jQuery(globalThis).on('scroll', function () {
          if (jQuery(this).scrollTop() > offset) {
            jQuery('.progress-wrap').addClass('active-progress');
          } else {
            jQuery('.progress-wrap').removeClass('active-progress');
          }
        });
        jQuery('.progress-wrap').on('click', function (event) {
          event.preventDefault();
          jQuery('html, body').animate({ scrollTop: 0 }, duration);
          return false;
        })


      });
    },

    stickyHeader: function (e) {
      
      $(globalThis).scroll(function () {
        if ($(this).scrollTop() > 150) {
          $('.header--sticky').addClass('sticky')
        } else {
          $('.header--sticky').removeClass('sticky')
        }
      })

    },

    vedioActivation: function () {
      $(document).ready(function () {
        $('.popup-youtube, .popup-video').magnificPopup({
          type: 'iframe',
          mainClass: 'mfp-fade',
          removalDelay: 160,
          preloader: false,
          fixedContentPos: false
        });
      });
    },

    odoMeter: function () {
      function triggerOdometer(element) {
          const $element = $(element);
          if (!$element.hasClass('odometer-triggered')) {
            const countNumber = $element.attr('data-count');
            $element.html(countNumber);
            $element.addClass('odometer-triggered'); // Add a class to prevent re-triggering
          }
        }

        const odometerElements = document.querySelectorAll('.odometer');
        if (!odometerElements.length) return;

        if ('IntersectionObserver' in globalThis) {
          const observer = new IntersectionObserver(
            function (entries, obs) {
              entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                  triggerOdometer(entry.target);
                  obs.unobserve(entry.target);
                }
              });
            },
            {
              threshold: 0.25,
              rootMargin: '0px 0px -10% 0px'
            }
          );

          odometerElements.forEach(function (element) {
            observer.observe(element);
          });

          return;
        }

        function isInViewport(element) {
          const rect = element.getBoundingClientRect();
          return (
            rect.top >= 0 &&
            rect.bottom <= (globalThis.innerHeight || document.documentElement.clientHeight)
          );
        }

        function handleOdometer() {
          $('.odometer').each(function () {
            if (isInViewport(this)) {
              triggerOdometer(this);
            }
          });
        }
        handleOdometer();
        $(globalThis).on('scroll', function () {
          handleOdometer();
        });
    },

    smoothScroll: function (e) {
      $(document).on('click', '.onepage a[href^="#"]', function (event) {
        event.preventDefault();

        $('html, body').animate({
          scrollTop: $($.attr(this, 'href')).offset().top
        }, 300);
      });
    }
  }

  rtsJs.m();

  $(document).ready(function () {
      $('#ce-toggle').change(function () {
        const isChecked = $(this).is(':checked');
        if (isChecked) {
          $('.plan-toggle-wrap').removeClass('active');
          $('#monthly').show();
          $('#yearly').hide();
        } else {
          $('.plan-toggle-wrap').addClass('active');
          $('#monthly').hide();
          $('#yearly').show();
        }
      });
      $('#ce-toggle').trigger('change');
    });

  document.addEventListener('DOMContentLoaded', function () {
      // Set copyright year in footer
      const yearEl = document.getElementById('footer-year');
      if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

      // Apply background images from data-bg-src — validate to local image paths only
      const bgPattern = /^[a-zA-Z0-9_/.-]+\.(?:webp|jpg|jpeg|png|gif|svg)(?:\?[a-zA-Z0-9=&_-]*)?$/;
      document.querySelectorAll('[data-bg-src]').forEach(function (el) {
        const bg = el.dataset.bgSrc;
        if (bg && bgPattern.test(bg)) {
          el.style.backgroundImage = 'url(' + bg + ')';
          el.style.backgroundSize = 'cover';
          el.style.backgroundPosition = 'center';
          el.style.backgroundRepeat = 'no-repeat';
        }
      });
    });
})(jQuery)







