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


// Add heading to section
function addHeading(heading='', tag){
    let headingTag = document.createElement('div');
    let classNames = ['section-heading',
                      heading.replace(/ /g, '-').toLowerCase()+'-heading']
    headingTag.classList.add(...classNames);
    headingTag.classList.add();
    headingTag.innerText = heading;
    tag.appendChild(headingTag);
}


//Add bio-data dynamically
const BIO_DATA = {
    'Name': 'Daniel Muringe',
    'Age': (new Date()).getFullYear()-2005,
    'Gender': 'Male',
    'Nationality of Birth': 'Kenyan',
    'Residence': 'Nairobi, Kenya',
    'E-mail': 'danielmuringe@gmail.com',
    'Mobile Phone Number': '0792829730'
}

const BIO_DATA_TAG = document.createElement('div');
BIO_DATA_TAG.id = 'bio-data';


const bioDataWrapperTag = document.createElement('div');
bioDataWrapperTag.className = 'bio-data-wrapper';

addHeading('Bio Data', bioDataWrapperTag);

let maxBioDetailWidth = 0;
for (const bioDatum in BIO_DATA) {
    let bioDatumTag = document.createElement('div');
    bioDatumTag.className = 'bio-datum';
    bioDatumTag.innerText = `${bioDatum}: ${BIO_DATA[bioDatum]}`;
    bioDataWrapperTag.appendChild(bioDatumTag);
}

BIO_DATA_TAG.appendChild(bioDataWrapperTag);

MAIN_TAG.appendChild(BIO_DATA_TAG);


// Add projects list dynamically
const PROJECTS = [
    'canvas-learn',
];

const PROJECTS_TAG = document.createElement('div');
PROJECTS_TAG.id = 'projects';

addHeading("Projects", PROJECTS_TAG);

for (const project of PROJECTS) {
    const path = project+'/index.html';

    // Add link to project
    const projectTag = document.createElement('a');
    projectTag.className = 'project';
    projectTag.href = path;
    
    // Add project heading
    const projectHeading = document.createElement('div');
    projectHeading.className = 'project-heading';
    projectHeading.innerText += project;
    projectTag.append(projectHeading)

    // Add break line
    const lineBreak = document.createElement('hr');
    lineBreak.className = 'project-break-line';
    projectTag.appendChild(lineBreak);

    // Iframe to project
    const iframe_tag = document.createElement('iframe');
    iframe_tag.allow = '';
    iframe_tag.allowFullscreen = true;
    iframe_tag.className = 'project-iframe';
    iframe_tag.frameBorder = '0';
    iframe_tag.loading = 'lazy';
    iframe_tag.scrolling = 'no';
    iframe_tag.src = path;

    projectTag.appendChild(iframe_tag);

    PROJECTS_TAG.appendChild(projectTag);
}

MAIN_TAG.appendChild(PROJECTS_TAG);
