import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './contactForm/ContactForm';
import Filter from './filter/Filter';
import ContactList from './contactList/ContactList';

import styles from './app.module.css';

const initialState = {
      contacts: [],
      filter: '',
}

function Phonebook() {

  const componentDidMount = () => {
    const localContacts = JSON.parse(localStorage.getItem('contacts'));

    if (
      localContacts?.length &&
      this.state.contacts.length !== localContacts.length
    ) {
      this.setState({ contacts: localContacts });
    }
    return
  }

  const componentDidUpdate = (prevProps, prevState) => {
    const { contacts } = this.state;
    if (contacts.length !== prevState.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  const typeContactData = ev => {
    const name = ev.target.name;
    this.setState({
      [name]: ev.target.value,
    });
  };

  const addContactBtn = ({ name, number }) => {
    const clone = this.state.contacts.find(
      clone => clone.name === name || clone.number === number
    );

    clone
      ? alert(`${name} is already in your contacts`)
      : this.setState(prevState => {
          return {
            contacts: [
              ...prevState.contacts,
              { id: nanoid(), name: name, number: number },
            ],
          };
        });
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    // console.log(JSON.stringify(this.state.contacts))
  };

  const deleteContactBtn = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

    return (
      <div className={styles.mainContainer}>
        <div className={styles.contactContainer}>
          <ContactForm
            typeContactData={this.typeContactData}
            onSubmit={this.addContactBtn}
          />
        </div>

        <div className={styles.listContainer}>
          <h2>Contacts</h2>
          <Filter
            typeContactData={this.typeContactData}
            filter={this.state.filter}
          />
          <ContactList
            deleteContactBtn={this.deleteContactBtn}
            contacts={this.state.contacts}
            filter={this.state.filter}
          />
        </div>
      </div>
    );
  
}
