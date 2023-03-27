import { get, post, put, del} from './api.js';

const endpoinds = {
    catalog: '/data/offers?sortBy=_createdOn%20desc',
    byId: '/data/offers/'
}

export async function getAllOffers() {
    return  get(endpoinds.catalog);
    
}

export async function getById(id) {
    return  get(endpoinds.byId + id);
    
}

export async function createOffer(data) {
    return  post(endpoinds.catalog, data);
    
}
export async function updateOffer(id, data) {
    return  put(endpoinds.byId + id, data);
    
}

export async function deleteOffer(id) {
    return  del(endpoinds.byId + id)
    
}