
import fetch from 'node-fetch'

async function getURL(url) {
    const response = await fetch(url)
    if (response.status !== 200) throw 'Error: ' + response.status
    return await response.json()
}

async function searchCharacter(nombre) {
    try {
        let datos = await getURL('https://rickandmortyapi.com/api/character/?name=' + nombre)
        return datos.results[0]
    }
    catch (error) {
        return 'Error: ' + error.status
    }
}

//orden alfabético
function SortArray(x, y) {
    if (x.name < y.name) { return -1; }
    if (x.name > y.name) { return 1; }
    return 0;
}


async function personajesEpisodio(urlEpisodio, personajesYaPedidos) {
    const datosEpisodio = await getURL(urlEpisodio)

    const aPedir = []
    datosEpisodio.characters.forEach(URLPersonaje => {
        if (!personajesYaPedidos.has(URLPersonaje)) {
            personajesYaPedidos.add(URLPersonaje)
            aPedir.push(URLPersonaje)
        }
    })

    const characterRequests = aPedir.map(async element => {
        return await getURL(element)
    })
    return Promise.all(characterRequests)
}

async function patata(nombrePersonaje) {

    let personajesYaPedidos = new Set()

    const personaje = await searchCharacter(nombrePersonaje);
    const companionsRequests = personaje.episode.map(async url => {
        return personajesEpisodio(url, personajesYaPedidos)
    })
    const companions = await Promise.all(companionsRequests)
    const res = companions.flat().map(companion => {
        return {
            id: companion.id,
            name: companion.name
        }
    })
    return res.sort(SortArray);
}

patata('Armagheadon').then(console.log);
