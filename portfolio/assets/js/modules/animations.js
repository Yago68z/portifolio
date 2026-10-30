/**
 * ============================================================================
 * MÓDULO DE ANIMAÇÕES DE ROLAGEM (animations.js)
 * ============================================================================
 * Gerencia a revelação gradual (Scroll Reveal) de elementos conforme o usuário
 * navega pela página, utilizando Intersection Observer nativo.
 *
 * Características:
 * - Progressive Enhancement: se o JS falhar, elementos permanecem 100% visíveis.
 * - Respeito à preferência do sistema operacional (prefers-reduced-motion).
 * - Desobservação após revelação para evitar animações repetitivas cansativas.
 * - Suporte a atrasos sequenciais (staggered delay) para cards e grupos.
 */

export function initScrollReveal() {
  // 1. Respeita preferência por redução de movimento
  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("revealed"));
    return;
  }

  // 2. Se IntersectionObserver não for suportado, mantém o fallback CSS 100% visível
  if (!("IntersectionObserver" in window)) {
    return;
  }

  // 3. Ativa as transições no CSS via classe no elemento raiz (Progressive Enhancement)
  document.documentElement.classList.add("js-reveal-ready");

  const revealElements = document.querySelectorAll(".reveal");

  // 4. Configuração do IntersectionObserver
  const observerOptions = {
    root: null,
    // Aciona um pouco antes do elemento atingir a margem inferior para uma transição suave
    rootMargin: "0px 0px -40px 0px",
    threshold: 0.08
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        // Desobserva o elemento após a entrada para evitar repetições durante a rolagem
        const obs = observer || revealObserver;
        if (obs && typeof obs.unobserve === "function") {
          obs.unobserve(entry.target);
        }
      }
    });
  }, observerOptions);

  // 5. Itera sobre os elementos
  revealElements.forEach(el => {
    // Elementos que já estão na primeira dobra (Hero) recebem revelação suave imediata
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setTimeout(() => {
        el.classList.add("revealed");
      }, 60);
    } else {
      revealObserver.observe(el);
    }
  });
}
