
function sumaResta(boton, display) {
    for (let i = 0; i < boton.length; i++) {
        boton[i].addEventListener('click', () => {
            if (!isNaN(display.innerHTML.slice(-1))) display.innerHTML = display.innerHTML + boton[i].dataset.action
        })
    }
}
function Igual(boton) {
    for (let i = 0; i < boton.length; i++) {
        if (boton[i].dataset.action === '=') {
            return i
        }
    }
}
function numerosQueSuman(array) {
    
    let contador = 0;
    array.forEach(element=>{
        contador = contador + parseInt(element[0])
        element.splice(0, 1)
    })
    return contador
}
function numerosQueRestan(array) {
   
    let contador = 0;
    array.forEach(elemento1 => {
        elemento1.forEach(elemento2 => {
            contador = contador + parseInt(elemento2)
        })
    })
    return contador
}

function calcularExpresion(expresion) {
    
    let suma = 0;
    let arraySuma = expresion.split('+')
    let arrayResta = []

    arraySuma.forEach(element=>{
        if (element.includes('-')) {
            arrayResta.push(element.split('-'))
        }
        else suma = suma + parseInt(element)
    })
    return (suma + numerosQueSuman(arrayResta)) - numerosQueRestan(arrayResta)
}
function añadirNumeros(boton, display) {
    for ( let i = 0; i < boton.length; i++) {
        boton[i].addEventListener('click', () => {
            if (display.innerHTML == 0) display.innerHTML = boton[i].dataset.action
            else display.innerHTML = display.innerHTML + boton[i].dataset.action
        })
    }
}
function añadirLog(result, display, log) {
    let parrafo = document.createElement('p')
    log.appendChild(parrafo)

    if (!isNaN(display.innerHTML)) parrafo.innerHTML = display.innerHTML
    else parrafo.innerHTML = display.innerHTML + ' = ' + result
}


export {
    añadirNumeros,
    añadirLog,
}
export {
    sumaResta,
    Igual,
    calcularExpresion,
}