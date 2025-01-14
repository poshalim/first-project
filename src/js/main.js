// swiper 
const workSwiper = new Swiper('.work__slider', {
  slidesPerView: 3,
  initialSlide: 1,
  centeredSlides: true,
  loop: true,
  setWrapperSize: true,
  spaceBetween: -32,
  speed: 700,
  pagination: {
    el: ".work__pagination",
    clickable: true,
  },
  navigation: {
    nextEl: '.work__next',
    prevEl: '.work__prev',
  },
});

const workSwiper2 = new Swiper('.work-gallery__slider', {
  loop: true,
  setWrapperSize: true,
  speed: 700,
  navigation: {
    nextEl: '.work-gallery__next',
    prevEl: '.work-gallery__prev',
  },
});



const locationSwiper = new Swiper('.locations__slider', {
  slidesPerView: 1,
  initialSlide: 1,
  centeredSlides: true,
  loop: true,
  spaceBetween: 27,
  speed: 700,
  navigation: {
    nextEl: '.locations__next',
    prevEl: '.locations__prev',
  },

  breakpoints: {
    800: {
      slidesPerView: 3,
      spaceBetween: 27,
    },
  }
});

const locationSwiper2 = new Swiper('.locations-gallery__slider', {
  loop: true,
  setWrapperSize: true,
  speed: 700,
  navigation: {
    nextEl: '.locations-gallery__next',
    prevEl: '.locations-gallery__prev',
  },
});


const reviewsSwiper = new Swiper('.reviews__slider', {
  slidesPerView: 1,
  initialSlide: 1,
  loop: true,
  speed: 700,
  navigation: {
    nextEl: '.reviews__next',
    prevEl: '.reviews__prev',
  },

  breakpoints: {
    850: {
      slidesPerView: 2,
      spaceBetween: 21,
      centeredSlides: false,
    },

    1025: {
      slidesPerView: 3,
      spaceBetween: 16,
      centeredSlides: true,
    },
  }
});


// accordion
let buttons = Array.from(document.querySelectorAll('.info__more'))

buttons.forEach((box) => {
  box.addEventListener('click', boxHandler)
})

function boxHandler(e) {
  e.preventDefault();
  let currentBox = e.target.closest('.accordion')
  let currentHead = currentBox.querySelector('.accordion__head')
  let currentContent = currentBox.querySelector('.info__panel')
  currentBox.classList.toggle("accordion-active")
  if (currentBox.classList.contains("accordion-active")) {

    currentContent.style.maxHeight = currentContent.scrollHeight + "px";
    currentBox.querySelector('.info__btn').innerHTML = `Скрыть`;
    currentHead.lastElementChild.style.display = 'none'
  } else {
    currentContent.style.maxHeight = 0
    currentBox.querySelector('.info__btn').innerHTML = 'Подробнее';
    currentHead.lastElementChild.style.display = 'block'
  }
}


// modal
let modalBtns = document.querySelectorAll('.modal-open');
let modals = document.querySelectorAll('.modal');
let body = document.body;

function openModal(elem) {
  elem.classList.add('modal-active')
  body.classList.add('_locked')
}

function closeModal(e) {
  if (e.target.classList.contains('modal__close') || e.target.closest('.modal__close') || e.target.classList.contains('modal__bg')) {
    e.target.closest('.modal').classList.remove('modal-active')
    body.classList.remove('_locked')
  }
}

modalBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    let data = e.target.dataset.modalOpen
    modals.forEach(modal => {
      if (modal.classList.contains('modal-active')) {
        modal.classList.remove('modal-active')
      }
      if (modal.dataset.modal == data || modal.dataset.modal == e.target.closest('.modal-open').dataset.modalOpen) {
        openModal(modal)
      }
    })
  })
})

modals.forEach(modal => {
  modal.addEventListener('click', e => closeModal(e))
})

window.addEventListener('keydown', e => {
  modals.forEach(modal => {
    if (e.key === 'Escape' && modal.classList.contains('modal-active')) {
      modal.classList.remove('modal-active')
      body.classList.remove('_locked')
    }
  })
})

  // select
  let selectHeader = document.querySelectorAll('.select__header')
  let selectItems = document.querySelectorAll('.select__item')

  selectHeader.forEach(elem => {
    elem.addEventListener('click', e => {
      let currentSelect = e.target.closest('.select')
      let currentBody = currentSelect.querySelector('.select__body')
      currentSelect.classList.toggle('select-active')
      if (currentSelect.classList.contains('select-active')) {
        currentBody.style.maxHeight = currentBody.scrollHeight + 'px'
      } else {
        currentBody.style.maxHeight = 0
      }
    })
  })


  selectItems.forEach(elem => {
    elem.addEventListener('click', e => {
      let select = e.target.closest('.select')
      let currentItem = e.target
      let currentSelect = select.querySelector('.select__current')
      let currentBody = select.querySelector('.select__body')
      currentSelect.innerHTML = currentItem.innerHTML
      select.classList.toggle('select-active')
      currentBody.style.maxHeight = 0
      if (currentSelect.classList.contains('select__text')) {
        currentSelect.classList.remove('select__text')
      }
    })
  })


  // extra 

  var modal
  var currentItem
  var currentSum

  var priceBtns = document.querySelectorAll('.price__extra-item')
  priceBtns.forEach(btn => { // вешаем событие клика на услугу
    var initialSum = btn.closest('.price__item').querySelector('.price__item-sum').innerHTML // записываем начальную цену тарифа
    btn.addEventListener('click', e => {
      currentItem = e.target.closest('.price__item') // текущий айтем
      currentSum = currentItem.querySelector('.price__item-sum').innerHTML // текущая сумма которая будет изменяться

      if (currentItem.querySelector('.extra-visagiste')) { // проверяем есть ли в айтем услуга визажиста
        var sum = currentItem.querySelector('.extra-visagiste').innerHTML // если есть записываем цифру из этой услуги
      }

      if (e.target.classList.contains('extra-retouch')) { // проверяем доп ретушь ли это 
        if(currentItem.querySelector('.extra-retouch').classList.contains('active')) { // проверяем активна ли эта доп ретушь
          currentSum = initialSum // если да то в текущую сумму записываем начальную
          if (currentItem.querySelector('.extra-visagiste') && currentItem.querySelector('.extra-visagiste').classList.contains('active')) { // если уже была выбрана услуги визажиста
            currentSum = +initialSum + +sum.match(/\d/g).join('') // тогда прибавляем к текущей стоимости услуги визажиста
          }
        }  
        if (currentSum == 'N') { // если n то текущая сумма = 0
          currentSum = 0
        }
        modal = document.querySelector('.modal-active'); // записываем открывшееся модальное окно
        var input = modal.querySelector('.form__input') // инпут в этом модальном окне
        input.addEventListener('keyup', function () { // вешаем на него событие
          if (input.value.length > 3) {
            input.value = input.value.slice(0, 3) // не даем написать больше 3 цифр
          }
        })
      }

      else if (!e.target.classList.contains('extra-retouch')) { // если это не екстра ретушь
        e.target.closest('.price__extra-item').classList.toggle('active') // тогда переключаем класс актив
        if (e.target.classList.contains('extra-visagiste')) { // если это услуги визажиста
          // currentItem = e.target.closest('.price__item') 
          if (e.target.classList.contains('active')) { // если уже был класс актив
            currentItem.querySelector('.price__item-sum').innerHTML = +currentSum + +sum.match(/\d/g).join('') // вместо суммы записываем начальную сумму + цену визажиста
          } else { // если еще не было класса актив
            currentItem.querySelector('.price__item-sum').innerHTML = currentSum - +sum.match(/\d/g).join('') // из суммы вычитаем цену визажиста
          }
        }
      }
    })
  })
  

  
  var saveBtn = document.querySelector('.save'); // кнопка сохранить в модальном окне
  saveBtn.addEventListener('click', e => { // вешаем на нее клик
    var amount = modal.querySelector('.form__input').value // цирфа которую пользователь ввел в инпут
    var current = +currentSum + amount * 250 // рассчитываем и записываем сумму с учет выбранных до этого услуг

    if (amount >= 0 && amount <= 500) { // если пользователь ввел от 0 до 500
      currentItem.querySelector('.price__item-sum').innerHTML = current // меняем цену текущего тарифа на рассчитанную
      modal.classList.remove('modal-active') // прячем модальное окно
      document.body.classList.toggle('_locked') // разблокируем body
    } else {
      alert('Введите число от 0 до 500') // alert
    }

    if (+amount != 0) { // если amount не 0
      currentItem.querySelector('.extra-retouch').classList.add('active') // добавляем active на доп ретушь
    } else {
      currentItem.querySelector('.extra-retouch').classList.remove('active') // удаляем ее
    }
  })


  // add photo 

  let uploadfile = document.getElementById('upload-file')
  let btn = document.querySelector('.form__review-btn')

  btn.addEventListener('click', function () {
    uploadfile.click();
  })

  let div = document.createElement('div')
  div.className = 'form__review-box'
  div.setAttribute("contenteditable", "false")

  uploadfile.addEventListener('change', function () {
    if (uploadfile.value) {
      let reviewText = document.querySelector('.form__review-text')

      if (!reviewText.querySelector('.form__review-box')) {
        reviewText.appendChild(div)
      }

      let item = document.createElement('div')
      item.className = 'form__review-item'
      let close = document.createElement('div')
      close.className = 'form__review-close'
      let img = document.createElement('img')
      img.className = 'form__review-img'
      div.appendChild(item)
      item.appendChild(img)
      item.appendChild(close)

      let file = uploadfile.files[0]
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        img.src = reader.result
      }


      let closebtn = document.querySelectorAll('.form__review-close')
      closebtn.forEach(btn => {
        btn.addEventListener('click', e => {
          let currentItem = e.target.closest('.form__review-item')
          currentItem.remove()
        })
      })

    }
  })



  // menu
  document.querySelector('.header__menu').addEventListener('click', e => {
    if (e.target.classList.contains('header__head') || e.target.closest('.header__head')) {
      let body = e.target.closest('.header__menu').querySelector('.header__body')
      body.classList.toggle('header__body--active')
      document.body.classList.toggle('_locked')
    }
  })


  // calc postition close for modal

  let closeBtns = document.querySelectorAll('.modal__close')
  closeBtns.forEach(btn => {
    let currentBody = btn.closest('.modal').querySelector('.modal__body')
    if(window.innerWidth>970) {
    btn.style.right = (window.innerWidth - currentBody.clientWidth) / 2 + 'px'
    btn.style.top =  (window.innerHeight - currentBody.clientHeight) / 2 - 36 + 'px'
    }
    else {
      btn.style.right = (window.innerWidth - currentBody.clientWidth) / 2 + 12 + 'px'
      btn.style.top =  (window.innerHeight - currentBody.clientHeight) / 2 + 12 + 'px'
    }
  })


  window.addEventListener('resize', function() { // если размеры экрана меняются расположение высчитывается заново

    let closeBtns = document.querySelectorAll('.modal__close')
    closeBtns.forEach(btn => {
      let currentBody = btn.closest('.modal').querySelector('.modal__body')
      if(window.innerWidth>970) {
      btn.style.right = (window.innerWidth - currentBody.clientWidth) / 2 + 'px'
      btn.style.top =  (window.innerHeight - currentBody.clientHeight) / 2 - 36 + 'px'
      }
      else {
        btn.style.right = (window.innerWidth - currentBody.clientWidth) / 2 + 12 + 'px'
        btn.style.top =  (window.innerHeight - currentBody.clientHeight) / 2 + 12 + 'px'
      }
    })
  
  })