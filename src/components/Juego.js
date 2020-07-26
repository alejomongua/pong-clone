import React from 'react'

const width = 640
const height = 480
const anchoJugador = 10
const altoJugador = 100
const radioPelota = 10
const colorJugadorPelota = 'white'
const offsetJugador = 10
const velocidadJugador = 10
const velocidadInicialPelota = 5
const tickInterval = 20

const posicionXJugador2 = width - anchoJugador - offsetJugador
const reboteJugador1 = anchoJugador + offsetJugador

class Juego extends React.Component {
  constructor (props) {
    const posicionInicial = 100

    super(props)
    this.state = {
      pelota: {
        positionX: width / 2,
        positionY: height / 2,
        velocidadX: velocidadInicialPelota,
        velocidadY: velocidadInicialPelota
      },
      j1: posicionInicial,
      j2: posicionInicial
    }
  }

  componentDidMount () {
    var intervalId = setInterval(this.timer.bind(this), tickInterval)
    // almacenamos intervalId en el estado para que pueda ser detenido más tarde
    this.setState((estadoActual) => ({
      ...estadoActual,
      intervalId
    }))

    // Capturar el teclado
    document.addEventListener('keydown', this.teclaOprimida.bind(this))
    document.addEventListener('keyup', this.teclaSoltada.bind(this))
  }

  componentWillUnmount () {
    // use intervalId desde el estado para eliminar intervalo
    clearInterval(this.state.intervalId)
  }

  teclaOprimida (evento) {
    this.setState((estadoActual) => {
      const estado = { ...estadoActual }
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

      if (estado.pelota.positionX === posicionXJugador2 && Math.abs(estado.pelota.positionY - estado.j2) <= altoJugador) {
        estado.pelota.velocidadX = -estado.pelota.velocidadX
        estado.pelota.positionX = estadoActual.pelota.positionX + estado.pelota.velocidadX
      }

      if (estado.pelota.positionX === reboteJugador1 && Math.abs(estado.pelota.positionY - estado.j1) <= altoJugador) {
        estado.pelota.velocidadX = -estado.pelota.velocidadX
        estado.pelota.positionX = estadoActual.pelota.positionX + estado.pelota.velocidadX
      }

      if (estadoActual.pelota.positionY >= height || estadoActual.pelota.positionY <= 0) {
        estado.pelota.velocidadY = -estado.pelota.velocidadY
        estado.pelota.positionY = estadoActual.pelota.positionY + estado.pelota.velocidadY
      }

      if (estado.subirj1) {
        estado.j1 = estado.j1 - velocidadJugador
      }

      if (estado.subirj2) {
        estado.j2 = estado.j2 - velocidadJugador
      }

      if (estado.bajarj1) {
        estado.j1 = estado.j1 + velocidadJugador
      }

      if (estado.bajarj2) {
        estado.j2 = estado.j2 + velocidadJugador
      }

      return estado
    })
  }

  render () {
    return (
      <svg width={width} height={height}>
        <rect x={offsetJugador} y={this.state.j1} width={anchoJugador} height={altoJugador} fill={colorJugadorPelota} />
        <rect x={posicionXJugador2} y={this.state.j2} width={anchoJugador} height={altoJugador} fill={colorJugadorPelota} />
        <circle cx={this.state.pelota.positionX} cy={this.state.pelota.positionY} r={radioPelota} fill={colorJugadorPelota} />
      </svg>
    )
  }
}

export default Juego
