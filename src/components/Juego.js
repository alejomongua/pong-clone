import React from 'react'
import PropTypes from 'prop-types'

class Juego extends React.Component {
  constructor (props) {
    super(props)
    this.width = props.width || 640
    this.height = props.height || 480
    this.state = {}
  }

  render () {
    return (
      <div>
        <h1>Clon de pong en Javascript</h1>
        <canvas width={this.width} height={this.height}></canvas>
      </div>
    )
  }
}

Juego.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
}

export default Juego
