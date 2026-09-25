const cartDrawer =
  document.getElementById("cartDrawer");

const drawerBackdrop =
  document.getElementById("drawerBackdrop");

const cartBtn =
  document.getElementById("cartBtn");

const closeCart =
  document.getElementById("closeCart");

const cartItemsEl =
  document.getElementById("cartItems");

const cartCountEl =
  document.getElementById("cartCount");

const cartTotalEl =
  document.getElementById("cartTotal");


/* ================= CART ================= */

let cart =
  JSON.parse(
    localStorage.getItem("romanceRoyalCart") || "[]"
  );


function saveCart(){

  localStorage.setItem(
    "romanceRoyalCart",
    JSON.stringify(cart)
  );

  renderCart();

}


function openCart(){

  cartDrawer.classList.add("open");

  drawerBackdrop.classList.add("open");

}


function hideCart(){

  cartDrawer.classList.remove("open");

  drawerBackdrop.classList.remove("open");

}


cartBtn.addEventListener(
  "click",
  openCart
);


closeCart.addEventListener(
  "click",
  hideCart
);


drawerBackdrop.addEventListener(
  "click",
  hideCart
);


/* ================= ADD TO CART ================= */

document
  .querySelectorAll(".add-cart")
  .forEach(btn => {

    btn.addEventListener(
      "click",
      () => {

        const card =
          btn.closest(".product-card");

        const item = {

          name:
            card.dataset.name,

          price:
            Number(card.dataset.price),

          image:
            card.dataset.image,

          qty:1

        };


        const existing =
          cart.find(
            x => x.name === item.name
          );


        if(existing){

          existing.qty++;

        }else{

          cart.push(item);

        }


        saveCart();

        openCart();

      }
    );

  });


/* ================= RENDER CART ================= */

function renderCart(){

  const count =
    cart.reduce(
      (s,x) => s + x.qty,
      0
    );


  cartCountEl.textContent =
    count;


  if(!cart.length){

    cartItemsEl.innerHTML =
      '<p class="empty-cart">Your cart is empty.</p>';

    cartTotalEl.textContent =
      "$0.00";

    return;

  }


  let total = 0;


  cartItemsEl.innerHTML =
    cart.map(
      (item,index) => {

        total +=
          item.price * item.qty;


        return `

          <div class="cart-item">

            <img
              src="${item.image}"
              alt="">

            <div>

              <h4>
                ${item.name}
              </h4>

              <p>
                $${item.price.toFixed(2)}
                ×
                ${item.qty}
              </p>

            </div>

            <button
              class="remove-item"
              data-index="${index}">

              ×

            </button>

          </div>

        `;

      }
    ).join("");


  cartTotalEl.textContent =
    "$" + total.toFixed(2);


  document
    .querySelectorAll(".remove-item")
    .forEach(btn => {

      btn.addEventListener(
        "click",
        () => {

          cart.splice(
            Number(btn.dataset.index),
            1
          );

          saveCart();

        }
      );

    });

}


renderCart();


/* ================= SEARCH ================= */

const searchPanel =
  document.getElementById("searchPanel");

const searchBtn =
  document.getElementById("searchBtn");

const closeSearch =
  document.getElementById("closeSearch");


searchBtn.addEventListener(
  "click",
  () => {

    searchPanel.classList.add("open");

    setTimeout(
      () => {

        document
          .getElementById("searchInput")
          .focus();

      },
      200
    );

  }
);


closeSearch.addEventListener(
  "click",
  () => {

    searchPanel.classList.remove("open");

  }
);


/* ================= WISHLIST ================= */

document
  .querySelectorAll(".wishlist")
  .forEach(btn => {

    btn.addEventListener(
      "click",
      () => {

        btn.textContent =
          btn.textContent === "♡"
            ? "♥"
            : "♡";


        btn.style.color =
          btn.textContent === "♥"
            ? "#8f0717"
            : "#4b1a1f";

      }
    );

  });


/* ================= SMOOTH LINKS ================= */

document
  .querySelectorAll('a[href^="#"]')
  .forEach(a => {

    a.addEventListener(
      "click",
      () => {

        const target =
          document.querySelector(
            a.getAttribute("href")
          );


        if(target){

          target.scrollIntoView({
            behavior:"smooth"
          });

        }

      }
    );

  });
