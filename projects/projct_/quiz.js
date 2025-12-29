// quiz section

// Map categories to Open Trivia Database API IDs
const categoryMapping = {
    'general': { id: 9, name: 'General Knowledge' },
    'science': { id: 17, name: 'Science & Nature' },
    'technology': { id: 18, name: 'Computers' },
    'sports': { id: 21, name: 'Sports' },
    'history': { id: 23, name: 'History' },
    'geography': { id: 22, name: 'Geography' },
    'movies': { id: 11, name: 'Movies' },
    'music': { id: 12, name: 'Music' },
    'books': { id: 10, name: 'Books' },
    'animals': { id: 27, name: 'Animals' }
};

// Backup questions 
const quizData = {
    general: [
        {
            question: "What is the capital of France?",
            options: ["London", "Berlin", "Paris", "Madrid"],
            correct: 2
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            correct: 1
        },
        {
            question: "Who painted the Mona Lisa?",
            options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
            correct: 2
        },
        {
            question: "What is the largest ocean on Earth?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correct: 3
        },
        {
            question: "In which year did World War II end?",
            options: ["1943", "1944", "1945", "1946"],
            correct: 2
        },
        {
            question: "What is the smallest country in the world?",
            options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
            correct: 1
        },
        {
            question: "Who wrote 'Romeo and Juliet'?",
            options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
            correct: 1
        },
        {
            question: "What is the tallest mountain in the world?",
            options: ["K2", "Kangchenjunga", "Mount Everest", "Lhotse"],
            correct: 2
        },
        {
            question: "Which country is famous for the Taj Mahal?",
            options: ["Pakistan", "India", "Bangladesh", "Nepal"],
            correct: 1
        },
        {
            question: "What is the chemical symbol for gold?",
            options: ["Go", "Gd", "Au", "Ag"],
            correct: 2
        }
    ],
    science: [
        {
            question: "What is the speed of light in vacuum?",
            options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
            correct: 0
        },
        {
            question: "What is the powerhouse of the cell?",
            options: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"],
            correct: 2
        },
        {
            question: "What is the chemical formula for water?",
            options: ["H2O", "CO2", "O2", "H2O2"],
            correct: 0
        },
        {
            question: "What is the atomic number of carbon?",
            options: ["4", "6", "8", "12"],
            correct: 1
        },
        {
            question: "What is the study of living organisms called?",
            options: ["Geology", "Biology", "Astronomy", "Chemistry"],
            correct: 1
        },
        {
            question: "What is the smallest unit of life?",
            options: ["Atom", "Molecule", "Cell", "Tissue"],
            correct: 2
        },
        {
            question: "What gas do plants absorb from the atmosphere?",
            options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
            correct: 2
        },
        {
            question: "What is the boiling point of water at sea level?",
            options: ["90°C", "100°C", "110°C", "120°C"],
            correct: 1
        },
        {
            question: "What is DNA short for?",
            options: ["Deoxyribonucleic Acid", "Dinitrogen Acid", "Dioxin Acid", "Denatured Acid"],
            correct: 0
        },
        {
            question: "What force keeps planets in orbit around the sun?",
            options: ["Magnetism", "Friction", "Gravity", "Inertia"],
            correct: 2
        }
    ],
    technology: [
        {
            question: "Who is known as the father of computers?",
            options: ["Steve Jobs", "Bill Gates", "Charles Babbage", "Alan Turing"],
            correct: 2
        },
        {
            question: "What does HTML stand for?",
            options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
            correct: 0
        },
        {
            question: "What does CPU stand for?",
            options: ["Central Processing Unit", "Computer Personal Unit", "Central Processor Utility", "Computer Processing Unit"],
            correct: 0
        },
        {
            question: "What year was the first iPhone released?",
            options: ["2005", "2006", "2007", "2008"],
            correct: 2
        },
        {
            question: "What does AI stand for?",
            options: ["Automated Intelligence", "Artificial Intelligence", "Advanced Interface", "Automated Interface"],
            correct: 1
        },
        {
            question: "What programming language is known as the 'language of the web'?",
            options: ["Python", "Java", "JavaScript", "C++"],
            correct: 2
        },
        {
            question: "What does USB stand for?",
            options: ["Universal Serial Bus", "United System Bus", "Universal System Browser", "United Serial Browser"],
            correct: 0
        },
        {
            question: "Who founded Microsoft?",
            options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Elon Musk"],
            correct: 1
        },
        {
            question: "What is the most popular programming language in 2023?",
            options: ["Java", "C++", "Python", "Ruby"],
            correct: 2
        },
        {
            question: "What does RAM stand for?",
            options: ["Random Access Memory", "Read Access Memory", "Rapid Access Memory", "Remote Access Memory"],
            correct: 0
        }
    ],
    sports: [
        {
            question: "How many players are on a soccer team on the field?",
            options: ["9", "10", "11", "12"],
            correct: 2
        },
        {
            question: "In which sport would you perform a slam dunk?",
            options: ["Soccer", "Basketball", "Tennis", "Volleyball"],
            correct: 1
        },
        {
            question: "How many Grand Slam tournaments are there in tennis?",
            options: ["3", "4", "5", "6"],
            correct: 1
        },
        {
            question: "What is the national sport of Japan?",
            options: ["Karate", "Judo", "Sumo Wrestling", "Kendo"],
            correct: 2
        },
        {
            question: "How many rings are on the Olympic flag?",
            options: ["4", "5", "6", "7"],
            correct: 1
        },
        {
            question: "In which country were the first modern Olympics held?",
            options: ["Italy", "France", "Greece", "England"],
            correct: 2
        },
        {
            question: "What is the diameter of a basketball hoop in inches?",
            options: ["16", "18", "20", "22"],
            correct: 1
        },
        {
            question: "How many points is a touchdown worth in American football?",
            options: ["5", "6", "7", "8"],
            correct: 1
        },
        {
            question: "What sport is known as 'The Sport of Kings'?",
            options: ["Polo", "Horse Racing", "Cricket", "Golf"],
            correct: 1
        },
        {
            question: "In which sport would you use a shuttlecock?",
            options: ["Tennis", "Squash", "Badminton", "Table Tennis"],
            correct: 2
        }
    ],
    history: [
        {
            question: "Who was the first President of the United States?",
            options: ["Thomas Jefferson", "George Washington", "John Adams", "Benjamin Franklin"],
            correct: 1
        },
        {
            question: "In which year did World War II end?",
            options: ["1943", "1944", "1945", "1946"],
            correct: 2
        },
        {
            question: "Who built the Great Wall of China?",
            options: ["Ming Dynasty", "Qin Dynasty", "Han Dynasty", "Tang Dynasty"],
            correct: 1
        },
        {
            question: "What year did the Titanic sink?",
            options: ["1910", "1911", "1912", "1913"],
            correct: 2
        },
        {
            question: "Who discovered America?",
            options: ["Vasco da Gama", "Christopher Columbus", "Ferdinand Magellan", "Marco Polo"],
            correct: 1
        },
        {
            question: "What ancient wonder was located in Alexandria?",
            options: ["Colossus", "Lighthouse", "Hanging Gardens", "Pyramids"],
            correct: 1
        },
        {
            question: "Who was the first man on the moon?",
            options: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "John Glenn"],
            correct: 1
        },
        {
            question: "When did the Berlin Wall fall?",
            options: ["1987", "1988", "1989", "1990"],
            correct: 2
        },
        {
            question: "Who was the first woman Prime Minister of the UK?",
            options: ["Theresa May", "Margaret Thatcher", "Elizabeth II", "Indira Gandhi"],
            correct: 1
        },
        {
            question: "What empire built Machu Picchu?",
            options: ["Aztec", "Inca", "Maya", "Olmec"],
            correct: 1
        }
    ],
    geography: [
        {
            question: "What is the capital of Australia?",
            options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
            correct: 2
        },
        {
            question: "Which is the longest river in the world?",
            options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
            correct: 1
        },
        {
            question: "How many continents are there?",
            options: ["5", "6", "7", "8"],
            correct: 2
        },
        {
            question: "What is the smallest country in the world?",
            options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
            correct: 1
        },
        {
            question: "Which desert is the largest in the world?",
            options: ["Sahara", "Arabian", "Gobi", "Antarctic"],
            correct: 0
        },
        {
            question: "What is the tallest mountain in the world?",
            options: ["K2", "Kangchenjunga", "Mount Everest", "Lhotse"],
            correct: 2
        },
        {
            question: "Which ocean is the largest?",
            options: ["Atlantic", "Indian", "Arctic", "Pacific"],
            correct: 3
        },
        {
            question: "What is the capital of Canada?",
            options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
            correct: 2
        },
        {
            question: "How many countries are in Africa?",
            options: ["48", "52", "54", "58"],
            correct: 2
        },
        {
            question: "Which country has the most islands?",
            options: ["Indonesia", "Philippines", "Sweden", "Norway"],
            correct: 2
        }
    ],
    movies: [
        {
            question: "Who directed 'Inception'?",
            options: ["Steven Spielberg", "Christopher Nolan", "James Cameron", "Martin Scorsese"],
            correct: 1
        },
        {
            question: "Which movie won the Oscar for Best Picture in 1994?",
            options: ["Pulp Fiction", "The Shawshank Redemption", "Forrest Gump", "The Lion King"],
            correct: 2
        },
        {
            question: "Who played Iron Man in the Marvel movies?",
            options: ["Chris Evans", "Chris Hemsworth", "Robert Downey Jr.", "Mark Ruffalo"],
            correct: 2
        },
        {
            question: "What is the highest-grossing film of all time?",
            options: ["Titanic", "Avatar", "Avengers: Endgame", "Star Wars"],
            correct: 1
        },
        {
            question: "Who directed 'The Godfather'?",
            options: ["Martin Scorsese", "Francis Ford Coppola", "Brian De Palma", "Steven Spielberg"],
            correct: 1
        },
        {
            question: "In which year was the first 'Star Wars' movie released?",
            options: ["1975", "1977", "1979", "1981"],
            correct: 1
        },
        {
            question: "Who played Jack in 'Titanic'?",
            options: ["Brad Pitt", "Leonardo DiCaprio", "Tom Cruise", "Johnny Depp"],
            correct: 1
        },
        {
            question: "What is the name of the hobbit played by Elijah Wood?",
            options: ["Samwise", "Frodo", "Merry", "Pippin"],
            correct: 1
        },
        {
            question: "Who directed 'Jurassic Park'?",
            options: ["James Cameron", "Steven Spielberg", "George Lucas", "Ridley Scott"],
            correct: 1
        },
        {
            question: "Which movie features the quote 'Here's looking at you, kid'?",
            options: ["Gone with the Wind", "Casablanca", "The Maltese Falcon", "Citizen Kane"],
            correct: 1
        }
    ],
    music: [
        {
            question: "Who is known as the 'King of Pop'?",
            options: ["Elvis Presley", "Michael Jackson", "Prince", "Madonna"],
            correct: 1
        },
        {
            question: "Which band released the album 'Abbey Road'?",
            options: ["The Rolling Stones", "The Beatles", "Pink Floyd", "Led Zeppelin"],
            correct: 1
        },
        {
            question: "Who sang 'Bohemian Rhapsody'?",
            options: ["Queen", "The Who", "AC/DC", "Aerosmith"],
            correct: 0
        },
        {
            question: "What instrument does a pianist play?",
            options: ["Guitar", "Drums", "Piano", "Violin"],
            correct: 2
        },
        {
            question: "Who is the lead singer of U2?",
            options: ["Mick Jagger", "Bono", "Sting", "Freddie Mercury"],
            correct: 1
        },
        {
            question: "Which artist released the album 'Thriller'?",
            options: ["Prince", "Michael Jackson", "Whitney Houston", "Madonna"],
            correct: 1
        },
        {
            question: "What genre is associated with Bob Marley?",
            options: ["Jazz", "Blues", "Reggae", "Rock"],
            correct: 2
        },
        {
            question: "Who sang 'Like a Rolling Stone'?",
            options: ["Bob Dylan", "Bruce Springsteen", "Neil Young", "Leonard Cohen"],
            correct: 0
        },
        {
            question: "Which classical composer was deaf?",
            options: ["Mozart", "Bach", "Beethoven", "Vivaldi"],
            correct: 2
        },
        {
            question: "Who is the lead vocalist of Coldplay?",
            options: ["Chris Martin", "Thom Yorke", "Brandon Flowers", "Alex Turner"],
            correct: 0
        }
    ],
    books: [
        {
            question: "Who wrote '1984'?",
            options: ["Aldous Huxley", "George Orwell", "Ray Bradbury", "Philip K. Dick"],
            correct: 1
        },
        {
            question: "Who wrote 'Pride and Prejudice'?",
            options: ["Emily Brontë", "Charlotte Brontë", "Jane Austen", "Mary Shelley"],
            correct: 2
        },
        {
            question: "What is the first book in the Harry Potter series?",
            options: ["Chamber of Secrets", "Philosopher's Stone", "Prisoner of Azkaban", "Goblet of Fire"],
            correct: 1
        },
        {
            question: "Who wrote 'The Great Gatsby'?",
            options: ["Ernest Hemingway", "F. Scott Fitzgerald", "John Steinbeck", "William Faulkner"],
            correct: 1
        },
        {
            question: "Who wrote 'To Kill a Mockingbird'?",
            options: ["Harper Lee", "Toni Morrison", "Maya Angelou", "Alice Walker"],
            correct: 0
        },
        {
            question: "What is the name of Sherlock Holmes' assistant?",
            options: ["Watson", "Moriarty", "Lestrade", "Mycroft"],
            correct: 0
        },
        {
            question: "Who wrote 'The Lord of the Rings'?",
            options: ["C.S. Lewis", "J.R.R. Tolkien", "George R.R. Martin", "Terry Pratchett"],
            correct: 1
        },
        {
            question: "In which book would you find the character Atticus Finch?",
            options: ["The Catcher in the Rye", "To Kill a Mockingbird", "Of Mice and Men", "The Grapes of Wrath"],
            correct: 1
        },
        {
            question: "Who wrote 'Moby Dick'?",
            options: ["Mark Twain", "Herman Melville", "Nathaniel Hawthorne", "Edgar Allan Poe"],
            correct: 1
        },
        {
            question: "What is the name of the wizarding school in Harry Potter?",
            options: ["Beauxbatons", "Durmstrang", "Hogwarts", "Ilvermorny"],
            correct: 2
        }
    ],
    animals: [
        {
            question: "What is the largest land animal?",
            options: ["Rhino", "Hippo", "Elephant", "Giraffe"],
            correct: 2
        },
        {
            question: "How many legs does a spider have?",
            options: ["6", "8", "10", "12"],
            correct: 1
        },
        {
            question: "What is the fastest land animal?",
            options: ["Lion", "Cheetah", "Leopard", "Gazelle"],
            correct: 1
        },
        {
            question: "Which animal is known as the 'King of the Jungle'?",
            options: ["Tiger", "Lion", "Gorilla", "Elephant"],
            correct: 1
        },
        {
            question: "What do you call a baby kangaroo?",
            options: ["Cub", "Pup", "Joey", "Kit"],
            correct: 2
        },
        {
            question: "Which bird cannot fly?",
            options: ["Eagle", "Penguin", "Sparrow", "Parrot"],
            correct: 1
        },
        {
            question: "How many hearts does an octopus have?",
            options: ["1", "2", "3", "4"],
            correct: 2
        },
        {
            question: "What is the largest species of shark?",
            options: ["Great White", "Tiger Shark", "Whale Shark", "Bull Shark"],
            correct: 2
        },
        {
            question: "Which animal can change its color?",
            options: ["Frog", "Snake", "Chameleon", "Lizard"],
            correct: 2
        },
        {
            question: "What is a group of lions called?",
            options: ["Pack", "Herd", "Pride", "Flock"],
            correct: 2
        }
    ]
};


let currentCategory = '';
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timerInterval;
let quizStartTime;
let totalTimeTaken = 0;
let questions = [];

// Get category from URL
const urlParams = new URLSearchParams(window.location.search);
currentCategory = urlParams.get('category');


auth.onAuthStateChanged((user) => {
    if (!user) {
        window.location.href = 'login.html';
    } else {
        
        db.collection('users').doc(user.uid).get()
            .then((doc) => {
                if (doc.exists && doc.data().avatar) {
                    document.getElementById('userAvatar').src = doc.data().avatar;
                }
            });
        initQuiz();
    }
});


function decodeHTML(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}


function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Fetch questions from Open Trivia Database API
async function fetchQuestionsFromAPI(category) {
    const categoryInfo = categoryMapping[category];
    
    if (!categoryInfo) {
        throw new Error('Invalid category');
    }

    const apiUrl = `https://opentdb.com/api.php?amount=10&category=${categoryInfo.id}&type=multiple`;
    
    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.response_code !== 0) {
            throw new Error('API returned no results or error');
        }
        
        
        const formattedQuestions = data.results.map(q => {
            
            const question = decodeHTML(q.question);
            const correctAnswer = decodeHTML(q.correct_answer);
            const incorrectAnswers = q.incorrect_answers.map(ans => decodeHTML(ans));
            
            
            const allOptions = [correctAnswer, ...incorrectAnswers];
            const shuffledOptions = shuffleArray(allOptions);
            
            
            const correctIndex = shuffledOptions.indexOf(correctAnswer);
            
            return {
                question: question,
                options: shuffledOptions,
                correct: correctIndex
            };
        });
        
        return formattedQuestions;
        
    } catch (error) {
        console.error('API fetch error:', error);
        throw error;
    }
}


function showLoading() {
    const quizContainer = document.querySelector('.quiz-container');
    
    
    let loadingOverlay = document.getElementById('loadingOverlay');
    if (!loadingOverlay) {
        loadingOverlay = document.createElement('div');
        loadingOverlay.id = 'loadingOverlay';
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="loading-content">
                <div class="spinner"></div>
                <p>Loading questions...</p>
            </div>
        `;
        quizContainer.appendChild(loadingOverlay);
    }
    
    loadingOverlay.style.display = 'flex';
}


function hideLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'none';
    }
}

// Show error message
function showError(message) {
    const quizContainer = document.querySelector('.quiz-container');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'quiz-error-message';
    errorDiv.innerHTML = `
        <div class="error-icon">⚠️</div>
        <h2>Oops! Something went wrong</h2>
        <p>${message}</p>
        <div class="error-actions">
            <button class="btn btn-primary" onclick="location.reload()">Try Again</button>
            <button class="btn btn-secondary" onclick="window.location.href='index.html'">Back to Home</button>
        </div>
    `;
    
    quizContainer.innerHTML = '';
    quizContainer.appendChild(errorDiv);
}

// Initialize Quiz
async function initQuiz() {
    if (!currentCategory) {
        window.location.href = 'index.html';
        return;
    }

    
    showLoading();

    try {
        // First, try to fetch from API
        const categoryInfo = categoryMapping[currentCategory];
        
        if (categoryInfo) {
            document.getElementById('categoryName').textContent = categoryInfo.name;
            
            try {
                questions = await fetchQuestionsFromAPI(currentCategory);
                console.log('Questions loaded from API');
            } catch (apiError) {
                console.warn('API fetch failed, trying Firestore...', apiError);
                
                // Fallback to Firestore
                const categoryDoc = await db.collection('categories').doc(currentCategory).get();
                
                if (categoryDoc.exists) {
                    const categoryData = categoryDoc.data();
                    document.getElementById('categoryName').textContent = categoryData.name;
                    
                    const questionsSnapshot = await db.collection('categories')
                        .doc(currentCategory)
                        .collection('questions')
                        .orderBy('order', 'asc')
                        .get();
                    
                    questions = questionsSnapshot.docs.map(doc => doc.data());
                    console.log('Questions loaded from Firestore');
                } else if (quizData[currentCategory]) {
                    // Final fallback to hardcoded data
                    questions = quizData[currentCategory];
                    console.log('Questions loaded from local data');
                } else {
                    throw new Error('No questions available for this category');
                }
            }
        } else {
            
            const categoryDoc = await db.collection('categories').doc(currentCategory).get();
            
            if (categoryDoc.exists) {
                const categoryData = categoryDoc.data();
                document.getElementById('categoryName').textContent = categoryData.name;
                
                const questionsSnapshot = await db.collection('categories')
                    .doc(currentCategory)
                    .collection('questions')
                    .orderBy('order', 'asc')
                    .get();
                
                questions = questionsSnapshot.docs.map(doc => doc.data());
            } else if (quizData[currentCategory]) {
                questions = quizData[currentCategory];
                const categoryNames = {
                    general: 'General Knowledge',
                    science: 'Science',
                    technology: 'Technology',
                    sports: 'Sports'
                };
                document.getElementById('categoryName').textContent = categoryNames[currentCategory];
            } else {
                throw new Error('Category not found');
            }
        }

        if (!questions || questions.length === 0) {
            throw new Error('No questions available for this category');
        }

        hideLoading();
        quizStartTime = Date.now();
        document.getElementById('totalQuestions').textContent = questions.length;
        loadQuestion();
        
    } catch (error) {
        console.error('Error loading quiz:', error);
        hideLoading();
        showError('Failed to load questions. Please try again or choose another category.');
    }
}


function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endQuiz();
        return;
    }

    const question = questions[currentQuestionIndex];
    
    
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    
    
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    document.getElementById('progress').style.width = progress + '%';
    
    
    document.getElementById('question').textContent = question.question;
    
    // Display options
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    
    const letters = ['A', 'B', 'C', 'D'];
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.innerHTML = `
            <span class="option-letter">${letters[index]}</span>
            <span class="option-text">${option}</span>
        `;
        optionDiv.addEventListener('click', () => selectOption(index, optionDiv));
        optionsContainer.appendChild(optionDiv);
    });
    
   
    timeLeft = 15;
    updateTimer();
    startTimer();
    
    
    document.getElementById('nextBtn').disabled = true;
}


function startTimer() {
    clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeout();
        }
    }, 1000);
}


function updateTimer() {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = timeLeft;
    
    
    timerElement.classList.remove('warning', 'danger');
    if (timeLeft <= 5) {
        timerElement.classList.add('danger');
    } else if (timeLeft <= 10) {
        timerElement.classList.add('warning');
    }
}


function handleTimeout() {
    const options = document.querySelectorAll('.option');
    options.forEach((opt, index) => {
        opt.classList.add('disabled');
        if (index === questions[currentQuestionIndex].correct) {
            opt.classList.add('correct');
        }
    });
    
    document.getElementById('nextBtn').disabled = false;
}


function selectOption(index, optionElement) {
    
    if (document.querySelector('.option.correct') || document.querySelector('.option.wrong')) {
        return;
    }
    
    clearInterval(timerInterval);
    
    const question = questions[currentQuestionIndex];
    const options = document.querySelectorAll('.option');
    
    
    options.forEach(opt => opt.classList.add('disabled'));
    
    
    if (index === question.correct) {
        optionElement.classList.add('correct');
        score++;
    } else {
        optionElement.classList.add('wrong');
        
        options[question.correct].classList.add('correct');
    }
    
    
    document.getElementById('nextBtn').disabled = false;
}


document.getElementById('nextBtn').addEventListener('click', () => {
    currentQuestionIndex++;
    loadQuestion();
});

// End Quiz
async function endQuiz() {
    clearInterval(timerInterval);
    
    const endTime = Date.now();
    totalTimeTaken = Math.floor((endTime - quizStartTime) / 1000);
    
    const totalQuestions = questions.length;
    const correctAnswers = score;
    const wrongAnswers = totalQuestions - score;
    const percentage = Math.round((score / totalQuestions) * 100);
    
    
    const results = {
        category: document.getElementById('categoryName').textContent,
        score: score,
        totalQuestions: totalQuestions,
        correctAnswers: correctAnswers,
        wrongAnswers: wrongAnswers,
        percentage: percentage,
        timeTaken: totalTimeTaken
    };
    
    
    sessionStorage.setItem('quizResults', JSON.stringify(results));
    
    
    try {
        const user = auth.currentUser;
        if (user) {
            await db.collection('users')
                .doc(user.uid)
                .collection('results')
                .add({
                    category: results.category,
                    score: results.score,
                    totalQuestions: results.totalQuestions,
                    correctAnswers: results.correctAnswers,
                    wrongAnswers: results.wrongAnswers,
                    percentage: results.percentage,
                    timeTaken: results.timeTaken,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
            console.log('Quiz results saved to Firestore');
        }
    } catch (error) {
        console.error('Error saving quiz results:', error);
        
    }
    
    
    window.location.href = 'result.html';
}
