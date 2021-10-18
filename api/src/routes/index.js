const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const cabinsrouter = require('./Cabins')
const paymentsrouter = require('./Payments')
const picturesrouter= require('./Pictures')
const reservationsrouter = require('./Reservations')
const servicesrouter = require('./Services')
const usersrouter = require('./User')
const loginrouter=require('./Login')
const sendEmail = require('./SendEmail')
const showGallery = require('./ShowGallery')
const sendNotification= require('./SendNotification')
const MercadoPago= require('./MercadoPago')
const weather = require('./Weather')
const SendNotificationpassword= require('./SendNotificationpassword')
const CambiosReserva = require('./CambioReserva')
const router = Router();
router.use("/cabins" , cabinsrouter)
router.use("/payments" , paymentsrouter)
router.use("/pictures", picturesrouter)
router.use("/reservations", reservationsrouter)
router.use("/services", servicesrouter)
router.use("/users", usersrouter)
router.use("/sendEmail", sendEmail)
router.use("/sendNotification", sendNotification )
router.use("/login", loginrouter)
router.use("/showImages", showGallery)
router.use("/sendNotificationpassword", SendNotificationpassword)
router.use("/checkout", MercadoPago )
router.use("/weather", weather)
router.use("/CambiosReserva", CambiosReserva)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
