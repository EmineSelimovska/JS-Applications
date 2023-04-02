import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteFruit, getById } from "../data/actions.js";
import { getUserData } from "../util.js";

const detailsTempale = (fruit, onDelete) => html`
  <section id="details">
    <div id="details-wrapper">
      <img id="details-img" src="${fruit.imageUrl}" alt="example1" />
      <p id="details-title">${fruit.name}</p>
      <div id="info-wrapper">
        <div id="details-description">
          <p>
           ${fruit.description}
          </p>
          <p id="nutrition">Nutrition</p>
          <p id="details-nutrition">
           ${fruit.nutrition}
          </p>
        </div>

        <!--Edit and Delete are only for creator-->
        ${fruit.isOwner ? html`
        <div id="action-buttons">
        <a href="/catalog/${fruit._id}/edit" id="edit-btn">Edit</a>
        <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
      </div>` : null}
        
      </div>
    </div>
  </section>
`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const userData = getUserData();
    const fruit = await getById(id)

    if(userData){
        fruit.isOwner = fruit._ownerId === userData._id
    }
    ctx.render(detailsTempale(fruit,onDelete));

    async function onDelete(e) {
        e.preventDefault();
        const choice = confirm('Are you sure?');
        if(choice){
            await deleteFruit(id);
            ctx.page.redirect('/catalog')
        }
    }
}
