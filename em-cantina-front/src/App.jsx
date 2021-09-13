import React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Layout } from 'antd'

import HeaderLayout from './components/layout/header/HeaderLayout'

import Home from './views/Home'

import './App.scss'

const { Content } = Layout

const App = () => {
    return (
        <Router>
            <Layout>
                <HeaderLayout />
                <Content>
                    <Switch>
                        <Route exact path="/" component={Home} />
                    </Switch>
                </Content>
            </Layout>
        </Router>
    )
}

export default App
