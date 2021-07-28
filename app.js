import Express, { application } from "express"
import Path from "path"
import states from "./views/loaders/states.js"
import modalidades from "./views/loaders/modalidades.js"
import fretes from "./views/loaders/fretes.js"
import pdf from "html-pdf"
import ejs from 'ejs'
import Joi from "joi"
import fs from 'fs'


const app = Express()
const port = 5000
const __dirname = Path.resolve()

app.use(Express.urlencoded({ extended: false }))
app.use(Express.static(Path.join(__dirname, '/public')))

app.set('view engine', 'ejs')
app.set('views', Path.join(__dirname, 'views'))


app.get('/', async (req, res) => {
    res.render('pages/home')
})


app.get('/about', async (req, res) => {
    res.render('pages/about')
})


app.get('/emissor', async (req, res) => {
    res.render('pages/generator', { states, modalidades, fretes })
})


app.post("/nfe", async (req, res, next) => {

    const obj = { ...res.body }

    const html = fs.readFileSync('./views/pages/nfteste.ejs', 'utf-8')
    const nfe = ejs.render(html, obj)
    console.log(html);
    console.log(req.body)

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

})

app.get('/nfteste', (req, res) => {
    res.render('pages/nfteste')
})

app.get('/teste', (req, res) => {
    const obj = { ...res.body }
    const html = fs.readFileSync('./views/pages/nfteste.ejs', 'utf-8')
    const nfe = ejs.render(html, obj)
    let options = {
        "height": "11.25in",
        "width": "8.5in",
        "header": {
            "height": "20mm"
        },
        "footer": {
            "height": "20mm",
        }
    }

    pdf.create(nfe, options).toBuffer((err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.contentType('application/pdf').send(data)
        }
    })
})


// ejs.renderFile(Path.join(__dirname, './views/', "nfe.ejs"), (err, data) => {
//     if (err) {
//         res.send(err);
//     } else {
//         let options = {
//             "height": "11.25in",
//             "width": "8.5in",
//             "header": {
//                 "height": "20mm"
//             },
//             "footer": {
//                 "height": "20mm",
//             },
//         }
//         pdf.create(data, options).toFile("danfe.pdf", function (err, data) {
//             if (err) {
//                 res.send(err);
//             } else {
//                 res.send("Nota emitida com sucesso");
//             }
//         })
//     }
// })







app.listen(port, () => {
    console.log("Servidor rodando na porta", port)
})

