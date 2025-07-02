# 🧾 Full-Stack Payment Dashboard App

A cross-platform full-stack app for managing and analyzing payment transactions, with user authentication and an admin panel.

## 🚀 Features
-  JWT authentication (login/logout)
-  Add and view payment transactions
-  Dashboard with status badges
-  Admin analytics for trends
-  User management screen
-  MongoDB Atlas cloud database

## 🧰 Tech Stack

| Layer     | Tech                                  |
|-----------|---------------------------------------|
| Frontend  | Expo (React Native), Axios            |
| Backend   | NestJS, Mongoose (MongoDB), JWT       |
| Database  | MongoDB Atlas                         |
| Storage   | AsyncStorage            |

## Project Structure
payment-dashboard/
├── client/       # Expo frontend
│   ├── app/      # screens and routes
│   ├── services/
│   └── components/
├── server/       # NestJS backend
│   ├── auth/
│   ├── payments/
│   ├── users/
│   └── main.ts

## ⚙️ Backend Setup

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

## 📱 Frontend Setup

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

## 🔐 Sample Credentials

| Username | Password   | Role   |
|----------|------------|--------|
| admin    | admin123   | admin  |

## 📬 API Endpoints

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

Login:

Add Payment:

##  Screenshots

- ✅ Dashboard with cards
- ✅ Add Payment screen
- ✅ User list screen (admin)


##  Author
**Sherin Nishara**  
📧 sherin@example.com
