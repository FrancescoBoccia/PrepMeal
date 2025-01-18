document.addEventListener('DOMContentLoaded', function () {
  const food = [
      {
        id: 1,
        name: 'Blueberry Pancakes',
        img: '/Recipe/RecipeImages/Blueberry-Pancakes.jpg',
        rating: 4.8,
        kcal: 450,
        ratedBy: 1120,
        nutrition: {
          proteins: '8',
          fat: '15',
          carbohydrates: '70',
          sugar: '20',
        },
        ingredients: ['Flour', 'Blueberries', 'Milk', 'Eggs', 'Butter', 'Sugar'],
        description: 'Fluffy pancakes topped with fresh blueberries and syrup.',
        instructions: [
          'Mix flour, milk, eggs, and sugar in a bowl until smooth.',
          'Cook the batter on a greased skillet until golden on both sides.',
          'Top with blueberries and serve with syrup.',
        ],
      },
      {
        id: 2,
        name: 'Cheeseburger',
        img: '/Recipe/RecipeImages/Cheesburger.jpg',
        rating: 4.7,
        kcal: 550,
        ratedBy: 832,
        nutrition: {
          proteins: '34',
          fat: '22',
          carbohydrates: '45',
          sugar: '7',
        },
        ingredients: ['Bun', 'Beef patty', 'Cheese', 'Lettuce', 'Tomato', 'Pickles'],
        description: 'A cheesy delight with a juicy beef patty.',
        instructions: [
          'Grill the beef patty and melt cheese on top.',
          'Toast the bun and assemble with lettuce, tomato, and pickles.',
          'Serve with your favorite sauce.',
        ],
      },
      {
        id: 3,
        name: 'Iced Latte',
        img: '/Recipe/RecipeImages/IcedLatte.jpeg',
        rating: 4.7,
        kcal: 150,
        ratedBy: 450,
        nutrition: {
          proteins: '5',
          fat: '3',
          carbohydrates: '12',
          sugar: '10',
        },
        ingredients: ['Espresso', 'Milk', 'Ice cubes', 'Vanilla syrup'],
        description: 'A refreshing coffee drink with milk and ice.',
        instructions: [
          'Brew a shot of espresso and let it cool slightly.',
          'Pour over ice cubes in a glass.',
          'Add milk and vanilla syrup, then stir to combine.',
        ],
      },
      {
        id: 4,
        name: 'Chicken Taco',
        img: '/Recipe/RecipeImages/chickenTaco.jpg',
        rating: 4.8,
        kcal: 300,
        ratedBy: 1234,
        nutrition: {
          proteins: '22',
          fat: '10',
          carbohydrates: '30',
          sugar: '4',
        },
        ingredients: ['Taco shell', 'Grilled chicken', 'Lettuce', 'Cheese', 'Salsa'],
        description: 'A flavorful taco with tender grilled chicken.',
        instructions: [
          'Grill chicken until cooked through, then slice into strips.',
          'Fill taco shells with lettuce, chicken, and cheese.',
          'Top with salsa and serve.',
        ],
      },
      {
        id: 5,
        name: 'Margherita Pizza',
        img: '/Recipe/RecipeImages/Classic Margherita Pizza.jpg',
        rating: 4.9,
        kcal: 700,
        ratedBy: 980,
        nutrition: {
          proteins: '25',
          fat: '18',
          carbohydrates: '90',
          sugar: '5',
        },
        ingredients: ['Pizza dough', 'Tomato sauce', 'Mozzarella', 'Basil'],
        description: 'A classic Italian pizza with fresh mozzarella and basil.',
        instructions: [
          'Spread tomato sauce on rolled-out pizza dough.',
          'Top with slices of mozzarella and fresh basil leaves.',
          'Bake in a hot oven until the crust is golden and the cheese is bubbly.',
        ],
      },
      {
        id: 6,
        name: 'Veggie Burger',
        img: '/Recipe/RecipeImages/VeganBurger.jpg',
        rating: 4.3,
        kcal: 400,
        ratedBy: 5,
        nutrition: {
          proteins: '20',
          fat: '10',
          carbohydrates: '50',
          sugar: '4',
        },
        ingredients: ['Veggie patty', 'Lettuce', 'Tomato', 'Avocado', 'Vegan cheese'],
        description: 'A healthy and delicious veggie option.',
        instructions: [
          'Cook the veggie patty in a skillet or grill until golden.',
          'Assemble with fresh avocado, lettuce, and tomato.',
          'Serve with vegan cheese on a toasted bun.',
        ],
      },
      {
        id: 7,
        name: 'Glazed Donut',
        img: '/Recipe/RecipeImages/glazedDonut.jpg',
        rating: 4.5,
        kcal: 200,
        ratedBy: 320,
        nutrition: {
          proteins: '3',
          fat: '8',
          carbohydrates: '30',
          sugar: '15',
        },
        ingredients: ['Flour', 'Sugar', 'Eggs', 'Milk', 'Glaze'],
        description: 'A soft donut with a sweet sugar glaze.',
        instructions: [
          'Mix dough ingredients and let it rise.',
          'Fry donut shapes in oil until golden.',
          'Dip in glaze and allow to set before serving.',
        ],
      },
      {
        id: 8,
        name: 'Stir-Fried Noodles',
        img: '/Recipe/RecipeImages/stirFriedNoodles.jpg',
        rating: 4.6,
        kcal: 550,
        ratedBy: 789,
        nutrition: {
          proteins: '18',
          fat: '10',
          carbohydrates: '70',
          sugar: '6',
        },
        ingredients: ['Noodles', 'Soy sauce', 'Vegetables', 'Chicken or tofu'],
        description: 'A savory stir-fried noodle dish with vegetables and protein.',
        instructions: [
          'Cook noodles according to package instructions.',
          'Stir-fry vegetables and chicken or tofu in a hot pan.',
          'Mix in noodles and soy sauce, then toss to combine.',
        ],
      },
      {
        id: 9,
        name: 'Chicken Burger',
        img: '/Recipe/RecipeImages/chickenBurger.jpg',
        rating: 4.9,
        kcal: 500,
        ratedBy: 1427,
        nutrition: {
          proteins: '35',
          fat: '20',
          carbohydrates: '40',
          sugar: '6',
        },
        ingredients: ['Bun', 'Chicken patty', 'Lettuce', 'Tomato', 'Cheese'],
        description: 'A juicy chicken burger with fresh veggies.',
        instructions: [
          'In a mixing bowl, combine ground chicken with breadcrumbs, egg, and spices.',
          'Form into patties and cook in a skillet or grill until golden brown.',
          'Assemble with fresh veggies and cheese on a toasted bun.',
        ],
      },
      {
        id: 10,
        name: 'Fried Rice',
        img: '/Recipe/RecipeImages/friedRice.jpg',
        rating: 4.7,
        kcal: 620,
        ratedBy: 1350,
        nutrition: {
          proteins: '20',
          fat: '12',
          carbohydrates: '80',
          sugar: '5',
        },
        ingredients: ['Rice', 'Soy sauce', 'Eggs', 'Vegetables', 'Chicken or shrimp'],
        description: 'A hearty fried rice dish with your choice of protein.',
        instructions: [
          'Cook rice and let it cool.',
          'Scramble eggs in a hot pan, then add vegetables and protein.',
          'Mix in rice and soy sauce, stir-frying until everything is combined.',
        ],
      },
    ];
    

  const urlParams = new URLSearchParams(window.location.search);
  const burgerId = urlParams.get('id');

  const selectedBurger = food.find(burger => burger.id == burgerId);

  if (selectedBurger) {
    displayBurgerDetails(selectedBurger);

    const scheduleBtn = document.querySelector('.schedule-btn');
    scheduleBtn.addEventListener('click', function () {
      let myList = JSON.parse(localStorage.getItem('myList')) || [];  

      const existingBurgerIndex = myList.findIndex(item => item.id === selectedBurger.id);

      if (existingBurgerIndex !== -1) {
        myList[existingBurgerIndex].quantity++;
      } else {
        myList.push({ ...selectedBurger, quantity: 1 });
      }

      localStorage.setItem('myList', JSON.stringify(myList));
      
      alert('Food added to your list!');

      window.location.href = '/recipe/recipes.html';
    });

  } else {
    alert('Burger not found!');
    window.location.href = '/';
  }

  // Display burger details function
  function displayBurgerDetails(burger) {
    document.getElementById('burger-image').src = burger.img;
    document.getElementById('burger-image').alt = burger.name;
    document.getElementById('burger-name').textContent = burger.name;
    document.getElementById('burger-calories').textContent = `${burger.kcal} kcal`;
    document.getElementById('rating-info').textContent = `${burger.rating}  (${burger.ratedBy})`;
    document.getElementById('nutrition-info').innerHTML = `
      Proteins ${burger.nutrition.proteins}g - 
      Fat ${burger.nutrition.fat}g -
      Carbohydrates ${burger.nutrition.carbohydrates}g - 
      Sugar ${burger.nutrition.sugar}g
    `;

    const ingredientsList = document.getElementById('ingredients-list');
    ingredientsList.innerHTML = '';
    burger.ingredients.forEach(ingredient => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `<span>${ingredient}</span> <input type="checkbox">`;
      ingredientsList.appendChild(listItem);
    });

    const instructionsList = document.getElementById('instructions-list');
    instructionsList.innerHTML = '';
    burger.instructions.forEach(instruction => {
      const listItem = document.createElement('li');
      listItem.textContent = instruction;
      instructionsList.appendChild(listItem);
    });
  }
});
