import { Form, Input } from 'antd'

import style from './FormNumberInput.module.scss'

const { TextArea } = Input

const FormNumberInput = ({ field, formInst, fromDynamic }) => {
    return (
        <Form.Item
            label={field.displayLabel && field.label}
            name={fromDynamic === true ? [formInst.key, 'step'] : field.key}
            rules={field.rules}
            className={style.inputNumber}
        >
            <TextArea style={{ width: '256px' }} placeholder={field.label} />
        </Form.Item>
    )
}

export default FormNumberInput
