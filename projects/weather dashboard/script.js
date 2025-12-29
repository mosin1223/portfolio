// OpenWeatherMap API Configuration - v2.0
const API_KEY = 'fbda8f5cbd31474390ce87dbd7284a04'; // Replace with your OpenWeatherMap API key
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const USE_DEMO_MODE = false; // Set to false once API key is activated

// DOM Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const loadingState = document.getElementById('loadingState');
const errorState = document.getElementById('errorState');
const suggestionsBox = document.getElementById('suggestionsBox');

// Popular cities database
const popularCities = [
    { name: 'Mumbai', country: 'India' },
    { name: 'Delhi', country: 'India' },
    { name: 'Bangalore', country: 'India' },
    { name: 'Hyderabad', country: 'India' },
    { name: 'Chennai', country: 'India' },
    { name: 'Kolkata', country: 'India' },
    { name: 'Pune', country: 'India' },
    { name: 'Karachi', country: 'Pakistan' },
    { name: 'Lahore', country: 'Pakistan' },
    { name: 'Islamabad', country: 'Pakistan' },
    { name: 'London', country: 'United Kingdom' },
    { name: 'New York', country: 'United States' },
    { name: 'Los Angeles', country: 'United States' },
    { name: 'Chicago', country: 'United States' },
    { name: 'Tokyo', country: 'Japan' },
    { name: 'Paris', country: 'France' },
    { name: 'Berlin', country: 'Germany' },
    { name: 'Madrid', country: 'Spain' },
    { name: 'Rome', country: 'Italy' },
    { name: 'Dubai', country: 'UAE' },
    { name: 'Singapore', country: 'Singapore' },
    { name: 'Hong Kong', country: 'China' },
    { name: 'Sydney', country: 'Australia' },
    { name: 'Melbourne', country: 'Australia' },
    { name: 'Toronto', country: 'Canada' },
    { name: 'Vancouver', country: 'Canada' },
    { name: 'Mexico City', country: 'Mexico' },
    { name: 'São Paulo', country: 'Brazil' },
    { name: 'Rio de Janeiro', country: 'Brazil' },
    { name: 'Buenos Aires', country: 'Argentina' },
    { name: 'Cairo', country: 'Egypt' },
    { name: 'Istanbul', country: 'Turkey' },
    { name: 'Moscow', country: 'Russia' },
    { name: 'Bangkok', country: 'Thailand' },
    { name: 'Seoul', country: 'South Korea' },
    { name: 'Beijing', country: 'China' },
    { name: 'Shanghai', country: 'China' },
    { name: 'Amsterdam', country: 'Netherlands' },
    { name: 'Brussels', country: 'Belgium' },
    { name: 'Vienna', country: 'Austria' },
    { name: 'Zurich', country: 'Switzerland' },
    { name: 'Stockholm', country: 'Sweden' },
    { name: 'Copenhagen', country: 'Denmark' },
    { name: 'Oslo', country: 'Norway' },
    { name: 'Dublin', country: 'Ireland' },
    { name: 'Lisbon', country: 'Portugal' },
    { name: 'Athens', country: 'Greece' },
    { name: 'Prague', country: 'Czech Republic' },
    { name: 'Warsaw', country: 'Poland' },
    { name: 'Budapest', country: 'Hungary' }
];
const weatherContent = document.getElementById('weatherContent');
const errorMessage = document.getElementById('errorMessage');
const retryBtn = document.getElementById('retryBtn');

// Weather data elements
const currentTemp = document.getElementById('currentTemp');
const weatherDescription = document.getElementById('weatherDescription');
const cityName = document.getElementById('cityName');
const currentDate = document.getElementById('currentDate');
const mainWeatherIcon = document.getElementById('mainWeatherIcon');
const windSpeed = document.getElementById('windSpeed');
const windDirection = document.getElementById('windDirection');
const uvIndex = document.getElementById('uvIndex');
const humidity = document.getElementById('humidity');
const humidityFill = document.getElementById('humidityFill');
const humidityStatus = document.getElementById('humidityStatus');
const visibility = document.getElementById('visibility');
const visibilityStatus = document.getElementById('visibilityStatus');
const forecastList = document.getElementById('forecastList');

// Weather icon mapping
const weatherIconMap = {
    '01d': 'fa-sun',
    '01n': 'fa-moon',
    '02d': 'fa-cloud-sun',
    '02n': 'fa-cloud-moon',
    '03d': 'fa-cloud',
    '03n': 'fa-cloud',
    '04d': 'fa-cloud',
    '04n': 'fa-cloud',
    '09d': 'fa-cloud-showers-heavy',
    '09n': 'fa-cloud-showers-heavy',
    '10d': 'fa-cloud-sun-rain',
    '10n': 'fa-cloud-moon-rain',
    '11d': 'fa-bolt',
    '11n': 'fa-bolt',
    '13d': 'fa-snowflake',
    '13n': 'fa-snowflake',
    '50d': 'fa-smog',
    '50n': 'fa-smog'
};

// Initialize app
function init() {
    // Set current date
    updateDateTime();
    setInterval(updateDateTime, 60000); // Update every minute
    
    // Load default city
    getWeatherData('Mumbai');
    
    // Event listeners
    searchBtn.addEventListener('click', handleSearch);
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
            hideSuggestions();
        }
    });
    
    // Autocomplete functionality
    cityInput.addEventListener('input', handleInputChange);
    cityInput.addEventListener('focus', handleInputChange);
    
    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            hideSuggestions();
        }
    });
    
    retryBtn.addEventListener('click', handleRetry);
    
    // Sidebar navigation functionality with visual feedback
    const navItems = document.querySelectorAll('.nav-item');
    const views = {
        'Weather': 'weatherContent',
        'Map': 'mapView',
        'Calendar': 'calendarView',
        'Charts': 'graphView',
        'Settings': 'settingsView'
    };
    
    navItems.forEach((item, index) => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const title = this.getAttribute('title');
            
            // Handle Power (Logout)
            if (title === 'Power') {
                handleLogout();
                return;
            }
            
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.width = '40px';
            ripple.style.height = '40px';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(79, 172, 254, 0.5)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Switch views
            switchView(title);
            
            // Show notification
            showNotification(title);
        });
        
        // Add tooltip on hover
        item.addEventListener('mouseenter', function() {
            const title = this.getAttribute('title');
            if (title) {
                const tooltip = document.createElement('div');
                tooltip.className = 'nav-tooltip';
                tooltip.textContent = title;
                tooltip.style.position = 'fixed';
                tooltip.style.left = '80px';
                tooltip.style.background = 'var(--card-bg)';
                tooltip.style.padding = '8px 15px';
                tooltip.style.borderRadius = '8px';
                tooltip.style.fontSize = '12px';
                tooltip.style.zIndex = '10000';
                tooltip.style.border = '1px solid var(--glass-border)';
                tooltip.style.backdropFilter = 'blur(10px)';
                tooltip.style.animation = 'fadeIn 0.2s ease';
                
                const rect = this.getBoundingClientRect();
                tooltip.style.top = rect.top + 'px';
                
                document.body.appendChild(tooltip);
                this.tooltipElement = tooltip;
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (this.tooltipElement) {
                this.tooltipElement.remove();
                this.tooltipElement = null;
            }
        });
    });
    
    // Initialize settings
    initializeSettings();
}

// Show notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message} activated</span>
    `;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.background = 'var(--card-bg)';
    notification.style.backdropFilter = 'blur(10px)';
    notification.style.border = '1px solid var(--glass-border)';
    notification.style.borderRadius = '12px';
    notification.style.padding = '15px 20px';
    notification.style.display = 'flex';
    notification.style.alignItems = 'center';
    notification.style.gap = '10px';
    notification.style.zIndex = '10000';
    notification.style.animation = 'slideIn 0.3s ease';
    notification.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
    
    const icon = notification.querySelector('i');
    icon.style.color = 'var(--accent-cyan)';
    icon.style.fontSize = '20px';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Switch between views
function switchView(viewName) {
    // Hide all views
    document.getElementById('weatherContent').classList.remove('active-view');
    document.getElementById('mapView').classList.remove('active-view');
    document.getElementById('calendarView').classList.remove('active-view');
    document.getElementById('graphView').classList.remove('active-view');
    document.getElementById('moonPhaseView').classList.remove('active-view');
    document.getElementById('settingsView').classList.remove('active-view');
    
    // Show selected view
    switch(viewName) {
        case 'Weather':
            document.getElementById('weatherContent').classList.add('active-view');
            break;
        case 'Map':
            document.getElementById('mapView').classList.add('active-view');
            break;
        case 'Calendar':
            document.getElementById('calendarView').classList.add('active-view');
            generateCalendar();
            break;
        case 'Charts':
            document.getElementById('graphView').classList.add('active-view');
            generateCharts();
            break;
        case 'Moon Phase':
            document.getElementById('moonPhaseView').classList.add('active-view');
            updateMoonPhase();
            break;
        case 'Settings':
            document.getElementById('settingsView').classList.add('active-view');
            break;
    }
}

// Toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle('light-mode');
    const isLightMode = document.body.classList.contains('light-mode');
    localStorage.setItem('lightMode', isLightMode);
    showNotification(isLightMode ? 'Light Mode Enabled' : 'Dark Mode Enabled');
}

// Handle Logout
function handleLogout() {
    const confirmed = confirm('Are you sure you want to logout?');
    if (confirmed) {
        localStorage.clear();
        showNotification('Logging out...');
        setTimeout(() => {
            location.reload();
        }, 1500);
    }
}

// Generate Calendar View
function generateCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    calendarGrid.innerHTML = '';
    
    const demoCalendarData = [
        { day: 'Monday', date: 'Dec 30', temp: 28, icon: '02d', desc: 'Partly Cloudy', humidity: 84, wind: 7.9, feels_like: 30, pressure: 1012, uv: 5.5 },
        { day: 'Tuesday', date: 'Dec 31', temp: 30, icon: '01d', desc: 'Clear Sky', humidity: 78, wind: 8.5, feels_like: 32, pressure: 1015, uv: 7.2 },
        { day: 'Wednesday', date: 'Jan 1', temp: 27, icon: '10d', desc: 'Light Rain', humidity: 90, wind: 6.2, feels_like: 29, pressure: 1008, uv: 3.8 },
        { day: 'Thursday', date: 'Jan 2', temp: 28, icon: '02d', desc: 'Partly Cloudy', humidity: 82, wind: 7.3, feels_like: 30, pressure: 1011, uv: 5.0 },
        { day: 'Friday', date: 'Jan 3', temp: 31, icon: '01d', desc: 'Sunny', humidity: 75, wind: 9.1, feels_like: 34, pressure: 1016, uv: 8.5 },
        { day: 'Saturday', date: 'Jan 4', temp: 29, icon: '03d', desc: 'Cloudy', humidity: 80, wind: 8.0, feels_like: 31, pressure: 1013, uv: 4.2 },
        { day: 'Sunday', date: 'Jan 5', temp: 28, icon: '02d', desc: 'Partly Cloudy', humidity: 84, wind: 7.9, feels_like: 30, pressure: 1012, uv: 5.5 },
        { day: 'Monday', date: 'Jan 6', temp: 26, icon: '09d', desc: 'Rainy', humidity: 92, wind: 5.8, feels_like: 28, pressure: 1005, uv: 2.1 },
        { day: 'Tuesday', date: 'Jan 7', temp: 27, icon: '02d', desc: 'Partly Cloudy', humidity: 85, wind: 7.2, feels_like: 29, pressure: 1010, uv: 4.8 },
        { day: 'Wednesday', date: 'Jan 8', temp: 29, icon: '01d', desc: 'Clear Sky', humidity: 77, wind: 8.3, feels_like: 31, pressure: 1014, uv: 6.9 }
    ];
    
    demoCalendarData.forEach((dayData, index) => {
        const iconClass = weatherIconMap[dayData.icon] || 'fa-cloud';
        const dayCard = document.createElement('div');
        dayCard.className = 'calendar-day';
        dayCard.innerHTML = `
            <div class="day-name">${dayData.day}</div>
            <div class="day-date">${dayData.date}</div>
            <i class="fas ${iconClass} day-icon"></i>
            <div class="day-temp">${dayData.temp}°C</div>
            <div class="day-desc">${dayData.desc}</div>
        `;
        
        // Add click event to show day details
        dayCard.addEventListener('click', () => {
            showDayDetail(dayData);
        });
        
        calendarGrid.appendChild(dayCard);
    });
}

// Show Day Detail Modal
function showDayDetail(dayData) {
    const modal = document.getElementById('dayDetailModal');
    const content = document.getElementById('dayDetailContent');
    const iconClass = weatherIconMap[dayData.icon] || 'fa-cloud';
    
    content.innerHTML = `
        <div class="day-detail-header">
            <h2>${dayData.day}</h2>
            <p>${dayData.date}, 2025</p>
        </div>
        <div style="text-align: center;">
            <i class="fas ${iconClass} day-detail-icon"></i>
            <div class="day-detail-temp">${dayData.temp}°C</div>
            <div class="day-detail-desc">${dayData.desc}</div>
        </div>
        <div class="day-detail-stats">
            <div class="day-stat">
                <div class="day-stat-label">
                    <i class="fas fa-thermometer-half"></i>
                    Feels Like
                </div>
                <div class="day-stat-value">${dayData.feels_like}<span class="unit">°C</span></div>
            </div>
            <div class="day-stat">
                <div class="day-stat-label">
                    <i class="fas fa-tint"></i>
                    Humidity
                </div>
                <div class="day-stat-value">${dayData.humidity}<span class="unit">%</span></div>
            </div>
            <div class="day-stat">
                <div class="day-stat-label">
                    <i class="fas fa-wind"></i>
                    Wind Speed
                </div>
                <div class="day-stat-value">${dayData.wind}<span class="unit">km/h</span></div>
            </div>
            <div class="day-stat">
                <div class="day-stat-label">
                    <i class="fas fa-compress-arrows-alt"></i>
                    Pressure
                </div>
                <div class="day-stat-value">${dayData.pressure}<span class="unit">hPa</span></div>
            </div>
            <div class="day-stat">
                <div class="day-stat-label">
                    <i class="fas fa-sun"></i>
                    UV Index
                </div>
                <div class="day-stat-value">${dayData.uv}</div>
            </div>
            <div class="day-stat">
                <div class="day-stat-label">
                    <i class="fas fa-cloud"></i>
                    Condition
                </div>
                <div class="day-stat-value" style="font-size: 16px; text-transform: capitalize;">${dayData.desc}</div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    
    // Close modal on X click
    const closeBtn = document.querySelector('.close-modal');
    closeBtn.onclick = () => {
        modal.classList.remove('active');
    };
    
    // Close modal on outside click
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    };
}

// Generate Charts
function generateCharts() {
    // Temperature Chart
    const tempCtx = document.getElementById('temperatureChart');
    if (tempCtx && !tempCtx.chart) {
        const tempChart = new Chart(tempCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Temperature (°C)',
                    data: [28, 30, 27, 28, 31, 29, 28],
                    borderColor: '#4facfe',
                    backgroundColor: 'rgba(79, 172, 254, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#ffffff' }
                    }
                },
                scales: {
                    y: {
                        ticks: { color: '#8b97a7' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    },
                    x: {
                        ticks: { color: '#8b97a7' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    }
                }
            }
        });
        tempCtx.chart = tempChart;
    }
    
    // Humidity Chart
    const humidCtx = document.getElementById('humidityChart');
    if (humidCtx && !humidCtx.chart) {
        const humidChart = new Chart(humidCtx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Humidity (%)',
                    data: [84, 78, 90, 82, 75, 80, 84],
                    backgroundColor: 'rgba(79, 172, 254, 0.6)',
                    borderColor: '#4facfe',
                    borderWidth: 1
                }, {
                    label: 'Wind Speed (km/h)',
                    data: [7.9, 8.5, 6.2, 7.3, 9.1, 8.0, 7.9],
                    backgroundColor: 'rgba(0, 242, 254, 0.6)',
                    borderColor: '#00f2fe',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#ffffff' }
                    }
                },
                scales: {
                    y: {
                        ticks: { color: '#8b97a7' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    },
                    x: {
                        ticks: { color: '#8b97a7' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    }
                }
            }
        });
        humidCtx.chart = humidChart;
    }
}

// Initialize Settings
function initializeSettings() {
    // Temperature unit toggle
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            toggleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            showNotification(`Switched to ${this.dataset.unit}`);
        });
    });
    
    // Save default city
    const saveBtn = document.getElementById('saveDefaultCity');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            const city = document.getElementById('defaultCityInput').value;
            if (city) {
                localStorage.setItem('defaultCity', city);
                showNotification(`Default city set to ${city}`);
            }
        });
    }
    
    // Load saved light mode preference
    if (localStorage.getItem('lightMode') === 'true') {
        document.body.classList.add('light-mode');
    }
    
    // Dark mode toggle in settings
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.checked = localStorage.getItem('lightMode') === 'true';
        darkModeToggle.addEventListener('change', function() {
            toggleDarkMode();
        });
    }
}

// Update Moon Phase
function updateMoonPhase() {
    // Calculate moon phase (simplified)
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    const moonCycle = 29.53; // days
    const phase = (dayOfYear % moonCycle) / moonCycle;
    
    let phaseName = '';
    let illumination = 0;
    let phaseIndex = 0;
    
    if (phase < 0.03 || phase > 0.97) {
        phaseName = 'New Moon';
        illumination = 0;
        phaseIndex = 0;
    } else if (phase < 0.22) {
        phaseName = 'Waxing Crescent';
        illumination = Math.floor(phase * 400);
        phaseIndex = 1;
    } else if (phase < 0.28) {
        phaseName = 'First Quarter';
        illumination = 50;
        phaseIndex = 2;
    } else if (phase < 0.47) {
        phaseName = 'Waxing Gibbous';
        illumination = Math.floor(50 + (phase - 0.25) * 200);
        phaseIndex = 3;
    } else if (phase < 0.53) {
        phaseName = 'Full Moon';
        illumination = 100;
        phaseIndex = 4;
    } else if (phase < 0.72) {
        phaseName = 'Waning Gibbous';
        illumination = Math.floor(100 - (phase - 0.5) * 200);
        phaseIndex = 5;
    } else if (phase < 0.78) {
        phaseName = 'Last Quarter';
        illumination = 50;
        phaseIndex = 6;
    } else {
        phaseName = 'Waning Crescent';
        illumination = Math.floor((1 - phase) * 200);
        phaseIndex = 7;
    }
    
    document.getElementById('moonPhaseName').textContent = phaseName;
    document.getElementById('moonIllumination').textContent = `${illumination}% Illuminated`;
    
    // Update moon shadow based on phase
    const moonShadow = document.getElementById('moonShadow');
    if (moonShadow) {
        const shadowWidth = phase < 0.5 ? (0.5 - phase) * 200 : (phase - 0.5) * 200;
        moonShadow.style.width = `${shadowWidth}%`;
        moonShadow.style.left = phase < 0.5 ? 'auto' : '0';
        moonShadow.style.right = phase < 0.5 ? '0' : 'auto';
    }
    
    // Highlight current phase in timeline
    const phaseItems = document.querySelectorAll('.phase-item');
    phaseItems.forEach((item, index) => {
        item.classList.toggle('active', index === phaseIndex);
    });
    
    // Update moon details
    document.getElementById('nextFullMoon').textContent = calculateNextPhaseDate('full');
    document.getElementById('nextNewMoon').textContent = calculateNextPhaseDate('new');
    document.getElementById('moonrise').textContent = '6:45 AM';
    document.getElementById('moonset').textContent = '7:32 PM';
}

// Calculate next phase date
function calculateNextPhaseDate(phaseType) {
    const today = new Date();
    const daysToAdd = phaseType === 'full' ? 15 : 7;
    const nextDate = new Date(today.getTime() + (daysToAdd * 24 * 60 * 60 * 1000));
    
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return nextDate.toLocaleDateString('en-US', options);
}

// Update date and time
function updateDateTime() {
    const now = new Date();
    const options = { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    };
    currentDate.textContent = now.toLocaleDateString('en-US', options);
}

// Handle input change for autocomplete
function handleInputChange() {
    const searchTerm = cityInput.value.trim().toLowerCase();
    
    if (searchTerm.length === 0) {
        hideSuggestions();
        return;
    }
    
    // Filter cities based on search term
    const matches = popularCities.filter(city => 
        city.name.toLowerCase().startsWith(searchTerm) ||
        city.country.toLowerCase().startsWith(searchTerm)
    ).slice(0, 8); // Limit to 8 suggestions
    
    if (matches.length > 0) {
        showSuggestions(matches);
    } else {
        hideSuggestions();
    }
}

// Show suggestions
function showSuggestions(cities) {
    suggestionsBox.innerHTML = '';
    
    cities.forEach(city => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.innerHTML = `
            <i class="fas fa-map-marker-alt"></i>
            <div class="suggestion-text">
                <span class="suggestion-name">${city.name}</span>
                <span class="suggestion-country">${city.country}</span>
            </div>
        `;
        
        item.addEventListener('click', () => {
            cityInput.value = city.name;
            hideSuggestions();
            getWeatherData(city.name);
        });
        
        suggestionsBox.appendChild(item);
    });
    
    suggestionsBox.classList.add('active');
}

// Hide suggestions
function hideSuggestions() {
    suggestionsBox.classList.remove('active');
}

// Handle input change for autocomplete
function handleInputChange() {
    const searchTerm = cityInput.value.trim().toLowerCase();
    
    if (searchTerm.length === 0) {
        hideSuggestions();
        return;
    }
    
    // Filter cities based on search term
    const matches = popularCities.filter(city => 
        city.name.toLowerCase().startsWith(searchTerm) ||
        city.country.toLowerCase().startsWith(searchTerm)
    ).slice(0, 8); // Limit to 8 suggestions
    
    if (matches.length > 0) {
        showSuggestions(matches);
    } else {
        hideSuggestions();
    }
}

// Show suggestions
function showSuggestions(cities) {
    suggestionsBox.innerHTML = '';
    
    cities.forEach(city => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.innerHTML = `
            <i class="fas fa-map-marker-alt"></i>
            <div class="suggestion-text">
                <span class="suggestion-name">${city.name}</span>
                <span class="suggestion-country">${city.country}</span>
            </div>
        `;
        
        item.addEventListener('click', () => {
            cityInput.value = city.name;
            hideSuggestions();
            getWeatherData(city.name);
        });
        
        suggestionsBox.appendChild(item);
    });
    
    suggestionsBox.classList.add('active');
}

// Hide suggestions
function hideSuggestions() {
    suggestionsBox.classList.remove('active');
}

// Handle search
function handleSearch() {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
        hideSuggestions();
    }
}

// Handle retry
function handleRetry() {
    const city = cityInput.value.trim() || 'Mumbai';
    getWeatherData(city);
}

// Show loading state
function showLoading() {
    loadingState.classList.add('active');
    errorState.classList.remove('active');
    weatherContent.style.display = 'none';
}

// Show error state
function showError(message) {
    loadingState.classList.remove('active');
    errorState.classList.add('active');
    weatherContent.style.display = 'none';
    errorMessage.textContent = message;
}

// Show weather content
function showWeatherContent() {
    loadingState.classList.remove('active');
    errorState.classList.remove('active');
    weatherContent.style.display = 'grid';
    weatherContent.classList.add('fade-in');
}

// Fetch weather data
async function getWeatherData(city) {
    showLoading();
    
    // Demo mode with mock data (while API key activates)
    if (USE_DEMO_MODE) {
        setTimeout(() => {
            loadDemoData(city);
        }, 1000);
        return;
    }
    
    try {
        // Fetch current weather
        const currentWeatherUrl = `${API_BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const currentResponse = await fetch(currentWeatherUrl);
        
        if (!currentResponse.ok) {
            if (currentResponse.status === 404) {
                throw new Error('City not found. Please check the spelling and try again.');
            } else if (currentResponse.status === 401) {
                throw new Error('Invalid API key. Please check your configuration.');
            } else {
                throw new Error('Failed to fetch weather data. Please try again later.');
            }
        }
        
        const currentData = await currentResponse.json();
        
        // Fetch forecast data
        const forecastUrl = `${API_BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`;
        const forecastResponse = await fetch(forecastUrl);
        
        if (!forecastResponse.ok) {
            throw new Error('Failed to fetch forecast data.');
        }
        
        const forecastData = await forecastResponse.json();
        
        // Update UI with weather data
        updateCurrentWeather(currentData);
        updateForecast(forecastData);
        
        showWeatherContent();
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
        showError(error.message || 'An error occurred while fetching weather data. Please try again.');
    }
}

// Update current weather display
function updateCurrentWeather(data) {
    // Temperature
    const temp = Math.round(data.main.temp);
    currentTemp.textContent = `${temp}°C`;
    
    // Weather description
    const description = data.weather[0].description;
    weatherDescription.textContent = description.charAt(0).toUpperCase() + description.slice(1);
    
    // City name
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    
    // Weather icon
    const iconCode = data.weather[0].icon;
    const iconClass = weatherIconMap[iconCode] || 'fa-cloud';
    mainWeatherIcon.className = `fas ${iconClass}`;
    
    // Wind speed and direction
    const windSpeedKmh = (data.wind.speed * 3.6).toFixed(2);
    windSpeed.textContent = windSpeedKmh;
    windDirection.textContent = getWindDirection(data.wind.deg);
    
    // Humidity
    humidity.textContent = data.main.humidity;
    humidityFill.style.width = `${data.main.humidity}%`;
    humidityStatus.textContent = getHumidityStatus(data.main.humidity);
    
    // Visibility
    const visibilityKm = (data.visibility / 1000).toFixed(0).padStart(2, '0');
    visibility.textContent = visibilityKm;
    visibilityStatus.textContent = getVisibilityStatus(data.visibility);
    
    // UV Index (simulated as it requires additional API call)
    const simulatedUV = (Math.random() * 11).toFixed(2);
    uvIndex.textContent = simulatedUV;
    updateUVGauge(simulatedUV);
    
    // Update wind chart with current wind speed
    drawWindChart(data.wind.speed * 3.6);
}

// Update forecast display
function updateForecast(data) {
    forecastList.innerHTML = '';
    
    // Get daily forecasts (one per day for next 7 days)
    const dailyForecasts = [];
    const processedDates = new Set();
    
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateString = date.toDateString();
        
        if (!processedDates.has(dateString) && dailyForecasts.length < 7) {
            processedDates.add(dateString);
            dailyForecasts.push(item);
        }
    });
    
    // Create forecast items
    dailyForecasts.forEach((forecast, index) => {
        const date = new Date(forecast.dt * 1000);
        const dayName = index === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'long' });
        const dateString = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        const tempMax = Math.round(forecast.main.temp_max);
        const tempMin = Math.round(forecast.main.temp_min);
        
        const iconCode = forecast.weather[0].icon;
        const iconClass = weatherIconMap[iconCode] || 'fa-cloud';
        
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
            <div class="forecast-day">
                <i class="fas ${iconClass} forecast-icon"></i>
                <span>${dayName}</span>
            </div>
            <div class="forecast-temp">
                <span class="temp-max">+${tempMax}°/${tempMin}°</span>
            </div>
            <div class="forecast-date">${dateString}</div>
        `;
        
        forecastList.appendChild(forecastItem);
    });
}

// Get wind direction from degrees
function getWindDirection(degrees) {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
}

// Get humidity status
function getHumidityStatus(humidity) {
    if (humidity < 30) return 'Low humidity';
    if (humidity < 60) return 'Normal';
    if (humidity < 80) return 'High humidity';
    return 'Very high';
}

// Get visibility status
function getVisibilityStatus(visibility) {
    const km = visibility / 1000;
    if (km < 1) return 'Poor visibility';
    if (km < 4) return 'Average visibility';
    if (km < 10) return 'Good visibility';
    return 'Excellent visibility';
}

// Update UV gauge
function updateUVGauge(uvValue) {
    const maxUV = 11;
    const percentage = (uvValue / maxUV) * 100;
    const dashoffset = 126 - (126 * percentage / 100);
    
    const uvPath = document.getElementById('uvPath');
    if (uvPath) {
        uvPath.style.strokeDashoffset = dashoffset;
    }
}

// Draw wind chart
function drawWindChart(windSpeedValue = 7.9) {
    const canvas = document.getElementById('windCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, '#4facfe');
    gradient.addColorStop(1, '#00f2fe');
    
    // Draw wavy line
    ctx.beginPath();
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    
    const amplitude = height / 4;
    const frequency = 0.02;
    const offset = windSpeedValue * 10;
    
    for (let x = 0; x < width; x++) {
        const y = height / 2 + Math.sin(x * frequency + offset) * amplitude;
        if (x === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    
    ctx.stroke();
    
    // Draw bars
    ctx.fillStyle = 'rgba(79, 172, 254, 0.3)';
    const barWidth = width / 20;
    const barSpacing = width / 10;
    
    for (let i = 0; i < 10; i++) {
        const x = i * barSpacing;
        const barHeight = (Math.sin(i * 0.5 + offset * 0.1) * 0.5 + 0.5) * height * 0.6 + height * 0.2;
        ctx.fillRect(x, height - barHeight, barWidth, barHeight);
    }
}

// Demo data function
function loadDemoData(city = 'Mumbai') {
    const demoWeatherData = {
        'Mumbai': {
            name: 'Mumbai',
            sys: { country: 'IN' },
            main: { temp: 28, humidity: 84, temp_max: 30, temp_min: 26 },
            weather: [{ description: 'partly cloudy', icon: '02d' }],
            wind: { speed: 2.2, deg: 247 },
            visibility: 3000
        },
        'London': {
            name: 'London',
            sys: { country: 'GB' },
            main: { temp: 12, humidity: 72, temp_max: 14, temp_min: 10 },
            weather: [{ description: 'rainy', icon: '10d' }],
            wind: { speed: 4.5, deg: 180 },
            visibility: 8000
        },
        'New York': {
            name: 'New York',
            sys: { country: 'US' },
            main: { temp: 5, humidity: 65, temp_max: 7, temp_min: 3 },
            weather: [{ description: 'clear sky', icon: '01d' }],
            wind: { speed: 3.8, deg: 90 },
            visibility: 10000
        },
        'Tokyo': {
            name: 'Tokyo',
            sys: { country: 'JP' },
            main: { temp: 15, humidity: 58, temp_max: 17, temp_min: 13 },
            weather: [{ description: 'cloudy', icon: '03d' }],
            wind: { speed: 2.9, deg: 135 },
            visibility: 9000
        },
        'Khairpur': {
            name: 'Khairpur',
            sys: { country: 'PK' },
            main: { temp: 18, humidity: 45, temp_max: 22, temp_min: 16 },
            weather: [{ description: 'clear sky', icon: '01d' }],
            wind: { speed: 3.2, deg: 310 },
            visibility: 10000
        }
    };

    // Normalize city name for search (case insensitive, handles variations)
    const normalizedCity = city.toLowerCase().trim();
    let weatherData = null;
    
    // Try exact match first
    for (let cityKey in demoWeatherData) {
        if (cityKey.toLowerCase() === normalizedCity) {
            weatherData = demoWeatherData[cityKey];
            break;
        }
    }
    
    // If not found, use Mumbai as default
    if (!weatherData) {
        weatherData = demoWeatherData['Mumbai'];
    }
    
    // Generate demo forecast
    const demoForecast = {
        list: [
            { dt: Date.now()/1000, main: { temp_max: 29, temp_min: 24 }, weather: [{ icon: '02d' }] },
            { dt: Date.now()/1000 + 86400, main: { temp_max: 30, temp_min: 25 }, weather: [{ icon: '01d' }] },
            { dt: Date.now()/1000 + 172800, main: { temp_max: 27, temp_min: 23 }, weather: [{ icon: '10d' }] },
            { dt: Date.now()/1000 + 259200, main: { temp_max: 28, temp_min: 24 }, weather: [{ icon: '02d' }] },
            { dt: Date.now()/1000 + 345600, main: { temp_max: 31, temp_min: 26 }, weather: [{ icon: '01d' }] },
            { dt: Date.now()/1000 + 432000, main: { temp_max: 29, temp_min: 25 }, weather: [{ icon: '03d' }] },
            { dt: Date.now()/1000 + 518400, main: { temp_max: 28, temp_min: 24 }, weather: [{ icon: '02d' }] }
        ]
    };
    
    updateCurrentWeather(weatherData);
    updateForecast(demoForecast);
    showWeatherContent();
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Note: To use this app, you need to:
// 1. Sign up for a free API key at https://openweathermap.org/api
// 2. Replace 'YOUR_API_KEY_HERE' with your actual API key
// 3. The free tier allows 60 calls per minute and 1,000,000 calls per month

// For testing without API key, you can uncomment this function:
/*
function loadMockData() {
    const mockCurrentData = {
        name: 'Mumbai',
        sys: { country: 'IN' },
        main: { 
            temp: 28, 
            humidity: 84,
            temp_max: 30,
            temp_min: 26
        },
        weather: [{ 
            description: 'partly cloudy',
            icon: '02d'
        }],
        wind: { 
            speed: 2.2, 
            deg: 247 
        },
        visibility: 3000
    };
    
    updateCurrentWeather(mockCurrentData);
    showWeatherContent();
}
*/
