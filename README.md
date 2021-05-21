## ESTE PROJETO FOI REALIZADO COMO TESTE TECNICO PARA A SAIPOS

# Ambiente:
node 14.17.0
npm 6.14.13
mysql 8
nodemon 2.0.7 -global
sequelize-cli 6.2.0 -global

# Deverá ser criado um banco de dados na infraestrutura escolhida utilizando a seguinte instrução SQL:
CREATE SCHEMA `db_todo` DEFAULT CHARACTER SET utf8 ;

# Crie o arquivo .env copiando do arquivo .env.example
# Altere o arquivo .env para suas credenciais de banco de dados e os outros parametros

# Execute no terminal (caso windows)
npm install
npm run dev-migrations
npm run dev-windows

# Execute no terminal (caso linux/mac)
npm install
npm run dev-migrations
npm run dev