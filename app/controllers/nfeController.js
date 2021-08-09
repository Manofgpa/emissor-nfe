import fs from 'fs'
import path from "path"
import pdf from "html-pdf"
import ejs from 'ejs'
import validate from '../utils/dto-validate.js'

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
    if (data.produtos_preco) {
        if (data.produtos_preco.length > 1) {
            data.produtos_preco.forEach((v, i) => {
                totalNFPrice = Number(totalNFPrice) + (Number(data.produtos_preco[i]) * Number(data.produtos_quantidade[i]))
                totalNFQuantity = Number(totalNFQuantity) + Number(data.produtos_quantidade[i])
            })
        }
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

    console.log(validate(data))


    // switch (data.pagamento) {
    //     case '0':
    //         data.faturas = [] 
    //         break
    //     case '1':
    //         data.faturas = [date]
    //         break
    //     case '2':
    //         data.faturas = []
    //         break
    //     default:
    //         data.faturas = []
    //         break
    // }

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

    // console.log(data)
}


export default { createNfe }