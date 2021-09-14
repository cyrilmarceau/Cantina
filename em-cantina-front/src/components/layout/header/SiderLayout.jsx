import React, { useState } from 'react'

import { Layout, Menu } from 'antd'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    SearchOutlined,
    StarOutlined,
    HomeOutlined,
} from '@ant-design/icons'

import { Switch, Route, NavLink } from 'react-router-dom'

import Home from '../../../views/Home'
import Detail from '../../../views/Detail'

import './SiderLayout.module.scss'

const { Header, Sider, Content } = Layout

const SiderLayout = () => {
    const menu = [
        { to: '/', activeClass: 'selected', name: 'Liste des recettes', icon: <HomeOutlined /> },
        {
            to: '/',
            activeClass: 'selected',
            name: 'Détail',
            icon: <SearchOutlined />,
        },
        {
            to: '/favoris',
            activeClass: 'selected',
            name: 'Ajouter',
            icon: <StarOutlined />,
        },
        {
            to: '/favoris',
            activeClass: 'selected',
            name: 'Modifier',
            icon: <StarOutlined />,
        },
    ]

    const toggle = () => {
        setcollapsed(!collapsed)
    }

    const [collapsed, setcollapsed] = useState('')
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    {menu.map((el, i) => {
                        return (
                            <Menu.Item key={i} icon={el.icon}>
                                <NavLink to={el.to} activeClassName={el.activeClass} exact>
                                    {el.name}
                                </NavLink>
                            </Menu.Item>
                        )
                    })}
                </Menu>
            </Sider>

            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: toggle,
                    })}
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/recipe/:id" component={Detail} />
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    )
}

export default SiderLayout
