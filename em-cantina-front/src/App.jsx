import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { ConfigProvider } from 'antd'

import locale from 'antd/lib/locale/fr_FR'

import PageLayout from './components/layout/PageLayout'

import OptionsContext from './context/OptionsContext'

import './App.scss'

const App = () => {
    const [options, setOptions] = useState([])
    return (
        <OptionsContext.Provider value={{ options, setOptions }}>
            <ConfigProvider locale={locale}>
                <Router>
                    <PageLayout />
                </Router>
            </ConfigProvider>
        </OptionsContext.Provider>
    )
}

export default App
