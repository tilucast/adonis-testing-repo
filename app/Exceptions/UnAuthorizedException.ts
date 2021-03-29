import { Exception } from '@poppinss/utils'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new UnAuthorizedException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class UnAuthorizedException extends Exception {
    constructor(message: string) {
        super(message, 401)
    }

    public async handle(error: this, {response}: HttpContextContract){
        response
            .status(error.status)
            .send('<h1>You are not allowed to view this page.</h1>')
    }
}
