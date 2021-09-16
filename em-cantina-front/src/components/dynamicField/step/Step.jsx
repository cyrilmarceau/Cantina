import React, { useState } from 'react'

import { Form, Row, Col, Input, Button } from 'antd'

import { MinusCircleOutlined } from '@ant-design/icons'

import style from './Step.module.scss'

const { TextArea } = Input

const Step = ({ steps }) => {
    const [stepList, setStepList] = useState(steps)

    const removeStep = (el) => {
        setStepList((step) => step.filter((_, i) => el !== _))
    }

    return (
        <>
            {stepList.map((el, k) => {
                return (
                    <div key={el} className={`${style.layoutCreateStepsInput} input-step`}>
                        <Form.Item className={`${style.input}`} label="Etape" name="step">
                            <TextArea defaultValue={el} placeholder="Etapes" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => removeStep(el)} />
                    </div>
                )
            })}
        </>
    )
}

export default Step
