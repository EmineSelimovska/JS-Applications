import { html } from "../../node_modules/lit-html/lit-html.js";
import { searchAlbums } from "../data/actions.js";
import { getUserData } from "../util.js";

const searchTemplate = (onSearch) => html`
<section id="searchPage">
<h1>Search by Name</h1>

<div class="search">
    <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
    <button class="button-list" @click=${onSearch}>Search</button>
</div>

<h2>Results:</h2>`


const resultTemplate = (onSearch,search,userData) => html`
<section id="searchPage">
<h1>Search by Name</h1>

<div class="search">
    <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
    <button class="button-list" @click=${onSearch} >Search</button>
</div>

<h2>Results:</h2>

<!--Show after click Search button-->
${search.length > 0 ? html`
<div class="search-result">
${search.map(s => html`

<div class="card-box">
    <img src="${s.imgUrl}">
    <div>
        <div class="text-center">
            <p class="name">Name: ${s.name}</p>
            <p class="artist">Artist: ${s.artist}</p>
            <p class="genre">Genre: ${s.genre}</p>
            <p class="price">Price: $${s.price}</p>
            <p class="date">Release Date: ${s.releaseDate}</p>
        </div>
        ${userData ? html `
        <div class="btn-group">
            <a href="/details/${s._id}" id="details">Details</a>
        </div>
        ` : null}
    </div>
</div>`)}` 
: html` <p class="no-result">No result.</p>`}  
</div>
</section>`


export async function searchPage(ctx) {
    const userData = getUserData();
    ctx.render(searchTemplate(onSearch));

    async function onSearch(e) {
        e.preventDefault();
        const input = document.getElementById('search-input');
       const search = await searchAlbums(input.value);
       ctx.render(resultTemplate(onSearch,search,userData));
    }
}