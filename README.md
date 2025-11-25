Hotel Booking API

API completa para gerenciamento de usuários, quartos e reservas de um
sistema de hospedagem. Desenvolvida com Node.js, TypeScript, Express e
MongoDB (Mongoose), seguindo arquitetura em camadas.

Funcionalidades

Usuários

-   Criar conta
-   Login
-   Listar reservas
-   Cancelar reservas

Quartos

-   Criar quarto com foto
-   Atualizar status
-   Listar quartos livres
-   Buscar por data

Reservas

-   Criar reserva com verificação de disponibilidade

Estrutura do Projeto

src/ ├─ controllers/ ├─ services/ ├─ routes/ ├─ middlewares/ ├─
entities/ ├─ uploads/ └─ server.ts

Tecnologias

-   Node.js
-   Express
-   TypeScript
-   MongoDB + Mongoose
-   Multer
-   Bcrypt

Execução

npm install npm run dev

Melhorias Futuras

-   Swagger
-   Testes automatizados
-   Melhor validação de dados
