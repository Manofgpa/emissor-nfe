import Express from "express"
import Path from "path"

const app = Express()
const port = 5000
const __dirname = Path.resolve()


app.set('view engine', 'ejs')
app.set('views', Path.join(__dirname, 'views'))
app.use(Express.static('public'))

app.get('/', async (req, res) => {
    res.render('home')
})

app.get('/about', async (req, res) => {
    res.render('about')
})

app.get('/emissor', async (req, res) => {
    res.render('generator')
})

app.listen(port, () => {
    console.log("Servidor rodando na porta", port)
})

