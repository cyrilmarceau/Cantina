import React, { useState, useEffect } from 'react'

import { Form, Row, Col, Button, InputNumber, Input, Select, Spin } from 'antd'

import { MinusCircleOutlined } from '@ant-design/icons'

import _ from 'lodash'

import style from './Ingredient.module.scss'

const { TextArea } = Input

const { Option } = Select

const Ingredient = ({ ingredients }) => {
    const [ingredientList, setIngredientList] = useState(ingredients)

    const removeIngredient = (el) => {
        setIngredientList((ing) => ing.filter((_, i) => el !== _[1]))
    }

    return (
        <>
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
                          <div key={el[1]} className={`layout-create-ingredients-input`}>
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
                                      <Option value={`${splitted[1]}`}>{splitted[1]}</Option>
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
                              <MinusCircleOutlined onClick={() => removeIngredient(el[1])} />
                          </div>
                      )
                  })
                : null}
        </>
    )
}

export default Ingredient
