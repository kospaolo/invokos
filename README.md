# Racuni Kos

Custom invoice management system.

## Features

- Invoice and Offer management (Create, Update, Delete)
- Creating customers
- Generating PDF with predefined styling
  
## Technologies Used

- Angular
- Typescript
- Nodejs
- Express
- Firebase
- jsPDF
  
## Run a project

To run this project locally:

1. **Clone the repository:**
   
```bash
git clone https://github.com/kospaolo/invokos.git
```

2. **Navigate to the project directory:**
   
```bash
cd invokos
```

3. **Install frontend dependencies:**
   
```bash
npm install
```

4. **Run the frontend:**
```bash
ng serve
```

5. **Navigate to backend**

```bash
cd backend
```

6. **Install backend dependencies:**
   
```bash
npm install
```

7. **Run server**

```bash
node server.js
```

8. Open project in browser

Navigate to `http://localhost:4200/`

## Database Configuration

For security reasons, I did not include my database information in the repository. To run the project locally, you need to configure your own database:

1. Open `backend/server.js`.
2. Add your **FIREBASE_SERVICE_ACCOUNT** JSON and **Database URL** to the appropriate configuration fields.

Make sure your Firebase project is properly set up to support the application.
