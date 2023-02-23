from server import app
from flask import render_template

@app.route("/")
@app.route("/index")
def index():
    title = 'Mercado Digital'
    style = 'css/style-index.css'
    return render_template( "index.html" , title=title,style=style)

@app.route("/login", methods=['GET','POST'])
def login():
    title = 'Login'
    style = 'css/style.css'
    return render_template( "login.html" , title=title , style=style)

@app.route("/cadastro", methods=['GET','POST'])
def cadastro():
    title = 'VendaNoMercadoDigital'
    style = 'css/style-clientes.css'
    return render_template( "cadastro.html" , title=title,style=style)

@app.route("/slide", methods=['GET','POST'])
def slide():
    title = 'Slid'
    style = 'css/style-slide.css'
    return render_template( "slide.html" , title=title,style=style)

@app.route("/novo_index", methods=['GET','POST'])
def novo_index():
    title = 'Novo Index'
    style = 'css/novo-style.css'
    return render_template( "novo_index.html" , title=title,style=style)

app.run(debug=True, host="0.0.0.0")
