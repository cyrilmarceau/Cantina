import React from 'react'

import { Form, Button } from 'antd'

import { MinusCircleOutlined } from '@ant-design/icons'

import create from '../fields/create.json'

import FormBuilder from '../formBuilder/main'

console.log(create)

const Create = () => {
    const onFinish = (values) => {
        console.log('Received values of form:', values)
    }

    return (
        <Form name="dynamic_form_item" onFinish={onFinish}>
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
                name={['recipes', 'recipesStep']}
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
