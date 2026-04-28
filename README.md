<div align="center">

# ⚡ ULTRA CRM

### Modern Customer Relationship Management Platform

A full-stack, premium CRM application built with Node.js, Express, MongoDB, and EJS.  
Manage contacts, track leads, nurture customers, and grow your revenue — all from one powerful dashboard.

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7+-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

</div>

---

## ✨ Features

### 🏠 Premium Landing Page
- Hero section with animated dashboard mockup (3D perspective tilt)
- Feature grid, 3-tier pricing, testimonials, and CTA sections
- Responsive navigation with animated hamburger menu on mobile
- Glassmorphism UI with gradient orbs and dot-grid overlays

### 🔐 Authentication
- Secure user registration and login with **Passport.js** (Local Strategy)
- Password hashing with **bcryptjs**
- Session management with **express-session** + **MongoDB store**
- Split-screen auth pages with animated feature panels
- Protected routes via middleware guards

### 📊 Dashboard
- Real-time stat cards (Leads, Revenue, Customers, Deals) with trend indicators
- Revenue bar chart and lead sources doughnut chart (**Chart.js**)
- Recent contacts table with status badges
- Activity feed timeline
- Fully responsive 2×2 grid layout on mobile

### 👥 Contact Management
- Full CRUD (Create, Read, Update, Delete) for contacts
- Status categorization: Lead → Prospect → Customer → Inactive
- Search contacts with live filtering
- Filter pills by status
- Responsive data table with horizontal scroll on mobile

### 🎯 Lead Pipeline
- Dedicated lead management interface
- Inline editing via modal dialogs
- Live search, status filters, and sort toggles (Newest/Oldest)
- Real-time result count
- Quick-add lead with modal form

### 🏢 Customer Management
- Customer cards grid with avatar, company, and revenue display
- Customer profile pages with interaction history
- Add/delete interactions per customer
- Summary stats (Total, Active, Revenue)
- Status badges: Active / Inactive / Churned

### ⚙️ Settings
- Update profile (name, email)
- Change password with validation
- Dark mode / Light mode toggle (persists via `localStorage`)
- Responsive two-column layout

### 🌗 Global Theme System
- **Dark-first design** (#060918 background, indigo/violet accents)
- Full **light mode** support across every page
- Theme toggle via body class + `data-bs-theme` attribute
- CSS variable overrides for seamless switching

### 📱 Mobile Responsive
- Sidebar collapses to overlay with backdrop on mobile
- Animated hamburger menu with close-on-backdrop-click
- Tables scroll horizontally with touch support
- Stat cards use compact 2×2 grid
- Filter bars stack vertically
- Landing page navbar with slide-down mobile menu

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Runtime** | Node.js 18+ |
| **Framework** | Express 5.x |
| **Database** | MongoDB + Mongoose 8.x |
| **Templating** | EJS with express-ejs-layouts |
| **Authentication** | Passport.js (Local Strategy) |
| **Password Hashing** | bcryptjs |
| **Sessions** | express-session + connect-mongo |
| **Styling** | Bootstrap 5.3 + Custom CSS |
| **Charts** | Chart.js 4.x |
| **Icons** | Bootstrap Icons |
| **Fonts** | Inter (Google Fonts) |
| **Dev Tools** | Nodemon |

---

## 📁 Project Structure

```
ULTRA-CRM/
├── config/
│   ├── db.js                  # MongoDB connection
│   └── passport.js            # Passport.js strategy config
│
├── controllers/
│   ├── authController.js      # Login, Register, Logout
│   ├── contactController.js   # Contact CRUD operations
│   ├── customerController.js  # Customer management + interactions
│   ├── dashboardController.js # Dashboard data aggregation
│   ├── leadController.js      # Lead pipeline operations
│   └── settingsController.js  # Profile & password updates
│
├── middleware/
│   └── auth.js                # ensureAuthenticated, ensureGuest guards
│
├── models/
│   ├── Contact.js             # Contact schema (firstName, lastName, status, etc.)
│   ├── Customer.js            # Customer schema (name, revenue, interactions)
│   ├── Lead.js                # Lead schema (name, email, status, etc.)
│   └── User.js                # User schema (name, email, password, role)
│
├── public/
│   └── css/
│       ├── style.css          # Global styles + CSS variables
│       ├── dashboard.css      # Dashboard layout, sidebar, topbar, cards
│       ├── auth.css           # Login & register page styles
│       └── landing.css        # Landing page styles + animations
│
├── routes/
│   ├── index.js               # Landing page route (/)
│   ├── auth.js                # /auth/* routes
│   ├── dashboard.js           # /dashboard route
│   ├── contacts.js            # /contacts/* routes
│   ├── leads.js               # /leads/* routes
│   ├── customers.js           # /customers/* routes
│   └── settings.js            # /settings/* routes
│
├── views/
│   ├── layouts/
│   │   └── main.ejs           # Master layout (head, scripts, body wrapper)
│   ├── partials/
│   │   ├── sidebar.ejs        # Navigation sidebar
│   │   ├── topbar.ejs         # Top header bar + mobile toggle
│   │   ├── mobile-header.ejs  # Mobile menu for contact pages
│   │   └── messages.ejs       # Flash message alerts
│   ├── auth/
│   │   ├── login.ejs          # Login page (split-screen)
│   │   └── register.ejs       # Register page (split-screen)
│   ├── contacts/
│   │   ├── index.ejs          # Contacts list with filters
│   │   ├── add.ejs            # Add contact form
│   │   ├── edit.ejs           # Edit contact form
│   │   └── show.ejs           # Contact detail view
│   ├── customers/
│   │   ├── index.ejs          # Customer cards grid
│   │   └── profile.ejs        # Customer profile + interactions
│   ├── leads/
│   │   └── index.ejs          # Lead pipeline with modals
│   ├── index.ejs              # Landing page
│   ├── dashboard.ejs          # Main dashboard
│   ├── settings.ejs           # Settings page
│   └── error.ejs              # Error page
│
├── server.js                  # App entry point
├── package.json
├── .env                       # Environment variables (not committed)
└── .gitignore
```

---

## 🚀 Installation

### Prerequisites

- **Node.js** v18 or higher
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/atlas) cloud)
- **npm** (comes with Node.js)

### 1. Clone the Repository

```bash
https://github.com/Dipayan-max/FUTURE_FS_2.git
cd FUTURE_FS_2
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_URI=mongodb:your_mongodb_connection_string_here
SESSION_SECRET=your-secret-key-here
PORT=3000
```

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/ultra-crm` |
| `SESSION_SECRET` | Secret key for session encryption | — |
| `PORT` | Server port | `3000` |

### 4. Start the Application

**Development** (with auto-reload):
```bash
npm run dev
```

**Production**:
```bash
npm start
```

### 5. Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📡 API Endpoints

All routes except the landing page and auth pages require authentication.

### Public Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Landing page |

### Authentication — `/auth`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/auth/login` | Login page |
| `POST` | `/auth/login` | Authenticate user |
| `GET` | `/auth/register` | Registration page |
| `POST` | `/auth/register` | Create new account |
| `GET` | `/auth/logout` | Logout → redirect to landing |

### Dashboard — `/dashboard`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/dashboard` | Main dashboard with stats & charts |

### Contacts — `/contacts`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/contacts` | List all contacts (with search & filter) |
| `GET` | `/contacts/add` | Add contact form |
| `POST` | `/contacts` | Create new contact |
| `GET` | `/contacts/:id` | View contact details |
| `GET` | `/contacts/:id/edit` | Edit contact form |
| `POST` | `/contacts/:id` | Update contact |
| `POST` | `/contacts/:id/delete` | Delete contact |

### Leads — `/leads`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/leads` | Lead pipeline (search, filter, sort) |
| `POST` | `/leads` | Create new lead |
| `GET` | `/leads/:id/json` | Get lead data as JSON (for modals) |
| `POST` | `/leads/:id` | Update lead |
| `POST` | `/leads/:id/delete` | Delete lead |

### Customers — `/customers`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/customers` | Customer grid (search & filter) |
| `POST` | `/customers` | Create new customer |
| `GET` | `/customers/:id` | Customer profile page |
| `GET` | `/customers/:id/json` | Get customer data as JSON |
| `POST` | `/customers/:id` | Update customer |
| `POST` | `/customers/:id/delete` | Delete customer |
| `POST` | `/customers/:id/interactions` | Add interaction |
| `POST` | `/customers/:id/interactions/:interactionId/delete` | Delete interaction |

### Settings — `/settings`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/settings` | Settings page |
| `POST` | `/settings/profile` | Update profile (name, email) |
| `POST` | `/settings/password` | Change password |

---

## 🎨 Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Background | `#060918` | Primary dark background |
| Card BG | `rgba(17, 24, 44, 0.85)` | Cards, panels |
| Indigo | `#6366f1` | Primary accent, CTAs |
| Violet | `#8b5cf6` | Secondary accent, gradients |
| Sky | `#0ea5e9` | Info, links |
| Emerald | `#10b981` | Success states |
| Amber | `#f59e0b` | Warning states |
| Red | `#ef4444` | Danger states |
| Slate 400 | `#94a3b8` | Muted text |
| Slate 100 | `#f1f5f9` | Primary text (dark mode) |

### Typography

- **Font Family**: Inter (Google Fonts)
- **Weights**: 300–900
- **Headings**: 700–900 weight, tight letter-spacing

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development server with Nodemon |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.

---

<div align="center">
  <p>Built with ❤️ using Node.js, Express & MongoDB</p>
  <p><strong>⚡ ULTRA CRM — The modern CRM for teams that move fast.</strong></p>
</div>
