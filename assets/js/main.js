/**
 * WEALTH BRIDGE — LUXURY INVESTMENT ADVISORY JAVASCRIPT
 * Brand tagline: "Build Wealth With Clarity. Invest With Confidence."
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ------------------------------------------------------------------------
     1. THEME SWITCHER (LIGHT / DARK THEME WITH PERSISTENCE)
     ------------------------------------------------------------------------ */
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const savedTheme = localStorage.getItem('wb_theme') || 'light';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('wb_theme', theme);

    // Update icons on toggle buttons
    themeToggleBtns.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'bi bi-sun-fill';
          btn.setAttribute('aria-label', 'Switch to Light Theme');
          btn.setAttribute('title', 'Switch to Light Theme');
        } else {
          icon.className = 'bi bi-moon-stars-fill';
          btn.setAttribute('aria-label', 'Switch to Dark Theme');
          btn.setAttribute('title', 'Switch to Dark Theme');
        }
      }
    });

    // Update logos if present
    const brandLogos = document.querySelectorAll('.brand-logo-img');
    brandLogos.forEach(logo => {
      if (theme === 'dark') {
        logo.src = 'assets/images/logo-dark.svg';
      } else {
        logo.src = 'assets/images/logo.svg';
      }
    });
  }

  // Initialize Theme
  applyTheme(savedTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      showToast('Theme Updated', `Switched to ${newTheme === 'dark' ? 'Dark' : 'Ivory Light'} presentation.`);
    });
  });

  /* ------------------------------------------------------------------------
     2. NAVBAR SCROLL EFFECT
     ------------------------------------------------------------------------ */
  const navbar = document.querySelector('.wb-navbar');
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* ------------------------------------------------------------------------
     3. ACTIVE NAV LINK DETECTION
     ------------------------------------------------------------------------ */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.wb-navbar .nav-link, .wb-offcanvas .nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  /* ------------------------------------------------------------------------
     4. PASSWORD VISIBILITY TOGGLE (LOGIN & SIGN UP)
     ------------------------------------------------------------------------ */
  const passwordToggles = document.querySelectorAll('.password-toggle-btn');
  passwordToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const targetId = toggle.getAttribute('data-target');
      const input = document.getElementById(targetId);
      const icon = toggle.querySelector('i');
      if (input) {
        if (input.type === 'password') {
          input.type = 'text';
          if (icon) icon.className = 'bi bi-eye-slash';
          toggle.setAttribute('aria-label', 'Hide password');
        } else {
          input.type = 'password';
          if (icon) icon.className = 'bi bi-eye';
          toggle.setAttribute('aria-label', 'Show password');
        }
      }
    });
  });

  /* ------------------------------------------------------------------------
     5. TOAST NOTIFICATION UTILITY
     ------------------------------------------------------------------------ */
  window.showToast = function(title, message, isSuccess = true) {
    let toastContainer = document.getElementById('wb-toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'wb-toast-container';
      toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
      document.body.appendChild(toastContainer);
    }

    const toastId = 'toast-' + Date.now();
    const iconClass = isSuccess ? 'bi-check-circle-fill text-gold' : 'bi-info-circle-fill text-gold';

    const toastHtml = `
      <div id="${toastId}" class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header" style="background-color: var(--wb-bg-surface); border-bottom: 1px solid var(--wb-border);">
          <i class="bi ${iconClass} me-2"></i>
          <strong class="me-auto" style="color: var(--wb-text-heading); font-family: var(--font-accent); font-size: 0.85rem;">${title}</strong>
          <small style="color: var(--wb-text-muted);">Just now</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body" style="font-size: 0.85rem; color: var(--wb-text-body);">
          ${message}
        </div>
      </div>
    `;

    toastContainer.insertAdjacentHTML('beforeend', toastHtml);
    const toastEl = document.getElementById(toastId);
    if (window.bootstrap && window.bootstrap.Toast) {
      const bsToast = new window.bootstrap.Toast(toastEl, { delay: 4500 });
      bsToast.show();
      toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
    }
  };

  /* ------------------------------------------------------------------------
     6. CONSULTATION ENQUIRY FORM VALIDATION & MODAL
     ------------------------------------------------------------------------ */
  const consultationForm = document.getElementById('consultationForm');
  if (consultationForm) {
    // Restrict date input to today onwards
    const dateInput = consultationForm.querySelector('#preferredDate');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
    }

    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const requiredInputs = consultationForm.querySelectorAll('[required]');

      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          input.classList.add('is-invalid');
          isValid = false;
        } else {
          input.classList.remove('is-invalid');
          // Email validation
          if (input.type === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value.trim())) {
              input.classList.add('is-invalid');
              isValid = false;
            }
          }
        }
      });

      if (!isValid) {
        showToast('Incomplete Form', 'Please complete all required fields with valid information.', false);
        return;
      }

      // Collect values for confirmation display
      const fullName = consultationForm.querySelector('#fullName')?.value || 'Valued Investor';
      const email = consultationForm.querySelector('#emailAddress')?.value || '';
      const area = consultationForm.querySelector('#areaOfInterest')?.value || 'Investment Advisory';
      const date = consultationForm.querySelector('#preferredDate')?.value || 'Earliest available date';
      const referenceId = 'WB-' + Math.floor(100000 + Math.random() * 900000);

      // Submit animation state
      const submitBtn = consultationForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Processing Schedule...`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        // Display Confirmation Modal
        const modalEl = document.getElementById('consultationConfirmationModal');
        if (modalEl && window.bootstrap && window.bootstrap.Modal) {
          document.getElementById('modalRefCode').textContent = referenceId;
          document.getElementById('modalClientName').textContent = fullName;
          document.getElementById('modalServiceArea').textContent = area;
          document.getElementById('modalDate').textContent = date;
          
          const modal = new window.bootstrap.Modal(modalEl);
          modal.show();
        } else {
          showToast('Enquiry Received', `Thank you ${fullName}. Reference code: ${referenceId}. Our advisory desk will reach out shortly.`);
        }

        consultationForm.reset();
      }, 900);
    });

    // Remove invalid class on input
    consultationForm.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', () => {
        if (field.value.trim()) {
          field.classList.remove('is-invalid');
        }
      });
    });
  }

  /* ------------------------------------------------------------------------
     7. INSIGHTS SEARCH & CATEGORY FILTERING (insights.html)
     ------------------------------------------------------------------------ */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('insightSearchInput');
  const articleCards = document.querySelectorAll('.insight-card-item');
  const noResultsAlert = document.getElementById('noResultsAlert');
  const articleCountSpan = document.getElementById('visibleArticleCount');

  if (articleCards.length > 0 && filterBtns.length > 0) {
    let currentCategory = 'all';
    let searchQuery = '';

    function filterArticles() {
      let visibleCount = 0;

      articleCards.forEach(card => {
        const category = card.getAttribute('data-category')?.toLowerCase() || '';
        const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const desc = card.querySelector('p')?.textContent.toLowerCase() || '';

        const matchesCategory = currentCategory === 'all' || category.includes(currentCategory);
        const matchesSearch = !searchQuery || title.includes(searchQuery) || desc.includes(searchQuery);

        if (matchesCategory && matchesSearch) {
          card.style.display = 'block';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (articleCountSpan) {
        articleCountSpan.textContent = visibleCount;
      }

      if (noResultsAlert) {
        if (visibleCount === 0) {
          noResultsAlert.classList.remove('d-none');
        } else {
          noResultsAlert.classList.add('d-none');
        }
      }
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.getAttribute('data-filter')?.toLowerCase() || 'all';
        filterArticles();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        filterArticles();
      });
    }

    const resetFilterBtn = document.getElementById('resetFilterBtn');
    if (resetFilterBtn) {
      resetFilterBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        searchQuery = '';
        currentCategory = 'all';
        filterBtns.forEach(b => b.classList.remove('active'));
        const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
        if (allBtn) allBtn.classList.add('active');
        filterArticles();
      });
    }
  }

  /* ------------------------------------------------------------------------
     8. AUTHENTICATION FORMS (LOGIN & SIGN UP DEMO)
     ------------------------------------------------------------------------ */
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail')?.value;
      const pass = document.getElementById('loginPassword')?.value;
      if (!email || !pass) {
        showToast('Required Fields', 'Please enter your email and password.', false);
        return;
      }
      showToast('Demonstration Portal', `Authenticated session simulation for ${email}. Note: Wealth Bridge client access is provided post formal engagement.`);
    });
  }

  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const pass = document.getElementById('signupPassword')?.value;
      const confirmPass = document.getElementById('confirmPassword')?.value;

      if (pass !== confirmPass) {
        showToast('Password Mismatch', 'The passwords you entered do not match. Please verify.', false);
        document.getElementById('confirmPassword')?.classList.add('is-invalid');
        return;
      }

      showToast('Registration Requested', 'Demonstration account registered. A consultation advisor will contact you to verify fiduciary suitability.');
      signupForm.reset();
    });
  }

  /* ------------------------------------------------------------------------
     9. ADVISOR CREDENTIAL MODAL DYNAMIC POPULATION
     ------------------------------------------------------------------------ */
  const advisorModalButtons = document.querySelectorAll('.view-credentials-btn');
  const advisorData = {
    'vance': {
      name: 'Jonathan Vance, CFA',
      title: 'Managing Partner & Chief Investment Strategist',
      designation: 'Chartered Financial Analyst (CFA®)',
      education: 'MBA, Harvard Business School | B.S. in Economics, Wharton',
      experience: '24+ Years Institutional Portfolio Strategy & Fiduciary Advisory',
      focus: 'Multi-Asset Strategic Allocation, Risk-Weighted Capital Preservation, Fiduciary Governance',
      bio: 'Jonathan leads the firm\'s investment committee and macro-strategy framework. Prior to co-founding Wealth Bridge, Jonathan served as Managing Director of Global Equities at an established private banking institution. He adheres strictly to an evidence-based, risk-disciplined fiduciary mandate.'
    },
    'chen': {
      name: 'Eleanor Chen, CFP®',
      title: 'Principal, Private Wealth & Family Advisory',
      designation: 'Certified Financial Planner (CFP®)',
      education: 'M.S. in Wealth Management, Columbia University | B.A., UC Berkeley',
      experience: '18+ Years Inter-Generational Planning & High-Net-Worth Advisory',
      focus: 'Comprehensive Wealth Architecture, Tax-Aware Structuring, Estate & Succession Alignment',
      bio: 'Eleanor specializes in architecting holistic wealth structures for multi-generational families, entrepreneurs, and endowment trustees. Her methodology bridges quantitative tax-awareness with deeply personal long-term life milestones.'
    },
    'holloway': {
      name: 'Marcus Holloway, ChFC®',
      title: 'Director of Portfolio Strategy & Risk',
      designation: 'Chartered Financial Consultant (ChFC®)',
      education: 'M.S. in Mathematical Finance, University of Chicago | B.S. in Applied Mathematics',
      experience: '16+ Years Quantitative Asset Allocation & Downside Risk Modeling',
      focus: 'Dynamic Rebalancing, Asymmetric Risk Mitigation, Liquidity Management',
      bio: 'Marcus oversees portfolio implementation, institutional stress-testing, and risk mitigation protocols. His quantitative models ensure client mandates remain resilient through shifting macroeconomic cycles and market dislocations.'
    },
    'mansoor': {
      name: 'Dr. Sophia Al-Mansoor, Ph.D.',
      title: 'Head of Investment Research & Governance',
      designation: 'Doctor of Philosophy in Financial Economics',
      education: 'Ph.D. in Financial Economics, London School of Economics',
      experience: '14+ Years Macroeconomic Research & Policy Governance',
      focus: 'Macroeconomic Regimes, Long-Horizon Capital Assumptions, Sustainable Fiduciary Governance',
      bio: 'Dr. Al-Mansoor directs the firm\'s proprietary research publications and ensures all advisory recommendations adhere to stringent empirical rigor. She frequently contributes independent commentary on monetary policy and capital market structures.'
    }
  };

  advisorModalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const advisorKey = btn.getAttribute('data-advisor');
      const data = advisorData[advisorKey];
      if (data) {
        document.getElementById('advisorModalName').textContent = data.name;
        document.getElementById('advisorModalTitle').textContent = data.title;
        document.getElementById('advisorModalDesignation').textContent = data.designation;
        document.getElementById('advisorModalEducation').textContent = data.education;
        document.getElementById('advisorModalExperience').textContent = data.experience;
        document.getElementById('advisorModalFocus').textContent = data.focus;
        document.getElementById('advisorModalBio').textContent = data.bio;

        const modalEl = document.getElementById('advisorCredentialsModal');
        if (modalEl && window.bootstrap && window.bootstrap.Modal) {
          const modal = new window.bootstrap.Modal(modalEl);
          modal.show();
        }
      }
    });
  });

});
