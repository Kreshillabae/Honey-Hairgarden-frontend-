document.addEventListener("DOMContentLoaded", () => {
const products = [
  {
    name: "Full Frontal Jerry Curl - Color 4",
    image: "https://i.postimg.cc/B6xpYL7m/IMG-3571.jpg",
    sizes: {
      "18”": 76000, "20”": 85000, "22”": 90000, "24”": 102000, "26”": 110000, "28”": 135000
    }
  },
  {
    name: "Bob 13*4 Full Frontal 350#",
    image: "https://i.postimg.cc/3NYBP8PY/IMG-3429.jpg",
    sizes: { "8"": 40000, "10"": 45000, "12"": 51000, "14"": 59000 }
  },
  {
    name: "Bob 4*4 Full Closure P4/27 (Double Drawn, 100% Human Hair)",
    image: "https://i.postimg.cc/x1cRrFFJ/IMG-2476.jpg",
    sizes: { "10"": 42000, "12"": 52000, "14"": 58000, "16"": 64000 }
  },
  {
    name: "5x5 Full Lace Closure (Double Drawn, 100% Human Hair)",
    image: "https://i.postimg.cc/MpNYzbhs/IMG-2473.jpg",
    sizes: { "16"": 80000, "18"": 95000 }
  },
  {
    name: "13*4 Deep Wave 99J (DD)",
    image: "https://i.postimg.cc/9MtPt3zS/IMG-2046.jpg",
    sizes: { "14"": 57000, "16"": 65000, "18"": 75000, "20"": 85000 }
  },
  {
    name: "4x4 Closure Bounce (Styled as Fringe/Not), 99J Color",
    image: "https://i.postimg.cc/v8tX5nVB/E42-FE5-D9-FDF0-436-B-AA45-1-FE433-A454-D5.jpg",
    sizes: { "18"": 145000 }
  },
  {
    name: "Full Frontal Bob Wig - Natural Color",
    image: "https://i.postimg.cc/prWfs0Fd/c842c712-0af0-49e2-bf1b-76e9e551d7fc.jpg",
    sizes: { "10"": 38000 }
  },
  {
    name: "Full Frontal Deep Wave - Natural Color",
    image: "https://i.postimg.cc/8c4HD8SW/c838e384-19ac-4cfa-9834-bf3b417ad8aa.jpg",
    sizes: { "12"": 48000, "14"": 58000, "16"": 67000 }
  },
  {
    name: "13*4 Lace Bob - Natural Color",
    image: "https://i.postimg.cc/rwp2WcZd/13d755cb-a821-4a25-abd0-9c837f522f02.jpg",
    sizes: { "12"": 45000, "14"": 50000 }
  }
];

const cart = JSON.parse(localStorage.getItem("cart") || "[]");

function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  const list = document.getElementById("cart-items");
  if (list) {
    list.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name} (${item.size}) x${item.qty} - ₦${item.price * item.qty}`;
      list.appendChild(li);
      total += item.price * item.qty;
    });
    document.getElementById("total-price").textContent = total;
  }
}

function loadProducts() {
  const container = document.getElementById("product-list");
  if (!container) return;
  products.forEach((product, idx) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" />
      <h3>${product.name}</h3>
      <select id="size-${idx}">
        ${Object.entries(product.sizes).map(([size, price]) => `<option value="${size}|${price}">${size} - ₦${price}</option>`).join("")}
      </select>
      <input id="qty-${idx}" type="number" min="1" value="1"/>
      <button onclick="addToCart(${idx})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}

function addToCart(idx) {
  const [size, price] = document.getElementById("size-" + idx).value.split("|");
  const qty = parseInt(document.getElementById("qty-" + idx).value);
  const item = {
    name: products[idx].name,
    size,
    price: parseInt(price),
    qty
  };
  cart.push(item);
  updateCart();
  alert("Added to cart!");
}

function handleCheckout() {
  const form = document.getElementById("checkout-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const orderId = "HHG" + Math.floor(100000 + Math.random() * 900000);
    const message = `
📦 *New Order - ${orderId}*

${cart.map(item => `• ${item.name} (${item.size}) x${item.qty} - ₦${item.price * item.qty}`).join("\n")}

💰 *Total:* ₦${cart.reduce((sum, i) => sum + i.price * i.qty, 0)}
👤 *Name:* ${name}
📍 *Address:* ${address}
📞 *Phone:* ${phone}
    `;
    fetch("https://api.telegram.org/bot8036297818:AAFcg7_Akiv83HK7JcolJul7-8Qq2n2JrhY/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: "6945455531",
        text: message,
        parse_mode: "Markdown"
      })
    }).then(() => {
      alert("Order sent successfully! Your Order ID is " + orderId);
      localStorage.removeItem("cart");
      form.reset();
    });
  });
}

loadProducts();
updateCart();
handleCheckout();
});
