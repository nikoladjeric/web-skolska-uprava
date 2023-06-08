const bigPhoto = document.querySelector('.linksOrg .bigOne .bigphoto');
const bigInfoh1 = document.querySelector('.linksOrg .bigOne .info h1');
const bigInfoP = document.querySelector('.linksOrg .bigOne .info p');
const small = document.querySelectorAll('.linksOrg .smallOne .small');
let interval;
let i = 1;

const allLinks = [
    {
        name: 'Prva',
        text: 'Prva tekst neki ssdas',
        photo: 'SLIKE/1-stock.jpg',
        link: '#prvi',
    },
    {
        name: 'Druga',
        text: 'Druga tekst neki ssdas',
        photo: 'SLIKE/2-stock.jpg',
        link: '#drugi',
    },
    {
        name: 'Treca',
        text: 'Treca tekst neki ssdas',
        photo: 'SLIKE/3-stock.jpg',
        link: '#treci',
    },
    {
        name: 'Cetvrta',
        text: 'Cetvrta tekst neki ssdas',
        photo: 'SLIKE/4-stock.jpg',
        link: '#cetvrti',
    },
    
];

goBig(0);

const nodeAllLinks = Array.from(small);
nodeAllLinks.forEach((element, index) => {
    element.querySelector('h1').innerHTML = `${allLinks[index].name}`;
    element.querySelector('.photo').style.backgroundImage = `url('${allLinks[index].photo}')`;
    element.parentElement.setAttribute('href', `${allLinks[index].link}`);

    element.addEventListener('mouseenter', () => {
        console.log("stopirao")
        stopchangeBigPicture();
        goBig(index);
    });

    element.addEventListener('mouseleave', () => {
        console.log('krece opet');
        changeBigPicture();
    });
});

// changeBar(i - 1);
// changeBigPicture();

bigPhoto.parentElement.parentElement.addEventListener('mouseenter', () => {
    stopchangeBigPicture();
});

bigPhoto.parentElement.parentElement.addEventListener('mouseleave', () => {
    changeBigPicture();
});

function changeBigPicture() {
  if (!interval) {
    interval = setInterval(linksOrg, 4000);
  }
}

function stopchangeBigPicture() {
  clearInterval(interval);
  interval = null;
}

function linksOrg() {
    goBig(i);
    changeBar(i);
    i++;
    if(i > 3) {
        i = 0;
    }
}

function goBig(i) {
    bigPhoto.style.backgroundImage = `url('${allLinks[i].photo}')`;
    bigInfoh1.innerHTML = allLinks[i].name;
    bigInfoP.innerHTML = allLinks[i].text;
    bigPhoto.parentElement.setAttribute('href', `${allLinks[i].link}`);
}

function changeBar(num) {
    nodeAllLinks[num].querySelector('.smallbar').style.transition = 'width 3.5s ease-in-out';
    nodeAllLinks[num].querySelector('.smallbar').style.width = '100%';
  setTimeout(function() {
    nodeAllLinks[num].querySelector('.smallbar').style.width = '0%';
    nodeAllLinks[num].querySelector('.smallbar').style.transition = 'none';
  }, 3500);
}





if (window.innerWidth > 1024) {
    
    function handleIntersection(entries) {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            changeBar(i - 1);
            changeBigPicture();
        }
        });
    }
    
    const observer = new IntersectionObserver(handleIntersection, {
        threshold: 1.0
    });
    
    observer.observe(bigPhoto);

} else {

    changeBar(i - 1);
    changeBigPicture();
    
}