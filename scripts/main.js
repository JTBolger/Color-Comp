document.addEventListener("DOMContentLoaded", function() {
    
});

function begin() {
    document.getElementById("title").style.opacity = "0";
    document.getElementById("interfaceOne").style.display = "flex";
    console.log("Begin.");

    // Show Interface
    setTimeout(function () {
        document.getElementById("interfaceOne").style.opacity = "1";
        document.getElementById("title").style.display = "none";
    }, 1000);
}

document.getElementById('inputColor').addEventListener('click', function() {
    console.log("div clicked");
    document.getElementById('colorPicker').click();
});

document.getElementById('colorPicker').addEventListener('input', function() {
    document.getElementById('inputColor').style.backgroundColor = this.value;
});

const net = new brain.NeuralNetwork();

// Training data: Input color and its corresponding recommended color
const trainingData = [
    // Red
    { input: { r: 1, g: 0, b: 0 }, output: { r: 0, g: 1, b: 1 } }, // Red -> Cyan
    { input: { r: 1, g: 0, b: 0 }, output: { r: 1, g: 0.5, b: 0 } }, // Red -> Orange
    { input: { r: 1, g: 0, b: 0 }, output: { r: 1, g: 0.8, b: 0.8 } }, // Red -> Light Pink
    { input: { r: 1, g: 0, b: 0 }, output: { r: 0.5, g: 0.5, b: 0.5 } }, // Red -> Gray
    { input: { r: 1, g: 0, b: 0 }, output: { r: 0.5, g: 0.25, b: 0.25 } }, // Red -> Light Brown

    // Yellow
    { input: { r: 1, g: 1, b: 0 }, output: { r: 0, g: 0, b: 1 } }, // Yellow -> Blue
    { input: { r: 1, g: 1, b: 0 }, output: { r: 1, g: 0.5, b: 0 } }, // Yellow -> Orange
    { input: { r: 1, g: 1, b: 0 }, output: { r: 0.5, g: 1, b: 0.5 } }, // Yellow -> Light Green
    { input: { r: 1, g: 1, b: 0 }, output: { r: 0.5, g: 0.5, b: 0.5 } }, // Yellow -> Gray
    { input: { r: 1, g: 1, b: 0 }, output: { r: 0.8, g: 0.5, b: 0.5 } }, // Yellow -> Light Brown

    // Blue
    { input: { r: 0, g: 0, b: 1 }, output: { r: 1, g: 1, b: 1 } }, // Blue -> White
    { input: { r: 0, g: 0, b: 1 }, output: { r: 1, g: 0.84, b: 0 } }, // Blue -> Gold
    { input: { r: 0, g: 0, b: 1 }, output: { r: 0.96, g: 0.96, b: 0.86 } }, // Blue -> Cream
    { input: { r: 0, g: 0, b: 1 }, output: { r: 0.75, g: 0.75, b: 0.75 } }, // Blue -> Silver
    { input: { r: 0, g: 0, b: 1 }, output: { r: 0.5, g: 1, b: 0.5 } }, // Blue -> Light Green

    // Green
    { input: { r: 0, g: 1, b: 0 }, output: { r: 1, g: 0, b: 1 } }, // Green -> Magenta
    { input: { r: 0, g: 1, b: 0 }, output: { r: 0.5, g: 1, b: 0.5 } }, // Green -> Light Green
    { input: { r: 0, g: 1, b: 0 }, output: { r: 1, g: 1, b: 0 } }, // Green -> Yellow
    { input: { r: 0, g: 1, b: 0 }, output: { r: 0.5, g: 0.5, b: 0.5 } }, // Green -> Gray
    { input: { r: 0, g: 1, b: 0 }, output: { r: 0.8, g: 0.5, b: 0.5 } }, // Green -> Light Brown

    // Black
    { input: { r: 0, g: 0, b: 0 }, output: { r: 1, g: 1, b: 1 } }, // Black -> White
    { input: { r: 0, g: 0, b: 0 }, output: { r: 0.5, g: 0.5, b: 0.5 } }, // Black -> Gray
    { input: { r: 0, g: 0, b: 0 }, output: { r: 1, g: 0, b: 0 } }, // Black -> Red
    { input: { r: 0, g: 0, b: 0 }, output: { r: 1, g: 0.84, b: 0 } }, // Black -> Gold
    { input: { r: 0, g: 0, b: 0 }, output: { r: 0.5, g: 0.25, b: 0.25 } }, // Black -> Light Brown

    // White
    { input: { r: 1, g: 1, b: 1 }, output: { r: 0, g: 0, b: 0 } }, // White -> Black
    { input: { r: 1, g: 1, b: 1 }, output: { r: 0.5, g: 0.5, b: 0.5 } }, // White -> Gray
    { input: { r: 1, g: 1, b: 1 }, output: { r: 1, g: 0, b: 0 } }, // White -> Red
    { input: { r: 1, g: 1, b: 1 }, output: { r: 0.5, g: 0.5, b: 0 } }, // White -> Gold
    { input: { r: 1, g: 1, b: 1 }, output: { r: 0.8, g: 0.8, b: 0.8 } }, // White -> Light Gray

    // Additional colors for diversity
    { input: { r: 0.5, g: 0.5, b: 0 }, output: { r: 0, g: 0.5, b: 0.5 } }, // Olive -> Teal
    { input: { r: 0.5, g: 0, b: 0.5 }, output: { r: 0.5, g: 0.5, b: 0.5 } }, // Purple -> Gray
    { input: { r: 0.5, g: 0.5, b: 0.5 }, output: { r: 1, g: 0.5, b: 0.5 } }, // Gray -> Coral
    { input: { r: 0.5, g: 0.5, b: 0.5 }, output: { r: 0, g: 0.5, b: 1 } }, // Gray -> Blue
];




// Train the network
net.train(trainingData, {
    iterations: 100000, // number of iterations
    errorThresh: 0.005, // acceptable error threshold
    log: true, // log progress to console
    logPeriod: 100 // how often to log progress
});

// Function to normalize RGB values (0-255) to (0-1)
function normalizeRGB(r, g, b) {
    return { r: r / 255, g: g / 255, b: b / 255 };
}

// Function to denormalize RGB values (0-1) back to (0-255)
function denormalizeRGB(color) {
    return {
        r: Math.round(color.r * 255),
        g: Math.round(color.g * 255),
        b: Math.round(color.b * 255)
    };
}

// const inputColor = normalizeRGB(128, 0, 255);

// const output = net.run(inputColor);
// const recommendedColor = denormalizeRGB(output);

console.log('Input Color (RGB):', inputColor);
console.log('Recommended Color (RGB):', recommendedColor);

// function generate() {
//     hex = document.getElementById("colorPicker").value.replace(/^#/, '');

//     let r = parseInt(hex.slice(0, 2), 16);
//     let g = parseInt(hex.slice(2, 4), 16);
//     let b = parseInt(hex.slice(4, 6), 16);

//     inputColor = normalizeRGB(r, g, b)
//     var output = net.run(inputColor);
//     var recRGB = denormalizeRGB(output);

//     var newColor = document.createElement("div");
//     newColor.className = "recColor";
//     newColor.style.backgroundColor = "rgb(" + recRGB.r + "," + recRGB.g + "," + recRGB.b + ")";
//     document.getElementById("recColors").appendChild(newColor);
// }

function generate() {
    // Get the hex value from the color picker and remove the hash symbol
    let hex = document.getElementById("colorPicker").value.replace(/^#/, '');

    // Convert the hex value to RGB
    let r = parseInt(hex.slice(0, 2), 16);
    let g = parseInt(hex.slice(2, 4), 16);
    let b = parseInt(hex.slice(4, 6), 16);

    let inputColor = normalizeRGB(r, g, b);

    // let numberOfColors = Math.floor(Math.random() * 3) + 1;
    let numberOfColors = 3;

    // Clear previous colors
    document.getElementById("recColors").innerHTML = '';

    for (let i = 0; i < numberOfColors; i++) {
        // Run the neural network and get the recommended color
        let output = net.run(inputColor);

        // Denormalize the output to get RGB values in the 0-255 range
        let recRGB = denormalizeRGB(output);

        // Create a new div for the recommended color
        let newColor = document.createElement("div");
        newColor.className = "recColor";
        newColor.style.backgroundColor = "rgb(" + recRGB.r + "," + recRGB.g + "," + recRGB.b + ")";

        // Append the new div to the "recColors" container
        document.getElementById("recColors").appendChild(newColor);

        // Optionally, add a randomization factor to the output
        inputColor = {
            r: Math.min(1, Math.max(0, recRGB.r / 255 + (Math.random() - 0.5) * 0.1)),
            g: Math.min(1, Math.max(0, recRGB.g / 255 + (Math.random() - 0.5) * 0.1)),
            b: Math.min(1, Math.max(0, recRGB.b / 255 + (Math.random() - 0.5) * 0.1))
        };
    }
}
