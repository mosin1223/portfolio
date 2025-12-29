# 🌐 Mohsin Ali - Portfolio Website

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://mosin1223.github.io/portfolio/)
[![HTML](https://img.shields.io/badge/HTML-5-orange)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)](https://www.javascript.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> A modern, responsive portfolio website showcasing my projects, skills, and professional experience as a Computer Science student at IBA Sukkur.

## 📸 Preview

### Hero Section
![Hero Section](images/portfolio%20screen%20shot/hero-section.png)

### About Me
![About Me](images/portfolio%20screen%20shot/aboutme.png)

### Technologies
![Technologies](images/portfolio%20screen%20shot/technologies.png)

### Projects Showcase
![Projects Section](images/portfolio%20screen%20shot/projects.png)

### Upcoming Projects
![Upcoming Projects](images/portfolio%20screen%20shot/upcoming_projects.png)

### Certificates
![Certificates Section](images/portfolio%20screen%20shot/certificates.png)

### Services
![Services](images/portfolio%20screen%20shot/services.png)

### Get In Touch
![Contact Section](images/portfolio%20screen%20shot/getintounch.png)

### Light Mode
![Light Mode](images/portfolio%20screen%20shot/lightmode.png)

## ✨ Features

- 🎨 **Dark/Light Mode Toggle** - Switch between dark and light themes with smooth transitions
- 📱 **Fully Responsive** - Works perfectly on all devices (mobile, tablet, desktop)
- ⚡ **Fast Performance** - Optimized for quick loading and smooth animations
- 💌 **Working Contact Form** - EmailJS integration for direct communication
- 📄 **Downloadable Resume** - Professional CV and Resume available for download
- 🚀 **Live Projects** - Interactive project showcase with links to live demos
- 🎓 **Certificates Section** - Display of professional certifications
- 🌟 **Smooth Animations** - Engaging user experience with scroll animations and transitions

## 🛠️ Technologies Used

### **Frontend**
- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript (ES6+)** - Modern vanilla JavaScript
- **Font Awesome 6.4.0** - Icon library

### **Services & APIs**
- **EmailJS** - Contact form functionality
- **GitHub Pages** - Hosting platform

### **Tools & Libraries**
- **Git** - Version control
- **VS Code** - Code editor
- **GitHub Desktop** - Git GUI client

## 📁 Project Structure

```
portfolio/
├── index.html              # Main portfolio page
├── cv.html                 # Professional CV page
├── resume.html             # Detailed resume page
├── script.js               # JavaScript functionality
├── README.md               # Project documentation
├── certificates/           # Certificate PDFs
│   ├── Python for Data Science.pdf
│   ├── JavaScript Essential Training.pdf
│   └── ... (14 certificates)
├── images/                 # Images and assets
│   ├── profile.jpg.jpg
│   └── profile1.jpg.jpeg
└── projects/               # Project files
    ├── data-analysis-dashboard/
    ├── projct_/           # Quiz Application
    ├── weather dashboard/
    ├── weather-app/
    └── portfolio/
```

## 🎯 Sections

### 1. **Hero Section**
- Professional introduction with photo
- Typing animation effect
- Quick links to projects and resume

### 2. **About Me**
- Brief professional summary
- Key statistics (Projects, Certifications, Experience)
- Educational background

### 3. **Technologies**
- 12+ technology cards with icons
- Proficiency indicators
- Hover effects

### 4. **Projects**
- **Completed Projects:**
  - Personal Portfolio Website
  - Quiz Application (Firebase-based)
  - Weather Dashboard (API integration)
  - Data Analysis Dashboard (Python)
- **Upcoming Projects:**
  - 8 projects in development

### 5. **Certificates**
- 14+ professional certifications
- LinkedIn Learning courses
- Coursera certifications
- Direct PDF links

### 6. **Services**
- Web Development
- Python Programming
- Data Analysis
- Problem Solving
- Freelance Work

### 7. **Contact**
- Working contact form
- Social media links
- Email: cadetmohsan@gmail.com
- Phone: 03147159237

## 🚀 Quick Start

### **View Live**
Visit the live website: [https://mosin1223.github.io/portfolio/](https://mosin1223.github.io/portfolio/)

### **Run Locally**

1. **Clone the repository:**
```bash
git clone https://github.com/mosin1223/portfolio.git
```

2. **Navigate to the directory:**
```bash
cd portfolio
```

3. **Open in browser:**
```bash
# Simply open index.html in your browser
start index.html  # Windows
open index.html   # Mac
xdg-open index.html  # Linux
```

Or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Then open: http://localhost:8000
```

## 📧 Contact Form Setup

The contact form uses EmailJS. To use it:

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Get your credentials
3. Update in `script.js`:
```javascript
emailjs.init('YOUR_PUBLIC_KEY');
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData);
```

## 🎨 Customization

### **Change Colors**
Edit the Tailwind config in `index.html`:
```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'neon-cyan': '#00fff9',    // Primary accent
                'dark-bg': '#0a0e27',      // Dark background
                'dark-card': '#141937',    // Card background
            }
        }
    }
}
```

### **Update Content**
- Personal info: Edit text in `index.html`
- Projects: Add/remove project cards
- Certificates: Update PDF links and titles

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🌟 Key Features Explained

### **Dark/Light Mode**
- Automatically saves preference to localStorage
- Smooth transitions between themes
- Professional color schemes for both modes

### **EmailJS Integration**
- Real-time form validation
- Loading states with spinners
- Success/error messages
- Auto-hide notifications (5 seconds)

### **Scroll Animations**
- IntersectionObserver API
- Fade-in effects on scroll
- Active navigation highlighting

### **Photo Modal**
- Click profile photo to enlarge
- Full-screen overlay
- Smooth animations

## 📈 Performance

- **Lighthouse Score**: 95+/100
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 2.5s
- **Accessibility**: 100/100

## 🔗 Links

- **Live Website**: [mosin1223.github.io/portfolio](https://mosin1223.github.io/portfolio/)
- **GitHub**: [@mosin1223](https://github.com/mosin1223)
- **LinkedIn**: [Mohsin Ali](https://www.linkedin.com/in/mohsin-ali-54a9b2319/)
- **Fiverr**: [mohsi88](https://www.fiverr.com/mohsi88)
- **Upwork**: [Profile](https://www.upwork.com/freelancers/~01607a29b1aba680d1)

## 👨‍💻 About Me

**Mohsin Ali**
- 🎓 Computer Science Student at IBA Sukkur, Pakistan
- 💻 Full-Stack Developer & Data Analyst
- 🌟 Passionate about Web Development, Python, and AI
- 📧 cadetmohsan@gmail.com
- 📱 +92 314 7159237

### **Education**
- **IBA Sukkur** - BS Computer Science (2023-2027)
- **Cadet College Larkana** - Intermediate in Pre-Engineering (2019-2022)

### **Skills**
- Frontend: HTML, CSS, JavaScript, Tailwind CSS, React
- Backend: Python, Node.js, Express, Flask
- Database: MongoDB, MySQL, Firebase
- Tools: Git, VS Code, Figma, Postman

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 💡 Acknowledgments

- Design inspired by modern portfolio trends
- Icons by [Font Awesome](https://fontawesome.com/)
- CSS framework by [Tailwind CSS](https://tailwindcss.com/)
- Email service by [EmailJS](https://www.emailjs.com/)

## ⭐ Show Your Support

Give a ⭐️ if you like this project!

---

**Made with ❤️ by Mohsin Ali | Computer Science Student at IBA Sukkur**

*Last Updated: December 29, 2025*
