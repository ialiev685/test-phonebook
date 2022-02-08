import ContactItem from "../ContactItem";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getError } from "redux/phonebook";
import { getIsLoader, getFilterContacts, fetchContacts } from "redux/phonebook";
import "./ContactsList.scss";
import { ListGroup, Spinner, Alert } from "react-bootstrap";

const ContactsList = ({ setShowModal }) => {
  const items = useSelector(getFilterContacts);
  const loading = useSelector(getIsLoader);
  const error = useSelector(getError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="contacts-wrapper">
      {loading && (
        <Spinner
          className="contacts-wrapper__loader"
          animation="border"
          variant="primary"
        />
      )}

      {error && (
        <Alert className="contacts-wrapper__error" variant="danger">
          {error}
        </Alert>
      )}
      <ListGroup className="contacts-wrapper__contacts-list">
        {items.map(({ _id, name, number }) => (
          <ContactItem
            key={_id}
            name={name}
            number={number}
            id={_id}
            setShowModal={setShowModal}
          />
        ))}
      </ListGroup>
    </div>
  );
};

export default ContactsList;
