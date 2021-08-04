import Express from "express"


export default (app) => {

    const routev1 = Express.Router()

    app.use('v1' ,routev1)

}