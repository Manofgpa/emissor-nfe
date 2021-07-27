import Express from "express"
import Path from "path"
import states from "./views/loaders/states.js"
import modalidades from "./views/loaders/modalidades.js"
import fretes from "./views/loaders/fretes.js"


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

app.listen(port, () => {
    console.log("Servidor rodando na porta", port)
})

