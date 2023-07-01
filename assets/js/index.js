// INDEX JAVASCRIPT FILE

const HEAD_TAG = document.head;
const BODY_TAG = document.body;


// Main page content
const MAIN_TAG = document.getElementsByTagName('main')[0];
MAIN_TAG.className = 'main';


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

