import Express from "express"
import Path from "path"
import states from "./views/loaders/states.js"
import modalidades from "./views/loaders/modalidades.js"
import fretes from "./views/loaders/fretes.js"
import pdf from "html-pdf"
import ejs, { renderFile } from 'ejs'
import Joi from "joi"
import fs from 'fs'


const app = Express()
const port = 5000

const __dirname = Path.resolve()

app.use(Express.urlencoded({ extended: true }))
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

// app.use(Express.json())

app.post("/nfe", async (req, res, next) => {

    // const data = { ...res.body }

    const body = req.body

    const data = {
        name: body.cliente_nome_completo,
        data: body.data,
        tipo_cliente: body.tipo_cliente
    }

    const html = fs.readFileSync('./views/pages/nfteste.ejs', 'utf8')
    
    const nfe = ejs.render(html, data)

    console.log('html', html)
    console.log('nfe', nfe)

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

    pdf.create(nfe).toBuffer((err, data) => {
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

