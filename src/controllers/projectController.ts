import { Request, Response } from 'express';
import db from '../database/connection';

export default class ProjectController{
    async show(req: Request, res: Response){
        try{
            const projects = await db('project');
            const user = await db('users').where('users.id', '=', req.UserId);
            return res.json({
                projects,
                user
            });
        }catch(err){
            return res.status(400).json({error: 'Error loading projects'});
        }
    }
    async index(req: Request, res: Response){
        const projectId = req.params;
        try{
            const project = await db('project').where('project.id', '=', projectId);
            return res.json(project);
        }catch(err){
            return res.status(400).json({error: 'Error loading project'});
        }
    }
    async delete(req: Request, res: Response){
        const projectId = req.params;
        try{
            await db('project').where('project.id', '=', projectId)
                                .delete();
        }catch(err){
            return res.status(400).json({error: 'Error deleting project'});
        }
    }
    async create(req: Request, res: Response){
        const { title, description, tasks } = req.body;
        try{
            const trx = await db.transaction();
            await trx('project').insert({
                title,
                description,
                user_id: req.UserId
            });
            const project = await trx('project').where('project.user_id', '=', req.UserId).first();
            await Promise.all(
                tasks.map(async (task: any)=>{
                    await db('tasks').insert({
                        title: task.title,
                        assingedTo: task.assingedTo,
                        projects: project.id,
                    });
                })
            );
            return res.json(project);
            trx.commit();
        } catch(err){
            return res.status(400).json({error: 'Error creating new project'});
        }
    }
}