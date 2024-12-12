document.addEventListener("DOMContentLoaded", function () {
    const header = document.createElement('header');
    header.innerHTML = `
        <div class="top" id="top">
            <!-- Secondary navigation bar -->
            <div class="secondary-navigation">
                <div style="min-width: 10px;"></div>
                <div class="navbar">
                    <ul>
                        <li>
                            <form action="https://dec11-shelfshare-d2a5bdd1bfe2.herokuapp.com/find.html" id="search1"> 
                                <input type="text" placeholder="Search books" name="search">
                                <button type="submit"><i class="fa fa-search"></i></button>
                            </form>
                        </li>
                        <li><a href="https://dec11-shelfshare-d2a5bdd1bfe2.herokuapp.com/subscription.html">Subscriptions</a></li>
                        <li><strong><a href="#" id="loginProfile">Log In</a></strong></li>
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
                <div class="hamburger">
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
                <a href="#" id="loginProfileMenu"></a>
                <br>
                <form action="https://dec11-shelfshare-d2a5bdd1bfe2.herokuapp.com/find.html" id="search2">
                    <input type="text" placeholder="Search books" name="search">
                    <button type="submit"><i class="fa fa-search"></i></button>
                </form>
            </div>
        </div>

        <div class="blank-space"></div>
    `;

    document.body.insertBefore(header, document.body.firstChild);

    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const loginProfile = document.getElementById('loginProfile');
    const loginProfileMenu = document.getElementById('loginProfileMenu');

    if (currentUser) {
        loginProfile.innerText = "Profile";
        loginProfile.href = "https://dec11-shelfshare-d2a5bdd1bfe2.herokuapp.com/my-profile.html";
        loginProfileMenu.innerText = "Profile";
        loginProfileMenu.href = "https://dec11-shelfshare-d2a5bdd1bfe2.herokuapp.com/my-profile.html";
    } else {
        loginProfile.innerText = "Log In";
        loginProfile.href = "https://dec11-shelfshare-d2a5bdd1bfe2.herokuapp.com/login.html";
        loginProfileMenu.innerText = "Log In";
        loginProfileMenu.href = "https://dec11-shelfshare-d2a5bdd1bfe2.herokuapp.com/login.html";
    }
});

function toggle() {
    const menu = document.getElementById("menu");
    const top = document.getElementById("top");
    if (menu.className === "menu") {
        menu.className += " responsive";
        top.className += " responsive";
    } else {
        menu.className = "menu";
        top.className = "top";
    }
}
