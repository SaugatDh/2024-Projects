let currentValue = 0;
const slideWidth = 220; // 200px width + 10px margin on each side
const slider = document.getElementById("slider");
const totalSlides = slider.children.length;

const prevButton = document.querySelector(".prev-btn");
const nextButton = document.querySelector(".next-btn");

// Calculate the number of visible slides based on container width and slide width
const containerWidth = document.querySelector(".slider-container").offsetWidth;
const visibleSlides = Math.floor(containerWidth / slideWidth);


    function updateButtons() {
        prevButton.style.display = currentValue === 0 ? "none" : "inline-block";
        nextButton.style.display = currentValue >= totalSlides - visibleSlides ? "none" : "inline-block";
    }


// Initialize button states on load
updateButtons();

function prevSlide() {
    if (currentValue > 0) {
        currentValue--;
        slider.style.transform = `translateX(-${currentValue * slideWidth}px)`;
        updateButtons(); // Update button states after slide change
    }
}

function nextSlide() {
    if (currentValue < totalSlides - visibleSlides) {
        currentValue++;
        slider.style.transform = `translateX(-${currentValue * slideWidth}px)`;
        updateButtons(); // Update button states after slide change
    }
}
