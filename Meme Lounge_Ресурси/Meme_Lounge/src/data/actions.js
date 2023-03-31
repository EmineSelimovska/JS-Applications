import{get,post,put,del} from './api.js'

export async function getAllMemes() {
    return get('/data/memes?sortBy=_createdOn%20desc');
}

export async function createMemes(data) {
    return post('/data/memes', data);
}

export async function userProfil(userId) {
    return get(`/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}


export async function getMemesById(id) {
    return get('/data/memes/' + id);
}

export async function deleteMemes(id) {
    return del('/data/memes/' + id);
}

export async function editMemes(id,data) {
    return put('/data/memes/' + id, data)
    
}