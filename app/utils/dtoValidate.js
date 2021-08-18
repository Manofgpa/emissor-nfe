import schema from './defineJoiSchema.js'
import generatorController from '../controllers/generatorController.js'
import formatArray from './formatToArray.js'

// Joi validation
export default (context) => {
    return async (req, res, next) => {

        req[context] = formatArray(req[context])
        const validation = schema.validate(req[context], { abortEarly: false })

        if (validation.error) {
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