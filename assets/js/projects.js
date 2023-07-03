// Add projects list dynamically


const PROJECTS = [
    'bouncing-balls',
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


// Add projects section to main tag
MAIN_TAG.appendChild(PROJECTS_TAG);
