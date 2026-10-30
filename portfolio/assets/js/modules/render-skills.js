/**
 * ============================================================================
 * MÓDULO DE HABILIDADES (render-skills.js)
 * ============================================================================
 * Renderiza dinamicamente as competências e tecnologias organizadas
 * em categorias a partir de skills-data.js.
 */

// Ícones SVG temáticos para cada categoria técnica
const CATEGORY_ICONS = {
  frontend: `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
      <polyline points="2 17 12 22 22 17"></polyline>
      <polyline points="2 12 12 17 22 12"></polyline>
    </svg>
  `,
  backend: `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
      <line x1="6" y1="6" x2="6.01" y2="6"></line>
      <line x1="6" y1="18" x2="6.01" y2="18"></line>
    </svg>
  `,
  tools: `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
    </svg>
  `
};

export function renderSkills(skillsData = window.SKILLS_DATA) {
  const container = document.getElementById("skills-container");

  if (!container) {
    console.warn("Container #skills-container não encontrado no documento.");
    return;
  }

  if (!skillsData || Object.keys(skillsData).length === 0) {
    container.innerHTML = `<p class="text-muted">Nenhuma habilidade cadastrada no momento.</p>`;
    return;
  }

  // Limpa o container para renderização dinâmica
  container.innerHTML = "";

  // Itera sobre cada categoria de competências
  Object.entries(skillsData).forEach(([key, category], catIndex) => {
    const groupElement = document.createElement("div");
    groupElement.className = "skills-category-group reveal";
    if (groupElement.style) {
      groupElement.style.transitionDelay = `${catIndex * 100}ms`;
    }

    const iconSvg = CATEGORY_ICONS[key] || CATEGORY_ICONS.tools;
    const skillsCount = category.skills ? category.skills.length : 0;

    // Cabeçalho da categoria
    groupElement.innerHTML = `
      <div class="skills-category-header">
        <h3 class="skills-category-title">
          <span class="category-icon">${iconSvg}</span>
          ${category.title}
        </h3>
        <span class="skills-count-badge">${skillsCount} ${skillsCount === 1 ? 'competência' : 'competências'}</span>
      </div>
      <div class="skills-grid"></div>
    `;

    const skillsGrid = groupElement.querySelector(".skills-grid");

    // Criação dos cards de cada habilidade com reveal escalonado
    if (category.skills && Array.isArray(category.skills)) {
      category.skills.forEach((skill, skillIndex) => {
        const skillCard = document.createElement("div");
        skillCard.className = "skill-card reveal";
        if (skillCard.style) {
          skillCard.style.transitionDelay = `${(skillIndex % 5) * 60}ms`;
        }

        skillCard.innerHTML = `
          <div class="skill-main-info">
            <span class="skill-dot" aria-hidden="true"></span>
            <div class="skill-text-group">
              <span class="skill-card-name">${skill.name}</span>
              ${skill.tag ? `<span class="skill-tag">${skill.tag}</span>` : ""}
            </div>
          </div>
          <span class="skill-level-badge ${skill.level.toLowerCase()}">${skill.level}</span>
        `;

        skillsGrid.appendChild(skillCard);
      });
    }

    container.appendChild(groupElement);
  });
}
