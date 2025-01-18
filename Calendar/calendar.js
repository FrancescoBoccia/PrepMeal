document.addEventListener('DOMContentLoaded', function () {
  const calendar = document.querySelector('.calendar');
  const unscheduledMealsContainer = document.querySelector('.unscheduled-meals');
  const saveCalendarButton = document.getElementById('save-calendar');

  if (!calendar || !unscheduledMealsContainer || !saveCalendarButton) {
    console.error("One or more required elements are missing in the HTML.");
    return;
  }

  let savedMeals = JSON.parse(localStorage.getItem('foodList')) || [];
  let mealCalendar = JSON.parse(localStorage.getItem('mealCalendar')) || {}; 

  // Function to create a unique ID for each meal
  function generateUniqueId(food) {
    return `${food.name}-${food.quantity}-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
  }

  // Function to create a meal card element
  function createMealCard(food) {
    const mealCard = document.createElement('div');
    mealCard.classList.add('meal');
    mealCard.draggable = true;
    mealCard.textContent = `${food.name} (${food.quantity}x)`;

    mealCard.dataset.id = food.id;
    mealCard.dataset.name = food.name;
    mealCard.dataset.quantity = food.quantity;
    mealCard.dataset.kcal = food.kcal;
    mealCard.dataset.carbs = food.carbs;
    mealCard.dataset.protein = food.protein;
    mealCard.dataset.fat = food.fat;

    return mealCard;
  }

  // Populate meals into their correct days if they are already scheduled
  Object.keys(mealCalendar).forEach(day => {
    const dayElement = calendar.querySelector(`.day[data-day="${day}"]`);
    if (dayElement) {
      mealCalendar[day].forEach(food => {
        const mealCard = createMealCard(food);
        dayElement.appendChild(mealCard);
      });
    }
  });

  // Remove scheduled meals from unscheduled section and keep track of remaining meals
  const scheduledMeals = Object.values(mealCalendar).flat();
  savedMeals.forEach(food => {
    const isScheduled = scheduledMeals.some(meal => meal.id === food.id);
    if (!isScheduled || food.quantity > 0) {
      const mealCard = createMealCard(food);
      unscheduledMealsContainer.appendChild(mealCard);
    }
  });

  setupDragAndDrop();

  // Save calendar data when the user clicks "Save Calendar"
  saveCalendarButton.addEventListener('click', saveCalendar);

  function setupDragAndDrop() {
    const days = document.querySelectorAll('.day');
    let draggedItem = null;

    // On drag start, mark the item as being dragged
    document.addEventListener('dragstart', (e) => {
      if (e.target.classList.contains('meal')) {
        draggedItem = e.target;
        e.target.classList.add('dragging');
      }
    });

    // On drag end, remove the dragging class
    document.addEventListener('dragend', (e) => {
      if (e.target.classList.contains('meal')) {
        e.target.classList.remove('dragging');
        draggedItem = null;
      }
    });

    // Allow dropping on each day element
    days.forEach(day => {
      day.addEventListener('dragover', (e) => {
        e.preventDefault();
      });

      day.addEventListener('drop', (e) => {
        e.preventDefault();
        if (draggedItem) {
          const targetDay = day.dataset.day;
          day.appendChild(draggedItem);

          // Update the mealCalendar object in real-time
          const mealData = getMealData(draggedItem);

          // If the dragged item was already present, remove it first
          Object.keys(mealCalendar).forEach(dayKey => {
            const dayMeals = mealCalendar[dayKey];
            mealCalendar[dayKey] = dayMeals.filter(meal => meal.id !== mealData.id);
          });

          mealData.id = generateUniqueId(mealData); 

          // Add the item to the new day
          if (!mealCalendar[targetDay]) mealCalendar[targetDay] = [];
          mealCalendar[targetDay].push(mealData);

          const index = unscheduledMealsContainer.contains(draggedItem)
            ? Array.from(unscheduledMealsContainer.children).indexOf(draggedItem)
            : -1;
          if (index !== -1) unscheduledMealsContainer.removeChild(draggedItem);

          updateTotalCalories();

          updateFoodList(mealData, 'remove');
        }
      });
    });

    unscheduledMealsContainer.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    unscheduledMealsContainer.addEventListener('drop', (e) => {
      e.preventDefault();
      if (draggedItem) {
        const mondayElement = calendar.querySelector('.day[data-day="Monday"]');
        mondayElement.appendChild(draggedItem);

        const mealData = getMealData(draggedItem);
        mealData.id = generateUniqueId(mealData);

        if (!mealCalendar['Monday']) mealCalendar['Monday'] = [];
        mealCalendar['Monday'].push(mealData);

        unscheduledMealsContainer.removeChild(draggedItem);

        updateTotalCalories();

        updateFoodList(mealData, 'remove');
      }
    });
  }

  // Function to extract meal data from a meal card
  function getMealData(mealCard) {
    return {
      id: mealCard.dataset.id,
      name: mealCard.dataset.name,
      quantity: parseInt(mealCard.dataset.quantity),
      kcal: parseInt(mealCard.dataset.kcal),
      carbs: parseInt(mealCard.dataset.carbs),
      protein: parseInt(mealCard.dataset.protein),
      fat: parseInt(mealCard.dataset.fat)
    };
  }

  // Function to update total calories for each day
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

function saveCalendar() {
  const calendarData = {};

  // Loop through each day and save scheduled meals
  document.querySelectorAll('.day').forEach(day => {
    const dayName = day.dataset.day;
    const meals = [];

    day.querySelectorAll('.meal').forEach(meal => {
      meals.push({
        id: meal.dataset.id,
        name: meal.dataset.name,
        quantity: parseInt(meal.dataset.quantity),
        kcal: parseInt(meal.dataset.kcal),
        carbs: parseInt(meal.dataset.carbs),
        protein: parseInt(meal.dataset.protein),
        fat: parseInt(meal.dataset.fat)
      });
    });

    calendarData[dayName] = meals;
  });

  localStorage.setItem('mealCalendar', JSON.stringify(calendarData));
  localStorage.removeItem('foodList');

  savedMeals.length = 0;

  refreshUnscheduledMeals(savedMeals, calendarData);
  updateTotalCalories();
  alert('Calendar saved!');
}


function refreshUnscheduledMeals(savedMeals, scheduledMeals) {
  // Clear the unscheduled meals container
  unscheduledMealsContainer.innerHTML = '';

  if (!savedMeals || savedMeals.length === 0) return;

  // Re-populate the unscheduled meals container with meals that are not scheduled
  savedMeals.forEach(food => {
    const isScheduled = scheduledMeals.some(meal => meal.id === food.id);
    if (!isScheduled || food.quantity > 0) {
      const mealCard = createMealCard(food);
      unscheduledMealsContainer.appendChild(mealCard);
    }
  });
}


  // Update foodList when meals are added or removed
  function updateFoodList(mealData, action) {
    if (action === 'remove') {
      const foodIndex = savedMeals.findIndex(meal => meal.id === mealData.id);
      if (foodIndex !== -1) {
        savedMeals[foodIndex].quantity -= mealData.quantity;

        if (savedMeals[foodIndex].quantity <= 0) {
          savedMeals.splice(foodIndex, 1);
        }
      }
    }

    localStorage.setItem('foodList', JSON.stringify(savedMeals));
  }

  updateTotalCalories();
});
