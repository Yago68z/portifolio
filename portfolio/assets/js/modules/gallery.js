/**
 * ============================================================================
 * MÓDULO DE GALERIA E FILTROS DE PROJETOS (gallery.js)
 * ============================================================================
 * Gerencia a filtragem interativa dos cards de projetos por categoria
 * (Todos, Frontend, Backend, Full Stack) com transições fluidas.
 */

export function initProjectFilters() {
  const filterBar = document.getElementById("projects-filter");
  const projectsGrid = document.getElementById("projects-grid");

  if (!filterBar || !projectsGrid) {
    console.warn("Elementos do filtro ou grid de projetos não encontrados.");
    return;
  }

  const filterButtons = filterBar.querySelectorAll(".filter-btn");

  // Mensagem para quando nenhum projeto corresponder ao filtro
  let emptyMessage = projectsGrid.querySelector(".projects-empty-message");
  if (!emptyMessage) {
    emptyMessage = document.createElement("div");
    emptyMessage.className = "projects-empty-message is-hidden";
    emptyMessage.innerHTML = `
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 0.75rem; color: var(--secondary); opacity: 0.8;">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <p style="font-size: 1.05rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.25rem;">Nenhum projeto encontrado</p>
      <p style="font-size: 0.9rem; color: var(--text-muted);">Não há projetos cadastrados para esta categoria no momento.</p>
    `;
    projectsGrid.appendChild(emptyMessage);
  }

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const selectedFilter = btn.getAttribute("data-filter");

      // Se o botão já estiver ativo, não faz nada
      if (btn.classList.contains("active")) return;

      // 1. Atualiza o estado visual e acessibilidade dos botões
      filterButtons.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      // 2. Aplica a filtragem com animação suave
      applyFilter(selectedFilter);
    });
  });

  function applyFilter(category) {
    const cards = projectsGrid.querySelectorAll(".project-card");
    let visibleCount = 0;

    cards.forEach(card => {
      const cardCategory = card.getAttribute("data-category");
      const shouldShow = (category === "all" || cardCategory === category);

      if (shouldShow) {
        visibleCount++;
        // Se estava oculto, prepara a animação de entrada
        if (card.classList.contains("is-hidden")) {
          card.classList.remove("is-hidden");
          card.classList.add("is-animating-in");

          // Força reflow suave e ativa a transição de fade-in
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              card.classList.remove("is-animating-in");
            });
          });
        }
      } else {
        // Se está visível e precisa ocultar, aplica fade-out
        if (!card.classList.contains("is-hidden")) {
          card.classList.add("is-animating-out");
          setTimeout(() => {
            card.classList.add("is-hidden");
            card.classList.remove("is-animating-out");
          }, 200);
        }
      }
    });

    // 3. Exibe ou oculta a mensagem de estado vazio
    setTimeout(() => {
      if (visibleCount === 0) {
        emptyMessage.classList.remove("is-hidden");
      } else {
        emptyMessage.classList.add("is-hidden");
      }
    }, 200);
  }
}
