const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const cabinsrouter = require('./Cabins')
const paymentsrouter = require('./Payments')
const picturesrouter= require('./Pictures')
const reservationsrouter = require('./Reservations')
const servicesrouter = require('./Services')
const usersrouter = require('./User')
const sendEmail = require('./SendEmail')

const router = Router();
router.use("/cabins" , cabinsrouter)
router.use("/payments" , paymentsrouter)
router.use("/pictures", picturesrouter)
router.use("/reservations", reservationsrouter)
router.use("/services", servicesrouter)
router.use("/users", usersrouter)
router.use("/sendEmail", sendEmail)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
