/*=============== SHOW MENU ===============*/
const showPortfolioMenu = (toggleId, navId) => {
    const portfolioToggle = document.getElementById(toggleId),
          portfolioNav = document.getElementById(navId)

    if(portfolioToggle && portfolioNav){
        portfolioToggle.addEventListener('click', () => {
            portfolioNav.classList.toggle('show-menu')
        })
    }
}
showPortfolioMenu('nav-toggle','nav-menu')




/*=============== REMOVE MENU MOBILE ===============*/
const portfolioNavLink = document.querySelectorAll('.nav__link')

const portfolioLinkAction = () => {
    const portfolioNavMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    portfolioNavMenu.classList.remove('show-menu')
}
portfolioNavLink.forEach(n => n.addEventListener('click', portfolioLinkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
const portfolioScrollHeader = () => {
    const portfolioHeader = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(window.scrollY >= 50) {
        portfolioHeader.classList.add('scroll-header')
    } else {
        portfolioHeader.classList.remove('scroll-header')
    }
}
window.addEventListener('scroll', portfolioScrollHeader)

/*=============== SERVICES MODAL ===============*/
const portfolioModalViews = document.querySelectorAll('.services__modal'),
      portfolioModalBtns = document.querySelectorAll('.services__button'),
      portfolioModalClose = document.querySelectorAll('.services__modal-close')

let portfolioModal = function(portfolioModalClick) {
    portfolioModalViews[portfolioModalClick].classList.add('active-modal')
}

portfolioModalBtns.forEach((mb, i) => {
    mb.addEventListener('click', () => {
        portfolioModal(i)
    })
})

portfolioModalClose.forEach((mc) => {
    mc.addEventListener('click', () => {
        portfolioModalViews.forEach((mv) => {
            mv.classList.remove('active-modal')
        })
    })
})

/*=============== MIXITUP FILTER PORTFOLIO ===============*/
// Initialize mixitup for work section
let portfolioMixerUp;

document.addEventListener('DOMContentLoaded', function() {
    // Check if work content exists
    const workContent = document.querySelector('#work-content');
    if (workContent) {
        // Simple filter functionality without external library
        const filterButtons = document.querySelectorAll('.work__item');
        const workCards = document.querySelectorAll('.work__card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active-work'));
                // Add active class to clicked button
                button.classList.add('active-work');

                const filterValue = button.getAttribute('data-filter');

                workCards.forEach(card => {
                    if (filterValue === 'all' || card.classList.contains(filterValue.replace('.', ''))) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.5s ease-in-out';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
});


/*=============== CONTACT FORM EMAILJS ===============*/


