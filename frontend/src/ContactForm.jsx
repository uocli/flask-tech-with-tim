import { useState } from "react";

const ContactForm = ({ existingContact = {}, updateCallback }) => {
    const [firstName, setFirstName] = useState(existingContact.firstName || "");
    const [lastName, setLastName] = useState(existingContact.lastName || "");
    const [email, setEmail] = useState(existingContact.email || "");

    const updating = Object.entries(existingContact).length > 0;

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { firstName, lastName, email };
        const url =
            "http://127.0.0.1:5000/" +
            (updating
                ? `update_contact/${existingContact.id}`
                : "create_contact");
        const options = {
            method: updating ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(url, options);
        if (response.status !== 201 && response.status !== 200) {
            const d = response.json();
            d.then(({ error }) => {
                error && alert(error);
            });
            setFirstName("");
            setLastName("");
            setEmail("");
        } else {
            updateCallback();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <table>
                <tbody>
                    <tr>
                        <th>First Name</th>
                        <td>
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(event) =>
                                    setFirstName(event.target.value)
                                }
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Last Name</th>
                        <td>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(event) =>
                                    setLastName(event.target.value)
                                }
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>
                            <input
                                type="text"
                                id="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type="submit">{updating ? "Update" : "Create"}</button>
        </form>
    );
};
export default ContactForm;
