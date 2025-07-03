#  Full-Stack Payment Dashboard App

A cross-platform full-stack app for managing and analyzing payment transactions, with user authentication and an admin panel.

##  Features
-  JWT authentication (login/logout)
-  Add and view payment transactions
-  Dashboard with status badges
-  MongoDB Atlas cloud database

##  Tech Stack

| Layer     | Tech                                  |
|-----------|---------------------------------------|
| Frontend  | Expo (React Native), Axios            |
| Backend   | NestJS, Mongoose (MongoDB), JWT       |
| Database  | MongoDB Atlas                         |
| Storage   | AsyncStorage                          |


##  Backend Setup

```bash
cd server
npm install
```

Create `.env`:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/paymentsdb
JWT_SECRET=secret123
```

Run backend:
```bash
npm run start:dev
```

Backend runs at: `http://<your-ip>:3000`

##  Frontend Setup

```bash
cd client
npm install
npx expo start
```

In `client/services/api.ts`, set:
```ts
baseURL: 'http://<your-ip>:3000'
```

Use Expo Go app to scan and open.

##  Sample Credentials

| Username | Password   | Role   |
|----------|------------|--------|
| admin    | admin123   | admin  |

##  API Endpoints

### Auth
POST /auth/login  
```json
{
  "username": "admin",
  "password": "admin123"
}
```

### Payments
- GET    /payments
- GET    /payments/:id
- GET    /payments/stats
- POST   /payments

### Users
- GET    /users
- POST   /users

## 🧪 Postman Test Example

Users:
![post5](https://github.com/user-attachments/assets/06fb844f-4cba-49fe-ac14-e84911dca2ac)

Login:
![post2](https://github.com/user-attachments/assets/7dff9afe-6247-4a17-ad4e-682575d09148)

Add Payment:
![post4](https://github.com/user-attachments/assets/1a6c0600-db7f-4f46-a0c6-ca55b65ad7af)

Get Payments:
![post3](https://github.com/user-attachments/assets/57dfd810-e874-47f4-87b4-42970d78bb7f)

##  Screenshots

-  Login 
![Screenshot_20250702_204736_Expo Go (1)](https://github.com/user-attachments/assets/cf62c63f-f164-4996-b6cc-dbd86a57ea36)
![Screenshot_20250703_003916_Expo Go](https://github.com/user-attachments/assets/31284f1b-da2b-4ca1-b7af-d2c5bd9deb11)

-  Dashboard
  ![Screenshot_20250703_172159_Expo Go](https://github.com/user-attachments/assets/620c5f0e-a969-49bf-ba45-5b270874af77)

-  Fiter with Date/ Status
  ![Screenshot_20250703_171949_Expo Go](https://github.com/user-attachments/assets/9e0cda25-5116-4b6a-a4e1-a5cd9e857f96)
  ![Screenshot_20250703_172028_Expo Go](https://github.com/user-attachments/assets/143fdf02-edd6-4a63-b07e-da6e55075d26)

-  Add Payment screen
![Screenshot_20250703_171747_Expo Go](https://github.com/user-attachments/assets/4b77388c-2024-446b-9ece-5ff94a417f29)
![Screenshot_20250703_171741_Expo Go](https://github.com/user-attachments/assets/dd0daefa-0992-4bde-9b16-132bd3faa0ee)

-  Transaction Details screen 
![Screenshot_20250703_172347_Expo Go](https://github.com/user-attachments/assets/770f760d-2ed6-4859-8f89-ff12e1d0960d)
![Screenshot_20250703_172233_Expo Go](https://github.com/user-attachments/assets/5a714008-963c-4d85-ab09-e299960e505e)

##  Video Demo
https://drive.google.com/file/d/1YWCo3h7n5ODIuugpNdC05b_or7mImwGJ/view?usp=sharing

##  Author
**Sherin Nishara**  
📧 sherin@example.com
