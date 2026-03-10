/*=== Javascript function indexing hear===========

1.counterUp ----------(Its use for counting number)
2.stickyHeader -------(header class sticky)
3.wowActive ----------( Waw js plugins activation)
4.swiperJs -----------(All swiper in this website hear)
5.salActive ----------(Sal animation for card and all text)
6.textChanger --------(Text flip for banner section)
7.timeLine -----------(History Time line)
8.datePicker ---------(On click date calender)
9.timePicker ---------(On click time picker)
10.timeLineStory -----(History page time line)
11.vedioActivation----(Vedio activation)
12.searchOption ------(search open)
13.cartBarshow -------(Cart sode bar)
14.sideMenu ----------(Open side menu for desktop)
15.Back to top -------(back to top)
16.filterPrice -------(Price filtering)

==================================================*/


(function ($) {
  'use strict';
  let device_width = window.innerWidth;
  const isLowPowerDevice = () => {
    return window.matchMedia('(max-width: 991px)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };
  const runWhenBrowserIdle = (callback, fallbackDelay = 120) => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(callback, { timeout: 1200 });
      return;
    }

    window.setTimeout(callback, fallbackDelay);
  };
  var rtsJs = {
    m: function (e) {
      rtsJs.d();
      rtsJs.methods();
    },
    d: function (e) {
      this._window = $(window),
        this._document = $(document),
        this._body = $('body'),
        this._html = $('html')
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

        if (!lowPowerMode) {
          rtsJs.fonklsAnimation();
          rtsJs.splitText();
          rtsJs.productStickyAnimation();
        }
      });
    },
    fonklsAnimation: function () {
          let endTl = gsap.timeline({
              repeat: -1,
              delay: 0.2,
              scrollTrigger: {
                  trigger: '.end',
                  start: 'bottom 100%-=50px'
              }
          });
          gsap.set('.end', {
              opacity: 0
          });
          gsap.to('.end', {
              opacity: 1,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                  trigger: '.end',
                  start: 'bottom 100%-=50px',
                  once: true
              }
          });
          let mySplitText = new SplitText(".end", {
              type: "words,chars"
          });
          let chars = mySplitText.chars;
          endTl.to(chars, {
              duration: 0.5,
              scaleY: 0.9,
              ease: "power3.out",
              stagger: 0.04,
              transformOrigin: 'center bottom'
          });
          endTl.to(chars, {
              yPercent: -10,
              ease: "elastic",
              stagger: 0.03,
              duration: 0.8
          }, 0.5);
          endTl.to(chars, {
              scaleY: 1,
              ease: "elastic.out(2.5, 0.2)",
              stagger: 0.03,
              duration: 1.5
          }, 0.5);
          endTl.to(chars, {

              ease: "power2.out",
              stagger: 0.03,
              duration: 0.3
          }, 0.5);
          endTl.to(chars, {
              yPercent: 0,
              ease: "back",
              stagger: 0.03,
              duration: 0.8
          }, 0.7);
          endTl.to(chars, {
              // color: '#b19777',
              duration: 1.4,
              stagger: 0.05
          });
    },
    preloader: function () {
      // Hide loader quickly using DOMContentLoaded (when HTML is parsed)
      // instead of waiting for all resources (images, videos, fonts) to load
      const hideLoader = function () {
        document.querySelector('body').classList.add("loaded");
        const loaderWrapper = document.querySelector('.loader-wrapper');
        if (loaderWrapper) {
          loaderWrapper.classList.add("loaded");
        }
      };

      // Use DOMContentLoaded - fires when HTML is parsed, not when all resources load
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', hideLoader);
      } else {
        // DOM already loaded
        hideLoader();
      }

      // Fallback: Force hide loader after 3 seconds max
      setTimeout(hideLoader, 3000);
    },
    sideMenu: function () {
      // metismenu active
      $('#mobile-menu-active').metisMenu();

      // collups menu side right
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
        var swiper = createSwiper(".mySwiper-digital-agency-brand", {
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
        var swiper = createSwiper(".mySwiper-testimonails", {
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
        var swiper = createSwiper(".mySwiper-testimonails-four", {
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
        var swiper = createSwiper(".mySwiper-testimonials-three", {
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
      $(document).ready(function () {
        var productSwiper = createSwiper(".mySwiper-product-cards", {
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

        var productSliderEl = document.querySelector(".mySwiper-product-cards");

        if (productSliderEl && productSwiper) {
          var productWheelLocked = false;
          var productWheelUnlockTimeout;

          productSliderEl.addEventListener("wheel", function (event) {
            var wheelDelta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX;

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
      });
      $(document).ready(function () {
        var caseSwiper = createSwiper(".mySwiper-case-one", {
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

        var caseSliderEl = document.querySelector(".mySwiper-case-one");

        if (caseSliderEl && caseSwiper) {
          var caseWheelLocked = false;
          var caseWheelUnlockTimeout;

          caseSliderEl.addEventListener("wheel", function (event) {
            var wheelDelta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX;

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
      });
      $(document).ready(function () {
        var swiper = createSwiper(".mySwiper-service-main", {
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
        var swiper = createSwiper(".mySwiper-blog", {
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
        var swiper = createSwiper(".mySwiper-brand-three", {
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
        var swiper = createSwiper(".mySwiper-testimoanils-agency", {
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
        var swiper = createSwiper(".mySwiper-brand-2", {
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
        var swiper = createSwiper(".mySwiper-team-one", {
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
        var swiper = createSwiper(".mySwiper-banner-one", {
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
        var swiper = createSwiper(".mySwiper-brand-7", {
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
        var swiper = createSwiper(".mySwiper-brand-list", {
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

      if ('IntersectionObserver' in window) {
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

    splitText: function (e) {
      if (!$('.rts-text-anime-style-1').length || typeof SplitText === 'undefined' || typeof gsap === 'undefined') {
        return;
      }

      const animatedTextElements = document.querySelectorAll('.rts-text-anime-style-1');

      const createSplitAnimation = function (element) {
        if (!element || element.dataset.splitInitialized === 'true') {
          return;
        }

        element.dataset.splitInitialized = 'true';

        if (element.animation) {
          element.animation.progress(1).kill();
          element.split.revert();
        }

        element.split = new SplitText(element, {
          type: "lines,words,chars",
          linesClass: "split-line",
        });

        gsap.set(element, { perspective: 400 });

        gsap.set(element.split.chars, {
          opacity: 0,
          x: "50",
        });

        element.animation = gsap.to(element.split.chars, {
          scrollTrigger: { trigger: element, start: "top 95%" },
          x: "0",
          y: "0",
          rotateX: "0",
          opacity: 1,
          duration: 1,
          ease: Back.easeOut,
          stagger: 0.02,
        });
      };

      if ('IntersectionObserver' in window) {
        const splitTextObserver = new IntersectionObserver(function (entries, observer) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              createSplitAnimation(entry.target);
              observer.unobserve(entry.target);
            }
          });
        }, {
          rootMargin: '160px 0px',
          threshold: 0.01,
        });

        animatedTextElements.forEach(function (element) {
          splitTextObserver.observe(element);
        });

        return;
      }

      animatedTextElements.forEach(function (element) {
        createSplitAnimation(element);
      });
    },

    productStickyAnimation: function () {
      return;
    },

    backtoTop: function () {
      $(document).ready(function () {
        "use strict";

        const progressWrap = document.querySelector('.progress-wrap');
        if (!progressWrap) return;

        if (isLowPowerDevice()) {
          const offset = 50;
          const toggleProgress = function () {
            progressWrap.classList.toggle('active-progress', window.scrollY > offset);
          };

          window.addEventListener('scroll', toggleProgress, { passive: true });
          toggleProgress();

          progressWrap.addEventListener('click', function (event) {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          });

          return;
        }

        var progressPath = progressWrap.querySelector('path');
        if (!progressPath) return;
        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
        var updateProgress = function () {
          var scroll = $(window).scrollTop();
          var height = $(document).height() - $(window).height();
          var progress = pathLength - (scroll * pathLength / height);
          progressPath.style.strokeDashoffset = progress;
        }
        updateProgress();
        $(window).scroll(updateProgress);
        var offset = 50;
        var duration = 550;
        jQuery(window).on('scroll', function () {
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
      
      $(window).scroll(function () {
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
      $(document).ready(function () {
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

        if ('IntersectionObserver' in window) {
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
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
          );
        }

        function handleOdometer() {
          $('.odometer').each(function () {
            if (isInViewport(this)) {
              triggerOdometer(this);
            }
          });
        }

        // Check on page load
        handleOdometer();

        // Check on scroll
        $(window).on('scroll', function () {
          handleOdometer();
        });
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

        // Toggle active class based on checked state
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

      // Optional: Set initial state on page load
      $('#ce-toggle').trigger('change');
    });

  document.addEventListener('DOMContentLoaded', function () {
      document.querySelectorAll('[data-bg-src]').forEach(function (el) {
        const bg = el.getAttribute('data-bg-src');
        if (bg) {
          el.style.backgroundImage = `url(${bg})`;
          el.style.backgroundSize = 'cover';        // Optional
          el.style.backgroundPosition = 'center';   // Optional
          el.style.backgroundRepeat = 'no-repeat';  // Optional
        }
      });
    });
})(jQuery, window)







