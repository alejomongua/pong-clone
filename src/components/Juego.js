import React from 'react'
import PropTypes from 'prop-types'

const anchoJugador = 10
const altoJugador = 100
const radioPelota = 10
const colorJugadorPelota = 'white'
const offsetJugador = 10
const velocidadJugador = 10
const velocidadInicialPelota = 5
const tickInterval = 20

const reboteJugador1 = anchoJugador + offsetJugador

const posicionInicial = 100
class Juego extends React.Component {
  constructor (props) {
    super(props)

    this.width = props.width
    this.height = props.height
    this.posicionXJugador2 = this.width - anchoJugador - offsetJugador

    this.state = {
      pelota: {
        positionX: this.width / 2,
        positionY: this.height / 2,
        velocidadX: velocidadInicialPelota,
        velocidadY: velocidadInicialPelota
      },
      j1: posicionInicial,
      j2: posicionInicial,
      puntuacionj1: 0,
      puntuacionj2: 0,
      meta: 10,
      text: 'Press space to START'
    }
  }

  componentDidMount () {
    // Capturar el teclado
    document.addEventListener('keydown', this.teclaOprimida.bind(this))
    document.addEventListener('keyup', this.teclaSoltada.bind(this))
  }

  teclaOprimida (evento) {
    this.setState((estadoActual) => {
      let estado = { ...estadoActual }
      switch (evento.keyCode) {
        case 38:
          estado.subirj2 = true
          break
        case 40:
          estado.bajarj2 = true
          break
        case 83:
          estado.bajarj1 = true
          break
        case 87:
          estado.subirj1 = true
          break
        case 32:
          if (estado.intervalId) {
            // Pausa
            clearInterval(estado.intervalId)
            estado.intervalId = 0
            estado.text = 'Press space to CONTINUE'
          } else if (estado.puntuacionj1 < estado.meta && estado.puntuacionj1 < estado.meta) {
            // Despausa
            // almacenamos intervalId en el estado para que pueda ser detenido más tarde
            estado.intervalId = setInterval(this.timer.bind(this), tickInterval)
            estado.text = ''
          }
          break
        case 27 :
          clearInterval(estado.intervalId)
          estado = {
            pelota: {
              positionX: this.width / 2,
              positionY: this.height / 2,
              velocidadX: velocidadInicialPelota,
              velocidadY: velocidadInicialPelota
            },
            j1: posicionInicial,
            j2: posicionInicial,
            puntuacionj1: 0,
            puntuacionj2: 0,
            intervalId: 0,
            meta: 10,
            text: 'Press space to START'
          }
          break
      }

      return estado
    })
  }

  teclaSoltada (evento) {
    this.setState((estadoActual) => {
      const estado = { ...estadoActual }
      switch (evento.keyCode) {
        case 38:
          estado.subirj2 = false
          break
        case 40:
          estado.bajarj2 = false
          break
        case 83:
          estado.bajarj1 = false
          break
        case 87:
          estado.subirj1 = false
          break
      }

      return estado
    })
  }

  timer () {
    this.setState((estadoActual) => {
      const estado = { ...estadoActual }

      estado.pelota.positionX = estadoActual.pelota.positionX + estadoActual.pelota.velocidadX
      estado.pelota.positionY = estadoActual.pelota.positionY + estadoActual.pelota.velocidadY

      if (estado.pelota.positionX === this.posicionXJugador2) {
        // Si la pelota llegó hasta la posición en X del jugador 2
        const colision = estado.pelota.positionY - estado.j2
        if (colision <= altoJugador && colision > 0) {
          estado.pelota.velocidadX = -estado.pelota.velocidadX
          estado.pelota.positionX = estadoActual.pelota.positionX + estado.pelota.velocidadX
        }
      }

      if (estado.pelota.positionX === reboteJugador1) {
        const colision = estado.pelota.positionY - estado.j1
        if (colision <= altoJugador && colision > 0) {
          estado.pelota.velocidadX = -estado.pelota.velocidadX
          estado.pelota.positionX = estadoActual.pelota.positionX + estado.pelota.velocidadX
        }
      }

      if (estadoActual.pelota.positionY >= this.height || estadoActual.pelota.positionY <= 0) {
        estado.pelota.velocidadY = -estado.pelota.velocidadY
        estado.pelota.positionY = estadoActual.pelota.positionY + estado.pelota.velocidadY
      }

      if (estado.subirj1 && estado.j1 > 0) {
        estado.j1 = estado.j1 - velocidadJugador
      }

      if (estado.subirj2 && estado.j2 > 0) {
        estado.j2 = estado.j2 - velocidadJugador
      }

      if (estado.bajarj1 && estado.j1 < this.height - altoJugador) {
        estado.j1 = estado.j1 + velocidadJugador
      }

      if (estado.bajarj2 && estado.j2 < this.height - altoJugador) {
        estado.j2 = estado.j2 + velocidadJugador
      }
      if (estado.pelota.positionX >= this.width) {
        estado.puntuacionj1++
        if (estado.puntuacionj1 === estado.meta) {
          estado.text = 'GAME OVER P1 WINS. Press ESC to RESTART'
          clearInterval(estado.intervalId)
          estado.intervalId = 0
        }
        estado.pelota.velocidadX = -estado.pelota.velocidadX
        estado.pelota.positionX = this.width / 2
        estado.pelota.positionY = this.height / 2
      }
      if (estado.pelota.positionX <= 0) {
        estado.puntuacionj2++
        if (estado.puntuacionj2 === estado.meta) {
          estado.text = 'GAME OVER P2 WINS. Press ESC to RESTART'
          clearInterval(estado.intervalId)
          estado.intervalId = 0
        }
        estado.pelota.velocidadX = -estado.pelota.velocidadX
        estado.pelota.positionX = this.width / 2
        estado.pelota.positionY = this.height / 2
      }
      return estado
    })
  }

  render () {
    return (
      <div>
        <input value={this.state.meta}/>
        <div>
          <svg width={this.width} height={this.height}>
            <rect x={offsetJugador} y={this.state.j1} width={anchoJugador} height={altoJugador} fill={colorJugadorPelota} />
            <rect x={this.posicionXJugador2} y={this.state.j2} width={anchoJugador} height={altoJugador} fill={colorJugadorPelota} />
            <circle cx={this.state.pelota.positionX} cy={this.state.pelota.positionY} r={radioPelota} fill={colorJugadorPelota} />
            {
              this.state.text
                ? <text x="5" y="15" fill="red">{this.state.text}</text>
                : ''
            }
          </svg>
        </div>
        <h2>{this.state.puntuacionj1} - {this.state.puntuacionj2}</h2>
      </div>
    )
  }
}

Juego.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
}

export default Juego
