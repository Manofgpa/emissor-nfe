import Express from "express"
import Path from "path"
import states from "./views/loaders/states.js"
import modalidades from "./views/loaders/modalidades.js"
import fretes from "./views/loaders/fretes.js"
import pdf from "html-pdf"
import ejs from 'ejs'


const app = Express()
const port = 5000
const __dirname = Path.resolve()

app.use(Express.urlencoded({ extended: false }))

app.use(Express.static(Path.join(__dirname, '/public')))
app.set('view engine', 'ejs')
app.set('views', Path.join(__dirname, 'views'))


app.get('/', async (req, res) => {
    res.render('home')
})

app.get('/about', async (req, res) => {
    res.render('about')
})


app.get('/emissor', async (req, res) => {
    res.render('generator', { states, modalidades, fretes })
})

app.get('/ejs', async (req, res) => {
    res.render('ex')
})

// app.post('/nfe', async (req, res) => {
//     res.render('nfe')
// })

app.get("/nfe", (req, res) => {
    ejs.renderFile(Path.join(__dirname, './views/', "nfe.ejs"), (err, data) => {
        if (err) {
            res.send(err);
        } else {
            let options = {
                "height": "11.25in",
                "width": "8.5in",
                "header": {
                    "height": "20mm"
                },
                "footer": {
                    "height": "20mm",
                },
            }
            pdf.create(data, options).toFile("danfe.pdf", function (err, data) {
                if (err) {
                    res.send(err);
                } else {
                    res.send("Nota emitida com sucesso");
                }
            })
        }
    })
})






app.listen(port, () => {
    console.log("Servidor rodando na porta", port)
})

