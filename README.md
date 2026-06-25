# The Super App

A comprehensive multi-feature React application built with Next.js 15  that combines user registration, category selection, weather updates, news, notes, timers, and entertainment recommendations into a single cohesive dashboard.

## Live Url: https://the-super-app-riye.vercel.app/register

## 🚀 Features

- **Authentication & Registration**: Multi-field form with robust validation
- **Category Selection**: Interactive entertainment category selection (minimum 3 required)
- **Super Dashboard**: Modular grid-based dashboard with multiple widgets
  - User Profile Widget
  - Weather Widget (live data from OpenWeatherMap)
  - News Widget (auto-rotating every 2 seconds)
  - Countdown Timer Widget
  - Notes Widget (localStorage persistence)
- **Entertainment Discovery**: Movie recommendations based on selected categories with detailed modal popups

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: JavaScript (ES6+)
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **No UI Libraries**: All components built from scratch

## 📋 Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn package manager

## 🔧 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd The_Super_app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp  .env
```

4. Add your API keys to `.env.local`:
```
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweathermap_api_key_here
NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key_here
NEXT_PUBLIC_OMDB_API_KEY=your_omdb_api_key_here
```

## 🎯 API Keys Setup

### OpenWeatherMap API
1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Get your free API key
3. Add it to `.env.local`

### News API
1. Sign up at [NewsAPI](https://newsapi.org)
2. Get your free API key
3. Add it to `.env.local`

### OMDB API
1. Sign up at [OMDB API](http://www.omdbapi.com/apikey.aspx)
2. Get your free API key
3. Add it to `.env.local`

## 🏃 Running the Application

Development mode:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## 📁 Project Structure

```
The_Super_app/
├── app/
│   ├── dashboard/
│   │   └── page.jsx          # Dashboard page with widgets
│   ├── categories/
│   │   └── page.jsx          # Category selection page
│   ├── register/
│   │   └── page.jsx          # Registration page
│   ├── movies/
│   │   └── page.jsx          # Movies discovery page
│   ├── layout.jsx            # Root layout
│   ├── page.jsx              # Home page (redirects to register)
│   └── globals.css           # Global styles
├── components/
│   ├── UserProfile.jsx        # User profile widget
│   ├── WeatherWidget.jsx      # Weather widget
│   ├── NewsWidget.jsx        # News widget with auto-rotation
│   ├── TimerWidget.jsx       # Countdown timer widget
│   ├── NotesWidget.jsx       # Notes widget with localStorage
│   ├── MovieCard.jsx         # Movie card component
│   └── MovieModal.jsx        # Movie details modal
├── store/
│   └── useStore.js           # Zustand global store
├── lib/
│   └── apiServices.js        # API integration services
├── public/                   # Static assets
├── .env.example              # Environment variables template
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
└── package.json              # Dependencies
```

## 🎨 Design Reference

The application follows the design specifications from the provided Figma design:
[Figma Design](https://www.figma.com/design/8meikbND92bsdBPJQlE1XS/Super-App?node-id=0-1&t=bzsV1KGW4oet62uF-1)

## ✨ Key Features Explained

### Registration Form
- Fields: Name, Username, Email, Mobile Number
- Validation: Inline error messages for each field
- Navigation: Proceeds to category selection only on valid submission

### Category Selection
- 8 entertainment categories: Action, Comedy, Drama, Music, Sports, Thriller, Fantasy, Romance
- Minimum 3 categories required to proceed
- Visual feedback for selected categories
- Hover animations and transitions

### Dashboard Widgets
- **User Profile**: Displays registered user info and selected categories
- **Weather**: Live weather data from OpenWeatherMap API
- **News**: Auto-rotating news headlines every 2 seconds
- **Timer**: Customizable countdown with start/pause/reset functionality
- **Notes**: Persistent notes saved to localStorage

### Entertainment Discovery
- Movies fetched based on selected categories
- OMDB API integration
- Hover animations on movie cards
- Detailed modal with movie information

## 🌐 Deployment

### Vercel
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Netlify
1. Build command: `npm run build`
2. Publish directory: `.next`
3. Add environment variables
4. Deploy

## 📝 Submission Requirements

1. **GitHub Repository**: Public repo with complete source code
2. **Deployed Project**: Live working URL (Vercel/Netlify)
3. **Screen Recording**: 3-5 minute walkthrough (Google Drive, Loom, or YouTube)

## 🤝 Contributing

This is a frontend assignment project. For contributions, please create a fork and submit a pull request.

## 📄 License

This project is created as part of a frontend assignment.

## 🙏 Acknowledgments

- Design reference from Figma
- APIs: OpenWeatherMap, NewsAPI, OMDB
- Built with Next.js, Zustand, and Tailwind CSS
