import { Request, Response } from 'express';
import crypto from 'crypto'
import Bycript from '../utils/crypt/bycript';
import db from '../database/connection';
import mailer from '../modules/mailer';
import GenerateToken from '../utils/token/TokenGenerate';
import Compare from '../utils/comparing/index'; 

export default class AuthController {
    async create(req: Request, res: Response){
        const bycript = new Bycript();
        const {
            name,
            email,
            password,
            whatsapp,   
                } = req.body;
        const trx = await db.transaction();
        if(await Compare('users', 'name', String(name))){
            return res.status(400).json({error: 'User already exists'});
        }
        const newpassword = await bycript.crypt(password);
        try{
            const insertedUsersIds = await trx('users').insert({
                name,
                email,
                password: newpassword,
                whatsapp,
            });
            await trx.commit();
            return res.json({message: 'Okay'});
        } catch (err){
            return res.status(400).json({error: 'Registration failed'});
        }
    }
    async authenticate(req: Request, res: Response){
        const bycript = new Bycript();
        const {email, password} = req.body;
        try{
            const user = await db('users').where('users.email', '=', String(email)).first();
            const find = await bycript.comparePassword(password, user.password);
            delete user.password;
            if(find){
                return res.json({user, token: GenerateToken(user.id)});
            } else{
                return res.status(400).json({error: 'Invalid password'});
            }
        }catch(err){
            return res.status(400).json({error: 'User not found'});
        }
    }
    async forgotPassword(req: Request, res: Response){
        const { email, name } = req.body;
        try{
            const trx = await db.transaction();
            const token = crypto.randomBytes(20).toString('hex');
            const now = new Date();
            now.setHours(now.getHours() + 1);
            await trx('users').where('name', String(name))
                             .first()
                             .update({passwordResetToken: token})
                             .update({passwordResetExpires: now});
            const Test = await trx('users').where('name', '=',String(name)).first();
            delete Test.password;
            mailer.sendMail({
                to: email,
                from: 'lokasmega@gmail.com',
                html: `Utilize esse token para modificar sua senha ${token}`
            });
            await trx.commit();
            return res.json({Test});

        } catch(err){
            return res.status(401).json({error: 'Erro on forgot password, try again'});
        }
    }
    async resetPassword(req: Request, res: Response){
        const bycript = new Bycript();
        const { token, password, name } = req.body;
        const newpassword = await bycript.crypt(password);
        try{
            const user = await db('users').where('users.name', '=', String(name)).first();
            if(token !== user.passwordResetToken){
                return res.status(400).json({error: 'Token invalid'});
            }
            const now = new Date();
            if(now > user.passwordResetExpires){
                return res.status(400).json({errror: 'Token expired, generate a new one'});
            }
            await db('users').where('users.name', '=', String(name))
                             .first()
                             .update('password', newpassword);
            const A = await db('users').where('users.name', '=', String(name)).first()
            delete A.password;
            return res.json(A);
        } catch(err){
            return res.status(400).json({error: 'Cannot reset password, try again'});
        }
    }
}