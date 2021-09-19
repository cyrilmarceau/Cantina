import React, { useState, useEffect, useContext } from 'react'

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

import { Col, Form, Input, InputNumber, Select, Divider, Button } from 'antd'

import _ from 'lodash'

import OptionsContext from '../../../context/OptionsContext'

import style from './Ingredient.module.scss'

const { Option } = Select

const Ingredient = ({ ingredient, removeIngredient, uuid }) => {
    const { options, setOptions } = useContext(OptionsContext)

    let index = 0
    const [state, setState] = useState({
        items: options,
        name: '',
    })

    const onNameChange = (event) => {
        setState({ ...state, name: event.target.value })
    }

    const addItem = (e) => {
        setOptions([...options, state.name])

        setState((prevState) => ({
            items: [...prevState.items, prevState.name || `Ajouter une unité ${index++}`],
            name: '',
        }))
    }

    let splitted = ingredient[0].split(/(\d+)/).reduce(
        (acc, curr) => {
            acc[curr.match(/\d+/) ? 0 : 1].push(curr)
            return acc
        },
        [[], []]
    )
    splitted[1].shift()

    return (
        <>
            {!_.isEmpty(ingredient) ? (
                <Col xs={24} md={12} lg={8}>
                    <div className={`form-builder-input`}>
                        <Form.Item
                            label="Quantité"
                            initialValue={splitted[0]}
                            name={['defaultRecipe', uuid, 'quantity']}
                        >
                            <InputNumber placeholder="Quantité" />
                        </Form.Item>

                        <Form.Item
                            initialValue={`${splitted[1]}`}
                            label="Type"
                            name={['defaultRecipe', uuid, 'type']}
                        >
                            <Select
                                style={{ width: 240 }}
                                placeholder="Ajouter une unité"
                                dropdownRender={(menu) => (
                                    <div>
                                        {menu}
                                        <Divider style={{ margin: '4px 0' }} />
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexWrap: 'nowrap',
                                                padding: 8,
                                            }}
                                        >
                                            <Input
                                                style={{ flex: 'auto' }}
                                                value={state.name}
                                                onChange={onNameChange}
                                            />
                                            <Button
                                                type="primary"
                                                shape="round"
                                                icon={<PlusOutlined />}
                                                size="small"
                                                onClick={addItem}
                                            >
                                                Ajouter une unité
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            >
                                {state.items.map((item) => (
                                    <>
                                        <Option key={item}>{item}</Option>
                                    </>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            initialValue={ingredient[1]}
                            label="Contenu"
                            name={['defaultRecipe', uuid, 'contain']}
                            rules={[
                                {
                                    required: true,
                                    message: 'Veuillez spécifier un contenu',
                                },
                            ]}
                        >
                            <Input placeholder="Content" />
                        </Form.Item>
                        <div>
                            <MinusCircleOutlined onClick={() => removeIngredient(uuid)} />
                        </div>
                    </div>
                </Col>
            ) : null}
        </>
    )
}

export default Ingredient
