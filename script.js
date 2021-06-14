const CELESTE = document.getElementById('CELESTE')
const VIOLETA = document.getElementById('VIOLETA')
const NARANJA = document.getElementById('NARANJA')
const VERDE = document.getElementById('VERDE')
const BTN_EMPEZAR = document.getElementById('BTN_EMPEZAR')
const ULTIMO_NIVEL = 10

class Juego {
    constructor() {
        this.inicializar = this.inicializar.bind(this)
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel, 500)
    }
    inicializar() {
        this.transformarColorANumero = this.tansformarColorANumero.bind(this)
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.elegirColor = this.elegirColor.bind(this)
        this.toggleBTN_EMPEZAR()
        this.nivel = 1
        this.colores = {
        CELESTE,
        VIOLETA,
        NARANJA,
        VERDE,
        }
    }
    toggleBTN_EMPEZAR() {
        if (BTN_EMPEZAR.classList.contains('hide')) {
            BTN_EMPEZAR.classList.remove('hide')
        } else {
            BTN_EMPEZAR.classList.add('hide')
        }
    }
    generarSecuencia() {
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }
    siguienteNivel() {
        this.subNivel = 0
        this.iluminarSecuencia()
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
    tansformarColorANumero(COLOR) {
        switch (COLOR) {
            case 'CELESTE':
                return 0
            case 'VIOLETA':
                return 1
            case 'NARANJA':
                return 2
            case 'VERDE':
                return 3
        }
    }
    iluminarSecuencia() {
        for (let i = 0; i < this.nivel; i++) {
            const COLOR = this.tansformarNumeroAColor(this.secuencia[i])
            setTimeout(() => this.iluminarColor(COLOR, i), 1000 * i)
        }
    }
    iluminarColor(COLOR, i) {
        this.colores[COLOR].classList.add('light')
        setTimeout(() => this.apagarColor(COLOR, i), 350)
    }
    apagarColor(COLOR, i) {
        this.colores[COLOR].classList.remove('light')
        if ((i + 1) === this.nivel) {
            this.agregarEventosClick()
        }
    }
    agregarEventosClick() {
        this.colores.CELESTE.addEventListener('click', this.elegirColor)
        this.colores.VIOLETA.addEventListener('click', this.elegirColor)
        this.colores.NARANJA.addEventListener('click', this.elegirColor)
        this.colores.VERDE.addEventListener('click', this.elegirColor)
    }
    eliminarEventosClick() {
        this.colores.CELESTE.removeEventListener('click', this.elegirColor)
        this.colores.VIOLETA.removeEventListener('click', this.elegirColor)
        this.colores.NARANJA.removeEventListener('click', this.elegirColor)
        this.colores.VERDE.removeEventListener('click', this.elegirColor)
    }
    elegirColor(ev) {
        console.log(ev)
        const NOMBRE_COLOR = ev.target.dataset.color // este 'color' va en minuscula por que el data en HTML lo reescribe a minuscula
        const NUMERO_COLOR = this.transformarColorANumero(NOMBRE_COLOR)
        this.iluminarColor(NOMBRE_COLOR)
        if (NUMERO_COLOR === this.secuencia[this.subNivel]) {
            this.subNivel++
            if (this.subNivel === this.nivel) {
                this.nivel++
                this.eliminarEventosClick()
                if (this.nivel === (ULTIMO_NIVEL + 1)) {
                    this.ganoElJuego()
                } else {
                    setTimeout(this.siguienteNivel, 1500)
                }
            }
        } else {
            this.perdioElJuego()
        }
    }
    ganoElJuego() {
        swal('Platzi', 'Felicitaciones, Ganaste 💚', 'success')
            .then(this.inicializar)
    }
    perdioElJuego() {
        swal('Platzi', 'Lo siento, perdiste 😥', 'error')
            .then(() => {
                this.eliminarEventosClick()
                this.inicializar()
            })
    }

}
function empezarJuego() {
    window.Juego = new Juego()
}