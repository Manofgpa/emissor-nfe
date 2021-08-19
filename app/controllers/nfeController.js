import fs from 'fs'
import path from "path"
import pdf from "html-pdf"
import ejs from 'ejs'
import { DateTime } from 'luxon'
import invoiceDateGenerator from '../utils/invoiceDateGenerator.js'


const createNfe = (req, res) => {

    // Set dates
    const dt = DateTime.now().setLocale('br'),
        currentDate = dt.toLocaleString(),
        currentHour = dt.toLocaleString(DateTime.TIME_WITH_SECONDS),
        numNf = Math.floor(100000 + Math.random() * 900000),
        protocoloAutorizacao = Math.floor(100000000000000 + Math.random() * 900000000000000) + ` ${currentDate} ${currentHour}`,
        __dirname = path.resolve()

    let totalNFPrice = 0,
        totalNFQuantity = 0,
        data = req.body,
        pdfOption

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

    const pdfHtml = fs.readFileSync(__dirname + '/app/views/pages/nfe.ejs', 'utf8')
    const pdfNfe = ejs.render(pdfHtml, data)

    pdfOption = {
        "height": "11.25in",
        "width": "8.5in",
        "header": {
            "height": "0mm"
        },
        "footer": {
            "height": "0mm",
        }
    }

    pdf.create(pdfNfe, pdfOption).toBuffer((err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.contentType('application/pdf').send(data)
        }
    })
}

export default { createNfe }