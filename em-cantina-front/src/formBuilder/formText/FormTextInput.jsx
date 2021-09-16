import { Form, Input } from 'antd'

import style from './FormTextInput.module.scss'

const FormTextInput = ({ field, formInst, fromDynamic }) => {
    return (
        <Form.Item
            label={field.displayLabel && field.label}
            name={fromDynamic === true ? [formInst.key, 'contain'] : field.key}
            rules={field.rules}
            className={style.inputContainer}
        >
            <Input className={style.inputText} placeholder={field.label} />
        </Form.Item>
    )
}

export default FormTextInput
