import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PostValidator {
  constructor (protected ctx: HttpContextContract) {
  }

	/*
	 * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
	 *
	 * For example:
	 * 1. The username must be of data type string. But then also, it should
	 *    not contain special characters or numbers.
	 *    ```
	 *     schema.string({}, [ rules.alpha() ])
	 *    ```
	 *
	 * 2. The email must be of data type string, formatted as a valid
	 *    email. But also, not used by any other user.
	 *    ```
	 *     schema.string({}, [
	 *       rules.email(),
	 *       rules.unique({ table: 'users', column: 'email' }),
	 *     ])
	 *    ```
	 */
  public schema = schema.create({
	  title: schema.string({}, [rules.alpha()]),
	  body: schema.string({}, [rules.maxLength(99)]),
	  email: schema.string({}, [rules.email()])
  })

  public cacheKey = this.ctx.routeKey

  public messages = {
	'title.required': 'Please enter a title',
	'body.required': 'Please enter a body',
	'email.required': 'Please enter a email',
  }

	/**
	 * Custom messages for validation failures. You can make use of dot notation `(.)`
	 * for targeting nested fields and array expressions `(*)` for targeting all
	 * children of an array. For example:
	 *
	 * {
	 *   'profile.username.required': 'Username is required',
	 *   'scores.*.number': 'Define scores as valid numbers'
	 * }
	 *
	 */
}
