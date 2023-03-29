import { html } from "../../node_modules/lit-html/lit-html.js";
import { addLikes, deleteAlbum, getLikeById, getMyLikeById, viewAlbums } from "../data/servisas.js";
import { getUserData } from "../util.js";

const detailsTemplate = (albums, onDelete,onLike,likes, isOwner, userId,showLikesBtn) => html`
  <section id="details">
    <div id="details-wrapper">
      <p id="details-title">Album Details</p>
      <div id="img-wrapper">
        <img src="${albums.imageUrl}" alt="example1" />
      </div>
      <div id="info-wrapper">
        <p><strong>Band:</strong><span id="details-singer">${albums.singer}</span></p>
        <p>
          <strong>Album name:</strong
          ><span id="details-album">${albums.album}</span>
        </p>
        <p>
          <strong>Release date:</strong><span id="details-release">${albums.release}</span>
        </p>
        <p><strong>Label:</strong><span id="details-label">${albums.label}</span></p>
        <p>
          <strong>Sales:</strong
          ><span id="details-sales">${albums.sales}</span>
        </p>
      </div>
      <div id="likes">Likes: <span id="likes-count">${likes}</span></div>

      <!--Edit and Delete are only for creator-->
      <div id="action-buttons">
      ${albumControl(albums, isOwner, onDelete)}
       ${likeControl(showLikesBtn, onLike)}

      </div>
    </div>
  </section>
`;
const albumControl = (albums, isOwner, onDelete) => {
    if(isOwner){
     return   html`
        <a href="/edit/${albums._id}" id="edit-btn">Edit</a>
        <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
        `
    }else{
        null
    }
}

const likeControl = (showLikesBtn, onLike) => {
   if(showLikesBtn){
    return html`
   
    <a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>`
   }else{
    return null;
   }
}



export async function detailsPage(ctx){
    const id = ctx.params.id;
    const albums = await viewAlbums(id);
    const userId = getUserData()?._id;
    const isOwner = albums._ownerId === userId;
     const likes = await getLikeById(id);
     const myLikes = await getMyLikeById(id,userId);
     const showLikesBtn = !isOwner && !myLikes && userId;

    ctx.render(detailsTemplate(albums, onDelete,onLike,likes, isOwner, userId,showLikesBtn));

    async function onDelete() {
        const confirned = confirm('Are you sure?');
        if(confirned){
            await deleteAlbum(id);
            ctx.page.redirect('/catalog');
        }
    }
    async function onLike() {
        await addLikes(id);
        ctx.page.redirect(`/catalog/` + id);
    }
}
