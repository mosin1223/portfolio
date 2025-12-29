# Weather Dashboard - Portfolio Project

A modern, fully responsive weather dashboard application with a sleek dark theme and glassmorphism effects. Built with HTML, CSS, and vanilla JavaScript.

## 🌟 Features

- **Real-time Weather Data**: Fetches current weather conditions from OpenWeatherMap API
- **7-Day Forecast**: Displays extended weather forecast
- **Multiple Metrics**: Shows temperature, humidity, wind speed, UV index, and visibility
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Dark theme with glassmorphism effects and smooth animations
- **Error Handling**: User-friendly error messages for invalid cities or network issues
- **Loading States**: Beautiful loading indicators while fetching data
- **Interactive Elements**: Hover effects and smooth transitions

## 🎨 Design Highlights

- **Dark Theme**: Professional dark blue gradient background
- **Glassmorphism**: Modern glass-effect cards with backdrop blur
- **Sidebar Navigation**: Icon-based navigation menu
- **Large Temperature Display**: Prominent weather information
- **4 Highlight Cards**: Wind Status, UV Index, Humidity, Visibility
- **7-Day Forecast**: Daily weather predictions
- **Weather Condition Map**: Placeholder for future interactive map
- **Fully Responsive**: Adapts to all screen sizes
- **Loading States**: Animated spinner while fetching data
- **Error Handling**: Retry functionality for failed requests

## 🚀 Setup Instructions

### 1. Get Your API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate your API key (free tier includes 60 calls/minute)

### 2. Configure the Application

1. Open `script.js`
2. Find this line: `const API_KEY = 'YOUR_API_KEY_HERE';`
3. Replace `'YOUR_API_KEY_HERE'` with your actual API key

### 3. Run the Application

1. Open `index.html` in your web browser
2. Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   ```
3. Navigate to `http://localhost:8000` in your browser

## 📱 Usage

1. **Search for a City**: Type any city name in the search bar and press Enter or click the search button
2. **View Current Weather**: See temperature, weather conditions, and location info
3. **Check Highlights**: View detailed metrics like humidity, wind speed, UV index, and visibility
4. **Browse Forecast**: Scroll through the 7-day weather forecast
5. **Responsive Navigation**: Use the sidebar to navigate between different sections (future feature)

## 🛠️ Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with custom properties, flexbox, and grid
- **JavaScript (ES6+)**: Async/await, fetch API, DOM manipulation
- **OpenWeatherMap API**: Real-time weather data
- **Font Awesome**: Icon library

## 📂 Project Structure

```
weather-dashboard/
│
├── index.html          # Main HTML structure
├── style.css           # All styling and animations
├── script.js           # JavaScript functionality
└── README.md          # Project documentation
```

## 🎯 Key Features Implemented

### HTML Structure
- Semantic HTML5 elements
- Accessible markup
- SEO-friendly structure

### CSS Styling
- CSS Custom Properties for theme management
- Flexbox and Grid layouts
- Media queries for responsive design
- Glassmorphism effects with backdrop-filter
- Custom animations and transitions
- Mobile-first approach

### JavaScript Functionality
- Async API calls with error handling
- Dynamic DOM manipulation
- Real-time data updates
- Loading and error states
- Weather icon mapping
- Temperature unit conversions
- Wind direction calculations
- Date/time formatting

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📊 API Limitations

The free OpenWeatherMap API tier includes:
- 60 calls per minute
- 1,000,000 calls per month
- Current weather data
- 5-day forecast (with 3-hour intervals)

## 🎨 Color Scheme

```css
Primary Background: #0f1419
Secondary Background: #1a1f28
Card Background: rgba(42, 63, 95, 0.3)
Accent Blue: #4facfe
Accent Cyan: #00f2fe
Text Primary: #ffffff
Text Secondary: #8b97a7
```

## 🔮 Future Enhancements

- [ ] Add geolocation support
- [ ] Implement dark/light theme toggle
- [ ] Add weather alerts and warnings
- [ ] Include interactive weather map
- [ ] Save favorite cities
- [ ] Add weather comparison feature
- [ ] Implement unit conversion (Celsius/Fahrenheit)
- [ ] Add more detailed hourly forecast
- [ ] Include air quality index
- [ ] Add weather history charts

## 📝 License

This project is open source and available for portfolio purposes.

## 👨‍💻 Author

Created as a portfolio project to demonstrate modern web development skills.

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons by [Font Awesome](https://fontawesome.com/)
- Design inspiration from modern weather applications

---

**Note**: Remember to replace the API key in `script.js` before deploying this application!
