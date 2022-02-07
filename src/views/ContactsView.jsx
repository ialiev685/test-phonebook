import React from "react";
import "./viewsStyle.scss";
import ContactForm from "components/ContactForm";
import ContactsList from "components/ContactsList";
import Filter from "components/Filter";
import { ModalEdiorContact } from "components/Modal";
import { useState } from "react";

const ContactsView = () => {
  const [showModal, setShowModal] = useState(false);
  const [dataContact, setDataContact] = useState(null);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (data) => {
    setShowModal(true);
    setDataContact(data);
  };

  return (
    <div className="contacts mt-3">
      <h1 className="caption">Phonebook</h1>
      <ContactForm />

      <h2 className="title mt-3">Contacts</h2>
      <Filter />

      <ContactsList setShowModal={handleShowModal} />
      <ModalEdiorContact
        dataContact={dataContact}
        showModal={showModal}
        setShowModal={handleCloseModal}
      />
    </div>
  );
};

export default ContactsView;
