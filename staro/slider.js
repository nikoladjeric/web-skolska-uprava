const slider = document.querySelector('.slider-items');
const slide = document.querySelector('.sliderItem');
// const progressBar = document.querySelector('.prog-bar-inner');
const leftBtnMain = document.querySelector('#leftMainSlider');
const rightBtnMain = document.querySelector('#rightMainSlider');

// let sigma = 1 + window.innerWidth / ((window.innerWidth - slide.offsetWidth - 20) / 2);
// let sigma;
// sigma = sigmaSetup(window.innerWidth);
// console.log(sigma);

// window.addEventListener('resize', () => {
//     sigma = sigmaSetup(window.innerWidth);
//     console.log(sigma);
// });


// pripremanje niza
let sum = 0;
let slidesPositions = [0];
let numberOfSlides = 10;
sum += (slide.offsetWidth + 20); // / sigma;
slidesPositions.push(sum);

while (sum < (slider.parentElement.scrollWidth - slider.parentElement.clientWidth)) {
    sum += slide.offsetWidth + 20;
    slidesPositions.push(sum);
}

console.log(slidesPositions);

let currentSlide = 1;
slider.parentElement.scrollLeft = slidesPositions[currentSlide];

leftBtnMain.addEventListener('click', () => {
    if(currentSlide > 0) {
        let test = slidesPositions.filter(postion => slider.parentElement.scrollLeft > postion);
        slider.parentElement.scrollLeft = slidesPositions[test.length - 1];
        currentSlide = test.length - 1;
    }
});


rightBtnMain.addEventListener('click', () => {
    if(currentSlide < numberOfSlides - 1) {
        let test = slidesPositions.filter(postion => slider.parentElement.scrollLeft > postion);
        slider.parentElement.scrollLeft = slidesPositions[test.length + 1];
        currentSlide = test.length + 1;
    }
});

let sliderGrabbed = false;

slider.parentElement.addEventListener('scroll', (e) => {
    if (slider.parentElement.scrollLeft === 0) {
        leftBtnMain.style.display = 'none';
    } else {
        leftBtnMain.style.display = 'block';
    }

    if (slider.parentElement.scrollLeft === (slider.parentElement.scrollWidth - slider.parentElement.clientWidth)) {
        rightBtnMain.style.display = 'none';
    } else {
        rightBtnMain.style.display = 'block';
    }
    // console.log(getScrollPercentage());
    // console.log(`${slider.parentElement.scrollLeft} trenutni slajd: ${currentSlide + 1}`);
})

slider.addEventListener('mousedown', (e) => {
    sliderGrabbed = true;
    slider.style.cursor = 'grabbing';
})

slider.addEventListener('mouseup', (e) => {
    sliderGrabbed = false;
    slider.style.cursor = 'grab';
})

slider.addEventListener('mouseleave', (e) => {
    sliderGrabbed = false;
})

slider.addEventListener('mousemove', (e) => {
    if(sliderGrabbed){
        slider.parentElement.scrollLeft -= e.movementX;
    }
})

slider.addEventListener('wheel', (e) =>{
    e.preventDefault()
    slider.parentElement.scrollLeft += e.deltaY;
})

function getScrollPercentage(){
   return ((slider.parentElement.scrollLeft / (slider.parentElement.scrollWidth - slider.parentElement.clientWidth) ) * 100);
}

// function sigmaSetup(window){
//     if(window < 400) {
//         return 1.1;
//     } else if (window < 768) {
//         return  1.2;
//     } else if (window < 1024) {
//         return  1.1;
//     }
//     return  2;
// }