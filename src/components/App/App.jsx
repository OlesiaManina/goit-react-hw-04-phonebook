import { useState, useEffect } from "react";
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import initialContacts from '../contacts.json'
import css from './App.module.css'

export const App = () => {
  const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
  const [contacts, setContacts] = useState(parsedContacts ?? initialContacts);
  const [filter, setFilter] = useState(''); 

  const formSubmitHendler = contact => {
    for (const item of contacts) {
      if (item.name === contact['name']) {
        alert(`${contact.name} is already in contacts.`);
        return
      }
    }
    setContacts((prevValue)=> [contact, ...prevValue])
  }

  const deleteContact = contactId => {
    setContacts((prevValue)=> prevValue.filter(contact => contact.id !== contactId))
  }

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts]);

  const normalizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));

    return (
    <>
    <h1 className={css.title}>Phonebook</h1>
    <ContactForm onSubmit={formSubmitHendler}/>
    <h2 className={css.title}>Contacts</h2>
    <Filter value={filter} onChange={(e) => setFilter(e.currentTarget.value)}/>
    <ContactList visibleContacts={visibleContacts} deleteContact={deleteContact}/>
 </>
);
}

