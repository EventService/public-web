const express = require('express')
const app = express()
const path = require('path');

app.use(express.static('public'))

app.get('public-web/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))
app.get('public-web/faq', (req, res) => res.sendFile(path.join(__dirname, 'faq.html')))
app.get('public-web/features', (req, res) => res.sendFile(path.join(__dirname, 'features.html')))
app.get('public-web/about-us', (req, res) => res.sendFile(path.join(__dirname, 'about-us.html')))
app.get('public-web/blogs', (req, res) => res.sendFile(path.join(__dirname, 'blogs.html')))
app.get('public-web/blogs/:blogId', (req, res) => {    
    res.sendFile(path.join(__dirname, 'blog.html'))
})
app.get('public-web/premium', (req, res) => res.sendFile(path.join(__dirname, 'premium.html')))

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))