import { Form, Input } from 'antd'

import style from './FormTextInput.module.scss'

const FormTextInput = ({ field, formInst, fromDynamic }) => {
    return (
        <Form.Item
            label={field.displayLabel && field.label}
            name={fromDynamic === true ? [formInst, 'contain'] : field.key}
            rules={field.rules}
            className={style.inputContainer}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            rules={
                field.checkPatern
                    ? [
                          {
                              required: false,
                          },
                          {
                              pattern: /https?:\/\//g,
                              message: 'Le format dois correspondre à http:// ou https://',
                          },
                      ]
                    : field.rules
            }
        >
            <Input className={style.inputText} placeholder={field.label} />
        </Form.Item>
    )
}

export default FormTextInput
