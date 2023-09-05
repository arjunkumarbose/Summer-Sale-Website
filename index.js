function addItemToCart(elementId) {
  const element = document.getElementById(elementId);
  addPrice(element);
}

function createItemFunction(itemId) {
  return function() {
      addItemToCart(`${itemId}`);
  };
}

const kitchenware1 = createItemFunction("kitchenware-1");
const kitchenware2 = createItemFunction("kitchenware-2");
const kitchenware3 = createItemFunction("kitchenware-3");
const sportswear1 = createItemFunction("sportswear-1");
const sportswear2 = createItemFunction("sportswear-2");
const sportswear3 = createItemFunction("sportswear-3");
const furniture1 = createItemFunction("furniture-1");
const furniture2 = createItemFunction("furniture-2");
const furniture3 = createItemFunction("furniture-3");

function addPrice(element) {
  const productName = element.querySelector("h2").innerText;
  const price = parseFloat(element.querySelector("p").innerText);

  const totalItems = document.getElementById("total-items");
  const totalChild = totalItems.childElementCount;

  const p = document.createElement('p');
  p.innerHTML = `${totalChild + 1}. ${productName}`;
  totalItems.appendChild(p);

  updatePrice(price, false);
}

function coupon() {
  const couponValue = document.getElementById("coupon-value").value;
  const apply = document.getElementById("apply-coupon-btn");
  const total_price = parseFloat(document.getElementById("total-price").innerText);

  if (couponValue === "SELL200" && total_price >= 200) {
      apply.removeAttribute("disabled");
  } 
  else {
      apply.setAttribute("disabled", true);
  }
}

function updateAfterCoupon() {
  const isPrice = parseFloat(document.getElementById("total-price").innerText);
  const isDiscount = parseFloat(document.getElementById("discount").innerText);

  if (isPrice === 0 || isPrice < 200) {
      alert("Ooops! Make sure your cart value is greater than 200!");
      const couponValue = document.getElementById("coupon-value");
      couponValue.value = "";
      const apply = document.getElementById("apply-coupon-btn");
      apply.setAttribute("disabled", true);
      return;
  }

  if (isDiscount !== 0) {
      alert("Discount is already added");
      const couponValue = document.getElementById("coupon-value");
      couponValue.value = "";
      const apply = document.getElementById("apply-coupon-btn");
      apply.setAttribute("disabled", true);
      return;
  }
  const apply = document.getElementById("apply-coupon-btn");
  document.getElementById("coupon-value").value = "";
  apply.setAttribute("disabled", true);
  const price = 0;
  updatePrice(price, true)
}

function updatePrice(price, isDiscount) {
  console.log(price);

  const totalPrice = parseFloat(document.getElementById("total-price").innerText);
  const discount = parseFloat(document.getElementById("discount").innerText).toFixed(2);
  console.log("discount,", discount)

  console.log(totalPrice);
  const updatedPrice = totalPrice + price;
  console.log(updatedPrice);

  document.getElementById("total-price").innerText = updatedPrice;
  if (updatedPrice != 0) {
      const purchase = document.getElementById("purchase-btn");
      purchase.removeAttribute("disabled");
  }

  if (discount == 0 && !isDiscount) {

      const updatedTotal = updatedPrice;
      document.getElementById("total").innerText = updatedTotal;
  }
  else {
      console.log(discount)
      const updatedDiscount = (updatedPrice * 0.2).toFixed(2);
      console.log(updatedDiscount)
      const updatedTotal = updatedPrice - updatedDiscount;
      document.getElementById("discount").innerText = updatedDiscount;
      document.getElementById("total").innerText = updatedTotal;
  }
}

function reload() {
  document.getElementById("total-price").innerText = "0.00";
  document.getElementById("total").innerText = "0.00";
  document.getElementById("discount").innerText = "0.00";

  const totalItems = document.getElementById("total-items");
  const couponValue = document.getElementById("coupon-value");
  totalItems.innerText = "";
  couponValue.value = "";

  const apply = document.getElementById("apply-coupon-btn");
  apply.setAttribute("disabled", true);

  const purchase = document.getElementById("purchase-btn")
  purchase.setAttribute("disabled", true);
}





