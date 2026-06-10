// Power Zone - Common Application Scripts (app.js)

document.addEventListener("DOMContentLoaded", () => {
  // 1. Inject Header & Footer if containers exist
  initHeader();
  initFooter();
  
  // 2. Initialize Shopping Cart
  initCart();
  
  // 3. Initialize Mobile Menu Drawer
  initMobileMenu();
});

// Format Currency
function formatPrice(amount) {
  if (amount === null || amount === undefined) return "";
  return "LKR " + parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

// ----------------------------------------------------
// Toast Notification System
// ----------------------------------------------------
function showToast(message, type = "success") {
  // Check if toast element exists, if not create it
  let toastEl = document.getElementById("toast-notification");
  if (!toastEl) {
    toastEl = document.createElement("div");
    toastEl.id = "toast-notification";
    toastEl.className = "toast";
    document.body.appendChild(toastEl);
  }
  
  const icon = type === "success" ? "fa-circle-check" : "fa-triangle-exclamation";
  toastEl.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
  toastEl.style.borderLeftColor = type === "success" ? "var(--success)" : "var(--error)";
  
  toastEl.classList.add("show");
  
  setTimeout(() => {
    toastEl.classList.remove("show");
  }, 3500);
}

// ----------------------------------------------------
// Navigation & Header Injection
// ----------------------------------------------------
function initHeader() {
  const headerRoot = document.getElementById("header-root");
  if (!headerRoot) return;
  
  // Get active page name from URL
  const path = window.location.pathname;
  const page = path.substring(path.lastIndexOf('/') + 1) || "index.html";
  
  const shopName = (window.CONFIG && window.CONFIG.shopName) || "POWER ZONE";
  
  headerRoot.innerHTML = `
    <header>
      <div class="container header-container">
        <a href="index.html" class="logo-link">
          <img src="pz.png" alt="${shopName} Logo" class="logo-img">
          <span class="logo-text">${shopName}</span>
        </a>
        
        <nav class="desktop-nav">
          <ul class="nav-links">
            <li><a href="index.html" class="${page === 'index.html' ? 'active' : ''}">Home</a></li>
            <li><a href="shop.html" class="${page === 'shop.html' ? 'active' : ''}">Shop</a></li>
            <li><a href="about.html" class="${page === 'about.html' ? 'active' : ''}">About Us</a></li>
            <li><a href="contact.html" class="${page === 'contact.html' ? 'active' : ''}">Contact Us</a></li>
          </ul>
        </nav>
        
        <div class="header-actions">
          <a href="shop.html" class="search-toggle-btn" title="Search Products">
            <i class="fa-solid fa-magnifying-glass"></i>
          </a>
          <button class="cart-toggle-btn" id="cart-btn" title="Shopping Cart">
            <i class="fa-solid fa-basket-shopping"></i>
            <span class="cart-count" id="cart-count-badge">0</span>
          </button>
          <button class="menu-toggle-btn" id="menu-btn" title="Toggle Menu">
            <i class="fa-solid fa-bars-staggered"></i>
          </button>
        </div>
      </div>
    </header>
    
    <!-- Mobile Navigation Drawer -->
    <div class="nav-overlay" id="nav-overlay"></div>
    <div class="mobile-nav" id="mobile-nav">
      <button class="mobile-nav-close" id="menu-close-btn">&times;</button>
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="pz.png" alt="Power Zone" style="height: 80px; width: auto; filter: drop-shadow(0 0 10px rgba(255,15,35,0.4));">
      </div>
      <ul class="mobile-nav-links">
        <li><a href="index.html" class="${page === 'index.html' ? 'active' : ''}">Home</a></li>
        <li><a href="shop.html" class="${page === 'shop.html' ? 'active' : ''}">Shop</a></li>
        <li><a href="about.html" class="${page === 'about.html' ? 'active' : ''}">About Us</a></li>
        <li><a href="contact.html" class="${page === 'contact.html' ? 'active' : ''}">Contact Us</a></li>
        <li><a href="admin.html" class="${page === 'admin.html' ? 'active' : ''}"><i class="fa-solid fa-user-shield"></i> Admin Panel</a></li>
      </ul>
    </div>
  `;
}

function initMobileMenu() {
  const menuBtn = document.getElementById("menu-btn");
  const menuCloseBtn = document.getElementById("menu-close-btn");
  const mobileNav = document.getElementById("mobile-nav");
  const navOverlay = document.getElementById("nav-overlay");
  
  if (!menuBtn || !mobileNav || !navOverlay) return;
  
  const toggleMobileMenu = () => {
    mobileNav.classList.toggle("open");
    navOverlay.classList.toggle("show");
  };
  
  menuBtn.addEventListener("click", toggleMobileMenu);
  if (menuCloseBtn) menuCloseBtn.addEventListener("click", toggleMobileMenu);
  navOverlay.addEventListener("click", toggleMobileMenu);
}

// ----------------------------------------------------
// Footer Injection
// ----------------------------------------------------
function initFooter() {
  const footerRoot = document.getElementById("footer-root");
  if (!footerRoot) return;
  
  const shopName = (window.CONFIG && window.CONFIG.shopName) || "POWER ZONE";
  const whatsappNum = (window.CONFIG && window.CONFIG.whatsappNumber) || "";
  
  footerRoot.innerHTML = `
    <footer>
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="index.html" class="footer-logo-link">
              <img src="pz.png" alt="${shopName} Logo" class="footer-logo-img">
              <span class="logo-text" style="font-size: 20px;">${shopName}</span>
            </a>
            <p>Premium gym supplements store. Fueling your gains with original products, quick delivery, and expert recommendations.</p>
            <div class="social-links">
              <a href="#" class="social-btn"><i class="fa-brands fa-facebook-f"></i></a>
              <a href="#" class="social-btn"><i class="fa-brands fa-instagram"></i></a>
              <a href="#" class="social-btn"><i class="fa-brands fa-tiktok"></i></a>
              <a href="https://wa.me/${whatsappNum}" class="social-btn" target="_blank"><i class="fa-brands fa-whatsapp"></i></a>
            </div>
          </div>
          
          <div class="footer-col">
            <h3>Quick Links</h3>
            <ul class="footer-links">
              <li><a href="index.html">Home</a></li>
              <li><a href="shop.html">Shop Catalog</a></li>
              <li><a href="about.html">About Us</a></li>
              <li><a href="contact.html">Contact & Location</a></li>
            </ul>
          </div>
          
          <div class="footer-col">
            <h3>Categories</h3>
            <ul class="footer-links">
              <li><a href="shop.html?category=Whey Protein">Whey Protein</a></li>
              <li><a href="shop.html?category=Creatine">Creatine</a></li>
              <li><a href="shop.html?category=Pre-Workout">Pre-Workouts</a></li>
              <li><a href="shop.html?category=Fat Burners">Fat Burners</a></li>
            </ul>
          </div>
          
          <div class="footer-col">
            <h3>Contact Info</h3>
            <ul class="contact-info-list">
              <li>
                <i class="fa-solid fa-location-dot"></i>
                <span>2nd Floor, opp. BOC Bank,<br>Homagama, Sri Lanka</span>
              </li>
              <li>
                <i class="fa-solid fa-phone"></i>
                <a href="tel:+94774853381" style="color:inherit;">+94 77 485 3381</a>
              </li>
              <li>
                <i class="fa-solid fa-envelope"></i>
                <a href="mailto:powerzone360@gmail.com" style="color:inherit;">powerzone360@gmail.com</a>
              </li>
              <li>
                <i class="fa-solid fa-clock"></i>
                <span>Every Day: 8AM – 7PM</span>
              </li>
              <li>
                <i class="fa-solid fa-map-location-dot"></i>
                <a href="https://maps.app.goo.gl/oVDd5ZX3n9gfxkht9" target="_blank" style="color: var(--primary);">View on Google Maps</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} ${shopName}. All Rights Reserved. Designed for Peak Performance.</p>
          <div class="footer-bottom-links">
            <a href="admin.html"><i class="fa-solid fa-lock"></i> Admin Panel</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}

// ----------------------------------------------------
// Shopping Cart Logic
// ----------------------------------------------------
let cart = [];

function initCart() {
  // Load Cart Data
  const savedCart = localStorage.getItem("pz_cart");
  if (savedCart) {
    try {
      cart = JSON.parse(savedCart);
    } catch (e) {
      cart = [];
    }
  }
  
  updateCartBadge();
  injectCartDrawer();
  
  // Bind Cart Toggles
  const cartBtn = document.getElementById("cart-btn");
  const cartCloseBtn = document.getElementById("cart-close-btn");
  const cartDrawer = document.getElementById("cart-drawer");
  const cartOverlay = document.getElementById("cart-overlay");
  
  if (cartBtn && cartDrawer) {
    cartBtn.addEventListener("click", () => {
      renderCartItems();
      cartDrawer.classList.add("open");
      cartOverlay.classList.add("show");
    });
  }
  
  if (cartCloseBtn && cartDrawer) {
    cartCloseBtn.addEventListener("click", () => {
      cartDrawer.classList.remove("open");
      cartOverlay.classList.remove("show");
    });
  }
  
  if (cartOverlay && cartDrawer) {
    cartOverlay.addEventListener("click", () => {
      cartDrawer.classList.remove("open");
      cartOverlay.classList.remove("show");
      
      const checkoutModal = document.getElementById("checkout-modal");
      if (checkoutModal) checkoutModal.classList.remove("open");
    });
  }
  
  // Bind Checkout Buttons
  const checkoutBtn = document.getElementById("cart-checkout-btn");
  const checkoutModal = document.getElementById("checkout-modal");
  const checkoutCloseBtn = document.getElementById("checkout-close-btn");
  const orderForm = document.getElementById("whatsapp-order-form");
  
  if (checkoutBtn && checkoutModal) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        showToast("Your cart is empty!", "error");
        return;
      }
      checkoutModal.classList.add("open");
    });
  }
  
  if (checkoutCloseBtn && checkoutModal) {
    checkoutCloseBtn.addEventListener("click", () => {
      checkoutModal.classList.remove("open");
    });
  }
  
  if (orderForm) {
    orderForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const customer = {
        name: document.getElementById("checkout-name").value,
        phone: document.getElementById("checkout-phone").value,
        address: document.getElementById("checkout-address").value,
        notes: document.getElementById("checkout-notes").value
      };
      sendWhatsAppOrder(customer);
    });
  }
}

function injectCartDrawer() {
  // Check if exists, if not create
  let drawer = document.getElementById("cart-drawer");
  if (!drawer) {
    drawer = document.createElement("div");
    drawer.id = "cart-drawer";
    drawer.className = "cart-drawer";
    document.body.appendChild(drawer);
  }
  
  let overlay = document.getElementById("cart-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "cart-overlay";
    overlay.className = "nav-overlay";
    document.body.appendChild(overlay);
  }
  
  drawer.innerHTML = `
    <div class="cart-header">
      <h2>Shopping Cart</h2>
      <button class="cart-close-btn" id="cart-close-btn">&times;</button>
    </div>
    
    <div class="cart-items-container" id="cart-items-list">
      <!-- Dynamic cart items will load here -->
    </div>
    
    <div class="cart-footer">
      <div class="cart-summary-row">
        <span>Subtotal</span>
        <span id="cart-subtotal">LKR 0</span>
      </div>
      <div class="cart-summary-row total">
        <span>Total</span>
        <span class="total-price" id="cart-total">LKR 0</span>
      </div>
      <button class="btn btn-primary" id="cart-checkout-btn" style="width: 100%; margin-top: 16px; gap: 8px;">
        <i class="fa-brands fa-whatsapp" style="font-size: 18px;"></i> Checkout via WhatsApp
      </button>
    </div>
  `;
  
  // Inject Checkout Modal
  let checkoutModal = document.getElementById("checkout-modal");
  if (!checkoutModal) {
    checkoutModal = document.createElement("div");
    checkoutModal.id = "checkout-modal";
    checkoutModal.className = "checkout-modal";
    document.body.appendChild(checkoutModal);
  }
  
  checkoutModal.innerHTML = `
    <div class="checkout-modal-content">
      <div class="checkout-modal-header">
        <h2>Delivery details</h2>
        <button class="checkout-modal-close" id="checkout-close-btn">&times;</button>
      </div>
      <form id="whatsapp-order-form">
        <div class="form-group">
          <label for="checkout-name">Full Name *</label>
          <input type="text" id="checkout-name" required placeholder="Enter your full name">
        </div>
        <div class="form-group">
          <label for="checkout-phone">Phone Number *</label>
          <input type="tel" id="checkout-phone" required placeholder="e.g. 0771234567">
        </div>
        <div class="form-group">
          <label for="checkout-address">Delivery Address *</label>
          <textarea id="checkout-address" rows="3" required placeholder="Enter your complete delivery address"></textarea>
        </div>
        <div class="form-group">
          <label for="checkout-notes">Special Notes (Optional)</label>
          <input type="text" id="checkout-notes" placeholder="e.g. call before delivery">
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%; gap: 10px; margin-top: 10px;">
          <i class="fa-brands fa-whatsapp"></i> Confirm & Send Order
        </button>
      </form>
    </div>
  `;
}

function updateCartBadge() {
  const badge = document.getElementById("cart-count-badge");
  if (!badge) return;
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  badge.textContent = count;
  badge.style.display = count > 0 ? "flex" : "none";
}

function renderCartItems() {
  const container = document.getElementById("cart-items-list");
  const subtotalEl = document.getElementById("cart-subtotal");
  const totalEl = document.getElementById("cart-total");
  if (!container || !subtotalEl || !totalEl) return;
  
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-message">
        <i class="fa-solid fa-basket-shopping"></i>
        <p>Your cart is empty.</p>
        <a href="shop.html" class="btn btn-secondary btn-sm" style="padding: 10px 20px; font-size: 13px;">Shop Now</a>
      </div>
    `;
    subtotalEl.textContent = "LKR 0";
    totalEl.textContent = "LKR 0";
    return;
  }
  
  let html = "";
  let total = 0;
  
  cart.forEach(item => {
    const price = item.salePrice || item.price;
    const itemTotal = price * item.quantity;
    total += itemTotal;
    
    html += `
      <div class="cart-item">
        <img src="${item.image || 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=200'}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <span class="cart-item-name">${item.name}</span>
          <span class="cart-item-brand">${item.brand}</span>
          <div class="cart-item-controls">
            <div class="quantity-control">
              <button onclick="changeQty('${item.id}', -1)">-</button>
              <span>${item.quantity}</span>
              <button onclick="changeQty('${item.id}', 1)">+</button>
            </div>
            <span class="cart-item-price">${formatPrice(itemTotal)}</span>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeCartItem('${item.id}')" title="Remove Item">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `;
  });
  
  container.innerHTML = html;
  subtotalEl.textContent = formatPrice(total);
  totalEl.textContent = formatPrice(total);
}

// Global Cart Actions (exposed for inline onclicks)
window.addToCart = function(product, quantity = 1) {
  quantity = parseInt(quantity) || 1;
  const existing = cart.find(item => item.id === product.id);
  
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      salePrice: product.salePrice,
      image: product.image,
      quantity: quantity
    });
  }
  
  localStorage.setItem("pz_cart", JSON.stringify(cart));
  updateCartBadge();
  renderCartItems();
  
  showToast(`Added ${quantity} x ${product.name} to cart!`);
  
  // Open the drawer automatically
  document.getElementById("cart-drawer").classList.add("open");
  document.getElementById("cart-overlay").classList.add("show");
};

window.changeQty = function(id, delta) {
  const item = cart.find(item => item.id === id);
  if (!item) return;
  
  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  
  localStorage.setItem("pz_cart", JSON.stringify(cart));
  updateCartBadge();
  renderCartItems();
};

window.removeCartItem = function(id) {
  const item = cart.find(i => i.id === id);
  const name = item ? item.name : "Item";
  cart = cart.filter(i => i.id !== id);
  
  localStorage.setItem("pz_cart", JSON.stringify(cart));
  updateCartBadge();
  renderCartItems();
  showToast(`Removed ${name} from cart`, "warning");
};

// Checkout & send to WhatsApp
function sendWhatsAppOrder(customer) {
  const shopName = (window.CONFIG && window.CONFIG.shopName) || "POWER ZONE";
  const whatsappNum = (window.CONFIG && window.CONFIG.whatsappNumber) || "94774853381";
  
  let orderDetails = `🔥 *NEW ORDER - ${shopName.toUpperCase()}* 🔥\n`;
  orderDetails += `---------------------------------\n\n`;
  orderDetails += `🛒 *ITEMS:* \n`;
  
  let subtotal = 0;
  cart.forEach((item, index) => {
    const price = item.salePrice || item.price;
    const lineTotal = price * item.quantity;
    subtotal += lineTotal;
    
    orderDetails += `${index + 1}. *${item.name}* (${item.brand})\n`;
    orderDetails += `   Qty: ${item.quantity} x ${formatPrice(price)} = *${formatPrice(lineTotal)}*\n\n`;
  });
  
  orderDetails += `---------------------------------\n`;
  orderDetails += `💵 *TOTAL BILL:* *${formatPrice(subtotal)}*\n`;
  orderDetails += `---------------------------------\n\n`;
  orderDetails += `👤 *CUSTOMER INFO:* \n`;
  orderDetails += `• *Name:* ${customer.name}\n`;
  orderDetails += `• *Phone:* ${customer.phone}\n`;
  orderDetails += `• *Delivery Address:* ${customer.address}\n`;
  if (customer.notes) {
    orderDetails += `• *Special Notes:* ${customer.notes}\n`;
  }
  
  orderDetails += `\n📦 Please process this order. Thank you!`;
  
  const encodedText = encodeURIComponent(orderDetails);
  const waUrl = `https://wa.me/${whatsappNum}?text=${encodedText}`;
  
  // Clear cart
  cart = [];
  localStorage.setItem("pz_cart", JSON.stringify(cart));
  updateCartBadge();
  
  // Close models
  document.getElementById("checkout-modal").classList.remove("open");
  document.getElementById("cart-drawer").classList.remove("open");
  document.getElementById("cart-overlay").classList.remove("show");
  
  // Open WhatsApp
  window.open(waUrl, '_blank');
}
