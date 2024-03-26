import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './world.jsx'
import UI from './ui.jsx'
import Hats from './hats.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  <App />
  {/* <Hats /> */}
  <UI />
  </>
)
