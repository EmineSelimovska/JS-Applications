import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteBook, getBookId, getLikesByBookId, getMyBookId, likesBook } from "../data/servises.js";
import { getUserData } from "../util.js";

const detailsTemplate = (book,userId,isOwner,likes,onDelete,onLike,showLikesButton) => html`
  <section id="details-page" class="details">
    <div class="book-information">
      <h3>${book.title}</h3>
      <p class="type">Type: ${book.type}</p>
      <p class="img"><img src="${book.imageUrl}" /></p>
      <div class="actions">
      ${bookControlsTemplete(book, isOwner, onDelete)}
      ${likeControlsTempleta(showLikesButton, onLike)}
        <div class="likes">
          <img class="hearts" src="/images/heart.png" />
          <span id="total-likes">Likes: ${likes}</span>
        </div>
      </div>
    </div>
    <div class="book-description">
      <h3>Description:</h3>
      <p>
       ${book.description}
      </p>
    </div>
  </section>
`;

const bookControlsTemplete = (book, isOwner, onDelete) => {
    if(isOwner){
        return html`
        <a class="button" href="/edit/${book._id}">Edit</a>
        <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>`;
    }else{
        return null;

    }
}

const likeControlsTempleta = (showLikesButton, onLike) => {
     if(showLikesButton){
        return html`
        <a @click=${onLike} class="button" href="javascript:void(0)">Like</a>`
     }else{
        return null;
     }
}


export async function detailsPage(ctx) {
    const bookId = ctx.params.id;
   const book = await getBookId(bookId);
   const userId = getUserData()?._id;
   const isOwner = book._ownerId === userId;
    const likes = await getLikesByBookId(bookId);
    const myLikes = await getMyBookId(bookId,userId);
   const showLikesButton = !isOwner && !myLikes && userId;
   ctx.render(detailsTemplate(book,userId,isOwner,likes,onDelete,onLike,showLikesButton));

   async function onDelete() {
    const confirned = confirm('Are you sure?');
    if(confirned){
        await deleteBook(bookId);
        ctx.page.redirect('/');
    }
   }
   
   async function onLike() {
      await likesBook(bookId);
      ctx.page.redirect(`/details/${bookId}`)
   }
   
}
