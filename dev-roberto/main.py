from flask import Flask, render_template


app = Flask(__name__)

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

if __name__=='__main__':
    app.run(debug=True, host="0.0.0.0")
