/**
 * ============================================================================
 * DATASET DE PROJETOS (projects-data.js)
 * ============================================================================
 * Este arquivo centraliza os projetos do portfólio.
 * Você pode editar, adicionar ou remover itens neste array sem precisar alterar
 * a estrutura do HTML.
 */

const PROJECTS_DATA = [
  {
    id: "dev-flow-hub",
    title: "DevFlow - Plataforma de Produtividade",
    category: "fullstack",
    categoryLabel: "Full Stack",
    shortDescription: "Aplicação web para gerenciamento ágil de tarefas e automações de fluxo de trabalho para times de engenharia.",
    fullDescription: "Desenvolvido com foco em alta performance e experiência do desenvolvedor, o DevFlow integra boards Kanban interativos, sincronização em tempo real e relatórios de progresso em tempo hábil.",
    technologies: ["JavaScript ES6+", "HTML5 Semântico", "CSS3 / Grid", "REST API", "LocalStorage"],
    featured: true,
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    metrics: "Tempo de carregamento < 0.8s"
  },
  {
    id: "api-gateway-metrics",
    title: "Metrics Dashboard & API Monitor",
    category: "backend",
    categoryLabel: "Backend & API",
    shortDescription: "Painel de controle para monitoramento de rotas de API, latência de respostas e taxa de erros em serviços web.",
    fullDescription: "Sistema voltado para observabilidade de microsserviços, com visualização gráfica de requisições, filtros por status code e alertas configuráveis.",
    technologies: ["Node.js", "Express", "RESTful Architecture", "JSON APIs", "Charts.js"],
    featured: true,
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    metrics: "Suporte a milhares de logs"
  },
  {
    id: "design-system-purple",
    title: "Nebula UI - Design System",
    category: "frontend",
    categoryLabel: "Frontend & UI",
    shortDescription: "Biblioteca de componentes acessíveis e responsivos com suporte nativo a temas escuro e claro.",
    fullDescription: "Conjunto robusto de componentes reutilizáveis (botões, modais, cards, inputs) construídos com CSS puro, alto contraste e conformidade com as diretrizes WCAG AAA.",
    technologies: ["CSS Modular", "CSS Custom Properties", "JavaScript Vanilla", "Acessibilidade (a11y)"],
    featured: false,
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    metrics: "100% Conformidade WCAG"
  },
  {
    id: "weather-code-tracker",
    title: "DevWeather - Clima & Insights",
    category: "frontend",
    categoryLabel: "Frontend & UI",
    shortDescription: "Interface meteorológica com busca instantânea de cidades, previsão de 7 dias e visualização com tema roxo.",
    fullDescription: "Consumo de API pública de meteorologia, tratamento de geolocalização e transições suaves entre estados de clima com animações puras em CSS.",
    technologies: ["Fetch API", "Async/Await", "Responsive Design", "SVG Dinâmico"],
    featured: false,
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    metrics: "Consumo assíncrono otimizado"
  }
];

// Disponibiliza o array globalmente para uso nos módulos
if (typeof window !== "undefined") {
  window.PROJECTS_DATA = PROJECTS_DATA;
}
