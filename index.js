import Express from "express"
import Path from "path"
import ejs from "ejs"


const app = Express()
const port = 5000
const __dirname = Path.resolve()

const controllerMethod = (req,res,next) => {
    res.sendFile(Path.join(__dirname, 'app/assets/pages/home.html'))
}

app.get('/', (controllerMethod))

// app.get('/sobre', function(req, res) {
//     res.sendFile(Path.join(__dirname, 'app/assets/pages/home.html'))
//   });



app.listen(port, () => {
    console.log("Servidor rodando na porta", port)
})

