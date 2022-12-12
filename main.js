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
        <div class="mySlides">
            <img class="event-photo" src="${anEvent.photo}">
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
        <div class="slideshow-container">
        ${workingData.map(petTemplate).join('')}
        </div>
        <div class="buttons">
            <button id="prev">&#10094;</button>
        </div>
        <div class="buttons">
            <button id="next">&#10095;</button>
        </div>
    `

    const slidesContainer = document.querySelector(".slideshow-container")
    const firstSlide = slidesContainer.firstElementChild
    firstSlide.classList.add("current")

    const slides = document.querySelectorAll(".mySlides")
    const next = document.querySelector("#next")
    const prev = document.querySelector("#prev")
    const auto = true
    const intervalTime = 8000
    let slideInterval

    const nextSlide = () => {
        // Gets the current class
        const current = document.querySelector(".current")
        // removes the current class
        current.classList.remove("current")
        // Check for next slide
        if (current.nextElementSibling) {
            // Add the current class to the next sibling
            current.nextElementSibling.classList.add("current")
        } else {
            // Add current to start
            slides[0].classList.add("current")
        }
        setTimeout(() => current.classList.remove("current"))
    }

    const prevSlide = () => {
        // Gets the current class
        const current = document.querySelector(".current")
        // removes the current class
        current.classList.remove("current")
        // Check for previous slide
        if (current.previousElementSibling) {
            // Add the current class to the previous element sibling
            current.previousElementSibling.classList.add("current")
        } else {
            // Add current to last
            slides[slides.length - 1].classList.add("current")
        }
        setTimeout(() => current.classList.remove("current"))
    }

    // Button Events

    next.addEventListener("click", e => {
        nextSlide()
        if(auto) {
            clearInterval(slideInterval)
            slideInterval = setInterval(nextSlide, intervalTime)
        }
    })
    prev.addEventListener("click", e => {
        prevSlide()
        if(auto) {
            clearInterval(slideInterval)
            slideInterval = setInterval(nextSlide, intervalTime)
        }
    })

    // Automatic sliding functionality

    if(auto) {
        // Run next slide at interval time
        slideInterval = setInterval(nextSlide, intervalTime)
    }

})
// Error handling for JSON data processing
.catch(err => {
    console.log('rejected:', err);
})