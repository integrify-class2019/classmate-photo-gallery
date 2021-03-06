// **** Get DOM elements ****
let classGallery = document.querySelector('.class-gallery');
let showInfo;

const buildProfileCard = ({
    firstName,
    lastName,
    title,
    nationality,
    src,
    favoriteQuote,
    alt,
    joinedOn,
    motivatesMe,
    longTermVision,
    whySofterDeveloper,
    skills
}) => {
    const profileCard = document.createElement('div');
    profileCard.classList.add('profile-card');
    profileCard.innerHTML = `<div class="front-face" style="background-image: url(./assets/profile-pictures/${src})"></div>
            <div class="back-face profile-info">
                <h2 class="name">${firstName} ${lastName}</h2>
                <h3 class="title">${title}</h3>
                <span class="span-nationality">Nationality</span>
                <h3 class="nationality">${nationality}</h3>
                <h3 class="skills"><span>Skills</span></br>${skills.join(
                    ', '
                )}</h3>
                <p class="why-developer"><span>Why developer:</span></br>${whySofterDeveloper}</p>
                <p class="vision"><span>Vision:</span></br>${longTermVision}</p>
                <p class="motivation"><span>Motivation:</span></br>${motivatesMe}</p>
                <p class="quote"><span>Quote:</span></br>${favoriteQuote}</p>
                <h4 class="joined-on"><span>Joined On:</span></br>${joinedOn}</h4>
            </div>`;

    classGallery.appendChild(profileCard);
};

const renderProfileCard = arr => {
    arr.forEach(student => buildProfileCard(student));
};

renderProfileCard(studentsInfo);

let profileCards = document.querySelectorAll('.profile-card');
let frontFaces = document.querySelectorAll('.front-face');

// ***** Flip card funtion *****

function flipCard() {
    console.log(this);

    profileCards.forEach(card => {
        if (card != this) card.classList.remove('flip');
    });
    this.classList.toggle('flip');
}
profileCards.forEach(profileCard =>
    profileCard.addEventListener('click', flipCard)
);
profileCards.forEach(card =>
    card.addEventListener('mouseleave', () => card.classList.remove('flip'))
);
// ***** hover function ****
function onMouseEnter() {
    const that = this;
    // setTimeout(function run() {
    frontFaces.forEach(front => (front.innerHTML = ''));
    content = `<div class="front-face-info">
        <h2>${that.querySelector('.name').textContent}</h2>
        <h5>${that.querySelector('.title').textContent}</h3>
        <h4>${that.querySelector('.nationality').textContent}</h3>
        </div>`;
    that.querySelector('.front-face').innerHTML = content;

    const frontFaceInfo = document.querySelector('.front-face-info');
    frontFaceInfo.style.opacity = 0;

    setInterval(function() {
        if (frontFaceInfo.style.opacity < 1) {
            frontFaceInfo.style.opacity -= 0.005 * -1;
        } else {
            clearInterval();
        }
    }, 1);
    // }, 500);
}
profileCards.forEach(profileCard =>
    profileCard.addEventListener('mouseenter', onMouseEnter)
);
profileCards.forEach(profileCard =>
    profileCard.addEventListener('mouseleave', () => {
        frontFaces.forEach(front => (front.innerHTML = ''));
    })
);

/* ************ arrow left and right scroll ************** */

const arrowWrapper = document.querySelectorAll('.arrow');
let interval;
let speed = 0;
// doScroll('right');
function doScroll(direction) {
    // console.log(speed);

    clearInterval(interval);
    interval = setInterval(function run() {
        if (direction === 'right') {
            classGallery.scrollLeft += 1 + speed;
        } else {
            classGallery.scrollLeft -= 1 + speed;
        }
    }, 10);

    speed += 2;
}

function mouseEnter(e) {
    const { direction } = e.target.dataset;
    // console.log(direction);

    doScroll(direction);
}

arrowWrapper.forEach(arrow => {
    arrow.addEventListener('click', mouseEnter);
    arrow.addEventListener('mouseleave', () => {
        // console.log('clear');
        clearInterval(interval);
        speed = 0;
    });
});

/* ************  infinity scroll ************** */
let maxScrollLeft = classGallery.scrollWidth - classGallery.clientWidth;
function scrollRun() {
    // console.log(maxScrollLeft);
    // console.log(classGallery.scrollLeft);
    if (maxScrollLeft == classGallery.scrollLeft) {
        renderProfileCard(studentsInfo);
        classGallery = document.querySelector('.class-gallery');
        maxScrollLeft = classGallery.scrollWidth - classGallery.clientWidth;

        // add event
        profileCards = document.querySelectorAll('.profile-card');
        frontFaces = document.querySelectorAll('.front-face');
        profileCards.forEach(profileCard =>
            profileCard.addEventListener('click', flipCard)
        );
        profileCards.forEach(profileCard =>
            profileCard.addEventListener('mouseenter', onMouseEnter)
        );
        profileCards.forEach(profileCard =>
            profileCard.addEventListener('mouseleave', () => {
                frontFaces.forEach(front => (front.innerHTML = ''));
            })
        );
    }
}

classGallery.addEventListener('scroll', scrollRun);
