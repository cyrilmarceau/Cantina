import React from 'react'

import { Form, Button, message, Row, Col, Space, Input } from 'antd'

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

import { useHistory } from 'react-router-dom'

import _ from 'lodash'

import { v4 as uuidv4 } from 'uuid'

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
        let ingredients = []
        let steps = []

        // Format to array
        values.recipes.forEach((el) => {
            let arrayForIngredient = []
            if (!_.isNil(el.type)) {
                arrayForIngredient.push(el.quantity.toString() + el.type, el.contain)
                ingredients.push(arrayForIngredient)
            } else {
                arrayForIngredient.push(el.quantity.toString() + '', el.contain)
                ingredients.push(arrayForIngredient)
            }
        })
        values.recipesStep.forEach((el) => {
            steps.push(el.step)
        })

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
        console.log('create', formatRecipe)
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
                                                fieldsList={create[1]}
                                                className={`${style.formBuilder} layout-create-ingredients-input`}
                                                isCreateOrAdd={true}
                                            />
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </Space>
                                    </div>
                                </Col>
                            ))}
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
                        </Row>
                    </>
                )}
            </Form.List>

            <hr className={style.line} />

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
                                                fieldsList={create[2]}
                                                className={`${style.formBuilder} layout-create-step-input`}
                                                isCreateOrAdd={true}
                                            />
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </Space>
                                    </div>
                                </Col>
                            ))}
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
                        </Row>
                    </>
                )}
            </Form.List>

            <hr className={style.line} />
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Créer cette recette
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Create
