

export default v1Route => {

    v1Route.route('/about')
    
        .get((req, res, next) => {
            res.render('pages/about')
        })
}