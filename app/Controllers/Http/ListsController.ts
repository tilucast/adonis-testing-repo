import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import ListValidator from 'App/Validators/ListValidator'

export default class ListsController {

    public async store({request}: HttpContextContract){

        const data = await request.validate(ListValidator)

        await data.avatar.move(Application.tmpPath('public'), {
            name: `${new Date().getTime()}.${data.avatar.extname}`
        })

        return {message: 'File uploaded successfully.'}
    }
}
