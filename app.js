import path from "path"
import express from "express"
import routes from "./app/routes/routes.js"


const app = express()
const port = 5000
const __dirname = path.resolve()

// View engine 
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname + '/app', 'views'))

// Public page
app.use(express.static(path.join(__dirname + '/app', '/public')))

// Url & Json parser
app.use(express.urlencoded({ extended: true }))

// Routes
routes(app)

app.listen(port, () => {
    console.log("Servidor rodando na porta", port)
})