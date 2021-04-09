import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import User from 'App/Models/User'
import UserPostValidator from 'App/Validators/UserPostValidator'

export default class UsersPostsController {

    async index({request}: HttpContextContract){
        const {userid} = request.headers()
       
        return await Post.query().where('user_id', String(userid))
    }

    async show(){

    }

    async store({request}: HttpContextContract){

        const post = await request.validate(UserPostValidator)

        const validatedPost = new Post()
        validatedPost.title = post.title
        validatedPost.body = post.body
        validatedPost.userId = post.userId

        await validatedPost.save()

        return {message: `User with id: ${validatedPost.userId} created a post with id: ${validatedPost.id}`}

    }
}
