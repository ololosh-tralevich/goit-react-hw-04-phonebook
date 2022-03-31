import PropTypes from 'prop-types';

import styles from './contactList.module.css';

const ContactList = ({ filteredContacts, deleteContactBtn }) => {
  const partOfCode = filteredContacts.map(contact => {
    return (
      <li className={styles.listItem} key={contact.id}>
        <button
          className={styles.removeContactBtn}
          onClick={() => deleteContactBtn(contact.id)}
          id={contact.id}
        >
          Delete
        </button>
        <span className={styles.listDash}>&#8212;</span>
        <p>
          {contact.name}: {contact.number}
        </p>
      </li>
    );
  });

  return (
    <div className={styles.mainContainer}>
      <ul>{partOfCode}</ul>
    </div>
  );
};

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ),
  deleteContactBtn: PropTypes.func.isRequired,
};
