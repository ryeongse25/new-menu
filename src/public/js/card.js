const cards = document.querySelector(".cards").children;
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const page = document.querySelector(".page");
const maxItem = 6;
let index = 1;

const pagination = Math.ceil(cards.length / maxItem);
// console.log(pagination);

prev.addEventListener("click", function () {
  index--;
  check();
  showCards();
});
next.addEventListener("click", function () {
  index++;
  check();
  showCards();
});

function check() {
  if (index == pagination) {
    next.classList.add("disabled");
  } else {
    next.classList.remove("disabled");
  }
  if (index == 1) {
    prev.classList.add("disabled");
  } else {
    prev.classList.remove("disabled");
  }
}

function showCards() {
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.remove("show");
    cards[i].classList.add("hide");

    if (i >= index * maxItem - maxItem && i < index * maxItem) {
      cards[i].classList.remove("hide");
      cards[i].classList.add("show");
    }
    page.innerHTML = index;
  }
}

window.onload = function () {
  showCards();
  check();
};