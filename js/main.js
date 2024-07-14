document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const sectionId = this.getAttribute('data-section');

        if (sectionId === 'home') {
            document.querySelectorAll('section').forEach(section => {
                section.style.display = 'block';
            })
            
            document.getElementById('home').style.display = 'flex';
        } else {
            document.querySelectorAll('section').forEach(section => {
                section.style.display = 'none';
            });

            document.getElementById(sectionId).style.display = 'block';
        }
    });
});

document.querySelectorAll('section').forEach(section => {
    section.style.display = 'none';
});
document.getElementById('home').style.display = 'flex';
