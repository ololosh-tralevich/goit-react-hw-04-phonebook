import { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './contactForm/ContactForm';
import Filter from './filter/Filter';
import ContactList from './contactList/ContactList';

import styles from './phonebook.module.css';

function Phonebook() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const firstRender = useRef(true);

  useEffect(() => {
    const localContacts = JSON.parse(localStorage.getItem('contacts'));
    if (firstRender.current && localContacts) {
      setContacts(localContacts);
    }
    firstRender.current = false;
    localStorage.setItem('contacts', JSON.stringify(contacts));
    return;
  });

  const filterContacts = ev => {
    setFilter(ev.target.value);
  };

  const addContactBtn = contactData => {
    const { name, number } = contactData;
    const clone = contacts.find(
      clone => clone.name === name || clone.number === number
    );

    clone
      ? alert(`${name} is already in your contacts`)
      : setContacts(prevState => {
          return [...prevState, { id: nanoid(), name: name, number: number }];
        });
    localStorage.setItem('contacts', JSON.stringify(contacts));
    // console.log(JSON.stringify(contacts))
  };

  const deleteContactBtn = id => {
    setContacts(prevState => {
      return [...prevState.filter(contact => contact.id !== id)];
    });
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.contactContainer}>
        <ContactForm onSubmit={addContactBtn} />
      </div>

      <div className={styles.listContainer}>
        <h2>Contacts</h2>
        <Filter filterContacts={filterContacts} filter={filter} />
        <ContactList
          deleteContactBtn={deleteContactBtn}
          contacts={contacts}
          filter={filter}
        />
      </div>
    </div>
  );
}

export default Phonebook;
