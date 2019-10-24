import React, {useState} from 'react';
import api from '../../services/api' //Importing api

export default function Login({ history }) {
    const [email, setEmail] = useState('');
  
    async function handleSubmit(event) {
        event.preventDefault();
    
        //Here we are starting a new session and sending the input value (incase, the email) to the backend
        const response = await api.post('/sessions', {email: email});
    
        //Extracting only the data from api response
        const {_id} = response.data;

        //Storaging the user_id on the session localStorage
        localStorage.setItem('user', _id);

        //When we click on "entrar" we are redirect to '/dashboard' route
        history.push('/dashboard'); //Após o login a função "history.push" carrega o caminho "/dashboard" ao submitar-mos a form
    }

    function handleEmailChange(event) {
        setEmail(event.target.value)
    }
    
    return (
        <>
            <p>
                Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
            </p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-MAIL *</label>
                <input 
                    type="email" 
                    id="email" 
                    placeholder="Seu melhor e-mail"
                    value={email}
                    onChange={handleEmailChange} 
                />

                <button className="btn" type="submit">Entrar</button>
            </form>
        </>
    )
}