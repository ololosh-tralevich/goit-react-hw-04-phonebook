import { Component } from 'react';

import PropTypes from 'prop-types';

import styles from './contactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  onSubmitForm = ev => {
    ev.preventDefault();
    this.props.onSubmit(this.state);
    this.resetForm(ev);
  };

  onChangeForm = ev => {
    const {name, value} = ev.target;
    this.setState({
      [name]: value
    })
    // console.log(this.state)
  }

  resetForm(ev) {
    const { name, number } = ev.target;
    name.value = '';
    number.value = '';
  }
  render() {
    return (
      <div className={styles.mainContainer}>
        <h4>Name:</h4>
        <form onSubmit={this.onSubmitForm}>
          <input
            type="text"
            name="name"
            // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.onChangeForm}
          />
          <h4>Number:</h4>

          <input
            type="tel"
            name="number"
            // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.onChangeForm}
          />
          <button className={styles.addContactBtn} tupe="submit">
            Add contact
          </button>
        </form>
      </div>
    );
  }
}

export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
