const hamburgerIconDIV = document.querySelector('.hamburgerIcon');
const hamburgerIcon = document.querySelector('.hamburgerIcon > img');
const navigation = document.querySelector('nav > .container > ul');
const body = document.querySelector('body');
const h3 = document.querySelectorAll('nav h3');
const h4 = document.querySelectorAll('nav h4');


const relativePicturePath = hamburgerIcon.getAttribute("src");
const searchTrim = "SLIKE/";
const indexSearchTrim = relativePicturePath.indexOf(searchTrim);
const prefixPictures = relativePicturePath.substring(0, indexSearchTrim + searchTrim.length);


// glavna funkcionalnost hamburger menija 
hamburgerIcon.addEventListener('click', mobileMenu);

// prikazivanje/sakrivanje dropDown menija na telefonu
if (window.innerWidth < 1024) {
    h3.forEach(h3 => {
        h3.classList.toggle('marker0');
        h3.addEventListener('click', () => { 
            h3.classList.toggle('marker0');
            const ulArr = Array.from(h3.parentNode.parentNode.children);
            const onlyLiArr = ulArr.filter(ul => !ul.classList.contains('desc'));
            onlyLiArr.forEach(li => {
                expand(li);
                li.classList.toggle('marker1');
            });
            if(h3.classList.contains('marker0')) {
                const proba = h3.parentNode.parentNode;
                const opened1 = Array.from(proba.querySelectorAll('.marker1'));
                // console.log(opened1);
                const opened2 = Array.from(proba.querySelectorAll('.marker2'));
                // console.log(opened2);
                opened2.forEach(o => {
                    expand(o);
                    o.classList.toggle('marker2');
                });
                opened1.forEach(o => {
                    expand(o);
                    o.classList.toggle('marker1');
                });
            }
        });
    });
    
    h4.forEach(h4 => {
        h4.addEventListener('click', () => { 
            const onlyLiArr = Array.from(h4.nextElementSibling.children);
            onlyLiArr.forEach(li => {
                expand(li);
                li.classList.toggle('marker2');
            });
        });
    });

} 




function expand (node) {
    if(window.getComputedStyle(node).display == 'none'){
        node.style.display = 'block';
    } else {
        node.style.display = 'none';
    }
}

function mobileMenu() {

    if(navigation.style.left !== '0%') {
        navigation.style.left = '0%';
        navigation.scrollTop = 0;
        hamburgerIcon.src = prefixPictures + 'close_FILL0_wght400_GRAD0_opsz48.svg';
        navigation.style.overflow = 'scroll';
        body.style.overflow = 'hidden';

        const marker1 = document.querySelectorAll('.marker1');
        const marker2 = document.querySelectorAll('.marker2');
        marker1.forEach(marker => {
            expand(marker);
            marker.classList.toggle('marker1');
        });
        marker2.forEach(marker => {
            expand(marker);
            marker.classList.toggle('marker2');
        });
    } else {
        navigation.style.left = '-110%';
        hamburgerIcon.src = prefixPictures + 'menu_FILL0_wght700_GRAD200_opsz48.svg';
        navigation.style.overflow = 'hidden';
        body.style.overflow = 'scroll';
    }
    
}


// =====================================================================================================================================
//search

function searchlinkPrefix() {
    const currentPathName = window.location.pathname;
    console.log('window.pathname ' + window.location.pathname);
    console.log('window.location ' + window.location);
    href = window.location.href;
    probaIndex = window.location.href.indexOf('pilot-novi');
    console.log('proba: ' + href.slice(probaIndex + 10))
    const currentPathNameArray = currentPathName.substring(1).split('/');
  
    let pom = '';
  
    for(let i = 1; i < currentPathNameArray.length - 1; i++) {
      pom += '../'
    }
  
    return pom;
}

if (window.innerWidth < 1024) {
    const searchBtnSmall = document.querySelector("body > header > nav > div > ul > div > div");
    const searchInputSmall = document.querySelector("body > header > nav > div > ul > div > input[type=text]");

    searchBtnSmall.addEventListener('click', () => {
        if(searchInputSmall.value.length){
            window.location.href = searchlinkPrefix() + 'searchResults.html?key=' + searchInputSmall.value;
        }
    });

    searchInputSmall.addEventListener('keydown', function(e) {
        if(e.key === 'Enter') {
            if(searchInputSmall.value.length){
                window.location.href = searchlinkPrefix() + 'searchResults.html?key=' + searchInputSmall.value;
            }
        }
    });
} else {
    const searchBtnBig = document.querySelector("body > header > div > div.rightCorn > div.searchbox > div");
    const searchInputBig = document.querySelector("body > header > div > div.rightCorn > div.searchbox > input[type=text]");
    console.log(searchlinkPrefix() + 'searchResults.html?key=' + searchInputBig.value);
    searchBtnBig.addEventListener('click', () => {
        if(searchInputBig.value.length){
            window.location.href = searchlinkPrefix() + 'searchResults.html?key=' + searchInputBig.value;
        }
    });

    searchInputBig.addEventListener('keydown', function(e) {
        if(e.key === 'Enter') {
            if(searchInputBig.value.length){
                window.location.href = searchlinkPrefix() + 'searchResults.html?key=' + searchInputBig.value;
            }
        }
    });
}




