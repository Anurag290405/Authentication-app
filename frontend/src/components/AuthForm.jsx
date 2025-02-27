import { useState } from 'react';
import axios from 'axios';

const AuthForm = () => {
    const [formData, setFormData] = useState({ name: '', mobile: '', email: '', password: '', confirmPassword: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, mobile, email, password, confirmPassword } = formData;
        if (password !== confirmPassword) return alert('Passwords do not match');

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', { name, mobile, email, password });
            alert(response.data.message);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <form className="p-6 bg-white rounded shadow-md w-96 mx-auto">
            <input className="p-2 border w-full" type="text" placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <button onClick={handleSubmit}>Register</button>
        </form>
    );
};

export default AuthForm;
