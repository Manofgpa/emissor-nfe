import states from '../views/loaders/states.js'
import modalidades from '../views/loaders/modalidades.js'
import fretes from '../views/loaders/fretes.js'
import paymentMethods from '../views/loaders/meioPagamentos.js'
import formaPagamentos from '../views/loaders/formaPagamentos.js'
import Joi from "joi"

const getGenerator = (req, res) => {
    res.render('pages/generator', { states, modalidades, fretes, paymentMethods, formaPagamentos })
}

export default { getGenerator }