import { MinusCircleOutlined } from '@ant-design/icons'
import { Col, Form, Input, InputNumber, Row, Select } from 'antd'
import _ from 'lodash'
import React, { useState } from 'react'
import style from './Ingredient.module.scss'

const { Option } = Select

const Ingredient = ({ ingredients }) => {
    const [ingredientList, setIngredientList] = useState(ingredients)

    const removeIngredient = (el) => {
        setIngredientList((ing) => ing.filter((_, i) => el !== _[1]))
    }

    return (
        <>
            <Row gutter={[48, 48]} className={style.container}>
                {!_.isEmpty(ingredientList)
                    ? ingredientList.map((el, key) => {
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
                                          name={[key, 'quantity']}
                                      >
                                          <InputNumber placeholder="Quantité" />
                                      </Form.Item>

                                      <Form.Item
                                          initialValue={`${splitted[1]}`}
                                          label="Type"
                                          name={[key, 'type']}
                                      >
                                          <Select>
                                              <Option value={`${splitted[1]}`}>
                                                  {splitted[1]}
                                              </Option>
                                          </Select>
                                      </Form.Item>

                                      <Form.Item
                                          label="Contenu"
                                          rules={[
                                              {
                                                  required: true,
                                                  message: 'Veuillez remplir le champ quantité',
                                              },
                                          ]}
                                          name={[key, 'contain']}
                                      >
                                          <Input defaultValue={`${el[1]}`} placeholder="Content" />
                                      </Form.Item>
                                      <div className={style.deleteIcon}>
                                          <MinusCircleOutlined
                                              onClick={() => removeIngredient(el[1])}
                                          />
                                      </div>
                                  </div>
                              </Col>
                          )
                      })
                    : null}
            </Row>
        </>
    )
}

export default Ingredient
