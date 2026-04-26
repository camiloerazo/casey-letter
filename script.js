
const letterText = `
25/04/2026

Im truly an idiot Casey, i hope you can forgive me.

Im really sorry for what i said and i dont write this for you to act normal again towards me, i respect your decitions and your feelings.
I acknolledge my mistake. I want to apologize; whether we stay close or not, im perfectly fine and okay with any of your decitions and choices.

You are not that awful word i said, that was just wrath and anger, pls forgive me, i didnt have the certanty or knowledge to
call you the words that i called you, it was really disrespectuful and i take it back and will asume any consecuense it can carry.

I felt good seeing your last ig story about u wanting to maybe start communicatin science and teaching, and i felt
that maybe i helped planting a good seed for your goals towards future.

I hope that with or without me you remember the times we had and the time we shared togueter, becouse im really
happy that i met you. And again, sorry for being such a stupid and disgusting person. Farewell Mei Mei, it was awesome
to have met you in this life.


----last letter----



Hi Casey!, its Cami here!.
I made this website for u to never feel lonely :) i hope it helps, i know we are both finding our ways and that we both are gonna make it :) there are no doubts.
I wish u find a great job :) your relationships are awesome and fullfilling, that u have good luck moving to another house :) that u have good time togueter with your partner.
U know I will be foucusing on my work, my university and my life :) but as u did that great letter to me, im doing this to you in the only way i know :) coding!

I hope u never feel lonely, and if u do, and if it helps :) remeber the great times we had!! u have a friend in me and as iven doing, i will pray for you to find the way to happines and 
fullfilment in your journey. 
Stay tunned to this website, who knows when it can change hehe. 

With love, your friend Cami :)
PD: i put u kitty pictures too! hope u like them!!
Scroll down!!!
My fav is the last one hehe!!
bye bye <3 :) xoxo !!`;

// =================================
// CONFIGURATION
// =================================
const typingSpeed = 121; // milliseconds per character (lower = faster, recommended: 60-100)
const scrollToImageDuration = 3000; // milliseconds to scroll to first image (recommended: 2000-4000)

// List your image filenames here (place images in the 'images' folder)
const imageFiles = [
    'im1.jpg',
    'im2.jpg',
    'im3.jpg',
    'im4.jpg',
    // Add more images as needed
];

// Get elements
const letterElement = document.getElementById('letter-text');
const cursor = document.querySelector('.cursor');

let charIndex = 0;

function typeWriter() {
    if (charIndex < letterText.length) {
        letterElement.textContent += letterText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, typingSpeed);
    } else {
        // Optional: hide cursor when typing is complete
        // cursor.classList.add('hide');

        // Show images after typing completes
        setTimeout(showImages, 1000);
    }
}

// =================================
// IMAGE GALLERY SYSTEM
// =================================
function showImages() {
    const imagesContainer = document.getElementById('images-container');

    // Generate image sections dynamically
    imageFiles.forEach((filename, index) => {
        const imageSection = document.createElement('div');
        imageSection.className = 'image-section';
        imageSection.innerHTML = `<img src="images/${filename}" alt="Image ${index + 1}">`;
        imagesContainer.appendChild(imageSection);
    });

    // Reveal the images container
    imagesContainer.style.display = 'block';

    // Set up scroll-based fade effects
    setupScrollFade();

    // Auto-scroll to first image after a brief pause
    setTimeout(() => {
        const firstImage = document.querySelector('.image-section');
        if (firstImage) {
            smoothScrollTo(firstImage.offsetTop, scrollToImageDuration);
        }
    }, 1500);
}

function setupScrollFade() {
    const imageSections = document.querySelectorAll('.image-section');

    window.addEventListener('scroll', () => {
        imageSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate opacity based on position in viewport
            let opacity = 1;

            // Fade out when scrolling past (top of section goes above viewport)
            if (rect.top < 0) {
                opacity = Math.max(0, 1 + (rect.top / windowHeight));
            }

            // Fade in when entering from bottom
            if (rect.bottom > windowHeight) {
                const distanceFromBottom = rect.bottom - windowHeight;
                opacity = Math.max(0, 1 - (distanceFromBottom / windowHeight));
            }

            section.style.opacity = opacity;
        });
    });
}

// Custom smooth scroll function with configurable duration
function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        // Easing function (ease-in-out)
        const easing = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        window.scrollTo(0, startPosition + distance * easing);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

// =================================
// AUDIO CONTROLS
// =================================
const audio = document.getElementById('background-music');
const muteBtn = document.getElementById('mute-btn');
const volumeSlider = document.getElementById('volume-slider');

// Set initial volume
audio.volume = 0.5; // 50%

// Mute/unmute toggle
muteBtn.addEventListener('click', () => {
    if (audio.muted) {
        audio.muted = false;
        muteBtn.textContent = '🔊';
    } else {
        audio.muted = true;
        muteBtn.textContent = '🔇';
    }
});

// Volume slider control
volumeSlider.addEventListener('input', (e) => {
    const volume = e.target.value / 100;
    audio.volume = volume;

    // Update mute button icon based on volume
    if (volume === 0) {
        muteBtn.textContent = '🔇';
    } else {
        muteBtn.textContent = '🔊';
    }
});

// Auto-play music when page loads (with user interaction)
window.addEventListener('click', () => {
    if (audio.paused) {
        audio.play().catch(err => console.log('Audio play failed:', err));
    }
}, { once: true });

// Start typing when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500); // small delay before starting
});
