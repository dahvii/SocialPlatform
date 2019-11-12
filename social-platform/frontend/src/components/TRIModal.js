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
              <h1>It's a match!</h1>
              <p>It seems like you two would get along just fine! Start a conversation before this hottie gets other stuff to do!</p>
            </>
          }
          {!props.match &&
            <>
              <h1>Tell us more about you!</h1>
              <p>It seems like you haven't filled in all the info about you in your presentation. Add a few pictures and a presentation text to get some hotties interested in you!</p>
              <Button color="secondary" onClick={redirect}>Take me to edit presentation!</Button>
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
