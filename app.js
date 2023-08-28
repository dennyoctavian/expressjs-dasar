import express from "express";
import bodyParser from "body-parser";

const app = express()
const port = 3000

const logger = (req, res, next)=> {
    console.info("masuk ke middleware")
    next()
}

const auth = (req, res, next) => {
    if(req.get('Authorization')){
        req.name = "Denny"
        next()
    }
    else {
        res.status(400).end()
    }
}

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(logger)
app.use(auth)

app.get('/test', (req, res) => {
    res.set('Content-Type', 'text/plain')

    res.set({
    'Content-Type': 'text/plain',
    'X-Type': 'Denny',
    ETag: '12345'
    })
    res.status(200).send(`Hello World Masa Sih ${req.name}`)
  })
app.get('/:id', (req, res) => {
    console.log(req.secure)
    console.log(req.subdomains)
    console.log(req.path)
    console.log(req.protocol)
    console.log(req.secure)
    console.log(req.query)
    console.log(req.params)
    console.log(req.headers['host'])
    console.log(req.headers['accept'])
    console.log(req.get('accept'))
    console.log(req.body)
  res.send('Hello World!')
})
app.post('/', (req, res) => {
  res.send('Post Hello World!')
})
app.put('/', (req, res) => {
  res.send('PUT Hello World!')
})
app.delete('/', (req, res) => {
  res.send('DELETE Hello World!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})