"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/register', methods=['POST'])
def register():
    try:
        # aqui extraemos info
        email = request.json.get('email', None)
        password = request.json.get('password', None)
        # aqui chequeamos que toda la info este
        if not email or not password:
            raise Exception('Missing data')
        # aqui chequeamos si usuario existe
        check_user= User.query.filter_by(email=email).first()
        # en caso no existe -> creamos usario
        if not check_user:
            new_user = User(email=email, password=password, is_active=True) # aqui se creo nuevo usuario
            db.session.add(new_user)                                        # aqui se agrego a la tabla
            db.session.commit()                                             #aqui se almacena cambios en la base de datos
            token = create_access_token(identity=str(new_user.id))
            return ({"msg": "okey", 'token': token}), 201
        # si existe usuario, devolvemos que ya hay una cuenta con ese correo
        return jsonify({"msg": "Usuario vinculado a este correo, intenta inciar sesion"}), 400
    except Exception as error:
        return jsonify({'error': str(error)}), 400

@api.route('/login', methods=['POST'])
def login():
    try:
        email = request.json.get('email', None)
        password = request.json.get('password', None)
        if not email or not password:
            raise Exception('Missing data')
        check_user= User.query.filter_by(email=email).first()
        if check_user.password == password:
            token = create_access_token(identity=str(check_user.id))
            return ({"msg": "okey", 'token': token}), 201
        return jsonify({"msg": "Usuario vinculado a este correo, intenta inciar sesion"}), 400
    except Exception as error:
        return jsonify({'error': str(error)}), 400
    


@api.route('/protected' , methods=['GET'])
@jwt_required()
def protected():
    id = get_jwt_identity()
    user = User.query.get(id)
    if not user:
        return jsonify({"msg": "something went wrong"})
    return jsonify({"user": user.serialize()}), 200
