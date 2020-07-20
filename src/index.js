import React from 'react'
import ReactDOM from 'react-dom'
import Juego from './components/Juego.js'
import { AppContainer } from 'react-hot-loader'

import './main.scss'

function render (Component) {
  ReactDOM.render(
    <AppContainer>
      <Component width={640} height={480} />
    </AppContainer>,
    document.getElementById('app')
  )
}
render(Juego)

if (module.hot) {
  module.hot.accept('./components/Juego.js', () => {
    const NewJuego = require('./components/Juego.js').default
    render(NewJuego)
  })
}
