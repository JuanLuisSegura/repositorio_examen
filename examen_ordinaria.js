


function VarietiesIsTrue(array) {
    let arrayIsTrue = []
    array.forEach(element => {
        if (element.is_default === true) arrayIsTrue.push(element.pokemon.url)
    })
    return arrayIsTrue
}
function recorrerCadenaEvolucion(cadena) {
    let array1 = []
    array1.push(cadena.species)
    while (cadena.evolves_to.length !== 0) {
        cadena.evolves_to.forEach(element => array1.push(element.species))
        cadena = cadena.evolves_to[0]
    }
    return array1
}
async function getURL(url) {
    const response = await fetch(url)
    if (response.status !== 200) throw 'Error: ' + response.status
    return await response.json()
}

async function datosPokemon(nombre) {
    const datosPokemon = await getURL('https://pokeapi.co/api/v2/pokemon/' + nombre)
    const imagen = datosPokemon.sprites.other['official-artwork'].front_default
    const urlEspecie = datosPokemon.species.url
    return { 'imagenPokemon': imagen, 'urlEspecie': urlEspecie }
}

async function arrayPokemonYUrlEspecie(nombre) {
    const urlObtenidaEspecie = await getURL((await datosPokemon(nombre)).urlEspecie)
    const urlCadenaEvolucion = await getURL(urlObtenidaEspecie.evolution_chain.url)
    return recorrerCadenaEvolucion(urlCadenaEvolucion.chain)
}

async function final(nombre) {

    const urlPokemon = await arrayPokemonYUrlEspecie(nombre)
    const prueba = urlPokemon.map(async element => {
        let datos = await getURL(element.url)
        let datos2 = await getURL(VarietiesIsTrue(datos.varieties))
        return { name: datos2.name, sprite: datos2.sprites.other['official-artwork'].front_default }
    })
    return Promise.all(prueba)
}

let pokemon = class {
    constructor(nombre) {
        this.nombre = nombre
    }
    getName() {
        return this.nombre.toUpperCase()

    }
    async getData() {
        const finalizar = await final(this.nombre).then(res => { return res })
        return {
            name: this.nombre,
            sprite: finalizar.filter(element => element.name === this.nombre)[0].sprite,
            evolution: finalizar
        }
    }
}
function añadirPokemons(string, datos) {
    let pokemonDetails = document.getElementById(string)
    let h2 = document.createElement('h2')
    let img = document.createElement('img')
    document.getElementById('results').style.display = 'block'
    img.setAttribute('id', 'image-pokemon')
    img.setAttribute('src', datos.sprite)
    img.setAttribute('alt', 'image of ' + datos.name)
    pokemonDetails.appendChild(h2)
    pokemonDetails.appendChild(img)
    h2.innerHTML = datos.name
}
function añadirEvolves_to(string) {
    let p = document.createElement('p')
    let div = document.getElementById(string)
    div.appendChild(p)
    p.innerHTML = 'Evolves...to'
}
async function obtenerPokemon() {
    let pokemonName = document.getElementById('pokemon-name')
    let poke = new pokemon(pokemonName.value)
    const datosPokemon = await poke.getData()
    añadirPokemons('pokemon-details', datosPokemon)
    let contador = 1;
    datosPokemon.evolution.forEach(pokemon => {
        añadirPokemons('evolution-data', pokemon)
        if (contador !== datosPokemon.evolution.length) añadirEvolves_to('evolution-data')
        contador++
    })
}

let search = document.getElementById('search')
search.addEventListener('click', obtenerPokemon)