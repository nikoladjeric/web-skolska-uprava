const sliders = document.querySelectorAll('.slider-items');
// const progress = document.querySelectorAll('.progress');

let sliderGrabbed = false;

sliders.forEach((slider) => {
    let touchStartX = 0;
    let touchEndX = 0;
    let lastSlide = 0;

    const progress = slider.parentElement.parentElement.querySelector('.progress');
    const progressCenter = progress.querySelector('.progressCenter');

    for(let i = 0; i < slider.childElementCount; i++) {
        const newDiv = document.createElement('div');
        newDiv.className = 'progressSlide' + ' ' + i;
        progressCenter.appendChild(newDiv);
    }

    const progressSlides = progressCenter.querySelectorAll('.progressSlide');
    progressSlides[lastSlide].style.backgroundColor = '#0C71C3';


    slider.parentElement.addEventListener('scroll', (e) => {
        // progressBar.style.width  = `${getScrollPercentage()}%`
        // console.log(slider.parentElement.scrollLeft);
        // console.log(slider.parentElement.scrollWidth / slider.parentElement.clientWidth);
        // console.log(currentSlide(slider.parentElement.scrollLeft))
        if(lastSlide != currentSlide(slider.parentElement.scrollLeft)){
            progressSlides[lastSlide].style.backgroundColor = 'transparent';
            lastSlide = currentSlide(slider.parentElement.scrollLeft);
            progressSlides[lastSlide].style.backgroundColor = '#0C71C3';
        }
    });
    
    slider.addEventListener('mousedown', (e) => {
        sliderGrabbed = true;
        slider.style.cursor = 'grabbing';
        if (slider.classList.contains('bigSlider')) {
            slider.parentElement.style.overflow = 'scroll';
            touchStartX = e.clientX;
            // console.log('touchStartX' + touchStartX)
        }
    });
    
    slider.addEventListener('mouseup', (e) => {
        sliderGrabbed = false;
        slider.style.cursor = 'grab';
        if (slider.classList.contains('bigSlider')) {
            touchEndX = e.clientX;
            // console.log('touchEndX' + touchEndX)
            if (touchEndX < touchStartX && touchStartX - touchEndX > 50) {
                slideAnimation(positions[currentSlide(slider.parentElement.scrollLeft) + 1]);
            } else if (touchEndX > touchStartX && touchEndX - touchStartX > 50) {
                slideAnimation(positions[currentSlide(slider.parentElement.scrollLeft - 1)]);
            } else {
                slideAnimation(positions[currentSlide(slider.parentElement.scrollLeft)]);
            }
        }
    });
    
    slider.addEventListener('mouseleave', (e) => {
        sliderGrabbed = false;
    });
    
    slider.addEventListener('mousemove', (e) => {
        if(sliderGrabbed){
            slider.parentElement.scrollLeft -= e.movementX;
        }
    });
    
    slider.addEventListener('wheel', (e) =>{
        e.preventDefault()
        slider.parentElement.scrollLeft += e.deltaY;
    });
    
    function getScrollPercentage(){
       return ((slider.parentElement.scrollLeft / (slider.parentElement.scrollWidth - slider.parentElement.clientWidth) ) * 100);
    }

    const positions = [0];
    while(positions[positions.length - 1] < slider.parentElement.scrollWidth){
        positions.push(positions[positions.length - 1] + slider.parentElement.clientWidth)
    }
    console.log(positions);

    function currentSlide (scrollLeft) {
        let test = positions.filter(postion => scrollLeft >= postion);
        return test.length - 1;
    }

    

    function slideAnimation(position) {
        const startPosition = slider.parentElement.scrollLeft;
        const distance = position - startPosition;
        let duration;
        if(window.innerWidth > 1000) {
            duration = 500;
        } else {
            duration = 300;
        }
        let start = null;
      
        function step(timestamp) {
          if (!start) start = timestamp;
          const progress = timestamp - start;
          let ease;
          if (window.innerWidth > 1000) {
            ease = (progress / duration) ** 2; //ease-in-out
          } else {
            ease = (progress / duration); //linear
          }
          const scrollLeft = startPosition + distance * ease;
          if ((distance > 0 && scrollLeft >= position) || (distance < 0 && scrollLeft <= position)) {
            slider.parentElement.scrollLeft = position;
            if (slider.classList.contains('bigSlider')) {
                slider.parentElement.style.overflow = 'hidden';
            }  
            return;
          }
          slider.parentElement.scrollLeft = scrollLeft;
          if (progress < duration) {
            window.requestAnimationFrame(step);
          }
        }
      
        window.requestAnimationFrame(step);
    }

      
    // leftBtn 
    const leftBtn = slider.parentElement.nextElementSibling.querySelector('.leftBtn');
    leftBtn.addEventListener('click', () => {
        slideAnimation(positions[currentSlide(slider.parentElement.scrollLeft - 1)]);
    });

    // rightBtn 
    const rightBtn = slider.parentElement.nextElementSibling.querySelector('.rightBtn');
    rightBtn.addEventListener('click', () => {
        slideAnimation(positions[currentSlide(slider.parentElement.scrollLeft) + 1]);
    });

    progressSlides.forEach((ps) => {
        ps.addEventListener('click', () => {
            slideAnimation(positions[ps.className.slice(-1)]);
        });
    }); 

    slider.addEventListener("touchstart", (event) => {
        if (slider.classList.contains('bigSlider')) {
            slider.parentElement.style.overflow = 'scroll';
            touchStartX = event.touches[0].clientX;
            // console.log('touchStartX' + touchStartX)
        }
    });

    slider.addEventListener("touchend", (event) => {
        if (slider.classList.contains('bigSlider')) {
            touchEndX = event.changedTouches[0].clientX;
            // console.log('touchEndX' + touchEndX)
            if (touchEndX < touchStartX && touchStartX - touchEndX > 50) {
                slideAnimation(positions[currentSlide(slider.parentElement.scrollLeft) + 1]);
            } else if (touchEndX > touchStartX && touchEndX - touchStartX > 50) {
                slideAnimation(positions[currentSlide(slider.parentElement.scrollLeft - 1)]);
            } else {
                slideAnimation(positions[currentSlide(slider.parentElement.scrollLeft)]);
            }
        }
    });

    
 
});

