import React from 'react'

import { Form, Button, message } from 'antd'

import { MinusCircleOutlined } from '@ant-design/icons'

import { useHistory } from 'react-router-dom'

import create from '../fields/create.json'

import FormBuilder from '../formBuilder/main'

import API from '../libs/API'

import _ from 'lodash'

const Create = () => {
    let history = useHistory()

    const onFinish = (values) => {
        let formatRecipe = {}
        let formatIngredient = []
        let ingredients = []
        let steps = []

        // Format to array
        values.recipes.forEach((el) => {
            if (!_.isNil(el.type)) {
                ingredients.push(el.quantity.toString() + el.type, el.contain)
            } else {
                ingredients.push(el.quantity.toString() + '', el.contain)
            }
        })
        values.recipesStep.forEach((el) => {
            steps.push(el.step)
        })

        formatIngredient.push(ingredients)

        // Format to JSON
        formatRecipe.titre = values.title
        formatRecipe.description = values.description
        formatRecipe.niveau = values.difficulty
        formatRecipe.personnes = values.people
        formatRecipe.tempsPreparation = values.preparationTime
        formatRecipe.ingredients = formatIngredient
        formatRecipe.etapes = steps
        console.log(values)
        API.createRecipe(formatRecipe).then(() => {
            message.success("L'ajout a bien été effectué", 1, history.push('/'))
        })
    }

    return (
        <Form
            initialValues={{ difficulty: 'padawan' }}
            name="dynamic_form_item"
            onFinish={onFinish}
        >
            <FormBuilder fieldsList={create[2]} />
            <Form.List
                name="recipes"
                rules={[
                    {
                        validator: async (_, recipes) => {
                            if (!recipes || recipes.length === 0) {
                                return Promise.reject(
                                    new Error('Veuillez ajouter au moin 1 ingrédient.')
                                )
                            }
                        },
                    },
                ]}
            >
                {(fields, { add, remove }, { errors }) => (
                    <>
                        {fields.map((field, k) => (
                            <>
                                <FormBuilder
                                    key={k}
                                    formInst={field}
                                    fromDynamic={true}
                                    fieldsList={create[0]}
                                />
                                {fields.length > 1 ? (
                                    <MinusCircleOutlined
                                        className="dynamic-delete-button"
                                        onClick={() => remove(field.name)}
                                    />
                                ) : null}
                            </>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()}>
                                Ajouter un ingrédient
                            </Button>
                            <Form.ErrorList errors={errors} />
                        </Form.Item>
                    </>
                )}
            </Form.List>
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
                        {fields.map((field, k) => (
                            <>
                                <FormBuilder
                                    key={k}
                                    formInst={field}
                                    fromDynamic={true}
                                    fieldsList={create[1]}
                                />
                                {fields.length > 1 ? (
                                    <MinusCircleOutlined
                                        className="dynamic-delete-button"
                                        onClick={() => remove(field.name)}
                                    />
                                ) : null}
                            </>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()}>
                                Ajouter une étape
                            </Button>
                            <Form.ErrorList errors={errors} />
                        </Form.Item>
                    </>
                )}
            </Form.List>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Create
