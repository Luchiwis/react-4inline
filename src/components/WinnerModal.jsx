import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function WinnerModal({ winner, commandClose }) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => {commandClose() ; setShow(false)};
    const handleShow = () => setShow(true);
  
    useEffect(() => {
      if (winner) {
        handleShow()
      }
    }
      , [winner])
  
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className='text-center'>{winner + ' won'}</Modal.Title>
          </Modal.Header>
          {/* <Modal.Body>{'press Close to restart'}</Modal.Body> */}
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }