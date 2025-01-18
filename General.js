  // NAVIGATION BAR 
  document.addEventListener("DOMContentLoaded", function () {
    const currentPage = window.location.pathname;
  
    const pageLinks = {
      "/index.html": "home-btn",
      "/Recipe/Recipes.html": "recipe-btn",
      "/Calendar/calendar.html": "calendar-btn",
      "/MyList/MyListPage.html": "mylist-btn",
      "/User/SetProfileUser.html": "account-btn"
    };
  
    let isMatchFound = false;

    for (let path in pageLinks) {
      if (currentPage.includes(path)) {
        document.getElementById(pageLinks[path]).classList.add("active");
        isMatchFound = true;
        break;
      }
    }
  
    if (!isMatchFound) {
      document.getElementById("home-btn").classList.add("active");
    }
  });
  
  let lastScrollTop = 0;
  const navBar = document.querySelector('.nav-bar');
  
  window.addEventListener('scroll', function () {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  
    if (currentScroll < lastScrollTop) {
      navBar.style.bottom = '0'; 
    } else {
      navBar.style.bottom = '-97px'; 
    }
  
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });