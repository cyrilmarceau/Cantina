import { MinusCircleOutlined } from '@ant-design/icons'
import { Col, Form, Input, Row } from 'antd'
import React, { useState } from 'react'
import style from './Step.module.scss'

const { TextArea } = Input

const Step = ({ steps }) => {
    const [stepList, setStepList] = useState(steps)

    const removeStep = (el) => {
        setStepList((step) => step.filter((_, i) => el !== _))
    }

    return (
        <>
            <Row gutter={[48, 48]}>
                {stepList.map((el, k) => {
                    return (
                        <Col key={el} xs={24} md={12} lg={8}>
                            <div key={el} className={`form-builder-input`}>
                                <Form.Item
                                    initialValue={el}
                                    label="Etape"
                                    name={['defaultStep', k, 'step']}
                                >
                                    <TextArea placeholder="Etapes" />
                                </Form.Item>
                                <div className={style.deleteIcon}>
                                    <MinusCircleOutlined onClick={() => removeStep(el)} />
                                </div>
                            </div>
                        </Col>
                    )
                })}
            </Row>
        </>
    )
}

export default Step
