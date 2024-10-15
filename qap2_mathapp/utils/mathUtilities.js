const operators = ['+', '-', '*', '/'];

// Make a random math question
function getQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1; // 1 to 10
    const num2 = Math.floor(Math.random() * 10) + 1; // 1 to 10
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let question = `${num1} ${operator} ${num2}`;
    let answer;

    switch (operator) {
        case '+':
            answer = num1 + num2;
            break;
        case '-':
            answer = num1 - num2;
            break;
        case '*':
            answer = num1 * num2;
            break;
        case '/':
            answer = (num1 / num2).toFixed(2); // Two decimal places for division questions
            break;
    }

    return { question, answer: parseFloat(answer) }; // Return the answer as a number
}

// But is it correct? This will see.
function isCorrectAnswer(question, answer, correctAnswer) {
    return parseFloat(answer) === correctAnswer; 
}

module.exports = {
    getQuestion,
    isCorrectAnswer
}



