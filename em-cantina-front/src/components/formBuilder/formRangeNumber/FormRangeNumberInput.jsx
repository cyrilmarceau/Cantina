import React from 'react'

import { Input, Form } from 'antd'

import style from './FormRangeNumberInput.module.scss'

const FormRangeNumberInput = ({ field }) => {
    return (
        <div className={`remove-margin ${style.rangeNumberInput}`}>
            <Form.Item
                label={field.displayLabel && field.label}
                name={[field.key, 'min']}
                rules={field.rules}
            >
                <Input placeholder="Minimum" />
            </Form.Item>

            <div className={style.tield}>~</div>

            <Form.Item
                label={field.displayLabel && field.label}
                name={[field.key, 'max']}
                rules={field.rules}
            >
                <Input placeholder="Maximum" />
            </Form.Item>
        </div>
    )
}

export default FormRangeNumberInput
