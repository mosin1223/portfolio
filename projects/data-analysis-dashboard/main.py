import tkinter as tk
from tkinter import ttk, filedialog, messagebox, scrolledtext
import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
from matplotlib.figure import Figure
import numpy as np


class DataAnalysisDashboard:
    def __init__(self, root):
        self.root = root
        self.root.title("Data Analysis Dashboard")
        self.root.geometry("1400x900")
        self.root.configure(bg="#1e1e1e")
        
        # Data storage
        self.df = None
        self.filename = None
        
        # Configure style for dark theme
        self.setup_styles()
        
        # Create UI
        self.create_ui()
        
    def setup_styles(self):
        """Setup dark theme styles"""
        style = ttk.Style()
        style.theme_use('clam')
        
        # Configure colors
        bg_color = "#1e1e1e"
        fg_color = "#ffffff"
        accent_color = "#007acc"
        button_color = "#2d2d30"
        
        style.configure("TFrame", background=bg_color)
        style.configure("TLabel", background=bg_color, foreground=fg_color, font=("Segoe UI", 10))
        style.configure("Title.TLabel", background=bg_color, foreground=fg_color, font=("Segoe UI", 16, "bold"))
        style.configure("Metric.TLabel", background=bg_color, foreground=accent_color, font=("Segoe UI", 14, "bold"))
        style.configure("TButton", background=button_color, foreground=fg_color, font=("Segoe UI", 10), borderwidth=1)
        style.map("TButton", background=[("active", accent_color)])
        style.configure("TCombobox", fieldbackground=button_color, background=button_color, foreground=fg_color)
        
    def create_ui(self):
        """Create the main UI layout"""
        # Main container
        main_frame = ttk.Frame(self.root)
        main_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        # Top header
        header_frame = ttk.Frame(main_frame)
        header_frame.pack(fill=tk.X, pady=(0, 10))
        
        title_label = ttk.Label(header_frame, text="DATA ANALYSIS DASHBOARD", style="Title.TLabel")
        title_label.pack(side=tk.LEFT)
        
        # Control panel
        control_frame = ttk.Frame(main_frame)
        control_frame.pack(fill=tk.X, pady=(0, 10))
        
        # Upload button
        upload_btn = ttk.Button(control_frame, text="Upload CSV", command=self.upload_csv)
        upload_btn.pack(side=tk.LEFT, padx=(0, 10))
        
        # Analyze button
        self.analyze_btn = ttk.Button(control_frame, text="Analyze Data", command=self.analyze_data, state=tk.DISABLED)
        self.analyze_btn.pack(side=tk.LEFT, padx=(0, 10))
        
        # Chart type selector
        ttk.Label(control_frame, text="Chart Type:").pack(side=tk.LEFT, padx=(20, 5))
        self.chart_type = ttk.Combobox(control_frame, values=["Bar Chart", "Grouped Bar Chart", "Line Graph", "Histogram", "Scatter Plot"], state="readonly", width=15)
        self.chart_type.set("Histogram")
        self.chart_type.pack(side=tk.LEFT, padx=(0, 10))
        
        # Aggregation method selector
        ttk.Label(control_frame, text="Aggregation:").pack(side=tk.LEFT, padx=(10, 5))
        self.agg_method = ttk.Combobox(control_frame, values=["Sum", "Average", "Count"], state="readonly", width=10)
        self.agg_method.set("Sum")
        self.agg_method.pack(side=tk.LEFT, padx=(0, 10))
        
        # Column selector for visualization
        ttk.Label(control_frame, text="Column:").pack(side=tk.LEFT, padx=(10, 5))
        self.column_selector = ttk.Combobox(control_frame, state="readonly", width=20)
        self.column_selector.pack(side=tk.LEFT, padx=(0, 10))
        
        # Visualize button
        self.viz_btn = ttk.Button(control_frame, text="Generate Chart", command=self.generate_chart, state=tk.DISABLED)
        self.viz_btn.pack(side=tk.LEFT, padx=(0, 10))
        
        # Metrics panel
        metrics_frame = ttk.Frame(main_frame)
        metrics_frame.pack(fill=tk.X, pady=(0, 10))
        
        self.metric_labels = []
        for i in range(4):
            metric_container = ttk.Frame(metrics_frame, relief=tk.SOLID, borderwidth=1)
            metric_container.pack(side=tk.LEFT, fill=tk.X, expand=True, padx=5)
            
            metric_value = ttk.Label(metric_container, text="--", style="Metric.TLabel")
            metric_value.pack(pady=(10, 0))
            
            metric_name = ttk.Label(metric_container, text="Metric", font=("Segoe UI", 9))
            metric_name.pack(pady=(0, 10))
            
            self.metric_labels.append((metric_value, metric_name))
        
        # Content area (split into data view and visualization)
        content_frame = ttk.Frame(main_frame)
        content_frame.pack(fill=tk.BOTH, expand=True)
        
        # Left side - Data view
        left_frame = ttk.Frame(content_frame)
        left_frame.pack(side=tk.LEFT, fill=tk.BOTH, expand=True, padx=(0, 5))
        
        ttk.Label(left_frame, text="Data Preview", font=("Segoe UI", 12, "bold")).pack(anchor=tk.W, pady=(0, 5))
        
        self.data_text = scrolledtext.ScrolledText(left_frame, wrap=tk.NONE, bg="#2d2d30", fg="#ffffff", 
                                                    font=("Consolas", 9), height=15)
        self.data_text.pack(fill=tk.BOTH, expand=True)
        
        # Analysis results
        ttk.Label(left_frame, text="Analysis Results", font=("Segoe UI", 12, "bold")).pack(anchor=tk.W, pady=(10, 5))
        
        self.results_text = scrolledtext.ScrolledText(left_frame, wrap=tk.WORD, bg="#2d2d30", fg="#ffffff",
                                                       font=("Consolas", 9), height=10)
        self.results_text.pack(fill=tk.BOTH, expand=True)
        
        # Right side - Visualization
        right_frame = ttk.Frame(content_frame)
        right_frame.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True, padx=(5, 0))
        
        ttk.Label(right_frame, text="Visualization", font=("Segoe UI", 12, "bold")).pack(anchor=tk.W, pady=(0, 5))
        
        self.chart_frame = ttk.Frame(right_frame)
        self.chart_frame.pack(fill=tk.BOTH, expand=True)
        
        # Status bar
        self.status_label = ttk.Label(main_frame, text="Ready. Please upload a CSV file.", relief=tk.SUNKEN, anchor=tk.W)
        self.status_label.pack(fill=tk.X, pady=(10, 0))
        
    def upload_csv(self):
        """Handle CSV file upload"""
        try:
            filename = filedialog.askopenfilename(
                title="Select CSV File",
                filetypes=[("CSV files", "*.csv"), ("All files", "*.*")]
            )
            
            if not filename:
                return
            
            self.status_label.config(text="Loading file...")
            self.root.update()
            
            # Load CSV
            self.df = pd.read_csv(filename)
            self.filename = filename.split("/")[-1]
            
            # Display first 5 rows
            self.data_text.delete(1.0, tk.END)
            self.data_text.insert(tk.END, f"File: {self.filename}\n")
            self.data_text.insert(tk.END, f"Shape: {self.df.shape[0]} rows × {self.df.shape[1]} columns\n\n")
            self.data_text.insert(tk.END, self.df.head().to_string())
            
            # Update column selector
            numeric_cols = self.df.select_dtypes(include=[np.number]).columns.tolist()
            categorical_cols = self.df.select_dtypes(include=['object']).columns.tolist()
            all_cols = numeric_cols + categorical_cols
            
            self.column_selector['values'] = all_cols
            if all_cols:
                self.column_selector.current(0)
            
            # Enable buttons
            self.analyze_btn.config(state=tk.NORMAL)
            self.viz_btn.config(state=tk.NORMAL)
            
            # Update status
            self.status_label.config(text=f"Successfully loaded: {self.filename}")
            
            # Clear previous results
            self.results_text.delete(1.0, tk.END)
            for metric_value, metric_name in self.metric_labels:
                metric_value.config(text="--")
                metric_name.config(text="Metric")
            
            messagebox.showinfo("Success", f"CSV file loaded successfully!\n\nRows: {self.df.shape[0]}\nColumns: {self.df.shape[1]}")
            
        except Exception as e:
            messagebox.showerror("Error", f"Failed to load CSV file:\n{str(e)}")
            self.status_label.config(text="Error loading file")
    
    def analyze_data(self):
        """Perform basic data analysis"""
        if self.df is None:
            messagebox.showwarning("Warning", "Please upload a CSV file first!")
            return
        
        try:
            self.status_label.config(text="Analyzing data...")
            self.root.update()
            
            # Handle missing data
            numeric_cols = self.df.select_dtypes(include=[np.number]).columns
            self.df[numeric_cols] = self.df[numeric_cols].fillna(self.df[numeric_cols].mean())
            
            # Calculate statistics
            self.results_text.delete(1.0, tk.END)
            self.results_text.insert(tk.END, "=" * 60 + "\n")
            self.results_text.insert(tk.END, "DATA ANALYSIS RESULTS\n")
            self.results_text.insert(tk.END, "=" * 60 + "\n\n")
            
            # Basic info
            self.results_text.insert(tk.END, f"Dataset: {self.filename}\n")
            self.results_text.insert(tk.END, f"Total Rows: {self.df.shape[0]}\n")
            self.results_text.insert(tk.END, f"Total Columns: {self.df.shape[1]}\n\n")
            
            # Statistics for numeric columns
            self.results_text.insert(tk.END, "-" * 60 + "\n")
            self.results_text.insert(tk.END, "NUMERIC COLUMN STATISTICS\n")
            self.results_text.insert(tk.END, "-" * 60 + "\n\n")
            
            for col in numeric_cols:
                self.results_text.insert(tk.END, f"Column: {col}\n")
                self.results_text.insert(tk.END, f"  Mean: {self.df[col].mean():.4f}\n")
                self.results_text.insert(tk.END, f"  Median: {self.df[col].median():.4f}\n")
                self.results_text.insert(tk.END, f"  Std Dev: {self.df[col].std():.4f}\n")
                self.results_text.insert(tk.END, f"  Min: {self.df[col].min():.4f}\n")
                self.results_text.insert(tk.END, f"  Max: {self.df[col].max():.4f}\n\n")
            
            # Correlation matrix
            if len(numeric_cols) > 1:
                self.results_text.insert(tk.END, "-" * 60 + "\n")
                self.results_text.insert(tk.END, "CORRELATION MATRIX\n")
                self.results_text.insert(tk.END, "-" * 60 + "\n\n")
                corr_matrix = self.df[numeric_cols].corr()
                self.results_text.insert(tk.END, corr_matrix.to_string())
                self.results_text.insert(tk.END, "\n\n")
            
            # Missing values
            missing = self.df.isnull().sum()
            if missing.sum() > 0:
                self.results_text.insert(tk.END, "-" * 60 + "\n")
                self.results_text.insert(tk.END, "MISSING VALUES (Before Filling)\n")
                self.results_text.insert(tk.END, "-" * 60 + "\n\n")
                self.results_text.insert(tk.END, missing[missing > 0].to_string())
                self.results_text.insert(tk.END, "\n\n(Missing values in numeric columns have been filled with mean)\n\n")
            
            # Update metric labels
            if len(numeric_cols) >= 1:
                first_col = numeric_cols[0]
                self.metric_labels[0][0].config(text=f"{self.df.shape[0]}")
                self.metric_labels[0][1].config(text="Total Rows")
                
                self.metric_labels[1][0].config(text=f"{self.df.shape[1]}")
                self.metric_labels[1][1].config(text="Total Columns")
                
                self.metric_labels[2][0].config(text=f"{self.df[first_col].mean():.2f}")
                self.metric_labels[2][1].config(text=f"Avg {first_col[:15]}")
                
                self.metric_labels[3][0].config(text=f"{self.df[first_col].std():.2f}")
                self.metric_labels[3][1].config(text=f"Std {first_col[:15]}")
            
            self.status_label.config(text="Analysis complete")
            messagebox.showinfo("Success", "Data analysis completed successfully!")
            
        except Exception as e:
            messagebox.showerror("Error", f"Error during analysis:\n{str(e)}")
            self.status_label.config(text="Analysis failed")
    
    def generate_chart(self):
        """Generate visualization based on selected chart type"""
        if self.df is None:
            messagebox.showwarning("Warning", "Please upload a CSV file first!")
            return
        
        try:
            chart_type = self.chart_type.get()
            column = self.column_selector.get()
            
            if not column:
                messagebox.showwarning("Warning", "Please select a column to visualize!")
                return
            
            self.status_label.config(text=f"Generating {chart_type}...")
            self.root.update()
            
            # Clear previous chart
            for widget in self.chart_frame.winfo_children():
                widget.destroy()
            
            # Create figure with dark theme
            fig = Figure(figsize=(8, 6), facecolor="#2d2d30")
            ax = fig.add_subplot(111)
            ax.set_facecolor("#2d2d30")
            ax.tick_params(colors='white')
            ax.spines['bottom'].set_color('white')
            ax.spines['top'].set_color('white')
            ax.spines['left'].set_color('white')
            ax.spines['right'].set_color('white')
            ax.xaxis.label.set_color('white')
            ax.yaxis.label.set_color('white')
            ax.title.set_color('white')
            
            # Generate appropriate chart
            if chart_type == "Bar Chart":
                if self.df[column].dtype == 'object':
                    # Categorical data
                    value_counts = self.df[column].value_counts().head(10)
                    bars = ax.bar(range(len(value_counts)), value_counts.values, color='#007acc')
                    ax.set_xticks(range(len(value_counts)))
                    ax.set_xticklabels(value_counts.index, rotation=45, ha='right')
                    
                    # Add value labels on bars
                    for i, bar in enumerate(bars):
                        height = bar.get_height()
                        ax.text(bar.get_x() + bar.get_width()/2., height,
                               f'{int(height)}',
                               ha='center', va='bottom', color='white', fontsize=9)
                else:
                    # Numeric data - create bins
                    bins = pd.cut(self.df[column], bins=10)
                    value_counts = bins.value_counts().sort_index()
                    bars = ax.bar(range(len(value_counts)), value_counts.values, color='#007acc')
                    ax.set_xticks(range(len(value_counts)))
                    ax.set_xticklabels([str(x) for x in value_counts.index], rotation=45, ha='right')
                    
                    # Add value labels on bars
                    for i, bar in enumerate(bars):
                        height = bar.get_height()
                        ax.text(bar.get_x() + bar.get_width()/2., height,
                               f'{int(height)}',
                               ha='center', va='bottom', color='white', fontsize=9)
                
                ax.set_title(f"Bar Chart - {column}", fontsize=14, pad=20)
                ax.set_xlabel(column)
                ax.set_ylabel("Count")
                
            elif chart_type == "Grouped Bar Chart":
                # Check if we have both category and value columns
                categorical_cols = self.df.select_dtypes(include=['object']).columns.tolist()
                numeric_cols = self.df.select_dtypes(include=[np.number]).columns.tolist()
                
                if len(categorical_cols) > 0 and len(numeric_cols) > 0:
                    # Use first categorical column as category, or selected column if categorical
                    category_col = column if self.df[column].dtype == 'object' else (categorical_cols[0] if categorical_cols else None)
                    # Use first numeric column as value, or selected column if numeric
                    value_col = column if self.df[column].dtype != 'object' else (numeric_cols[0] if numeric_cols else None)
                    
                    if category_col and value_col:
                        # Get aggregation method
                        agg_method = self.agg_method.get()
                        
                        if agg_method == "Sum":
                            grouped_data = self.df.groupby(category_col)[value_col].sum()
                        elif agg_method == "Average":
                            grouped_data = self.df.groupby(category_col)[value_col].mean()
                        else:  # Count
                            grouped_data = self.df.groupby(category_col)[value_col].count()
                        
                        # Create bar chart
                        bars = ax.bar(range(len(grouped_data)), grouped_data.values, color='#007acc')
                        ax.set_xticks(range(len(grouped_data)))
                        ax.set_xticklabels(grouped_data.index, rotation=45, ha='right')
                        
                        # Add value labels on bars
                        for i, bar in enumerate(bars):
                            height = bar.get_height()
                            ax.text(bar.get_x() + bar.get_width()/2., height,
                                   f'{height:.2f}',
                                   ha='center', va='bottom', color='white', fontsize=9)
                        
                        ax.set_title(f"{agg_method} of {value_col} by {category_col}", fontsize=14, pad=20)
                        ax.set_xlabel(category_col)
                        ax.set_ylabel(f"{agg_method} of {value_col}")
                    else:
                        messagebox.showwarning("Warning", "Need both categorical and numeric columns for grouped bar chart!")
                        return
                else:
                    messagebox.showwarning("Warning", "Need both categorical and numeric columns for grouped bar chart!")
                    return
                
            elif chart_type == "Line Graph":
                if self.df[column].dtype != 'object':
                    line = ax.plot(self.df.index, self.df[column], color='#4ec9b0', linewidth=2, marker='o', markersize=4)
                    ax.set_title(f"Line Graph - {column} Over Index", fontsize=14, pad=20)
                    ax.set_xlabel("Index (Row Number)")
                    ax.set_ylabel(f"{column} (Values)")
                    ax.grid(True, alpha=0.3, color='white')
                    
                    # Add summary statistics
                    mean_val = self.df[column].mean()
                    ax.axhline(y=mean_val, color='#ff6b6b', linestyle='--', linewidth=1, label=f'Mean: {mean_val:.2f}')
                    ax.legend(loc='upper right', facecolor='#2d2d30', edgecolor='white')
                else:
                    messagebox.showwarning("Warning", "Line graphs are only available for numeric columns!")
                    return
                    
            elif chart_type == "Histogram":
                if self.df[column].dtype != 'object':
                    n, bins, patches = ax.hist(self.df[column].dropna(), bins=30, color='#007acc', edgecolor='white', alpha=0.7)
                    ax.set_title(f"Histogram - {column} Distribution", fontsize=14, pad=20)
                    ax.set_xlabel(f"{column} (Values)")
                    ax.set_ylabel("Frequency (Count)")
                    ax.grid(True, alpha=0.3, color='white')
                    
                    # Add text showing data range
                    data_min = self.df[column].min()
                    data_max = self.df[column].max()
                    ax.text(0.02, 0.98, f'Range: {data_min:.2f} to {data_max:.2f}',
                           transform=ax.transAxes, fontsize=10, verticalalignment='top',
                           bbox=dict(boxstyle='round', facecolor='#2d2d30', alpha=0.8, edgecolor='white'))
                else:
                    messagebox.showwarning("Warning", "Histograms are only available for numeric columns!")
                    return
                    
            elif chart_type == "Scatter Plot":
                numeric_cols = self.df.select_dtypes(include=[np.number]).columns.tolist()
                if len(numeric_cols) >= 2:
                    # Use first two numeric columns for scatter
                    x_col = numeric_cols[0]
                    y_col = numeric_cols[1] if column == x_col else column
                    
                    if self.df[y_col].dtype != 'object':
                        scatter = ax.scatter(self.df[x_col], self.df[y_col], c=self.df.index, 
                                           cmap='viridis', alpha=0.6, s=50)
                        ax.set_title(f"Scatter Plot - {x_col} vs {y_col}", fontsize=14, pad=20)
                        ax.set_xlabel(x_col)
                        ax.set_ylabel(y_col)
                        ax.grid(True, alpha=0.3, color='white')
                    else:
                        messagebox.showwarning("Warning", "Scatter plots require numeric columns!")
                        return
                else:
                    messagebox.showwarning("Warning", "Need at least 2 numeric columns for scatter plot!")
                    return
            
            fig.tight_layout()
            
            # Embed chart in tkinter
            canvas = FigureCanvasTkAgg(fig, master=self.chart_frame)
            canvas.draw()
            canvas.get_tk_widget().pack(fill=tk.BOTH, expand=True)
            
            self.status_label.config(text=f"{chart_type} generated successfully")
            
        except Exception as e:
            messagebox.showerror("Error", f"Error generating chart:\n{str(e)}")
            self.status_label.config(text="Chart generation failed")


def main():
    root = tk.Tk()
    app = DataAnalysisDashboard(root)
    root.mainloop()


if __name__ == "__main__":
    main()
