import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import PageLayout from './components/layout/PageLayout'

import './App.scss'

const App = () => {
    return (
        <Router>
            <PageLayout />
        </Router>
    )
}

export default App
