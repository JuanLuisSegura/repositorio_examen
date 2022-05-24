
//loader
function loader({active}) {
    document.getElementById('loader')
    .className = active ? 'active' : ''

}
async function hacerFetch(url){
    const response = await fetch(url ,{
        headers:{
            "authorization": "Bearer" + localStorage.bearer
        } 
    })
    const datos = await response.json()
    return datos
}

function extraerId() {
    let array = []
    const params = new URLSearchParams(window.location.search)
    for (let param of params.entries()) {
        array.push(param)
    }
    return array[0][1]
}
let divError = document.getElementById('error')

function quitarDivError(){
    divError.classList.remove('show') ;
}
function mostrarDivError(response){
    divError.classList.add('show') ;
    divError.innerHTML = response.statusText
}
async function peticionLogin(nombre, contraseña) {
    loader({active:true})
    quitarDivError()
    try {
        const response = await fetch('http://localhost:8888/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'username': nombre.value, 'password': contraseña.value })
        });
        if (response.status ===200) {
        const content = await response.json()
            window.location.href = './list.html?player='+content.player_id
            localStorage.bearer = content['access_token']
            return  content
        }
        else mostrarDivError(response)
    }
    catch (error) {
        error
    }
    loader({active:false})
}