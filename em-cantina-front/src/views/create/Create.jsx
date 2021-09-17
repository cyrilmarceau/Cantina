import React from 'react'

import { Form, Button, message, Row, Col } from 'antd'

import { MinusCircleOutlined } from '@ant-design/icons'

import { useHistory } from 'react-router-dom'

import _ from 'lodash'

import create from '../../fields/create.json'

import FormBuilder from '../../components/formBuilder/main'

import FormList from '../../components/formBuilder/FormList/FormList'

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
            let createArrayFromDefaultRecipe = []
            if (!_.isNil(el.type)) {
                createArrayFromDefaultRecipe.push(el.quantity.toString() + el.type, el.contain)
                ingredients.push(createArrayFromDefaultRecipe)
            } else {
                createArrayFromDefaultRecipe.push(el.quantity.toString() + '', el.contain)
                ingredients.push(createArrayFromDefaultRecipe)
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

            <FormList
                name="recipes"
                errorValidator="Veuillez ajouter au moin 1 ingrédient"
                fromDynamic={true}
                fieldsList={create[1]}
                isCreateOrEdit={true}
                messageAdd="Ajouter un ingrédient"
            />

            <FormList
                name="recipesStep"
                errorValidator="Veuillez ajouter au moin 1 étape"
                fromDynamic={true}
                fieldsList={create[2]}
                messageAdd="Ajouter une étape"
            />

            <hr className={style.line} />
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Créer cette étape
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Create
