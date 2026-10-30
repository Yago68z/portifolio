/**
 * ============================================================================
 * DATASET DE HABILIDADES (skills-data.js)
 * ============================================================================
 * Centraliza as tecnologias, linguagens e ferramentas do portfólio.
 */

const SKILLS_DATA = {
  frontend: {
    title: "Frontend & Interfaces",
    skills: [
      { name: "HTML5 Semântico", level: "Avançado", tag: "Estrutura" },
      { name: "CSS3 / Modern CSS", level: "Avançado", tag: "Estilização" },
      { name: "JavaScript (ES6+)", level: "Avançado", tag: "Lógica" },
      { name: "Responsividade (Mobile First)", level: "Avançado", tag: "Layout" },
      { name: "Acessibilidade (a11y)", level: "Intermediário", tag: "Qualidade" }
    ]
  },
  backend: {
    title: "Backend & Integrações",
    skills: [
      { name: "APIs RESTful", level: "Avançado", tag: "Integração" },
      { name: "Node.js", level: "Intermediário", tag: "Runtime" },
      { name: "JSON & Consumo de Dados", level: "Avançado", tag: "Estrutura" },
      { name: "Bancos de Dados SQL/NoSQL", level: "Intermediário", tag: "Persistência" }
    ]
  },
  tools: {
    title: "Ferramentas & Fluxo de Trabalho",
    skills: [
      { name: "Git & GitHub", level: "Avançado", tag: "Versionamento" },
      { name: "VS Code / DevTools", level: "Avançado", tag: "Ambiente" },
      { name: "Arquitetura Limpa (Clean Code)", level: "Avançado", tag: "Metodologia" },
      { name: "Otimização de Performance", level: "Intermediário", tag: "Engenharia" }
    ]
  }
};

if (typeof window !== "undefined") {
  window.SKILLS_DATA = SKILLS_DATA;
}
