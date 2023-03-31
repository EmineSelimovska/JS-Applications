import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllMemes } from "../data/actions.js";

const catalogTemplate = (meme) => html` <section id="meme-feed">
  <h1>All Memes</h1>
  ${
   meme.length > 0 ? html` <div id="memes">
   ${meme.map(allMeme)}
   </div>` : html`<p class="no-memes">No memes in database.</p>`
  }
  </div>
  </section>`;

const allMeme = (memes) => html`
<div class="meme">
<div class="card">
  <div class="info">
    <p class="meme-title">${memes.title}</p>
    <img class="meme-image" alt="meme-img" src="${memes.imageUrl}" />
  </div>
  <div id="data-buttons">
    <a class="button" href="/details/${memes._id}">Details</a>
  </div>
</div>
</div>
`
export async function catalogPage(ctx) {
    const memes = await getAllMemes();
    ctx.render(catalogTemplate(memes));
    
}
