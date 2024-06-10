# Arnia BNB
Arnia BNB is a fictional hotel reservation application developed as the Final Project of Module 2.

## Introduction
Arnia BNB allows users to make hotel reservations, register as guests, and manage rooms. The application also offers administrative functionalities such as room and reservation management.

## Features
The application has the following main features:

1. **Guest Registration:** Users can register as guests, providing information such as name, CPF (Brazilian ID), phone number, email, and password. The password is encrypted before being stored in the database.

2. **Guest Login:** Guests can log in to the application using their email and password. A token is generated and returned if the credentials are correct.

3. **Manager Login:** Managers can log in to the application using their email and password. A token is generated and returned if the credentials are correct.

4. **Room Registration** (Private Route - Admin): Administrators can register new rooms in the application, providing information such as room number, type, guest capacity, daily rate, and photo.

5. **Room Status Change** (Private Route - Admin): Administrators can change the status of a room between "available," "occupied," and "under maintenance."

6. **List Available Rooms:** The application lists all rooms with the status "available."

7. **List Available Rooms by Date:** The application lists available rooms on a specific date, excluding rooms with confirmed or ongoing reservations on the provided date.

8. **Room Reservation** (Private Route): Users can reserve rooms, providing information such as check-in and check-out dates, number of guests, and room ID.

9. **List Reservations for Guest** (Private Route): The application lists all reservations made by the logged-in guest.

10. **Reservation Cancellation** (Private Route): Guests can cancel their reservations. Cancellation is only allowed if the reservation status is not "ongoing."

Prerequisites
Node.js
npm or yarn
MongoDB

## Installation
1. Clone the repository.
2. Install dependencies using the command npm install or yarn install.
3. Set up environment variables in the .env file.

```plaintext
Copiar código
DATABASE_URL=<Your_database_URL>
SECRET=<Your_secret_key_for_generating_JWT_tokens>
```

Start the server with the command npm run dev or yarn dev.
License
This project is licensed under the MIT License.