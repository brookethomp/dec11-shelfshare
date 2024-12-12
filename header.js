document.addEventListener("DOMContentLoaded", function() {
    var header = document.createElement('header');
    header.innerHTML = `
        <div class="top" id="top">
            <!-- Secondary navigation bar -->
            <div class="secondary-navigation">
                <div style="min-width: 10px;"></div>
                <div class="navbar">
                    <ul>
                        <li>
                            <form action="https://brookethomp.github.io/dec11-shelfshare/public/find.html" id="search"> <!-- May change page name -->
                                <input type="text" placeholder="Search books" name="search">
                                <button type="submit"><i class="fa fa-search"></i></button>
                            </form>
                        </li>
                        <li><a href="https://brookethomp.github.io/dec11-shelfshare/public/subscription.html">Subscriptions</a></li>
                        <li><strong><a href="#" id="loginProfile1">Log In</a></strong></li>
                    </ul>
                </div>
                <div style="min-width: 10px"></div>
            </div>
            <!-- Navigation bar -->
            <div class="header">
                <div style="min-width: 10px;"></div>
                <a href="https://brookethomp.github.io/dec11-shelfshare"><img src="/logo.png" alt="Logo"></a>
                <div></div>
                <div class="navbar">
                    <ul>
                        <li><a href="https://brookethomp.github.io/dec11-shelfshare/public/about.html">About</a></li>
                        <li><a href="https://dec11-shelfshare-d2a5bdd1bfe2.herokuapp.com/map.html">SwapSpots</a></li>
                        <li><a href="https://brookethomp.github.io/dec11-shelfshare/public/faq.html">FAQ</a></li>
                        <li><a href="https://brookethomp.github.io/dec11-shelfshare/public/contact.html">Contact</a></li>
                    </ul>
                </div>
                <div class="hamburger"> <!-- Hamburger menu -->
                    <a href="javascript:void(0);" class="icon" onclick="toggle()">
                            <i class="fa fa-bars"></i>
                    </a>
                </div>
                <div style="min-width: 10px"></div>
            </div>
            
            <!-- Expandable menu -->
            <div class="menu" id="menu">
                <a href="https://brookethomp.github.io/dec11-shelfshare/public/about.html">About</a>
                <br>
                <a href="https://dec11-shelfshare-d2a5bdd1bfe2.herokuapp.com/map.html">SwapSpots</a>
                <br>
                <a href="https://brookethomp.github.io/dec11-shelfshare/public/faq.html">FAQ</a>
                <br>
                <a href="https://brookethomp.github.io/dec11-shelfshare/public/contact.html">Contact</a>
                <br>
                <a href="https://brookethomp.github.io/dec11-shelfshare/public/subscription.html">Subscriptions</a>
                <br>
                <a href="#" id="loginProfile2"></a>
                <br>
                <form action="https://brookethomp.github.io/dec11-shelfshare/public/find.html" id="search"> <!-- May change page name -->
                    <input type="text" placeholder="Search books" name="search">
                    <button type="submit"><i class="fa fa-search"></i></button>
                </form>
            </div>
        </div>

        <!-- Space under navigation bar -->
        <div class="blank-space"></div>
    `;
    document.body.insertBefore(header, document.body.firstChild);
});

document.addEventListener("DOMContentLoaded", function() {
    // Show or hide search bar, depending on page
    var page = window.location.pathname;
    var search = document.getElementById("search");
    if (page === "/dec11-shelfshare/public/find.html" || page === "/dec11-shelfshare/public/swap.html") { // May change page names
        search.style.visibility = "hidden";
    }
    else {
        search.style.visibility = "visible";
    }

    // Check if user is logged in
    if (!currentUser) {
        document.getElementById('loginProfile1').innerText = "Log In";
        document.getElementById('loginProfile1').href = "https://dec11-shelfshare-d2a5bdd1bfe2.herokuapp.com/login.html";
        document.getElementById('loginProfile2').innerText = "Log In";
        document.getElementById('loginProfile2').href = "https://dec11-shelfshare-d2a5bdd1bfe2.herokuapp.com/login.html";
    }
    else { 
        document.getElementById('loginProfile1').innerText = "Profile";
        document.getElementById('loginProfile1').href = "https://dec11-shelfshare-d2a5bdd1bfe2.herokuapp.com/my-profile.html";
        document.getElementById('loginProfile2').innerText = "Profile";
        document.getElementById('loginProfile2').href = "https://dec11-shelfshare-d2a5bdd1bfe2.herokuapp.com/my-profile.html";
    }
});

// Expand or collapse hamburger menu
function toggle() {
    var menu = document.getElementById("menu");
    var top = document.getElementById("top");
    if (menu.className === "menu") {
        menu.className += " responsive";
        top.className += " responsive";
    }
    else {
        menu.className = "menu";
        top.className = "top";
    }
};
