Requisitos:
    - Node v16.14.0
    - Docker v20.10.12, build e91ed57

Outras dependências:
    - Typescript
        npm install typescript @types/express @types/node --save-dev
    - Express & TypeORM & Postgres
        npm install express pg typeorm
    - cors    
        npm install cors
        npm install --save-dev @types/cors

    - Criar container Postgres no Docker*
        docker run -d -p 5433:5432 --name vuttr -e POSTGRES_USER=vuttr -e POSTGRES_PASSWORD=vuttr --mount src=db-vuttr,dst=/var/lib/postgresql/data postgres

Run:
    - node ./build/server.js

OBS:
    * Caso a máquina já esteja usando a porta 5432, rodando o postgres por exemplo, não vai ser possível escutar em tal porta no Docker. Faz-se necessário finalizar o processo que utiliza essa porta para executar normalmente.