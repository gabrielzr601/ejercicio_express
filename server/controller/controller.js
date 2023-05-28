var Userdb = require('../model/model');

// crear y guardar nuevo usuario

exports.create = (req, res) => {
    if(!req.body){
        res.status(400).send({message: "el contenido no puede estar vacio" });
        return;
    }

    //nuevo usuario
    const user = new Userdb({
        nombre:req.body.nombre,
        email:req.body.email,
        genero:req.body.genero,
        estado:req.body.estado
    })

    // guardar usuario en la base de datos
    user 
        .save(user)
        .then(data=>{
            //res.send(data)
            res.redirect('/add-user');
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message || "se produjo un error al crear una operación de creación"
            });
        });
}
// recuperar y devolver todos los usuarios/recuperar y devolver un solo usuario
exports.find = (req, res) => {

    if(req.query.id){
        const id = req.query.id;
        Userdb.findById(id)
            .then(data=>{
                if(!data){
                    res.status(404).send({message:"Usuario no encontrado con id"+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err=>{
                res.status(500).send({message:"Error al recuperar usuario con id"+ id})
            })
    }else{
        Userdb.find()
            .then(user =>{
                res.send(user)
            })
            .catch(err=>{
                res.status(500).send({message:err.message || "se produjo un error al crear una operación de creación"})
            })
    }



    
}

// actualizar un usuario por id

exports.update = (req, res) => {
    if(!req.body){
        return res
            .status(400)
            .send({message: "Los datos a actualizae no pueden quedar vacios"}) 

    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body,{useFindAndModify: false})
    .then(data=>{
        if(!data){
            res.status(404).send({message: ` No se puede actualizar la usuario con ${id}. Tal vez el usuario no se encuentra`})   
        }else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({message:"Error al actualizar la información del usuario"})
    })
}

//borrar un usuario con identificacion de usuario 
//especificado en la solicitud

exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data =>{
            if(!data){
                res.status(404).send({message: `No se puede eliminar con id ${id}. tal vez el id está mal`})
            }else{
                res.send({
                    message:"El usuario ha sido borrado exitosamente"
                })
            }
        })
        .catch(err=>{
            res.status(500).send({
                message:"No se pudo eliminar el usuario con id=" + id
            });
        });
}