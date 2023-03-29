import { html } from "../../node_modules/lit-html/lit-html.js";

//../../node_modules/lit-html/lit-html.js

// TODO Replace with actual layout
export const layoutTemplate = (userData, content) => html` <header>
    <!-- Navigation -->
    <a id="logo" href="/"
    ><img id="logo-img" src="./images/logo.png" alt="" /></a>
       <nav>
      <div>
        <a href="/catalog">Dashboard</a>
        ${
            !userData ? html`
            <div class="guest">
              <a href="/login">Login</a>
              <a href="/register">Register</a>
            </div>
          </nav>
        `: html` </div>
         <div class="user">
          <a href="/create">Add Album</a>
          <a href="/logout">Logout</a>
        </div>`
        }
  </header>;
 <main>${content}</main>`;
