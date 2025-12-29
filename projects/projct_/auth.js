
const initTheme = () => {
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
    
    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });
};

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', initTheme);

// Avatar Upload Function
async function uploadAvatar(file, uid) {
    try {
        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert('Image size must be less than 2MB');
            throw new Error('Image size must be less than 2MB');
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            throw new Error('Please upload an image file');
        }

        // Create storage reference
        const storageRef = storage.ref(`avatars/${uid}.jpg`);
        
        // Upload file
        await storageRef.put(file);
        
        // Get download URL
        const downloadURL = await storageRef.getDownloadURL();
        
        // Update Firestore
        await db.collection('users').doc(uid).update({
            avatar: downloadURL,
            avatarUpdatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        alert('Avatar uploaded successfully!');
        return downloadURL;
    } catch (error) {
        console.error('Avatar upload error:', error);
        alert('Avatar upload failed: ' + error.message + '\nYou can still use the app without an avatar.');
        // Don't throw - allow app to continue
        return null;
    }
}

// Avatar Preview Handler (for register page)
if (document.getElementById('avatarUpload')) {
    const avatarUpload = document.getElementById('avatarUpload');
    const avatarImg = document.getElementById('avatarImg');
    
    avatarUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                avatarImg.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}

// Login Form Handler
if (document.getElementById('loginForm')) {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('Please enter a valid email address');
            return;
        }

        // Validate password
        if (password.length < 6) {
            showError('Password must be at least 6 characters');
            return;
        }

        // Show loading state
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Logging in...';
        submitBtn.disabled = true;

        try {
            // Sign in with Firebase
            await auth.signInWithEmailAndPassword(email, password);
            
            // Redirect to home page
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Login error:', error);
            
            // Handle specific error codes
            let message = 'Login failed. Please try again.';
            switch (error.code) {
                case 'auth/user-not-found':
                    message = 'No account found with this email.';
                    break;
                case 'auth/wrong-password':
                    message = 'Incorrect password. Please try again.';
                    break;
                case 'auth/invalid-email':
                    message = 'Invalid email address.';
                    break;
                case 'auth/user-disabled':
                    message = 'This account has been disabled.';
                    break;
                case 'auth/too-many-requests':
                    message = 'Too many failed attempts. Please try again later.';
                    break;
            }
            
            showError(message);
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.add('show');
        errorMessage.style.display = 'block';
        
        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 5000);
    }
}

// Register Form Handler
if (document.getElementById('registerForm')) {
    const registerForm = document.getElementById('registerForm');
    const errorMessage = document.getElementById('errorMessage');

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validate name
        if (name.length < 2) {
            showError('Name must be at least 2 characters');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('Please enter a valid email address');
            return;
        }

        // Validate password
        if (password.length < 6) {
            showError('Password must be at least 6 characters');
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            showError('Passwords do not match');
            return;
        }

        // Show loading state
        const submitBtn = registerForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Creating account...';
        submitBtn.disabled = true;

        try {
            // Create user with Firebase Auth
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Prepare user data
            const userData = {
                name: name,
                email: email,
                uid: user.uid,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            // Upload avatar if selected
            const avatarFile = document.getElementById('avatarUpload').files[0];
            if (avatarFile) {
                try {
                    const avatarURL = await uploadAvatar(avatarFile, user.uid);
                    userData.avatar = avatarURL;
                } catch (avatarError) {
                    console.error('Avatar upload failed:', avatarError);
                    // Continue without avatar
                }
            }

            // Save user data to Firestore
            await db.collection('users').doc(user.uid).set(userData);

            // Update display name
            await user.updateProfile({
                displayName: name
            });

            // Redirect to home page
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Registration error:', error);
            
            // Handle specific error codes
            let message = 'Registration failed. Please try again.';
            switch (error.code) {
                case 'auth/email-already-in-use':
                    message = 'This email is already registered. Please login instead.';
                    break;
                case 'auth/invalid-email':
                    message = 'Invalid email address.';
                    break;
                case 'auth/weak-password':
                    message = 'Password is too weak. Use a stronger password.';
                    break;
                case 'auth/operation-not-allowed':
                    message = 'Registration is currently disabled.';
                    break;
            }
            
            showError(message);
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.add('show');
        errorMessage.style.display = 'block';
        
        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 5000);
    }
}

// Password reset form
if (document.getElementById('forgotPasswordForm')) {
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');

    forgotPasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showForgotPasswordError('Please enter a valid email address');
            return;
        }

        const submitBtn = forgotPasswordForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            await auth.sendPasswordResetEmail(email);
            showForgotPasswordSuccess('Password reset link sent to your email. Check your inbox!');
            forgotPasswordForm.reset();
            
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 3000);
            
        } catch (error) {
            console.error('Password reset error:', error);
            
            let message = 'Failed to send reset email. Please try again.';
            switch (error.code) {
                case 'auth/user-not-found':
                    message = 'No account found with this email address.';
                    break;
                case 'auth/invalid-email':
                    message = 'Invalid email address format.';
                    break;
                case 'auth/too-many-requests':
                    message = 'Too many requests. Please try again later.';
                    break;
                case 'auth/network-request-failed':
                    message = 'Network error. Please check your connection.';
                    break;
            }
            
            showForgotPasswordError(message);
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });

    function showForgotPasswordError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.add('show');
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
        
        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 5000);
    }

    function showForgotPasswordSuccess(message) {
        successMessage.textContent = message;
        successMessage.classList.add('show');
        successMessage.style.display = 'block';
        errorMessage.style.display = 'none';
    }
}

// Redirect logged-in users away from auth pages
auth.onAuthStateChanged((user) => {
    const isAuthPage = window.location.pathname.includes('login.html') || 
                       window.location.pathname.includes('register.html');
    
    if (user && isAuthPage) {
        window.location.href = 'index.html';
    }
});
