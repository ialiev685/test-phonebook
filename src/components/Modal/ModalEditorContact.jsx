import React from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { fetchUpdateContact } from "redux/phonebook";

export const ModalEdiorContact = ({ showModal, setShowModal, dataContact }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    if (dataContact !== null) {
      const { name, number } = dataContact;
      setName(name);
      setNumber(number);
    }
  }, [dataContact]);

  const dispatch = useDispatch();

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
    if (dataContact !== null) {
      const { id } = dataContact;
      const optionUpdate = { id, name, number };

      dispatch(fetchUpdateContact(optionUpdate));
      setName("");
      setNumber("");
      setShowModal();
    }
  };

  return (
    <Modal show={showModal} onHide={setShowModal}>
      <Modal.Header closeButton>
        <Modal.Title>Editor contact</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
              required
              value={name}
              onChange={handleChange}
              autoComplete="off"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicTel">
            <Form.Label>Number:</Form.Label>
            <Form.Control
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
              required
              value={number}
              onChange={handleChange}
              autoComplete="off"
            />
          </Form.Group>
          <Button type="submit">Update</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
