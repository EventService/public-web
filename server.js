const express = require('express')
const app = express()
const path = require('path');

app.use(express.static('public'))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))
app.get('/faq', (req, res) => res.sendFile(path.join(__dirname, 'faq.html')))
app.get('/features', (req, res) => res.sendFile(path.join(__dirname, 'features.html')))
app.get('/news', (req, res) => res.sendFile(path.join(__dirname, 'news.html')))
app.get('/news/:blogId', (req, res) => {    
    res.sendFile(path.join(__dirname, 'blog.html'))
})
app.get('/premium', (req, res) => res.sendFile(path.join(__dirname, 'premium.html')))
app.get('/terms-of-use', (req, res) => res.sendFile(path.join(__dirname, 'terms-of-use.html')))
app.get('/privacy', (req, res) => res.sendFile(path.join(__dirname, 'privacy.html')))
app.get('/terms-of-use-en', (req, res) => res.sendFile(path.join(__dirname, 'terms-of-use-en.html')))
app.get('/privacy-en', (req, res) => res.sendFile(path.join(__dirname, 'privacy-en.html')))

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
