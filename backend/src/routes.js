const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

//Importando os controllers
const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');

//Configurando o Router
const routes = express.Router();

const upload = multer(uploadConfig);

//Sessions
routes.post('/sessions', SessionController.store);

//Spots
routes.get('/spots', SpotController.index);
routes.get('/spots/:id', SpotController.show);//Showing one spot
routes.post('/spots', upload.single('thumbnail'), SpotController.store);//.single porque trata-se de apenas uma imagem, do contrario seria .array
routes.delete('/spots/:id', SpotController.destroy); //Deleting spot
routes.put('/spots/:id', upload.single('thumbnail'), SpotController.update); //Updating spot

//Dashboard
routes.get('/dashboard', DashboardController.show);

//Bookings
routes.post('/spots/:spot_id/bookings', BookingController.store);

routes.post('/bookings/:booking_id/approvals', ApprovalController.store);
routes.post('/bookings/:booking_id/rejections', RejectionController.store);

module.exports = routes
