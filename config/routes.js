const express = require('express')
const router = express.Router()
const notesController = require('../app/controllers/notesController')
const categoriesController = require('../app/controllers/categoriesController')
const usersController = require('../app/controllers/usersController')
const {authenticateUser} = require('../app/middlewares/authentication')

router.post('/signup', usersController.signup)
router.post('/signin', usersController.signin)
router.get('/account',authenticateUser, usersController.account)
router.delete('/logout', authenticateUser,usersController.logout)

router.get('/notes',authenticateUser,notesController.list)
router.get('/notes/:id',authenticateUser,notesController.show)
router.post('/notes',authenticateUser,notesController.create)
router.put('/notes/:id',authenticateUser,notesController.update)
router.delete('/notes/:id',authenticateUser,notesController.destroy)

router.get('/categories',authenticateUser,categoriesController.list)
router.post('/categories',authenticateUser,categoriesController.create)
router.get('/categories/:id',authenticateUser,categoriesController.show)
router.put('/categories/:id',authenticateUser,categoriesController.update)
router.delete('/categories/:id',authenticateUser,categoriesController.destroy)



module.exports = router