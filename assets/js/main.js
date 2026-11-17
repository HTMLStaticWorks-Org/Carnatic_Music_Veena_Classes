/**
 * Nadam Veena Academy — Main Frontend Controller (main.js)
 * Handles:
 * 1. Theme (Dark/Light) & System Preference Detection (localStorage)
 * 2. RTL Toggle (dir="rtl" / dir="ltr" persisted in localStorage)
 * 3. Bilingual Tamil/English Accent Switch
 * 4. Scroll Progress Bar, Sticky Header & Scroll To Top Button
 * 5. Off-Canvas Mobile Drawer & Accessible Dropdown Menus
 * 6. Web Audio API Synthesizer (Sruti Drone, Interactive Swara Explorer, Raga Scales, Tala Metronome)
 * 7. Raga of the Day Dynamic Widget
 * 8. Scroll Reveal, Animated Counters & Live Countdown Timers
 * 9. Tabs, Accordions, Multi-Criteria Filters, Pricing Toggle & Gallery Lightbox
 * 10. Testimonials Carousel, Modals & Validated Forms (Auth, Contact, Demo, Lead Magnet)
 */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     1. THEME (DARK / LIGHT) MANAGEMENT
     ------------------------------------------------------------------------ */
  function initTheme() {
    var savedTheme = localStorage.getItem('nadam_theme');
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var activeTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    applyTheme(activeTheme);

    document.querySelectorAll('[data-action="toggle-theme"]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        var next = current === 'dark' ? 'light' : 'dark';
        localStorage.setItem('nadam_theme', next);
        applyTheme(next);
      });
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.querySelectorAll('[data-action="toggle-theme"]').forEach(function (btn) {
      var icon = btn.querySelector('i');
      if (icon) {
        icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
      }
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      btn.setAttribute('title', theme === 'dark' ? 'Switch to Sandalwood Light Mode' : 'Switch to Rosewood Dark Mode');
    });
  }

  /* ------------------------------------------------------------------------
     2. RTL (RIGHT-TO-LEFT) SUPPORT
     ------------------------------------------------------------------------ */
  function initRTL() {
    var savedDir = localStorage.getItem('nadam_dir') || 'ltr';
    applyRTL(savedDir);

    document.querySelectorAll('[data-action="toggle-rtl"]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('dir') === 'rtl' ? 'rtl' : 'ltr';
        var next = current === 'rtl' ? 'ltr' : 'rtl';
        localStorage.setItem('nadam_dir', next);
        applyRTL(next);
      });
    });
  }

  function applyRTL(dir) {
    document.documentElement.setAttribute('dir', dir);
    document.querySelectorAll('[data-action="toggle-rtl"]').forEach(function (btn) {
      btn.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      btn.setAttribute('aria-label', dir === 'rtl' ? 'Switch to Left-to-Right layout' : 'Switch to Right-to-Left layout');
    });
  }

  /* ------------------------------------------------------------------------
     3. BILINGUAL TAMIL / ENGLISH HEADING SWITCH
     ------------------------------------------------------------------------ */
  function initLangSwitch() {
    var savedLang = localStorage.getItem('nadam_lang') || 'en';
    applyLang(savedLang);

    document.querySelectorAll('[data-action="toggle-lang"]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-lang') || 'en';
        var next = current === 'en' ? 'ta' : 'en';
        localStorage.setItem('nadam_lang', next);
        applyLang(next);
      });
    });
  }

  function applyLang(lang) {
    document.documentElement.setAttribute('data-lang', lang);
    document.querySelectorAll('[data-en][data-ta]').forEach(function (el) {
      el.textContent = lang === 'ta' ? el.getAttribute('data-ta') : el.getAttribute('data-en');
    });
    document.querySelectorAll('[data-action="toggle-lang"]').forEach(function (btn) {
      btn.textContent = lang === 'ta' ? 'EN' : 'தமிழ்';
      btn.setAttribute('title', lang === 'ta' ? 'Switch key headings to English' : 'Switch key headings to Tamil');
    });
  }

  /* ------------------------------------------------------------------------
     4. SCROLL PROGRESS, STICKY HEADER & SCROLL TO TOP BUTTON
     ------------------------------------------------------------------------ */
  function initChromeUI() {
    var progressBar = document.querySelector('.scroll-progress-bar');
    var header = document.querySelector('.site-header');
    var heroBgImg = document.querySelector('.hero-concert__bg img');
    var scrollToTopBtn = document.getElementById('scrollToTopBtn') || document.querySelector('.scroll-to-top');

    if (!scrollToTopBtn) {
      scrollToTopBtn = document.createElement('button');
      scrollToTopBtn.type = 'button';
      scrollToTopBtn.id = 'scrollToTopBtn';
      scrollToTopBtn.className = 'scroll-to-top';
      scrollToTopBtn.setAttribute('aria-label', 'Scroll back to top');
      scrollToTopBtn.setAttribute('title', 'Scroll to top');
      scrollToTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up" aria-hidden="true"></i>';
      document.body.appendChild(scrollToTopBtn);
    }

    if (scrollToTopBtn) {
      scrollToTopBtn.addEventListener('click', function () {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    function onScroll() {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (progressBar && docHeight > 0) {
        progressBar.style.width = ((scrollTop / docHeight) * 100).toFixed(2) + '%';
      }
      if (header) {
        header.classList.toggle('is-scrolled', scrollTop > 40);
      }
      if (scrollToTopBtn) {
        scrollToTopBtn.classList.toggle('is-visible', scrollTop > 260);
      }
      if (heroBgImg && scrollTop < 900 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        heroBgImg.style.transform = 'scale(1.06) translateY(' + (scrollTop * 0.18).toFixed(1) + 'px)';
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ------------------------------------------------------------------------
     5. MOBILE DRAWER & DROPDOWN NAVIGATION
     ------------------------------------------------------------------------ */
  function initNavigation() {
    var openBtn = document.querySelector('[data-action="open-drawer"]');
    var closeBtn = document.querySelector('[data-action="close-drawer"]');
    var drawer = document.querySelector('.mobile-drawer');
    var backdrop = document.querySelector('.mobile-drawer-backdrop');

    function setDrawer(open) {
      if (!drawer || !backdrop) return;
      drawer.classList.toggle('is-open', open);
      backdrop.classList.toggle('is-open', open);
      if (openBtn) openBtn.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    }

    if (openBtn) openBtn.addEventListener('click', function () { setDrawer(true); });
    if (closeBtn) closeBtn.addEventListener('click', function () { setDrawer(false); });
    if (backdrop) backdrop.addEventListener('click', function () { setDrawer(false); });

    /* Desktop Navigation Dropdown Hover Intent & Clean Switching */
    var navItems = document.querySelectorAll('.nav-menu .nav-item');
    var openTimer = null;
    var closeTimer = null;
    var activeDropdownItem = null;

    function closeAllDropdowns() {
      if (openTimer) {
        clearTimeout(openTimer);
        openTimer = null;
      }
      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }
      navItems.forEach(function (el) {
        el.classList.remove('is-open');
        var trigger = el.querySelector('[aria-haspopup="true"]');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      });
      activeDropdownItem = null;
    }

    navItems.forEach(function (item) {
      var dropdown = item.querySelector('.dropdown-menu');
      var trigger = item.querySelector('[aria-haspopup="true"]');

      item.addEventListener('mouseenter', function () {
        if (closeTimer) {
          clearTimeout(closeTimer);
          closeTimer = null;
        }

        // Entering an item with no dropdown (Courses, Teachers, Resources):
        // Immediately close any open dropdown so it doesn't linger or overlap!
        if (!dropdown) {
          closeAllDropdowns();
          return;
        }

        // If another dropdown is already open, switch immediately without delay
        if (activeDropdownItem && activeDropdownItem !== item) {
          activeDropdownItem.classList.remove('is-open');
          var prevTrigger = activeDropdownItem.querySelector('[aria-haspopup="true"]');
          if (prevTrigger) prevTrigger.setAttribute('aria-expanded', 'false');

          item.classList.add('is-open');
          if (trigger) trigger.setAttribute('aria-expanded', 'true');
          activeDropdownItem = item;
          return;
        }

        // If no dropdown is open yet, apply a small hover intent delay (90ms)
        // so fast cursor sweeps across the navbar won't accidentally pop down menus!
        if (openTimer) {
          clearTimeout(openTimer);
        }
        openTimer = setTimeout(function () {
          item.classList.add('is-open');
          if (trigger) trigger.setAttribute('aria-expanded', 'true');
          activeDropdownItem = item;
          openTimer = null;
        }, 90);
      });

      item.addEventListener('mouseleave', function () {
        if (openTimer) {
          clearTimeout(openTimer);
          openTimer = null;
        }
        if (dropdown) {
          closeTimer = setTimeout(function () {
            item.classList.remove('is-open');
            if (trigger) trigger.setAttribute('aria-expanded', 'false');
            if (activeDropdownItem === item) {
              activeDropdownItem = null;
            }
          }, 140);
        }
      });
    });

    var navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
      navMenu.addEventListener('mouseleave', function () {
        if (openTimer) {
          clearTimeout(openTimer);
          openTimer = null;
        }
        closeTimer = setTimeout(closeAllDropdowns, 140);
      });
    }

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav-item')) {
        closeAllDropdowns();
      }
    });

    /* Mobile Drawer Dropdown Accordion */
    var drawerDropdownToggles = document.querySelectorAll('.mobile-drawer__dropdown-toggle');
    drawerDropdownToggles.forEach(function (toggle) {
      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        var parent = toggle.closest('.mobile-drawer__dropdown');
        if (parent) {
          var isOpen = parent.classList.toggle('is-open');
          toggle.setAttribute('aria-expanded', String(isOpen));
        }
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        setDrawer(false);
        closeAllModals();
        closeAllDropdowns();
      }
    });
  }

  /* ------------------------------------------------------------------------
     6. WEB AUDIO API & ORIGINAL MUSIC: VEENA SRUTI, SWARA EXPLORER & TALA
     ------------------------------------------------------------------------ */
  var audioCtx = null;
  var droneAudio = null;
  var isDronePlaying = false;
  var droneFadeInterval = null;

  function getAudioContext() {
    if (!audioCtx) {
      var AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function getDroneAudioPath() {
    var script = document.querySelector('script[src*="assets/js/main.js"]');
    if (script) {
      var src = script.getAttribute('src') || '';
      var prefix = src.replace(/assets\/js\/main\.js.*$/, '');
      return prefix + 'assets/audio/veena-sruti-original.wav';
    }
    return 'assets/audio/veena-sruti-original.wav';
  }

  function getDroneAudio() {
    if (!droneAudio) {
      droneAudio = new Audio(getDroneAudioPath());
      droneAudio.loop = true;
      droneAudio.volume = 0.85;
      droneAudio.addEventListener('error', function (err) {
        console.warn('Original Veena audio playback notice:', err);
      });
    }
    return droneAudio;
  }

  /**
   * Plucked Veena Tone Synthesizer (Karplus-Strong / Harmonic Additive Envelope)
   */
  function playVeenaSwara(freq, duration) {
    var ctx = getAudioContext();
    if (!ctx) return;
    var now = ctx.currentTime;
    var dur = duration || 1.45;

    var masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.gain.linearRampToValueAtTime(0.28, now + 0.025);
    masterGain.gain.exponentialRampToValueAtTime(0.0008, now + dur);
    masterGain.connect(ctx.destination);

    var harmonics = [
      { mult: 1, amp: 0.6, type: 'triangle' },
      { mult: 2, amp: 0.25, type: 'sine' },
      { mult: 3, amp: 0.1, type: 'sine' },
      { mult: 4, amp: 0.05, type: 'sine' }
    ];

    harmonics.forEach(function (h) {
      var osc = ctx.createOscillator();
      var g = ctx.createGain();
      osc.type = h.type;
      osc.frequency.setValueAtTime(freq * h.mult, now);
      /* Subtle gamaka deflection on attack */
      osc.frequency.exponentialRampToValueAtTime(freq * h.mult * 1.008, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(freq * h.mult, now + 0.22);

      g.gain.setValueAtTime(h.amp, now);
      osc.connect(g);
      g.connect(masterGain);
      osc.start(now);
      osc.stop(now + dur);
    });
  }

  function initSrutiDrone() {
    var droneBtns = document.querySelectorAll('[data-action="toggle-drone"]');
    var droneStatuses = document.querySelectorAll('[data-drone-status]');
    var droneWaves = document.querySelectorAll('[data-drone-wave]');
    if (!droneBtns.length) return;

    function updateDroneUI(playing) {
      isDronePlaying = playing;
      droneBtns.forEach(function (btn) {
        btn.setAttribute('aria-pressed', playing ? 'true' : 'false');
        var icon = btn.querySelector('i');
        if (icon) {
          icon.className = playing ? 'fa-solid fa-pause' : 'fa-solid fa-play';
        }
        var dot = btn.querySelector('.sruti-pill__dot');
        if (dot) {
          if (playing) {
            btn.classList.add('is-active');
          } else {
            btn.classList.remove('is-active');
          }
        }
      });

      droneStatuses.forEach(function (status) {
        status.textContent = playing
          ? 'Live Music: Playing (Saraswati Veena & Tanpura)'
          : 'Original Music: Off (Veena & Tanpura)';
      });

      droneWaves.forEach(function (wave) {
        if (playing) {
          wave.classList.add('is-playing');
        } else {
          wave.classList.remove('is-playing');
        }
      });
    }

    droneBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var audio = getDroneAudio();

        if (isDronePlaying) {
          /* Smoothly fade out and pause */
          clearInterval(droneFadeInterval);
          var vol = audio.volume;
          droneFadeInterval = setInterval(function () {
            vol = Math.max(0, vol - 0.15);
            audio.volume = vol;
            if (vol <= 0.02) {
              clearInterval(droneFadeInterval);
              audio.pause();
              audio.volume = 0.85;
              updateDroneUI(false);
            }
          }, 35);
        } else {
          /* Start playback with gentle fade-in */
          clearInterval(droneFadeInterval);
          audio.volume = 0.05;
          var playPromise = audio.play();
          if (playPromise !== undefined) {
            playPromise.then(function () {
              updateDroneUI(true);
              var targetVol = 0.85;
              droneFadeInterval = setInterval(function () {
                if (audio.volume < targetVol) {
                  audio.volume = Math.min(targetVol, audio.volume + 0.1);
                } else {
                  clearInterval(droneFadeInterval);
                }
              }, 40);
            }).catch(function (err) {
              console.warn('Autoplay policy or audio playback notice:', err);
              updateDroneUI(false);
            });
          } else {
            updateDroneUI(true);
          }
        }
      });
    });
  }

  function initSwaraExplorer() {
    var swaraKeys = document.querySelectorAll('.swara-key[data-swara]');
    var nameOut = document.getElementById('swaraFullName');
    var descOut = document.getElementById('swaraDesc');
    var freqOut = document.getElementById('swaraFreq');
    var ragaOut = document.getElementById('swaraRagaNote');

    swaraKeys.forEach(function (key) {
      key.addEventListener('click', function () {
        swaraKeys.forEach(function (k) { k.classList.remove('is-active'); });
        key.classList.add('is-active');

        var freq = parseFloat(key.getAttribute('data-freq')) || 261.63;
        playVeenaSwara(freq, 1.5);

        if (nameOut) nameOut.textContent = key.getAttribute('data-fullname') || '';
        if (descOut) descOut.textContent = key.getAttribute('data-desc') || '';
        if (freqOut) freqOut.textContent = freq.toFixed(1) + ' Hz • ' + (key.getAttribute('data-ratio') || '');
        if (ragaOut) ragaOut.textContent = key.getAttribute('data-gamaka') || '';
      });
    });

    /* Play Full Arohanam Scale Buttons (Resources & Home 2) */
    document.querySelectorAll('[data-play-scale]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var freqs = (btn.getAttribute('data-play-scale') || '261.6,293.7,329.6,349.2,392.0,440.0,493.9,523.3').split(',');
        freqs.forEach(function (f, i) {
          setTimeout(function () {
            playVeenaSwara(parseFloat(f), 0.7);
          }, i * 310);
        });
      });
    });

    /* Tala Metronome on Resources Page */
    var talaBtn = document.getElementById('talaMetronomeBtn');
    var talaBeatDisplay = document.getElementById('talaBeatDisplay');
    var talaSelect = document.getElementById('talaPatternSelect');
    var talaTimer = null;

    if (talaBtn && talaBeatDisplay) {
      talaBtn.addEventListener('click', function () {
        if (talaTimer) {
          clearInterval(talaTimer);
          talaTimer = null;
          talaBtn.innerHTML = '<i class="fa-solid fa-play"></i> Start Tala Pulse';
          talaBeatDisplay.textContent = 'Ready — Select Tala and press Start';
          return;
        }
        var pattern = (talaSelect ? talaSelect.value : 'Tha,Ka,Dhi,Mi,Tha,Ka,Jho,Nu').split(',');
        var step = 0;
        talaBtn.innerHTML = '<i class="fa-solid fa-stop"></i> Stop Tala Pulse';
        talaTimer = setInterval(function () {
          var sol = pattern[step % pattern.length];
          var isSam = (step % pattern.length) === 0;
          playVeenaSwara(isSam ? 440 : 330, 0.25);
          talaBeatDisplay.innerHTML = 'Beat <strong>' + ((step % pattern.length) + 1) + ' / ' + pattern.length + '</strong> — Konnakol: <span class="tag tag--gold">' + sol + '</span>';
          step++;
        }, 550);
      });
    }
  }

  /* ------------------------------------------------------------------------
     7. RAGA OF THE DAY WIDGET (TIME-OF-DAY AWARE)
     ------------------------------------------------------------------------ */
  function initRagaOfTheDay() {
    var widget = document.querySelector('[data-raga-of-day]');
    if (!widget) return;

    var hour = new Date().getHours();
    var ragaData = {
      name: 'Raga Kalyani (65th Melakarta)',
      kala: 'Sandhya / Evening Pradosha Kala',
      mood: 'Auspicious, radiant, evoking temple lamps at dusk'
    };

    if (hour >= 4 && hour < 8) {
      ragaData = { name: 'Raga Bowli & Bhupalam', kala: 'Ushas / Dawn Sadhana Kala', mood: 'Serene awakening and devotional clarity' };
    } else if (hour >= 8 && hour < 12) {
      ragaData = { name: 'Raga Bilahari & Dhanyasi', kala: 'Pratah / Morning Kala', mood: 'Joyful, energetic morning mangala resonance' };
    } else if (hour >= 12 && hour < 16) {
      ragaData = { name: 'Raga Madhyamavati & Sri', kala: 'Madhyahna / Midday Kala', mood: 'Centered equilibrium and auspicious शांति (Shanti)' };
    } else if (hour >= 20 || hour < 4) {
      ragaData = { name: 'Raga Bhairavi & Neelambari', kala: 'Ratri / Night Chamber Kala', mood: 'Deep introspection, karuna rasa, and repose' };
    }

    var nameEl = widget.querySelector('[data-raga-name]');
    var kalaEl = widget.querySelector('[data-raga-kala]');
    if (nameEl) nameEl.textContent = ragaData.name;
    if (kalaEl) kalaEl.textContent = ragaData.kala + ' — ' + ragaData.mood;
  }

  /* ------------------------------------------------------------------------
     8. SCROLL REVEAL, ANIMATED COUNTERS & LIVE COUNTDOWNS
     ------------------------------------------------------------------------ */
  function initRevealAndCounters() {
    var reveals = document.querySelectorAll('.reveal');
    var isMobile = window.innerWidth <= 1024;

    if (isMobile) {
      /* On mobile viewports, immediately make all reveal sections visible to prevent blank screen issues */
      reveals.forEach(function (el) {
        el.classList.add('is-visible');
      });
    } else if ('IntersectionObserver' in window) {
      var revObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revObserver.unobserve(entry.target);
          }
        });
      }, { threshold: [0, 0.05], rootMargin: '0px 0px 60px 0px' });

      reveals.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        /* If element is already in or above viewport on load, reveal immediately */
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('is-visible');
        } else {
          revObserver.observe(el);
        }
      });
    } else {
      reveals.forEach(function (el) { el.classList.add('is-visible'); });
    }

    /* Animated Counters */
    var counters = document.querySelectorAll('[data-counter-target]');
    if ('IntersectionObserver' in window && counters.length > 0) {
      var countObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          countObserver.unobserve(el);
          var target = parseInt(el.getAttribute('data-counter-target'), 10) || 100;
          var suffix = el.getAttribute('data-counter-suffix') || '+';
          var start = 0;
          var duration = 1600;
          var startTime = null;

          function step(ts) {
            if (!startTime) startTime = ts;
            var progress = Math.min((ts - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
            if (progress < 1) {
              requestAnimationFrame(step);
            }
          }
          requestAnimationFrame(step);
        });
      }, { threshold: 0.3 });
      counters.forEach(function (c) { countObserver.observe(c); });
    }

    /* Countdown Timers (Home 1 Next Concert & Coming Soon Page) */
    var countdownContainers = document.querySelectorAll('[data-countdown-date]');
    countdownContainers.forEach(function (container) {
      var targetDateStr = container.getAttribute('data-countdown-date');
      var targetTime = new Date(targetDateStr).getTime();

      function updateTimer() {
        var now = Date.now();
        var diff = Math.max(0, targetTime - now);
        var days = Math.floor(diff / (1000 * 60 * 60 * 24));
        var hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        var mins = Math.floor((diff / 1000 / 60) % 60);
        var secs = Math.floor((diff / 1000) % 60);

        var dEl = container.querySelector('[data-cd-days]');
        var hEl = container.querySelector('[data-cd-hours]');
        var mEl = container.querySelector('[data-cd-mins]');
        var sEl = container.querySelector('[data-cd-secs]');

        if (dEl) dEl.textContent = String(days).padStart(2, '0');
        if (hEl) hEl.textContent = String(hours).padStart(2, '0');
        if (mEl) mEl.textContent = String(mins).padStart(2, '0');
        if (sEl) sEl.textContent = String(secs).padStart(2, '0');
      }
      updateTimer();
      setInterval(updateTimer, 1000);
    });
  }

  /* ------------------------------------------------------------------------
     9. TABS, ACCORDIONS, FILTERS, PRICING TOGGLE & LIGHTBOX
     ------------------------------------------------------------------------ */
  function initInteractiveWidgets() {
    /* Generic Tabs */
    document.querySelectorAll('[data-tabs-group]').forEach(function (group) {
      var btns = group.querySelectorAll('[data-tab-target]');
      var panels = group.querySelectorAll('[data-tab-panel]');
      btns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var target = btn.getAttribute('data-tab-target');
          btns.forEach(function (b) {
            var active = b === btn;
            b.classList.toggle('is-active', active);
            b.setAttribute('aria-selected', String(active));
          });
          panels.forEach(function (p) {
            p.classList.toggle('is-active', p.getAttribute('data-tab-panel') === target);
          });
        });
      });
    });

    /* Accordions (FAQ & Syllabus) */
    document.querySelectorAll('.accordion-trigger').forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var item = trigger.closest('.accordion-item');
        if (!item) return;
        var isOpen = item.classList.contains('is-open');
        item.classList.toggle('is-open', !isOpen);
        trigger.setAttribute('aria-expanded', String(!isOpen));
      });
    });

    /* Multi-Criteria Filter Grids (Courses, Teachers, Concerts, Blog, Gallery, FAQ) */
    document.querySelectorAll('[data-filter-bar]').forEach(function (bar) {
      var gridId = bar.getAttribute('data-filter-bar');
      var grid = document.getElementById(gridId);
      if (!grid) return;

      var items = grid.querySelectorAll('[data-filter-item]');
      var buttons = bar.querySelectorAll('[data-filter-value]');
      var selects = bar.querySelectorAll('select[data-filter-key]');
      var searchInput = bar.querySelector('input[data-filter-search]');
      var countEl = document.querySelector('[data-filter-count="' + gridId + '"]');

      var activeBtnValue = 'all';

      function applyFilters() {
        var visibleCount = 0;
        var query = searchInput ? searchInput.value.trim().toLowerCase() : '';

        items.forEach(function (item) {
          var matches = true;
          if (activeBtnValue !== 'all') {
            var cats = (item.getAttribute('data-category') || '').toLowerCase();
            if (cats.indexOf(activeBtnValue.toLowerCase()) === -1) {
              matches = false;
            }
          }
          selects.forEach(function (sel) {
            var key = sel.getAttribute('data-filter-key');
            var val = sel.value;
            if (val && val !== 'all') {
              var itemVal = (item.getAttribute('data-' + key) || '').toLowerCase();
              if (itemVal.indexOf(val.toLowerCase()) === -1) {
                matches = false;
              }
            }
          });
          if (query) {
            var text = item.textContent.toLowerCase();
            if (text.indexOf(query) === -1) {
              matches = false;
            }
          }
          item.style.display = matches ? '' : 'none';
          if (matches) visibleCount++;
        });

        if (countEl) {
          countEl.textContent = visibleCount + (visibleCount === 1 ? ' result shown' : ' results shown');
        }

        /* Dynamic center-alignment for the last card when alone on the last row on Desktop (3-column track) */
        if (gridId === 'coursesCatalogGrid') {
          var visibleItems = [];
          items.forEach(function (item) {
            item.style.gridColumn = '';
            if (item.style.display !== 'none') {
              visibleItems.push(item);
            }
          });
          if (window.innerWidth >= 1025 && (visibleItems.length % 3 === 1)) {
            visibleItems[visibleItems.length - 1].style.gridColumn = '2';
          }
        }
      }

      if (gridId === 'coursesCatalogGrid') {
        window.addEventListener('resize', function () {
          applyFilters();
        });
      }

      buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          buttons.forEach(function (b) { b.classList.remove('is-active'); });
          btn.classList.add('is-active');
          activeBtnValue = btn.getAttribute('data-filter-value') || 'all';
          applyFilters();
        });
      });

      selects.forEach(function (sel) {
        sel.addEventListener('change', applyFilters);
      });

      if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
      }
    });

    /* Pricing Billing Cycle & Currency Toggle (Fees Page) */
    var billingBtns = document.querySelectorAll('[data-billing-cycle]');
    var currencyBtns = document.querySelectorAll('[data-currency-switch]');
    var currentCycle = 'monthly';
    var currentCurrency = 'INR';

    function updatePricingDisplay() {
      document.querySelectorAll('[data-price-inr-monthly]').forEach(function (el) {
        var baseInr = parseInt(el.getAttribute('data-price-inr-monthly'), 10) || 2800;
        var multiplier = currentCycle === 'quarterly' ? 2.7 : (currentCycle === 'annual' ? 9.6 : 1);
        var suffix = currentCycle === 'quarterly' ? '/ quarter (Save 10%)' : (currentCycle === 'annual' ? '/ year (Save 20%)' : '/ month');
        var totalInr = Math.round(baseInr * multiplier);

        if (currentCurrency === 'USD') {
          var usd = Math.round(totalInr / 78);
          el.textContent = '$' + usd.toLocaleString();
        } else {
          el.textContent = '₹' + totalInr.toLocaleString('en-IN');
        }
        var periodEl = el.parentElement.querySelector('[data-price-period]');
        if (periodEl) periodEl.textContent = suffix;
      });
    }

    billingBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        billingBtns.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        currentCycle = btn.getAttribute('data-billing-cycle');
        updatePricingDisplay();
      });
    });

    currencyBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        currencyBtns.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        currentCurrency = btn.getAttribute('data-currency-switch');
        updatePricingDisplay();
      });
    });

    /* Gallery Lightbox */
    var galleryItems = document.querySelectorAll('[data-lightbox-src]');
    var lightbox = document.getElementById('galleryLightbox');
    if (galleryItems.length > 0 && lightbox) {
      var lbImg = lightbox.querySelector('[data-lb-img]');
      var lbCaption = lightbox.querySelector('[data-lb-caption]');
      var lbCounter = lightbox.querySelector('[data-lb-counter]');
      var currentIdx = 0;

      function showLightboxSlide(idx) {
        currentIdx = (idx + galleryItems.length) % galleryItems.length;
        var item = galleryItems[currentIdx];
        if (lbImg) {
          lbImg.src = item.getAttribute('data-lightbox-src');
          lbImg.alt = item.getAttribute('data-lightbox-caption') || 'Gallery image';
        }
        if (lbCaption) lbCaption.textContent = item.getAttribute('data-lightbox-caption') || '';
        if (lbCounter) lbCounter.textContent = (currentIdx + 1) + ' / ' + galleryItems.length;
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
      }

      galleryItems.forEach(function (item, i) {
        item.addEventListener('click', function () {
          showLightboxSlide(i);
        });
      });

      var prevBtn = lightbox.querySelector('[data-lb-prev]');
      var nextBtn = lightbox.querySelector('[data-lb-next]');
      if (prevBtn) prevBtn.addEventListener('click', function () { showLightboxSlide(currentIdx - 1); });
      if (nextBtn) nextBtn.addEventListener('click', function () { showLightboxSlide(currentIdx + 1); });

      document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('is-open')) return;
        if (e.key === 'ArrowLeft') showLightboxSlide(currentIdx - 1);
        if (e.key === 'ArrowRight') showLightboxSlide(currentIdx + 1);
      });
    }
  }

  /* ------------------------------------------------------------------------
     10. TESTIMONIALS CAROUSEL, MODALS & FORM VALIDATION
     ------------------------------------------------------------------------ */
  function initCarouselAndModals() {
    /* Home 1 Testimonials Slider */
    var slider = document.querySelector('[data-testimonial-slider]');
    if (slider) {
      var slides = slider.querySelectorAll('[data-testimonial-slide]');
      var dots = slider.querySelectorAll('[data-slider-dot]');
      var prev = slider.querySelector('[data-slider-prev]');
      var next = slider.querySelector('[data-slider-next]');
      var idx = 0;

      function showSlide(n) {
        idx = (n + slides.length) % slides.length;
        slides.forEach(function (s, i) {
          s.style.display = i === idx ? 'block' : 'none';
        });
        dots.forEach(function (d, i) {
          d.classList.toggle('is-active', i === idx);
        });
      }

      if (prev) prev.addEventListener('click', function () { showSlide(idx - 1); });
      if (next) next.addEventListener('click', function () { showSlide(idx + 1); });
      dots.forEach(function (d, i) {
        d.addEventListener('click', function () { showSlide(i); });
      });
      showSlide(0);
    }

    /* Generic Modal Open / Close Triggers */
    document.querySelectorAll('[data-modal-open]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var modalId = btn.getAttribute('data-modal-open');
        var modal = document.getElementById(modalId);
        if (modal) {
          var titleAttr = btn.getAttribute('data-modal-context');
          var contextOut = modal.querySelector('[data-modal-context-out]');
          if (titleAttr && contextOut) contextOut.textContent = titleAttr;
          modal.classList.add('is-open');
          modal.setAttribute('aria-hidden', 'false');
        }
      });
    });

    document.querySelectorAll('[data-modal-close]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var modal = btn.closest('.modal-backdrop');
        if (modal) {
          modal.classList.remove('is-open');
          modal.setAttribute('aria-hidden', 'true');
        }
      });
    });

    document.querySelectorAll('.modal-backdrop').forEach(function (backdrop) {
      backdrop.addEventListener('click', function (e) {
        if (e.target === backdrop) {
          backdrop.classList.remove('is-open');
          backdrop.setAttribute('aria-hidden', 'true');
        }
      });
    });
  }

  function closeAllModals() {
    document.querySelectorAll('.modal-backdrop.is-open').forEach(function (m) {
      m.classList.remove('is-open');
      m.setAttribute('aria-hidden', 'true');
    });
  }

  function initFormsAndAuth() {
    /* Password Show/Hide Toggle */
    document.querySelectorAll('[data-toggle-password]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var targetId = btn.getAttribute('data-toggle-password');
        var input = document.getElementById(targetId);
        if (!input) return;
        var isPass = input.type === 'password';
        input.type = isPass ? 'text' : 'password';
        btn.innerHTML = isPass ? '<i class="fa-solid fa-eye-slash"></i>' : '<i class="fa-solid fa-eye"></i>';
      });
    });

    /* One-Click Demo Login Buttons on login.html */
    document.querySelectorAll('[data-demo-login]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var role = btn.getAttribute('data-demo-login');
        if (role === 'instructor') {
          localStorage.setItem('nadam_auth_user', JSON.stringify({
            name: 'Vidushi Dr. Meenakshi Sundaram',
            email: 'meenakshi@nadamveena.org',
            role: 'instructor',
            level: 'Principal Vainika & Guru'
          }));
          window.location.href = 'instructor-dashboard.html';
        } else {
          localStorage.setItem('nadam_auth_user', JSON.stringify({
            name: 'Ananya Venkataraman',
            email: 'ananya.v@student.nadamveena.org',
            role: 'student',
            instrument: 'Saraswati Veena',
            level: 'Madhyama (Varnam & Kriti Level)',
            sruti: 'D# (2.5 Kattai)'
          }));
          window.location.href = 'student-dashboard.html';
        }
      });
    });

    /* One-Click Social Logins (Google & Apple Mobile Buttons) */
    document.querySelectorAll('[data-social-auth]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var provider = btn.getAttribute('data-social-auth');
        var isApple = provider === 'apple';
        var providerLabel = isApple ? 'Apple ID' : 'Google';
        
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> <span>Connecting to ' + providerLabel + '...</span>';

        setTimeout(function () {
          localStorage.setItem('nadam_auth_user', JSON.stringify({
            name: 'Ananya Venkataraman (' + providerLabel + ')',
            email: isApple ? 'ananya.shishya@privaterelay.appleid.com' : 'ananya.veena@gmail.com',
            role: 'student',
            instrument: 'Saraswati Veena',
            level: 'Madhyama (Varnam & Kriti Level)',
            sruti: 'D# (2.5 Kattai)'
          }));
          window.location.href = 'student-dashboard.html';
        }, 500);
      });
    });

    /* Client-Side Form Validation for all [data-validate-form] */
    document.querySelectorAll('form[data-validate-form]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var isValid = true;
        var fields = form.querySelectorAll('[required]');

        fields.forEach(function (field) {
          var errEl = field.parentElement.querySelector('.form-error');
          var val = (field.value || '').trim();
          var fieldValid = true;

          if (field.type === 'checkbox') {
            fieldValid = field.checked;
          } else if (!val) {
            fieldValid = false;
          } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
            fieldValid = false;
          } else if (field.getAttribute('minlength') && val.length < parseInt(field.getAttribute('minlength'), 10)) {
            fieldValid = false;
          }

          field.classList.toggle('is-invalid', !fieldValid);
          if (errEl) errEl.classList.toggle('is-visible', !fieldValid);
          if (!fieldValid) isValid = false;
        });

        if (!isValid) return;

        var formType = form.getAttribute('data-validate-form');
        var feedback = form.querySelector('[data-form-feedback]');

        if (formType === 'login') {
          var emailInput = form.querySelector('input[type="email"]');
          var roleSelect = form.querySelector('select[name="role"]');
          var emailVal = emailInput ? emailInput.value.toLowerCase() : '';
          var roleVal = roleSelect ? roleSelect.value : ((emailVal.includes('instructor') || emailVal.includes('faculty') || emailVal.includes('meenakshi')) ? 'instructor' : 'student');
          localStorage.setItem('nadam_auth_user', JSON.stringify({
            name: roleVal === 'instructor' ? 'Vidushi Dr. Meenakshi Sundaram' : 'Ananya Venkataraman',
            email: emailInput ? emailInput.value : 'student@nadamveena.org',
            role: roleVal,
            instrument: 'Saraswati Veena',
            level: 'Madhyama (Varnam Level)'
          }));
          window.location.href = roleVal === 'instructor' ? 'instructor-dashboard.html' : 'student-dashboard.html';
          return;
        }

        if (formType === 'signup') {
          var nameIn = form.querySelector('[name="fullname"]');
          var emailIn = form.querySelector('[name="email"]');
          var instIn = form.querySelector('[name="instrument"]');
          var lvlIn = form.querySelector('[name="level"]');
          localStorage.setItem('nadam_auth_user', JSON.stringify({
            name: nameIn ? nameIn.value : 'New Shishya',
            email: emailIn ? emailIn.value : 'shishya@nadamveena.org',
            role: 'student',
            instrument: instIn ? instIn.value : 'Saraswati Veena',
            level: lvlIn ? lvlIn.value : 'Prarambha (Beginner)'
          }));
          window.location.href = 'student-dashboard.html';
          return;
        }

        if (feedback) {
          feedback.style.display = 'block';
          feedback.className = 'tag tag--peacock';
          feedback.style.padding = '0.85rem 1.25rem';
          feedback.style.width = '100%';
          feedback.innerHTML = '<i class="fa-solid fa-circle-check"></i> ' + (form.getAttribute('data-success-msg') || 'Submitted successfully! Our Academy Office will respond within 24 hours.');
        }
        form.reset();
      });
    });

    /* Home 2 Hero Quick Finder Redirect */
    var finderForm = document.getElementById('heroQuickFinder');
    if (finderForm) {
      finderForm.addEventListener('submit', function (e) {
        e.preventDefault();
        window.location.href = 'courses.html';
      });
    }
  }

  /* Initialize all modules on DOM ready */
  function initAll() {
    initTheme();
    initRTL();
    initLangSwitch();
    initChromeUI();
    initNavigation();
    initSrutiDrone();
    initSwaraExplorer();
    initRagaOfTheDay();
    initRevealAndCounters();
    initInteractiveWidgets();
    initCarouselAndModals();
    initFormsAndAuth();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
