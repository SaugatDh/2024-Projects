// Access the canvas and context
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Circle properties
let x = 250;            // Initial x position
let y = 250;            // Initial y position
const radius = 20;      // Circle radius
let dx = 15;            // Change in x (horizontal speed)
let dy = 15;            // Change in y (vertical speed)
const angle = 45 * (Math.PI / 180); // 45 degrees in radians

function drawCircle() {
    // Clear previous frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the circle
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.fillStyle = "skyblue";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.closePath();

    // Update circle's position
    x += dx;
    y += dy;

    // Check for collision with the edges and reverse direction if needed
    if (x + radius > canvas.width || x - radius < 0) {
        dx = -dx; // Reverse horizontal direction
        dy = dy > 0 ? 15 * Math.tan(angle) : -15 * Math.tan(angle); // Maintain 45-degree angle
    }
    if (y + radius > canvas.height || y - radius < 0) {
        dy = -dy; // Reverse vertical direction
        dx = dx > 0 ? 15 / Math.tan(angle) : -15 / Math.tan(angle); // Maintain 45-degree angle
    }
}

// Animation loop
function animate() {
    drawCircle();
    requestAnimationFrame(animate); // Loop animation
}

// Start the animation
animate();
