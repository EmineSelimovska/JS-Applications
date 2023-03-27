import * as api from './api.js';

const endpoinds = {
    'ideas': '/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc',
    'ideaById': '/data/ideas/',
    'create': '/data/ideas',
    
}

export async function getAllIdeas() {

    return api.get(endpoinds.ideas);
}
export async function getById(id) {
    return api.get(endpoinds.ideaById + id);
    
}

export async function createIdea(ideaData) {
    return api.post(endpoinds.create, ideaData)

    
}

export async function deleteById(id) {
    return api.delete(endpoinds.ideaById + id);

    
}