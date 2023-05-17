import React from 'react';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css'
import PropTypes from 'prop-types';


export class ContactForm extends React.Component {
    state = {
        name: '',
        number: '',
    }

    handleChange = e => {
        const {name, value} = e.currentTarget
        this.setState({
          [name]: value,
        })
      }

      handleSubmit = e => {
        e.preventDefault();
        let contactId = nanoid();
        const contact = {name: e.currentTarget.name.value, number: e.currentTarget.number.value, id: contactId};
        this.props.onSubmit(contact);
        this.reset();
      }

      reset = () => {
        this.setState({
        name: '',
        number: '',
        })
      }

    render() {
        return (
    <form onSubmit={this.handleSubmit} className={css.form}>
    <label htmlFor='name' className={css.formLabel}> Name
    <input 
    className={css.formInput}
    onChange={this.handleChange}
    value={this.state.name}
    type="text"
    name="name"
    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    required
    />
    </label>
    <label htmlFor="tel" className={css.formLabel}> Number
    <input 
    className={css.formInput}
    onChange={this.handleChange}
    value={this.state.number}
    type="tel"
    name="number"
    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
    required
    />
    </label>
    <button type='submit' className={css.btn}> Add contact</button>
    </form>
    )
    }
}

export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
}