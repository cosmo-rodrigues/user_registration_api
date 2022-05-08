# EZ Record - API

Esta API foi desenvolvida utilizando Node JS, seguindo o padrão REST e encontra-se hospedada no [Heroku](https://signup.heroku.com/login).
Pode ser executada também através do Docker, tanto local quanto em produção, pois já está configurada para rodar com o Compose e se conectar com um banco MySQL, também configurados.
Todos os ambientes utilizam variáveis de ambiente, para garantir maior segurança na hora de utilizar credenciais.
Todas as suas rotas foram documentadas com o Swagger, e podem ser consultadas [aqui](https://registration-user-api.herokuapp.com/documentation).

## Bibliotecas utilizadas

- [bcryptjs](https://www.npmjs.com/package/bcrypt)
- [cookie-session](https://www.npmjs.com/package/cookie-session)
- [cors](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [morgan](https://www.npmjs.com/package/morgan)
- [mysql2](https://www.npmjs.com/package/mysql2)
- [passport](https://www.passportjs.org/)
- [passport-facebook](https://www.passportjs.org/packages/passport-facebook/)
- [passport-github2](https://www.passportjs.org/packages/passport-github2/)
- [passport-google-oauth20](https://www.passportjs.org/packages/passport-google-oauth20/)
- [sequelize](https://www.npmjs.com/package/sequelize)
- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)

## Rotas

As rotas estão organizadas de acordo com o serviço buscado pelo usuário. E todas elas tem algum tipo de verificação, seja se o tokem é válido, ou se o usuário forneceu as credenciais corretas.

## Dados

Todos os dados, são validados antes de serem salvos no banco de dados, mesmo que isso já possa ter sido aplicado no front, cabe também ao back-end garantir a integridade dos valores que está armazenando.

## Notificações

Todos os erros são tratados e enviados ao cliente com uma mensagem clara sobre o que houve, enviando também o código HTTP correspondente ao erro.

## Arquivos

![Visão geral](https://drive.google.com/file/d/1dcuIK5aErT3qotG-P9jqizgbrxzFkZeR/view?usp=sharing)
![Todas as rotas](https://drive.google.com/file/d/1Hmkdz7kA1EL2aAP02YWJT6-q98_UFGr-/view?usp=sharing)
