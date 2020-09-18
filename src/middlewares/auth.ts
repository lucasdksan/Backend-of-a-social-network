import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const authConfig = require('../config/auth.json');

export default (req: Request, res: Response, next: NextFunction)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({error: 'No token provided'});
    }
    const parts = authHeader.split(' ');
    if(!(parts.length === 2)){
        return res.status(401).json({error: 'Token error'});
    }
    const [schema, token] = parts;
    if(/^$Bearer$/i.test(schema)){
        return res.status(401).json({error: 'Token malformatted'});
    }
    jwt.verify(token, authConfig.secret, (err: any, decoded: any)=>{
        if(err){
            return res.status(401).json({error: 'Token invalid'});
        }
        req.UserId = decoded.id;
        return next();
    });
}