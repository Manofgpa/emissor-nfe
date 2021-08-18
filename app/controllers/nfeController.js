import fs from 'fs'
import path from "path"
import pdf from "html-pdf"
import ejs from 'ejs'
import validate from '../utils/dto-validate.js'
import generatorRoutes from '../routes/v1/generatorRoutes.js'
import states from '../models/states.js'
import modalidades from '../models/modalidades.js'
import fretes from '../models/fretes.js'
import paymentMethods from '../models/meioPagamentos.js'
import formaPagamentos from '../models/formaPagamentos.js'
import naturezaOperacao from '../models/naturezaOperacao.js'
import { DateTime } from 'luxon'
import invoiceDateGenerator from '../utils/invoiceDateGenerator.js'
import createProductID from '../utils/createProductID.js'


const __dirname = path.resolve()

const createNfe = (req, res) => {

    // Set dates
    const dt = DateTime.now().setLocale('br'),
        currentDate = dt.toLocaleString(),
        currentHour = dt.toLocaleString(DateTime.TIME_WITH_SECONDS)

    let totalNFPrice = 0,
        totalNFQuantity = 0,
        data = req.body

    const numNf = Math.floor(100000 + Math.random() * 900000),
        protocoloAutorizacao = Math.floor(100000000000000 + Math.random() * 900000000000000) + ` ${currentDate} ${currentHour}`

    // Transform products in array if not yet.
    if (!Array.isArray(data.produtos_quantidade)) {
        data.produtos_nome = [data.produtos_nome]
        data.produtos_unidade = [data.produtos_unidade]
        data.produtos_quantidade = [data.produtos_quantidade]
        data.produtos_preco = [data.produtos_preco]
    }

    // Get total NF price and quantity
    if (Array.isArray(data.produtos_preco)) {
        data.produtos_preco.forEach((v, i) => {
            totalNFPrice = Number(totalNFPrice) + (Number(data.produtos_preco[i]) * Number(data.produtos_quantidade[i]))
            totalNFQuantity = Number(totalNFQuantity) + Number(data.produtos_quantidade[i])
        })
    }

    totalNFPrice.toFixed(2)

    // Invoice payments
    const invoiceDueDates = invoiceDateGenerator(data.pagamento)
    const invoiceInstallment = (totalNFPrice / data.pagamento).toFixed(2)

    // Creates array of products    
    let produtos = []
    const productsIDs = createProductID(data.produtos_nome.length)

    data.produtos_nome.forEach((item, i) => {
        produtos[i] = [{
            id: productsIDs[i],
            name: data.produtos_nome[i],
            quantidade: data.produtos_quantidade[i],
            preco: data.produtos_preco[i],
            unidade: data.produtos_unidade[i]
        }]
    })

    data = {
        ...req.body,
        totalNFQuantity,
        totalNFPrice,
        currentDate,
        currentHour,
        protocoloAutorizacao,
        numNf,
        produtos,
        invoiceDueDates,
        invoiceInstallment
    }

    console.log(data)

    const html = fs.readFileSync(__dirname + '/app/views/pages/nfe.ejs', 'utf8')
    const nfe = ejs.render(html, data)

    let options = {
        "height": "11.25in",
        "width": "8.5in",
        "header": {
            "height": "0mm"
        },
        "footer": {
            "height": "0mm",
        }
    }

    const validation = validate(data)
    console.log(validation.error)

    if (validation.error) {
        data = {
            ...data,
            errorMessages: validation.error,
            states,
            modalidades,
            fretes,
            paymentMethods,
            formaPagamentos,
            naturezaOperacao
        }

        res.render('pages/generator', data)
    }
    else {
        pdf.create(nfe, options).toBuffer((err, data) => {
            if (err) {
                res.send(err)
            } else {
                res.contentType('application/pdf').send(data)
            }
        })
    }
}

export default { createNfe }