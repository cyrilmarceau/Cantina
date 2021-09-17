import React from 'react'

import { Form, Button, message, Row, Col } from 'antd'

import { MinusCircleOutlined } from '@ant-design/icons'

import { useHistory } from 'react-router-dom'

import _ from 'lodash'

import create from '../../fields/create.json'

import FormBuilder from '../../components/formBuilder/main'

import API from '../../libs/API'

import style from './Create.module.scss'

const Create = () => {
    let history = useHistory()
    const [form] = Form.useForm()
    const formRef = React.createRef()

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

        if (!_.isEmpty(values.pictureURL) && values.pictureURL.match(/https?:\/\//g)) {
            formatRecipe.photo = values.pictureURL
        }

        API.createRecipe(formatRecipe).then(() => {
            message.success("L'ajout a bien été effectué", 1, history.push('/'))
        })
    }

    return (
        <Form
            initialValues={{ difficulty: 'padawan' }}
            name="dynamic_form_item"
            onFinish={onFinish}
            form={form}
            ref={formRef}
        >
            <Row>
                <Col span={24}>
                    <FormBuilder className="layout-create-input" fieldsList={create[0]} />
                </Col>
            </Row>

            <Form.List
                name="recipes"
                rules={[
                    {
                        validator: async (_, recipes) => {
                            if (!recipes || recipes.length === 0) {
                                return Promise.reject(
                                    new Error('Veuillez ajouter au moin 1 ingrédient')
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
                                                fieldsList={create[1]}
                                                className={`${style.formBuilder} layout-create-ingredients-input`}
                                            />
                                            {fields.length > 1 ? (
                                                <div className={style.deleteIcon}>
                                                    <MinusCircleOutlined
                                                        onClick={() => remove(field.name)}
                                                    />
                                                </div>
                                            ) : null}
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
            <Form.List
                name={['recipesStep']}
                rules={[
                    {
                        validator: async (_, recipesStep) => {
                            if (!recipesStep || recipesStep.length === 0) {
                                return Promise.reject(new Error('Veuillez ajouter au moin 1 étape'))
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
                                                fieldsList={create[2]}
                                                className={`layout-create-step-input`}
                                            />
                                            {fields.length > 1 ? (
                                                <div className={style.deleteIcon}>
                                                    <MinusCircleOutlined
                                                        onClick={() => remove(field.name)}
                                                    />
                                                </div>
                                            ) : null}
                                        </div>
                                    </Col>
                                </>
                            ))}
                            <Col span={24}>
                                <div className={style.btnActionAddIngredient}>
                                    <Form.Item>
                                        <Button type="primary" onClick={() => add()}>
                                            Ajouter une étapes
                                        </Button>
                                        <Form.ErrorList errors={errors} />
                                    </Form.Item>
                                </div>
                            </Col>
                        </Row>
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
