import React from 'react'

import { Form, Select } from 'antd'

import style from './FormSelect.module.scss'

const { Option } = Select

const FormSelect = ({ field, formInst, fromDynamic }) => {
    return (
        <Form.Item
            label={field.displayLabel && field.label}
            name={fromDynamic === true ? [formInst.key, 'type'] : field.key}
            rules={field.rules}
            className={style.ctSelectInput}
        >
            <Select>
                {field.options.map((el, k) => {
                    return (
                        <Option key={k} value={el.key}>
                            {el.value}
                        </Option>
                    )
                })}
            </Select>
        </Form.Item>
    )
}

export default FormSelect
