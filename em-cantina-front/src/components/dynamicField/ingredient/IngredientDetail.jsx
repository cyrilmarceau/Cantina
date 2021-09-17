import React, { useState, useContext, useEffect } from 'react'

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

import { Col, Form, Input, InputNumber, Row, Select, Divider } from 'antd'

import OptionsContext from '../../../context/OptionsContext'

const { Option } = Select

const IngredientDetail = ({ el, key, idEl, removeIngredient }) => {
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

    let splitted = el[0].split(/(\d+)/).reduce(
        (acc, curr) => {
            acc[curr.match(/\d+/) ? 0 : 1].push(curr)
            return acc
        },
        [[], []]
    )
    splitted[1].shift()

    return (
        <Col xs={24} md={12} lg={8} key={el[1]}>
            <div className={`form-builder-input`}>
                <Form.Item
                    label="Quantité"
                    initialValue={splitted[0]}
                    name={['defaultRecipe', idEl, 'quantity']}
                >
                    <InputNumber placeholder="Quantité" />
                </Form.Item>

                <Form.Item
                    initialValue={`${splitted[1]}`}
                    label="Type"
                    name={['defaultRecipe', idEl, 'type']}
                >
                    <Select
                        style={{ width: 240 }}
                        placeholder="Ajouter une unité"
                        dropdownRender={(menu) => (
                            <div>
                                {menu}
                                <Divider style={{ margin: '4px 0' }} />
                                <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                                    <Input
                                        style={{ flex: 'auto' }}
                                        value={state.name}
                                        onChange={onNameChange}
                                    />
                                    <a
                                        style={{
                                            flex: 'none',
                                            padding: '8px',
                                            display: 'block',
                                            cursor: 'pointer',
                                        }}
                                        onClick={addItem}
                                    >
                                        <PlusOutlined /> Ajouter une unité
                                    </a>
                                </div>
                            </div>
                        )}
                    >
                        {state.items.map((item) => (
                            <>
                                <Option key={item}>{item}</Option>
                                {/* <Option value={`${splitted[1]}`}>{splitted[1]}</Option> */}
                            </>
                        ))}
                    </Select>
                    {/* <Select>
                        <Option value={`${splitted[1]}`}>{splitted[1]}</Option>
                    </Select> */}
                </Form.Item>

                <Form.Item
                    initialValue={`${el[1]}`}
                    label="Contenu"
                    name={['defaultRecipe', idEl, 'contain']}
                >
                    <Input placeholder="Content" />
                </Form.Item>
                <div>
                    <MinusCircleOutlined onClick={() => removeIngredient(el[1])} />
                </div>
            </div>
        </Col>
    )
}

export default IngredientDetail
