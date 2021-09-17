import React, { useState, useContext, useEffect } from 'react'

import { Form, Select, Input, Divider } from 'antd'

import { PlusOutlined } from '@ant-design/icons'

import _ from 'lodash'

import OptionsContext from '../../../context/OptionsContext'

import API from '../../../libs/API'

import style from './FormSelect.module.scss'

const { Option } = Select

const FormSelect = ({ field, formInst, fromDynamic, isCreateOrAdd }) => {
    const { options, setOptions } = useContext(OptionsContext)
    let index = 0

    const [state, setState] = useState({
        items: options,
        name: '',
    })

    const onNameChange = (event) => {
        setState({ ...state, name: event.target.value })
    }

    const addItem = (e) => {
        setOptions([...options, state.name])

        setState((prevState) => ({
            items: [...prevState.items, prevState.name || `Ajouter une unité ${index++}`],
            name: '',
        }))
    }

    // Get options from localStorage
    // If user refresh the page, he don't lost his unity
    // const getOptionsLS = () => {
    //     let opts = API.utils.getOptionsLs('options')
    //     console.log(opts)
    //     setState((prevState) => ({
    //         items: [prevState.items, opts],
    //     }))
    // }

    // useEffect(() => {
    //     getOptionsLS()
    // }, [])
    return (
        <Form.Item
            label={field.displayLabel && field.label}
            name={fromDynamic === true ? [formInst.key, 'type'] : field.key}
            rules={field.rules}
            className={style.ctSelectInput}
        >
            {isCreateOrAdd === true && !_.isNil(options) ? (
                <Select
                    style={{ width: 240 }}
                    placeholder="Ajouter une unité"
                    dropdownRender={(menu) => (
                        <div>
                            {menu}
                            <Divider style={{ margin: '4px 0' }} />
                            <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                                <Input
                                    style={{ flex: 'auto' }}
                                    value={state.name}
                                    onChange={onNameChange}
                                />
                                <a
                                    style={{
                                        flex: 'none',
                                        padding: '8px',
                                        display: 'block',
                                        cursor: 'pointer',
                                    }}
                                    onClick={addItem}
                                >
                                    <PlusOutlined /> Ajouter une unité
                                </a>
                            </div>
                        </div>
                    )}
                >
                    {state.items.map((item) => (
                        <Option key={item}>{item}</Option>
                    ))}
                </Select>
            ) : (
                <Select>
                    {field.options.map((el, k) => {
                        return (
                            <Option key={k} value={el.key}>
                                {el.value}
                            </Option>
                        )
                    })}
                </Select>
            )}
        </Form.Item>
    )
}

export default FormSelect
