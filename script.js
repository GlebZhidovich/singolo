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

    !function phoneOffOn() {
        const phones = document.getElementById('phones');
        const phonesImg = document.querySelector('.slider__img-phones');
        const options = new Set();
        phones.addEventListener('click', function (e) {
            const actions = {
                default() {
                    phonesImg.src = 'assets/img/iPhones.png';
                },
                right() {
                    phonesImg.src = 'assets/img/iPhones-right-off.png';
                },
                left() {
                    phonesImg.src = 'assets/img/iPhones-left-off.png';
                },
                both() {
                    phonesImg.src = 'assets/img/iPhones-off.png';
                },
            };
            const btn = e.target.dataset.phone;
            if (btn) {
                if (options.size === 0) {
                    options.add(btn);
                    actions[btn]();
                    return;
                }
                if (options.size === 1) {
                    if (options.has(btn)) {
                        actions.default();
                        options.delete(btn);
                        return;
                    }
                    actions.both();
                    options.add(btn);
                    return;
                }
                if (options.size === 2) {
                    if (btn === 'right') actions.left();
                    if (btn === 'left') actions.right();
                    options.delete(btn);
                }
            }
        });
    }();

    !function portfolio() {
        const portfolioNav = document.querySelector('.portfolio__nav');
        let selected = document.querySelector('.portfolio__nav-btn_selected');
        const gallery = document.querySelector('.portfolio__gallery');
        const galleryImgs = document.querySelectorAll('.portfolio__gallery-img');
        let galleryImgSelected = null;
        const galleryImgsArr = [...galleryImgs];
        const actions = {
            all() {
                return galleryImgsArr;
            },
            web() {
                return galleryImgsArr.slice(0, 9);
            },
            graphic() {
                return galleryImgsArr.slice(0, 7);
            },
            artwork() {
                return galleryImgsArr.slice(0, 5);
            }
        };
        portfolioNav.addEventListener('click', function (e) {
            const select = e.target.dataset.nav;
            if (select) {
                if (select === selected) return;
                selected.classList.toggle('portfolio__nav-btn_selected');
                e.target.classList.toggle('portfolio__nav-btn_selected');
                selected = e.target;
                gallery.innerHTML = '';
                const imgs = actions[select]();
                imgs.forEach(img => gallery.append(img));
            }
        });
        gallery.addEventListener('click', function (e) {
            if (e.target === this) return;
            if (galleryImgSelected !== null) {
                galleryImgSelected.classList.toggle('portfolio__gallery-img_selected');
            }
            galleryImgSelected = e.target;
            galleryImgSelected.classList.toggle('portfolio__gallery-img_selected');
        })
    }();

    !function formValidation() {
        const contForm = document.forms.contacts;
        const submitBtn = document.querySelector('.contacts__btn');
        const modal = document.querySelector('.modal');
        const modalContent = document.querySelector('.modal__content');
        const modalBtn = document.querySelector('.modal__btn');
        const contFormItems = [...contForm];
        contForm.addEventListener('submit', function (e) {
            e.preventDefault();
        });
        function addContent (val, name) {
                const p = document.createElement('p');
                p.classList.add('modal__text');
                if (val === '')  {
                    const text = document.createTextNode(name === 'subject' ? 'Без темы' : 'Без опивания');
                    p.appendChild(text);
                }
                else  p.textContent = val;
                modalContent.appendChild(p);
        }
        let isEnable = true;
        submitBtn.addEventListener('click', function (e) {
            if (isEnable) {
                isEnable = false;
                for (let i = 0; i < contFormItems.length; i++) {
                    const {name, value} = contFormItems[i];
                    if (name === 'name' || name === 'email') {
                        isEnable = true;
                        if (value === '') return;
                    }
                    if (name === 'subject' || name === 'describe') {
                        addContent(value, name);
                    }
                }
                modal.style.display = 'flex';
            }
        });
        modalBtn.addEventListener('click', function (e) {
            modalContent.innerHTML = '';
            const p = document.createElement('p');
            p.classList.add('modal__text');
            p.textContent = 'Письмо отправлено';
            modalContent.appendChild(p);
            modal.style.display = 'none';
            isEnable = true;
        })
    }();
});


