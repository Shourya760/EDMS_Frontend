# EDMS Frontend

This is a beginner-friendly React + Vite frontend for an Employee Document
Management System.

Organizations often store employee information and documents in multiple
locations. This project keeps the important employee data and document records
in one simple dashboard.

## Main Features

- Centralized employee management
- Secure document storage UI
- Easy searching and filtering
- Document organization by employee and category
- Profile management for the admin

## Run

```bash
npm install
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173`.

## Flow

1. Login or register from `/login` or `/register`.
2. After submitting either form, the app navigates to `/dashboard`.
3. The dashboard shows the project purpose, feature cards, and summary counts.
4. Employees can be viewed and searched from `/employees`.
5. A new employee form opens at `/employees/new`.
6. Departments are listed at `/departments`.
7. Documents can be uploaded, searched, and filtered from `/documents`.
8. Admin account details are shown at `/profile`.

The current frontend uses shared mock data in `src/data/mockData.js`. This keeps
the project simple for beginners and makes it ready to connect to a backend API
later.
