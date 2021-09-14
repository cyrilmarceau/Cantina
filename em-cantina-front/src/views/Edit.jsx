import React, { useState, useEffect } from 'react'

import { useHistory, useParams } from 'react-router-dom'

import { Row, Col, Form, Button } from 'antd'

import _ from 'lodash'

import edit from '../fields/edit.json'

import FormBuilder from '../formBuilder/main'

import API from '../libs/API'

const Edit = () => {
    const [state, setState] = useState({
        recipe: null,
    })

    let history = useHistory()
    let { id } = useParams()

    const [form] = Form.useForm()
    const formRef = React.createRef()

    useEffect(() => {
        fetchRecipe()
    }, [])

    const fetchRecipe = async () => {
        let recipesFetch = await API.getSpecificRecipe(id)

        let newS = _.cloneDeep(state)
        newS.recipe = recipesFetch
        setState(newS)
    }

    return (
        <div className="ct-container">
            <Row>
                <Col></Col>
            </Row>
        </div>
    )
}

export default Edit
