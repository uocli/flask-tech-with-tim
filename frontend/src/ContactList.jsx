import React from "react";

const ContactList = ({ contacts, updateContact, updateCallback }) => {
    const handleDelete = async (id) => {
        try {
            const options = {
                method: "DELETE",
            };
            const response = await fetch(
                `http://127.0.0.1:5000/delete_contact/${id}`,
                options,
            );
            if (response.status !== 204) {
                const d = response.json();
                d.then(({ error }) => {
                    error && alert(error);
                    updateCallback();
                });
            }
        } catch (error) {
            console.error(error);
        }
    };
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
                                <button onClick={() => handleDelete(id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ContactList;
