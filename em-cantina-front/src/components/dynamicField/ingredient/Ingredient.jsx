import React, { useEffect, useState } from 'react'

import { MinusCircleOutlined } from '@ant-design/icons'

import { Col, Form, Input, InputNumber, Row, Select } from 'antd'

import _ from 'lodash'

import IngredientDetail from './IngredientDetail'

import style from './Ingredient.module.scss'

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
                          return (
                              <IngredientDetail
                                  removeIngredient={removeIngredient}
                                  el={el}
                                  key={el[1]}
                                  idEl={key}
                              />
                          )
                      })
                    : null}
            </Row>
        </>
    )
}

export default Ingredient
