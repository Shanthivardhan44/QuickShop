document.addEventListener("DOMContentLoaded", () => {
  const bill = JSON.parse(localStorage.getItem("bill"));
  const market = localStorage.getItem("selectedMarket");
  const totalPrice = localStorage.getItem("totalPrice");
  const totalQty = localStorage.getItem("totalQty");
  const totalWeight = localStorage.getItem("totalWeight");

  document.getElementById("market-name").textContent = market;
  document.getElementById("total-price").textContent = totalPrice;
  document.getElementById("total-qty").textContent = totalQty;
  document.getElementById("total-weight").textContent = totalWeight;

  const billItemsContainer = document.getElementById("bill-items");
  billItemsContainer.innerHTML = "";
  Object.entries(bill).forEach(([barcode, item]) => {
    const row = document.createElement("div");
    row.classList.add("bill-row");
    row.innerHTML = `
      <p><strong>${item.name}</strong> — ₹${item.price} × ${item.qty} = ₹${(item.price * item.qty).toFixed(2)}</p>
    `;
    billItemsContainer.appendChild(row);
  });
});
