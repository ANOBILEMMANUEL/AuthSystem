# AuthSystem 🚀

A modern, secure Full-Stack User Authentication System built using **Node.js**, **Express**, **MongoDB (Mongoose)**, and **Passport.js**. This application provides an end-to-end framework for user registration, secure login validation using an email identifier, flash notification messages, and an interactive personal account dashboard.

---

## 🎨 Features
* **Custom Dynamic Styling:** Clean, modern interface accented with a vibrant red visual layout.
* **Smooth Micro-interactions:** Built-in floating entry animations and hardware-accelerated button transitions.
* **Dual-Field Signup Form:** Users register by choosing a unique username, unique email address, and a secure password.
* **Email-Based Identification:** Optimized authentication flow that maps the user's `email` as their unique login key.
* **Robust Crash Protection:** Synchronous error handling and safe routing catch database duplication validation (e.g., matching emails) without crashing the runtime environment.
* **Flash Alert Feedback:** Vibrant, color-coded status wrappers (`.alert-success` and `.alert-danger`) signaling confirmation or rejection.
* **Fully Responsive Grid:** Re-aligns tracking components and stacks dashboard stat metric panels cleanly for mobile compatibility.

---

## 🛠️ Tech Stack & Packages
* **Backend Runtime:** Node.js (v22+)
* **Server Framework:** Express.js
* **Database Layer:** MongoDB & Mongoose Object Data Modeling (ODM)
* **Authentication Core:** Passport.js & `passport-local-mongoose`
* **View Template Engine:** Embedded JavaScript (EJS)
* **Styling Framework:** Custom CSS3 with Grid/Flexbox Layout Systems

---

## 📂 Project Architecture

```text
authapp/
├── models/
│   └── usermodel.js          # Mongoose Schema & Passport Plugin integration
├── public/
│   └── stylesheet/
│       └── style.css         # Keyframes, resets, responsive overrides
├── views/
│   ├── partials/
│   │   ├── header.ejs        # Shared application navbar and global configurations
│   │   └── footer.ejs        # Footer metadata blocks
│   ├── login.ejs             # Entry credential validation interface
│   ├── signup.ejs            # Advanced registration input fields
│   └── dashboard.ejs         # Premium metric tracking layout
├── routes/
│   └── index.js              # Application path and transaction handling controllers
├── .gitignore                # Absolute isolation parameters for node_modules and .env
├── package.json              # Version handling configurations
└── app.js                    # Entry configuration pipeline
