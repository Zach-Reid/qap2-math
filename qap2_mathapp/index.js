const express = require('express');
const { getQuestion, isCorrectAnswer } = require('./utils/mathUtilities');

const app = express();
const port = 3000;

// Storage for the streak and leaderboard
let currentStreak = 0;
let currentQuestion = null;
let leaderboards = [];


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// For the home page
app.get('/', (req, res) => {
    const lastStreak = currentStreak;
    res.render('index', { lastStreak });
});

//  For starting the quiz
app.get('/quiz', (req, res) => {
    currentQuestion = getQuestion(); // Generate a new question
    res.render('quiz', {
        question: currentQuestion.question,
        currentStreak: currentStreak // Pass current streak to the quiz page
    });
});


// Handle quiz submissions
app.post('/quiz', (req, res) => {
    const { answer } = req.body;

    // Check the answer using the correct answer
    if (isCorrectAnswer(currentQuestion.question, answer, currentQuestion.answer)) {
        currentStreak += 1; // If it's right, go up
    } else {
        // If it's wrong, add it to the leaderboard if it's high enough
        if (currentStreak > 0) {
            leaderboards.push({ streak: currentStreak, date: new Date() });
            leaderboards.sort((a, b) => b.streak - a.streak); // Sort based on the streak value
            leaderboards = leaderboards.slice(0, 10); // Only have the top 10
        }
        currentStreak = 0; // Reset the streak
    }

    // Make a new question
    currentQuestion = getQuestion();
    res.render('quiz', {
        question: currentQuestion.question,
        currentStreak: currentStreak 
    });
});









// For the leaderboard
app.get('/leaderboards', (req, res) => {
    res.render('leaderboards', { leaderboards });
});

// Start up the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});



