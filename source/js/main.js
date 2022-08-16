import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  iosVhFix();

  // ---------------------------------
  // Validate phone feedback and modal

  const phoneInputs = document.querySelectorAll('form input[type="tel"]');

  const validatePhone = (element) => {
    element.setCustomValidity('');
    element.checkValidity();
  };

  const messageValidate = (element) => {
    if (element.value === '') {
      element.setCustomValidity('Введите номер телефона в формате: +7(XXX)XXX-XX-XX');
    } else {
      element.setCustomValidity('Введите телефон по формату: +7(XXX)XXX-XX-XX');
    }
  };

  phoneInputs.forEach((item) => {
    item.addEventListener('input', () => {
      validatePhone(item);
    });
  });

  phoneInputs.forEach((item) => {
    item.addEventListener('invalid', () => {
      messageValidate(item);
    });
  });

  // ---------------------------------
  // No js aside-info link

  const asideButton = document.querySelector('.aside-info a');

  asideButton.href = '#';

  // ---------------------------------
  // Submit default

  const feedbackSubmit = document.querySelector('.feedback__form');
  const modalSubmit = document.querySelector('.modal__form');
  const feedbackUserName = '#user-name';
  const feedbackUserPhone = '#user-phone';
  const popupUserName = '#userName';
  const popupUserPhone = '#userPhone';


  const setStorage = (element, name, tel) => {
    const userName = element.querySelector(name);
    const userPhone = element.querySelector(tel);
    const userQuestion = element.querySelector('textarea');

    localStorage.setItem('userName', userName.value);
    localStorage.setItem('userPhone', userPhone.value);

    userName.value = '';
    userPhone.value = '';
    userQuestion.value = '';
  };

  feedbackSubmit.addEventListener('submit', (evt) => {
    evt.preventDefault();
    setStorage(feedbackSubmit, feedbackUserName, feedbackUserPhone);
  });

  modalSubmit.addEventListener('submit', (evt) => {
    evt.preventDefault();
    setStorage(modalSubmit, popupUserName, popupUserPhone);
  });

  // Smooth navigation

  const anchorMenu = document.querySelector('.hero a');
  const inputFeedback = document.querySelector('.feedback__form input');

  anchorMenu.addEventListener('click', (evt) => {
    evt.preventDefault();
    const blockId = anchorMenu.getAttribute('href');
    document.querySelector('' + blockId).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    setTimeout(function () {
      inputFeedback.focus();
    }, 700);
  });

  // ---------------------------------
  // Textcontent hero button

  const initHeroButton = () => {

    const mediaMobile = 767;
    const btnHero = document.querySelector('.hero a');

    if (document.body.offsetWidth > mediaMobile) {
      btnHero.textContent = 'Получить бесплатную консультацию';
    }

    if (document.body.offsetWidth <= mediaMobile) {
      btnHero.textContent = 'Бесплатная консультация';
    }
  };

  initHeroButton();

  // ---------------------------------
  // Height features card

  const initFeature = () => {
    const mediaMobile = 767;
    const mediaTablet = 1023;
    const featureCards = document.querySelectorAll('.features li');


    featureCards.forEach((item) => {
      const titleCard = item.querySelector('h3');
      const textCard = item.querySelector('p');
      const lengthText = textCard.textContent.length;
      const styleItem = getComputedStyle(titleCard);

      const getHeightTitle = parseInt(styleItem.height, 10) / parseInt(styleItem.fontSize, 10);

      if (getHeightTitle >= 2 && document.body.offsetWidth <= mediaMobile) {
        titleCard.style.marginTop = -2 + 'px';
        titleCard.style.marginBottom = 14 + 'px';
      } else if (getHeightTitle >= 2) {
        titleCard.style.marginTop = -2 + 'px';
        titleCard.style.marginBottom = 7 + 'px';
      } else {
        titleCard.style.marginTop = '';
        titleCard.style.marginBottom = '';
      }

      if (document.body.offsetWidth > mediaMobile && document.body.offsetWidth <= mediaTablet && getHeightTitle >= 2 && lengthText >= 100) {
        titleCard.style.marginTop = -5 + 'px';
        titleCard.style.marginBottom = 5 + 'px';
      }

      if (document.body.offsetWidth <= mediaMobile) {

        if (lengthText >= 140) {
          textCard.style.minHeight = 190 + 'px';
        }

        if (lengthText < 140) {
          textCard.style.minHeight = 140 + 'px';
        }
      } else {

        if (lengthText >= 140) {
          textCard.style.minHeight = '';
        }

        if (lengthText < 140) {
          textCard.style.minHeight = '';
        }
      }
    });
  };

  initFeature();

  // ---------------------------------
  // Company button

  const itemCompany = document.querySelector('.company__inner');
  const buttonCompany = itemCompany.querySelector('.company button');

  buttonCompany.removeAttribute('data-nojs');

  itemCompany.setAttribute('data-company', 'is-close');

  buttonCompany.addEventListener('click', () => {

    if (itemCompany.hasAttribute('data-company')) {
      itemCompany.removeAttribute('data-company');
      buttonCompany.textContent = 'Свернуть';
    } else {
      itemCompany.setAttribute('data-company', 'is-close');
      buttonCompany.textContent = 'Подробнее';
    }
  });

  // ---------------------------------
  // Catalog title

  const initCatalogTitle = () => {

    const mediaMobile = 767;
    const titleItem = document.querySelector('.catalog h2');

    if (document.body.offsetWidth > mediaMobile) {
      titleItem.textContent = 'Smart Device предлагает следующие товары и\u00A0услуги';
    }

    if (document.body.offsetWidth <= mediaMobile) {
      titleItem.textContent = 'Товары и\u00A0услуги Smart\u00A0Device';
    }
  };

  initCatalogTitle();

  // ---------------------------------
  // Accordion open

  const itemAccordion = document.querySelectorAll('.accordion__item');

  const removeState = () => {
    itemAccordion.forEach((item) => {
      const toggle = item.querySelector('.accordion__toggle');

      item.removeAttribute('data-state');
      toggle.removeAttribute('data-nojs');
    });
  };

  removeState();

  const initAccordion = () => {
    itemAccordion.forEach((item) => {
      item.addEventListener('click', () => {
        if (item.hasAttribute('data-state')) {
          removeState();
        } else {
          removeState();
          item.setAttribute('data-state', 'is-open');
        }
      });
    });
  };

  initAccordion();

  window.addEventListener('resize', () => {
    initHeroButton();
    initFeature();
    initCatalogTitle();
    removeState();
    initAccordion();
  });

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
