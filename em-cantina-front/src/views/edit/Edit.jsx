import React, { useState, useEffect } from 'react'

import { useHistory, useParams } from 'react-router-dom'

import { Row, Col, Form, Button, Spin } from 'antd'

import { MinusCircleOutlined } from '@ant-design/icons'

import _ from 'lodash'

import edit from '../../fields/edit.json'

import FormBuilder from '../../formBuilder/main'

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
        let recipesFetch = await API.getSpecificRecipe(id)

        let newS = _.cloneDeep(state)
        newS.recipe = recipesFetch
        setState(newS)
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
                    >
                        <FormBuilder
                            fieldsList={edit[0]}
                            className={`${style.formBuilder} layout-edit-input`}
                        />

                        <Ingredient ingredients={state.recipe.ingredients} />

                        <Form.List name="recipes">
                            {(fields, { add, remove }, { errors }) => (
                                <>
                                    <Row>
                                        <Col span={24}>
                                            {fields.map((field, k) => (
                                                <>
                                                    <FormBuilder
                                                        key={k}
                                                        formInst={field}
                                                        fromDynamic={true}
                                                        fieldsList={edit[1]}
                                                        className={`${style.yep} layout-edit-ingredients-input`}
                                                    />
                                                    <MinusCircleOutlined
                                                        className="dynamic-delete-button"
                                                        onClick={() => remove(field.name)}
                                                    />
                                                </>
                                            ))}

                                            <Form.Item>
                                                <Button type="dashed" onClick={() => add()}>
                                                    Ajouter un ingrédient
                                                </Button>
                                                <Form.ErrorList errors={errors} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </>
                            )}
                        </Form.List>

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
                                    <Row>
                                        <Col span={24}>
                                            {fields.map((field, k) => (
                                                <>
                                                    <FormBuilder
                                                        key={k}
                                                        formInst={field}
                                                        fromDynamic={true}
                                                        fieldsList={edit[2]}
                                                        className={`${style.formBuilder} layout-create-step-input`}
                                                    />
                                                    <MinusCircleOutlined
                                                        className="dynamic-delete-button"
                                                        onClick={() => remove(field.name)}
                                                    />
                                                </>
                                            ))}
                                            <Form.Item>
                                                <Button type="dashed" onClick={() => add()}>
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
                    <Spin />
                )}
            </Col>
        </Row>
    )
}

export default Edit
