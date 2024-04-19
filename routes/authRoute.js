import express from 'express'

const router = express.Router()

//Import Auth controller
import {signup, login, logout } from "../controllers/authController.js"
import { isUserLoggedIn } from '../utils/auth.js'

// Allow a user to login

router.post('/login', login)

// Allow a user to signup

router.post('/signup', signup)

// Allow a user to logout

router.get('/logout', isUserLoggedIn, logout)

export default router