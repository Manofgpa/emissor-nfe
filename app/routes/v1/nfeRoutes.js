import nfeController from '../../controllers/nfeController.js'


export default v1Route => {

    v1Route.route('/nfe')

        .post(nfeController.createNfe) 
}
