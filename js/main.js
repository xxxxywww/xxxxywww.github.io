/* ==========================================================================
   MAIN JAVASCRIPT CONTROLLER
   이예원 (LEEyewon) - Creative Developer & Tech-savvy Designer Portfolio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initHeroTabSwitch();
  renderProjects();
  initProjectFiltering();
  initModal();
  initEmailCopy();
  initScrollAnimations();
});

/* --------------------------------------------------------------------------
   1. THEME MANAGEMENT (Dark / Light)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = localStorage.getItem('site-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const currentTheme = savedTheme || (prefersDark ? 'dark' : 'dark'); // Default dark
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('site-theme', nextTheme);
    });
  }
}

/* --------------------------------------------------------------------------
   2. NAVIGATION & MOBILE MENU
   -------------------------------------------------------------------------- */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');
  const navItems = document.querySelectorAll('.nav-link');

  // Sticky header background
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-active');
    });

    // Close menu when clicking link
    navItems.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-active');
      });
    });
  }

  // Active section indicator
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNav = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (targetNav) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNav.classList.add('active');
        } else {
          targetNav.classList.remove('active');
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. HERO DUAL-CARD TAB SWITCH (Design ↔ Code)
   -------------------------------------------------------------------------- */
function initHeroTabSwitch() {
  const tabBtns = document.querySelectorAll('.hero-visual-card .tab-btn');
  const designPane = document.getElementById('hero-design-pane');
  const codePane = document.getElementById('hero-code-pane');

  if (!tabBtns.length || !designPane || !codePane) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetTab = btn.getAttribute('data-tab');
      if (targetTab === 'design') {
        designPane.style.display = 'block';
        codePane.style.display = 'none';
      } else {
        designPane.style.display = 'none';
        codePane.style.display = 'block';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. PROJECTS RENDERING & FILTERING
   -------------------------------------------------------------------------- */
function renderProjects(filter = 'all') {
  const grid = document.getElementById('projects-grid');
  if (!grid || typeof PORTFOLIO_PROJECTS === 'undefined') return;

  grid.innerHTML = '';

  const filteredList = filter === 'all' 
    ? PORTFOLIO_PROJECTS 
    : PORTFOLIO_PROJECTS.filter(p => p.category === filter);

  filteredList.forEach((project, index) => {
    const card = document.createElement('article');
    card.className = 'project-card hover-lift reveal active';
    card.style.transitionDelay = `${(index % 3) * 0.1}s`;
    card.setAttribute('data-id', project.id);

    const techTagsHtml = project.techStack
      .map(tech => `<span class="tech-tag">${tech}</span>`)
      .join('');

    card.innerHTML = `
      <div class="project-thumbnail" style="background: ${project.bgGradient};">
        <div class="thumbnail-visual">
          <i data-lucide="${project.iconName || 'folder'}" style="width: 54px; height: 54px; color: rgba(255,255,255,0.85);"></i>
        </div>
        <span class="project-category-badge">${project.categoryLabel}</span>
      </div>
      <div class="project-body">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-desc">${project.summary}</p>
        <div class="project-tech-stack">
          ${techTagsHtml}
        </div>
        <div class="project-footer-links">
          <span class="project-view-detail">
            자세히 보기
            <i data-lucide="arrow-up-right" style="width: 16px; height: 16px;"></i>
          </span>
          <span style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);">
            ${project.details.period}
          </span>
        </div>
      </div>
    `;

    // Click to open modal
    card.addEventListener('click', () => {
      openProjectModal(project);
    });

    grid.appendChild(card);
  });

  // Re-run icon replacements
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderProjects(filter);
    });
  });
}

/* --------------------------------------------------------------------------
   5. PROJECT DETAILS MODAL
   -------------------------------------------------------------------------- */
function initModal() {
  const modalOverlay = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modalOverlay) return;

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

function openProjectModal(project) {
  const modalOverlay = document.getElementById('project-modal');
  if (!modalOverlay) return;

  const modalHero = document.getElementById('modal-hero');
  const modalCategory = document.getElementById('modal-category');
  const modalTitle = document.getElementById('modal-title');
  const modalSummary = document.getElementById('modal-summary');
  const modalRole = document.getElementById('modal-role');
  const modalPeriod = document.getElementById('modal-period');
  const modalChallenge = document.getElementById('modal-challenge');
  const modalDesignSolution = document.getElementById('modal-design-solution');
  const modalTechSolution = document.getElementById('modal-tech-solution');
  const modalOutcome = document.getElementById('modal-outcome');
  const modalTags = document.getElementById('modal-tags');
  const modalGithub = document.getElementById('modal-link-github');

  if (modalHero) {
    modalHero.style.background = project.bgGradient;
    modalHero.innerHTML = `<i data-lucide="${project.iconName || 'folder'}" style="width: 72px; height: 72px; color: rgba(255,255,255,0.9);"></i>`;
  }

  if (modalCategory) modalCategory.textContent = project.categoryLabel;
  if (modalTitle) modalTitle.textContent = project.title;
  if (modalSummary) modalSummary.textContent = project.summary;
  if (modalRole) modalRole.textContent = project.details.role;
  if (modalPeriod) modalPeriod.textContent = project.details.period;
  if (modalChallenge) modalChallenge.textContent = project.details.challenge;
  if (modalDesignSolution) modalDesignSolution.textContent = project.details.designSolution;
  if (modalTechSolution) modalTechSolution.textContent = project.details.techSolution;
  if (modalOutcome) modalOutcome.textContent = project.details.keyOutcome;

  if (modalTags) {
    modalTags.innerHTML = project.techStack
      .map(t => `<span class="tech-tag">${t}</span>`)
      .join('');
  }

  if (modalGithub) {
    if (project.details.links.github) {
      modalGithub.style.display = 'inline-flex';
      modalGithub.href = project.details.links.github;
    } else {
      modalGithub.style.display = 'none';
    }
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/* --------------------------------------------------------------------------
   6. EMAIL COPY & TOAST NOTIFICATION
   -------------------------------------------------------------------------- */
function initEmailCopy() {
  const copyBtn = document.getElementById('copy-email-btn');
  const emailText = document.getElementById('user-email');
  const toast = document.getElementById('toast-notification');

  if (!copyBtn || !emailText) return;

  copyBtn.addEventListener('click', () => {
    const textToCopy = emailText.textContent.trim();
    navigator.clipboard.writeText(textToCopy).then(() => {
      showToast('이메일 주소가 클립보드에 복사되었습니다! 🎉');
    });
  });

  function showToast(msg) {
    if (!toast) return;
    const toastMsg = toast.querySelector('.toast-msg');
    if (toastMsg) toastMsg.textContent = msg;

    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}

/* --------------------------------------------------------------------------
   7. SCROLL ENTRANCE ANIMATIONS (Reveal on Scroll)
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}
