import nfeController from '../../controllers/nfeController.js'
import dtoValidade from '../../utils/dtoValidate.js'


export default v1Route => {

    v1Route.route('/nfe')

        .post(dtoValidade('body'), nfeController.createNfe)
}