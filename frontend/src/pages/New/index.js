import React, {useState, useMemo} from 'react';
import api from '../../services/api';

import camera from '../../Assets/camera.svg';

import './styles.css';

export default function New({ history }) {
    
    const [thumbnail, setThumbnail] = useState(null);
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');

    const preview = useMemo(() => { //It's similar of useEffect
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail] 
    )

    async function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData();
        const user_id = localStorage.getItem('user')

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);

        await api.post('/spots', data, {
            headers: {user_id }
        })

        history.push('/dashboard');
    }

    function handleCompany(event) {
        setCompany(event.target.value)
    }

    function handleTechs(event) {
        setTechs(event.target.value)
    }

    function handlePrice(event) {
        setPrice(event.target.value)
    }

    function handleThumbnail(event) {
        setThumbnail(event.target.files[0])
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <label 
                id="thumbnail" 
                style={{backgroundImage: `url(${preview})`}}
                className={thumbnail ? 'has-thumbnail' : ''}
            >
                <input type="file" onChange={handleThumbnail}/>
                <img src={camera} alt="Select img"/>
            </label>
            
            <label htmlFor="company">EMPRESA *</label>
            <input 
                type="text"
                id="company" //The same name of "htmlFor" from the label above
                placeholder="Sua empresa incrível"
                value={company}
                onChange={handleCompany}
            />

            <label htmlFor="techs">TECNOLOGIAS * <span>(separadas por vírgula)</span></label>
            <input 
                type="text"
                id="techs" //The same name of "htmlFor" from the label above
                placeholder="Quais tecnologias usam?"
                value={techs}
                onChange={handleTechs}
            />

            <label htmlFor="price">VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span></label>
            <input 
                type="text"
                id="price" //The same name of "htmlFor" from the label above
                placeholder="Valor cobrado por dia"
                value={price}
                onChange={handlePrice}
            />

            <button type="submit" className="btn">Cadastrar</button>
        </form>
    )
}