import React from 'react'

import { Card, Modal, message } from 'antd'
import { EditOutlined, DeleteOutlined, UserOutlined, StarFilled } from '@ant-design/icons'

import { Link, useHistory } from 'react-router-dom'

import API from '../../libs/API'

import styles from './Recipe.module.scss'

const { Meta } = Card

const Recipe = ({
    _id,
    _imgSrc,
    _imgAlt,
    _title,
    _description,
    _person,
    _timingPreparation,
    _level,
    _fetchRecipes,
}) => {
    let stars = []

    let history = useHistory()

    switch (_level) {
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

    const deleteRecipe = (recipeName, id) => {
        Modal.confirm({
            content: `Vous vous apprêter à supprimer ${recipeName}. Confirmer la suppression ?`,
            onOk() {
                API.deleteRecipe(id).then(() => {
                    message.success('La suppression a bien été effectué.', 1, _fetchRecipes())
                })
            },
            cancelText: 'Retour',
            okText: 'Oui',
            okType: 'secondary',
        })
    }
    return (
        <Card
            className={styles.cardRecipe}
            cover={
                <Link to={`recipe/${_id}`}>
                    {' '}
                    <img style={{ width: 320 }} alt={_imgAlt} src={_imgSrc} />{' '}
                </Link>
            }
            actions={[
                <EditOutlined
                    onClick={() => history.push(`/recette/edit/${_id}`)}
                    className={styles.edit}
                    key="edit"
                />,
                <DeleteOutlined
                    onClick={() => deleteRecipe(_title, _id)}
                    className={styles.delete}
                    key="delete"
                />,
            ]}
            hoverable={true}
        >
            <Meta title={_title} description={_description} />

            <div className={styles.cardPersonTiming}>
                <div className={styles.userIcon}>
                    <UserOutlined className={styles.icon} />
                    <span>{_person}</span>
                </div>
                <div className={styles.timing}>
                    <span>{_timingPreparation} min</span>
                </div>
            </div>

            <div className={styles.stars}>{stars}</div>
        </Card>
    )
}

Recipe.defaultProps = {
    _imgSrc: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
}

export default Recipe
