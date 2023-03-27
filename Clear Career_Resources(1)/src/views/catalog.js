import {html} from '../../node_modules/lit-html/lit-html.js';
import { getAllOffers } from '../data/offers.js';


const catalogTemplete = (offers) => 
html`<section id="dashboard">
<h1>Job Offers</h1>
${offers.length > 0 ? offers.map(offerCard) : html`
<h1>No offers yet.</h1>`}
</section>`;

const offerCard = (offer) => html`<div class="offer">
<img src="${offer.imageUrl}" alt="example1" />
<p><strong>Title: </strong><span class="title">${offer.title}</span></p>
<p><strong>Salary:</strong><span class="salary">${offer.salary}</span></p>
<a class="details-btn" href="/catalog/${offer._id}">Details</a>
</div>`;

export async function catalogPage(ctx) {
    const offers = await getAllOffers()
    ctx.render(catalogTemplete(offers));
}