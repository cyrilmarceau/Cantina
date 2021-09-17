import { Form, InputNumber } from 'antd'

import style from './FormNumberInput.module.scss'

const FormNumberInput = ({ field, formInst, fromDynamic }) => {
    return (
        <Form.Item
            label={field.displayLabel && field.label}
            name={fromDynamic === true ? [formInst.key, 'quantity'] : field.key}
            rules={field.rules}
        >
            <InputNumber
                min={field.min}
                max={field.max}
                placeholder={field.label}
                type={field.type}
            />
        </Form.Item>
    )
}

export default FormNumberInput
