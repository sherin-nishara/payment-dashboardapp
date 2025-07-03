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
| Storage   | AsyncStorage            |

## Project Structure
payment-dashboard/
├── client/       
│   ├── app/     
│   ├── services/
│   └── components/
├── server/      
│   ├── auth/
│   ├── payments/
│   ├── users/
│   └── main.ts

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

- ✅ Dashboard with cards
  
- ✅ Add Payment screen
- ✅ User list screen (admin)


##  Author
**Sherin Nishara**  
📧 sherin@example.com
