import React from "react";

const ContactList = ({ contacts, updateContact, updateCallback }) => {
    return (
        <div>
            <h2>Contacts</h2>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map(({ id, firstName, lastName, email }) => (
                        <tr key={id}>
                            <td>{firstName}</td>
                            <td>{lastName}</td>
                            <td>{email}</td>
                            <td>
                                <button
                                    onClick={() =>
                                        updateContact({
                                            id,
                                            firstName,
                                            lastName,
                                            email,
                                        })
                                    }
                                >
                                    Update
                                </button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ContactList;
