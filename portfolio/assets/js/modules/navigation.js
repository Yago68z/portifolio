/**
 * ============================================================================
 * MÓDULO DE NAVEGAÇÃO INTELIGENTE (navigation.js)
 * ============================================================================
 * Gerencia:
 * - Cabeçalho fixo com sombra dinâmica ao rolar
 * - Destaque automático da seção ativa via IntersectionObserver (Scroll-Spy)
 * - Menu mobile hambúrguer com abertura/fechamento suave
 * - Fechamento automático ao selecionar uma seção ou clicar fora
 * - Rolagem suave com compensação da altura do cabeçalho
 */

export function initNavigation() {
  const header = document.getElementById("header");
  const navMenu = document.getElementById("nav-menu");
  const mobileToggle = document.getElementById("mobile-toggle");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  // 1. SOMBRA E ESTILO DINÂMICO DO HEADER AO ROLAR
  function handleHeaderScroll() {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // 2. CONTROLE DO MENU MOBILE (ABRIR E FECHAR)
  function openMobileMenu() {
    if (!navMenu || !mobileToggle) return;
    navMenu.classList.add("open");
    mobileToggle.classList.add("open");
    mobileToggle.setAttribute("aria-expanded", "true");
    mobileToggle.setAttribute("aria-label", "Fechar menu de navegação");
    document.body.classList.add("no-scroll");
  }

  function closeMobileMenu() {
    if (!navMenu || !mobileToggle) return;
    navMenu.classList.remove("open");
    mobileToggle.classList.remove("open");
    mobileToggle.setAttribute("aria-expanded", "false");
    mobileToggle.setAttribute("aria-label", "Abrir menu de navegação");
    document.body.classList.remove("no-scroll");
  }

  if (mobileToggle) {
    mobileToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = navMenu && navMenu.classList.contains("open");
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  // Fechar menu mobile ao clicar fora dele
  document.addEventListener("click", (e) => {
    if (navMenu && navMenu.classList.contains("open")) {
      const isClickInsideMenu = navMenu.contains(e.target);
      const isClickOnToggle = mobileToggle && mobileToggle.contains(e.target);
      if (!isClickInsideMenu && !isClickOnToggle) {
        closeMobileMenu();
      }
    }
  });

  // Fechar menu mobile ao pressionar a tecla ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu && navMenu.classList.contains("open")) {
      closeMobileMenu();
    }
  });

  // Fechar menu mobile se a tela for redimensionada para desktop (> 768px)
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && navMenu && navMenu.classList.contains("open")) {
      closeMobileMenu();
    }
  });

  // 3. ROLAGEM SUAVE E FECHAMENTO DO MENU AO CLICAR EM LINKS
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");

      // Se for um link de âncora interno
      if (targetId && targetId.startsWith("#")) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          e.preventDefault();
          closeMobileMenu();

          // Calcula posição compensando a altura da navbar fixa
          const headerHeight = header ? header.offsetHeight : 72;
          const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });

          // Atualiza o estado ativo no link clicado
          setActiveLink(targetId.substring(1));
        }
      }
    });
  });

  // 4. DESTAQUE AUTOMÁTICO DA SEÇÃO ATUAL (INTERSECTION OBSERVER / SCROLL-SPY)
  function setActiveLink(sectionId) {
    navLinks.forEach(link => {
      const href = link.getAttribute("href");
      if (href === `#${sectionId}`) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      } else {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
      }
    });
  }

  if ("IntersectionObserver" in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      // Foca na faixa entre 20% e 70% da viewport
      rootMargin: "-25% 0px -60% 0px",
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute("id");
          if (sectionId) {
            setActiveLink(sectionId);
          }
        }
      });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // Fallbacks para topo e fim da página
    window.addEventListener("scroll", () => {
      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Se estiver no topo absoluto, ativa a seção 'inicio'
      if (scrollPos < 80) {
        setActiveLink("inicio");
      }
      // Se estiver no final absoluto da página, ativa 'contato'
      else if (scrollPos + windowHeight >= docHeight - 50) {
        setActiveLink("contato");
      }
    }, { passive: true });
  }
}
