import React, { useState, useEffect } from 'react'

import { useParams, useHistory } from 'react-router-dom'

import { Row, Col, Spin, Button, Modal, message } from 'antd'

import { StarFilled, FieldTimeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'

import _ from 'lodash'

import API from '../../libs/API'

import style from './Detail.module.scss'

const Detail = () => {
    let { id } = useParams()
    let history = useHistory()

    const [state, setState] = useState({
        recipe: null,
    })

    useEffect(() => {
        fetchRecipe()
    }, [])

    const fetchRecipe = async () => {
        try {
            let recipesFetch = await API.getSpecificRecipe(id)
            let newS = _.cloneDeep(state)
            newS.recipe = recipesFetch
            setState(newS)
        } catch (e) {
            if (e.response.data.errorMessage === 'Aucune recette trouvée') {
                message
                    .error(
                        "La page recherché n'existe pas vous allez être rediriger dans 2 secondes",
                        2
                    )
                    .then(() => {
                        history.push('/')
                    })
            }
        }
    }

    const deleteRecipe = (recipeName, id) => {
        Modal.confirm({
            content: `Vous vous apprêter à supprimer ${recipeName}. Confirmer la suppression ?`,
            onOk() {
                API.deleteRecipe(id).then(() => {
                    message.success('La suppression a bien été effectué.', 1, () =>
                        history.push('/')
                    )
                })
            },
            cancelText: 'Retour',
            okText: 'Oui',
            okType: 'secondary',
        })
    }

    let stars = []

    if (!_.isNil(state.recipe)) {
        switch (state.recipe.niveau) {
            case 'padawan':
                stars.push(<StarFilled />)
                break

            case 'jedi':
                stars.push(<StarFilled />, <StarFilled />, <StarFilled />)
                break
            case 'maitre':
                stars.push(
                    <StarFilled />,
                    <StarFilled />,
                    <StarFilled />,
                    <StarFilled />,
                    <StarFilled />
                )
                break

            default:
                break
        }
    }

    return (
        <Row gutter={[16, 16]}>
            {!_.isNil(state.recipe) ? (
                <>
                    <Col span={24}>
                        <h1>{state.recipe.titre}</h1>
                        <h2 className={style.description}>{state.recipe.description}</h2>
                    </Col>

                    <Col span={24}>
                        <div className={style.additionalInformations}>
                            <div className={style.stars}>
                                <span>{stars}</span>
                            </div>
                            <div className={style.people}>
                                <span className={style.numberPeople}>{state.recipe.personnes}</span>
                                <span>
                                    {state.recipe.personnes === 1 ? 'personne' : 'personnes'}
                                </span>
                            </div>
                        </div>
                        <div className={style.hours}>
                            <FieldTimeOutlined />
                            <span>{API.format.convertTime(state.recipe.tempsPreparation)}</span>
                        </div>
                    </Col>

                    <Col xs={24} lg={12}>
                        <img
                            className={style.recipeImg}
                            src={
                                state.recipe.photo ||
                                'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
                            }
                            alt={state.recipe.description}
                        />
                    </Col>
                    <Col xs={24} lg={12}>
                        <div className={style.ingredients}>
                            <h3 className={style.title}>Ingrédients</h3>
                            {state.recipe.ingredients.map((el, k) => {
                                return (
                                    <ul key={k}>
                                        <li className={style.listIngredients}>
                                            {el.map((el, k) => {
                                                if (el === '') {
                                                    return null
                                                } else {
                                                    return <span key={k}>{el}</span>
                                                }
                                            })}
                                        </li>
                                    </ul>
                                )
                            })}
                        </div>

                        <div className={style.steps}>
                            <h3 className={style.title}>Etapes</h3>
                            <ol>
                                {state.recipe.etapes.map((el, k) => (
                                    <li key={k}>{el}</li>
                                ))}
                            </ol>
                        </div>

                        <div>
                            <Button
                                type="primary"
                                className={style.editBtn}
                                icon={<EditOutlined />}
                                size="middle"
                                onClick={() => history.push(`/recette/edit/${state.recipe.id}`)}
                            >
                                Editer
                            </Button>
                            <Button
                                type="primary"
                                danger
                                icon={<DeleteOutlined />}
                                size="middle"
                                onClick={() => deleteRecipe(state.recipe.titre, state.recipe.id)}
                            >
                                Supprimer
                            </Button>
                        </div>
                    </Col>
                </>
            ) : (
                <Spin className="loading-icon" />
            )}
        </Row>
    )
}

export default Detail
