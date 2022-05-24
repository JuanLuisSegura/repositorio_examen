
function fetch(id) {
    console.log('lanzando id ' + id);
    const tiempo = Math.random() * 1000 + 1000;
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve('resuelto id ' + id + ' en ' + tiempo), tiempo);
    })
}


const ids = [1, 2, 3, 4];

//hacer secuencial con then
console.time('secuencial');


function secuencial2() {
    let promesa = Promise.resolve()
    let prueba = ids.map(function(x){
        promesa = promesa.then(()=>{
            return fetch(x)
        }).then(res=>console.log(res))
        
    })
    return prueba
}

//secuencial().then( () => console.timeEnd('secuencial'));

//lanzarlo en paralelo 
async function paralelo1() {

     let array = []
    for (let element of ids) {
        array.push(await fetch(element))
    }
    return Promise.all(array) 
}

function paralelo2() {

    let prueba = ids.map(function (x) {
        return fetch(x)
    })
    return Promise.all(prueba)
}

//secuencial1()
secuencial2()
//paralelo1().then(res=>console.log(res))
//paralelo2().then(res=>{console.log( res)})