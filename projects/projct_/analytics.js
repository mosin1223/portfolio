// Analytics JavaScript

let allResults = [];
let filteredResults = [];
let scoreHistoryChart = null;
let categoryChart = null;

// Check authentication and load data
auth.onAuthStateChanged(async (user) => {
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    // Load user data (name and avatar)
    try {
        const userDoc = await db.collection('users').doc(user.uid).get();
        if (userDoc.exists) {
            const userData = userDoc.data();
            
            // Display username
            const displayName = userData.name || user.email.split('@')[0];
            document.getElementById('userName').textContent = displayName;
            
            // Display avatar
            if (userData.avatar) {
                document.getElementById('userAvatar').src = userData.avatar;
            }
        } else {
            // Fallback to email username
            document.getElementById('userName').textContent = user.email.split('@')[0];
        }
    } catch (error) {
        console.error('Error loading user data:', error);
        document.getElementById('userName').textContent = user.email.split('@')[0];
    }

    // Load analytics data
    await loadAnalyticsData(user.uid);
});

// Load all quiz results
async function loadAnalyticsData(uid) {
    const loadingState = document.getElementById('loadingState');
    const emptyState = document.getElementById('emptyState');

    try {
        // Fetch all results
        const snapshot = await db.collection('users')
            .doc(uid)
            .collection('results')
            .orderBy('timestamp', 'desc')
            .get();

        if (snapshot.empty) {
            loadingState.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        // Process results
        allResults = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                timestamp: data.timestamp ? data.timestamp.toDate() : new Date()
            };
        });

        filteredResults = [...allResults];

        // Load categories for filter
        await loadCategoriesFilter();

        // Set default date range (last 30 days)
        const today = new Date();
        const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        document.getElementById('dateTo').valueAsDate = today;
        document.getElementById('dateFrom').valueAsDate = thirtyDaysAgo;

        // Display analytics
        updateAnalytics();

        loadingState.style.display = 'none';

    } catch (error) {
        console.error('Error loading analytics:', error);
        loadingState.style.display = 'none';
        emptyState.style.display = 'block';
    }
}

// Load categories for filter dropdown
async function loadCategoriesFilter() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = [...new Set(allResults.map(r => r.category))];

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Update all analytics displays
function updateAnalytics() {
    updateStatistics();
    updateScoreHistoryChart();
    updateCategoryChart();
    updateResultsTable();
}

// Update statistics cards
function updateStatistics() {
    const totalQuizzes = filteredResults.length;
    
    if (totalQuizzes === 0) {
        document.getElementById('totalQuizzes').textContent = '0';
        document.getElementById('averageScore').textContent = '0%';
        document.getElementById('bestScore').textContent = '0%';
        document.getElementById('totalTime').textContent = '0';
        return;
    }

    // Total Quizzes
    document.getElementById('totalQuizzes').textContent = totalQuizzes;

    // Average Score
    const avgPercentage = filteredResults.reduce((sum, r) => sum + r.percentage, 0) / totalQuizzes;
    document.getElementById('averageScore').textContent = Math.round(avgPercentage) + '%';

    // Best Score
    const bestPercentage = Math.max(...filteredResults.map(r => r.percentage));
    document.getElementById('bestScore').textContent = bestPercentage + '%';

    // Total Time (in minutes)
    const totalSeconds = filteredResults.reduce((sum, r) => sum + (r.timeTaken || 0), 0);
    const totalMinutes = Math.round(totalSeconds / 60);
    document.getElementById('totalTime').textContent = totalMinutes;
}

// Update score history line chart
function updateScoreHistoryChart() {
    const ctx = document.getElementById('scoreHistoryChart');
    
    // Destroy existing chart
    if (scoreHistoryChart) {
        scoreHistoryChart.destroy();
    }

    // Sort by date (oldest first for chart)
    const sortedResults = [...filteredResults].reverse();

    // Prepare data
    const labels = sortedResults.map((r, index) => {
        const date = r.timestamp;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });

    const scores = sortedResults.map(r => r.percentage);

    // Create chart
    scoreHistoryChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Score (%)',
                data: scores,
                borderColor: 'rgb(66, 153, 225)',
                backgroundColor: 'rgba(66, 153, 225, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 5,
                pointHoverRadius: 7,
                pointBackgroundColor: 'rgb(66, 153, 225)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'Score: ' + context.parsed.y + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

// Update category performance bar chart
function updateCategoryChart() {
    const ctx = document.getElementById('categoryChart');
    
    // Destroy existing chart
    if (categoryChart) {
        categoryChart.destroy();
    }

    // Calculate average score per category
    const categoryData = {};
    filteredResults.forEach(r => {
        if (!categoryData[r.category]) {
            categoryData[r.category] = { total: 0, count: 0 };
        }
        categoryData[r.category].total += r.percentage;
        categoryData[r.category].count++;
    });

    const categories = Object.keys(categoryData);
    const averages = categories.map(cat => 
        Math.round(categoryData[cat].total / categoryData[cat].count)
    );

    // Create chart
    categoryChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [{
                label: 'Average Score (%)',
                data: averages,
                backgroundColor: [
                    'rgba(66, 153, 225, 0.8)',
                    'rgba(72, 187, 120, 0.8)',
                    'rgba(237, 137, 54, 0.8)',
                    'rgba(245, 101, 101, 0.8)',
                    'rgba(159, 122, 234, 0.8)'
                ],
                borderColor: [
                    'rgb(66, 153, 225)',
                    'rgb(72, 187, 120)',
                    'rgb(237, 137, 54)',
                    'rgb(245, 101, 101)',
                    'rgb(159, 122, 234)'
                ],
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'Average: ' + context.parsed.y + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

// Update results table
function updateResultsTable() {
    const tbody = document.getElementById('resultsTableBody');
    const resultsCount = document.getElementById('resultsCount');

    tbody.innerHTML = '';

    if (filteredResults.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 40px; color: var(--text-secondary);">No results found</td></tr>';
        resultsCount.textContent = 'Showing 0 results';
        return;
    }

    resultsCount.textContent = `Showing ${filteredResults.length} result${filteredResults.length !== 1 ? 's' : ''}`;

    filteredResults.forEach((result, index) => {
        const row = document.createElement('tr');
        
        // Get status
        let statusClass = 'status-poor';
        let statusText = 'Needs Work';
        if (result.percentage >= 80) {
            statusClass = 'status-excellent';
            statusText = 'Excellent';
        } else if (result.percentage >= 60) {
            statusClass = 'status-good';
            statusText = 'Good';
        } else if (result.percentage >= 40) {
            statusClass = 'status-average';
            statusText = 'Average';
        }

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${result.timestamp.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}</td>
            <td>${result.category}</td>
            <td><strong>${result.correctAnswers}/${result.totalQuestions}</strong></td>
            <td><strong>${result.percentage}%</strong></td>
            <td>${result.timeTaken}s</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
        `;
        
        tbody.appendChild(row);
    });
}

// Apply filters
document.getElementById('applyFilters').addEventListener('click', () => {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const dateFrom = document.getElementById('dateFrom').value;
    const dateTo = document.getElementById('dateTo').value;

    filteredResults = allResults.filter(result => {
        // Category filter
        if (categoryFilter !== 'all' && result.category !== categoryFilter) {
            return false;
        }

        // Date range filter
        if (dateFrom) {
            const fromDate = new Date(dateFrom);
            fromDate.setHours(0, 0, 0, 0);
            if (result.timestamp < fromDate) {
                return false;
            }
        }

        if (dateTo) {
            const toDate = new Date(dateTo);
            toDate.setHours(23, 59, 59, 999);
            if (result.timestamp > toDate) {
                return false;
            }
        }

        return true;
    });

    updateAnalytics();
});

// Clear filters
document.getElementById('clearFilters').addEventListener('click', () => {
    document.getElementById('categoryFilter').value = 'all';
    document.getElementById('dateFrom').value = '';
    document.getElementById('dateTo').value = '';
    
    filteredResults = [...allResults];
    updateAnalytics();
});
