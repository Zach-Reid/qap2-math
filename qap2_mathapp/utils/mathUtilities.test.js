const { getQuestion, isCorrectAnswer } = require('./mathUtilities.js');

describe('Math Utilities', () => {
    describe('getQuestion', () => {
        it('should return a valid question', () => {
            const result = getQuestion();
            expect(result).toHaveProperty('question');
            expect(result).toHaveProperty('answer');
            expect(typeof result.question).toBe('string');
            expect(typeof result.answer).toBe('number');
        });

        it('should generate a valid question', () => {
            const { question, answer } = getQuestion();
            const parts = question.split(' ');

            const num1 = parseFloat(parts[0]);
            const operator = parts[1];
            const num2 = parseFloat(parts[2]);
            let calculatedAnswer;

            switch (operator) {
                case '+':
                    calculatedAnswer = num1 + num2;
                    break;
                case '-':
                    calculatedAnswer = num1 - num2;
                    break;
                case '*':
                    calculatedAnswer = num1 * num2;
                    break;
                case '/':
                    calculatedAnswer = (num1 / num2).toFixed(2);
                    break;
            }

            expect(answer).toBe(parseFloat(calculatedAnswer));
        });
    });

    describe('isCorrectAnswer', () => {
        it('should return a correct answer as true', () => {
            expect(isCorrectAnswer('3 + 2', 5, 5)).toBe(true);
            expect(isCorrectAnswer('10 - 5', 5, 5)).toBe(true);
            expect(isCorrectAnswer('6 * 2', 12, 12)).toBe(true);
            expect(isCorrectAnswer('10 / 2', 5, 5)).toBe(true);
        });

        it('should return an incorrect answer as false', () => {
            expect(isCorrectAnswer('3 + 2', 4, 5)).toBe(false);
            expect(isCorrectAnswer('10 - 5', 4, 5)).toBe(false);
            expect(isCorrectAnswer('6 * 2', 11, 12)).toBe(false);
            expect(isCorrectAnswer('10 / 2', 6, 5)).toBe(false);
        });
    });
});


