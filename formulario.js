import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import '../common/common.css'
import {peticionLogin} from './funcionesIndex.js'


let form = document.getElementsByTagName('form')[0]
let nombre = document.getElementById('username')
let submit = document.getElementById('submit')
let contraseña = document.getElementById('password')

submit.addEventListener('click', e => {
    form.className = 'was-validated'
    e.preventDefault()
    if (form.checkValidity()) {
        
        peticionLogin(nombre, contraseña).then(res => console.log(res))
    }
})
