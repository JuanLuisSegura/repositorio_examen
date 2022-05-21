let pokemon = class {
    constructor(nombre) {
        this.nombre = nombre
    }
    getName() {
        return this.nombre.toUpperCase()

    }
    async getData() {
        const finalizar = await final(this.nombre)
        return {
            name: this.nombre,
            sprite: finalizar.filter(element=> element.name===this.nombre)[0].sprite,
            evolution : finalizar
        }
    }
}
let poke = new pokemon('pikachu')
poke.getData().then(console.log)