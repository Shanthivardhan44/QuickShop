// const supermarketSelect = document.getElementById('supermarket');
// const selectedMarket = document.getElementById('selected-market');
// const barcodeInput = document.querySelector('.enter-barcode-number');
// const submitBtn = document.querySelector('.enter-barcode .btn-nosub');
// const billItems = document.getElementById('bill-items');
// const totalElem = document.querySelector('.total');
// const totalQtyElem = document.getElementById('total-qty');
// const totalWeightElem = document.getElementById('total-weight');


// const products = {
//   "901719134845": { name: "Parle Parle", price: 5, brand: "Parle", weight: 0.045 },
//   "901063367173": { name: "Britannia 50-50 Maska chaska", price: 10, brand: "Britannia", weight: 0.038 },
//   "901063142015": { name: "Britannia Nutri Choice Digestive Biscuits", price: 25, brand: "Britannia", weight: 0.1 },
//   "622202324239": { name: "Cadbury Choclairs Gold ", price: 50, brand: "Cadbury", weight: 0.125},
//   "901725015275": { name: "Sunfeast Dark Fantasy Choco Fills ", price: 40, brand: "Sunfeast", weight: 0.069},
//   "901719105913": { name: "Parle Hide & Seek choco chips Cookies", price: 30, brand: "Preles", weight: 0.120},
//   "909106032972": { name: "Liril Lime", price: 41, brand: "", weight: 0.100},
//   "901030712999": { name: "Dove serum bar", price: 35, brand: "Dove", weight: 0.05},
//   "80916628": { name: "Kinder Joy DC", price: 50, brand: "", weight: 0.02},
//   "901063139329": { name: "Bourbon", price: 10, brand: "Britannia", weight: 0.02},
// };

// let bill = {}; 

// function updateMarket() {
//   selectedMarket.textContent = supermarketSelect.value + " - Billing Info";
// }

// supermarketSelect.addEventListener('change', updateMarket);
// updateMarket();

// function updateTotals() {
//   let total = 0, totalQty = 0, totalWeight = 0;
//   Object.values(bill).forEach(item => {
//     total += item.price * item.qty;
//     totalQty += item.qty;
//     totalWeight += item.weight * item.qty;
//   });
//   totalElem.textContent = `Total Price: ₹${total}`;
//   totalQtyElem.textContent = `Total Products: ${totalQty}`;
//   totalWeightElem.textContent = `Total Weight: ${totalWeight.toFixed(2)} kg`;
// }

// function renderBill() {
//   billItems.innerHTML = "";
//   Object.entries(bill).forEach(([barcode, item]) => {
//     const li = document.createElement('li');
//     li.innerHTML = `
//       <div class="bill-row">
//         <div>
//           <strong>${item.name}</strong> <br>
//           Brand: ${item.brand} <br>
//           Weight: ${item.weight} kg <br>
//           Price: ₹${item.price}
//         </div>
//         <div class="qty-controls">
//           <button class="qty-btn" data-barcode="${barcode}" data-action="decrease">-</button>
//           <span class="qty-value">${item.qty}</span>
//           <button class="qty-btn" data-barcode="${barcode}" data-action="increase">+</button>
//         </div>
//       </div>
//     `;
//     billItems.appendChild(li);
//   });
//   updateTotals();
// }

// submitBtn.addEventListener('click', function () {
//   const barcode = barcodeInput.value.trim();
//   if (barcode === "") return;

//   const barcodeStr = String(barcode);
//   if (products[barcodeStr]) {
//     if (bill[barcodeStr]) {
//       bill[barcodeStr].qty += 1;
//     } else {
//       bill[barcodeStr] = { ...products[barcodeStr], qty: 1 };
//     }
//     renderBill();
//   } else {
//     alert("Product not found for barcode: " + barcodeStr);
//   }
//   barcodeInput.value = "";
// });

// billItems.addEventListener('click', function (e) {
//   if (e.target.classList.contains('qty-btn')) {
//     const barcode = e.target.getAttribute('data-barcode');
//     const action = e.target.getAttribute('data-action');
//     if (bill[barcode]) {
//       if (action === "increase") {
//         bill[barcode].qty += 1;
//       } else if (action === "decrease" && bill[barcode].qty > 1) {
//         bill[barcode].qty -= 1;
//       } else if (action === "decrease" && bill[barcode].qty === 1) {
//         delete bill[barcode];
//       }
//       renderBill();
//     }
//   }
// });


// const startScanBtn = document.getElementById('start-scan');
// const scannerPreview = document.getElementById('scanner-preview');

// function stopScanner() {
//   Quagga.stop();
//   scannerPreview.style.display = 'none';
// }

// startScanBtn.addEventListener('click', () => {
//   scannerPreview.style.display = 'block';
//   Quagga.init({
//     inputStream: {
//       name: "Live",
//       type: "LiveStream",
//       target: scannerPreview,
//       constraints: {
//         facingMode: "environment"
//       }
//     },
//     decoder: {
//       readers: ["ean_reader", "ean_8_reader", "code_128_reader", "upc_reader"]
//     }
//   }, function(err) {
//     if (err) {
//       alert("Camera error: " + err);
//       scannerPreview.style.display = 'none';
//       return;
//     }
//     Quagga.start();
//   });
// });

// Quagga.onDetected(function(data) {
//   const code = data.codeResult.code;
//   stopScanner();
//   barcodeInput.value = code;
//   submitBtn.click();
// });

// window.addEventListener('keydown', function(e) {
//   if (e.key === "Escape") stopScanner();
// });

// const payBtn = document.querySelector('.pay-btn');

// payBtn.addEventListener('click', function () {
//   localStorage.setItem('bill', JSON.stringify(bill));
//   localStorage.setItem('selectedMarket', selectedMarket.textContent);
//   localStorage.setItem('totalPrice', totalElem.textContent);
//   localStorage.setItem('totalQty', totalQtyElem.textContent);
//   localStorage.setItem('totalWeight', totalWeightElem.textContent);
  
//   window.location.href = 'billdetails.html';
// });

// ==========================
// SMART BILLING — BACKEND CONNECTED VERSION
// ==========================

// DOM references
const supermarketSelect = document.getElementById('supermarket');
const selectedMarket = document.getElementById('selected-market');
const barcodeInput = document.querySelector('.enter-barcode-number');
const submitBtn = document.querySelector('.enter-barcode .btn-nosub');
const billItems = document.getElementById('bill-items');
const totalElem = document.querySelector('.total');
const totalQtyElem = document.getElementById('total-qty');
const totalWeightElem = document.getElementById('total-weight');
const payBtn = document.querySelector('.pay-btn');
const startScanBtn = document.getElementById('start-scan');
const scannerPreview = document.getElementById('scanner-preview');

// State variables
let products = {}; // { barcode: { name, price, brand, weight } }
let bill = {};     // { barcode: { name, price, brand, weight, qty } }

// ---------------------------
// 1️⃣ LOAD PRODUCT DATA FROM BACKEND
// ---------------------------
async function loadProductsFromBackend() {
  try {
    const response = await fetch("http://localhost:5000/api/products");
    const productArray = await response.json();

    productArray.forEach(p => {
      products[p.barcode] = {
        name: p.name,
        price: parseFloat(p.price),
        brand: p.brand,
        weight: parseFloat(p.weight)
      };
    });

    console.log("✅ Products loaded from backend:", products);
  } catch (err) {
    console.error("❌ Error loading products from backend:", err);
    alert("Failed to load product list from server. Please check backend connection.");
  }
}

loadProductsFromBackend();

// ---------------------------
// 2️⃣ SUPERMARKET SELECT
// ---------------------------
function updateMarket() {
  selectedMarket.textContent = supermarketSelect.value + " - Billing Info";
}
supermarketSelect.addEventListener('change', updateMarket);
updateMarket();

// ---------------------------
// 3️⃣ BILL LOGIC
// ---------------------------
function updateTotals() {
  let total = 0, qty = 0, weight = 0;
  Object.values(bill).forEach(item => {
    total += item.price * item.qty;
    qty += item.qty;
    weight += item.weight * item.qty;
  });
  totalElem.textContent = `Total Price: ₹${total}`;
  totalQtyElem.textContent = `Total Products: ${qty}`;
  totalWeightElem.textContent = `Total Weight: ${weight.toFixed(2)} kg`;
}

function renderBill() {
  billItems.innerHTML = "";
  Object.entries(bill).forEach(([barcode, item]) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="bill-row">
        <div>
          <strong>${item.name}</strong><br>
          Brand: ${item.brand}<br>
          Weight: ${item.weight} kg<br>
          Price: ₹${item.price}
        </div>
        <div class="qty-controls">
          <button class="qty-btn" data-barcode="${barcode}" data-action="decrease">-</button>
          <span class="qty-value">${item.qty}</span>
          <button class="qty-btn" data-barcode="${barcode}" data-action="increase">+</button>
        </div>
      </div>`;
    billItems.appendChild(li);
  });
  updateTotals();
}

// ---------------------------
// 4️⃣ ADD PRODUCT BY BARCODE
// ---------------------------
submitBtn.addEventListener("click", () => {
  const code = barcodeInput.value.trim();
  if (!code) return;

  const item = products[code];
  if (!item) {
    alert("❌ Product not found for barcode: " + code);
    return;
  }

  if (bill[code]) bill[code].qty++;
  else bill[code] = { ...item, qty: 1 };

  renderBill();
  barcodeInput.value = "";
});

// Quantity button controls
billItems.addEventListener("click", e => {
  if (e.target.classList.contains("qty-btn")) {
    const barcode = e.target.dataset.barcode;
    const action = e.target.dataset.action;
    if (bill[barcode]) {
      if (action === "increase") bill[barcode].qty++;
      else if (bill[barcode].qty > 1) bill[barcode].qty--;
      else delete bill[barcode];
      renderBill();
    }
  }
});

// ---------------------------
// 5️⃣ CAMERA BARCODE SCANNING
// ---------------------------
function stopScanner() {
  Quagga.stop();
  scannerPreview.style.display = "none";
}

startScanBtn.addEventListener("click", () => {
  scannerPreview.style.display = "block";

  Quagga.init({
    inputStream: {
      name: "Live",
      type: "LiveStream",
      target: scannerPreview,
      constraints: { facingMode: "environment" }
    },
    decoder: { readers: ["ean_reader", "code_128_reader", "upc_reader"] }
  }, err => {
    if (err) {
      alert("Camera error: " + err);
      scannerPreview.style.display = "none";
      return;
    }
    Quagga.start();
  });
});

Quagga.onDetected(data => {
  const code = data.codeResult.code;
  stopScanner();
  barcodeInput.value = code;
  submitBtn.click();
});

// Stop scanner on Escape key
window.addEventListener("keydown", e => {
  if (e.key === "Escape") stopScanner();
});

// ---------------------------
// 6️⃣ SAVE BILL TO BACKEND
// ---------------------------
payBtn.addEventListener("click", async () => {
  const totalPrice = parseFloat(totalElem.textContent.replace("Total Price: ₹", "")) || 0;
  const totalQty = parseInt(totalQtyElem.textContent.replace("Total Products: ", "")) || 0;
  const totalWeight = parseFloat(totalWeightElem.textContent.replace("Total Weight: ", "").replace(" kg", "")) || 0;

  const billData = {
    market: supermarketSelect.value,
    total_price: totalPrice,
    total_qty: totalQty,
    total_weight: totalWeight
  };

  try {
    const response = await fetch("http://localhost:5000/api/bills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(billData)
    });
    const result = await response.json();

    if (result.success) {
      alert(`✅ Bill saved successfully (ID: ${result.bill_id})`);
      localStorage.setItem("bill", JSON.stringify(bill));
      localStorage.setItem("selectedMarket", supermarketSelect.value);
      localStorage.setItem("totalPrice", totalElem.textContent);
      localStorage.setItem("totalQty", totalQtyElem.textContent);
      localStorage.setItem("totalWeight", totalWeightElem.textContent);
      window.location.href = "billdetails.html";
    } else {
      alert("❌ Failed to save bill on backend.");
    }
  } catch (err) {
    console.error("❌ Error saving bill:", err);
    alert("Server connection error. Please start backend first.");
  }
});

payBtn.addEventListener("click", async () => {
  const billData = {
    market: selectedMarket.textContent,
    total_price: parseFloat(totalElem.textContent.replace("Total Price: ₹", "")),
    total_qty: parseInt(totalQtyElem.textContent.replace("Total Products: ", "")),
    total_weight: parseFloat(totalWeightElem.textContent.replace("Total Weight: ", "").replace(" kg", ""))
  };

  await fetch("http://localhost:5000/api/bills", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(billData)
  });

  alert("✅ Bill saved successfully!");
  window.location.href = "billdetails.html";
});
