import PropTypes from 'prop-types';

import styles from './contactList.module.css';

const ContactList = ({ contacts, filter, deleteContactBtn }) => {
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );

  const partOfCode = filteredContacts.map(contact => {
    return (
      <li className={styles.listItem} key={contact.id}>
        <button
          className={styles.removeContactBtn}
          // onClick={deleteContactBtn}
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
  contacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired),
  filter: PropTypes.string,
  deleteContactBtn: PropTypes.func.isRequired,
};
