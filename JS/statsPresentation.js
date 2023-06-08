const statsCircle = document.querySelector('.statsCircle');
const allCircles = document.querySelectorAll('.statsCircle > .stat');
const centerInfo = document.querySelector('.statsCircle > .center');
const infoNumber = document.querySelector('.statsCircle > .center > h1');
const infoPara = document.querySelector('.statsCircle > .center > p');
let intervalInfo;
let INFO = 0;

const animations = [
    {
        animationName : 'dealingOne',
        top: 0 + '%',
        left: 42.84 + '%',
    }, 
    
    {
        animationName : 'dealingTwo',
        top: 13.3 + '%',
        right: 13.3 + '%',
    },

    {
        animationName : 'dealingThree',
        top: 42.84 + '%',
        right: 0 + '%',
    },

    {
        animationName : 'dealingFour',
        right: 13.3 + '%',
        bottom: 13.3 + '%',
    },

    {
        animationName : 'dealingFive',
        bottom: 0 + '%',
        left: 42.84 + '%',
    },

    {
        animationName : 'dealingSix',
        bottom: 13.3 + '%',
        left: 13.3 + '%',
    },

    {
        animationName : 'dealingSeven',
        top: 42.84 + '%',
        left: 0 + '%',
    },

    {
        animationName : 'dealingEight',
        top: 13.3 + '%',
        left: 13.3 + '%',
    },

];


const allInfo = [
    {
        number: '1',
        text: 'Phasellus nec nunc purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.'
    },

    {
        number: '2',
        text: 'Phasellus nec nunc purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.'
    },

    {
        number: '3',
        text: 'Phasellus nec nunc purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.'
    },

    {
        number: '4',
        text: 'Phasellus nec nunc purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.'
    },

    {
        number: '5',
        text: 'Phasellus nec nunc purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.'
    },

    {
        number: '6',
        text: 'Phasellus nec nunc purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.'
    },

    {
        number: '7',
        text: 'Phasellus nec nunc purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.'
    },

    {
        number: '8',
        text: 'Phasellus nec nunc purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.'
    },
];

const allCirclesArr = Array.from(allCircles);

// function handleIntersection(entries) {
//     entries.forEach(entry => {
//     if (entry.isIntersecting) {
       

//         allCirclesArr.forEach((circle, index) => {
//             setTimeout(() => {
//                 circle.style.opacity = 1;

//                 for (const prop in animations[index]) {
//                     circle.style[prop] = animations[index][prop];
//                 }

//             }, index * 250);
            
//         });

//         allCirclesArr[2].addEventListener('animationend', () => {
//             // console.log('gotova animacija');
//             centerInfo.style.opacity = 1;

//             startNextCircle();
//         });

//         allCirclesArr[7].addEventListener('animationend', () => {
//             // console.log('gotova animacija final');
//             // centerInfo.style.opacity = 1;
//             // startNextCircle();

//             allCirclesArr.forEach((circle, index) => {
//                 circle.addEventListener('mouseenter', () => {
//                     console.log("stopirao")
//                     stopNextCircle();

//                     infoNumber.innerHTML = allInfo[index].number;
//                     infoPara.innerHTML = allInfo[index].text;
//                     circle.style.backgroundColor = '#0C71C3';                 
//                 });
            
//                 circle.addEventListener('mouseleave', () => {
//                     console.log('krece opet');
//                     startNextCircle();
//                     circle.style.backgroundColor = 'white';
//                 });
//             });

//         });

//     } else {
//         centerInfo.style.opacity = 0;
//         infoNumber.innerHTML = '';
//         infoPara.innerHTML = '';
//         INFO = 0;
//         stopNextCircle();

//         allCirclesArr.forEach((circle, index) => {
//             circle.style.opacity = 0;
//             circle.style.animationName = 'none';

//             if(animations[index].hasOwnProperty('top')) {
//                 circle.style.top = '42.84%';
//             }

//             if(animations[index].hasOwnProperty('right')) {
//                 circle.style.right = '42.84%';
//             }

//             if(animations[index].hasOwnProperty('bottom')) {
//                 circle.style.bottom = '42.84%';
//             }

//             if(animations[index].hasOwnProperty('left')) {
//                 circle.style.left = '42.84%';
//             }
//         });

//     }
//     });
// }

// const observer = new IntersectionObserver(handleIntersection, {
//     threshold: 1.0
// });

// observer.observe(statsCircle);

function animateCircles() {
    allCirclesArr.forEach((circle, index) => {
        setTimeout(() => {
            circle.style.opacity = 1;

            for (const prop in animations[index]) {
                circle.style[prop] = animations[index][prop];
            }
        }, index * 250);
    });

    allCirclesArr[2].addEventListener('animationend', () => {
        centerInfo.style.opacity = 1;
        startNextCircle();
    });

    allCirclesArr[7].addEventListener('animationend', () => {
        allCirclesArr.forEach((circle, index) => {
            circle.addEventListener('mouseenter', () => {
                stopNextCircle();
                infoNumber.innerHTML = allInfo[index].number;
                infoPara.innerHTML = allInfo[index].text;
                circle.style.backgroundColor = '#0C71C3';
            });

            circle.addEventListener('mouseleave', () => {
                startNextCircle();
                circle.style.backgroundColor = 'white';
            });
        });
    });
}
  
function handleIntersection(entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            animateCircles();
            observer.unobserve(entry.target);
        }
    });
}
  
const observer = new IntersectionObserver(handleIntersection, {
    threshold: 1.0,
});
  
// observer.observe(statsCircle);

let isEdge = /Edg/.test(navigator.userAgent);
if (isEdge) {
    animateCircles();
} else {
    observer.observe(statsCircle);
}

function startNextCircle() {
    if (!intervalInfo) {
        intervalInfo = setInterval(afterCircleAnimation, 1500);
    }
}
  
function stopNextCircle() {
    clearInterval(intervalInfo);
    intervalInfo = null;
}

function nextCircle(index) {
    infoNumber.innerHTML = allInfo[index].number;
    infoPara.innerHTML = allInfo[index].text;

    allCirclesArr[index].style.backgroundColor = '#0C71C3';
    setTimeout(() => {
        allCirclesArr[index].style.backgroundColor = 'white';
    }, 1000);
}

function afterCircleAnimation() {
    nextCircle(INFO);
    INFO++;
    if(INFO > 7) {
        INFO = 0;
    }
}
