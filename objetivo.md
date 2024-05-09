# Arnia BNB
*A Arnia BNB é uma aplicação de reserva de hotéis fictício, que será realizada como Projeto Final do Módulo 2*

## **Entidades**

```plaintext
# Booking: Representa uma reserva de quarto em um hotel. Atributos:

- id: Identificador único da reserva.
- checkin_date: Data de check-in da reserva.
- checkout_date: Data de checkout da reserva.
- gests: Quantidade de hóspedes.
- id_room: Identificador do quarto reservado.
- id_guest: Identificador do hóspede que fez a reserva.
- status: Status da reserva (por exemplo, "confirmada", "cancelada", "em andamento", "concluída").
```
```plaintext
# Room: Representa um quarto do hotel. Atributos:

- id: Identificador único do quarto.
- number: Número do quarto.
- type: Tipo de quarto (por exemplo, "individual", "duplo", "suíte").
- guest_capacity: Capacidade máxima de hóspedes no quarto.
- daily_rate: Valor da diária do quarto.
- photo: Foto do quarto.
- status: Status do quarto (por exemplo, "disponível", "ocupado", "em manutenção").
```
```plaintext
# Guest: Representa um hóspede do hotel. Atributos:

- id: Identificador único do hóspede.
- name: Nome completo do hóspede.
- cpf: CPF do hóspede.
- phone_number: Telefone do hóspede.
- email: Email do hóspede.
- password: Senha do hóspede. Deve ser armazenada criptografada.
- bookings: Booking[]
```
```plaintext
# Admin: Representa o gerente do hotel. Atributos:

- email: Email do gerente.
- password: Senha do gerente. Deve ser armazenada criptografada.
```

**Relações entre Entidades**:
- Uma reserva está associada a um quarto e a um hóspede.
- Um quarto pode ter várias reservas ao longo do tempo.
- Um hóspede pode fazer várias reservas em diferentes quartos.

## **Casos de Uso**

1. **Cadastro do Hóspede**
   - Não permitir o cadastro se um usuário com o mesmo e-mail já existir
   - Criptografar a senha antes de armazenar no banco de dados

2. **Login do Hóspede**
   - Informações necessárias: e-mail e senha
   - Não gerar um token se não existir um usuário com o e-mail fornecido
   - Não gerar um token se a senha enviada não for compatível com a do banco de dados
   - Gerar um token e retornar se as credenciais estiverem corretas

3. **Login de Gerente** Obs: O cadastro do gerente deve ser feito via banco de Dados
   - Informações necessárias: e-mail e senha
   - Não gerar um token se não existir um admin com o e-mail fornecido
   - Não gerar um token se a senha enviada não for compatível com a do banco de dados
   - Gerar um token e retornar se as credenciais estiverem corretas

4. **Cadastro de Quarto (ROTA PRIVADA - ADMIN)**
   - Informações necessárias: number, type, gest_capacity, daily_rate e photo. O status inicial é sempre disponível.
   - Não permitir o envio se o usuário que está executando a ação não for um administrador

5. **Alterar Status Quarto (Check in, checkout e manutenção) (ROTA PRIVADA - ADMIN)**
   - Rota para alterar o status do quarto entre: "disponível", "ocupado", "em manutenção"
   - Não permitir o envio se o usuário que está executando a ação não for um administrador

6. **Listar Todos os Quartos disponíveis**
   - Deve listar os quartos com status "disponível"

7. **Listar Todos os Quartos disponíveis por data**
   - Deve listar os quartos com status "disponível".
   - Deve listar apenas os quartos que não possuirem reserva "confirmada" ou "em andamento" na data especificada.

8. **Reservar quarto (ROTA PRIVADA)**
   - Deve ser informado: datas de checkin e checkout, quantidade de guests, id_room. O status inicial deve ser "confirmada"
   - Verificar se já não existe uma reserva no intervalo solicitado
   - Verificar se a quantidade de guests é menor ou igual a capacidade do quarto
   - Deve retornar a reserva com o id cadastrado

9. **Listar todas as reservas para o hóspede (ROTA PRIVADA)**
   - Deve retornar um array com todas as reservas feitas pelo hóspede logado.

10. **Cancelar reserva (ROTA PRIVADA)**
    - Deve ser informado: id da reserva. 
    - O status atual da reserva não pode estar como "em andamento"