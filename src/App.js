import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Table, Button, Container, ModalBody, Modal, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import { useState } from 'react';
import ModalComponent from './components/modal/modal';

const data = [
  {id: 1, name: 'Cesar', lastname: 'Vazquez', city: 'Ciudad de México', phone: '888888888' },
  {id: 2, name: 'Amairiani', lastname: 'Enriquez', city: 'Ciudad de México', phone: '77777777' },
  {id: 3, name: 'Cintya', lastname: 'Delgado', city: 'Quintana Roo', phone: '6666666666' },
  {id: 4, name: 'Adrian', lastname: 'Meza', city: 'Jalisco', phone: '5555555555' }
]

const cities = [
  'Ciudad de México',
  'Quintana Roo',
  'Jalisco',
  'Tlaxcala'
]

function App() {

  const [users, setUsers] = useState(data);
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState(0);

  const [userSelected, setUserSelected] = useState({});
  const [userToAdd, setUserToAdd] = useState({
    // id: 0,
    name: '',
    lastname: '',
    phone: 0,
    city: ''
  });

  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);

  const addUser = (e) => {
    //
    const payload = {
      id: users.length + 1,
      ...userToAdd
    }
    
    const modifiedData = users;
    modifiedData.push(payload);
    
    console.log(modifiedData);

    setModalAdd(false)
    setUserToAdd({
      id: '',
      name: '',
      lastname: '',
      phone: 0,
      city: ''
    })
  }

  const handleAddUser = (e) => {
    e.preventDefault();
    const {name, value} = e.target;

    setUserToAdd((prevState)=>({
      ...prevState,
      [name]: value
    }));
  }

  const handleEditUser = (e) => {
    //
    e.preventDefault();

    const {name, value} = e.target;

    if(value !== '') {
      setUserSelected((prevState)=>({
        ...prevState,
        [name]: value
      }));
    }

  }

  const editUser = () => {
    //
    var modifiedData = users;
  
    modifiedData.map(user=>{
      if(user.id===userSelected.id) {
        user.name = userSelected.name;
        user.lastname = userSelected.lastname;
        user.phone = userSelected.phone;
        user.city = userSelected.city;
      }
    });

    setUsers(modifiedData);
    setModalEdit(false);
  }

  const deleteUser = () => {
    //
    setUsers(users.filter(user => user.id !== userSelected.id));
    setModalDelete(false);
  }

  const selectUserAction=(user, option)=> {
    //
    setUserSelected(user);
    (option === 'Edit') ? setModalEdit(true) : setModalDelete(true);
  }

  return (
    <>
      <Container>
        <br/>

        <Button  color="success" onClick={e => setModalAdd(true)}>Agregar Usuario</Button>

        <br/>
        <br/>
        <Table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Ciudad</th>
              <th>Telefono</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr>
                <td>{user.name}</td>
                <td>{user.lastname}</td>
                <td>{user.city}</td>
                <td>{user.phone}</td>
                <td>
                  <Button color='primary' onClick={()=>selectUserAction(user, 'Edit')}>Editar</Button>
                  <Button color='danger'  onClick={()=>selectUserAction(user, 'Delete')} style={{marginLeft: 5}}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal isOpen={modalEdit}>
          <ModalHeader>
            <div>
              <h3>Editar Usuario</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>ID {userSelected && userSelected.id}</label>
              <br />
              <br />

              <label>Nombre</label>
              <input className="form-control" type="text" name="name" value={userSelected && userSelected.name} onChange={handleEditUser}/>
              <br />

              <label>Apellido</label>
              <input className="form-control" type="text" name="lastname" value={userSelected && userSelected.lastname} onChange={handleEditUser}/>
              <br />

              <label>Ciudad</label>
              <select class="form-select" name="city" aria-label="Default select example" onChange={handleEditUser}>
                <option selected>Selecciona una Ciudad</option>
                {cities.map(city => (
                  <option value={city} selected={userSelected  && city == userSelected.city }>{city}</option>
                  ))}
              </select>
              <br />

              <label>Telefono</label>
              <input className="form-control" type="number" name="phone" value={userSelected && userSelected.phone} onChange={handleEditUser}/>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={()=>editUser()}>
              Guardar
            </button>
            <button className="btn btn-danger" onClick={()=>setModalEdit(false)}>
              Cancelar
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modalDelete}>
          <ModalBody>
            ¿Estás seguro de eliminar al usuario {userSelected && userSelected.name}?
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={()=>deleteUser()}>
              Eliminar
            </button>
            <button
              className="btn btn-secondary"
              onClick={()=>setModalDelete(false)}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modalAdd}>
          <ModalHeader>
            <div>
              <h3>Agregar Usuario</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <br />

              <label>Nombre</label>
              <input className="form-control" type="text" name="name" value={userToAdd ? userToAdd.name: ''} onChange={handleAddUser}/>
              <br />
              
              <label>Apellido</label>
              <input className="form-control" type="text" name="lastname" value={userToAdd ? userToAdd.lastname: ''} onChange={handleAddUser}/>
              <br />
              
              <label>Telefono</label>
              <input className="form-control" type="number" name="phone" value={userToAdd ? userToAdd.phone: ''} onChange={handleAddUser}/>
              <br />

              <label>Ciudad</label>
              <select class="form-select" name="city" aria-label="Default select example" onChange={handleAddUser}>
                <option selected>Selecciona una Ciudad</option>
                {cities.map(city => (
                  <option value={city}>{city}</option>
                ))}
            </select>
             
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={()=>addUser()}>
              Agregar
            </button>
            <button className="btn btn-danger" onClick={()=>setModalAdd(false)}>
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
      </Container>
    </>
  );
}

export default App;
