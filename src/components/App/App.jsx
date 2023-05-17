import React from 'react';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import initialContacts from '../contacts.json'
import css from './App.module.css'


export class App extends React.Component {
  state = {
    contacts: initialContacts,
    filter: '',
  }

  formSubmitHendler = contact => {
    const {contacts} = this.state;
    for (const item of contacts) {
      if (item.name === contact['name']) {
        alert(`${contact.name} is already in contacts.`);
        return
      }
    }
    this.setState(({contacts}) => ({
      contacts: [contact, ...contacts]
  }))
  }
    
  onChangeFilter = e => {
    this.setState({filter: e.currentTarget.value})
  }

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }))
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({contacts: parsedContacts})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

  render() {
    const normalizedFilter = this.state.filter.toLowerCase();
    const visibleContacts = this.state.contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));

    return (
    <>
    <h1 className={css.title}>Phonebook</h1>
    <ContactForm onSubmit={this.formSubmitHendler}/>
    <h2 className={css.title}>Contacts</h2>
    <Filter value={this.state.filter} onChange={this.onChangeFilter}/>
    <ContactList visibleContacts={visibleContacts} deleteContact={this.deleteContact}/>
 </>
);
}
};
