import { useState } from "react";
// import "./ContactForm.scss";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getFilterContacts, fetchCreateContact } from "redux/phonebook";
import { v4 as uuidv4 } from "uuid";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const items = useSelector(getFilterContacts);
  const dispatch = useDispatch();

  const addContact = (newItem) => {
    if (checkDoubleName(newItem)) {
      alert(`${newItem.name} уже есть в контактах.`);
      return false;
    }

    const contact = { id: uuidv4(), ...newItem };
    dispatch(fetchCreateContact(contact));
  };

  const checkDoubleName = (newContact) => {
    const { name } = newContact;
    const normalizedName = name.toLowerCase();

    return items.some(({ name }) => name.toLowerCase() === normalizedName);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    switch (name) {
      case "name":
        setName(value);
        break;
      case "number":
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addContact({ name, number });
    setName("");
    setNumber("");
  };

  return (
    <div className="form-contacts">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label className="form-contacts__input">Name:</Form.Label>
          <Form.Control
            className="form-contacts__text"
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            onChange={handleChange}
            value={name}
            autoComplete="off"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicTel">
          <Form.Label className="form-contacts__input">Number:</Form.Label>
          <Form.Control
            className="form-contacts__text"
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
            onChange={handleChange}
            value={number}
            autoComplete="off"
          />
        </Form.Group>

        <Button
          variant="success"
          type="submit"
          className="form-contacts__button"
        >
          Add contact
        </Button>
      </Form>
    </div>
  );
};

export default ContactForm;
