// INDEX JAVASCRIPT FILE

const HEAD_TAG = document.head;
const BODY_TAG = document.body;

// Main page content
const MAIN_TAG = document.createElement('main');
MAIN_TAG.className = 'main';
BODY_TAG.appendChild(MAIN_TAG);

// Viewport element
const VIEWPORT_TAG = document.createElement('meta');
VIEWPORT_TAG.name = 'viewport';
VIEWPORT_TAG.content = 'width=device-width,initial-scale=1';
HEAD_TAG.append(VIEWPORT_TAG);

// Viewport element
const CACHE_CONTROL_TAG = document.createElement('meta');
CACHE_CONTROL_TAG.httpEquiv = 'Cache-Control';
CACHE_CONTROL_TAG.content = 'public';
HEAD_TAG.append(CACHE_CONTROL_TAG);

// Link to index css
const INDEX_CSS_TAG = document.createElement('link');
INDEX_CSS_TAG.href = 'assets/css/index.css';
INDEX_CSS_TAG.type = 'text/css';
INDEX_CSS_TAG.rel = 'stylesheet';
HEAD_TAG.append(INDEX_CSS_TAG);


// Add projects list dynamically
const PROJECTS = [
    'canvas-learn',
];

const PROJECTS_TAG = document.getElementById('projects');

for (const project of PROJECTS) {
    const path = project+'/index.html';

    // Add link to project
    const project_tag = document.createElement('a');
    project_tag.id = 'project-link';
    project_tag.innerText = project;
    project_tag.href = path;
    PROJECTS_TAG.appendChild(project_tag);

    // Iframe to project
    const iframe_tag = document.createElement('iframe');
    iframe_tag.allow = 'allow';
    iframe_tag.allowFullscreen = true;
    iframe_tag.frameBorder = '0';
    iframe_tag.id = 'project-iframe';
    iframe_tag.loading = 'lazy';
    iframe_tag.scrolling = 'no';
    iframe_tag.src = path;
    PROJECTS_TAG.appendChild(iframe_tag);
}
