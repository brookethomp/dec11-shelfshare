document.addEventListener('DOMContentLoaded', function() {
    const headerContainer = document.createElement('header');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        // User is logged in
        headerContainer.innerHTML = `
            <nav>
                <div class="logo">
                    <a href="index.html">ShelfShare</a>
                </div>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="map.html">Map</a></li>
                    <li><a href="my-profile.html">Profile</a></li>
                    <li><a href="#" id="logout-link">Log Out</a></li>
                </ul>
                <div class="hamburger">
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                </div>
            </nav>
        `;

        // Add logout functionality
        headerContainer.querySelector('#logout-link').addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        });
    } else {
        // User is not logged in
        headerContainer.innerHTML = `
            <nav>
                <div class="logo">
                    <a href="index.html">ShelfShare</a>
                </div>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="map.html">Map</a></li>
                    <li><a href="login.html">Login</a></li>
                </ul>
                <div class="hamburger">
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                </div>
            </nav>
        `;
    }

    // Replace the existing header
    document.body.insertBefore(headerContainer, document.body.firstChild);

    // Hamburger menu functionality
    const hamburger = headerContainer.querySelector('.hamburger');
    const navUl = headerContainer.querySelector('ul');

    hamburger.addEventListener('click', () => {
        navUl.classList.toggle('show');
    });
});
