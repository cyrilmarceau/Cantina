import React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Layout } from 'antd'

import HeaderLayout from './components/layout/HeaderLayout'

const { Content } = Layout

const App = () => {
    return (
        <Router>
            <Layout>
                <HeaderLayout />
                <Content>
                    <Switch></Switch>
                </Content>
            </Layout>
        </Router>
    )
}

export default App
