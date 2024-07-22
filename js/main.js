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

    let menu = document.querySelector("nav ul");
    if (menu.style.display === "none" || menu.style.display === "") {
        menu.style.display = "flex";
        console.log("show");
    } else {
        menu.style.display = "none";
        console.log("hide");
    }
}