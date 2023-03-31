import { html } from "../../node_modules/lit-html/lit-html.js";
import { editMemes, getMemesById } from "../data/actions.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (meme, onEdit) => html`
<section id="edit-meme">
<form id="edit-form" @submit=${onEdit}>
    <h1>Edit Meme</h1>
    <div class="container">
        <label for="title">Title</label>
        <input id="title" type="text" placeholder="Enter Title" name="title" .value=${meme.title}>
        <label for="description">Description</label>
        <textarea id="description" placeholder="Enter Description" name="description" .value=${meme.description}>
            </textarea>
        <label for="imageUrl">Image Url</label>
        <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${meme.imageUrl}>
        <input type="submit" class="registerbtn button" value="Edit Meme">
    </div>
</form>
</section>
`;

export async function editPage(ctx) {

  const id = ctx.params.id;
  const meme = await getMemesById(id);

  ctx.render(editTemplate(meme, createSubmitHandler(onEdit)));

  async function onEdit({ title, description, imageUrl }) {
    if (title == "" || description == "" || imageUrl == "") {
        document.getElementById('errorBox').style.display = 'inline-block'
        document.querySelector('.notification span').textContent = 'All fields are requared'
        return alert('All fields are requared!')
      
    }
    await editMemes(id, { title, description, imageUrl });
    document.getElementById('errorBox').style.display = 'none'
    ctx.page.redirect(`/details/` + id);
  }
}
