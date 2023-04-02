import {html} from '../../node_modules/lit-html/lit-html.js';
import { getAllFruits } from '../data/actions.js';


const fruitsTemplate = (fruit) => html`
<h2>Fruits</h2>
<section id="dashboard">
 ${fruit.length == 0 ? html`
 <h2>No fruit info yet.</h2>`: html`${fruit.map(f => html`<div class="fruit">
 <img src="${f.imageUrl}" alt="example1" />
 <h3 class="title">${f.name}</h3>
 <p>${f.description}</p>
 <a class="details-btn" href="/details/${f._id}">More Info</a>
</div>`)}`} 
 </section>`

export async function fruitsPage(ctx) {
    
    const fruit = await getAllFruits();
    ctx.render(fruitsTemplate(fruit));
}

