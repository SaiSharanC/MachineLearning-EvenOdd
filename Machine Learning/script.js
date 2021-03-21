"strict";

const number = document.getElementById('number');
const guess = document.getElementById('guess');
const even = document.getElementById('btn-even');
const odd = document.getElementById('btn-odd');
const print = document.getElementById('btn-print');

let guessNumber;

const config = {
    hiddenLayers: [4],
}

const net = new brain.NeuralNetwork(config);

let trainingData = [{
        input: [0.02],
        output: [1]
    },
    {
        input: [0.03],
        output: [0]
    },
];

init();

function newNumber() {
    guessNumber = Math.floor(Math.random() * 30 + 1);
    number.textContent = guessNumber;
};

function guessing(randomNum) {
    const prefix = 'Guess: ';
    let guessString;
    let tempNum = randomNum / 100;
    let guessNum = net.run([tempNum]);
    if (guessNum > 0.5) {
        guessString = 'Even';
    } else {
        guessString = 'Odd';
    }
    guess.textContent = prefix + guessString;
};

function init() {
    newNumber();
    net.train(trainingData);
    guessing(guessNumber);
};

function btnClicked(evenOdd) {
    //Insert in training list
    tempNumb = guessNumber / 100;
    trainingData.push({ input: [tempNumb], output: [evenOdd] }, );
    //Re-Train
    net.train(trainingData);
    //New Number
    newNumber();
    //Make New Guess
    guessing(guessNumber);
}

even.addEventListener('click', btnClicked.bind(null, 1));
odd.addEventListener('click', btnClicked.bind(null, 0));
print.addEventListener('click', () => console.log(JSON.stringify(trainingData)));