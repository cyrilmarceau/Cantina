import React, {useState} from 'react'
import { BrowserRouter as Router} from 'react-router-dom'

import SiderLayout from './components/layout/header/SiderLayout'

import './App.scss'

const App = () => {
    return (
        <Router>
            <SiderLayout />
        </Router>
    )
}

export default App
