const blogs = require('../models/blog')
const uuid = require('uuid')

const blog_index = (req, res) => {
    
    res.render('index', {title: 'Inicio', blogs})
}

const blog_post = (req, res) => {
    // console.log(req.body);
    // res.send('Formulario recibido...')
    const blog = {id: uuid.v4(), ...req.body}
    blogs.push(blog)
    // console.log(blogs);
    res.redirect('/')
}

const blog_create = (req, res) => {
    res.render('create', {title: 'Crear un blog nuevo'})
}

const blog_detail = (req, res)=>{
    console.log(req.params.id);
    console.log(req.body);
    const id = req.params.id;
    const blog = blogs.find(blog => blog.id == id)
    console.log(id);
    res.render('blogexpanded', {title: id, blog});
}

const blog_update = (req, res)=>{
    const id = req.params.id;
    const blog = blogs.find(blog => blog.id == id)
    console.log(blog);
    res.render('update', {title: 'Update', blog})
}

const blog_delete = (req, res)=>{
    const id = req.params.id;
    blogs.forEach((blog, index) =>{
        if(blog.id == id){
            blogs.splice(index, 1)
        }else{
            res.json({err: 'No se ha encontrado'})
        }
    })
    res.json({redirect: '/'})
    // res.send('Elemento eliminado' + ' ' + req.params.id)
}

module.exports = {
    blog_index,
    blog_post,
    blog_create,
    blog_detail,
    blog_update,
    blog_delete
}