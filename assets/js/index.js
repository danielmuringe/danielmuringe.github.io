// INDEX JAVASCRIPT FILE

const headTag = document.getElementsByTagName('head')[0];
const bodyTag = document.getElementsByTagName('body')[0];

// Main page content
const mainTag = document.createElement('main');
mainTag.className = 'main';
bodyTag.appendChild(mainTag);

// Viewport element
const viewportTag = document.createElement('meta');
viewportTag.name = 'viewport';
viewportTag.content = 'width=device-width,initial-scale=1';
headTag.append(viewportTag);

// Viewport element
const cacheControlTag = document.createElement('meta');
cacheControlTag.httpEquiv = 'Cache-Control';
cacheControlTag.content = 'public';
headTag.append(cacheControlTag);

// Link to index css
const indexCssTag = document.createElement('link');
indexCssTag.href = 'assets/css/index.css';
indexCssTag.type = 'text/css';
indexCssTag.rel = 'stylesheet';
headTag.append(indexCssTag);


// CONNECTING DOTS BACKGROUND
// Set variables
const show = 75;
const canvas = document.getElementById("canvas");
const scene = canvas.getContext("2d");
let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);
