import React from 'react'

import { Card } from 'antd'
import { EditOutlined, DeleteOutlined, UserOutlined, StarFilled } from '@ant-design/icons'

import styles from './Recipe.module.scss'

const { Meta } = Card

const Recipe = ({
    _imgSrc,
    _imgAlt,
    _title,
    _description,
    _person,
    _timingPreparation,
    _level,
}) => {
    let stars = []

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
    return (
        <Card
            className={styles.cardRecipe}
            cover={<img alt={_imgAlt} src={_imgSrc} />}
            actions={[
                <EditOutlined className={styles.edit} key="edit" />,
                <DeleteOutlined className={styles.delete} key="delete" />,
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
