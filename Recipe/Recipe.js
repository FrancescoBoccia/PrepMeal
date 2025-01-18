document.addEventListener('DOMContentLoaded', function () {
  const burgerGrid = document.querySelector('.burger-grid');
  const burgerSearchInput = document.getElementById('burger-search');

  // Burger data
  const burgers = [
      { id: 1, name: 'Blueberry Pancakes', rating: 4.8, review: 1120, kcal: 450, img: '/Recipe/RecipeImages/Blueberry-Pancakes.jpg' },
      { id: 2, name: 'Cheeseburger', rating: 4.7, review: 832, kcal: 550, img: '/Recipe/RecipeImages/Cheesburger.jpg' },
      { id: 3, name: 'Iced Latte', rating: 4.7, review: 450, kcal: 150, img: '/Recipe/RecipeImages/IcedLatte.jpeg' },
      { id: 4, name: 'Chicken Taco', rating: 4.8, review: 1234, kcal: 300, img: '/Recipe/RecipeImages/chickenTaco.jpg' },
      { id: 5, name: 'Margherita Pizza', rating: 4.9, review: 980, kcal: 700, img: '/Recipe/RecipeImages/Classic Margherita Pizza.jpg' },
      { id: 6, name: 'Veggie Burger', rating: 4.3, review: 5, kcal: 400, img: '/Recipe/RecipeImages/VeganBurger.jpg' },
      { id: 7, name: 'Glazed Donut', rating: 4.5, review: 320, kcal: 200, img: '/Recipe/RecipeImages/glazedDonut.jpg' },
      { id: 8, name: 'Stir-Fried Noodles', rating: 4.6, review: 789, kcal: 550, img: '/Recipe/RecipeImages/stirFriedNoodles.jpg' },
      { id: 9, name: 'Chicken Burger', rating: 4.9, review: 1427, kcal: 500, img: '/Recipe/RecipeImages/chickenBurger.jpg' },
      { id: 10, name: 'Fried Rice', rating: 4.7, review: 1350, kcal: 620, img: '/Recipe/RecipeImages/friedRice.jpg' },
    ];
    

  // Render burgers function
  function renderBurgers(filteredBurgers) {
    burgerGrid.innerHTML = ''; // Clear grid
  
    if (filteredBurgers.length === 0) {
      burgerGrid.innerHTML = '<p class="no-results">No burgers match your search or filter criteria.</p>';
      return;
    }
  
    filteredBurgers.forEach(burger => {
      const burgerItem = document.createElement('div');
      burgerItem.classList.add('burger-item');
      burgerItem.setAttribute('data-id', burger.id);
      burgerItem.innerHTML = `
        <img src="${burger.img}" alt="${burger.name}">
        <h3>${burger.name}</h3>
        <p> <span class= "star">★</span> ${burger.rating}<span class= "review">(${burger.review})</span></p>
        <p class= "recipe-price">${burger.kcal} kcal</p>
      `;
      burgerGrid.appendChild(burgerItem);
  
      burgerItem.addEventListener('click', function () {
        window.location.href = `/Food/FoodDetails.html?id=${burger.id}`;
      });
    });
  }
  

  // Search functionality
  burgerSearchInput.addEventListener('input', function () {
    const searchTerm = burgerSearchInput.value.toLowerCase();

    // Filter burgers based on the search term (case insensitive)
    const filteredBurgers = burgers.filter(burger => 
      burger.name.toLowerCase().includes(searchTerm)
    );

    // Render the filtered burgers
    renderBurgers(filteredBurgers);
  });

  // Initial render of all burgers
  renderBurgers(burgers);
});