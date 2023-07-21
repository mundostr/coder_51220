const suma = (...nros) => {
    if (nros.length < 2 || !nros.every(nro => typeof(nro) === 'number')) return undefined
    return nros.reduce((sum, nro) => sum + nro)
    
    // if (a == null || b == null) return undefined
    // if (typeof(a) !== "number" || typeof(b) !== "number") return null
    // return a + b
}

console.log(suma() === undefined ? 'OK': 'ERR')
console.log(suma(3) === undefined ? 'OK': 'ERR')
console.log(suma(3, 4) === 7 ? 'OK': 'ERR')
console.log(suma('1', 2) === undefined ? 'OK': 'ERR')
console.log(suma('1', '2') === undefined ? 'OK': 'ERR')
console.log(suma(1, '2') === undefined ? 'OK': 'ERR')
console.log(suma(1, 2, 3, 4, 5) === 15 ? 'OK': 'ERR')
