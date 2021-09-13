import React, { useEffect, useState } from 'react'

import API from '../libs/API'

import Recipe from '../components/Recipe'

import { Row, Col, Spin } from 'antd'

import _ from 'lodash'

const Home = () => {
    const [state, setState] = useState({
        recipes: null,
    })

    useEffect(() => {
        fetchRecipes()
    }, [])

    const fetchRecipes = async () => {
        let params = {}
        let recipesFetch = await API.getRecipes(params)

        let newS = _.cloneDeep(state)
        newS.recipes = recipesFetch
        setState(newS)
    }

    return (
        <>
            <div className="ct-container">
                <Row>
                    {!_.isNil(state.recipes) ? (
                        state.recipes.map((el, k) => (
                            <Col span={6}>
                                <Recipe
                                    _imgSrc={el.photo}
                                    _imgAlt={el.titre}
                                    _title={el.titre}
                                    _description={el.description}
                                />
                            </Col>
                        ))
                    ) : (
                        <Spin />
                    )}
                </Row>
            </div>
        </>
    )
}

export default Home
