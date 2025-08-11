import './App.scss';
import Header from './component/Header';
import TableUsers from './component/TableUsers';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <div className='app-container'>
        <Header></Header>
        <Container>
          
          <TableUsers />
        </Container>


      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
