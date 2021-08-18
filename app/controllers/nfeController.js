import fs from 'fs'
import path from "path"
import pdf from "html-pdf"
import ejs from 'ejs'
import { DateTime } from 'luxon'
import invoiceDateGenerator from '../utils/invoiceDateGenerator.js'


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

    // Get total NF price and quantity
    if (Array.isArray(data.produtos_preco)) {
        data.produtos_preco.forEach((v, i) => {
            totalNFPrice = Number(totalNFPrice) + (Number(data.produtos_preco[i]) * Number(data.produtos_quantidade[i]))
            totalNFQuantity = Number(totalNFQuantity) + Number(data.produtos_quantidade[i])
        })
        totalNFPrice.toFixed(2)
    }

    // Invoice payments
    const invoiceDueDates = invoiceDateGenerator(data.pagamento)
    const invoiceInstallment = (totalNFPrice / data.pagamento).toFixed(2)

    data = {
        ...req.body,
        totalNFQuantity,
        totalNFPrice,
        currentDate,
        currentHour,
        protocoloAutorizacao,
        numNf,
        invoiceDueDates,
        invoiceInstallment
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

    pdf.create(nfe, options).toBuffer((err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.contentType('application/pdf').send(data)
        }
    })
}

export default { createNfe }