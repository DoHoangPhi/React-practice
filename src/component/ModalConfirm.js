import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {deleteUser} from '../services.js/UserServices'
import { toast } from 'react-toastify';
const ModalConfirm = (props) => {

    const { show, handleClose, dataUserDelete, handleDeleteUserFromModal } = props;


    const confirmDelete = async () => {
        let res = await deleteUser(dataUserDelete.id);
        if(res && +res.statusCode === 204)
        {
            toast.success("Delete user success!");
            handleClose();
            handleDeleteUserFromModal(dataUserDelete);
        }else{
            toast.error("error delete user");
        }
        console.log(res);
        
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='add-new-user'>
                        <p>This action can't be undo!Do you want to delete this user</p>
                        <b>email: "{dataUserDelete.email}"?</b>
                        
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => confirmDelete()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalConfirm