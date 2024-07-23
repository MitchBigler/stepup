/* 
-----------------
Show/Hide Pages
-----------------
*/

// Hide all on start
document.querySelectorAll('section').forEach(section => {
    section.style.display = 'none';
});

// Show home & all on start
document.querySelectorAll('section').forEach(section => {
    section.style.display = 'block';
});
document.getElementById('home').style.display = 'flex';


document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const sectionId = this.getAttribute('data-section');

        if (sectionId === 'home') {
            // Show all if 'home' is clicked
            document.querySelectorAll('section').forEach(section => {
                section.style.display = 'block';
            });

            document.getElementById('home').style.display = 'flex';
        } else {
            // Hide all
            document.querySelectorAll('section').forEach(section => {
                section.style.display = 'none';
            });

            // Show the target section
            document.getElementById(sectionId).style.display = 'block';
        }
    });
});


/* 
-----------------
Nav bar drop down 
-----------------
*/
function dropDownNav() {

    // Get menu
    let menu = document.querySelector("nav ul");

    // Show menu
    if (menu.style.display === "none" || menu.style.display === "") {
        menu.style.display = "flex";
        console.log("show");
    }
    // Hide menu if showing
    else {
        menu.style.display = "none";
        console.log("hide");
    }
}


/* 
-----------------
Change Theme
-----------------
*/

// Get link
var themeLink = document.getElementById("theme-sheet");
var logo = document.getElementById("logo");

themeLink.disabled = true;

function toggleTheme() {
    // Turn theme on
    if (themeLink.disabled) {
        themeLink.disabled = false;
        logo.src = "img/logo_light.svg"
    }
    // Turn theme off
    else {
        themeLink.disabled = true;
        logo.src = "img/logo.svg"

    }
}