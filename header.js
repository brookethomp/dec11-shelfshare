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
                            <form action="https://dec11-shelfshare-d2a5bdd1bfe2.herokuapp.com/find.html" id="search1"> <!-- May change page name -->
                                <input type="text" placeholder="Search books" name="search">
                                <button type="submit"><i class="fa fa-search"></i></button>
                            </form>
                        </li>
                        <li><a href="https://dec11-shelfshare-d2a5bdd1bfe2.herokuapp.com/subscription.html">Subscriptions</a></li>
                        <li><strong><a href="https://dec11-shelfshare-d2a5bdd1bfe2.herokuapp.com/login.html" id="loginProfile1">Log In</a></strong></li>
                    </ul>
                </div>
                <div style="min-width: 10px"></div>
            </div>
            <!-- Navigation bar -->
            <div class="header">
                <div style="min-width: 10px;"></div>
                <a href="https://dec11-shelfshare-d2a5bdd1bfe2.herokuapp.com/home.html"><img src="/logo.png" alt="Logo"></a>
                <div></div>
                <div class="navbar">
                    <ul>
                        <li><a href="https://dec11-shelfshare-d2a5bdd1bfe2.herokuapp.com/about.html">About</a></li>
                        <li><a href="https://dec11-shelfshare-d2a5bdd1bfe2.herokuapp.com/map.html">SwapSpots</a></li>
                        <li><a href="https://dec11-shelfshare-d2a5bdd1bfe2.herokuapp.com/faq.html">FAQ</a></li>
                        <li><a href="https://dec11-shelfshare-d2a5bdd1bfe2.herokuapp.com/contact.html">Contact</a></li>
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
                <a href="https://dec11-shelfshare-d2a5bdd1bfe2.herokuapp.com/about.html">About</a>
                <br>
                <a href="https://dec11-shelfshare-d2a5bdd1bfe2.herokuapp.com/map.html">SwapSpots</a>
                <br>
                <a href="https://dec11-shelfshare-d2a5bdd1bfe2.herokuapp.com/faq.html">FAQ</a>
                <br>
                <a href="https://dec11-shelfshare-d2a5bdd1bfe2.herokuapp.com/contact.html">Contact</a>
                <br>
                <a href="https://dec11-shelfshare-d2a5bdd1bfe2.herokuapp.com/subscription.html">Subscriptions</a>
                <br>
                <a href="https://dec11-shelfshare-d2a5bdd1bfe2.herokuapp.com/login.html" id="loginProfile2"></a>
                <br>
                <form action="https://dec11-shelfshare-d2a5bdd1bfe2.herokuapp.com/find.html" id="search2"> <!-- May change page name -->
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
    var search = document.getElementById("search1");
    if (page === "/dec11-shelfshare/public/find.html" || page === "/dec11-shelfshare/public/swap.html") { // May change page names
        search1.style.visibility = "hidden";
    }
    else {
        search1.style.visibility = "visible";
    }

    // Check if user is logged in
    if (!currentUser) {
        document.getElementById('loginProfile1').innerText = "Log In";
        document.getElementById('loginProfile2').innerText = "Log In";
    }
    else { 
        document.getElementById('loginProfile1').innerText = "Profile";
        document.getElementById('loginProfile2').innerText = "Profile";
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
