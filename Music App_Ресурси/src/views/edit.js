import { html } from "../../node_modules/lit-html/lit-html.js";
import {detailsAlbums, editAlbums } from "../data/actions.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (albums,onEdit) => html` <section class="editPage">
  <form @submit=${onEdit}>
    <fieldset>
      <legend>Edit Album</legend>

      <div class="container">
        <label for="name" class="vhide">Album name</label>
        <input
          id="name"
          name="name"
          .value=${albums.name}
          class="name"
          type="text"
          value=""
        />

        <label for="imgUrl" class="vhide">Image Url</label>
        <input
          id="imgUrl"
          name="imgUrl"
          .value=${albums.imgUrl}
          class="imgUrl"
          type="text"
          value=""
        />

        <label for="price" class="vhide">Price</label>
        <input
          id="price"
          name="price"
          .value=${albums.price}
          class="price"
          type="text"
          value=""
        />

        <label for="releaseDate" class="vhide">Release date</label>
        <input
          id="releaseDate"
          name="releaseDate"
          .value=${albums.releaseDate}
          class="releaseDate"
          type="text"
          value=""
        />

        <label for="artist" class="vhide">Artist</label>
        <input
          id="artist"
          name="artist"
          .value=${albums.artist}
          class="artist"
          type="text"
          value=""
        />

        <label for="genre" class="vhide">Genre</label>
        <input
          id="genre"
          name="genre"
          .value=${albums.genre}
          class="genre"
          type="text"
          value=""
        />

        <label for="description" class="vhide">Description</label>
        <textarea name="description" .value=${albums.description} class="description" rows="10" cols="10"></textarea>

        <button class="edit-album" type="submit">Edit Album</button>
      </div>
    </fieldset>
  </form>
</section>`;

export async function editPage(ctx) {
    const id = ctx.params.id;
    const albums = await detailsAlbums(id)
    ctx.render(editTemplate(albums, createSubmitHandler(onEdit)));

    async function onEdit({
        name,
        imgUrl,
        price,
        releaseDate,
        artist,
        genre,
        description
      }, form){
       if( name == '' || imgUrl == '' || price == '' || releaseDate == '' ||
            artist == '' || genre == '' ||  description == ''){
                return alert('All fields are requared!');
            }
            await editAlbums(id, { 
                name,
                imgUrl,
                price,
                releaseDate,
                artist,
                genre,
                description});
                form.reset()
                ctx.page.redirect(`/details/` + id);

    }
    
}
