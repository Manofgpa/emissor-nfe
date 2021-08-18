import schema from './defineJoiSchema.js'
import generatorController from '../controllers/generatorController.js'

// Joi validation
export default (context) => {
    return async (req, res, next) => {
        const validation = schema.validate(req[context], { abortEarly: false })

        if (validation.error) {
            // console.log('DATA DO DTO VALIDATE ' + data);
            // console.log(JSON.stringify(data, null, 4))
            req[context] = {
                ...req[context],
                errorMessages: validation.error
            }

            generatorController.getGenerator(req, res)
        }
        else {
            next()
        }
    }
}