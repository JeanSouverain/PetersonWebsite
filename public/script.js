function getCart() {
  return JSON.parse(sessionStorage.getItem('bloomCart')) || [];
}

function saveCart(cart) {
  sessionStorage.setItem('bloomCart', JSON.stringify(cart));
}

function addToCart(name, price) {
  const cart = getCart();
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name: name, price: price, quantity: 1 });
  }

  saveCart(cart);
  alert(name + ' has been added to your cart.');
}

function viewCart() {
  const cart = getCart();
  const cartOutput = document.getElementById('cartOutput');

  if (!cartOutput) return;

  if (cart.length === 0) {
    cartOutput.innerHTML = '<p>Cart is currently empty.</p>';
    return;
  }

  let total = 0;
  let html = '<ul>';

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    html += `<li>${item.name} - Quantity: ${item.quantity} - $${itemTotal.toFixed(2)}</li>`;
  });

  html += `</ul><p><strong>Total: $${total.toFixed(2)}</strong></p>`;
  cartOutput.innerHTML = html;
}

function clearCart() {
  const cart = getCart();

  if (cart.length === 0) {
    alert('Your cart is already empty.');
  } else {
    sessionStorage.removeItem('bloomCart');
    alert('Your cart has been cleared.');
  }

  viewCart();
}

function processOrder() {
  const cart = getCart();

  if (cart.length === 0) {
    alert('Your cart is empty. Please add an item before processing an order.');
    return;
  }

  if (sessionStorage.getItem('orderProcessed') === 'true') {
    alert('This order has already been processed.');
    return;
  }

  sessionStorage.setItem('orderProcessed', 'true');
  sessionStorage.removeItem('bloomCart');
  alert('Thank you! Your order has been processed.');
  viewCart();
}

const subscribeForm = document.getElementById('subscribeForm');
if (subscribeForm) {
  subscribeForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('subscribeEmail').value.trim();
    const message = document.getElementById('subscribeMessage');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      message.textContent = 'Please enter a valid email address.';
      return;
    }

    message.textContent = 'Thank you for subscribing to Bloom Valley Nursery updates!';
    subscribeForm.reset();
  });
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const contactData = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      message: document.getElementById('message').value.trim(),
      submittedAt: new Date().toLocaleString()
    };

    if (!contactData.name || !contactData.email || !contactData.message) {
      document.getElementById('contactMessage').textContent = 'Please complete all required fields.';
      return;
    }

    localStorage.setItem('bloomContactRequest', JSON.stringify(contactData));
    document.getElementById('contactMessage').textContent = 'Thank you! Your message has been saved and submitted.';
    contactForm.reset();
  });
}
