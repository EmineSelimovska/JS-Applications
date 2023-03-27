// [x] inprove HTML structure
// [x] create app.js module
// [x] create util.js containing hide and display of view
// [x] placeholder for all view
// implement views
// - create request logic
// - DOM manipulation logic


import { homePage } from "./home.js";
import { loginPage } from "./login.js";
import { registerPage } from "./register.js";
import { createPage } from "./create.js";
import { updateNav } from "./util.js";


// [x] catalog
// [x] login
// [ ] register 
// [ ] create
// [ ] details 
// [ ] like
// [ ] edit 
// [ ] delete

//showView('#home-page');

const routes = {
    '/': homePage,
    '/login': loginPage,
    '/logout': logoutPage,
    '/register': registerPage,
    '/create': createPage,

    
    

}

document.querySelector('nav').addEventListener('click', onNavigation);
document.querySelector('#add-movie-button a').addEventListener('click', onNavigation);


function onNavigation(e) {
    if(e.target.tagName == 'A' && e.target.href){
        e.preventDefault();
        const url = new URL(e.target.href);

        const view = routes[url.pathname];
      if(typeof view == 'function'){
        view();
      }
    }
}

function logoutPage() {
 localStorage.removeItem('user');
 updateNav();
    
}

//Start application in catalog view
updateNav();
homePage();



