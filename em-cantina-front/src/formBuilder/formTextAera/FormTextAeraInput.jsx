import { Form, Input } from 'antd'

import style from './FormTextAeraInput.module.scss'

const { TextArea } = Input

const FormNumberInput = ({ field, formInst, fromDynamic }) => {
    return (
        <Form.Item
            label={field.displayLabel && field.label}
            name={fromDynamic === true ? [formInst.key, 'step'] : field.key}
            rules={field.rules}
            className={style.inputNumber}
        >
            <TextArea placeholder={field.label} />
        </Form.Item>
    )
}

export default FormNumberInput
