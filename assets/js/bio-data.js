//Add bio-data dynamically
const BIO_DATA = {
    'Name': 'Daniel Muringe',
    'Age': (new Date()).getFullYear()-2005,
    'Gender': 'Male',
    'Nationality of Birth': 'Kenyan',
    'Residence': 'Nairobi, Kenya',
    'E-mail': 'danielmuringe@gmail.com',
    'Phone Number': '+254792829730'
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


// Add bio-data-section to main tag
MAIN_TAG.appendChild(BIO_DATA_TAG);
