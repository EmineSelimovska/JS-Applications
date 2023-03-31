import {get, post, put, del} from './api.js';
 

export async function getAllAlbums() {
    return get('/data/albums?sortBy=_createdOn%20desc&distinct=name');
}

export async function detailsAlbums(id) {
    return get('/data/albums/' + id);
}

export async function createMusicApp(data) {
    return post('/data/albums', data);
}

export async function editAlbums(id, data) {
    return put(`/data/albums/${id}`, data);
}

export async function deleteAlbums(id) {
    return del('/data/albums/' + id);
}

export async function searchAlbums(query) {
    return get(`/data/albums?where=name%20LIKE%20%22${query}%22`)
}
