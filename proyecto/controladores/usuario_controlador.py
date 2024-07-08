from flask import  jsonify,request  #,Flask# del modulo flask importar la clase Flask y los métodos jsonify,request
from app import app, db,ma
from modelos.usuario_modelo import *

class UsuarioSchema(ma.Schema):
    class Meta:
        fields=('id','usuario','clave','rol')
usuario_schema=UsuarioSchema()            # El objeto usuario_schema es para traer un usuario
usuarios_schema=UsuarioSchema(many=True)  # El objeto usuarios_schema es para traer multiples registros de usuario

@app.route('/crear_admin', methods=['POST'])
def crear_admin():
    usuario = request.json['usuario']
    clave = request.json['clave']
    # Aquí se puede agregar lógica adicional para verificar que el usuario que realiza la solicitud tenga permisos de administrador.
    new_admin = Usuario(usuario, clave, 'admin')
    db.session.add(new_admin)
    db.session.commit()
    return usuario_schema.jsonify(new_admin)

# crea los endpoint o rutas (json)
@app.route('/usuarios',methods=['GET'])
def get_Usuarios():
    all_usuarios=Usuario.query.all()         # el metodo query.all() lo hereda de db.Model
    result=usuarios_schema.dump(all_usuarios)  # el metodo dump() lo hereda de ma.schema y
                                               # trae todos los registros de la tabla
    return jsonify(result)                       # retorna un JSON de todos los registros de la tabla

@app.route('/usuarios/<id>',methods=['GET'])
def get_id(id):
    usuario=Usuario.query.get(id)
    return usuario_schema.jsonify(usuario)   # retorna el JSON de un usuario recibido como parametro


@app.route('/usuarios/<id>' ,methods=['PUT'])
def update_usuario(id):
    usuario=Usuario.query.get(id)
    usuario.usuario=request.json['usuario']
    usuario.clave=request.json['clave']
    usuario.rol=request.json['rol']
    db.session.commit()
    return usuario_schema.jsonify(usuario)


@app.route('/usuarios', methods=['POST'])  # Solo accesible para administradores
def create_usuario():
    if request.json['rol'] == 'admin':
        return jsonify({"message": "Unauthorized"}), 403
    usuario = request.json['usuario']
    clave = request.json['clave']
    rol = request.json['rol']
    new_usuario = Usuario(usuario, clave, rol)
    db.session.add(new_usuario)
    db.session.commit()
    return usuario_schema.jsonify(new_usuario)

@app.route('/usuarios/<id>', methods=['DELETE'])  # Solo accesible para administradores
def delete_usuario(id):
    usuario = Usuario.query.get(id)
    if usuario.rol != 'admin':
        return jsonify({"message": "Unauthorized"}), 403
    db.session.delete(usuario)
    db.session.commit()
    return usuario_schema.jsonify(usuario)
