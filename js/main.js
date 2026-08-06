/* ==========================================================================
   PORTFOLIO WEBSITE — JAVASCRIPT
   Handles: theme toggle, mobile nav, project filtering, modal, scroll reveal,
            copy-to-clipboard, smooth scroll.
   ========================================================================== */

(function () {
  'use strict';

  /* ----- Theme Toggle ---------------------------------------------------- */
  const themeToggle = document.getElementById('themeToggle');
  const sunIcon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';
  const moonIcon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeToggle) themeToggle.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
    try { localStorage.setItem('portfolio-theme', theme); } catch (e) {}
  }

  // Init theme — respect saved preference or system preference
  (function initTheme() {
    let saved;
    try { saved = localStorage.getItem('portfolio-theme'); } catch (e) {}
    if (saved) {
      setTheme(saved);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  })();

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  /* ----- Mobile Nav ------------------------------------------------------ */
  const burger = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');

  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      burger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        burger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ----- Project Data ---------------------------------------------------- */
  // This is the scalable data structure. Add new project objects here.
  // Duplicate the object, change the fields, and the card + modal render automatically.
  //
  // IMAGE FIELDS:
  //   thumbnail  — single image shown on the project card (the "cover" image)
  //   gallery    — array of images shown in a scrollable carousel inside the modal
  //                If gallery is empty, the modal shows the thumbnail (or a placeholder)
  //                You can add as many gallery images as you want.
  //
  // Example:
  //   thumbnail: 'images/project1-cover.png',
  //   gallery: [
  //     'images/project1-dashboard.png',
  //     'images/project1-payment.png',
  //     'images/project1-mobile.png'
  //   ],
  const projects = [
    {
      id: 'p1',
      title: 'Orion Aquatic — Pool Services Website',
      category: 'Business Website',
      summary: 'A lead-generation website for a Singapore pool services company with service catalog, equipment shop, and quote system.',
      thumbnail: 'images/project_1/orion-hero.png',
      gallery: [
        'images/project_1/orion-hero.png',
        'images/project_1/orion-services.png',
        'images/project_1/orion-equipment.png',
        'images/project_1/orion-audiences.png',
        'images/project_1/orion-about.png',
        'images/project_1/orion-cta.png'
      ],
      stack: ['HTML5', 'CSS3', 'JavaScript'],
      architecture: 'fe',
      archLabel: 'Frontend only',
      liveDemo: 'https://oriontaquatic.com/',
      githubFrontend: 'https://github.com/GeneTonix/pool-services-sg',
      githubBackend: '',
      caseStudy: true,
      features: [
        'Service catalog with 3 categories (lifeguard, maintenance, equipment)',
        'Equipment shop with MOQ display and bulk enquiry system',
        'Quick-action hero buttons for instant service selection',
        'FAQ section with 7 common questions',
        'Target audience segmentation (condos, clubs, schools, hotels, etc.)',
        'Mobile-responsive design with WhatsApp integration'
      ],
      tags: ['Lead Generation', 'Business Website', 'Service Catalog', 'Mobile-First'],
      database: 'N/A',
      hosting: 'GitHub Pages',
      payment: 'N/A',
      status: 'live',
      caseStudyData: {
        problem: 'A Singapore pool services company needed an online presence to attract clients for lifeguard services, pool maintenance, and equipment supply — but had no website and no way to capture inquiries digitally.',
        goal: 'Build a professional, mobile-first website that showcases services, allows potential clients to request quotes, and positions the company as a trusted pool service provider in Singapore.',
        solution: 'A complete lead-generation website with a service catalog (lifeguard, maintenance, equipment), equipment shop with bulk enquiry system, FAQ section, WhatsApp integration, and a clean, conversion-focused design.',
        challenge: 'Organizing 3 distinct service types into a single clean homepage that doesn\'t overwhelm visitors — while making it obvious what the company does within 5 seconds of landing.',
        result: 'The site is live and serving as the company\'s primary digital storefront. Visitors can quickly identify their needed service and reach out via WhatsApp or the quote form.',
        improvement: 'Add online booking system for lifeguard services, and integrate a payment gateway for equipment orders.',
        metric: '[Add metric later]',
        metricPlaceholder: '[Replace with number of quote requests received / leads generated]'
      }
    },
    {
      id: 'p2',
      title: 'LeadFlow CRM — Lead Management System',
      category: 'Database System',
      summary: 'A custom CRM that captures, tracks, and manages leads through every stage — from inquiry to conversion.',
      thumbnail: 'images/project_2/leadflow-dashboard.png',
      gallery: [
        'images/project_2/leadflow-dashboard.png',
        'images/project_2/leadflow-leads.png',
        'images/project_2/leadflow-detail.png'
      ],
      stack: ['PHP', 'MySQL', 'HTML5', 'CSS3', 'JavaScript'],
      architecture: 'full',
      archLabel: 'Frontend + Backend + Database',
      liveDemo: 'http://localhost/leadflow/admin/dashboard.php',
      githubFrontend: '',
      githubBackend: '',
      caseStudy: true,
      features: [
        'Admin dashboard with lead statistics and overview',
        'Lead pipeline with status tracking (new, contacted, converted, lost)',
        'Lead detail view with notes and history',
        'Secure admin login with session management',
        'REST API for form submissions from external sites',
        'Lead source tracking and filtering'
      ],
      tags: ['CRM', 'Database System', 'Admin Dashboard', 'API'],
      database: 'MySQL (MariaDB 10.4)',
      hosting: 'XAMPP (local development)',
      payment: 'N/A',
      status: 'live',
      caseStudyData: {
        problem: 'Businesses capture leads from multiple sources (website forms, phone calls, walk-ins) but have no centralized system to track where each lead is in the sales process — resulting in missed follow-ups and lost opportunities.',
        goal: 'Build a custom CRM that captures leads from any source, tracks them through every stage (new → contacted → converted → lost), and gives the business owner a clear dashboard view of their pipeline.',
        solution: 'A full-stack CRM with secure admin login, lead dashboard with statistics, lead pipeline with status tracking, lead detail view with notes and history, and a REST API that accepts form submissions from external websites.',
        challenge: 'Designing a database schema that tracks lead status changes over time while keeping the admin interface simple enough for non-technical users to navigate comfortably.',
        result: 'A working CRM that now manages leads for the portfolio website itself — every contact form submission flows directly into the system, and can be tracked from inquiry to conversion.',
        improvement: 'Add email automation for follow-up reminders, and a client-facing portal where leads can check their own status.',
        metric: '[Add metric later]',
        metricPlaceholder: '[Replace with number of leads managed / follow-up time saved]'
      }
    }
  ];

  /* ----- Render Project Cards -------------------------------------------- */
  const projectsGrid = document.getElementById('projectsGrid');
  const archClassMap = { fe: 'arch-badge--fe', fbe: 'arch-badge--fbe', full: 'arch-badge--full' };

  function renderProjects() {
    if (!projectsGrid) return;
    projectsGrid.innerHTML = projects.map(function (p) {
      var thumbHTML = p.thumbnail
        ? '<img src="' + p.thumbnail + '" alt="' + p.title + '" width="680" height="360" loading="lazy">'
        : '';

      var liveBtn = p.liveDemo
        ? '<a href="' + p.liveDemo + '" class="btn btn--secondary btn--ghost" target="_blank" rel="noopener">Live Demo ↗</a>'
        : '<span class="btn btn--secondary btn--ghost" style="opacity:.5;cursor:default">Live Demo ↗</span>';

      var ghBtn = p.githubFrontend
        ? '<a href="' + p.githubFrontend + '" class="btn btn--secondary btn--ghost" target="_blank" rel="noopener">GitHub ↗</a>'
        : '<span class="btn btn--secondary btn--ghost" style="opacity:.5;cursor:default">GitHub ↗</span>';

      var caseBtn = p.caseStudy
        ? '<button class="btn btn--primary btn--ghost" onclick="openModal(\'' + p.id + '\')">Case Study</button>'
        : '<span class="btn btn--secondary btn--ghost" style="opacity:.5;cursor:default">Case Study</span>';

      var tagsHTML = p.tags.map(function (t) {
        return '<span class="tag">' + t + '</span>';
      }).join('');

      return '' +
        '<article class="project-card reveal" data-category="' + p.category + '" data-arch="' + p.architecture + '">' +
          '<div class="project-card__thumb">' + thumbHTML + '</div>' +
          '<div class="project-card__body">' +
            '<span class="project-card__category">' + p.category + '</span>' +
            '<h3 class="project-card__title">' + p.title + '</h3>' +
            '<p class="project-card__summary">' + p.summary + '</p>' +
            '<span class="arch-badge ' + (archClassMap[p.architecture] || 'arch-badge--fe') + '">' +
              '<span class="dot"></span>' + p.archLabel +
            '</span>' +
            '<p class="project-card__stack"><strong>Stack:</strong> ' + p.stack.join(' · ') + '</p>' +
            '<div class="project-card__tags">' + tagsHTML + '</div>' +
            '<div class="project-card__links">' +
              liveBtn + ghBtn + caseBtn +
            '</div>' +
          '</div>' +
        '</article>';
    }).join('');
  }

  renderProjects();

  /* ----- Project Filtering ----------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');

  // Collect unique categories from projects
  var categories = ['All'];
  projects.forEach(function (p) {
    if (categories.indexOf(p.category) === -1) categories.push(p.category);
  });

  // Populate filter buttons if the container exists
  var filterContainer = document.getElementById('filterContainer');
  if (filterContainer && categories.length > 1) {
    filterContainer.innerHTML = categories.map(function (cat, i) {
      return '<button class="filter-btn' + (i === 0 ? ' active' : '') + '" data-filter="' + cat + '">' + cat + '</button>';
    }).join('');
  }

  // Attach filter listeners (re-query after innerHTML set)
  document.querySelectorAll('.filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');

      document.querySelectorAll('.project-card').forEach(function (card) {
        if (filter === 'All' || card.getAttribute('data-category') === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ----- Modal (Case Study / Project Detail) ----------------------------- */
  const modalOverlay = document.getElementById('modalOverlay');

  window.openModal = function (projectId) {
    var p = projects.find(function (proj) { return proj.id === projectId; });
    if (!p || !modalOverlay) return;

    var archBlockHTML = '' +
      '<div class="arch-block">' +
        (p.githubFrontend ? '<div class="arch-block__item"><span class="label">Frontend Repo</span><a href="' + p.githubFrontend + '" target="_blank" rel="noopener">View on GitHub ↗</a></div>' : '') +
        (p.githubBackend ? '<div class="arch-block__item"><span class="label">Backend Repo</span><a href="' + p.githubBackend + '" target="_blank" rel="noopener">View on GitHub ↗</a></div>' : '') +
        (p.database ? '<div class="arch-block__item"><span class="label">Database</span><span class="value">' + p.database + '</span></div>' : '') +
        (p.hosting ? '<div class="arch-block__item"><span class="label">Hosting / Deployment</span><span class="value">' + p.hosting + '</span></div>' : '') +
        (p.payment && p.payment !== 'N/A' ? '<div class="arch-block__item"><span class="label">Payment Integration</span><span class="value">' + p.payment + '</span></div>' : '') +
      '</div>';

    var featuresHTML = p.features.map(function (f) {
      return '<li>' + f + '</li>';
    }).join('');

    // Build gallery carousel — multiple images visitors can scroll through
    var galleryImages = (p.gallery && p.gallery.length > 0)
      ? p.gallery
      : (p.thumbnail ? [p.thumbnail] : []);

    var galleryHTML = '';
    if (galleryImages.length > 0) {
      var slidesHTML = galleryImages.map(function (img, i) {
        return '<div class="gallery__slide"' + (i === 0 ? '' : ' style="display:none"') + '>' +
          '<img src="' + img + '" alt="' + p.title + ' — screenshot ' + (i + 1) + '">' +
        '</div>';
      }).join('');

      var dotsHTML = galleryImages.map(function (_, i) {
        return '<button class="gallery__dot' + (i === 0 ? ' active' : '') + '" onclick="galleryGoTo(' + i + ')" aria-label="Go to image ' + (i + 1) + '"></button>';
      }).join('');

      var arrowsHTML = galleryImages.length > 1 ? '' +
        '<button class="gallery__arrow gallery__arrow--prev" onclick="galleryPrev()" aria-label="Previous image">‹</button>' +
        '<button class="gallery__arrow gallery__arrow--next" onclick="galleryNext()" aria-label="Next image">›</button>' +
      '' : '';

      galleryHTML = '' +
        '<div class="modal__section">' +
          '<h4>Screenshots</h4>' +
          '<div class="gallery" id="projectGallery" data-current="0" data-total="' + galleryImages.length + '">' +
            '<div class="gallery__viewport">' + slidesHTML + '</div>' +
            arrowsHTML +
            '<div class="gallery__dots">' + dotsHTML + '</div>' +
          '</div>' +
        '</div>';
    }

    document.getElementById('modalContent').innerHTML = '' +
      '<div class="modal">' +
        '<div class="modal__header">' +
          '<div>' +
            '<span class="project-card__category">' + p.category + '</span>' +
            '<h3 class="modal__title">' + p.title + '</h3>' +
          '</div>' +
          '<button class="modal__close" onclick="closeModal()" aria-label="Close">×</button>' +
        '</div>' +
        '<div class="modal__body">' +
          galleryHTML +
          '<div class="modal__section">' +
            '<h4>Summary</h4>' +
            '<p style="font-size:var(--fs-base);color:var(--c-text-muted);line-height:1.6">' + p.summary + '</p>' +
          '</div>' +
          '<div class="modal__section">' +
            '<h4>Architecture</h4>' +
            archBlockHTML +
          '</div>' +
          '<div class="modal__section">' +
            '<h4>Key Features</h4>' +
            '<ul class="modal__features">' + featuresHTML + '</ul>' +
          '</div>' +
          '<div class="modal__section">' +
            '<h4>Case Study</h4>' +
            (p.caseStudyData ? '' +
            '<div class="case-study__grid">' +
              '<div class="case-study__field"><span class="label">Problem</span><span class="value">' + p.caseStudyData.problem + '</span></div>' +
              '<div class="case-study__field"><span class="label">Goal</span><span class="value">' + p.caseStudyData.goal + '</span></div>' +
              '<div class="case-study__field"><span class="label">What I Built</span><span class="value">' + p.caseStudyData.solution + '</span></div>' +
              '<div class="case-study__field"><span class="label">Key Challenge</span><span class="value">' + p.caseStudyData.challenge + '</span></div>' +
              '<div class="case-study__field"><span class="label">Outcome</span><span class="value">' + p.caseStudyData.result + '</span></div>' +
              '<div class="case-study__field"><span class="label">Next Improvement</span><span class="value">' + p.caseStudyData.improvement + '</span></div>' +
            '</div>'
            : '<p style="color:var(--c-text-muted)">Case study coming soon.</p>') +
          '</div>' +
          '<div class="modal__section" style="display:flex;gap:var(--sp-3);flex-wrap:wrap">' +
            (p.liveDemo ? '<a href="' + p.liveDemo + '" class="btn btn--primary" target="_blank" rel="noopener">View Live ↗</a>' : '') +
            (p.githubFrontend ? '<a href="' + p.githubFrontend + '" class="btn btn--secondary" target="_blank" rel="noopener">Frontend Repo ↗</a>' : '') +
            (p.githubBackend ? '<a href="' + p.githubBackend + '" class="btn btn--secondary" target="_blank" rel="noopener">Backend Repo ↗</a>' : '') +
          '</div>' +
        '</div>' +
      '</div>';

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  /* ----- Gallery Carousel Navigation ------------------------------------ */
  function galleryShow(index) {
    var gallery = document.getElementById('projectGallery');
    if (!gallery) return;
    var total = parseInt(gallery.getAttribute('data-total'), 10);
    var current = parseInt(gallery.getAttribute('data-current'), 10);

    // Wrap around
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;

    // Hide all slides, show the target one
    var slides = gallery.querySelectorAll('.gallery__slide');
    slides.forEach(function (slide, i) {
      slide.style.display = (i === index) ? '' : 'none';
    });

    // Update dots
    gallery.querySelectorAll('.gallery__dot').forEach(function (dot, i) {
      dot.classList.toggle('active', i === index);
    });

    gallery.setAttribute('data-current', index);
  }

  window.galleryNext = function () {
    var gallery = document.getElementById('projectGallery');
    if (!gallery) return;
    galleryShow(parseInt(gallery.getAttribute('data-current'), 10) + 1);
  };

  window.galleryPrev = function () {
    var gallery = document.getElementById('projectGallery');
    if (!gallery) return;
    galleryShow(parseInt(gallery.getAttribute('data-current'), 10) - 1);
  };

  window.galleryGoTo = function (index) {
    galleryShow(index);
  };

  // Keyboard arrows for gallery (only when modal is open)
  document.addEventListener('keydown', function (e) {
    if (!modalOverlay || !modalOverlay.classList.contains('open')) return;
    if (!document.getElementById('projectGallery')) return;
    if (e.key === 'ArrowLeft') galleryPrev();
    if (e.key === 'ArrowRight') galleryNext();
  });

  // Touch swipe support for mobile
  (function () {
    var touchStartX = 0;
    var touchEndX = 0;
    document.addEventListener('touchstart', function (e) {
      if (!modalOverlay || !modalOverlay.classList.contains('open')) return;
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    document.addEventListener('touchend', function (e) {
      if (!modalOverlay || !modalOverlay.classList.contains('open')) return;
      if (!document.getElementById('projectGallery')) return;
      touchEndX = e.changedTouches[0].screenX;
      var diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 50) {
        if (diff < 0) galleryNext(); else galleryPrev();
      }
    }, { passive: true });
  })();

  window.closeModal = function () {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (modalOverlay) {
    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  /* ----- Scroll Reveal --------------------------------------------------- */
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: just show everything
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ----- Copy to Clipboard (email) -------------------------------------- */
  window.copyEmail = function (email) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(function () {
        showToast('Email copied to clipboard');
      }).catch(function () {
        showToast('Could not copy — please copy manually');
      });
    } else {
      showToast('Could not copy — please copy manually');
    }
  };

  var toastEl = document.getElementById('copiedToast');
  var toastTimer = null;

  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove('show');
    }, 2500);
  }

  /* ----- Contact Form (Supabase integration) ---------------------------- */
  // The form sends data to Supabase (free cloud database).
  // Config values are loaded from js/supabase-config.js
  // If config values are still placeholders, the form shows a helpful message.
  //
  // DEDUPLICATION:
  //   - Button disabled during send (prevents double-click)
  //   - Same email + same message within 30 seconds = blocked on frontend
  //   - Database also has a unique constraint as a safety net
  var lastSubmission = { email: '', message: '', timestamp: 0 };
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Check if Supabase is configured
      if (typeof SUPABASE_URL === 'undefined' || typeof SUPABASE_ANON_KEY === 'undefined') {
        showToast('Form not configured — see README.md → Supabase Setup');
        return;
      }

      if (SUPABASE_URL === '[YOUR_SUPABASE_URL]' || SUPABASE_ANON_KEY === '[YOUR_SUPABASE_ANON_KEY]') {
        showToast('Form not configured yet — add your Supabase keys to js/supabase-config.js');
        return;
      }

      // Collect form data
      var name = document.getElementById('name').value.trim();
      var email = document.getElementById('email').value.trim();
      var subject = document.getElementById('subject').value.trim();
      var message = document.getElementById('message').value.trim();

      var formData = {
        name: name,
        email: email,
        subject: subject,
        message: message,
        source: 'portfolio',
        dedup_hash: btoa(email + '|' + message).replace(/[^a-zA-Z0-9]/g, '').substring(0, 32)
      };

      // --- Deduplication check (frontend) ---
      var now = Date.now();
      var isDuplicate = (
        lastSubmission.email === email &&
        lastSubmission.message === message &&
        (now - lastSubmission.timestamp) < 30000  // 30 seconds
      );
      if (isDuplicate) {
        showToast('This message was already received — please wait 30 seconds before resubmitting');
        return;
      }

      // Show sending state
      var submitBtn = contactForm.querySelector('button[type="submit"]');
      var originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      // Record this submission for dedup
      lastSubmission = {
        email: email,
        message: message,
        timestamp: now
      };

      // Send to Supabase REST API
      fetch(SUPABASE_URL + '/rest/v1/' + LEADS_TABLE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': 'Bearer ' + SUPABASE_ANON_KEY
        },
        body: JSON.stringify(formData)
      })
      .then(function (response) {
        if (response.ok) {
          showToast('Message sent! I\'ll get back to you soon.');
          contactForm.reset();
        } else if (response.status === 409) {
          // Database rejected duplicate (unique constraint)
          showToast('This message was already received — no need to resend');
        } else {
          throw new Error('Server returned ' + response.status);
        }
      })
      .catch(function (error) {
        showToast('Could not send — please email me directly');
        console.error('Form submission error:', error);
      })
      .finally(function () {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
    });
  }

  /* ----- Nav active link on scroll -------------------------------------- */
  var sections = document.querySelectorAll('section[id]');
  var navLinkEls = document.querySelectorAll('.nav__links a[href^="#"]');

  if (sections.length && navLinkEls.length) {
    window.addEventListener('scroll', function () {
      var scrollY = window.pageYOffset;
      sections.forEach(function (section) {
        var top = section.offsetTop - 80;
        var bottom = top + section.offsetHeight;
        var id = section.getAttribute('id');
        navLinkEls.forEach(function (link) {
          if (link.getAttribute('href') === '#' + id) {
            if (scrollY >= top && scrollY < bottom) {
              link.style.color = 'var(--c-text)';
            } else {
              link.style.color = '';
            }
          }
        });
      });
    });
  }

  /* ======================================================================
     MOBILE RESTRUCTURE — JS ENHANCEMENTS
     Only runs on viewport < 768px. Desktop is completely unaffected.
     ====================================================================== */

  function isMobile() { return window.innerWidth < 768; }

  /* ----- M1. Nav Drawer -------------------------------------------------- */
  function setupNavDrawer() {
    if (!isMobile()) return;
    var burger = document.getElementById('navBurger');
    var navLinks = document.getElementById('navLinks');
    if (!burger || !navLinks) return;

    // Create backdrop
    var backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.appendChild(backdrop);

    var lastFocused = null;

    function openDrawer() {
      lastFocused = document.activeElement;
      navLinks.classList.add('open');
      backdrop.classList.add('open');
      burger.setAttribute('aria-expanded', 'true');
      burger.classList.add('open');
      document.body.style.overflow = 'hidden';
      // Focus first link
      var firstLink = navLinks.querySelector('a');
      if (firstLink) setTimeout(function() { firstLink.focus(); }, 300);
    }

    function closeDrawer() {
      navLinks.classList.remove('open');
      backdrop.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      burger.classList.remove('open');
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    }

    burger.addEventListener('click', function () {
      if (navLinks.classList.contains('open')) closeDrawer(); else openDrawer();
    });

    backdrop.addEventListener('click', closeDrawer);

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeDrawer);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) closeDrawer();
    });

    // Store references for cleanup
    burger._closeDrawer = closeDrawer;
  }

  /* ----- M2. Move hero intro to About ----------------------------------- */
  function moveHeroIntroToAbout() {
    if (!isMobile()) return;
    var heroIntro = document.querySelector('.hero__intro');
    var aboutIntro = document.querySelector('.about__intro');
    if (!heroIntro || !aboutIntro) return;

    // Prepend hero intro text before about intro
    if (!aboutIntro.dataset.heroMerged) {
      var heroText = heroIntro.innerHTML;
      aboutIntro.innerHTML = heroText + '<br><br>' + aboutIntro.innerHTML;
      aboutIntro.dataset.heroMerged = 'true';
    }
  }

  /* ----- M3. Capabilities accordion ------------------------------------- */
  function setupCapabilitiesAccordion() {
    if (!isMobile()) return;
    var cards = document.querySelectorAll('.cap-card');
    if (!cards.length) return;

    cards.forEach(function (card, index) {
      // Skip if already enhanced
      if (card.dataset.accordionReady) return;
      card.dataset.accordionReady = 'true';

      // Get existing elements
      var icon = card.querySelector('.cap-card__icon');
      var title = card.querySelector('.cap-card__title');
      var desc = card.querySelector('.cap-card__desc');
      var outcomes = card.querySelector('.cap-card__outcomes');

      if (!icon || !title || !desc) return;

      // Create header button
      var header = document.createElement('button');
      header.className = 'cap-card__header';
      header.setAttribute('aria-expanded', index === 0 ? 'true' : 'false');
      header.type = 'button';

      // Move icon and title into header
      var iconClone = icon.cloneNode(true);
      var titleClone = title.cloneNode(true);
      header.appendChild(iconClone);
      header.appendChild(titleClone);

      // Add summary text (the description, truncated)
      var summary = document.createElement('span');
      summary.className = 'cap-card__summary';
      summary.textContent = desc.textContent;
      header.appendChild(summary);

      // Add chevron
      var chevron = document.createElement('span');
      chevron.className = 'cap-card__chevron';
      chevron.setAttribute('aria-hidden', 'true');
      chevron.textContent = '⌄';
      header.appendChild(chevron);

      // Create body wrapper
      var body = document.createElement('div');
      body.className = 'cap-card__body';
      if (desc) body.appendChild(desc.cloneNode(true));
      if (outcomes) body.appendChild(outcomes.cloneNode(true));

      // Remove original elements
      icon.remove();
      title.remove();
      desc.remove();
      if (outcomes) outcomes.remove();

      // Append new structure
      card.appendChild(header);
      card.appendChild(body);

      // Set initial state
      card.dataset.open = index === 0 ? 'true' : 'false';
      if (index !== 0) {
        header.setAttribute('aria-expanded', 'false');
      }

      // Click handler
      header.addEventListener('click', function () {
        var isOpen = card.dataset.open === 'true';
        
        // Close all others
        cards.forEach(function (other) {
          if (other !== card) {
            other.dataset.open = 'false';
            var otherHeader = other.querySelector('.cap-card__header');
            if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle this one
        card.dataset.open = isOpen ? 'false' : 'true';
        header.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      });
    });
  }

  /* ----- M4. Projects carousel (CSS handles scroll-snap, JS handles filter) */
  // No extra JS needed — CSS handles the carousel. Filter buttons already work.

  /* ----- M5. Case Studies — collapsed cards + bottom sheet --------------- */
  function setupCaseStudyCollapse() {
    if (!isMobile()) return;
    var studies = document.querySelectorAll('.case-study');
    if (!studies.length) return;

    // Create sheet overlay
    var sheetOverlay = document.createElement('div');
    sheetOverlay.className = 'sheet-overlay';
    sheetOverlay.setAttribute('role', 'dialog');
    sheetOverlay.setAttribute('aria-modal', 'true');
    sheetOverlay.innerHTML = '<div class="sheet"><div class="sheet__handle"></div><button class="sheet__close" aria-label="Close">×</button><div class="sheet__content"></div></div>';
    document.body.appendChild(sheetOverlay);

    var sheetContent = sheetOverlay.querySelector('.sheet__content');
    var sheetClose = sheetOverlay.querySelector('.sheet__close');

    studies.forEach(function (study, index) {
      if (study.dataset.csEnhanced) return;
      study.dataset.csEnhanced = 'true';

      var grid = study.querySelector('.case-study__grid');
      var title = study.querySelector('.case-study__title');
      var badge = study.querySelector('.arch-badge');
      if (!grid || !title) return;

      // Get the Problem field text
      var problemField = grid.querySelector('.case-study__field .label');
      var problemValue = null;
      var fields = grid.querySelectorAll('.case-study__field');
      fields.forEach(function (f) {
        var label = f.querySelector('.label');
        if (label && label.textContent.trim() === 'Problem') {
          problemValue = f.querySelector('.value');
        }
      });

      // Add summary text before the grid
      if (problemValue && !study.querySelector('.case-study__summary-text')) {
        var summary = document.createElement('p');
        summary.className = 'case-study__summary-text';
        summary.textContent = problemValue.textContent;
        study.insertBefore(summary, grid);
      }

      // Add expand button
      if (!study.querySelector('.case-study__expand-btn')) {
        var btn = document.createElement('button');
        btn.className = 'case-study__expand-btn btn btn--secondary btn--sm';
        btn.textContent = 'Read full case study →';
        btn.type = 'button';
        btn.addEventListener('click', function () {
          var titleText = title ? title.textContent : 'Case Study';
          sheetContent.innerHTML = '<div class="sheet__title">' + titleText + '</div>';
          if (badge) {
            var badgeClone = badge.cloneNode(true);
            sheetContent.appendChild(badgeClone);
          }
          var gridClone = grid.cloneNode(true);
          gridClone.style.display = 'grid';
          gridClone.style.gridTemplateColumns = '1fr';
          gridClone.style.gap = 'var(--sp-4)';
          sheetContent.appendChild(gridClone);
          sheetOverlay.classList.add('open');
          document.body.style.overflow = 'hidden';
        });
        study.appendChild(btn);
      }
    });

    function closeSheet() {
      sheetOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    sheetClose.addEventListener('click', closeSheet);
    sheetOverlay.addEventListener('click', function (e) {
      if (e.target === sheetOverlay) closeSheet();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sheetOverlay.classList.contains('open')) closeSheet();
    });

    // Swipe down to close
    var touchStartY = 0;
    sheetOverlay.addEventListener('touchstart', function (e) {
      touchStartY = e.touches[0].screenY;
    }, { passive: true });
    sheetOverlay.addEventListener('touchend', function (e) {
      var diff = e.changedTouches[0].screenY - touchStartY;
      if (diff > 80) closeSheet();
    }, { passive: true });
  }

  /* ----- M7. Stack tabs -------------------------------------------------- */
  function setupStackTabs() {
    if (!isMobile()) return;
    var stackSplit = document.querySelector('.stack-split');
    if (!stackSplit || stackSplit.dataset.tabsReady) return;
    stackSplit.dataset.tabsReady = 'true';

    var layers = stackSplit.querySelectorAll('.stack-layer');
    if (layers.length < 2) return;

    // Create tab container
    var tabsContainer = document.createElement('div');
    tabsContainer.className = 'stack-tabs';
    tabsContainer.setAttribute('role', 'tablist');

    var tabLabels = [];
    layers.forEach(function (layer, i) {
      var title = layer.querySelector('.stack-layer__title');
      var label = title ? title.textContent.replace(/For.*/, '').trim() || title.textContent : ('Tab ' + (i + 1));
      // Extract just the main label
      var pill = layer.querySelector('.stack-layer__title .pill');
      if (pill) label = pill.textContent;
      tabLabels.push(label);

      var tab = document.createElement('button');
      tab.className = 'stack-tab';
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      tab.textContent = label;
      tab.addEventListener('click', function () {
        tabsContainer.querySelectorAll('.stack-tab').forEach(function (t) {
          t.setAttribute('aria-selected', 'false');
        });
        tab.setAttribute('aria-selected', 'true');
        layers.forEach(function (l) { l.dataset.active = 'false'; });
        layer.dataset.active = 'true';
      });
      tabsContainer.appendChild(tab);
    });

    stackSplit.insertBefore(tabsContainer, stackSplit.firstChild);
    layers[0].dataset.active = 'true';
  }

  /* ----- M8. About — collapsible "How I Work" ---------------------------- */
  function setupAboutAccordion() {
    if (!isMobile()) return;
    var sections = document.querySelectorAll('.about__section');
    if (!sections.length) return;

    // The second section (How I Work) becomes collapsible
    if (sections.length >= 2) {
      var howIWork = sections[1]; // "How I Work" is the second .about__section
      if (howIWork.dataset.aboutEnhanced) return;
      howIWork.dataset.aboutEnhanced = 'true';
      howIWork.classList.add('about__section--collapsible');
      howIWork.dataset.open = 'false';

      var heading = howIWork.querySelector('h3');
      var paragraphs = howIWork.querySelectorAll('p');
      if (!heading || !paragraphs.length) return;

      // Create header button
      var header = document.createElement('button');
      header.className = 'about__section-header';
      header.setAttribute('aria-expanded', 'false');
      header.type = 'button';

      var headingClone = heading.cloneNode(true);
      header.appendChild(headingClone);

      var toggle = document.createElement('span');
      toggle.className = 'about__section-toggle';
      toggle.textContent = '⌄';
      toggle.setAttribute('aria-hidden', 'true');
      header.appendChild(toggle);

      // Create body wrapper
      var body = document.createElement('div');
      body.className = 'about__section-body';
      paragraphs.forEach(function (p) { body.appendChild(p.cloneNode(true)); });

      // Remove originals
      heading.remove();
      paragraphs.forEach(function (p) { p.remove(); });

      howIWork.appendChild(header);
      howIWork.appendChild(body);

      header.addEventListener('click', function () {
        var isOpen = howIWork.dataset.open === 'true';
        howIWork.dataset.open = isOpen ? 'false' : 'true';
        header.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      });
    }
  }

  /* ----- M10. Contact — merge Name + Email into one row ------------------ */
  function setupContactFormRow() {
    if (!isMobile()) return;
    var form = document.getElementById('contactForm');
    if (!form || form.dataset.formEnhanced) return;
    form.dataset.formEnhanced = 'true';

    var nameGroup = form.querySelector('#name')?.closest('.form-group');
    var emailGroup = form.querySelector('#email')?.closest('.form-group');
    if (!nameGroup || !emailGroup) return;

    // Wrap both in a row container
    var row = document.createElement('div');
    row.className = 'form-group--row';
    nameGroup.parentNode.insertBefore(row, nameGroup);
    row.appendChild(nameGroup);
    row.appendChild(emailGroup);
  }

  /* ----- M12. Bottom action bar ------------------------------------------ */
  function setupBottomActionBar() {
    if (!isMobile()) return;
    if (document.querySelector('.mobile-action-bar')) return;

    var bar = document.createElement('div');
    bar.className = 'mobile-action-bar';
    bar.innerHTML = 
      '<a href="#contact" class="mobile-action-bar__btn mobile-action-bar__btn--primary">Contact Me</a>' +
      '<a href="https://t.me/Gene_Chuaa" target="_blank" rel="noopener" class="mobile-action-bar__btn mobile-action-bar__btn--secondary">Telegram</a>';
    document.body.appendChild(bar);
    document.body.classList.add('has-action-bar');

    // Show after scrolling past hero
    var hero = document.getElementById('hero');
    function checkScroll() {
      if (!isMobile()) return;
      var heroBottom = hero ? hero.offsetTop + hero.offsetHeight : 600;
      if (window.scrollY > heroBottom - 200) {
        bar.classList.add('visible');
      } else {
        bar.classList.remove('visible');
      }
    }
    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
  }

  /* ----- M6. Workflow timeline — wrap content --------------------------- */
  function setupWorkflowTimeline() {
    if (!isMobile()) return;
    var steps = document.querySelectorAll('.workflow__step');
    if (!steps.length) return;

    steps.forEach(function (step) {
      if (step.dataset.workflowEnhanced) return;
      step.dataset.workflowEnhanced = 'true';

      var title = step.querySelector('.workflow__title');
      var desc = step.querySelector('.workflow__desc');
      if (!title || !desc) return;

      // Check if content wrapper already exists
      if (step.querySelector('.workflow__content')) return;

      var content = document.createElement('div');
      content.className = 'workflow__content';
      content.appendChild(title.cloneNode(true));
      content.appendChild(desc.cloneNode(true));
      title.remove();
      desc.remove();
      step.appendChild(content);
    });
  }

  /* ----- Initialize all mobile enhancements ------------------------------ */
  function initMobile() {
    if (!isMobile()) return;
    setupNavDrawer();
    moveHeroIntroToAbout();
    setupCapabilitiesAccordion();
    setupWorkflowTimeline();
    setupCaseStudyCollapse();
    setupStackTabs();
    setupAboutAccordion();
    setupContactFormRow();
    setupBottomActionBar();
  }

  // Run on load
  initMobile();

  // Re-run on resize (debounced) — only if crossing the 768px boundary
  var resizeTimer = null;
  window.addEventListener('resize', function () {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      // If switching to desktop, reload to clear mobile DOM changes
      if (!isMobile() && document.querySelector('.mobile-action-bar')) {
        window.location.reload();
      }
      // If switching to mobile, also reload to apply mobile enhancements
      if (isMobile() && !document.querySelector('.mobile-action-bar')) {
        window.location.reload();
      }
    }, 250);
  });

})();