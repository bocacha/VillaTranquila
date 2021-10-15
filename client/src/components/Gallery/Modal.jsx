import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import styles from './Modal.module.css';

export default function Modall({url, description, from}) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <div className={styles.container}>
        <Button className= {styles.btn} variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{description}</Modal.Title>
          </Modal.Header>
          <Modal.Body><img src={url} /></Modal.Body>
          <Modal.Footer>
            <p className={styles.p}>Esta imagen corresponde a la cabaña N° {from} </p>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }