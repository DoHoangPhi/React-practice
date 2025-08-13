import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { putUpdateUser } from '../services.js/UserServices'
import { toast } from 'react-toastify';
const ModalEditUser = (props) => {

    const { show, handleClose, dataUserEdit, handleEditUserModal } = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");

    const handleEdit = async () => {
        let res = await putUpdateUser(name, job);
        if (res && res.updatedAt) {
            handleEditUserModal({
                first_name: name,
                id: dataUserEdit.id
            })
            handleClose();
            toast.success("Update user success");
        }

    }
    useEffect(() => {
        if (show) {
            setName(dataUserEdit.first_name);
        }
    }, [dataUserEdit, show])

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='add-new-user'>
                        <form>
                            <div className="form-group">
                                <label htmlFor="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="form-label">Job</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={job}
                                    onChange={(event) => setJob(event.target.value)}
                                />
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleEdit()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalEditUser