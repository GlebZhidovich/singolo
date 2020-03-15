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

    !function slider() {
            const rightArrow = document.querySelector('.slider__control_right');
            const leftArrow = document.querySelector('.slider__control_left');
            const setOfItems = document.querySelectorAll('.slider__item');
            let curItem = 0;
            let isEnableBut = true;

            function setCurItem(n) {
                curItem = (n + setOfItems.length) % setOfItems.length;
            }

            function setNextItem(n) {
                hideItem('slider__item_to-right');
                setCurItem(n + 1);
                showItem('slider__item_from-left');
            }

            function setPrevItem(n) {
                hideItem('slider__item_to-left');
                setCurItem(n - 1);
                showItem('slider__item_from-right');
            }

            function hideItem(direction) {
                isEnableBut = false;
                setOfItems[curItem].classList.add(direction);
                setOfItems[curItem].addEventListener('animationend', function (e) {
                    this.classList.remove('slider__item-active', direction);
                })
            }

            function showItem(direction) {
                setOfItems[curItem].classList.add('slider__item-next', direction);
                setOfItems[curItem].addEventListener('animationend', function (e) {
                    this.classList.remove('slider__item-next', direction);
                    this.classList.add('slider__item-active');
                    isEnableBut = true;
                })
            }

            rightArrow.addEventListener('click', function (e) {
                if (isEnableBut) {
                    setNextItem(curItem);
                }
            });

            leftArrow.addEventListener('click', function (e) {
                if (isEnableBut) {
                    setPrevItem(curItem);
                }
            })
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

