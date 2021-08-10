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


const __dirname = path.resolve()

const createNfe = (req, res) => {

    let totalNFPrice = 0,
        totalNFQuantity = 0,
        data = req.body,
        date = new Date()

    const numNf = Math.floor(100000 + Math.random() * 900000),
        formattedDate = ((date.getDate())) + '/' + ((date.getMonth() + 1)) + '/' + date.getFullYear(),
        formattedHour = ((date.getHours()) + ':' + (date.getMinutes()))

    // Get total NF price and quantity
    if (Array.isArray(data.produtos_preco)) {
        data.produtos_preco.forEach((v, i) => {
            totalNFPrice = Number(totalNFPrice) + (Number(data.produtos_preco[i]) * Number(data.produtos_quantidade[i]))
            totalNFQuantity = Number(totalNFQuantity) + Number(data.produtos_quantidade[i])
        })
    }

    totalNFPrice = Math.round(totalNFPrice * 100) / 100

    data = {
        ...req.body,
        totalNFQuantity,
        totalNFPrice,
        formattedDate,
        formattedHour,
        numNf
    }

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

    // console.log(validation)
    // console.log('-----------------')
    if (validation.error) {
        console.log(validation.error);
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
        // res.redirect('/emissor')
        console.log(data)
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
    // console.log(data)
}

export default { createNfe }