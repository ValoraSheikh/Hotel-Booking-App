# 🏨 Hotel Booking App

> Book your stay with ease. Built with Next.js + MongoDB.

A full-stack hotel reservation system where users can browse rooms, make bookings, and admins can manage rooms, bookings, and reviews — all from a powerful dashboard.

I built this project to level up my Next.js App Router and MongoDB skills and become a better full stack developer.

---

## 🔗 Live Demo

- 🌐 User App: [hotel-booking-app-woad.vercel.app](https://hotel-booking-app-woad.vercel.app/)

---

## 📸 Screenshot

![App Screenshot](https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)

---

## 🚀 Features

- 🏨 Room Listing & Filtering
- 📆 Real-Time Availability & Booking
- 🔐 User Authentication (NextAuth)
- 🧑 Admin Dashboard (Bookings, Rooms, Reviews)
- 🖼️ Upload room images (UploadThing)
- 📩 Contact Form
- ✨ Toast notifications
- ✅ Zod form validation
- 🧠 Zustand for state management
- 🧹 Clean, scalable folder structure

---

## 🧰 Tech Stack

| Tech        | Used For             |
|-------------|----------------------|
| **Next.js (App Router)** | Frontend & Backend |
| **TailwindCSS** | Styling |
| **MongoDB** | Database |
| **NextAuth.js** | Auth |
| **UploadThing** | File Upload |
| **Zustand** | State Management |
| **Zod + React Hook Form** | Form Validation |
| **Vercel** | Deployment |

---

## 🗂️ Folder Structure

<details>
  <summary>Click to expand</summary>

```bash
/app
  ├── (app)/
  │   ├── about-us/
  │   ├── blogs/
  │   ├── booking/
  │   ├── bookings/
  │   ├── contact-us/
  │   ├── rooms/
  │   ├── sign-in/
  │   ├── sign-up/
  ├── admin/
  │   ├── dashboard/
  │   │   ├── bookings/
  │   │   ├── reviews/
  │   │   ├── rooms/
  ├── api/
  │   ├── admin/
  │   ├── auth/
  │   ├── bookings/
  │   ├── contact/
  │   ├── reviews/
  │   ├── rooms/
  │   ├── uploadthing/
  ├── components/
  ├── lib/
  ├── models/
  ├── utils/
  ├── public/

```
</details>

## ⚙️ Environment Variables

To run locally, create `.env.local` and add:

```env
MONGODB_URI=mongodb+srv://<your-password>@cluster.eesbbxv.mongodb.net/
NEXTAUTH_SECRET=your-next-auth-secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
UPLOADTHING_TOKEN=your-token
UPLOADTHING_SECRET=your-secret
```

```
git clone https://github.com/ValoraSheikh/Hotel-Booking-App.git
cd hotel-booking-app
npm install
npm run dev
```


## 💡 What I Learned
- 🧑‍💻 Implemented admin panel logic with full CRUD operations
- 🏗️ Learned scalable folder structuring for large apps
- 📤 Gained experience in UploadThing for file uploads
- 🧬 Applied client/server component strategy for performance
- 🔁 Built reusable server actions and custom hooks
- 🔍 Improved code readability and reusability

## 🛠️ Future Improvements
- 💳 Add payment integration (Stripe or Razorpay)
- ❌ Booking cancellation flow
- 🧍 Profile page with edit options
- ⭐ Reviews with star ratings
- ⏳ Loading states and skeleton UI
- ✉️ Notifications via email (Next.js + Resend)

## 📄 License
This project is licensed under the MIT License — you're free to use, modify, and distribute.

## 👨‍💻 Author
**Aman Sheikh**  
📫 **Email**: haarishsheikh04@gmail.com  
🌐 **Portfolio**: [Portfolio](https://my-3-d-portfolio-kappa.vercel.app/)  
🐦 **X / Twitter**: [Twitter](https://x.com/AmanSheikhKhan)  
💼 **LinkedIn**: [LinkedIn](https://www.linkedin.com/in/valorant-aman-238a73335/)  

💬 If you liked this project or want to collaborate, feel free to reach out or connect!

