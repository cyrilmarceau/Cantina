import React, { useState, useEffect } from 'react'

import { useHistory, useParams } from 'react-router-dom'

import { Row, Col, Form, Button, Spin, message } from 'antd'

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

import _, { set } from 'lodash'

import edit from '../../fields/edit.json'

import FormBuilder from '../../components/formBuilder/main'
import Ingredient from '../../components/dynamicField/ingredient/Ingredient'
import Step from '../../components/dynamicField/step/Step'

import API from '../../libs/API'

import style from './Edit.module.scss'

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

            let formatStep = []
            newS.recipe.etapes.forEach((el, k) => {
                let obj = {
                    id: k,
                    step: el,
                }
                formatStep.push(obj)
            })
            newS.recipe.etapes = formatStep

            let formatIngredient = []
            newS.recipe.ingredients.forEach((el, k) => {
                let obj = {
                    id: k,
                    ingredient: el,
                }
                formatIngredient.push(obj)
            })

            newS.recipe.ingredients = formatIngredient

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
                if (!_.isNil(el)) {
                    let isEmptyOrNoQuantity = !_.isNil(el.quantity) ? el.quantity.toString() : ''

                    let createArrayFromDefaultRecipe = []

                    if (!_.isNil(el.type) || !el.type === '') {
                        createArrayFromDefaultRecipe.push(isEmptyOrNoQuantity + el.type, el.contain)
                        ingredients.push(createArrayFromDefaultRecipe)
                    } else {
                        createArrayFromDefaultRecipe.push(isEmptyOrNoQuantity + '', el.contain)
                        ingredients.push(createArrayFromDefaultRecipe)
                    }
                }
            })
        }

        if (!_.isNil(values.recipes)) {
            values.recipes.forEach((el) => {
                let isEmptyOrNoQuantity = !_.isNil(el.quantity) ? el.quantity.toString() : ''

                let arrayForIngredient = []
                if (!_.isNil(el.type) || !el.type === '') {
                    arrayForIngredient.push(isEmptyOrNoQuantity + el.type, el.contain)
                    ingredients.push(arrayForIngredient)
                } else {
                    arrayForIngredient.push(isEmptyOrNoQuantity + '', el.contain)
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
                if (!_.isNil(el)) {
                    steps.push(el.step)
                }
            })
        }

        // Format to JSON
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

        API.updateRecipe(id, formatRecipe)
            .then(() => {
                message.success('La modification a bien été effectué', 1, () => history.push('/'))
            })
            .catch((e) => {
                message.error('Une erreur est survenue pendant la modification', 1, () =>
                    history.push('/')
                )
            })
    }

    const removeStep = (id) => {
        setState((prevState) => {
            return {
                ...prevState,
                recipe: {
                    ...prevState.recipe,
                    etapes: prevState.recipe.etapes.filter((etape) => etape.id !== id),
                },
            }
        })
    }

    const removeIngredient = (id) => {
        setState((prevState) => {
            return {
                ...prevState,
                recipe: {
                    ...prevState.recipe,
                    ingredients: prevState.recipe.ingredients.filter((ing) => ing.id !== id),
                },
            }
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
                        }}
                        name="dynamic_form_item"
                        form={form}
                        ref={formRef}
                        onFinish={updateRecipe}
                    >
                        <FormBuilder fieldsList={edit[0]} className={`layout-edit-input`} />

                        <h2>Ingredients</h2>
                        <Row gutter={[48, 48]}>
                            {state.recipe.ingredients.map((el, k) => {
                                return (
                                    <Ingredient
                                        key={el.id}
                                        removeIngredient={removeIngredient}
                                        ingredient={el.ingredient}
                                        uuid={el.id}
                                    />
                                )
                            })}

                            <Form.List name="recipes">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                                            <Col key={key} xs={24} md={12} lg={8}>
                                                <div className={`form-builder-input`}>
                                                    <FormBuilder
                                                        formInst={name}
                                                        fromDynamic={true}
                                                        fieldsList={edit[1]}
                                                        className={`${style.formBuilder} layout-create-ingredients-input`}
                                                        isCreateOrEdit={true}
                                                    />
                                                    <MinusCircleOutlined
                                                        className="delete-icon"
                                                        onClick={() => remove(name)}
                                                    />
                                                </div>
                                            </Col>
                                        ))}

                                        <Col span={24}>
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
                                        </Col>
                                    </>
                                )}
                            </Form.List>
                        </Row>

                        <h2>Etapes</h2>

                        <Row gutter={[48, 48]}>
                            {state.recipe.etapes.map((el, k) => {
                                return (
                                    <Step
                                        elNameKey={el.id}
                                        key={el.id}
                                        removeStep={removeStep}
                                        step={el.step}
                                        uuid={el.id}
                                    />
                                )
                            })}

                            <Form.List name="recipesStep">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                                            <Col key={key} xs={24} md={12} lg={8}>
                                                <div className={`form-builder-input`}>
                                                    <FormBuilder
                                                        formInst={name}
                                                        fromDynamic={true}
                                                        fieldsList={edit[2]}
                                                        className={`${style.formBuilder} layout-create-step-input`}
                                                        isCreateOrEdit={true}
                                                    />
                                                    <MinusCircleOutlined
                                                        className="delete-icon"
                                                        onClick={() => remove(name)}
                                                    />
                                                </div>
                                            </Col>
                                        ))}
                                        <Col span={24}>
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
                                        </Col>
                                    </>
                                )}
                            </Form.List>
                        </Row>

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
