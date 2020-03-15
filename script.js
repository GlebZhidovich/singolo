document.addEventListener("DOMContentLoaded", function() {

    !function navigation() {
        const headerNavigation = document.querySelector('.main-header__items');
        headerNavigation.addEventListener('click', moveToSection);

        function moveToSection(event) {
            event.preventDefault();
            const setOfSections = {
                home: document.querySelector('.main-header'),
                services: document.querySelector('.services'),
                portfolio: document.querySelector('.portfolio'),
                about: document.querySelector('.about-us'),
                contact: document.querySelector('.contacts')
            };
            const {height: headerHeight} = setOfSections['home'].getBoundingClientRect();
            let selected = document.querySelector('.main-header__link_selected');
            return !function () {
                const {textContent: nameOfSection} = event.target;
                if (nameOfSection === selected.textContent) return;
                if (nameOfSection in setOfSections) {
                    selected.classList.toggle('main-header__link_selected');
                    const {target: navElement} = event;
                    navElement.classList.toggle('main-header__link_selected');
                    selected = navElement;
                    const {y: sectionTop} = setOfSections[nameOfSection].getBoundingClientRect();
                    const sectionY = sectionTop - headerHeight;
                    if (nameOfSection === 'home') scrollTo(0, 0);
                    else scrollBy(0, sectionY);
                }
            }()
        }
    }();

});



// const header = document.querySelector('.main-header');
// const services = document.querySelector('.services');
// const portfolio = document.querySelector('.portfolio');
// const aboutUs = document.querySelector('.about-us');
// const contacts = document.querySelector('.contacts');
//
//
// const {height: headerHeight} = header.getBoundingClientRect();

