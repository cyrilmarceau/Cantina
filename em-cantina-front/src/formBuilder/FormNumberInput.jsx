import { Form, InputNumber } from 'antd'

import style from './FormNumberInput.module.scss'

const FormNumberInput = ({field}) => {
    return (
        <Form.Item
            label={field.displayLabel && field.label}
            name={field.key}
            rules={field.rules}
            className={style.inputNumber}
        >
            <InputNumber
                style={{ width: '256px' }}
                min={field.min}
                max={field.max}
                placeholder={field.label}
                type={field.type}
            />
        </Form.Item>
    )
}

export default FormNumberInput
