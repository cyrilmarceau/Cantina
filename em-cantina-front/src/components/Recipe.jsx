import React from 'react'

import { Card, Avatar } from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'

const { Meta } = Card

const Recipe = ({ _imgSrc, _imgAlt, _title, _description }) => {
    return (
        <Card
            style={{ width: 300 }}
            cover={<img alt={_imgAlt} src={_imgSrc} />}
            actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
            ]}
        >
            <Meta title={_title} description={_description} />
        </Card>
    )
}

Recipe.defaultProps = {
    _imgSrc: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
}

export default Recipe
