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
        ? '<img src="' + p.thumbnail + '" alt="' + p.title + '">'
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

})();