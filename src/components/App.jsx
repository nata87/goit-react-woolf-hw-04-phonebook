import React, { useCallback, useEffect, useState } from 'react';
import AddContactForm from './addContactForm/addContactForm';
import ContactList from './contactList/contactList';
import Filter from './filter/filter';

const App = () => {
  const [state, setState] = useState({
    contacts: [],
    filter: '',
  });

  const setContacts = useCallback(() => {
    setState(prev => {
      return {
        ...prev,
        contacts: JSON.parse(localStorage.getItem('contacts')) || [],
      };
    });
  }, []);

  const setContactToStorage = newContact => {
    const { contacts } = state;
    if (
      contacts.some(contact => {
        return (
          contact.name.toLowerCase() === newContact.name.trim().toLowerCase()
        );
      })
    ) {
      alert(`${newContact.name} is already in contacts`);
      return;
    } else {
      localStorage.setItem(
        'contacts',
        JSON.stringify([...contacts, newContact])
      );
      setContacts();
    }
  };

  const handleChange = e => {
    const { contacts } = state;

    setState({
      [e.target.name]: e.target.value,
      contacts,
    });
  };

  const getFilteredContacts = () => {
    const { contacts, filter } = state;
    return contacts.length
      ? contacts.filter(contact => {
          return contact.name.toLowerCase().includes(filter.toLowerCase());
        })
      : contacts;
  };

  const deleteContact = deletedId => {
    const { contacts } = state;

    const filteredContacts = contacts.filter(({ id }) => deletedId !== id);
    localStorage.setItem('contacts', JSON.stringify(filteredContacts));
    setContacts();
  };

  useEffect(() => {
    setContacts();
  }, [setContacts]);

  const { contacts, filter } = state;
  return (
    <div>
      <h1>Phonebook</h1>
      <AddContactForm setContacts={setContactToStorage} contacts={contacts} />
      <h2>Contacts</h2>
      <Filter filter={filter} handleChange={handleChange} />
      <ContactList
        contacts={getFilteredContacts()}
        deleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
