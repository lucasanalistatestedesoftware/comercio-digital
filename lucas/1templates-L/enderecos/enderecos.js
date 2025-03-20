<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Endereços - Neo-Commerce</title>
    <link rel="stylesheet" href="../../css/estilo.css"> <!-- Caminho relativo ao estilo.css -->
    <style>
        body {
            font-family: "Poppins", sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            background-color: #f4f4f4;
        }
        h1 {
            font-size: 2em;
            margin-bottom: 20px;
        }
        p {
            font-size: 1.2em;
        }
        .cep-container {
            display: flex;
            gap: 10px;
            margin-top: 20px;
        }
        #cep-input {
            padding: 10px;
            font-size: 1em;
            border: 1px solid #ccc;
            border-radius: 5px;
            width: 200px;
        }
        #cep-button {
            padding: 10px 20px;
            font-size: 1em;
            background-color: #8d50ff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        #cep-button:hover {
            background-color: #6b38cc;
        }
        #cep-result {
            margin-top: 20px;
            font-size: 1em;
            text-align: center;
            color: #333;
        }
    </style>
</head>
<body>
    <h1>Endereços</h1>
    <p>Adicione seu CEP</p>
    <div class="cep-container">
        <input type="text" id="cep-input" placeholder="Digite seu CEP" maxlength="9">
        <button id="cep-button">Localizar CEP</button>
    </div>
    <div id="cep-result"></div>

    <script>
        document.getElementById("cep-button").addEventListener("click", function () {
            const cepInput = document.getElementById("cep-input").value;
            const cep = cepInput.replace(/\D/g, ""); // Remove caracteres não numéricos
            const resultDiv = document.getElementById("cep-result");

            if (cep.length !== 8) {
                resultDiv.innerHTML = "Por favor, insira um CEP válido com 8 dígitos.";
                return;
            }

            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("CEP não encontrado");
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.erro) {
                        resultDiv.innerHTML = "CEP não encontrado.";
                    } else {
                        resultDiv.innerHTML = `
                            <p><strong>Logradouro:</strong> ${data.logradouro || "N/A"}</p>
                            <p><strong>Bairro:</strong> ${data.bairro || "N/A"}</p>
                            <p><strong>Cidade:</strong> ${data.localidade || "N/A"}</p>
                            <p><strong>Estado:</strong> ${data.uf || "N/A"}</p>
                            <p><strong>CEP:</strong> ${data.cep || "N/A"}</p>
                        `;
                    }
                })
                .catch(error => {
                    resultDiv.innerHTML = "Erro ao buscar o CEP. Tente novamente.";
                    console.error("Erro na API ViaCEP:", error);
                });
        });
    </script>
</body>
</html>