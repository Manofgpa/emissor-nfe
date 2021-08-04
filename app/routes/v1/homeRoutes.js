

export default v1Route => {

    v1Route.route('/')
    
        .get((req, res, next) => {
            res.render('pages/home')
        }

        )
}