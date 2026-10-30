/**
 * ============================================================================
 * MÓDULO DE PROJETOS (render-projects.js)
 * ============================================================================
 * Renderiza dinamicamente os cards de projetos na seção Projetos
 * a partir de projects-data.js.
 */

// Ícones SVG para os botões de ação
const SVG_ICONS = {
  github: `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  `,
  external: `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
  `,
  codeWindow: `
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="preview-tech-icon">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
      <line x1="8" y1="21" x2="16" y2="21"></line>
      <line x1="12" y1="17" x2="12" y2="21"></line>
      <polyline points="7 8 10 10 7 12"></polyline>
      <line x1="13" y1="12" x2="16" y2="12"></line>
    </svg>
  `
};

export function renderProjects(projects = window.PROJECTS_DATA) {
  const container = document.getElementById("projects-grid");

  if (!container) {
    console.warn("Container #projects-grid não encontrado no documento.");
    return;
  }

  if (!projects || projects.length === 0) {
    container.innerHTML = `<p class="text-muted">Nenhum projeto cadastrado no momento.</p>`;
    return;
  }

  // Limpa o grid
  container.innerHTML = "";

  // Renderiza cada projeto como um card estruturado com scroll-reveal sequencial
  projects.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = "project-card reveal reveal-scale";
    if (card.style) {
      card.style.transitionDelay = `${(index % 4) * 80}ms`;
    }
    card.setAttribute("data-category", project.category);
    card.setAttribute("data-id", project.id);

    // Tags de tecnologias
    const tagsHtml = (project.technologies || [])
      .map(tech => `<span class="badge">${tech}</span>`)
      .join("");

    card.innerHTML = `
      <!-- Cabeçalho Visual do Card (Mockup Tecnológico com Tema Dark Roxo) -->
      <div class="project-preview">
        <div class="project-preview-bar">
          <div class="preview-dots">
            <span class="preview-dot red"></span>
            <span class="preview-dot yellow"></span>
            <span class="preview-dot green"></span>
          </div>
          <span class="preview-file-tag text-mono">&lt;${project.id}.app /&gt;</span>
        </div>
        <div class="project-preview-canvas">
          ${SVG_ICONS.codeWindow}
          <div class="preview-glow-spot"></div>
        </div>
      </div>

      <!-- Corpo com Informações do Projeto -->
      <div class="project-content">
        <div class="project-meta-header">
          <span class="project-category-tag">${project.categoryLabel || project.category}</span>
          ${project.metrics ? `<span class="project-metrics-tag">${project.metrics}</span>` : ""}
        </div>

        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.shortDescription}</p>

        <!-- Stacks e Tecnologias Utilizadas -->
        <div class="project-tags" aria-label="Tecnologias utilizadas">
          ${tagsHtml}
        </div>

        <!-- Ações do Projeto -->
        <div class="project-actions">
          <a href="${project.githubUrl}" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="btn btn-secondary btn-sm"
             aria-label="Ver código-fonte do projeto ${project.title} no GitHub">
            ${SVG_ICONS.github}
            Código
          </a>
          <a href="${project.liveUrl}" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="btn btn-primary btn-sm"
             aria-label="Abrir demonstração online do projeto ${project.title}">
            ${SVG_ICONS.external}
            Visualizar
          </a>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}
