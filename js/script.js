// Theme Toggle Script
const toggleButton = document.getElementById('theme-toggle');
const themeLink = document.getElementById('theme-link');

// Initialize theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    themeLink.href = 'css/style-light.css';
    toggleButton.textContent = '🌑'; // Moon icon
} else {
    themeLink.href = 'css/style.css';
    toggleButton.textContent = '🌗'; // Sun/Moon icon
}

// Toggle theme on button click
toggleButton.addEventListener('click', () => {
    const currentTheme = themeLink.getAttribute('href');
    
    if (currentTheme.includes('style.css') && !currentTheme.includes('style-light.css')) {
        // Switch to light
        themeLink.href = 'css/style-light.css';
        toggleButton.textContent = '🌑';
        localStorage.setItem('theme', 'light');
    } else {
        // Switch to dark
        themeLink.href = 'css/style.css';
        toggleButton.textContent = '🌗';
        localStorage.setItem('theme', 'dark');
    }
});
