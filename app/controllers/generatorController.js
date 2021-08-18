import states from '../models/states.js'
import modalidades from '../models/modalidades.js'
import fretes from '../models/fretes.js'
import paymentMethods from '../models/meioPagamentos.js'
import formaPagamentos from '../models/formaPagamentos.js'
import naturezaOperacao from '../models/naturezaOperacao.js'


const getGenerator = (req, res) => {
    const data = {
        ...req.body,
        states,
        modalidades,
        fretes,
        paymentMethods,
        formaPagamentos,
        naturezaOperacao
    }

    res.render('pages/generator', data)
}

export default { getGenerator }