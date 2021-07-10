# Desafio de desenvolvimento CAF

## By: Nícolas Conterato Soares


### Instruções de uso

Na raiz do projeto deve-se criar um .env com as seguintes variaveis: 
`BRASIL_IO_API_AUTH_TOKEN` com o token de autenticação para utilização do serviço Brasil.io;
`MONGO_DATABASE_URL` com o link de conexão da base de dados local

Considerando a existência das rotas `/real-time` e `/cached` em ambas é necessário passar o parâmetro `cnpj=<TROCAR_POR_CNPJ>`.

A rota `/real-time` busca diretamente no endereço do Brasil.io e atualiza os dados referentes na base de dados local.
A rota `cached` busca primeiro na base de dados local, se for encontrado um resultado o mesmo será retornado ao cliente. Caso não encontre localmente, buscará em Brasil.io e atualizará os dados referentes na base de dados local.

Caso nenhum parâmetro seja passado ou informações erradas, a API retornará um erro personalizado.
 
