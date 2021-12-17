const express = require('express')
const morgan = require('morgan')
const uuid = require('uuid')

const app = express()

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('¡Servidor en marcha!'))

//Registrar en motor de plantillas
app.set('view engine', 'ejs')
// app.set('views', 'misViews')  Por defecto la carpeta para las vistas es views

// app.use((req, res, next) => {
//     console.log('Hay una petición...');
//     console.log('host:', req.hostname);
//     console.log('path:', req.path);
//     console.log('method', req.method);
//     next();
// })

// app.use((req, res, next) => {
//     console.log('Estoy en el 2ndo Middleware');
//     // console.log(new Date);
//     next();
// })
const blogs = [
        {id: 1, title: 'Primer Blog', resume: 'Resumen del primer blog', body: 'uno'},
        {id: 2, title: 'Segundo Blog', resume: 'Resumen del segundo blog', body: 'dos'},
        {id: 3, title: 'Tercero Blog', resume: 'Resumen del tercer blog', body: 'tres'}
    ]

app.use(morgan('tiny'))

app.use(express.static('public'))

app.use(express.urlencoded({extended: false}))


app.get('/', (req, res) => {
    
    res.render('index', {title: 'Inicio', blogs})
})

app.post('/', (req, res) => {
    // console.log(req.body);
    // res.send('Formulario recibido...')
    const blog = {id: uuid.v4(), ...req.body}
    blogs.push(blog)
    console.log(blogs);
    res.redirect('/')
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
})

app.get('/blog/create', (req, res) => {
    res.render('create', {title: 'Crear un blog nuevo'})
})

const ids = []
    blogs.forEach(blog => {
        ids.push(blog.id)
    })

app.get('/blog/:id', (req, res)=>{
    console.log(req.params.id);
    const id = req.params.id;
    console.log(id);
    if(ids.includes(+id) === true){
        console.log('hola');
        res.render('about', {title: 'About'});
        
    }else{
        res.render('404', {title: '404'})
    }
    console.log(ids);
    console.log(ids.includes(+id));
    
   
    
})

app.use((req, res) => {
    res.status(404).render('404', {title: '404'})
})