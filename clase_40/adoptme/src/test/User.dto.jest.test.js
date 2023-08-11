// Ejemplo alternativo utilizando Jest

import {test, expect } from '@jest/globals'
import userDTO from '../dto/User.dto.js'

// Podemos ver que la sintaxis empleada por Jest es muy similar a la repasada con Mocha Chai
describe('Testing de User.dto.js (Jest)', () => {
    // Test 1
    test('debe unificar nombre y apellido', async function () {
        const user = { first_name: 'Coder', last_name: 'House', role: 'academy', email: 'coderhouse@gmail.com' }
        const userDto = userDTO.getUserTokenFrom(user);
        // Esperamos que el resultado devuelva un name formado por first_name y last_name concatenados
        expect(userDto.name).toEqual(`${user.first_name} ${user.last_name}`)
    })

    // Test 2
    test('debe filtrar campos sensibles (password)', async function () {
        const user = { first_name: 'Coder', last_name: 'House', role: 'academy', email: 'coderhouse@gmail.com', password: 'abc123' }
        const userDto = userDTO.getUserTokenFrom(user);
        // Esperamos que el objeto retornado no incluya una propiedad password
        expect(userDto).not.toHaveProperty('password')
    })
})