import express from "express"
import homeRoutes from './v1/homeRoutes.js'
import aboutRoutes from './v1/aboutRoutes.js'
import generatorRoutes from './v1/generatorRoutes.js'
import nfeRoutes from './v1/nfeRoutes.js'


export default app => {

    const v1Route = express.Router()

    homeRoutes(v1Route)
    aboutRoutes(v1Route)
    generatorRoutes(v1Route)
    nfeRoutes(v1Route)

    app.use('', v1Route)

}

