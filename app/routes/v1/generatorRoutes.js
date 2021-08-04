import states from '../../views/loaders/states.js'
import modalidades from '../../views/loaders/modalidades.js'
import fretes from '../../views/loaders/fretes.js'
import paymentMethods from '../../views/loaders/meioPagamentos.js'
import formaPagamentos from '../../views/loaders/formaPagamentos.js'

export default v1Route => {

    v1Route.route('/emissor')
    
        .get((req, res) => {
            res.render('pages/generator', { states, modalidades, fretes, paymentMethods, formaPagamentos })
        })
}