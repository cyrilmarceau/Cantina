import { Modal } from 'antd'

const ModalConfirm = ({recipeName}) => {
    return (
        Modal.confirm({
            content: `Vous vous apprêter à supprimer ${recipeName}. Confirmer la suppression ?`,
            onOk() {
                // api.deleteUser(user.id).then((res) => {
                //     if (res.status === 204) {
                //         setState({ ...state, success: true })
                //     }
                //     fetchUsers()
                // })
            },
            cancelText: 'Retour',
            okText: 'Oui',
            okType: 'secondary',
        })
    )
}

export default ModalConfirm
