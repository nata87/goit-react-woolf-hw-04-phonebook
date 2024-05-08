import React, { useEffect, useState } from 'react';
import AddContactForm from './addContactForm/addContactForm';
import ContactList from './contactList/contactList';
import Filter from './filter/filter';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    return localStorage.getItem('contacts')
      ? [...JSON.parse(localStorage.getItem('contacts'))]
      : [];
  });
  const [filter, setFilter] = useState('');

  const setContactToStorage = newContact => {
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
      setContacts(prev => [...prev, newContact]);
    }
  };

  const handleChange = e => {
    setFilter(e.target.value);
  };

  const getFilteredContacts = () => {
    return contacts.length
      ? contacts.filter(contact => {
          return contact.name.toLowerCase().includes(filter.toLowerCase());
        })
      : contacts;
  };

  const deleteContact = deletedId => {
    const filteredContacts = contacts.filter(({ id }) => deletedId !== id);
    setContacts(filteredContacts);
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

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
