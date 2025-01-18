// PROFILE SECTION
const editIcon = document.getElementById("edit-icon");
const imageInput = document.getElementById("image-input");
const profileImg = document.getElementById("profile-img");

editIcon.addEventListener("click", () => {
  imageInput.click();
});

imageInput.addEventListener("change", (event) => {
  const file = event.target.files[0]; 

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      profileImg.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});


const countryCodeDropdown = document.getElementById('country-code-dropdown');
const countryCodeList = document.getElementById('country-code-list');
const selectedFlag = document.getElementById('selected-flag');
const selectedCode = document.getElementById('selected-code');
const phoneInput = document.getElementById('phone');

countryCodeDropdown.addEventListener('click', () => {
  countryCodeList.classList.toggle('show');
});

countryCodeList.addEventListener('click', (event) => {
  const clickedItem = event.target.closest('li');
  if (clickedItem) {
    const countryCode = clickedItem.dataset.value;
    const flag = clickedItem.dataset.flag;

    selectedFlag.src = flag;
    selectedCode.textContent = countryCode;

    countryCodeList.classList.remove('show');

    phoneInput.focus();
  }
});

document.addEventListener('click', (event) => {
  if (
    !countryCodeDropdown.contains(event.target) &&
    !countryCodeList.contains(event.target)
  ) {
    countryCodeList.classList.remove('show');
  }
});


// SAVE DATA ON LOCAL STORAGE WITH HANDLING ERRORS
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('userData')) {
    const savedData = JSON.parse(localStorage.getItem('userData'));

    document.getElementById('phone').value = savedData.phone || '';
    document.getElementById('email').value = savedData.email || '';
    document.getElementById('username').value = savedData.username || '';
    document.getElementById('dob').value = savedData.dob || '';
    document.getElementById('gender').value = savedData.gender || 'male';
    document.getElementById('location').value = savedData.location || '';
    document.getElementById('selected-code').innerText = savedData.countryCode || '+1';
    document.getElementById('selected-flag').src = savedData.flagSrc || 'https://flagcdn.com/us.svg';
  }

  document.querySelector('.save-btn').addEventListener('click', () => {
    clearErrors();

    const userData = {
      phone: document.getElementById('phone').value,
      email: document.getElementById('email').value,
      username: document.getElementById('username').value,
      dob: document.getElementById('dob').value,
      gender: document.getElementById('gender').value,
      location: document.getElementById('location').value,
      countryCode: document.getElementById('selected-code').innerText,
      flagSrc: document.getElementById('selected-flag').src
    };

    const errors = validateInputs(userData);

    if (Object.keys(errors).length === 0) {
      localStorage.setItem('userData', JSON.stringify(userData));
      alert('Data saved! You can continue browsing!');
      
      window.location.href = '/index.html';
    } else {
      showErrors(errors);
    }
  });

  document.getElementById('country-code-dropdown').addEventListener('click', () => {
    const countryList = document.getElementById('country-code-list');
    countryList.classList.toggle('visible');
  });

  document.querySelectorAll('#country-code-list li').forEach(item => {
    item.addEventListener('click', () => {
      const countryCode = item.getAttribute('data-value');
      const flagSrc = item.getAttribute('data-flag');
      document.getElementById('selected-code').innerText = countryCode;
      document.getElementById('selected-flag').src = flagSrc;
      document.getElementById('country-code-list').classList.remove('visible');
    });
  });
});

function validateInputs(data) {
  const errors = {};

  if (!data.phone) {
    errors.phone = 'Phone number is required.';
  }

  if (!data.email || !validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!data.username) {
    errors.username = 'Username is required.';
  }

  if (!data.dob) {
    errors.dob = 'Date of birth is required.';
  }

  if (!data.gender) {
    errors.gender = 'Gender selection is required.';
  }

  if (!data.location) {
    errors.location = 'Location is required.';
  }

  if (!data.countryCode || data.countryCode === '+1') {
    errors.countryCode = 'Please select a country code.';
  }

  return errors;
}

function validateEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailPattern.test(email);
}

// SHOW ERRORS BELOW INPUT
function showErrors(errors) {
  Object.keys(errors).forEach(field => {
    const errorMessage = errors[field];
    const inputElement = document.getElementById(field);
    const errorElement = document.createElement('span');
    errorElement.classList.add('error-message');
    errorElement.innerText = errorMessage;

    inputElement.classList.add('error');
    
    if (field === 'phone') {
      const phoneWrapper = inputElement.closest('.phone-input-wrapper');
      phoneWrapper.parentElement.appendChild(errorElement);
    } else {
      inputElement.parentElement.appendChild(errorElement);
    }
  });
}

function clearErrors() {
  const errorMessages = document.querySelectorAll('.error-message');
  const errorInputs = document.querySelectorAll('.error');

  errorMessages.forEach(error => error.remove());
  errorInputs.forEach(input => input.classList.remove('error'));
}
