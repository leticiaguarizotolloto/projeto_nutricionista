const express = require("express")
const consultas = require("../dados.json")

const calcularIMC = () => {
    consultas.forEach(c => {
        c.imc = (c.peso / (c.altura * c.altura)).toFixed(2)
    })
}

const mostrarConsultas = (req, res) => {
    calcularIMC()
    res.send(consultas)
}

const novaConsulta = (req, res) => {
    if (req.body) {
        consultas.push(req.body)
        res.send("Consulta recebida, em análise")
    } else {
        res.send("Erro ao receber consulta")
    }
}

const app = express()

app.use(express.urlencoded({ extended: true }))

const porta = 3000

const excluirConsulta = (req, res) => {
    const id = req.params.id;
    let status = 0;

    consultas.forEach((consulta, indice) => {
        if(consulta.id == id) {
            status = 1;
            consultas.splice(indice, 1);
        }
    });

    if (status == 1) {
    res.send("Consulta Excluída com Sucesso");
    }else {
        res.status(404).send("Consulta não encontrada");
    }
};

const atualizarConsulta = (req, res) => {
    const id = req.query.id;
    const dados = req.body;
    let status = 0;
   
    consultas.forEach((consulta) => {
        if(consulta.id == id) {
            status = 1;
            consulta.data = dados.data;
            consulta.paciente = dados.paciente;
            consulta.peso = dados.peso;
            consulta.altura = dados.altura;
        }
    });

    if(status == 1) {
    res.send("Consulta atualizada com sucesso!");
    }else{
        res.status(404).send("Consulta não encontrada");
    }
};

app.post("/", novaConsulta)
app.get("/", mostrarConsultas)
app.delete("/:id",excluirConsulta)
app.patch("/", atualizarConsulta);


app.listen(porta, () => {
    console.log(`Paciente: http://127.0.0.1:5500/paciente/`)
    console.log(`Servidor: http://127.0.0.1:${porta}`)
})
