// course.js
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 3,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 3,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 3,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: ['C#'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 3,
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 3,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

const courseContainer = document.getElementById('course-container');
const filterButtons = document.querySelectorAll('.filter-button');
const totalCreditsDisplay = document.getElementById('total-credits');

function renderCourses(courseList) {
    courseContainer.innerHTML = '';

    courseList.forEach(course => {
        const courseCard = document.createElement('article');
        courseCard.className = 'course-card';

        // Style differently if completed
        if (course.completed) {
            courseCard.classList.add('completed');
        }

        courseCard.innerHTML = `
      <h3>${course.subject} ${course.number}: ${course.title}</h3>
      <p><strong>Credits:</strong> ${course.credits}</p>
      <p><strong>Description:</strong> ${course.description}</p>
      <p><strong>Technology:</strong> ${course.technology.join(', ')}</p>
      <p><strong>Status:</strong> ${course.completed ? 'Completed' : 'Not Completed'}</p>
    `;

        courseContainer.appendChild(courseCard);
    });

    const totalCredits = courseList.reduce((sum, c) => sum + c.credits, 0);
    totalCreditsDisplay.textContent = `Total Credits: ${totalCredits}`;
}

function filterCourses(subject) {
    if (subject === 'all') {
        renderCourses(courses);
    } else {
        const filtered = courses.filter(course => course.subject === subject);
        renderCourses(filtered);
    }
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');
        filterCourses(filter);
    });
});

// Initial render
renderCourses(courses);
