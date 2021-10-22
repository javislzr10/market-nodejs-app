const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new Schema({

    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, require: true },
    

}, {
    timestamps: true,    
});

UsuarioSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hashSync(password, salt);
};

UsuarioSchema.methods.matchPassword = async function (password) {
   return await bcrypt.compare(password, this.password)
};

module.exports = model('Usuario', UsuarioSchema);