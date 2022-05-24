
import './calculadora.css'
import './reset.css'
import { sumaResta,  calcularExpresion,  Igual } from './funcionesCalculadora.js'
import { añadirNumeros,añadirLog} from './DisplayYlog.js'

let botonNumeros = document.getElementsByClassName('calc-button number')
let botonSumaResta = document.getElementsByClassName('calc-button blue-button')
let botonesAC_C = document.getElementsByClassName('calc-button red-button')
let botonIgual = document.getElementsByClassName('calc-button')
let display = document.getElementById('display')
let log = document.getElementById('log')
let numeroBoton = Igual(botonIgual)


añadirNumeros(botonNumeros, display)
sumaResta(botonSumaResta, display)
botonIgual[numeroBoton].addEventListener('click', () => {
    let resultado = calcularExpresion(display.innerHTML)
    añadirLog(resultado, display, log)
    if (resultado !== undefined) display.innerHTML = resultado
})
botonesAC_C[0].addEventListener('click', () => {
    display.innerHTML = 0
    log.innerHTML = ''
})
botonesAC_C[1].addEventListener('click', () =>{
    display.innerHTML = 0
})
