const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

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

    