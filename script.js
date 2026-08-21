/* ===================================================
   CHRISTINA BHOIR — DARK EDITORIAL HR PORTFOLIO
   Main vanilla JavaScript
=================================================== */
document.addEventListener('DOMContentLoaded', function () {

  /* -------------------------------------------------
     1. NAVBAR — background on scroll
  ------------------------------------------------- */
  const mainNav = document.getElementById('mainNav');
  function handleNavScroll() {
    if (window.scrollY > 40) mainNav.classList.add('scrolled');
    else mainNav.classList.remove('scrolled');
  }
  handleNavScroll();
  window.addEventListener('scroll', handleNavScroll);

  /* -------------------------------------------------
     2. MOBILE NAV — close after clicking a link
  ------------------------------------------------- */
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('#navMenu .nav-link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navMenu.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navMenu) || new bootstrap.Collapse(navMenu, { toggle: false });
        bsCollapse.hide();
      }
    });
  });

  /* -------------------------------------------------
     3. SMOOTH SCROLLING
  ------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const top = targetEl.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      }
    });
  });

  /* -------------------------------------------------
     4. ACTIVE NAV HIGHLIGHTING
  ------------------------------------------------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinkMap = {};
  navLinks.forEach(function (link) {
    const href = link.getAttribute('href').replace('#', '');
    navLinkMap[href] = link;
  });

  function highlightActiveSection() {
    let currentId = '';
    const scrollPos = window.scrollY + 140;
    sections.forEach(function (section) {
      if (scrollPos >= section.offsetTop) currentId = section.getAttribute('id');
    });
    navLinks.forEach(function (link) { link.classList.remove('active'); });
    if (navLinkMap[currentId]) navLinkMap[currentId].classList.add('active');
  }
  highlightActiveSection();
  window.addEventListener('scroll', highlightActiveSection);

  /* -------------------------------------------------
     5. SCROLL REVEAL ANIMATIONS
  ------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* -------------------------------------------------
     6. BACK TO TOP
  ------------------------------------------------- */
  const backToTopBtn = document.getElementById('backToTop');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 500) backToTopBtn.classList.add('visible');
    else backToTopBtn.classList.remove('visible');
  });
  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* -------------------------------------------------
     7. CONTACT FORM VALIDATION
     (Frontend-only. Wire a fetch() call to Formspree /
     EmailJS here for production delivery.)
  ------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (!contactForm.checkValidity()) {
        contactForm.classList.add('was-validated');
        return;
      }

      // const formData = {
      //   fullName: document.getElementById('fullName').value.trim(),
      //   email: document.getElementById('emailAddress').value.trim(),
      //   subject: document.getElementById('subject').value.trim(),
      //   message: document.getElementById('message').value.trim()
      // };
      // fetch('https://formspree.io/f/yourFormId', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      formSuccess.classList.remove('d-none');
      contactForm.reset();
      contactForm.classList.remove('was-validated');
      setTimeout(function () { formSuccess.classList.add('d-none'); }, 6000);
    });
  }

  /* ===================================================
     AI ASSISTANT — CHAT UI
     Logic (candidateData, demo/live responses) lives in
     js/ai-assistant.js, loaded before this file.
  =================================================== */
  const aiFab = document.getElementById('aiFab');
  const aiPanel = document.getElementById('aiPanel');
  const aiClose = document.getElementById('aiClose');
  const aiMessages = document.getElementById('aiMessages');
  const aiSuggestions = document.getElementById('aiSuggestions');
  const aiInputForm = document.getElementById('aiInputForm');
  const aiInput = document.getElementById('aiInput');

  let aiGreeted = false;

  function openAiPanel() {
    aiPanel.classList.add('open');
    aiPanel.setAttribute('aria-hidden', 'false');
    if (!aiGreeted) {
      addBotMessage(`Hi! I'm ${candidateData.name.split(' ')[0]}'s AI assistant. Ask me about her experience, skills, HR expertise, or career background.`);
      aiGreeted = true;
    }
    setTimeout(function () { aiInput.focus(); }, 300);
  }

  function closeAiPanel() {
    aiPanel.classList.remove('open');
    aiPanel.setAttribute('aria-hidden', 'true');
  }

  aiFab.addEventListener('click', function () {
    if (aiPanel.classList.contains('open')) closeAiPanel();
    else openAiPanel();
  });
  aiClose.addEventListener('click', closeAiPanel);

  function scrollMessagesToBottom() {
    aiMessages.scrollTop = aiMessages.scrollHeight;
  }

  function addUserMessage(text) {
    const el = document.createElement('div');
    el.className = 'ai-msg ai-msg-user';
    el.textContent = text;
    aiMessages.appendChild(el);
    scrollMessagesToBottom();
  }

  function addBotMessage(text) {
    const el = document.createElement('div');
    el.className = 'ai-msg ai-msg-bot';
    el.textContent = text;
    aiMessages.appendChild(el);
    scrollMessagesToBottom();
  }

  function showTypingIndicator() {
    const el = document.createElement('div');
    el.className = 'ai-typing';
    el.id = 'aiTypingIndicator';
    el.innerHTML = '<span></span><span></span><span></span>';
    aiMessages.appendChild(el);
    scrollMessagesToBottom();
  }

  function hideTypingIndicator() {
    const el = document.getElementById('aiTypingIndicator');
    if (el) el.remove();
  }

  async function handleUserQuestion(question) {
    if (!question.trim()) return;
    addUserMessage(question.trim());
    showTypingIndicator();

    // Small delay so the typing indicator feels natural.
    const start = Date.now();
    const reply = await fetchAIResponse(question.trim());
    const elapsed = Date.now() - start;
    const minDelay = 500;

    setTimeout(function () {
      hideTypingIndicator();
      addBotMessage(reply);
    }, Math.max(0, minDelay - elapsed));
  }

  aiInputForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const question = aiInput.value;
    aiInput.value = '';
    handleUserQuestion(question);
  });

  aiSuggestions.querySelectorAll('.ai-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      handleUserQuestion(chip.getAttribute('data-q'));
    });
  });
});
