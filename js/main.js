/*
Project:    Project5 - Personal Web Site
Name:       Mitchel Bigler
Submitted:  8/2/24

Disclaimer:
    I declare that the following source code was written by me, or provided
    by the instructor for this project. I understand that copying source
    code from any other source, providing source code to another student, 
    or leaving my code on a public web site constitutes cheating.
    I acknowledge that  If I am found in violation of this policy this may result
    in a zero grade, a permanent record on file and possibly immediate failure of the class.
 
Changes:
    -- Managed drop down nav resizing in JS to keep it from disapearing forever after hide
    -- Added touchstart event to fix mobile click functionality
    -- Wrapped everything within the DOMContentLoaded
    -- Added lots of comments
*/


document.addEventListener('DOMContentLoaded', function() {

    /* ----NAV BAR DROP DOWN---- */

    // Get all variables
    const menu = document.querySelector('nav ul');
    const bars = document.getElementById('bars');
    var themeLink = document.getElementById("theme-sheet");
    var logo = document.getElementById("logo");

    // Set drop down orientation when it's just bars
    function dropDownNav() {
        if (menu.style.display === 'none' || menu.style.display === '') {
            menu.style.display = 'flex';
            menu.style.flexDirection = 'column';
        } else {
            menu.style.display = 'none';
        }
    }

    // Event listeners for bars. Touchstart for mobile tap
    bars.addEventListener('click', dropDownNav);
    bars.addEventListener('touchstart', dropDownNav);

    // Check size and theme to display nav bar
    function handleResize() {
        if (themeLink.disabled && window.innerWidth >= 1300) {
            menu.style.display = 'flex';
            menu.style.flexDirection = 'row';
        } else if (!themeLink.disabled && window.innerWidth >= 1050) {
            menu.style.display = 'flex';
            menu.style.flexDirection = 'column';
        } else {
            menu.style.display = 'none';
        }
    }

    // Event listener for resize
    window.addEventListener('resize', handleResize);

    // Run on start
    handleResize();

    // Change logo for light / dark mode
    function toggleTheme() {
        if (themeLink.disabled) {
            themeLink.disabled = false;
            logo.src = "img/logo_light.svg";
        } else {
            themeLink.disabled = true;
            logo.src = "img/logo.svg";
        }

        // Run to fix orientation on toggle
        handleResize();
    }



    /* ----PAGE SWITCHING---- */

    // Event listener for theme toggle
    document.querySelector('.theme-toggle').addEventListener('click', toggleTheme);

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
                if (themeLink.disabled || window.innerWidth < 1050) {
                // Hide nav bar
                menu.style.display = 'none';
                }
            });
        });
});