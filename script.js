// Shared JavaScript functions
function refreshCode() {
  const newCode = Math.floor(1000 + Math.random() * 9000);
  document.querySelector('.code-display').textContent = newCode;
}

function speakCode() {
  const code = document.querySelector('.code-display').textContent;
  const speech = new SpeechSynthesisUtterance(`Your medicine code is ${code}`);
  window.speechSynthesis.speak(speech);
}

function callDoctor(doctorName) {
  alert(`Calling ${doctorName}...`);
}

function videoCallDoctor(doctorName) {
  alert(`Starting video call with ${doctorName}...`);
}

function speakTip() {
  const tip = document.querySelector('.tip-card p').textContent;
  const speech = new SpeechSynthesisUtterance(tip);
  window.speechSynthesis.speak(speech);
}

function nextTip() {
  alert('Showing next tip...');
}

function switchUser(userName) {
  alert(`Switched to ${userName}'s profile.`);
}

function addNewUser() {
  alert('Add new user functionality...');
}

function callEmergency() {
  alert('Calling emergency helpline...');
}

function sendSOS() {
  alert('SOS message sent!');
}

// Voice Assistant Functionality
function speakGuide() {
  const speech = new SpeechSynthesisUtterance("Welcome to CareConnect. How can I assist you today?");
  window.speechSynthesis.speak(speech);
}

// Switch User Functionality
function toggleUserDropdown() {
  const dropdown = document.getElementById('user-dropdown');
  dropdown.classList.toggle('active');
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.switch-user button')) {
    const dropdown = document.getElementById('user-dropdown');
    if (dropdown.classList.contains('active')) {
      dropdown.classList.remove('active');
    }
  }
};

// Medicine Functionality
function generateNumericCode() {
  const digits = '0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += digits.charAt(Math.floor(Math.random() * digits.length));
  }
  return code;
}

function updateCodeDisplay() {
  const codeDisplay = document.getElementById('code-display');
  codeDisplay.textContent = generateNumericCode();
}

function speakMedicineCode() {
  const code = document.getElementById('code-display').textContent;
  if (code) {
    const speech = new SpeechSynthesisUtterance(code);
    window.speechSynthesis.speak(speech);
  } else {
    alert('No code available to speak.');
  }
}

function refreshMedicineCode() {
  updateCodeDisplay();
}

function searchMedicine() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase();
  const medicineItems = document.querySelectorAll('.medicine-item');
  medicineItems.forEach(item => {
    const name = item.querySelector('.medicine-name').textContent.toLowerCase();
    if (name.includes(searchTerm)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function filterCategory(category) {
  const medicineItems = document.querySelectorAll('.medicine-item');
  medicineItems.forEach(item => {
    if (category === 'all' || item.dataset.category === category) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function updateTotalBill() {
  const medicineItems = document.querySelectorAll('.medicine-item');
  let total = 0;
  medicineItems.forEach(item => {
    const price = parseFloat(item.querySelector('.medicine-price').textContent.replace('$', ''));
    const quantity = parseInt(item.querySelector('.medicine-quantity').value);
    total += price * quantity;
  });
  document.getElementById('total-bill-amount').textContent = `$${total.toFixed(2)}`;
}

const cart = [];

function addToCart(name, price) {
  const medicineItem = Array.from(document.querySelectorAll('.medicine-item')).find(item =>
    item.querySelector('.medicine-name').textContent === name
  );
  const quantity = parseInt(medicineItem.querySelector('.medicine-quantity').value);
  if (quantity > 0) {
    cart.push({ name, price, quantity });
    alert(`${name} (Quantity: ${quantity}) added to cart!`);
  } else {
    alert('Please select a quantity greater than 0.');
  }
}

function submitFeedback() {
  const feedback = document.querySelector('.feedback textarea').value;
  if (feedback.trim() === '') {
    alert('Please enter your feedback before submitting.');
  } else {
    alert('Thank you for your feedback!');
    document.querySelector('.feedback textarea').value = ''; // Clear the textarea
  }
}

function closeNotification() {
  document.querySelector('.notification').style.display = 'none';
}

// Language Changer Functionality
let translations = {};

fetch('translations.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to load translations.json');
    }
    return response.json();
  })
  .then(data => {
    translations = data;
    console.log('Translations loaded:', translations); // Debugging
    changeLanguage(); // Call changeLanguage() after translations are loaded
  })
  .catch(error => {
    console.error('Error loading translations:', error); // Debugging
  });

function changeLanguage() {
  const language = document.getElementById('language-select').value;
  console.log('Selected language:', language); // Debugging
  const elements = document.querySelectorAll('[data-translate]');

  elements.forEach(element => {
    const key = element.getAttribute('data-translate');
    console.log(`Translating element with key: ${key}`); // Debugging
    if (translations[language] && translations[language][key]) {
      element.textContent = translations[language][key];
      console.log(`Translated "${key}" to:`, translations[language][key]); // Debugging
    } else {
      console.warn(`Translation not found for key: ${key} in language: ${language}`); // Debugging
    }
  });
}

// Initialize the page with a numeric code immediately
window.onload = function () {
  updateCodeDisplay();
  updateTotalBill(); // Initialize total bill to $0
  changeLanguage(); // Set the default language
};