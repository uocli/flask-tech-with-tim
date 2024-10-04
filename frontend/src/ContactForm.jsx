import { useState } from "react";

const ContactForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { firstName, lastName, email };
        const url = "http://127.0.0.1:5000/create_contact";
        const options = {
            method: "POST",
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
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </div>
            <button type="submit">Create Contact</button>
        </form>
    );
};
export default ContactForm;
