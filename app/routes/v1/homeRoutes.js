import homeController from "../../controllers/homeController.js"


export default v1Route => {

    v1Route.route('/')

        .get(homeController.getHome)
}