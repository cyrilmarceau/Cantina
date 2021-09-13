import React from 'react'

import { NavLink } from 'react-router-dom'

import { Layout, Menu } from 'antd'

import { HomeOutlined, SearchOutlined, StarOutlined } from '@ant-design/icons'

const { Header } = Layout

const HeaderLayout = () => {
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
    return (
        <Header>
            <Menu theme="dark" mode="horizontal">
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
        </Header>
    )
}

export default HeaderLayout
