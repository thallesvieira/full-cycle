const { application, response } = require('express')
const express = require('express')
const app = express()
const port = 3000
var responseStr = "MySQL Data:";
const nomes =["Luan","Pedro","Caio", "Mariana", "Lígia", "Rafaela"]

app.get('/',function(req,res){
    const config = {
        host: 'db',
        user: 'root',
        password: '123',
        database: 'nodedb'
    };

    console.log("conectando...")
    const i = Math.floor(Math.random() * (5 - 0)) + 0;
    const nome = nomes[i];
    const mysql = require('mysql')
    const connection = mysql.createConnection(config)
    const insertQuery = `INSERT INTO people (name) values ('`+nome+`')`;
    const selectQuery = 'SELECT * FROM people;';
    
    connection.connect();
    console.log("conectado")
    
    connection.query(insertQuery);
    connection.query(selectQuery, function (err, results, fields) {
        responseStr = '';
        
        results.forEach(function(data) {
            console.log(data)
            responseStr += '<p>Nome: ' + data.name + '</p>\n'  
        });

        if (responseStr.length == 0)  
            responseStr = 'Nenhuma informação encontrada';

        console.log(responseStr);
        res.status(200).send('<h1>Full Cycle</h1>\n' + 
                            '<h3>Tabela People</h3> \n' +
                            responseStr);
    });

    connection.end();
});

app.listen(port, () =>{
    console.log('Rodando na porta ' + port)
})
