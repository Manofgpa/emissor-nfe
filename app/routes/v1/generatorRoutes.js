import generatorController from '../../controllers/generatorController.js'


export default v1Route => {

    v1Route.route('/emissor')

        .get(generatorController.getGenerator)

}