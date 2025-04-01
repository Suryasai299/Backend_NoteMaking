import { userRegister,userLogin ,getAllUsers , getUserById}  from '../controllers/userController.js'
import express from 'express'

const router  = express.Router()

router.post('/register', userRegister)
router.post('/login',userLogin)
router.get('/all-users',getAllUsers)
router.get('/single-user/:id',getUserById)

export default router