import React from 'react'

import { Input, Form } from 'antd'

import style from './FormRangeNumberInput.module.scss'

const FormRangeNumberInput = ({ field }) => {
    return (
        <>
            <Form.Item
                label={field.displayLabel && field.label}
                name={[field.key, 'min']}
                rules={field.rules}
            >
                <Input
                    style={{
                        width: 100,
                        textAlign: 'center',
                    }}
                    placeholder="Minimum"
                />
            </Form.Item>

            <div className={style.tield}>~</div>

            <Form.Item
                label={field.displayLabel && field.label}
                name={[field.key, 'max']}
                rules={field.rules}
            >
                <Input
                    style={{
                        width: 100,
                        textAlign: 'center',
                    }}
                    placeholder="Maximum"
                />
            </Form.Item>
        </>
    )
}

export default FormRangeNumberInput
