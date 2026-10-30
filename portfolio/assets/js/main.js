/**
 * ============================================================================
 * PONTO DE ENTRADA PRINCIPAL (main.js)
 * ============================================================================
 * Inicializa os módulos da aplicação conforme o ciclo de vida do DOM.
 */

import { initTheme } from "./modules/theme.js";
import { initNavigation } from "./modules/navigation.js";
import { renderSkills } from "./modules/render-skills.js";
import { renderProjects } from "./modules/render-projects.js";
import { initProjectFilters } from "./modules/gallery.js";
import { initScrollReveal } from "./modules/animations.js";
import { initContact } from "./modules/contact.js";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Inicializa o sistema de temas (dark/light)
  initTheme();

  // 2. Inicializa a navegação inteligente (menu fixo, scroll-spy e menu mobile)
  initNavigation();

  // 3. Renderiza dinamicamente as competências e tecnologias por categoria
  renderSkills();

  // 4. Renderiza dinamicamente os cards de projetos
  renderProjects();

  // 5. Inicializa os filtros interativos da galeria de projetos
  initProjectFilters();

  // 6. Inicializa as funcionalidades de contato (cópia de e-mail e feedback)
  initContact();

  // 7. Inicializa as animações de rolagem (Scroll Reveal via Intersection Observer)
  initScrollReveal();

  // Log discreto para confirmação de carregamento
  console.log("🚀 Portfólio de Desenvolvedor - Todos os módulos inicializados com sucesso.");
});
