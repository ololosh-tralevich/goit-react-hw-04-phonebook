import { useState, memo } from 'react';

import PropTypes from 'prop-types';

import styles from './contactForm.module.css';

function ContactForm({ onSubmit }) {
  const [contactData, setContactData] = useState({ name: '', number: '' });

  const onSubmitForm = ev => {
    ev.preventDefault();
    onSubmit(contactData);
    resetForm(ev);
  };

  const onChangeForm = ev => {
    const { name, value } = ev.target;
    setContactData({ ...contactData, [name]: value });
  };

  const resetForm = ev => {
    const { name, number } = ev.target;
    name.value = '';
    number.value = '';
  };
  return (
    <div className={styles.mainContainer}>
      <h4>Name:</h4>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="name"
          // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={onChangeForm}
        />
        <h4>Number:</h4>

        <input
          type="tel"
          name="number"
          // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={onChangeForm}
        />
        <button className={styles.addContactBtn} tupe="submit">
          Add contact
        </button>
      </form>
    </div>
  );
}

export default memo(ContactForm);

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
