document.addEventListener('DOMContentLoaded', function () {
  const myList = JSON.parse(localStorage.getItem('myList')) || [];
  const myListContainer = document.getElementById('my-list-container');

  // Function to generate unique ID for each food item
  function generateUniqueId(food) {
    return `${food.name}-${food.quantity}-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
  }

  // Function to render the food list in the "My List" section
  function renderFoodList() {
    myListContainer.innerHTML = ''; 

    if (myList.length === 0) {
      myListContainer.innerHTML = '<p>No recipe added yet.</p>';
      return;
    }

    myList.forEach(burger => {
      burger.id = burger.id || generateUniqueId(burger);

      const burgerItem = document.createElement('div');
      burgerItem.classList.add('food-card');
      burgerItem.innerHTML = `
        <img src="${burger.img}" alt="${burger.name}" class="food-image">
        <div class="food-details">
          <h3>${burger.name}</h3>
          <p>${burger.kcal} kcal</p>
          <div class="quantity-controls">
            <button class="decrement">-</button>
            <span class="quantity">${burger.quantity}</span>
            <button class="increment">+</button>
            </div>
            </div>
          <div class="actions">
            <button class="remove-btn">❌</button>
          </div>
      `;
      myListContainer.appendChild(burgerItem);
    });

    updateNutritionalValues();
  }

  // Function to update nutritional values based on the list
  function updateNutritionalValues() {
    let totalKcal = 0;
    let totalCarbs = 0;
    let totalProteins = 0;
    let totalFats = 0;

    myList.forEach(burger => {
      totalKcal += burger.kcal * burger.quantity;
      totalCarbs += burger.nutrition.carbohydrates * burger.quantity;
      totalProteins += burger.nutrition.proteins * burger.quantity;
      totalFats += burger.nutrition.fat * burger.quantity;
    });

    document.getElementById('total-kcal').textContent = `${totalKcal} kcal`;
    document.getElementById('total-carbs').textContent = `${totalCarbs}g`;
    document.getElementById('total-proteins').textContent = `${totalProteins}g`;
    document.getElementById('total-fats').textContent = `${totalFats}g`;
  }

  // Event listeners for increment, decrement, and remove buttons in "My List"
  myListContainer.addEventListener('click', function (event) {
    const foodCard = event.target.closest('.food-card');
    const foodName = foodCard.querySelector('h3').textContent;

    if (event.target.classList.contains('remove-btn')) {
      const index = myList.findIndex(burger => burger.name === foodName);
      if (index !== -1) {
        myList.splice(index, 1); 
        localStorage.setItem('myList', JSON.stringify(myList));
        renderFoodList();
      }
    }

    if (event.target.classList.contains('decrement')) {
      const index = myList.findIndex(burger => burger.name === foodName);
      if (index !== -1 && myList[index].quantity > 1) {
        myList[index].quantity--;
        localStorage.setItem('myList', JSON.stringify(myList)); 
        renderFoodList(); 
      }
    }

    if (event.target.classList.contains('increment')) {
      const index = myList.findIndex(burger => burger.name === foodName);
      if (index !== -1) {
        myList[index].quantity++; 
        localStorage.setItem('myList', JSON.stringify(myList)); 
        renderFoodList(); 
      }
    }
  });
  renderFoodList();

  document.querySelector('.total-calories .add-to-calendar-btn').addEventListener('click', function () {
    if (myList.length === 0) {
      alert('Error: Please add a recipe to the list before adding to the calendar!');
      return;
    }

    myList.forEach(item => {
      if (!item.id) {
        item.id = generateUniqueId(item);
      }
    });

    localStorage.setItem('foodList', JSON.stringify(myList));

    localStorage.removeItem('myList'); 
    myList.length = 0; 
    window.location.href = '/Calendar/calendar.html';
  });

  // --- New Code to Display Unscheduled Meals on Calendar Page ---
  const unscheduledMealsContainer = document.querySelector('.unscheduled-meals');
  const savedMeals = JSON.parse(localStorage.getItem('foodList')) || [];

  unscheduledMealsContainer.innerHTML = '';

  // Create and append meal cards for each saved meal
  savedMeals.forEach(food => {
    food.id = food.id || generateUniqueId(food);
    const mealCard = createMealCard(food);
    unscheduledMealsContainer.appendChild(mealCard);
  });

  // Function to create meal card
  function createMealCard(food) {
    const mealCard = document.createElement('div');
    mealCard.classList.add('meal');
    mealCard.draggable = true;
    mealCard.textContent = `${food.name} (${food.quantity}x)`;

    // Store food data in the dataset for drag-and-drop functionality
    mealCard.dataset.id = food.id;
    mealCard.dataset.name = food.name;
    mealCard.dataset.quantity = food.quantity;
    mealCard.dataset.kcal = food.kcal;

    mealCard.addEventListener('dragstart', function (e) {
      e.dataTransfer.setData('text/plain', food.id);
    });

    return mealCard;
  }

  // Drag-and-drop functionality for scheduling meals on the calendar
  const calendarDays = document.querySelectorAll('.day');

  calendarDays.forEach(dayElement => {
    dayElement.addEventListener('dragover', function (e) {
      e.preventDefault();
      dayElement.classList.add('drag-over');
    });

    dayElement.addEventListener('dragleave', function () {
      dayElement.classList.remove('drag-over');
    });

    dayElement.addEventListener('drop', function (e) {
      e.preventDefault();
      dayElement.classList.remove('drag-over');

      const foodId = e.dataTransfer.getData('text/plain');
      const foodItem = savedMeals.find(meal => meal.id === foodId);

      if (foodItem) {
        const dayName = dayElement.dataset.day; 
        const mealsForDay = mealCalendar[dayName] || [];
        mealsForDay.push(foodItem);
        mealCalendar[dayName] = mealsForDay;

        updateTotalCalories();

        localStorage.setItem('mealCalendar', JSON.stringify(mealCalendar));
      }
    });
  });

  // Function to update total calories for each day on the calendar
  function updateTotalCalories() {
    document.querySelectorAll('.day').forEach(dayElement => {
      const dayName = dayElement.dataset.day;
      const meals = mealCalendar[dayName] || [];
      const totalCalories = meals.reduce((total, meal) => total + (meal.kcal * meal.quantity), 0);

      let caloriesElement = dayElement.querySelector('.total-calories');
      if (!caloriesElement) {
        caloriesElement = document.createElement('span');
        caloriesElement.classList.add('total-calories');
        dayElement.appendChild(caloriesElement);
      }

      caloriesElement.textContent = `${totalCalories} kcal`;
    });
  }
});
