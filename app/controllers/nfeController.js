import fs from 'fs'
import path from "path"
import pdf from "html-pdf"
import ejs from 'ejs'


const __dirname = path.resolve()

const createNfe = (req, res) => {
    const data = req.body
    
    data.numNf = Math.floor(100000 + Math.random() * 900000)

    const date = new Date()

    switch (data.pagamento) {
        case '0':
            data.faturas = [] 
            break
        case '1':
            data.faturas = [date]
            break
        case '2':
            data.faturas = []
            break
        default:
            data.faturas = []
            break
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

    console.log(data)
}



export default { createNfe }