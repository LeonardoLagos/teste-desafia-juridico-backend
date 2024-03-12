# teste-desafia-juridico-backend
para executar o aplicativo basta rodar o comando
npm i 
e em seguida
npm run dev

após rodar o ddl e configurar a conexão com o banco, é recomendado o uso do endpoint '/clients/randomRegisters'
esse endpoint cria registros no banco de dados para teste, basta passar a quantidade no body
{ 
    "amount": 50
}