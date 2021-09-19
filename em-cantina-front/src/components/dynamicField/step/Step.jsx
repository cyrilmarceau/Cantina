import React from 'react'

import { MinusCircleOutlined } from '@ant-design/icons'
import { Col, Form, Input } from 'antd'

const { TextArea } = Input

const Step = ({ step, removeStep, elNameKey, uuid }) => {
    return (
        <Col xs={24} md={12} lg={8}>
            <div className={`form-builder-input`}>
                <Form.Item
                    initialValue={step}
                    label="Etape"
                    name={['defaultStep', uuid, 'step']}
                    rules={[
                        {
                            required: true,
                            message: 'Veuillez remplir le champ étape',
                        },
                    ]}
                >
                    <TextArea placeholder="Etapes" />
                </Form.Item>
                <div>
                    <MinusCircleOutlined className="delete-icon" onClick={() => removeStep(uuid)} />
                </div>
            </div>
        </Col>
    )
}

export default Step
