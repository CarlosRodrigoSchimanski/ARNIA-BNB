# Arnia BNB

A Arnia BNB é uma aplicação de reserva de hotéis fictícia desenvolvida como Projeto Final do Módulo 2.

## Introdução

A Arnia BNB permite que usuários façam reservas em hotéis, cadastrem-se como hóspedes e gerenciem quartos. A aplicação também oferece funcionalidades administrativas, como gerenciamento de quartos e reservas.

## Funcionalidades

A aplicação possui as seguintes funcionalidades principais:

1. **Cadastro de Hóspede:** Os usuários podem se cadastrar como hóspedes, fornecendo informações como nome, CPF, telefone, e-mail e senha. A senha é criptografada antes de ser armazenada no banco de dados.

2. **Login de Hóspede:** Os hóspedes podem fazer login na aplicação usando seu e-mail e senha. Um token é gerado e retornado se as credenciais estiverem corretas.

3. **Login de Gerente:** Os gerentes podem fazer login na aplicação usando seu e-mail e senha. Um token é gerado e retornado se as credenciais estiverem corretas.

4. **Cadastro de Quarto (Rota Privada - Admin):** Os administradores podem cadastrar novos quartos na aplicação, fornecendo informações como número, tipo, capacidade de hóspedes, taxa diária e foto.

5. **Alteração de Status de Quarto (Rota Privada - Admin):** Os administradores podem alterar o status de um quarto entre "disponível", "ocupado" e "em manutenção".

6. **Listagem de Quartos Disponíveis:** A aplicação lista todos os quartos com status "disponível".

7. **Listagem de Quartos Disponíveis por Data:** A aplicação lista os quartos disponíveis em uma data específica, excluindo os quartos que possuem reservas confirmadas ou em andamento na data fornecida.

8. **Reserva de Quarto (Rota Privada):** Os usuários podem fazer reservas de quartos, fornecendo informações como datas de check-in e check-out, quantidade de hóspedes e ID do quarto.

9. **Listagem de Reservas para o Hóspede (Rota Privada):** A aplicação lista todas as reservas feitas pelo hóspede logado.

10. **Cancelamento de Reserva (Rota Privada):** Os hóspedes podem cancelar suas reservas. O cancelamento só é permitido se o status da reserva não estiver como "em andamento".

## Pré-requisitos

- Node.js
- npm ou yarn
- MongoDB

## Instalação

1. Clone o repositório.
2. Instale as dependências utilizando o comando `npm install` ou `yarn install`.
3. Configure as variáveis de ambiente no arquivo `.env`.

```plaintext
DATABASE_URL=<URL_do_seu_banco_de_dados>
SECRET=<Sua_chave_secreta_para_gerar_tokens_JWT>
```

Inicie o servidor com o comando npm run dev ou yarn dev.


Licença
Este projeto está licenciado sob a licença MIT.






