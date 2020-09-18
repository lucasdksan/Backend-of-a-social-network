import express from 'express';
import AuthController from './controllers/authController';
import ProjectController from './controllers/projectController';
import Auth from './middlewares/auth';

const authcontroller = new AuthController();
const projectcontroller = new ProjectController();
const routes = express.Router();

routes.post('/register', authcontroller.create);
routes.post('/forgot_password', authcontroller.forgotPassword);
routes.post('/authenticate', authcontroller.authenticate);
routes.post('/reset_password', authcontroller.resetPassword);
routes.get('/projects', Auth, projectcontroller.index);


export default routes;