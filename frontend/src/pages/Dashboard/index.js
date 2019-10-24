import React, {useEffect, useState, useMemo} from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';
import api from '../../services/api';

//Importing files for Dialog Box
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

//Importing the file "styles.css" from the same folder
import './styles.css';

//Importing some .png images for frontend icons
import edit_logo from '../../Assets/edit.png'
import remove_logo from '../../Assets/remove_logo.png'

export default function Dashboard({history}) {

    const [open, setOpen] = useState(false);
    const [quantity, updateQuantity] = useState(0);
    const [spots, setSpots] = useState([]);
    const [requests, setRequests] = useState([]);

    //Accessing localStorage data
    const user_id = localStorage.getItem('user');

    //Here user_id is sent as a connection parameter
    const socket = useMemo(() => socketio('http://localhost:3333', {
        query: {user_id},
    }), [user_id]);

    useEffect(() => {
        socket.on('booking_request', data => {
            setRequests([...requests, data]);
        })
    }, [requests, socket]);

    useEffect(() => {
        async function loadSpots() {
            //Getting user_id from the localStorage
            const user_id = localStorage.getItem('user')
            //Navigating through get('/dashboard') to load the spots from "user_id"
            const response = await api.get('/dashboard', {
                headers: {user_id} //We use headers on get requisition from Dashboard
            });
            //Setting the state of "spots"
            setSpots(response.data);
            //Setting the state of "spots.length"
            updateQuantity(response.data.length);
        }

        loadSpots();
    }, [quantity])//If this array is empty, useEffect will just make api requisition one time.
                  //In this case, useEffect will load again if "quantity" changes.
    
    //Accept funcion  
    async function handleAccept(id) {
        await api.post(`/bookings/${id}/approvals`);

        setRequests(requests.filter(request => request._id !== id))
    }

    //Decline function
    async function handleReject(id) {
        await api.post(`/bookings/${id}/rejections`);

        setRequests(requests.filter(request => request._id !== id))
    }

    //Deleting function
    async function handleRemove(id) {
        //Deleting route from backend
        await api.delete(`/spots/${id}`);
        //Here "quantity" is modified and the "/dashboard" is re-rendered.
        updateQuantity(quantity - 1);
        //Closing Dialog Box
        setOpen(false);
    }

    //Openning Dialog Box
    const handleClickOpen = () => {
        setOpen(true);
    };

    //Closing Dialog Box
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <ul className="notifications">
                {requests.map(request => (
                    <li key={request._id}>
                        <p>
                            <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> para a data: <strong>{request.date}</strong>
                        </p>
                        <button className="accept" onClick={() => handleAccept(request._id)}>ACEITAR</button>
                        <button className="reject" onClick={() => handleReject(request._id)}>REJEITAR</button>
                    </li>
                ))}
            </ul>

            <ul className="spot-list">
                {/* This function below will list all the spots from the user_id */}
                {spots.map(spot => (
                    <li key={spot._id}>
                        {/*  */}
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }}/>
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$ ${spot.price}/dia` : 'GRATUITO' }</span>
                        <div className="content_logo">
                            <div>
                                <button className="btn-remove" onClick={() => handleClickOpen()}>
                                    <img className="remove_logo" src={remove_logo} alt="" style={{width: 20, height: 20}}/>
                                </button>
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">{`Deseja mesmo excluir ${spot.company}?`}</DialogTitle>
                                    <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        Cancelar
                                    </Button>
                                    <Button onClick={() => handleRemove(spot._id)} color="primary">
                                        Excluir
                                    </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                            <Link to={`/update/${spot._id}`}>
                                <button className="btn-edit">
                                    <img className="edit_logo" src={edit_logo} alt="" style={{width: 15, height: 15}}/>
                                </button>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
            <Link to={{pathname: '/new'}}>
                <button className="btn">Cadastrar novo spot</button>
            </Link>
        </>
    )
}