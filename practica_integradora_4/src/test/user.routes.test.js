import { expect } from 'chai'

const API_BASE_URI = 'http://localhost:3000'

describe('Tests unitarios users routes', () => {
    it('Debe retornar objecto con status y array de usuarios', async () => {
        const raw = await fetch(`${API_BASE_URI}/api/users`)
        const response = await raw.json();
        
        expect(raw.status).to.equal(200)
        expect(response).to.be.an('object')
        expect(response).to.haveOwnProperty('status')
        expect(response).to.haveOwnProperty('result').and.to.be.an('array')
    })
    
    it('Debe retornar 404 en rutas no válidas', async () => {
        const raw = await fetch(`${API_BASE_URI}/api/cualquier_cosa`)

        expect(raw.status).to.equal(404)
    });
});