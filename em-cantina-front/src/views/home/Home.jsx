import React, { useEffect, useState } from 'react'

import { Row, Col, Spin, Form } from 'antd'

import _ from 'lodash'

import API from '../../libs/API'

import Recipe from '../../components/recipe/Recipe'

import filter from '../../fields/filter.json'

import FormBuilder from '../../formBuilder/main'

import style from './Home.module.scss'

const Home = () => {
    const [state, setState] = useState({
        recipes: null,
        filter: {
            title: '',
            difficulty: '',
            numberPeople: {},
            time: '',
        },
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

    const filtersRecipe = (changedValues, allValues) => {
        let newS = _.cloneDeep(state)

        // Format string to number
        allValues.numberPeople.min = +allValues.numberPeople.min
        allValues.numberPeople.max = +allValues.numberPeople.max

        newS.filter = _.cloneDeep(allValues)
        if (!_.isEqual(state, newS)) {
            setState(newS)
        }
    }

    const [form] = Form.useForm()
    const formRef = React.createRef()

    return (
        <>
            <Row>
                <Col span={24}>
                    <h1>Recette</h1>
                </Col>
                <Col span={24}>
                    <Form
                        form={form}
                        ref={formRef}
                        onValuesChange={filtersRecipe}
                        initialValues={{ difficulty: 'padawan' }}
                    >
                        <FormBuilder
                            className={`layout-filter-input ${style.formBuilderFilter}`}
                            fieldsList={filter}
                        />
                    </Form>
                </Col>
            </Row>

            <Row gutter={[48, 48]}>
                {!_.isNil(state.recipes) ? (
                    state.recipes
                        .filter(
                            (recipe) =>
                                (!state.filter.title ||
                                    recipe.titre.includes(state.filter.title)) &&
                                (!state.filter.difficulty ||
                                    recipe.niveau.includes(state.filter.difficulty)) &&
                                ((!state.filter.numberPeople.min &&
                                    !state.filter.numberPeople.max) ||
                                    (recipe.personnes >= state.filter.numberPeople.min &&
                                        recipe.personnes <= state.filter.numberPeople.max)) &&
                                (!state.filter.time || recipe.tempsPreparation >= state.filter.time)
                        )
                        .map((el, k) => {
                            return (
                                <Col key={k} span={6}>
                                    <Recipe
                                        _id={el.id}
                                        _imgSrc={el.photo}
                                        _imgAlt={el.titre}
                                        _title={el.titre}
                                        _description={el.description}
                                        _person={el.personnes}
                                        _timingPreparation={el.tempsPreparation}
                                        _level={el.niveau}
                                        _fetchRecipes={fetchRecipes}
                                    />
                                </Col>
                            )
                        })
                ) : (
                    <Spin className="loading-icon" />
                )}
            </Row>
        </>
    )
}

export default Home
