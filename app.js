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

app.get('/ejs', async (req, res) => {
    res.render('pages/ex')
})

// app.post('/nfe', async (req, res) => {
//     res.render('nfe')
// })


// TypeError: this.templateText.replace is not a function
//     at Template.generateSource (/Users/manofgpa/Documents/projects/infnet/projects/projeto-1-emissor-nfe/node_modules/ejs/lib/ejs.js:721:25)
//     at Template.compile (/Users/manofgpa/Documents/projects/infnet/projects/projeto-1-emissor-nfe/node_modules/ejs/lib/ejs.js:585:12)
//     at Object.compile (/Users/manofgpa/Documents/projects/infnet/projects/projeto-1-emissor-nfe/node_modules/ejs/lib/ejs.js:396:16)
//     at handleCache (/Users/manofgpa/Documents/projects/infnet/projects/projeto-1-emissor-nfe/node_modules/ejs/lib/ejs.js:233:18)
//     at Object.exports.render (/Users/manofgpa/Documents/projects/infnet/projects/projeto-1-emissor-nfe/node_modules/ejs/lib/ejs.js:423:10)
//     at file:///Users/manofgpa/Documents/projects/infnet/projects/projeto-1-emissor-nfe/app.js:47:21
//     at Layer.handle [as handle_request] (/Users/manofgpa/Documents/projects/infnet/projects/projeto-1-emissor-nfe/node_modules/express/lib/router/layer.js:95:5)
//     at next (/Users/manofgpa/Documents/projects/infnet/projects/projeto-1-emissor-nfe/node_modules/express/lib/router/route.js:137:13)
//     at Route.dispatch (/Users/manofgpa/Documents/projects/infnet/projects/projeto-1-emissor-nfe/node_modules/express/lib/router/route.js:112:3)
//     at Layer.handle [as handle_request] (/Users/manofgpa/Documents/projects/infnet/projects/projeto-1-emissor-nfe/node_modules/express/lib/router/layer.js:95:5)

app.post("/nfe", (req, res, next) => {

    const obj = { ...res.body }
    
    const html = fs.readFileSync('./views/pages/nfe.ejs', 'utf-8')
    const nfe = ejs.render(html, obj)
    console.log(html);
    console.log(req.body)

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

