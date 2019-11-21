import React from 'react';
import { Image } from 'react-bootstrap'
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import '../css/MatchModal.css';
import { Link } from 'react-router-dom';

export default function TRIModal(props) {
  const toggle = () => props.callback();
  const redirect = () => {
    props.callback(true);
  };

  return (
    <div>
      <Modal isOpen={props.show} toggle={toggle} className="match-modal">
        <ModalBody className="modal-color">
          {props.match &&
            <>
              <div className="profile-picture-container">
                <Link to={'/profile/' + props.match.id} >
                  <Image src={props.match.profilePictures[0] ? `http://localhost:3001/${props.match.profilePictures[0]}` : 'http://localhost:3001/uploads/placeholder.jpg'} alt="profile-picture" roundedCircle className="profile-picture" />
                </Link>
              </div>
              <h1>Det blev en match!</h1>
              <p>Det verkar som ni två tycker om varrandra... Du kanske ska skriva någonting till personen?</p>
            </>
          }
          {!props.match &&
            <>
              <h1>Berätta mer om dig själv!</h1>
              <p>Det verkar som du inte skrivit något om dig. Du kan också ta några snygga bilder och lägg till i din profil!</p>
              <Button color="secondary" onClick={redirect}>Ta mig till min profil!</Button>
            </>
          }
        </ModalBody>
        <ModalFooter className="modal-color">
          <Button color="secondary" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
