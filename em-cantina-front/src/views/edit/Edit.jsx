import React, { useState, useEffect } from 'react'

import { useHistory, useParams } from 'react-router-dom'

import { Row, Col, Form, Button, Spin, message, Space, Input } from 'antd'

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

import _ from 'lodash'

import edit from '../../fields/edit.json'

import FormBuilder from '../../components/formBuilder/main'

import Ingredient from '../../components/dynamicField/ingredient/Ingredient'
import Step from '../../components/dynamicField/step/Step'
import FormList from '../../components/formBuilder/FormList/FormList'

import API from '../../libs/API'

import style from './Edit.module.scss'

const { TextArea } = Input

const Edit = () => {
    const [state, setState] = useState({
        recipe: null,
    })

    let history = useHistory()
    let { id } = useParams()

    const [form] = Form.useForm()
    const formRef = React.createRef()

    useEffect(() => {
        fetchRecipe()
    }, [])

    const fetchRecipe = async () => {
        try {
            let recipesFetch = await API.getSpecificRecipe(id)

            let newS = _.cloneDeep(state)
            newS.recipe = recipesFetch
            setState(newS)
        } catch (e) {
            if (e.response.data.errorMessage === 'Aucune recette trouvée') {
                message
                    .error(
                        "La page recherché n'existe pas vous allez être rediriger dans 2 secondes",
                        2
                    )
                    .then(() => {
                        history.push('/')
                    })
            }
        }
    }

    const updateRecipe = (values) => {
        let formatRecipe = {}
        let ingredients = []
        let steps = []

        if (!_.isNil(values.defaultRecipe)) {
            values.defaultRecipe.forEach((el, i) => {
                let createArrayFromDefaultRecipe = []
                if (!_.isNil(el.type) || !el.type === '') {
                    createArrayFromDefaultRecipe.push(el.quantity.toString() + el.type, el.contain)
                    ingredients.push(createArrayFromDefaultRecipe)
                } else {
                    createArrayFromDefaultRecipe.push(el.quantity.toString() + '', el.contain)
                    ingredients.push(createArrayFromDefaultRecipe)
                }
            })
        }

        if (!_.isNil(values.recipes)) {
            values.recipes.forEach((el) => {
                let arrayForIngredient = []
                if (!_.isNil(el.type) || !el.type === '') {
                    arrayForIngredient.push(el.quantity.toString() + el.type, el.contain)
                    ingredients.push(arrayForIngredient)
                } else {
                    arrayForIngredient.push(el.quantity.toString() + '', el.contain)
                    ingredients.push(arrayForIngredient)
                }
            })
        }

        if (!_.isNil(values.recipesStep)) {
            values.recipesStep.forEach((el) => {
                steps.push(el.step)
            })
        }

        if (!_.isNil(values.defaultStep)) {
            values.defaultStep.forEach((el) => {
                steps.push(el.step)
            })
        }

        // // Format to JSON
        formatRecipe.titre = values.title
        formatRecipe.description = values.description
        formatRecipe.niveau = values.difficulty
        formatRecipe.personnes = values.people
        formatRecipe.tempsPreparation = values.preparationTime
        formatRecipe.ingredients = ingredients
        formatRecipe.etapes = steps
        if (!_.isEmpty(values.pictureURL) && values.pictureURL.match(/https?:\/\//g)) {
            formatRecipe.photo = values.pictureURL
        }

        API.updateRecipe(id, formatRecipe).then(() => {
            message.success('La modification à bien été effectué', 1, history.push('/'))
        })
    }

    return (
        <Row>
            <Col span={24}>
                {!_.isNil(state.recipe) ? (
                    <Form
                        initialValues={{
                            title: state.recipe.titre,
                            description: state.recipe.description,
                            people: state.recipe.personnes,
                            difficulty: state.recipe.niveau,
                            preparationTime: state.recipe.tempsPreparation,
                            pictureURL: state.recipe.photo,
                            defaultStep: [''],
                        }}
                        name="dynamic_form_item"
                        form={form}
                        ref={formRef}
                        onFinish={updateRecipe}
                    >
                        <FormBuilder fieldsList={edit[0]} className={`layout-edit-input`} />

                        <h2>Ingredients</h2>
                        <Ingredient ingredients={state.recipe.ingredients} />

                        <Form.List name="recipes">
                            {(fields, { add, remove }) => (
                                <>
                                    <Row gutter={[48, 48]}>
                                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                                            <Col key={key} xs={24} md={12} lg={8}>
                                                <div className={`form-builder-input`}>
                                                    <Space
                                                        // key={key}
                                                        style={{ display: 'flex', marginBottom: 8 }}
                                                        align="baseline"
                                                    >
                                                        <FormBuilder
                                                            formInst={name}
                                                            fromDynamic={true}
                                                            fieldsList={edit[1]}
                                                            className={`${style.formBuilder} layout-create-ingredients-input`}
                                                            isCreateOrAdd={true}
                                                        />
                                                        <MinusCircleOutlined
                                                            onClick={() => remove(name)}
                                                        />
                                                    </Space>
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            onClick={() => add()}
                                            block
                                            icon={<PlusOutlined />}
                                        >
                                            Ajouter un ingrédient
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>

                        <h2>Etapes</h2>

                        <Form.List name="defaultStep">
                            {(fields, { add, remove }) => (
                                <>
                                    <Row gutter={[48, 48]}>
                                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                                            <>
                                                {state.recipe.etapes.map((el, k) => {
                                                    return (
                                                        <Col key={el} xs={24} md={12} lg={8}>
                                                            <div
                                                                key={el}
                                                                className={`form-builder-input`}
                                                            >
                                                                <Form.Item
                                                                    initialValue={el}
                                                                    label="Etape"
                                                                    name={[k, 'step']}
                                                                >
                                                                    <TextArea placeholder="Etapes" />
                                                                </Form.Item>
                                                                <div className={style.deleteIcon}>
                                                                    <MinusCircleOutlined
                                                                        onClick={() => remove(name)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    )
                                                })}
                                            </>
                                        ))}
                                    </Row>
                                </>
                            )}
                        </Form.List>
                        <Form.List name="recipesStep">
                            {(fields, { add, remove }) => (
                                <>
                                    <Row gutter={[48, 48]}>
                                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                                            <Col key={key} xs={24} md={12} lg={8}>
                                                <div className={`form-builder-input`}>
                                                    <Space
                                                        // key={key}
                                                        style={{ display: 'flex', marginBottom: 8 }}
                                                        align="baseline"
                                                    >
                                                        <FormBuilder
                                                            formInst={name}
                                                            fromDynamic={true}
                                                            fieldsList={edit[2]}
                                                            className={`${style.formBuilder} layout-create-step-input`}
                                                            isCreateOrAdd={true}
                                                        />
                                                        <MinusCircleOutlined
                                                            onClick={() => remove(name)}
                                                        />
                                                    </Space>
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            onClick={() => add()}
                                            block
                                            icon={<PlusOutlined />}
                                        >
                                            Ajouter une étape
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Editer cette étape
                            </Button>
                        </Form.Item>
                    </Form>
                ) : (
                    <Spin className="loading-icon" />
                )}
            </Col>
        </Row>
    )
}

export default Edit
