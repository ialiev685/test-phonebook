import "./ContactItem.scss";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { fetchDeleteContact } from "redux/phonebook/contacts-operations";
import { ListGroup, Button, ButtonGroup } from "react-bootstrap";

const ContactItem = ({ name, number, id, setShowModal }) => {
  const dispatch = useDispatch();

  return (
    <ListGroup.Item className="contacts-list__item">
      <span>
        {name}: {number}
      </span>
      <ButtonGroup className="contacts__buttons">
        <Button
          variant="warning"
          size="sm"
          className="contacts-list__button "
          type="button"
          onClick={() => setShowModal({ id, name, number })}
        >
          editor
        </Button>
        <Button
          variant="danger"
          size="sm"
          className="contacts-list__button "
          type="button"
          onClick={() => dispatch(fetchDeleteContact(id))}
        >
          delete
        </Button>
      </ButtonGroup>
    </ListGroup.Item>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ContactItem;
