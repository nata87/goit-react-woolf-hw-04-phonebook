import { useState } from 'react';
import styles from './addContactForm.module.css';
import { nanoid } from 'nanoid';

const AddContactForm = ({ setContacts }) => {
  const [state, setState] = useState({
    name: '',
    number: '',
  });
  const { name, number } = state;

  const setContact = (key, value) => {
    setState(prev => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (name === '') return;
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    setContacts(newContact);

    setContact('name', '');
    setContact('number', '');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="name">
        Name
      </label>
      <input
        id="name"
        type="text"
        name="name"
        value={name}
        onChange={({ target }) => setContact('name', target.value)}
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label className={styles.label} htmlFor="number">
        Number
      </label>
      <input
        id="number"
        type="tel"
        name="number"
        value={number}
        onChange={({ target }) => setContact('number', target.value)}
        pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button type="submit">Add Contact</button>
    </form>
  );
};

export default AddContactForm;
