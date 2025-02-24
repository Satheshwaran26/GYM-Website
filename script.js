const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    console.log('Hamburger clicked!');
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

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();  // Prevent default anchor click behavior
    
            // Get the target section from the link's href attribute
            const targetId = this.getAttribute('href').substring(1); // Remove the "#" from href
            const targetSection = document.getElementById(targetId);
    
            // Check if the section exists
            if (targetSection) {
                // Scroll smoothly to the target section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                console.error('Target section not found: ' + targetId);
            }
        });
    });
    function toggleChat() {
        let chatBox = document.getElementById("chatContainer");
    
        if (chatBox.style.display === "flex") {
            chatBox.style.display = "none";
        } else {
            chatBox.style.display = "flex";
    
            // Show a welcome message only the first time
            let chatBody = document.getElementById("chatBody");
            if (chatBody.children.length === 0) {
                appendMessage("Bot", "Hello! How can I assist you today?", "bot");
            }
        }
    }
    
    // Listen for Enter key in input field
    document.getElementById("userInput").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevents newline in input
            sendMessage();
        }
    });
    
    async function sendMessage() {
        let inputField = document.getElementById("userInput");
        let userMessage = inputField.value.trim();
        
        if (!userMessage) return;
        
        appendMessage("You", userMessage, "user");
        inputField.value = "";
    
        // Show a loading message
        let loadingMessage = appendLoadingMessage();
    
        let botResponse = await fetchGeminiResponse(userMessage);
    
        // Remove the loading message
        loadingMessage.remove();
    
        appendMessage("Bot", botResponse, "bot");
    }
    
    function appendMessage(sender, message, type) {
        let chatBody = document.getElementById("chatBody");
        let messageElement = document.createElement("div");
        messageElement.classList.add("message", type);
    
        let icon = type === 'user' 
            ? '<i class="fa-solid fa-user"></i>' 
            : '<i class="fa-solid fa-robot"></i>';
    
        messageElement.innerHTML = `
            <div class="icon">${icon}</div>
            <div class="text">${message}</div>
        `;
    
        chatBody.appendChild(messageElement);
        chatBody.scrollTop = chatBody.scrollHeight;
    }
    
    // Function to add loading message
    function appendLoadingMessage() {
        let chatBody = document.getElementById("chatBody");
        let loadingMessage = document.createElement("div");
        loadingMessage.classList.add("message", "bot", "loading");
    
        loadingMessage.innerHTML = `
            <div class="icon"><i class="fa-solid fa-robot"></i></div>
            <div class="text">Bot is typing<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></div>
        `;
    
        chatBody.appendChild(loadingMessage);
        chatBody.scrollTop = chatBody.scrollHeight;
    
        return loadingMessage; // Return element so it can be removed later
    }
    
    async function fetchGeminiResponse(userMessage) {
        const apiKey = "AIzaSyD-DL6LN1SvF6_R_uqXZKxrB1SXA82Z9RU";  // Replace with a valid API key
        const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`;
    
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: `Give a very short response (1-2 sentences) about: ${userMessage}` }] }]
                })
            });
    
            const data = await response.json();
    
            if (data.candidates && data.candidates.length > 0) {
                return data.candidates[0].content.parts[0].text;
            } else {
                return "I can help with that!";
            }
        } catch (error) {
            return "Sorry, I couldn't connect. Please try again later.";
        }
    }
    