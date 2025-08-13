import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services.js/UserServices';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import ModalConfirm from './ModalConfirm';
import './TableUser.scss';
import _, { debounce } from "lodash"
const TableUsers = (props) => {
    const [listUsers, setListUsers] = useState([]);
    // const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPgaes] = useState(0);
    const [isShowModalAddNew, setIsModalAddNew] = useState(false);
    const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState([]);
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataUserDelete, setDataUserDelete] = useState([]);
    const [sortBy, setSortBy] = useState('asc');
    const [sortField, setSortField] = useState('id');
    const [keyword, setKeyword] = useState("");


    const handleClose = () => {
        setIsModalAddNew(false);
        setIsShowModalEditUser(false);
        setIsShowModalDelete(false);
    }
    const handleUpdateTable = (user) => {
        setListUsers([user, ...listUsers]);
    }
    const handleEditUserModal = (user) => {
        let cloneListUser = _.cloneDeep(listUsers);
        let index = listUsers.findIndex(item => item.id === user.id);
        cloneListUser[index].first_name = user.first_name;
        setListUsers(cloneListUser);

    }
    useEffect(() => {
        getUsers(1);
    }, [])

    const getUsers = async (page) => {
        let res = await fetchAllUser(page);
        if (res && res.data) {
            // setTotalUsers(res.total);
            setListUsers(res.data)
            setTotalPgaes(res.total_pages);
        }
    }
    const handlePageClick = (event) => {
        getUsers(+event.selected + 1);
    }
    const handleEditUser = (user) => {
        setDataUserEdit(user);
        setIsShowModalEditUser(true);

    }
    const handleDelteUser = (user) => {
        setIsShowModalDelete(true);
        setDataUserDelete(user);
    }
    const handleDeleteUserFromModal = (user) => {
        let cloneListUser = _.cloneDeep(listUsers);
        cloneListUser = cloneListUser.filter(item => item.id !== user.id);
        setListUsers(cloneListUser);
    }
    const handleSort = (sortby, sortfield) => {
        setSortBy(sortby);
        setSortField(sortfield);

        let cloneListUser = _.cloneDeep(listUsers);
        cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
        setListUsers(cloneListUser);
    }
    const heandleSeach = debounce((event) => {
        let temp = event.target.value;
        
        if (temp) {
            let cloneListUser = _.cloneDeep(listUsers);
            cloneListUser = cloneListUser.filter(item => item.email.includes(temp));
            setListUsers(cloneListUser);
        } else {
            getUsers(1);
        }

    }, 2000)
    return (<>
        <div className='my-3 add-new'>
            <span>List User</span>
            <button className='btn btn-success' onClick={() => {
                setIsModalAddNew(true)
            }}>Add User</button>
        </div>
        <div className='col-4 my-4'>
            <input
                className='form-control'
                placeholder='Search user by email.....'
                // value={keyword}
                onChange={(event) => heandleSeach(event)}
            />
        </div>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>
                        <div className='sort-header'>
                            <span>ID</span>
                            <span><i className="fa-solid fa-arrow-down"
                                onClick={() => handleSort('desc', 'id')}></i>
                                <i className="fa-solid fa-arrow-up"
                                    onClick={() => handleSort('asc', 'id')}></i></span>
                        </div>
                    </th>
                    <th>Email</th>
                    <th>
                        <div className='sort-header'>
                            <span>First Name</span>
                            <span><i className="fa-solid fa-arrow-down"
                                onClick={() => handleSort('desc', 'first_name')}></i>
                                <i className="fa-solid fa-arrow-up"
                                    onClick={() => handleSort('asc', 'first_name')}></i></span>
                        </div>
                    </th>
                    <th>Last Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {listUsers && listUsers.length > 0 &&
                    listUsers.map((item, index) => {
                        return (
                            <tr key={`users - ${index}`}>
                                <td>{item.id}</td>
                                <td>{item.email}</td>
                                <td>
                                    {item.first_name}
                                </td>
                                <td>{item.last_name}</td>
                                <td>
                                    <button className='btn btn-warning mx-2'
                                        onClick={() => handleEditUser(item)}>
                                        Edit
                                    </button>
                                    <button
                                        className='btn btn-danger mx-2'
                                        onClick={() => handleDelteUser(item)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })}

            </tbody>
        </Table>
        <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
        />
        <ModalAddNew
            show={isShowModalAddNew}
            handleClose={handleClose}
            handleUpdateTable={handleUpdateTable}
            backdrop="static"
            keyboard={false}
        />

        <ModalEditUser
            show={isShowModalEditUser}
            dataUserEdit={dataUserEdit}
            handleClose={handleClose}
            handleEditUserModal={handleEditUserModal}

        />
        <ModalConfirm
            show={isShowModalDelete}
            handleClose={handleClose}
            handleEditUserModal={handleEditUserModal}
            dataUserDelete={dataUserDelete}
            handleDeleteUserFromModal={handleDeleteUserFromModal}
        />
    </>)
}

export default TableUsers;