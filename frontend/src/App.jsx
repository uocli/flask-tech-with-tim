import { useState, useEffect } from "react";
import "./App.css";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm.jsx";

function App() {
    const [contacts, setContacts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentContact, setCurrentContact] = useState({});
    useEffect(() => {
        fetchContact();
    }, []);
    const fetchContact = async () => {
        const response = await fetch("http://127.0.0.1:5000/contacts");
        const data = await response.json();
        setContacts(data.contacts);
        console.log(contacts);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentContact({});
    };
    const openCreateModal = () => {
        if (!isModalOpen) {
            setIsModalOpen(true);
        }
    };
    const openEditModal = (contact) => {
        if (!isModalOpen) {
            setCurrentContact(contact);
            setIsModalOpen(true);
        }
    };
    const handleUpdate = () => {
        closeModal();
        fetchContact();
    };
    return (
        <>
            <ContactList contacts={contacts} updateContact={openEditModal} />
            <button onClick={openCreateModal}>Create Contact</button>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>
                            &times;
                        </span>
                        <ContactForm
                            existingContact={currentContact}
                            updateCallback={handleUpdate}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default App;
