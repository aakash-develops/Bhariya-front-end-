# Bhariya — Goods Transportation & Logistics (Mobile App)

Bhariya is a mobile app built with **React Native + Expo**, designed for transporting goods for both individuals and companies. Users can request deliveries, search locations using Google Places Autocomplete, view bookings, and more.

This project was created using **create-expo-app**.

---

## 🚀 Get Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start the app
```bash
npx expo start
```

In the output, you'll find options to open the app in:

- **Expo Go**
- **Android Emulator**
- **Development Build**

You can begin development by editing the files inside the **Screens** directory.  
Navigation is handled inside **AppNavigator.tsx**.

---

## 🌐 Environment Variables

Create a `.env` file in the root directory:

```
GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY
API_BASE_URL=YOUR_BACKEND_URL
```

⚠️ `.env` is already included in `.gitignore` and will not be committed.

---

## ✨ Features

- User Registration & Onboarding  
- Goods Transportation Booking  
- Google Places Autocomplete  
- Khalti Payment Integration (basic demo)  
- Modular Folder Structure  
- Expo-managed workflow (Android)

---

## 📁 Project Structure

```
/Screens
/components
/constants
/hooks
/assets
AppNavigator.tsx
app.json
package.json
```

---

## 🔗 Backend

Backend is maintained separately:

👉 https://github.com/aakash-develops/Bhariya-Backend

---

## 📸 Adding Screenshots

Place your screenshots in:

```
assets/screenshots/
```

Then reference inside README:

```md
![Home Screen](./assets/screenshots/home.png)
![Booking Screen](./assets/screenshots/booking.png)
```

---

## 🔄 Reset Expo Starter (optional)

```bash
npm run reset-project
```

This moves starter files into `app-example/` and creates a fresh `app/` directory.

---

## 📚 Learn More

- Expo documentation: https://docs.expo.dev  
- Expo Router: https://docs.expo.dev/router/introduction  
- React Native docs: https://reactnative.dev  

---

## 📄 License

This project is under the **MIT License**.  
Include a LICENSE file for details.

---

## 👤 Author

**Aakash**  
_Add your email or portfolio link here_
