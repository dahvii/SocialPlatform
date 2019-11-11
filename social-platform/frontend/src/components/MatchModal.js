import React from 'react';
import { Image } from 'react-bootstrap'
import { Button, Modal,  ModalBody, ModalFooter } from 'reactstrap';
import '../css/MatchModal.css';


export default function MatchModal (props) {
  const toggle = () => props.callback();

  return (
    <div>
      <Modal isOpen={props.show} toggle={toggle} className="match-modal">
        <ModalBody className="modal-color">
          <div className="profile-picture-container">
          <Image src="https://i.pravatar.cc/220" alt="profile-picture" roundedCircle className="profile-picture" />
          </div>
          <h1>It's a match!</h1>
          <p>It seems like you two would get along just fine! Start a conversation before this hottie gets other stuff to do!</p>
        </ModalBody>
        <ModalFooter className="modal-color">
          <Button color="secondary" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
