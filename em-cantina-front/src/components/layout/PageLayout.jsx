import React, { useState } from 'react'

import { Layout, Menu } from 'antd'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    HomeOutlined,
    AppstoreAddOutlined,
} from '@ant-design/icons'

import { Switch, Route, NavLink } from 'react-router-dom'

import Create from '../../views/create/Create'
import Detail from '../../views/detail/Detail'
import Edit from '../../views/edit/Edit'
import Home from '../../views/home/Home'

import style from './PageLayout.module.scss'

const { Header, Sider, Content } = Layout

const PageLayout = () => {
    const menu = [
        {
            to: '/',
            activeClass: 'selected',
            name: 'Liste des recettes',
            icon: <HomeOutlined />,
        },
        {
            to: '/create',
            activeClass: 'selected',
            name: 'Ajouter',
            icon: <AppstoreAddOutlined />,
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
                <Menu
                    className={style.menuSideBar}
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['0']}
                >
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
                <Header className={`site-layout-background ${style.header}`}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: style.trigger,
                        onClick: toggle,
                    })}
                </Header>
                <Content className={`site-layout-background ${style.contentLayout}`}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/recipe/:id" component={Detail} />
                        <Route path="/create/" component={Create} />
                        <Route path="/recette/edit/:id" component={Edit} />
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    )
}

export default PageLayout
