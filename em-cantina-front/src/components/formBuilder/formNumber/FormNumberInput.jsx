import { Form, InputNumber } from 'antd'

const FormNumberInput = ({ field, formInst, fromDynamic }) => {
    return (
        <Form.Item
            label={field.displayLabel && field.label}
            name={fromDynamic === true ? [formInst, 'quantity'] : field.key}
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
