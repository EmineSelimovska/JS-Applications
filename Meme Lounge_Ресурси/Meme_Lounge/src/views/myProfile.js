import { html } from "../../node_modules/lit-html/lit-html.js";
import { userProfil } from "../data/actions.js";
import { getUserData } from "../util.js";

const profileTemplate = (meme,userData) => html`
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src="/images/${userData.gender}.png">
        <div class="user-content">
            <p>Username: ${userData.username}</p>
            <p>Email: ${userData.email}</p>
            <p>My memes count: ${meme.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
        ${meme.length > 0 ?  html`
       ${meme.map(memes => html`
        <div class="user-meme">
        <p class="user-meme-title">${memes.title}</p>
        <img class="userProfileImage" alt="meme-img" src="${memes.imageUrl}">
        <a class="button" href="/details/${memes._id}">Details </a>
         </div>`)}
         ` : html`
         <p class="no-memes">No memes in database.</p>
           `}
    </div>
</section>`;





export async function  profilPage (ctx) {
   
    const userdata = getUserData();
    const memes = await userProfil(userdata._id);
    ctx.render(profileTemplate(memes, userdata))
}