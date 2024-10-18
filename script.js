document.querySelector('.scroll-down').addEventListener('click', function() {
    window.scrollBy({ 
      top: window.innerHeight, 
      behavior: 'smooth' 
    });
  });
  // Select the hamburger icon and the mobile menu


// Toggle the 'open' class on the mobile menu when the hamburger icon is clicked
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

hamburger.addEventListener('click', function () {
    mobileMenu.classList.toggle('open');
});

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
document.getElementById('gymForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Collect form values
  const name = capitalizeFirstLetter(document.getElementById('name').value);
  const age = parseInt(document.getElementById('age').value);
  const gender = document.getElementById('gender').value;
  const goal = document.getElementById('goal').value;
  const height = parseFloat(document.getElementById('height').value);
  const weight = parseFloat(document.getElementById('current-weight').value);
  const targetWeight = parseFloat(document.getElementById('target-weight').value);
  const targetPerWeek = parseFloat(document.getElementById('target-per-week').value);
  const resultDiv = document.getElementById('result');

  if (name && goal && age && gender && height && weight && targetWeight && targetPerWeek) {
      // Calculate calorie intake and recommend foods
      const calorieIntake = calculateCalories(goal, gender, height, weight, targetPerWeek);
      const recommendedFoods = recommendFoods(goal);

      // Display result
      resultDiv.innerHTML = `
  <h1 class="result-title">Your Result</h1>
  <h1 class="calorie-intake">Calorie Intake: ${name}, you need to consume <span>${calorieIntake}</span> kcal/day</h1>
  <h4 class="recommended-foods">Recommended Foods:</h4>
  <ul class="food-list">
      ${recommendedFoods.map(food => `<li class="food-item">${food.name} - ${food.calories} kcal per serving</li>`).join('')}
  </ul>
`;

  } else {
      resultDiv.innerHTML = '<p>Please fill in all the fields.</p>';
  }
});

// Function to capitalize the first letter of the name
function capitalizeFirstLetter(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function calculateCalories(goal, gender, height, weight, targetPerWeek) {
  const baseCalories = gender === 'male' ?  2500 : 2000;
  let adjustment = targetPerWeek * 100;

  if (goal === 'gain') {
      return baseCalories + adjustment;
  } else if (goal === 'loss') {
      return baseCalories - adjustment;
  }
  return baseCalories;
}

function recommendFoods(goal) {
  if (goal === 'gain') {
      return [
          { name: 'Chicken', calories: 165 },
          { name: 'Rice', calories: 130 },
          { name: 'Oats', calories: 150 },
          { name: 'Nuts', calories: 200 },
          { name: 'Milk', calories: 100 },
          { name: 'Eggs', calories: 78 }
      ];
  } else if (goal === 'loss') {
      return [
          { name: 'Leafy Greens', calories: 25 },
          { name: 'Salmon', calories: 208 },
          { name: 'Chicken', calories: 165 },
          { name: 'Whole Eggs', calories: 78 },
          { name: 'Beans', calories: 120 },
          { name: 'Fruits', calories: 60 }
      ];
  }
  return [];
}



// Option style //
const genderSelect = document.getElementById('gender');
  const genderIcon = document.getElementById('gender-icon');

  // Event listener for changes in the gender select field
  genderSelect.addEventListener('change', function () {
      if (this.value === 'male') {
          genderIcon.className = 'fas fa-mars';  // Change to male icon
      } else if (this.value === 'female') {
          genderIcon.className = 'fas fa-venus';  // Change to female icon
      }else if (this.value === 'Other'){
          genderIcon.className = 'fas fa-transgender';
      }
  });

// Option style //
