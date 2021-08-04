import fs from 'fs'
import path from "path"
import pdf from "html-pdf"
import ejs from 'ejs'


const __dirname = path.resolve()

export default v1Route => {

    v1Route.route('/nfe')

        .post((req, res, next) => {

            const data = req.body
            console.log(data)
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
        })
}
