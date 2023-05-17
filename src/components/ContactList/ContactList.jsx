import css from './ContactList.module.css';
import PropTypes from 'prop-types';

const ContactList = ({visibleContacts, deleteContact}) => (
    <ul className={css.list}>
      {visibleContacts.map(({name, number, id}) => {
        return (
          <li key={id} className={css.listItem}>
            <p className={css.text}>
            {name}: {number}
            </p>
            <button onClick={() => deleteContact(id)} className={css.btn}>Delete</button>
          </li>
        )
      } )}
  </ul>
)

export default ContactList;

ContactList.propTypes = {
  visibleContacts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    number: PropTypes.string,
    id: PropTypes.string.isRequired,
  })),
  deleteContact: PropTypes.func,
}