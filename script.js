const CELESTE = document.getElementById('CELESTE')
const VIOLETA = document.getElementById('VIOLETA')
const NARANJA = document.getElementById('NARANJA')
const VERDE = document.getElementById('VERDE')
const BTN_EMPEZAR = document.getElementById('BTN_EMPEZAR')

class Juego {
    constructor() {
        this.inicializar()
        this.generarSecuencia()
        this.siguienteNivel()
    }
    inicializar() {
        this.elegirColor = this.elegirColor.bind(this)
        BTN_EMPEZAR.classList.add('hide')
        this.nivel = 1
        this.colores = {
        CELESTE,
        VIOLETA,
        NARANJA,
        VERDE,
        }
    }
    generarSecuencia() {
        this.secuencia = new Array(10).fill(0).map(n => Math.floor(Math.random() * 4))
    }
    
    siguienteNivel() {
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }
    tansformarNumeroAColor(numero) {
        switch (numero) {
            case 0:
                return 'CELESTE'
            case 1:
                return 'VIOLETA'
            case 2:
                return 'NARANJA'
            case 3:
                return 'VERDE'
        }
    }
    iluminarSecuencia() {
        for (let i = 0; i < this.nivel; i++) {
            const COLOR = this.tansformarNumeroAColor(this.secuencia[i])
            setTimeout(() => this.iluminarColor(COLOR), 1000 * i)
        }
    }
    iluminarColor(COLOR) {
        this.colores[COLOR].classList.add('light')
        setTimeout(() => this.apagarColor(COLOR), 350)
    }
    apagarColor(COLOR) {
        this.colores[COLOR].classList.remove('light')
    }
    agregarEventosClick() {
        this.colores.CELESTE.addEventListener('click', this.elegirColor)
        this.colores.VIOLETA.addEventListener('click', this.elegirColor)
        this.colores.NARANJA.addEventListener('click', this.elegirColor)
        this.colores.VERDE.addEventListener('click', this.elegirColor)
    }
    elegirColor(ev) {
        console.log(this)
    }
}
function empezarJuego() {
    window.Juego = new Juego()
}