import React from 'react'

import { Form, Button, message, Row, Col } from 'antd'

import { MinusCircleOutlined } from '@ant-design/icons'

import FormBuilder from '../main'

const FormList = ({
    name,
    errorValidator,
    fromDynamic,
    fieldsList,
    isCreateOrEdit,
    messageAdd,
}) => {
    return (
        <Form.List name={name}>
            {(fields, { add, remove }, { errors }) => (
                <>
                    <Row gutter={[48, 48]}>
                        {fields.map((field, k) => (
                            <Col xs={24} md={12} lg={8}>
                                <div className={`form-builder-input`}>
                                    <FormBuilder
                                        formInst={field}
                                        fromDynamic={fromDynamic}
                                        fieldsList={fieldsList}
                                        className={`layout-create-ingredients-input`}
                                        isCreateOrEdit={isCreateOrEdit}
                                    />
                                    {fields.length > 1 ? (
                                        <div>
                                            <MinusCircleOutlined
                                                onClick={() => remove(field.name)}
                                            />
                                        </div>
                                    ) : null}
                                </div>
                            </Col>
                        ))}
                        <Col span={24}>
                            <div>
                                <Form.Item>
                                    <Button type="primary" onClick={() => add()}>
                                        {messageAdd}
                                    </Button>
                                    <Form.ErrorList errors={errors} />
                                </Form.Item>
                            </div>
                        </Col>
                    </Row>
                </>
            )}
        </Form.List>
    )
}

export default FormList
