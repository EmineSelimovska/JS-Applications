import {get,post,put,del} from './api.js';

export async function getAllAlbums() {
    return get('/data/albums?sortBy=_createdOn%20desc');
}

export async function createAlbums(data) {
    return post('/data/albums', data);
}

export async function viewAlbums(id) {
    return get(`/data/albums/${id}`);
}

export async function getLikeById(albumId) {
    return get(`/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`);
}


export async function getMyLikeById(albumId,userId) {
    return get(`/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

export async function addLikes(id) {
    return post(`/data/likes`, {id});
}

export async function deleteAlbum(id) {
    return del(`/data/albums/${id}`)
    
}

export async function editAlbum(id,data) {
    return put(`/data/albums/` + id ,data)
    
}
