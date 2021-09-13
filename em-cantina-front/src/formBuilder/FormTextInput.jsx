import { Form, Input } from 'antd'

import style from './FormTextInput.module.scss'

const FormTextInput = ({ field }) => {
    return (
        <Form.Item
            label={field.displayLabel && field.label}
            name={field.key}
            rules={field.rules}
        >
            <Input placeholder={field.label} />
        </Form.Item>
    )
}

export default FormTextInput