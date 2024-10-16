document.querySelector('.scroll-down').addEventListener('click', function() {
    window.scrollBy({ 
      top: window.innerHeight, 
      behavior: 'smooth' 
    });
  });
  