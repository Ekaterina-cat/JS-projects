const btnBurger = document.querySelector(".header-burger");
const navMenu = document.querySelector(".nav");
const burgerLineFirst = document.querySelector(".burger-line-first");
const burgerLineSecond = document.querySelector(".burger-line-second");
const navList = document.querySelectorAll(".nav-list_item");

const slider = document.querySelector(".slider");

const blockFaqAnswers = document.querySelectorAll(".faq-accordion-item");

function workBurgerMenu() {
  navMenu.classList.toggle("active-nav-menu");
  burgerLineFirst.classList.toggle("active-burger-line");
  burgerLineSecond.classList.toggle("active-burger-line");
  btnBurger.classList.toggle("active-btn-burger");
}

btnBurger.addEventListener("click", () => {
  workBurgerMenu();
});

navList.forEach((navItem) => {
  navItem.addEventListener("click", () => {
    workBurgerMenu();
  });
});

let scrollDirection = 0;
let scrollSpeed = 5;

function autoScroll() {
  if (scrollDirection !== 0) {
    slider.scrollLeft += scrollDirection * scrollSpeed;
  }
  requestAnimationFrame(autoScroll);
}

slider.addEventListener("mousemove", (e) => {
  const sliderWidth = slider.clientWidth;
  const mouseX = e.clientX - slider.getBoundingClientRect().left;
  if (mouseX < sliderWidth * 0.3) {
    scrollDirection = 1;
    autoScroll();
  } else if (mouseX > sliderWidth * 0.7) {
    scrollDirection = -1;
    autoScroll();
  } else {
    scrollDirection = 0;
  }
});

slider.addEventListener("mouseleave", () => {
  scrollDirection = 0;
});

function getAccordionElements(answerAccordion) {
  return {
    text: answerAccordion.childNodes[3],
    minus: answerAccordion.childNodes[1].childNodes[3],
    plus: answerAccordion.childNodes[1].childNodes[5],
    answerId: answerAccordion.getAttribute("data-id"),
  };
}

function toggleAccordion(answerAccordion) {
  const { text, minus, plus, answerId } = getAccordionElements(answerAccordion);
  const isActive = text.classList.contains("active-accordion");

  if (isActive) {
    text.classList.remove("active-accordion");
    minus.classList.remove("active-minus");
    plus.classList.remove("active-plus");
    localStorage.setItem(`accordion-${answerId}`, "closed");
    return;
  }
  text.classList.add("active-accordion");
  minus.classList.add("active-minus");
  plus.classList.add("active-plus");
  localStorage.setItem(`accordion-${answerId}`, "open");
}

function clickOtherItemAccordion(answerAccordion) {
  blockFaqAnswers.forEach((otherAnswer) => {
    const { text, minus, plus, answerId } = getAccordionElements(otherAnswer);

    if (otherAnswer !== answerAccordion) {
      text.classList.remove("active-accordion");
      minus.classList.remove("active-minus");
      plus.classList.remove("active-plus");
      localStorage.setItem(`accordion-${answerId}`, "closed");
    }
  });
}

function restoreAccordionState(answerAccordion) {
  const { text, minus, plus, answerId } = getAccordionElements(answerAccordion);
  const isActiveAccordion =
    localStorage.getItem(`accordion-${answerId}`) === "open";

  if (isActiveAccordion) {
    text.classList.add("active-accordion");
    minus.classList.add("active-minus");
    plus.classList.add("active-plus");
  } else {
    text.classList.remove("active-accordion");
    minus.classList.remove("active-minus");
    plus.classList.remove("active-plus");
  }
}

blockFaqAnswers.forEach((answerAccordion) => {
  firstOppenPage(answerAccordion);
  restoreAccordionState(answerAccordion);
  answerAccordion.childNodes[1].addEventListener("click", () => {
    toggleAccordion(answerAccordion);
    clickOtherItemAccordion(answerAccordion);
  });
});

function firstOppenPage(answerAccordion) {
  const { text, minus, plus, answerId } = getAccordionElements(answerAccordion);
  if (
    localStorage.getItem(`accordion-${answerId}`) === null &&
    answerId === "1"
  ) {
    text.classList.add("active-accordion");
    minus.classList.add("active-minus");
    plus.classList.add("active-plus");
  }
}
