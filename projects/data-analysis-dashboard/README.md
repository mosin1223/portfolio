# 📊 Data Analysis Dashboard

A Python-based data analysis and visualization dashboard with a dark-themed GUI built using Tkinter. Upload CSV files, perform statistical analysis, and generate beautiful visualizations with just a few clicks!

![Python](https://img.shields.io/badge/Python-3.x-blue.svg)
![Pandas](https://img.shields.io/badge/Pandas-Latest-green.svg)
![Matplotlib](https://img.shields.io/badge/Matplotlib-Latest-orange.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## ✨ Features

- 📁 **CSV File Upload**: Load CSV files through an intuitive file dialog
- 👀 **Data Preview**: View the first 5 rows of your dataset
- 📊 **Statistical Analysis**:
  - Mean, Median, Standard Deviation
  - Min/Max values
  - Correlation matrix
  - Missing data handling (automatic fill with mean)
- 📈 **Interactive Visualizations**:
  - Bar Charts for categorical and numeric data
  - Line Graphs for time-series data
  - Histograms for distribution analysis
  - Scatter Plots for relationship analysis
- 🎨 **Dark Theme UI**: Professional look inspired by modern dashboards
- ⚠️ **Error Handling**: Graceful handling of invalid inputs and file formats

## 🛠️ Technologies Used

- **Python 3.x** - Core programming language
- **Pandas** - Data manipulation and analysis
- **NumPy** - Numerical computations
- **Matplotlib** - Data visualization
- **Tkinter** - GUI framework

## 📋 Prerequisites

- Python 3.7 or higher
- pip package manager

## 🚀 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/mosin1223/data-analysis-dashboard.git
cd data-analysis-dashboard
```

2. **Install required dependencies:**
```bash
pip install -r requirements.txt
```

**Note:** tkinter comes pre-installed with Python. If you encounter issues:
- **Windows**: Already included with Python
- **Linux**: `sudo apt-get install python3-tk`
- **Mac**: Already included with Python

## 💻 Usage

1. **Run the application:**
```bash
python main.py
```

2. **Follow these steps:**
   - Click **"Upload CSV"** to load your data file
   - Click **"Analyze Data"** to perform statistical analysis
   - Select **chart type** and **column** from dropdowns
   - Click **"Generate Chart"** to visualize your data

## 📸 Screenshots

<!-- Add your screenshots here -->
*Coming soon: Dashboard interface, data analysis view, and chart examples*

## 📊 Sample Data Format

Your CSV file should have headers in the first row:

```csv
Month,Sales,Profit,Customers
January,50000,12000,450
February,55000,13500,480
March,48000,11000,420
```

## 🎯 Use Cases

- 📈 **Business Analytics** - Analyze sales, revenue, and customer trends
- 🔬 **Academic Research** - Process and visualize research datasets
- 💼 **Financial Analysis** - Track expenses, budgets, and investments
- 📊 **Marketing Insights** - Campaign performance and metrics

## 📁 Project Structure

```
data-analysis-dashboard/
├── main.py              # Main application file
├── requirements.txt     # Python dependencies
├── README.md           # Project documentation
└── data/               # Sample datasets (optional)
```

## 🔧 Future Enhancements

- [ ] Web-based interface using Streamlit or Flask
- [ ] Real-time data updates
- [ ] Database integration (MySQL/PostgreSQL)
- [ ] Export analysis to PDF reports
- [ ] Advanced ML predictions and forecasting
- [ ] Interactive dashboard with filters and drill-down
- [ ] Support for Excel files
- [ ] Data cleaning and preprocessing tools

## 🐛 Known Issues

- Large CSV files (>100MB) may take longer to process
- Requires proper CSV formatting with headers

## 👨‍💻 Author

**Mohsin Ali**
- 🌐 Portfolio: [mohsin.dev](https://mosin1223.github.io/portfolio/)
- 💼 GitHub: [@mosin1223](https://github.com/mosin1223)
- 🔗 LinkedIn: [Mohsin Ali](https://www.linkedin.com/in/mohsin-ali-54a9b2319/)
- 📧 Email: cadetmohsan@gmail.com
- 🎓 Computer Science Student at IBA Sukkur, Pakistan

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 💡 Acknowledgments

- Inspired by modern data analytics platforms
- Built with love for data science enthusiasts
- Thanks to the open-source community

## ⭐ Show Your Support

Give a ⭐️ if you like this project!

---

**Made with ❤️ by Mohsin Ali | Passionate about Data Science & Web Development**
├── requirements.txt     # Python dependencies
└── README.md           # This file
```

## Requirements

- Python 3.7+
- pandas >= 2.0.0
- matplotlib >= 3.7.0
- numpy >= 1.24.0
- tkinter (built-in)

## Screenshot

The dashboard features:
- Top control panel with upload, analyze, and visualization controls
- Metrics display showing key statistics
- Split view with data preview and analysis results on the left
- Interactive charts on the right
- Dark theme with blue accents

## Error Handling

The application handles:
- Invalid CSV file formats
- Missing data (automatically filled with mean)
- Empty file selections
- Unsupported column types for specific chart types

## Future Enhancements

- Export analysis results to PDF/Excel
- More chart types (Pie charts, Box plots, Heatmaps)
- Data filtering and transformation
- Multiple file comparison
- Custom color themes
