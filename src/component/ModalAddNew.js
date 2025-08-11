import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateUser } from '../services.js/UserServices';
import { toast } from 'react-toastify';
const ModalAddNew = (props) => {

    const { show, handleClose, handleUpdateTable } = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");
    const handleSave = async () => {
        let res = await postCreateUser(name, job);
        console.log(res);
        if (res && res.id) {
            handleClose();
            setJob('');
            setName('');
            toast.success("Add new user sucess!");
            handleUpdateTable({ first_name: name, id: res.id });
        } else {
            toast.error("Failed to add new user");
        }
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='add-new-user'>
                        <form>
                            <div class="form-group">
                                <label for="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </div>
                            <div class="form-group">
                                <label for="form-label">Job</label>
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
                    <Button variant="primary" onClick={() => handleSave()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalAddNew