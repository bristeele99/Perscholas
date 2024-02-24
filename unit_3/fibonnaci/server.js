const express = require('express');
const app = express();

// Set up your view engine (EJS in this example)
app.set('view engine', 'ejs');
app.set('views', __dirname);


// Fibonacci function without parameter
function generateFibonacci() {
    let fibonacciSequence = [0, 1];
    let i = 2;

    // Generate Fibonacci sequence until reaching the maximum safe integer in JavaScript
    while (fibonacciSequence[i - 1] + fibonacciSequence[i - 2] <= Number.MAX_SAFE_INTEGER) {
        let nextNumber = fibonacciSequence[i - 1] + fibonacciSequence[i - 2];
        fibonacciSequence.push(nextNumber);
        i++;
    }

    return fibonacciSequence;
}

// Function to check if a number is part of the Fibonacci sequence
function isFibonacciNumber(number, fibonacciSequence) {
    return fibonacciSequence.includes(number);
}


// Define a route for '/fibonacci'
app.get('/fibonacci', (req, res) => {
    // Generate Fibonacci sequence
    const fibonacciResult = generateFibonacci();

    // Get the user-input number from the query parameters
    
    const userNumber = parseInt(req.query.number, 10);
    console.log(userNumber);

    // Check if the user-input number is part of the Fibonacci sequence
    const isInFibonacciSequence = isFibonacciNumber(userNumber, fibonacciResult);

    // Render a view and pass data to display the result
    res.render('fibonacci', { userNumber, isInFibonacciSequence, fibonacciResult });
});

// Start the server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
