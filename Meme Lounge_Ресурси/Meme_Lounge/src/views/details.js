import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteMemes, getMemesById } from "../data/actions.js";
import { getUserData } from "../util.js";

const detailsTemplate = (meme, onDetele) => html` <section id="meme-details">
  <h1>Meme Title: ${meme.title}</h1>
  <div class="meme-details">
    <div class="meme-img">
      <img alt="meme-alt" src="${meme.imageUrl}" />
    </div>
    <div class="meme-description">
      <h2>Meme Description</h2>
      <p>
       ${meme.description}
      </p>
      ${meme.isOwner ? html`<a class="button warning" href="/edit/${meme._id}">Edit</a>
      <button @click=${onDetele} href="javascript:void(0)" class="button danger" >Delete</button>` : null}
    </div>
  </div>
</section>`;


export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const meme = await getMemesById(id);
    const userData = getUserData();
    if(userData){
        meme.isOwner = meme._ownerId == userData._id;
    }
    ctx.render(detailsTemplate(meme, onDetele));

    async function onDetele(e) {
      e.preventDefault();
        const choice = confirm('Are you sure?');
        if(choice){
          await  deleteMemes(id);
            ctx.page.redirect('/catalog');
        }
    }
    
}


