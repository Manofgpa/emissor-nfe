import aboutController from '../../controllers/aboutController.js'


export default v1Route => {

    v1Route.route('/about')

        .get(aboutController.getAbout)
}