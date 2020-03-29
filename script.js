document.addEventListener("DOMContentLoaded", function() {

    const main = {
        'main-header': document.querySelector('.main-header'),
        'main-header__wrap': document.querySelector('.main-header__wrap'),
        'main-header__btn': document.querySelector('.main-header__btn'),
        'main-header__items': document.querySelector('.main-header__items')
    };

    function switchBtn(obj) {
        for (let key in obj) {
            obj[key].classList.toggle(`${key}_mobile`);
        }
    }

    let isOpen = false;

    const setOfSections = {
        home: document.querySelector('.header'),
        slider: document.querySelector('.slider'),
        services: document.querySelector('.services'),
        portfolio: document.querySelector('.portfolio'),
        about: document.querySelector('.about-us'),
        contact: document.querySelector('.contacts')
    };

    const setOfButtons = {
        home: document.querySelector('a[href="#"]'),
        slider: document.querySelector('a[href="#"]'),
        services: document.querySelector('a[href="#services"]'),
        portfolio: document.querySelector('a[href="#portfolio"]'),
        about: document.querySelector('a[href="#about"]'),
        contact: document.querySelector('a[href="#contact"]')
    };

    let selected = document.querySelector('.main-header__link_selected');

    function changeClass(selected, selectedNext) {
        selected.classList.toggle('main-header__link_selected');
        selectedNext.classList.toggle('main-header__link_selected');
    }

    function changeSelectBut(button) {
        if(selected === button) return;
        changeClass(selected, button);
        selected = button;
    }

    !function curLayer() {
        for (let key in setOfSections) {
            const {top, height} = setOfSections[key].getBoundingClientRect();
            if (Math.abs(top) < height / 2 ) {
                changeSelectBut(setOfButtons[key]);
            }
        }
    }();
    let isAnim = true;
    function animateLayer(layer) {
        if (isAnim) {
            isAnim = false;
            layer.classList.add('layer-animation');
            layer.addEventListener('animationend', function removeClass() {
                this.classList.remove('layer-animation');
                layer.removeEventListener('animationend', removeClass);
                isAnim = true;
            });
        }

    }

    !function navigation() {
        const headerNavigation = document.querySelector('.main-header__items');
        headerNavigation.addEventListener('click', moveToSection);
        let animationId = null;
        document.addEventListener('scroll', findActiveLayer);
        let lastPos = pageYOffset;
        function findActiveLayer (e) {
            const curPos = pageYOffset;
            const minLengthToBlock = 50;
            const minLenForAnim = 200;
            const beginBlockPos = 0;
            for (let key in setOfSections) {
                const {top, bottom, height} = setOfSections[key].getBoundingClientRect();
                // if (top - innerHeight < minLenForAnim && top - innerHeight > beginBlockPos && curPos - lastPos > beginBlockPos && isAnim) {
                //     animateLayer(setOfSections[key]);
                // }
                if ((top > beginBlockPos && top < minLengthToBlock) && curPos - lastPos > beginBlockPos) {
                    changeSelectBut(setOfButtons[key]);
                    break;
                }
                if ((bottom > beginBlockPos && bottom < minLengthToBlock) && curPos - lastPos < beginBlockPos) {
                    changeSelectBut(setOfButtons[key]);
                    break;
                }
            }
            lastPos = curPos;
        }
        function animateScroll(size, speed) {
            let newSize = Math.abs(size);
            requestAnimationFrame(function animate(time) {
                if (newSize - speed < 0) {
                    speed = newSize;
                }
                newSize -= speed;
                if (size > 0) {
                    scrollBy(0 , speed);
                } else {
                    scrollBy(0 , -speed);
                }
                if (newSize > 0) {
                    animationId = requestAnimationFrame(animate);
                }
                if (newSize <= 0) {
                    cancelAnimationFrame(animationId);
                    document.addEventListener('scroll', findActiveLayer);
                }
            });
        }
        function moveToSection(event) {
            event.preventDefault();
            return !function () {
                const {textContent: nameOfSection} = event.target;
                if (nameOfSection in setOfSections) {
                    // cancelAnimationFrame(animationId);
                    document.removeEventListener('scroll', findActiveLayer);
                    const {target: navElement} = event;
                    changeClass(selected, navElement);
                    selected = navElement;
                    const {y: sectionTop} = setOfSections[nameOfSection].getBoundingClientRect();
                    const {height: headerHeight} = setOfSections['home'].getBoundingClientRect();
                    const extraHeightToScroll = 3;
                    const sectionY = sectionTop - headerHeight + extraHeightToScroll;
                    if (isOpen) {
                        isOpen = !isOpen;
                        switchBtn(main);
                    }
                    animateScroll(sectionY, 50);
                }
            }();
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
                    phonesImg.src = 'src/img/iPhones.png';
                },
                right() {
                    phonesImg.src = 'src/img/iPhones-right-off.png';
                },
                left() {
                    phonesImg.src = 'src/img/iPhones-left-off.png';
                },
                both() {
                    phonesImg.src = 'src/img/iPhones-off.png';
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
            contForm.reset();
            isEnable = true;
        })
    }();

    !function burgerMenu() {
        main['main-header__btn'].addEventListener('click', function () {
            isOpen = !isOpen;
            switchBtn(main);
        });
    }()
});


