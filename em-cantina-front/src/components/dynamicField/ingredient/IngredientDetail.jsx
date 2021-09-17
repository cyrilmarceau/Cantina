import React from 'react'

import { MinusCircleOutlined } from '@ant-design/icons'

import { Col, Form, Input, InputNumber, Row, Select } from 'antd'

const { Option } = Select

const IngredientDetail = ({ el, key, idEl, removeIngredient }) => {
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
                    <Select>
                        <Option value={`${splitted[1]}`}>{splitted[1]}</Option>
                    </Select>
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
