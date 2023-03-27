import {html} from '../../node_modules/lit-html/lit-html.js';
import { apply, getApplications, getUserApplications } from '../data/application.js';
import { deleteOffer, getById } from '../data/offers.js';
import { getUserData } from '../util.js';


const detailsTemplete = (offer, onDelete, onApply) => html`
<section id="details">
<div id="details-wrapper">
  <img id="details-img" src="${offer.imageUrl}" alt="example1" />
  <p id="details-title">${offer.title}</p>
  <p id="details-category">
    Category: <span id="categories">${offer.category}
    </p>
  <p id="details-salary">
    Salary: <span id="salary-number">${offer.salary}</span>
  </p>
  <div id="info-wrapper">
    <div id="details-description">
      <h4>Description</h4>
      <span>${offer.description}</span>
    </div>
    <div id="details-requirements">
      <h4>Requirements</h4>
      <span>${offer.requirements}</span>
    </div>
  </div>
  <p>Applications: <strong id="applications">${offer.application}</strong></p>
 
  <!--Edit and Delete are only for creator-->
  ${offer.canEdit || offer.canApply ? html`
  <div id="action-buttons">
  ${offer.canEdit ? html`
  <a href="/catalog/${offer._id}/edit" id="edit-btn">Edit</a>
  <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>` : null}
  ${offer.canApply ? html`
  <a @click=${onApply} href="javascript:void(0)" id="apply-btn">Apply</a>` : null}
 </div>` : null}
  
 </div>
</section>`;

export async function detailsPage(ctx) {
  const id = ctx.params.id;
  
  const request = [
    getById(id),
    getApplications(id)
  ];

  const userData = getUserData();

   if(userData){
    request.push(getUserApplications(id, userData._id));
   }

   const [offer, application, hasApplied] = await Promise.all(request);
   offer.application = application;

    
    if(userData){
      offer.canEdit = userData._id == offer._ownerId;
      offer.canApply = offer.canEdit == false && hasApplied == 0;
    }
       
    ctx.render(detailsTemplete(offer, onDelete,onApply));

    async function onDelete(){
      const choice = confirm('Are you sure?');

      if(choice){
        await deleteOffer(id);
        ctx.page.redirect('/catalog');
      }
    }

    async function onApply() {
      await apply(id);
       ctx.page.redirect('/catalog/' + id)
    }
}