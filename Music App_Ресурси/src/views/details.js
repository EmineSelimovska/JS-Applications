import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteAlbums, detailsAlbums } from "../data/actions.js";
import { getUserData } from "../util.js";

const detailsTemplate = (albums, onDelete) => html`
<section id="detailsPage">
<div class="wrapper">
    <div class="albumCover">
        <img src="${albums.imgUrl}">
    </div>
    <div class="albumInfo">
        <div class="albumText">

            <h1>Name: ${albums.name}</h1>
            <h3>Artist: ${albums.artist}</h3>
            <h4>Genre: ${albums.genre}</h4>
            <h4>Price: $${albums.price}</h4>
            <h4>Date: ${albums.releaseDate}</h4>
            <p>Description: ${albums.description}</p>
        </div>

        <!-- Only for registered user and creator of the album-->
         ${albums.isOwner ? html`<div class="actionBtn">
         <a href="/catalog/${albums._id}/edit" class="edit">Edit</a>
         <a  @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
     </div>`: null}
        
    </div>
</div>
</section>
`
export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const userData = getUserData();
    const albums = await detailsAlbums(id);

    if(userData){
        albums.isOwner = albums._ownerId === userData._id;
    }
    ctx.render(detailsTemplate(albums, onDelete));

    async function onDelete(e) {
        e.preventDefault()
        const choice = confirm('Are you sure?');
        if(choice){
            await deleteAlbums(id);
            ctx.page.redirect('/catalog')
        }
    }
}