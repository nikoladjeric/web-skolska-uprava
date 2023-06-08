const hamburgerIconDIV = document.querySelector('.hamburgerIcon');
const hamburgerIcon = document.querySelector('.hamburgerIcon > img');
const navigation = document.querySelector('nav > .container > ul');
const body = document.querySelector('body');

hamburgerIcon.addEventListener('click', mobileMenu);

function mobileMenu() {
    if(navigation.style.left !== '0%') {
        navigation.style.left = '0%';
        hamburgerIcon.src = 'SLIKE/close_FILL0_wght400_GRAD0_opsz48.svg';
        navigation.style.overflow = 'scroll';
        body.style.overflow = 'hidden';
    } else {
        navigation.style.left = '-110%';
        hamburgerIcon.src = 'SLIKE/menu_FILL0_wght700_GRAD200_opsz48.svg';
        navigation.style.overflow = 'hidden';
        body.style.overflow = 'scroll';
    }
    
}



window.addEventListener('resize', function() {
    let windowWidth = window.innerWidth;
    
    if (windowWidth < 1024) {
        console.log('manje od 1024 - radi .expand promena');

        const expand = document.querySelectorAll('nav > .container > ul > a:has(.expand)');
    
        expand.forEach(exp => {
            const subMenu = exp.nextElementSibling;
            let isExpanded = false;
    
            exp.addEventListener('click', () => {
                subMenu.classList.toggle('shown');
            });
        });
    } //else if (windowWidth >= 1024) {
        //const nav = this.document.querySelectorAll()
    //}
});
  