const express = require('express')
const morgan = require('morgan')
const blogRoutes = require('./routes/blogRoutes.js')
const app = express()



const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('¡Servidor en marcha!'))
//Registrar en motor de plantillas
app.set('view engine', 'ejs')

// const ids = []
//     blogs.forEach(blog => {
//         ids.push(blog.id)
//     })    

app.use(morgan('tiny'))

app.use(express.static('public'))

app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) =>{
    res.redirect('/blog')
})



app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
})

app.use('/blog',blogRoutes)

app.use((req, res) => {
    res.status(404).render('404', {title: '404'})
})