import 'bootstrap/dist/css/bootstrap.min.css';
import {  Table, Button, Container, ModalBody, Modal, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import { useState } from 'react';

function ModalComponent() {
    return (
        <>
         <Modal>
            <ModalHeader>
                <div><h2>Agregar Usuario</h2></div>
            </ModalHeader>
            <ModalBody>
                <FormGroup>
                    <label>Nombre:</label>
                    <input className='form-control' name='name' type='text'/>
                </FormGroup>
                <FormGroup>
                    <label>Apellido:</label>
                    <input className='form-control' name='lastname' type='text'/>
                </FormGroup>
                <FormGroup>
                    <label>Telefono:</label>
                    <input className='form-control' name='pphone' type='phone'/>
                </FormGroup>
            </ModalBody>
         </Modal>
        </>
    );
}

export default ModalComponent;
