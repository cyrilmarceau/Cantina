import React, { useState, useEffect } from 'react'

import { MinusCircleOutlined } from '@ant-design/icons'
import { Col, Form, Input, Row } from 'antd'

import { v4 as uuidv4 } from 'uuid'

import style from './Step.module.scss'

const { TextArea } = Input

const Step = ({ step, removeStep, elNameKey, uuid }) => {
    return (
        <Col xs={24} md={12} lg={8}>
            <div className={`form-builder-input`}>
                <Form.Item initialValue={step} label="Etape" name={['defaultStep', uuid, 'step']}>
                    <TextArea placeholder="Etapes" />
                </Form.Item>
                <div className={style.deleteIcon}>
                    <MinusCircleOutlined onClick={() => removeStep(uuid)} />
                </div>
            </div>
        </Col>
    )
}

export default Step
