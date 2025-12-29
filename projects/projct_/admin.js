// Admin Panel JavaScript

let currentUser = null;
let selectedCategoryId = null;
let editingCategoryId = null;
let editingQuestionId = null;

// Check admin access
auth.onAuthStateChanged(async (user) => {
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    try {
        const userDoc = await db.collection('users').doc(user.uid).get();
        const userData = userDoc.data();

        if (!userData || userData.admin !== true) {
            showToast('Access denied. Admin privileges required.', 'error');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
            return;
        }

        currentUser = user;
        document.getElementById('adminName').textContent = userData.name;
        if (userData.avatar) {
            document.getElementById('adminAvatar').src = userData.avatar;
        }

        
        loadCategories();
        loadStatistics();

    } catch (error) {
        console.error('Error checking admin access:', error);
        window.location.href = 'login.html';
    }
});

// Navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const section = link.dataset.section;
        if (!section) return;

        e.preventDefault();

        
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        
        document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
        document.getElementById(`${section}-section`).classList.add('active');

        // Reload data if needed
        if (section === 'categories') {
            loadCategories();
        } else if (section === 'statistics') {
            loadStatistics();
        }
    });
});


document.getElementById('logoutBtn').addEventListener('click', () => {
    auth.signOut().then(() => {
        window.location.href = 'login.html';
    });
});

// ===== CATEGORIES MANAGEMENT =====


async function loadCategories() {
    const grid = document.getElementById('categoriesGrid');
    const select = document.getElementById('categorySelect');

    try {
        const snapshot = await db.collection('categories').orderBy('name').get();

        if (snapshot.empty) {
            grid.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📁</div><h3>No categories yet</h3><p>Create your first category to get started</p></div>';
            select.innerHTML = '<option value="">No categories available</option>';
            return;
        }

        grid.innerHTML = '';
        select.innerHTML = '<option value="">Select Category</option>';

        for (const doc of snapshot.docs) {
            const category = doc.data();
            const categoryId = doc.id;

            
            const questionsSnapshot = await db.collection('categories').doc(categoryId).collection('questions').get();
            const questionCount = questionsSnapshot.size;

            // Add to grid
            const card = document.createElement('div');
            card.className = 'category-card';
            card.innerHTML = `
                <div class="category-card-header">
                    <span class="category-icon-large">${category.icon}</span>
                    <div class="category-actions">
                        <button class="btn-icon btn-edit" onclick="editCategory('${categoryId}')">✏️</button>
                        <button class="btn-icon btn-delete" onclick="deleteCategory('${categoryId}')">🗑️</button>
                    </div>
                </div>
                <h3 class="category-title">${category.name}</h3>
                <p class="category-description">${category.description}</p>
                <div class="category-stats">
                    <div class="stat-item">
                        <span class="stat-value">${questionCount}</span>
                        <span class="stat-label">Questions</span>
                    </div>
                </div>
            `;
            grid.appendChild(card);

            
            const option = document.createElement('option');
            option.value = categoryId;
            option.textContent = `${category.icon} ${category.name}`;
            select.appendChild(option);
        }

    } catch (error) {
        console.error('Error loading categories:', error);
        showToast('Failed to load categories', 'error');
    }
}

// Add Category Button
document.getElementById('addCategoryBtn').addEventListener('click', () => {
    editingCategoryId = null;
    document.getElementById('categoryModalTitle').textContent = 'Add Category';
    document.getElementById('categoryForm').reset();
    document.getElementById('categoryModal').classList.add('active');
});

// Category Form Submit
document.getElementById('categoryForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('categoryName').value.trim();
    const icon = document.getElementById('categoryIcon').value.trim();
    const description = document.getElementById('categoryDescription').value.trim();

    try {
        const categoryData = {
            name,
            icon,
            description,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        if (editingCategoryId) {
           
            await db.collection('categories').doc(editingCategoryId).update(categoryData);
            showToast('Category updated successfully', 'success');
        } else {
            
            categoryData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
            await db.collection('categories').add(categoryData);
            showToast('Category created successfully', 'success');
        }

        document.getElementById('categoryModal').classList.remove('active');
        loadCategories();

    } catch (error) {
        console.error('Error saving category:', error);
        showToast('Failed to save category', 'error');
    }
});

// Edit Category
async function editCategory(categoryId) {
    try {
        const doc = await db.collection('categories').doc(categoryId).get();
        const category = doc.data();

        editingCategoryId = categoryId;
        document.getElementById('categoryModalTitle').textContent = 'Edit Category';
        document.getElementById('categoryName').value = category.name;
        document.getElementById('categoryIcon').value = category.icon;
        document.getElementById('categoryDescription').value = category.description;
        document.getElementById('categoryModal').classList.add('active');

    } catch (error) {
        console.error('Error loading category:', error);
        showToast('Failed to load category', 'error');
    }
}

// Delete Category
async function deleteCategory(categoryId) {
    if (!confirm('Are you sure? This will delete all questions in this category.')) {
        return;
    }

    try {
        
        const questionsSnapshot = await db.collection('categories').doc(categoryId).collection('questions').get();
        const batch = db.batch();
        questionsSnapshot.forEach(doc => {
            batch.delete(doc.ref);
        });
        await batch.commit();

        
        await db.collection('categories').doc(categoryId).delete();

        showToast('Category deleted successfully', 'success');
        loadCategories();

    } catch (error) {
        console.error('Error deleting category:', error);
        showToast('Failed to delete category', 'error');
    }
}


document.getElementById('closeCategoryModal').addEventListener('click', () => {
    document.getElementById('categoryModal').classList.remove('active');
});

document.getElementById('cancelCategory').addEventListener('click', () => {
    document.getElementById('categoryModal').classList.remove('active');
});

// ===== QUESTIONS MANAGEMENT =====


document.getElementById('categorySelect').addEventListener('change', (e) => {
    selectedCategoryId = e.target.value;
    document.getElementById('addQuestionBtn').disabled = !selectedCategoryId;

    if (selectedCategoryId) {
        loadQuestions(selectedCategoryId);
    } else {
        document.getElementById('questionsList').innerHTML = '';
    }
});

// Load Questions
async function loadQuestions(categoryId) {
    const list = document.getElementById('questionsList');

    try {
        const snapshot = await db.collection('categories').doc(categoryId).collection('questions').orderBy('order', 'asc').get();

        if (snapshot.empty) {
            list.innerHTML = '<div class="empty-state"><div class="empty-state-icon">❓</div><h3>No questions yet</h3><p>Add your first question to this category</p></div>';
            return;
        }

        list.innerHTML = '';

        snapshot.docs.forEach((doc, index) => {
            const question = doc.data();
            const questionId = doc.id;

            const card = document.createElement('div');
            card.className = 'question-card';
            card.innerHTML = `
                <div class="question-header">
                    <span class="question-number">Question ${index + 1}</span>
                    <div class="category-actions">
                        <button class="btn-icon btn-edit" onclick="editQuestion('${questionId}')">✏️</button>
                        <button class="btn-icon btn-delete" onclick="deleteQuestion('${questionId}')">🗑️</button>
                    </div>
                </div>
                <div class="question-text">${question.question}</div>
                <div class="options-list">
                    ${question.options.map((opt, i) => `
                        <div class="option-item ${i === question.correct ? 'correct' : ''}">
                            <span class="option-letter">${String.fromCharCode(65 + i)}</span>
                            <span>${opt}</span>
                        </div>
                    `).join('')}
                </div>
            `;
            list.appendChild(card);
        });

    } catch (error) {
        console.error('Error loading questions:', error);
        showToast('Failed to load questions', 'error');
    }
}

// Add Question Button
document.getElementById('addQuestionBtn').addEventListener('click', () => {
    editingQuestionId = null;
    document.getElementById('questionModalTitle').textContent = 'Add Question';
    document.getElementById('questionForm').reset();
    document.getElementById('questionModal').classList.add('active');
});


document.getElementById('questionForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!selectedCategoryId) {
        showToast('Please select a category first', 'error');
        return;
    }

    const question = document.getElementById('questionText').value.trim();
    const options = [
        document.getElementById('option0').value.trim(),
        document.getElementById('option1').value.trim(),
        document.getElementById('option2').value.trim(),
        document.getElementById('option3').value.trim()
    ];
    const correct = parseInt(document.getElementById('correctAnswer').value);

    try {
        const questionData = {
            question,
            options,
            correct,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        if (editingQuestionId) {
            // Update
            await db.collection('categories').doc(selectedCategoryId).collection('questions').doc(editingQuestionId).update(questionData);
            showToast('Question updated successfully', 'success');
        } else {
     
            const snapshot = await db.collection('categories').doc(selectedCategoryId).collection('questions').get();
            questionData.order = snapshot.size;
            questionData.createdAt = firebase.firestore.FieldValue.serverTimestamp();

            await db.collection('categories').doc(selectedCategoryId).collection('questions').add(questionData);
            showToast('Question created successfully', 'success');
        }

        document.getElementById('questionModal').classList.remove('active');
        loadQuestions(selectedCategoryId);

    } catch (error) {
        console.error('Error saving question:', error);
        showToast('Failed to save question', 'error');
    }
});

// Edit Question
async function editQuestion(questionId) {
    try {
        const doc = await db.collection('categories').doc(selectedCategoryId).collection('questions').doc(questionId).get();
        const question = doc.data();

        editingQuestionId = questionId;
        document.getElementById('questionModalTitle').textContent = 'Edit Question';
        document.getElementById('questionText').value = question.question;
        document.getElementById('option0').value = question.options[0];
        document.getElementById('option1').value = question.options[1];
        document.getElementById('option2').value = question.options[2];
        document.getElementById('option3').value = question.options[3];
        document.getElementById('correctAnswer').value = question.correct;
        document.getElementById('questionModal').classList.add('active');

    } catch (error) {
        console.error('Error loading question:', error);
        showToast('Failed to load question', 'error');
    }
}

// Delete Question
async function deleteQuestion(questionId) {
    if (!confirm('Are you sure you want to delete this question?')) {
        return;
    }

    try {
        await db.collection('categories').doc(selectedCategoryId).collection('questions').doc(questionId).delete();
        showToast('Question deleted successfully', 'success');
        loadQuestions(selectedCategoryId);

    } catch (error) {
        console.error('Error deleting question:', error);
        showToast('Failed to delete question', 'error');
    }
}


document.getElementById('closeQuestionModal').addEventListener('click', () => {
    document.getElementById('questionModal').classList.remove('active');
});

document.getElementById('cancelQuestion').addEventListener('click', () => {
    document.getElementById('questionModal').classList.remove('active');
});

// ===== STATISTICS =====

async function loadStatistics() {
    try {
        
        const categoriesSnapshot = await db.collection('categories').get();
        const totalCategories = categoriesSnapshot.size;
        document.getElementById('totalCategories').textContent = totalCategories;

        
        let totalQuestions = 0;
        const categoryStats = [];

        for (const doc of categoriesSnapshot.docs) {
            const category = doc.data();
            const questionsSnapshot = await db.collection('categories').doc(doc.id).collection('questions').get();
            const count = questionsSnapshot.size;
            totalQuestions += count;

            categoryStats.push({
                name: `${category.icon} ${category.name}`,
                count
            });
        }

        document.getElementById('totalQuestions').textContent = totalQuestions;

        
        const usersSnapshot = await db.collection('users').get();
        document.getElementById('totalUsers').textContent = usersSnapshot.size;

        
        const statsContainer = document.getElementById('categoryStats');
        if (categoryStats.length > 0) {
            statsContainer.innerHTML = '<h2>Questions per Category</h2>';
            categoryStats.forEach(stat => {
                const item = document.createElement('div');
                item.className = 'category-stat-item';
                item.innerHTML = `
                    <span class="category-stat-name">${stat.name}</span>
                    <span class="category-stat-count">${stat.count}</span>
                `;
                statsContainer.appendChild(item);
            });
        }

    } catch (error) {
        console.error('Error loading statistics:', error);
        showToast('Failed to load statistics', 'error');
    }
}

// ===== UTILITY FUNCTIONS =====

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    toastMessage.textContent = message;
    toast.className = `toast show ${type}`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}


window.editCategory = editCategory;
window.deleteCategory = deleteCategory;
window.editQuestion = editQuestion;
window.deleteQuestion = deleteQuestion;
