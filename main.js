const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".header__content h2", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 1000,
});

ScrollReveal().reveal(".order__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".event__content", {
  duration: 1000,
});
const burgers = [
  { name: "Chicken Burger", price: 5.99, img: "order-1.png" },
  { name: "Veggie Delight Burger", price: 4.99, img: "order-2.png" },
  { name: "BBQ Bacon Burger", price: 6.99, img: "order-3.png" },
  { name: "Classic Beef Burger", price: 5.49, img: "burger-4.png " },
  { name: "Spicy Jalapeño Burger", price: 6.49, img: "burger-5.png" },
  { name: "Mushroom Swiss Burger", price: 6.99, img: "burger-6.png" },
  { name: "Double Cheeseburger", price: 7.99, img: "burger-7.png" },
  { name: "Fish Fillet Burger", price: 5.99, img: "burger-8.png" },
  { name: "Blue Cheese Burger", price: 6.79, img: "burger-9.png" },
  { name: "Avocado Burger", price: 7.29, img: "burger-10.png" },
  { name: "Bacon Egg Burger", price: 7.49, img: "burger-11.png" },
  { name: "Hawaiian Pineapple Burger", price: 6.59, img: "burger-12.png" },
 
];

const burgerList = document.getElementById("burger-list");
const basketList = document.getElementById("basket-list");
const totalPriceElement = document.getElementById("total-price");
const clearBasketBtn = document.getElementById("clear-basket");
let basket = {};

function updateBasket() {
  basketList.innerHTML = "";
  let total = 0;
  Object.keys(basket).forEach(key => {
    const item = basket[key];
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity} 
      <button onclick="changeQuantity('${key}', -1)">-</button>
      <button onclick="changeQuantity('${key}', 1)">+</button>`;
    basketList.appendChild(li);
    total += item.price * item.quantity;
  });
  totalPriceElement.textContent = total.toFixed(2);
}

function changeQuantity(name, change) {
  if (basket[name]) {
    basket[name].quantity += change;
    if (basket[name].quantity <= 0) delete basket[name];
    updateBasket();
  }
}

burgers.forEach(burger => {
  const card = document.createElement("div");
  card.classList.add("order__card");
  card.innerHTML = `
    <img src="${burger.img}" alt="${burger.name}" />
    <h4>${burger.name}</h4>
    <p>Enjoy our delicious ${burger.name}, made with the finest ingredients.</p>
    <p><strong>Price: $${burger.price.toFixed(2)}</strong></p>
    <button class="btn">ORDER NOW</button>
  `;
  card.querySelector("button").addEventListener("click", () => {
    if (basket[burger.name]) {
      basket[burger.name].quantity++;
    } else {
      basket[burger.name] = { ...burger, quantity: 1 };
    }
    updateBasket();
  });
  burgerList.appendChild(card);
});

clearBasketBtn.addEventListener("click", () => {
  basket = {};
  updateBasket();
});


