// Fetching a promise
const getData = async () => {
    // 
    const response = await fetch('data.json')
        if (!response.ok) {
        throw new Error('Cannot fetch data')
    }
    const data = await response.json()
    return data
}
//  using the data

getData()
.then(data => {
    const workingData = data
    console.log('resolved:', workingData);

    // the main template adding JSON paths to data
    const petTemplate = anEvent => {
        return `
        <div class="activity mySlides fade">
            <img class="event-photo" style="width:100%" src="${anEvent.photo}">
            <h2 class="sub-heading">${anEvent.location}</h2>
            <h3 class="event-name">${anEvent.event}</h3>
            <p class="the-month">${anEvent.month}</p>
            <p class="the-memory">${anEvent.memory}</p>
        </div>
        `
    }

// Outputting the template with JSON data
    document.querySelector("#app").innerHTML = `
        <h1 class="title">Happy Birthday Eli!</h1>
        <p class="intro-text">Here are some fun events you experienced in 2022</p>
        <div class="activity-container slideshow-container">
        ${workingData.map(petTemplate).join('')}
        <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
        <a class="next" onclick="plusSlides(1)">&#10095;</a>
        </div>
        <div style="text-align:center">
            <span class="dot" onclick="currentSlide(1)"></span>
            <span class="dot" onclick="currentSlide(2)"></span>
            <span class="dot" onclick="currentSlide(3)"></span>
        </div>
    `



    let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
} 
})



// Error handling for JSON data processing
.catch(err => {
    console.log('rejected:', err);
})