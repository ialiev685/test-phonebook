// import { useState } from "react";
// import "./ContactForm.scss";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getFilterContacts, fetchCreateContact } from "redux/phonebook";
// import { v4 as uuidv4 } from "uuid";
// import "./ContactForm.scss";

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(10, "Too Long!")
    .required("Required"),
  number: Yup.number().min(89000000000).max(89999999999).required("Required"),
});

const ContactForm = () => {
  // const [name, setName] = useState("");
  // const [number, setNumber] = useState("");

  const items = useSelector(getFilterContacts);
  const dispatch = useDispatch();

  const addContact = (newItem) => {
    if (checkDoubleName(newItem)) {
      alert(`${newItem.name} уже есть в контактах.`);
      return false;
    }
    //если id не создает сервер
    // const contact = { id: uuidv4(), ...newItem };

    // dispatch(fetchCreateContact(contact));
    dispatch(fetchCreateContact(newItem));
  };

  const checkDoubleName = (newContact) => {
    const { name } = newContact;
    const normalizedName = name.toLowerCase();

    return items.some(({ name }) => name.toLowerCase() === normalizedName);
  };

  // const handleChange = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value;

  //   switch (name) {
  //     case "name":
  //       setName(value);
  //       break;
  //     case "number":
  //       setNumber(value);
  //       break;
  //     default:
  //       return;
  //   }
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   addContact({ name, number });
  //   setName("");
  //   setNumber("");
  // };

  return (
    <div className="form-contacts">
      <Formik
        initialValues={{
          name: "",
          number: "",
        }}
        validationSchema={ContactSchema}
        onSubmit={(values, actions) => {
          addContact(values);
          actions.resetForm();
        }}
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label className="form-contacts__input">Name:</Form.Label>
              <Form.Control
                className="form-contacts__text"
                type="text"
                name="name"
                // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                // title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                value={props.values.name}
                autoComplete="off"
              />
              {props.errors.name && (
                <div id="feedback">{props.errors.name}</div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicTel">
              <Form.Label className="form-contacts__input">Number:</Form.Label>
              <Form.Control
                className="form-contacts__text"
                type="tel"
                name="number"
                // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                // title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                value={props.values.number}
                autoComplete="off"
              />
              {props.errors.number && (
                <div id="feedback">{props.errors.number}</div>
              )}
            </Form.Group>

            <Button
              variant="success"
              type="submit"
              className="form-contacts__button mt-3"
            >
              Add contact
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
