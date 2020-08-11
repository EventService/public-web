const express = require('express')
const app = express()
const path = require('path');

app.use(express.static('public'))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))
app.get('/faq', (req, res) => res.sendFile(path.join(__dirname, 'faq.html')))
app.get('/features', (req, res) => res.sendFile(path.join(__dirname, 'features.html')))
app.get('/about-us', (req, res) => res.sendFile(path.join(__dirname, 'about-us.html')))
app.get('/blogs', (req, res) => res.sendFile(path.join(__dirname, 'blogs.html')))
app.get('/blogs/:blogId', (req, res) => {    
    res.sendFile(path.join(__dirname, 'blog.html'))
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))