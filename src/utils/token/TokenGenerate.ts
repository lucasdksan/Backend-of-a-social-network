import jwt from 'jsonwebtoken';
const authConfig = require('../../config/auth.json');

export default function GenerateToken(params: number){
    const token = jwt.sign({ id: params }, authConfig.secret, {
        expiresIn: 86400
    });
    return token;
}