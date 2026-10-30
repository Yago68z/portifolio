/**
 * ============================================================================
 * MÓDULO DE TEMA (theme.js)
 * ============================================================================
 * Gerencia a alternância entre os temas Dark e Light com persistência em
 * localStorage e detecção de preferências do sistema operacional.
 */

const THEME_STORAGE_KEY = "dev_portfolio_theme";

export function initTheme() {
  const toggleBtn = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement;

  // 1. Obtém o tema salvo ou usa o tema dark como padrão
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    // Padrão solicitado: Dark
    applyTheme("dark");
  }

  // 2. Event listener para o botão de toggle
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-theme") || "dark";
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(newTheme);
    });
  }

  function applyTheme(theme) {
    htmlElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    
    if (toggleBtn) {
      const isDark = theme === "dark";
      toggleBtn.setAttribute("aria-label", isDark ? "Alternar para tema claro" : "Alternar para tema escuro");
      toggleBtn.setAttribute("title", isDark ? "Alternar para tema claro" : "Alternar para tema escuro");
    }
  }
}
