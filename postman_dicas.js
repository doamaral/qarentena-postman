//npx serverest - p 3500 - t 3600

/*
##########    GET    ###############
HEADER
*/
pm.test("deveria retornar código 200", function(){
    pm.expect(pm.response.code).to.equal("200");
    //ou
    pm.response.to.have.status(200);
});

pm.test("deveria retornar reason OK", function(){
    pm.expect(pm.response.reason()).to.equal("OK");
    //ou
    pm.response.to.be.ok;
});

pm.test("deveria ter Content-Type ho header", function(){
    pm.expect(pm.response.headers.get("Content-Type")).to.not.be.undefined;
    //ou
    pm.response.to.have.header("Content-Type");
});

pm.test("deveria retornar \"Content-Type\": \"application/json; charset=utf-8\"", function () {
    pm.expect(pm.response.headers.get("Content-Type")).to.equal("application/json; charset=utf-8");
    //ou
    pm.response.to.have.header("Content-Type", "application/json; charset=utf-8");
});


/*
##########    GET    ###############
Body
*/
pm.test("deveria conter um Body", function(){
    pm.expect(pm.response.json()).to.not.be.undefined;
    //ou
    pm.response.to.have.body();
});

pm.test("deveria ter atributo quantidade igual ao tamanho do array", function () {
    const responseJson = pm.response.json()
    pm.expect(responseJson.produtos.length).to.equal(responseJson.quantidade)
});

pm.test("deveria ter produto com nome 'Logitech MX Vertical'", function(){
    pm.expect(pm.response.text()).to.includes("Logitech MX Vertical")
});

pm.test("produto aleatório deve ter nome _.random", function(){
    //Arrange
    const responseJson = pm.response.json().produtos;
    
    //Act
    const randomIndex = _.random(0, responseJson.length-1);

    //Assert
    pm.expect(responseJson[randomIndex].nome).to.not.be.undefined;
});

pm.test("produto aleatório deve ter nome _.sample", function(){
    pm.expect(_.sample(pm.response.json().produtos).nome).to.not.be.undefined;
});

pm.test("todos os produtos devem ter preco _.forEach", function(){
    _.forEach(pm.response.json().produtos, function(produto){
        pm.expect(produto.preco).to.not.be.null;
    })
});

/*
##########    POST    ###############
POST {{baseUrl}}/produtos
{
  "nome": "x",
  "preco": "y",
  "descricao": "z",
  "quantidade": "w"
}

PRE-REQUEST
    {{produtos}} -> Variável de Collection -> como Mouse,Teclado,Pendrive,Computador,Impressora,Disquete
    const baseName = _.sample(pm.environment.get("produtos").split(","))+ " ";
    const suffix = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    pm.collectionVariables.set("nomeProduto", baseName + suffix);
    pm.collectionVariables.set("precoProduto", _.random(100, 850));
    pm.collectionVariables.set("descricaoProduto", baseName);
    pm.collectionVariables.set("qtdProduto", _.random(1, 200));
*/

/*
##########    PUT    ###############
PUT {{ baseUrl }} /produtos
{
    "nome": "x",
    "preco": "y",
    "descricao": "z",
    "quantidade": "w"
}



pm.test("Autenticação", () => {
    pm.environment.set("auth-token", pm.response.json().authorization.split(" ")[1]);
});
*/

//newman run "ServeRest.postman_collection.json" -e "ServeRest - Local.postman_environment.json" --folder "Produtos" -n 5