import React, { useState, useEffect } from 'react'

import { useHistory, useParams } from 'react-router-dom'

import { Row, Col, Form, Button, Spin, message } from 'antd'

import { MinusCircleOutlined } from '@ant-design/icons'

import _ from 'lodash'

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
                    >
                        <FormBuilder fieldsList={edit[0]} className={`layout-edit-input`} />

                        <h2>Ingredients</h2>
                        <Ingredient ingredients={state.recipe.ingredients} />

                        <Form.List name="recipes">
                            {(fields, { add, remove }, { errors }) => (
                                <>
                                    <Row gutter={[48, 48]}>
                                        {fields.map((field, k) => (
                                            <>
                                                <Col xs={24} md={12} lg={8}>
                                                    <div className={`form-builder-input`}>
                                                        <FormBuilder
                                                            key={k}
                                                            formInst={field}
                                                            fromDynamic={true}
                                                            fieldsList={edit[1]}
                                                        />
                                                        <div className={style.deleteIcon}>
                                                            <MinusCircleOutlined
                                                                onClick={() => remove(field.name)}
                                                            />
                                                        </div>
                                                    </div>
                                                </Col>
                                            </>
                                        ))}

                                        <Col span={24}>
                                            <div className={style.btnActionAddIngredient}>
                                                <Form.Item>
                                                    <Button type="primary" onClick={() => add()}>
                                                        Ajouter un ingrédient
                                                    </Button>
                                                    <Form.ErrorList errors={errors} />
                                                </Form.Item>
                                            </div>
                                        </Col>
                                    </Row>
                                </>
                            )}
                        </Form.List>

                        <h2>Etapes</h2>
                        <Step steps={state.recipe.etapes} />

                        <Form.List
                            name={['recipesStep']}
                            rules={[
                                {
                                    validator: async (_, recipesStep) => {
                                        if (!recipesStep || recipesStep.length === 0) {
                                            return Promise.reject(
                                                new Error('Veuillez ajouter au moin 1 étape.')
                                            )
                                        }
                                    },
                                },
                            ]}
                        >
                            {(fields, { add, remove }, { errors }) => (
                                <>
                                    <Row gutter={[48, 48]}>
                                        {fields.map((field, k) => (
                                            <>
                                                <Col xs={24} md={12} lg={8}>
                                                    <div className={`form-builder-input`}>
                                                        <FormBuilder
                                                            key={k}
                                                            formInst={field}
                                                            fromDynamic={true}
                                                            fieldsList={edit[2]}
                                                        />
                                                        <div className={style.deleteIcon}>
                                                            <MinusCircleOutlined
                                                                onClick={() => remove(field.name)}
                                                            />
                                                        </div>
                                                    </div>
                                                </Col>
                                            </>
                                        ))}
                                        <Col span={24}>
                                            <Form.Item>
                                                <Button
                                                    type="primary"
                                                    className={style.btnActionAddStep}
                                                    onClick={() => add()}
                                                >
                                                    Ajouter une étape
                                                </Button>
                                                <Form.ErrorList errors={errors} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </>
                            )}
                        </Form.List>
                    </Form>
                ) : (
                    <Spin className="loading-icon" />
                )}
            </Col>
        </Row>
    )
}

export default Edit
