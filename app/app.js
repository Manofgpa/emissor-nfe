import Path from "path"
import Express from "express"
import states from "./views/loaders/states.js"
import modalidades from "./views/loaders/modalidades.js"
import fretes from "./views/loaders/fretes.js"
import paymentMethods from './views/loaders/meioPagamentos.js'
import formaPagamentos from './views/loaders/formaPagamentos.js'
import pdf from "html-pdf"
import ejs from 'ejs'
import fs from 'fs'
import routes from './routes/routes.js'
import Joi from "joi"


const app = Express()
const port = 5000
const __dirname = Path.resolve()

routes(app)

app.set('view engine', 'ejs')
app.set('views', Path.join(__dirname + '/app', 'views'))
app.use(Express.static(Path.join(__dirname + '/app', '/public')))
app.use(Express.urlencoded({ extended: true }))
// app.use(Express.json())

app.get('/', async (req, res) => {
    res.render('pages/home')
})

app.get('/about', async (req, res) => {
    res.render('pages/about')
})

app.get('/emissor', async (req, res) => {
    res.render('pages/generator', { states, modalidades, fretes, paymentMethods, formaPagamentos })
})

app.post("/nfe", async (req, res, next) => {

    const data = req.body
    console.log(data)
    const html = fs.readFileSync('./views/pages/nfteste.ejs', 'utf8')
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
})

app.listen(port, () => {
    console.log("Servidor rodando na porta", port)
})