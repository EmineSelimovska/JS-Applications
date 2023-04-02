import { html } from "../../node_modules/lit-html/lit-html.js";
import { searchFruit } from "../data/actions.js";

const searchTemplate = (onSearch) => html`
<section id="search">
  <div class="form">
    <h2>Search</h2>
    <form @submit= ${onSearch} class="search-form">
      <input type="text" name="search" id="search-input" />
      <button class="button-list">Search</button>
    </form>
  </div>
  <h4>Results:</h4>
`

const resultTemplape = (onSearch, search) => html` <section id="search">
  <div class="form">
    <h2>Search</h2>
    <form @submit= ${onSearch} class="search-form">
      <input type="text" name="search" id="search-input" />
      <button class="button-list">Search</button>
    </form>
  </div>
  <h4>Results:</h4>

  ${search.length > 0 ? html`<div class="search-result">
  ${search.map(s => html` 
  <!--If there are matches display a div with information about every fruit-->
  <div class="fruit">
    <img src="${s.imageUrl}" />
    <h3 class="title">${s.name}</h3>
    <p class="description">
    ${s.description}
    </p>
    <a class="details-btn" href="/details/${s._id}">More Info</a>
  </div>
</div>`)}` : html`<p class="no-result">No result.</p>`}
  </section>`;

  export async function searchPage(ctx) {
    ctx.render(searchTemplate(onSearch));

    async function onSearch(e) {
        e.preventDefault();
        const input = document.getElementById('search-input');
        const search = await searchFruit(input.value);
        ctx.render(resultTemplape(onSearch,search));
    } 
    
  }
