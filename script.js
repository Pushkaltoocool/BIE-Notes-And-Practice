document.addEventListener('DOMContentLoaded', () => {
    // --- Dark Mode Toggle ---
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }

    darkModeToggle.addEventListener('change', () => {
        if (darkModeToggle.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });

    // --- Section Navigation ---
    const navButtons = document.querySelectorAll('.nav-button');
    const contentSections = document.querySelectorAll('.content-section');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and hide all sections
            navButtons.forEach(btn => btn.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));

            // Add active class to clicked button and show target section
            button.classList.add('active');
            const targetSectionId = button.dataset.target;
            document.getElementById(targetSectionId).classList.add('active');

            // If navigating to quiz section, reset and show settings
            if (targetSectionId === 'quiz-section') {
                resetQuiz(); // Ensure quiz settings are visible and ready
                // Also ensure the quiz settings are shown
                quizSettings.style.display = 'block';
            } else {
                clearInterval(timerInterval); // Stop timer if switching away
                timerDisplay.style.display = 'none'; // Hide timer display
                document.getElementById('saved-answers-container').style.display = 'none'; // Hide saved section
            }
        });
    });

    // --- Notes Section Collapsible Cards ---
    const collapsibleCards = document.querySelectorAll('.collapsible-card');

    collapsibleCards.forEach(card => {
        const header = card.querySelector('.card-header');
        header.addEventListener('click', () => {
            card.classList.toggle('open');
        });
    });

// --- Quiz Questions Data ---
const quizQuestions = [
    {
        question: "According to the slides, what are the three core characteristics of a business?",
        type: "mcq",
        options: [
            "Innovation, Marketing, Technology",
            "Profit-Seeking, Organised Effort, Satisfy a Need",
            "B2B, B2C, B2G",
            "Planning, Analysis, Design"
        ],
        correct: ["Profit-Seeking, Organised Effort, Satisfy a Need"],
        topic: "Digital Transformation"
    },
    {
        question: "A company sells its software directly to other businesses. What type of business-customer relationship is this?",
        type: "mcq",
        options: [
            "B2C",
            "B2G",
            "B2B",
            "C2C"
        ],
        correct: ["B2B"],
        topic: "Digital Transformation"
    },
    {
        question: "Netflix and Spotify primarily use which digital business model?",
        type: "mcq",
        options: [
            "Freemium",
            "Brokerage",
            "Advertising",
            "Subscription"
        ],
        correct: ["Subscription"],
        topic: "Digital Transformation"
    },
    {
        question: "The “razor-razorblade” model involves selling a core product at a low margin and related consumables at a high margin. Which of the following is an example of this?",
        type: "mcq",
        options: [
            "McDonald’s selling franchise rights",
            "A company selling printers and expensive ink cartridges",
            "Google providing free search and selling ads",
            "An airline selling cheap tickets and charging for extras"
        ],
        correct: ["A company selling printers and expensive ink cartridges"],
        topic: "Digital Transformation"
    },
    {
        question: "What is the primary goal of Digital Transformation as defined by McKinsey & Company?",
        type: "mcq",
        options: [
            "To increase the IT department’s budget",
            "To build a competitive advantage by improving customer experience and lowering costs",
            "To replace all manual processes with automated ones",
            "To have a strong social media presence"
        ],
        correct: ["To build a competitive advantage by improving customer experience and lowering costs"],
        topic: "Digital Transformation"
    },
    {
        question: "Which phase of the SDLC involves understanding and documenting the business needs for a new system?",
        type: "mcq",
        options: [
            "Planning",
            "Design",
            "Analysis",
            "Implementation"
        ],
        correct: ["Analysis"],
        topic: "Software Development Process & Methodologies"
    },
    {
        question: "The Waterfall methodology is most suitable for which type of project?",
        type: "mcq",
        options: [
            "A long-term project with constantly changing requirements",
            "A project where working software is needed very early",
            "A short project where requirements are clear and fixed",
            "A project that requires heavy customer collaboration throughout"
        ],
        correct: ["A short project where requirements are clear and fixed"],
        topic: "Software Development Process & Methodologies"
    },
    {
        question: "Which of the following is NOT a core value of the Agile Manifesto?",
        type: "mcq",
        options: [
            "Individuals and interactions over processes and tools",
            "Comprehensive documentation over working software",
            "Customer collaboration over contract negotiation",
            "Responding to change over following a plan"
        ],
        correct: ["Comprehensive documentation over working software"],
        topic: "Software Development Process & Methodologies"
    },
    {
        question: "“The system shall allow users to log in with a username and password.” This is an example of what?",
        type: "mcq",
        options: [
            "A non-functional requirement",
            "A functional requirement",
            "A business constraint",
            "A project scope"
        ],
        correct: ["A functional requirement"],
        topic: "Software Development Process & Methodologies"
    },
    {
        question: "“The system must be able to handle 1000 concurrent users and respond to queries within 2 seconds.” This is an example of what?",
        type: "mcq",
        options: [
            "A non-functional requirement",
            "A functional requirement",
            "A user story",
            "A project deliverable"
        ],
        correct: ["A non-functional requirement"],
        topic: "Software Development Process & Methodologies"
    },
    {
        question: "Which of the following are benefits of the Agile model? (Select all that apply)",
        type: "multi-select",
        options: [
            "Process and results are always well-documented.",
            "The development team is very responsive to changing requirements.",
            "Customers get a look and feel of the project progress at the end of each sprint.",
            "It has low amounts of risk and uncertainty."
        ],
        correct: ["The development team is very responsive to changing requirements.", "Customers get a look and feel of the project progress at the end of each sprint."],
        topic: "Software Development Process & Methodologies"
    },
    {
        question: "Which technique for requirement gathering is described as being economical for large groups and supporting distributed geographical locations?",
        type: "mcq",
        options: [
            "Interviews",
            "Observation",
            "Prototyping",
            "Questionnaires"
        ],
        correct: ["Questionnaires"],
        topic: "Software Development Process & Methodologies"
    },
    {
        question: "What is the primary focus of the “Empathize” stage in Design Thinking?",
        type: "mcq",
        options: [
            "Generating as many ideas as possible",
            "Building a low-cost version of the product",
            "Understanding the users, their needs, and their problems",
            "Defining a clear problem statement"
        ],
        correct: ["Understanding the users, their needs, and their problems"],
        topic: "Design Thinking - Empathy"
    },
    {
        question: "A fictional character created from research to represent a target user group is called a:",
        type: "mcq",
        options: [
            "Stakeholder",
            "Persona",
            "User Story",
            "Client"
        ],
        correct: ["Persona"],
        topic: "Design Thinking - Empathy"
    },
    {
        question: "The statement: “A busy university student needs a way to find cheap and convenient exercise options because they want to lead a healthy lifestyle while saving money for overseas trips” is an example of a:",
        type: "mcq",
        options: [
            "How Might We Question",
            "Journey Map",
            "Point of View (POV)",
            "Prototype"
        ],
        correct: ["Point of View (POV)"],
        topic: "Design Thinking - Define & Ideate"
    },
    {
        question: "In the “Ideate” stage, the SCAMPER technique is used to:",
        type: "mcq",
        options: [
            "Test prototypes with users",
            "Create a visual map of the user’s experience",
            "Enhance or modify existing ideas using specific prompts",
            "Prioritize which features to build first"
        ],
        correct: ["Enhance or modify existing ideas using specific prompts"],
        topic: "Design Thinking - Define & Ideate"
    },
    {
        question: "Which of the Six Thinking Hats is focused on facts, data, and identifying existing information?",
        type: "mcq",
        options: [
            "Red Hat (Emotions)",
            "Black Hat (Cautions)",
            "Yellow Hat (Benefits)",
            "White Hat (Facts/Data)"
        ],
        correct: ["White Hat (Facts/Data)"],
        topic: "Design Thinking - Define & Ideate"
    },
    {
        question: "What is the main purpose of building a prototype?",
        type: "mcq",
        options: [
            "To have a final, polished product to sell",
            "To get ideas out of your head and into the physical world for testing and feedback",
            "To create comprehensive documentation for developers",
            "To secure funding from investors"
        ],
        correct: ["To get ideas out of your head and into the physical world for testing and feedback"],
        topic: "Design Thinking - Prototype & Test"
    },
    {
        question: "A paper sketch of a mobile app’s main screens is an example of what type of prototype?",
        type: "mcq",
        options: [
            "High-Fidelity",
            "Mid-Fidelity",
            "Low-Fidelity",
            "Final-Fidelity"
        ],
        correct: ["Low-Fidelity"],
        topic: "Design Thinking - Prototype & Test"
    },
    {
        question: "A team is observing a user test and uses a 2x2 grid to organize feedback into “Likes,” “Criticism,” “Questions,” and “Ideas.” What is this tool called?",
        type: "mcq",
        options: [
            "SWOT Analysis",
            "Empathy Map",
            "Feedback Grid",
            "Creative Matrix"
        ],
        correct: ["Feedback Grid"],
        topic: "Design Thinking - Prototype & Test"
    },
    {
        question: "What are the key stages of the Design Thinking process in the correct order?",
        type: "mcq",
        options: [
            "Ideate, Prototype, Empathize, Define, Test",
            "Empathize, Define, Ideate, Prototype, Test",
            "Define, Ideate, Test, Empathize, Prototype",
            "Plan, Design, Build, Test, Deploy"
        ],
        correct: ["Empathize, Define, Ideate, Prototype, Test"],
        topic: "Design Thinking - General"
    },
    {
        question: "Divergent and Convergent thinking is a key concept in Design Thinking. When is divergent thinking primarily used?",
        type: "mcq",
        options: [
            "During the “Test” phase to narrow down feedback",
            "During the “Ideate” phase to generate a wide range of solutions",
            "During the “Define” phase to create a single problem statement",
            "During the “Prototype” phase to build one perfect model"
        ],
        correct: ["During the “Ideate” phase to generate a wide range of solutions"],
        topic: "Design Thinking - Define & Ideate"
    },
    {
        question: "Which of the following activities are part of the “Empathize” stage? (Select all that apply)",
        type: "multi-select",
        options: [
            "Engaging with users through interviews",
            "Immersing yourself in the user’s environment",
            "Observing user behavior",
            "Brainstorming solutions"
        ],
        correct: ["Engaging with users through interviews", "Immersing yourself in the user’s environment", "Observing user behavior"],
        topic: "Design Thinking - Empathy"
    },
    {
        question: "In an empathy interview, what is the best way to ask about a user’s experience with a feature?",
        type: "mcq",
        options: [
            "“Do you like this feature?”",
            "“Tell me about the last time you used this feature.”",
            "“Wouldn’t you agree that this feature is very useful?”",
            "“What frustrations do you have with this feature?”"
        ],
        correct: ["“Tell me about the last time you used this feature.”"],
        topic: "Practical Skills"
    },
    {
        question: "You need to send a project update to your manager for their information, but the primary action is required from your team member, Alex. Who should be in the ‘To’ and ‘Cc’ fields?",
        type: "mcq",
        options: [
            "To: Manager, Cc: Alex",
            "To: Alex and Manager",
            "To: Alex, Cc: Manager",
            "To: Alex, Bcc: Manager"
        ],
        correct: ["To: Alex, Cc: Manager"],
        topic: "Practical Skills"
    },
    {
        question: "Which of the following is a best practice for an email subject line?",
        type: "mcq",
        options: [
            "Writing it in ALL CAPS to get attention",
            "Keeping it vague to encourage the person to open it",
            "Making it short, informative, and including a tag like [For Action] if needed",
            "Leaving it blank"
        ],
        correct: ["Making it short, informative, and including a tag like [For Action] if needed"],
        topic: "Practical Skills"
    },
    {
        question: "When conducting an empathy interview, restating what the speaker said in your own words (“So, it sounds like you’re experiencing…”) is a technique called:",
        type: "mcq",
        options: [
            "Probing",
            "Storytelling",
            "Paraphrasing",
            "Summarizing"
        ],
        correct: ["Paraphrasing"],
        topic: "Practical Skills"
    },
    {
        question: "Which of the following questions is the most NEUTRAL?",
        type: "mcq",
        options: [
            "“What do you find so frustrating about the new policy?”",
            "“Don’t you think the new system is an improvement?”",
            "“What are your thoughts on the new system?”",
            "“Why is everyone having so much trouble with the login page?”"
        ],
        correct: ["“What are your thoughts on the new system?”"],
        topic: "Practical Skills"
    },
    {
        question: "In an email, where should the most essential information be placed?",
        type: "mcq",
        options: [
            "In the last paragraph",
            "In the first paragraph",
            "Spread throughout the email",
            "In the subject line only"
        ],
        correct: ["In the first paragraph"],
        topic: "Practical Skills"
    },
    {
        question: "According to the slides, what are the components of an email? (Select all that apply)",
        type: "multi-select",
        options: [
            "Subject Line",
            "Greeting/Opening",
            "Body",
            "Closing",
            "Attachments"
        ],
        correct: ["Subject Line", "Greeting/Opening", "Body", "Closing"],
        topic: "Practical Skills"
    },
    // New 70 Questions
    {
        question: "Which digital business model involves earning revenue by promoting another company's products and receiving a commission?",
        type: "mcq",
        options: [
            "Subscription",
            "Freemium",
            "Affiliate",
            "Brokerage"
        ],
        correct: ["Affiliate"],
        topic: "Digital Transformation"
    },
    {
        question: "A company like Amazon that connects buyers and sellers while also selling its own products operates under which business model?",
        type: "mcq",
        options: [
            "Franchise",
            "Brokerage",
            "Subscription",
            "Bricks-and-Clicks"
        ],
        correct: ["Brokerage"],
        topic: "Digital Transformation"
    },
    {
        question: "What is a key challenge organizations face during digital transformation?",
        type: "mcq",
        options: [
            "Eliminating all physical stores",
            "Overcoming resistance to change within the organization",
            "Increasing the number of employees",
            "Focusing solely on traditional marketing"
        ],
        correct: ["Overcoming resistance to change within the organization"],
        topic: "Digital Transformation"
    },
    {
        question: "Which of the following is an example of a B2C business model?",
        type: "mcq",
        options: [
            "A software company selling licenses to another business",
            "A retailer selling clothes directly to customers online",
            "A manufacturer supplying parts to a car company",
            "A consultancy providing services to a government agency"
        ],
        correct: ["A retailer selling clothes directly to customers online"],
        topic: "Digital Transformation"
    },
    {
        question: "The DBS case study emphasized which approach to foster innovation during digital transformation?",
        type: "mcq",
        options: [
            "Strict adherence to traditional banking processes",
            "Adopting a start-up mindset to attract tech talent",
            "Focusing only on cost reduction",
            "Avoiding customer feedback"
        ],
        correct: ["Adopting a start-up mindset to attract tech talent"],
        topic: "Digital Transformation"
    },
    {
        question: "Which of the following are examples of digital business models? (Select all that apply)",
        type: "multi-select",
        options: [
            "Franchise",
            "Subscription",
            "Crowdsourcing",
            "Direct Sales",
            "Brokerage"
        ],
        correct: ["Subscription", "Crowdsourcing", "Brokerage"],
        topic: "Digital Transformation"
    },
    {
        question: "What are key components of a successful digital transformation strategy? (Select all that apply)",
        type: "multi-select",
        options: [
            "Investing in new technologies",
            "Focusing only on marketing",
            "Upskilling employees",
            "Redesigning customer experiences",
            "Maintaining outdated systems"
        ],
        correct: ["Investing in new technologies", "Upskilling employees", "Redesigning customer experiences"],
        topic: "Digital Transformation"
    },
    {
        question: "In the SDLC, which phase involves creating the actual code for the system?",
        type: "mcq",
        options: [
            "Analysis",
            "Design",
            "Implementation",
            "Testing"
        ],
        correct: ["Implementation"],
        topic: "Software Development Process & Methodologies"
    },
    {
        question: "What is a key advantage of the Waterfall model?",
        type: "mcq",
        options: [
            "High flexibility for changing requirements",
            "Clear structure with defined phases and deliverables",
            "Frequent delivery of working software",
            "Minimal documentation requirements"
        ],
        correct: ["Clear structure with defined phases and deliverables"],
        topic: "Software Development Process & Methodologies"
    },
    {
        question: "In Agile, what is the term for a short, fixed period during which a team completes a set amount of work?",
        type: "mcq",
        options: [
            "Iteration",
            "Sprint",
            "Phase",
            "Cycle"
        ],
        correct: ["Sprint"],
        topic: "Software Development Process & Methodologies"
    },
    {
        question: "Which Agile framework emphasizes a prioritized list of tasks called a Product Backlog?",
        type: "mcq",
        options: [
            "Kanban",
            "Scrum",
            "Lean",
            "XP (Extreme Programming)"
        ],
        correct: ["Scrum"],
        topic: "Software Development Process & Methodologies"
    },
    {
        question: "What is the purpose of a 'Daily Standup' in Agile methodologies?",
        type: "mcq",
        options: [
            "To document all requirements",
            "To allow team members to share progress and address blockers",
            "To create a detailed project plan",
            "To conduct user testing"
        ],
        correct: ["To allow team members to share progress and address blockers"],
        topic: "Software Development Process & Methodologies"
    },
    {
        question: "Which of the following are Agile principles? (Select all that apply)",
        type: "multi-select",
        options: [
            "Deliver working software frequently",
            "Follow a fixed plan regardless of new information",
            "Welcome changing requirements, even late in development",
            "Prioritize comprehensive documentation over working software",
            "Promote sustainable development"
        ],
        correct: ["Deliver working software frequently", "Welcome changing requirements, even late in development", "Promote sustainable development"],
        topic: "Software Development Process & Methodologies"
    },
    {
        question: "Which activities are typically performed during the Testing phase of the SDLC? (Select all that apply)",
        type: "multi-select",
        options: [
            "Writing code",
            "Verifying that the system meets requirements",
            "Identifying defects in the system",
            "Creating a project schedule",
            "Conducting user acceptance testing"
        ],
        correct: ["Verifying that the system meets requirements", "Identifying defects in the system", "Conducting user acceptance testing"],
        topic: "Software Development Process & Methodologies"
    },
    {
        question: "What is a key limitation of the Agile methodology?",
        type: "mcq",
        options: [
            "It requires excessive documentation",
            "It may lack predictability for long-term planning",
            "It is only suitable for large organizations",
            "It eliminates the need for testing"
        ],
        correct: ["It may lack predictability for long-term planning"],
        topic: "Software Development Process & Methodologies"
    },
    {
        question: "In the context of Design Thinking, what is the purpose of a Customer Journey Map?",
        type: "mcq",
        options: [
            "To define the technical architecture of a solution",
            "To visualize a user’s experience and identify pain points",
            "To list all possible features of a product",
            "To create a final prototype"
        ],
        correct: ["To visualize a user’s experience and identify pain points"],
        topic: "Design Thinking - Empathy"
    },
    {
        question: "Which Design Thinking tool helps to organize insights about what a user says, thinks, does, and feels?",
        type: "mcq",
        options: [
            "Persona",
            "Empathy Map",
            "Customer Journey Map",
            "SWOT Analysis"
        ],
        correct: ["Empathy Map"],
        topic: "Design Thinking - Empathy"
    },
    {
        question: "In the 'Define' stage, what is the goal of creating a Point of View (POV) statement?",
        type: "mcq",
        options: [
            "To finalize the project budget",
            "To craft an actionable problem statement based on user insights",
            "To generate a list of all possible solutions",
            "To create a high-fidelity prototype"
        ],
        correct: ["To craft an actionable problem statement based on user insights"],
        topic: "Design Thinking - Define & Ideate"
    },
    {
        question: "What does the '5 Whys' technique aim to achieve in Design Thinking?",
        type: "mcq",
        options: [
            "Generate five different solutions",
            "Identify the root cause of a problem",
            "Create a detailed project timeline",
            "Prioritize features for development"
        ],
        correct: ["Identify the root cause of a problem"],
        topic: "Design Thinking - Define & Ideate"
    },
    {
        question: "Which of the following are components of a well-formed POV statement? (Select all that apply)",
        type: "multi-select",
        options: [
            "User",
            "Need",
            "Insight",
            "Budget",
            "Timeline"
        ],
        correct: ["User", "Need", "Insight"],
        topic: "Design Thinking - Define & Ideate"
    },
    {
        question: "What is the purpose of the 'Ideate' stage in Design Thinking?",
        type: "mcq",
        options: [
            "To test prototypes with users",
            "To generate a large number of diverse ideas",
            "To finalize the product design",
            "To document user requirements"
        ],
        correct: ["To generate a large number of diverse ideas"],
        topic: "Design Thinking - Define & Ideate"
    },
    {
        question: "In the SCAMPER technique, what does the 'C' stand for?",
        type: "mcq",
        options: [
            "Create",
            "Combine",
            "Collaborate",
            "Criticize"
        ],
        correct: ["Combine"],
        topic: "Design Thinking - Define & Ideate"
    },
    {
        question: "Which ideation technique encourages thinking about how to make a problem worse to find innovative solutions?",
        type: "mcq",
        options: [
            "Brainstorming",
            "Reverse Thinking",
            "Six Thinking Hats",
            "Mind Mapping"
        ],
        correct: ["Reverse Thinking"],
        topic: "Design Thinking - Define & Ideate"
    },
    {
        question: "What is a key characteristic of a high-fidelity prototype?",
        type: "mcq",
        options: [
            "It is a rough sketch created quickly",
            "It closely resembles the final product in functionality and appearance",
            "It is used only for initial ideation",
            "It is always made of paper"
        ],
        correct: ["It closely resembles the final product in functionality and appearance"],
        topic: "Design Thinking - Prototype & Test"
    },
    {
        question: "In usability testing, what is the role of the Moderator?",
        type: "mcq",
        options: [
            "To act as the user and perform tasks",
            "To guide the session and ask questions",
            "To take notes and observe silently",
            "To develop the prototype"
        ],
        correct: ["To guide the session and ask questions"],
        topic: "Design Thinking - Prototype & Test"
    },
    {
        question: "What is the primary benefit of iteration in Design Thinking?",
        type: "mcq",
        options: [
            "It ensures the first prototype is perfect",
            "It allows continuous improvement based on user feedback",
            "It eliminates the need for user testing",
            "It reduces the project timeline"
        ],
        correct: ["It allows continuous improvement based on user feedback"],
        topic: "Design Thinking - Prototype & Test"
    },
    {
        question: "Which of the following are purposes of prototyping in Design Thinking? (Select all that apply)",
        type: "multi-select",
        options: [
            "To test ideas with users",
            "To finalize the marketing strategy",
            "To identify flaws early",
            "To gather feedback for iteration",
            "To create a complete product"
        ],
        correct: ["To test ideas with users", "To identify flaws early", "To gather feedback for iteration"],
        topic: "Design Thinking - Prototype & Test"
    },
    {
        question: "What is a key principle of the Design Thinking mindset?",
        type: "mcq",
        options: [
            "Following a rigid plan",
            "Being human-centric",
            "Avoiding user feedback",
            "Focusing only on aesthetics"
        ],
        correct: ["Being human-centric"],
        topic: "Design Thinking - General"
    },
    {
        question: "Which of the following are characteristics of a good Design Thinking process? (Select all that apply)",
        type: "multi-select",
        options: [
            "Iterative",
            "Collaborative",
            "Linear and rigid",
            "Experimental",
            "User-focused"
        ],
        correct: ["Iterative", "Collaborative", "Experimental", "User-focused"],
        topic: "Design Thinking - General"
    },
    {
        question: "What does the acronym B2G stand for in business relationships?",
        type: "mcq",
        options: [
            "Business-to-Government",
            "Business-to-Group",
            "Buyer-to-Government",
            "Business-to-Guest"
        ],
        correct: ["Business-to-Government"],
        topic: "Digital Transformation"
    },
    {
        question: "A company that uses crowdsourcing to gather ideas or content from a large group of people is using which digital business model?",
        type: "mcq",
        options: [
            "Freemium",
            "Crowdsourcing",
            "Subscription",
            "Advertising"
        ],
        correct: ["Crowdsourcing"],
        topic: "Digital Transformation"
    },
    {
        question: "Which phase of the SDLC involves ensuring the system continues to function correctly after deployment?",
        type: "mcq",
        options: [
            "Implementation",
            "Testing",
            "Maintenance",
            "Design"
        ],
        correct: ["Maintenance"],
        topic: "Software Development Process & Methodologies"
    },
    {
        question: "In Agile, what is a 'User Story' used for?",
        type: "mcq",
        options: [
            "To document the entire project plan",
            "To describe a feature from the user’s perspective",
            "To create a detailed technical specification",
            "To prioritize marketing tasks"
        ],
        correct: ["To describe a feature from the user’s perspective"],
        topic: "Software Development Process & Methodologies"
    },
    {
        question: "Which of the following are non-functional requirements? (Select all that apply)",
        type: "multi-select",
        options: [
            "The system shall allow users to reset their password",
            "The system shall have 99.9% uptime",
            "The system shall support 500 users simultaneously",
            "The system shall generate monthly reports",
            "The system shall load pages in under 3 seconds"
        ],
        correct: ["The system shall have 99.9% uptime", "The system shall support 500 users simultaneously", "The system shall load pages in under 3 seconds"],
        topic: "Software Development Process & Methodologies"
    },
    {
        question: "What is the purpose of a retrospective in Agile?",
        type: "mcq",
        options: [
            "To plan the next sprint",
            "To reflect on what went well and what can be improved",
            "To create a high-fidelity prototype",
            "To finalize the project budget"
        ],
        correct: ["To reflect on what went well and what can be improved"],
        topic: "Software Development Process & Methodologies"
    },
    {
        question: "Which Design Thinking stage involves narrowing down ideas to focus on the most promising ones?",
        type: "mcq",
        options: [
            "Empathize",
            "Define",
            "Ideate",
            "Test"
        ],
        correct: ["Define"],
        topic: "Design Thinking - Define & Ideate"
    },
    {
        question: "What is the 'MoSCoW' prioritization technique used for in project management?",
        type: "mcq",
        options: [
            "To categorize tasks into Must-have, Should-have, Could-have, and Won’t-have",
            "To create a detailed project timeline",
            "To conduct user interviews",
            "To generate creative ideas"
        ],
        correct: ["To categorize tasks into Must-have, Should-have, Could-have, and Won’t-have"],
        topic: "Practical Skills"
    },
    {
        question: "In an empathy interview, why is it important to avoid leading questions?",
        type: "mcq",
        options: [
            "They make the interview too short",
            "They bias the user’s responses",
            "They are too difficult to answer",
            "They are not allowed in professional settings"
        ],
        correct: ["They bias the user’s responses"],
        topic: "Practical Skills"
    },
    {
        question: "Which of the following are best practices for conducting an empathy interview? (Select all that apply)",
        type: "multi-select",
        options: [
            "Asking open-ended questions",
            "Interrupting to correct the user",
            "Building rapport with small talk",
            "Avoiding jargon and acronyms",
            "Pushing for quick answers"
        ],
        correct: ["Asking open-ended questions", "Building rapport with small talk", "Avoiding jargon and acronyms"],
        topic: "Practical Skills"
    },
    {
        question: "What is the purpose of a 'Call to Action' in an email?",
        type: "mcq",
        options: [
            "To summarize the email content",
            "To request a specific task from the recipient",
            "To include additional recipients",
            "To close the email politely"
        ],
        correct: ["To request a specific task from the recipient"],
        topic: "Practical Skills"
    },
    {
        question: "Which topics are appropriate for small talk during an empathy interview? (Select all that apply)",
        type: "multi-select",
        options: [
            "The weather",
            "Personal financial problems",
            "Recent non-controversial events",
            "The user’s workplace environment",
            "Political opinions"
        ],
        correct: ["The weather", "Recent non-controversial events", "The user’s workplace environment"],
        topic: "Practical Skills"
    },
    {
        question: "What is the primary purpose of a SWOT analysis in Design Thinking?",
        type: "mcq",
        options: [
            "To generate new ideas",
            "To evaluate strengths, weaknesses, opportunities, and threats",
            "To create a prototype",
            "To define user requirements"
        ],
        correct: ["To evaluate strengths, weaknesses, opportunities, and threats"],
        topic: "Design Thinking - Define & Ideate"
    },
    {
        question: "Which of the following are benefits of using a Customer Journey Map? (Select all that apply)",
        type: "multi-select",
        options: [
            "Identifying user pain points",
            "Visualizing the user experience",
            "Finalizing the project budget",
            "Highlighting opportunities for improvement",
            "Building empathy with users"
        ],
        correct: ["Identifying user pain points", "Visualizing the user experience", "Highlighting opportunities for improvement", "Building empathy with users"],
        topic: "Design Thinking - Empathy"
    },
    {
        question: "In Agile, who is responsible for prioritizing the Product Backlog?",
        type: "mcq",
        options: [
            "Scrum Master",
            "Product Owner",
            "Development Team",
            "Stakeholders"
        ],
        correct: ["Product Owner"],
        topic: "Software Development Process & Methodologies"
    },
    {
        question: "What does the term 'Scope Creep' refer to in software development?",
        type: "mcq",
        options: [
            "The addition of new team members",
            "Uncontrolled growth of project requirements",
            "The reduction of project features",
            "The completion of a project ahead of schedule"
        ],
        correct: ["Uncontrolled growth of project requirements"],
        topic: "Software Development Process & Methodologies"
    },
    {
        question: "Which Design Thinking tool is used to visually represent a user’s interaction with a product over time?",
        type: "mcq",
        options: [
            "Empathy Map",
            "Persona",
            "Customer Journey Map",
            "Feedback Grid"
        ],
        correct: ["Customer Journey Map"],
        topic: "Design Thinking - Empathy"
    },
    {
        question: "What is a key benefit of using low-fidelity prototypes early in the design process?",
        type: "mcq",
        options: [
            "They are ready for market release",
            "They are inexpensive and quick to create",
            "They include all final features",
            "They require no user feedback"
        ],
        correct: ["They are inexpensive and quick to create"],
        topic: "Design Thinking - Prototype & Test"
    },
    {
        question: "Which of the following are roles in a typical Scrum team? (Select all that apply)",
        type: "multi-select",
        options: [
            "Product Owner",
            "Scrum Master",
            "Development Team",
            "Project Manager",
            "Stakeholder"
        ],
        correct: ["Product Owner", "Scrum Master", "Development Team"],
        topic: "Software Development Process & Methodologies"
    },
    {
        question: "What is the purpose of the 'How Might We' (HMW) questions in Design Thinking?",
        type: "mcq",
        options: [
            "To finalize the project scope",
            "To spark creative brainstorming sessions",
            "To create a detailed technical specification",
            "To conduct user testing"
        ],
        correct: ["To spark creative brainstorming sessions"],
        topic: "Design Thinking - Define & Ideate"
    },
    {
        question: "Which of the following are advantages of using questionnaires for requirement gathering? (Select all that apply)",
        type: "multi-select",
        options: [
            "Economical for large groups",
            "Supports geographically distributed respondents",
            "Allows for in-depth follow-up questions",
            "Provides real-time user observations"
        ],
        correct: ["Economical for large groups", "Supports geographically distributed respondents"],
        topic: "Software Development Process & Methodologies"
    },
    {
        question: "In Design Thinking, what is the role of the 'Test' stage?",
        type: "mcq",
        options: [
            "To finalize the product for market",
            "To gather feedback and iterate on prototypes",
            "To create a detailed project plan",
            "To eliminate the need for user research"
        ],
        correct: ["To gather feedback and iterate on prototypes"],
        topic: "Design Thinking - Prototype & Test"
    },
    {
        question: "Which of the following are key elements of an Empathy Map? (Select all that apply)",
        type: "multi-select",
        options: [
            "Say",
            "Think",
            "Do",
            "Feel",
            "Buy"
        ],
        correct: ["Say", "Think", "Do", "Feel"],
        topic: "Design Thinking - Empathy"
    },
    {
        question: "What is a key difference between functional and non-functional requirements?",
        type: "mcq",
        options: [
            "Functional requirements describe what the system does, while non-functional requirements describe how well it does it",
            "Functional requirements are optional, while non-functional requirements are mandatory",
            "Functional requirements focus on user interface, while non-functional requirements focus on user experience",
            "Functional requirements are tested, while non-functional requirements are not"
        ],
        correct: ["Functional requirements describe what the system does, while non-functional requirements describe how well it does it"],
        topic: "Software Development Process & Methodologies"
    },
    {
        question: "Which of the following is a benefit of using storyboards in prototyping?",
        type: "mcq",
        options: [
            "They provide a detailed technical specification",
            "They visually depict a user’s interaction with a solution",
            "They eliminate the need for user testing",
            "They finalize the project budget"
        ],
        correct: ["They visually depict a user’s interaction with a solution"],
        topic: "Design Thinking - Prototype & Test"
    },
    {
        question: "In Agile, what is the purpose of the Product Owner role?",
        type: "mcq",
        options: [
            "To manage the development team’s daily tasks",
            "To ensure the project stays within budget",
            "To represent the customer and prioritize the Product Backlog",
            "To conduct usability testing"
        ],
        correct: ["To represent the customer and prioritize the Product Backlog"],
        topic: "Software Development Process & Methodologies"
    },
    {
        question: "What is the primary goal of the 'Define' stage in Design Thinking?",
        type: "mcq",
        options: [
            "To build a prototype",
            "To synthesize insights into a clear problem statement",
            "To test solutions with users",
            "To generate creative ideas"
        ],
        correct: ["To synthesize insights into a clear problem statement"],
        topic: "Design Thinking - Define & Ideate"
    },
    {
        question: "Which of the following are appropriate ways to build rapport during an empathy interview? (Select all that apply)",
        type: "multi-select",
        options: [
            "Discussing controversial topics",
            "Starting with light, neutral small talk",
            "Asking about the user’s work environment",
            "Sharing personal opinions",
            "Commenting on neutral topics like the weather"
        ],
        correct: ["Starting with light, neutral small talk", "Asking about the user’s work environment", "Commenting on neutral topics like the weather"],
        topic: "Practical Skills"
    },
    {
        question: "What is the purpose of a Feedback Loop in the design process?",
        type: "mcq",
        options: [
            "To create a final product",
            "To continuously test, learn, and refine solutions",
            "To document all project requirements",
            "To eliminate the need for prototyping"
        ],
        correct: ["To continuously test, learn, and refine solutions"],
        topic: "Design Thinking - Prototype & Test"
    },
    {
        question: "Which of the following are considered phases of the Software Development Life Cycle (SDLC)? (Select all that apply)",
        type: "multi-select",
        options: [
            "Ideation",
            "Planning",
            "Testing",
            "Deployment",
            "Marketing"
        ],
        correct: ["Planning", "Testing", "Deployment"],
        topic: "Software Development Process & Methodologies"
    },
    {
        question: "In the Six Thinking Hats technique, which hat focuses on creativity and new ideas?",
        type: "mcq",
        options: [
            "Blue Hat",
            "Green Hat",
            "Red Hat",
            "Black Hat"
        ],
        correct: ["Green Hat"],
        topic: "Design Thinking - Define & Ideate"
    },
    {
        question: "What is a key benefit of using the Agile methodology over Waterfall?",
        type: "mcq",
        options: [
            "It requires less documentation",
            "It ensures all requirements are fixed upfront",
            "It allows for more flexibility in responding to changes",
            "It eliminates the need for testing"
        ],
        correct: ["It allows for more flexibility in responding to changes"],
        topic: "Software Development Process & Methodologies"
    },
    {
        question: "Which of the following are examples of brainstorming best practices? (Select all that apply)",
        type: "multi-select",
        options: [
            "Encouraging wild ideas",
            "Judging ideas immediately",
            "Building on others’ ideas",
            "Focusing on quantity over quality initially",
            "Limiting participation to senior team members"
        ],
        correct: ["Encouraging wild ideas", "Building on others’ ideas", "Focusing on quantity over quality initially"],
        topic: "Design Thinking - Define & Ideate"
    }
];

//console.log(`Total questions: ${quizQuestions.length}`); // Kept for debugging if needed

    const quizContainer = document.getElementById('quiz-container');
    const submitQuizBtn = document.getElementById('submit-quiz');
    const retakeQuizBtn = document.getElementById('retake-quiz');
    const quizResults = document.getElementById('quiz-results');
    const scoreDisplay = document.getElementById('quiz-score');
    const totalQuestionsDisplay = document.getElementById('total-questions');
    const answerFeedback = document.getElementById('answer-feedback');

    // Quiz settings elements
    const quizSettings = document.getElementById('quiz-settings');
    const numQuestionsSelect = document.getElementById('num-questions');
    const topicFilterSelect = document.getElementById('topic-filter');
    const timeLimitSelect = document.getElementById('time-limit');
    const startQuizBtn = document.getElementById('start-quiz');
    const timerDisplay = document.getElementById('timer-display');

    // Quiz result tabs and saved questions elements
    const correctAnswersTab = document.getElementById('correct-answers-tab');
    const incorrectAnswersTab = document.getElementById('incorrect-answers-tab');
    const allAnswersTab = document.getElementById('all-answers-tab');
    const savedAnswersTab = document.getElementById('saved-answers-tab'); // New tab
    const savedAnswersContainer = document.getElementById('saved-answers-container'); // New container
    const savedAnswersList = document.getElementById('saved-answers-list'); // New list
    const clearSavedQuestionsBtn = document.getElementById('clear-saved-questions'); // New button

    const resetQuizBtn = document.getElementById('reset-quiz');

    let userAnswers = [];
    let selectedQuestions = [];
    let timerInterval = null;
    let timeRemaining = 0;
    let correctAnswers = [];
    let incorrectAnswers = [];

    // --- Saved Questions Feature Variables ---
    let savedForReviewQuestions = []; // Array to hold saved questions data
    const SAVED_QUESTIONS_STORAGE_KEY = 'savedWrongQuestions';

    // Function to load saved questions from local storage
    function loadSavedQuestions() {
        const storedQuestions = localStorage.getItem(SAVED_QUESTIONS_STORAGE_KEY);
        if (storedQuestions) {
            try {
                savedForReviewQuestions = JSON.parse(storedQuestions);
            } catch (e) {
                console.error("Error parsing saved questions from localStorage:", e);
                savedForReviewQuestions = [];
            }
        }
    }

    // Function to save current saved questions to local storage
    function saveQuestionsToLocalStorage() {
        localStorage.setItem(SAVED_QUESTIONS_STORAGE_KEY, JSON.stringify(savedForReviewQuestions));
    }

    // Populate topic filter options
    function populateTopicFilter() {
        const topics = [...new Set(quizQuestions.map(q => q.topic))];
        // Sort topics alphabetically, but put 'All Topics' and 'Saved for Review' at the top
        topics.sort(); 
        topicFilterSelect.innerHTML = '<option value="all">All Topics</option>';
        // Add "Saved for Review" option
        topicFilterSelect.innerHTML += '<option value="saved">Saved for Review</option>';

        topics.forEach(topic => {
            const option = document.createElement('option');
            option.value = topic;
            option.textContent = topic;
            topicFilterSelect.appendChild(option);
        });
    }

    // Populate number of questions options
    function populateNumQuestions() {
        const maxQuestions = quizQuestions.length;
        numQuestionsSelect.innerHTML = '';
        for (let i = 1; i <= maxQuestions; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            numQuestionsSelect.appendChild(option);
        }
        numQuestionsSelect.value = Math.min(10, maxQuestions); // Default to 10 or max
    }

    // Start timer
    function startTimer(seconds) {
        clearInterval(timerInterval);
        timeRemaining = seconds;
        timerDisplay.style.display = seconds > 0 ? 'block' : 'none';
        if (seconds <= 0) return;

        timerDisplay.textContent = `Time Remaining: ${formatTime(seconds)}`;
        timerInterval = setInterval(() => {
            timeRemaining--;
            timerDisplay.textContent = `Time Remaining: ${formatTime(timeRemaining)}`;
            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                calculateScore(); // Auto-submit when time runs out
            }
        }, 1000);
    }

    // Format time as MM:SS
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    // Filter and select questions
    function selectQuestions() {
        const numQuestions = parseInt(numQuestionsSelect.value);
        const selectedTopic = topicFilterSelect.value;
        let filteredQuestions = [];
        
        if (selectedTopic === 'all') {
            filteredQuestions = quizQuestions;
        } else if (selectedTopic === 'saved') {
            filteredQuestions = savedForReviewQuestions; // Use saved questions
            if (filteredQuestions.length === 0) {
                alert("You have no questions saved for review. Please save some questions or select 'All Topics'.");
                resetQuiz(); // Reset to default view
                return;
            }
        } else {
            filteredQuestions = quizQuestions.filter(q => q.topic === selectedTopic);
        }
        
        // Shuffle and select questions
        selectedQuestions = filteredQuestions
            .sort(() => Math.random() - 0.5)
            .slice(0, Math.min(numQuestions, filteredQuestions.length));
    }

    // Render quiz
    function renderQuiz() {
        quizContainer.innerHTML = ''; // Clear previous quiz
        answerFeedback.innerHTML = ''; // Clear previous feedback
        savedAnswersList.innerHTML = ''; // Clear saved list
        savedAnswersContainer.style.display = 'none'; // Hide saved questions container

        userAnswers = []; // Reset answers
        correctAnswers = []; // Reset correct answers
        incorrectAnswers = []; // Reset incorrect answers
        quizResults.style.display = 'none'; // Hide results
        submitQuizBtn.style.display = 'block'; // Show submit button
        retakeQuizBtn.style.display = 'none'; // Hide retake button
        quizSettings.style.display = 'none'; // Hide settings when quiz starts
        resetQuizBtn.style.display = 'none'; // Hide reset button once quiz starts
        
        // Reset tab active state to 'All Answers'
        correctAnswersTab.classList.remove('active');
        incorrectAnswersTab.classList.remove('active');
        savedAnswersTab.classList.remove('active');
        allAnswersTab.classList.add('active'); 

        selectQuestions();
        if (selectedQuestions.length === 0) {
            quizContainer.innerHTML = "<p>No questions found for the selected criteria. Please adjust your settings.</p>";
            submitQuizBtn.style.display = 'none';
            quizSettings.style.display = 'block'; // Show settings if no questions
            resetQuizBtn.style.display = 'block'; // Allow reset from here
            return;
        }

        selectedQuestions.forEach((q, index) => {
            const questionElement = document.createElement('div');
            questionElement.classList.add('quiz-question');
            questionElement.dataset.questionIndex = index; // Store index for later
            userAnswers.push(q.type === 'multi-select' ? [] : ''); // Initialize user answers

            const questionText = document.createElement('p');
            questionText.textContent = `${index + 1}. ${q.question} (${q.topic})`;
            questionElement.appendChild(questionText);

            const optionsGroup = document.createElement('div');
            optionsGroup.classList.add('options-group');

            q.options.forEach((option) => { // Removed optionIndex as it wasn't used
                const label = document.createElement('label');
                const input = document.createElement('input');
                input.value = option;

                if (q.type === "mcq") {
                    input.type = "radio";
                    input.name = `question-${index}`;
                    input.addEventListener('change', (e) => {
                        userAnswers[index] = e.target.value;
                    });
                } else if (q.type === "multi-select") {
                    input.type = "checkbox";
                    input.name = `question-${index}`;
                    input.addEventListener('change', (e) => {
                        if (e.target.checked) {
                            userAnswers[index].push(e.target.value);
                        } else {
                            userAnswers[index] = userAnswers[index].filter(ans => ans !== e.target.value);
                        }
                    });
                }

                label.appendChild(input);
                label.appendChild(document.createTextNode(option));
                optionsGroup.appendChild(label);
            });
            questionElement.appendChild(optionsGroup);
            quizContainer.appendChild(questionElement);
        });
        totalQuestionsDisplay.textContent = selectedQuestions.length;

        // Start timer if selected
        const timeLimit = parseInt(timeLimitSelect.value);
        if (timeLimit > 0) {
            startTimer(timeLimit * 60);
        }
    }

    // Calculate score and store correct/incorrect answers
    function calculateScore() {
        clearInterval(timerInterval); // Stop timer
        timerDisplay.style.display = 'none'; // Hide timer display after submission
        let score = 0;
        answerFeedback.innerHTML = ''; // Clear previous feedback
        correctAnswers = [];
        incorrectAnswers = [];

        selectedQuestions.forEach((q, index) => {
            const questionElement = quizContainer.children[index];
            
            let isCorrect = false;
            let selectedOptions = [];

            if (q.type === "mcq") {
                selectedOptions.push(userAnswers[index]);
                if (userAnswers[index] === q.correct[0]) {
                    isCorrect = true;
                }
            } else if (q.type === "multi-select") {
                selectedOptions = userAnswers[index];
                // Ensure correct and user answers are sorted for consistent comparison of sets
                const correctSet = new Set(q.correct.sort()); 
                const userSet = new Set(userAnswers[index].sort());
                
                isCorrect = correctSet.size === userSet.size && 
                            [...userSet].every(val => correctSet.has(val));
            }

            // Store in correct/incorrect arrays for filtered views
            const answerData = {
                question: q.question,
                topic: q.topic,
                selected: selectedOptions.length > 0 ? selectedOptions : ['No answer given'],
                correct: q.correct,
                type: q.type // Include type for saving if needed later
            };

            if (isCorrect) {
                score++;
                correctAnswers.push(answerData);
                questionElement.classList.add('correct');
            } else {
                incorrectAnswers.push(answerData);
                questionElement.classList.add('incorrect');
            }

            // Highlight chosen/correct options in the quiz display
            const labels = questionElement.querySelectorAll('.options-group label');
            labels.forEach(label => {
                const input = label.querySelector('input');
                // Check if this option is a correct answer
                if (q.correct.includes(input.value)) {
                    label.classList.add('correct-answer');
                }
                // Check if this option was selected by the user
                if ((Array.isArray(userAnswers[index]) && userAnswers[index].includes(input.value)) ||
                    (!Array.isArray(userAnswers[index]) && userAnswers[index] === input.value)) {
                    label.classList.add('selected');
                }
                input.disabled = true; // Disable input after submission
            });
        });

        scoreDisplay.textContent = score;
        quizResults.style.display = 'block';
        submitQuizBtn.style.display = 'none';
        retakeQuizBtn.style.display = 'block';
        resetQuizBtn.style.display = 'block'; // Show reset button after submission

        // Show all answers feedback by default after calculation
        showAllAnswers();

        // Scroll to results
        quizResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Common function to display feedback items based on provided array
    function displayFeedbackItems(dataArray, isActiveTab = 'all') {
        answerFeedback.innerHTML = ''; // Clear main feedback area
        savedAnswersContainer.style.display = 'none'; // Hide saved questions container

        // Update active tab styles
        correctAnswersTab.classList.remove('active');
        incorrectAnswersTab.classList.remove('active');
        allAnswersTab.classList.remove('active');
        savedAnswersTab.classList.remove('active');
        document.getElementById(`${isActiveTab}-answers-tab`).classList.add('active');

        if (dataArray.length === 0) {
            answerFeedback.innerHTML = '<p>No items to display here.</p>';
            return;
        }

        dataArray.forEach((ans) => {
            const feedbackItem = document.createElement('div');
            feedbackItem.classList.add('feedback-item');
            const isCorrect = correctAnswers.includes(ans); // Check if this item is in the correct answers list
            feedbackItem.classList.add(isCorrect ? 'correct' : 'incorrect');
            
            feedbackItem.innerHTML = `<strong>Question:</strong> ${ans.question} (${ans.topic})<br>`;
            feedbackItem.innerHTML += `Your Answer(s): <span style="font-weight: bold;">${ans.selected.join(', ')}</span><br>`;
            feedbackItem.innerHTML += `Correct Answer(s): <span style="font-weight: bold;">${ans.correct.join(', ')}</span>`;

            // Add Save for Review button only if it was an incorrect answer and not already saved
            if (!isCorrect) {
                const saveButton = document.createElement('button');
                saveButton.classList.add('btn', 'btn-secondary', 'btn-small-feedback');
                saveButton.textContent = 'Save for Review';
                
                // Use the full answerData object for saving
                const questionToSave = {
                    question: ans.question,
                    topic: ans.topic,
                    correct: ans.correct,
                    type: ans.type,
                    options: selectedQuestions.find(q => q.question === ans.question)?.options || [] // Store options too for full question context
                };

                // Check if already saved
                const isAlreadySaved = savedForReviewQuestions.some(sq => sq.question === questionToSave.question);
                if (isAlreadySaved) {
                    saveButton.textContent = 'Saved';
                    saveButton.disabled = true;
                }

                saveButton.addEventListener('click', (e) => {
                    // Prevent duplicates
                    if (!savedForReviewQuestions.some(sq => sq.question === questionToSave.question)) {
                        savedForReviewQuestions.push(questionToSave);
                        saveQuestionsToLocalStorage();
                        e.target.textContent = 'Saved';
                        e.target.disabled = true;
                        // If user is on 'Saved for Review' tab, update it
                        if (savedAnswersTab.classList.contains('active')) {
                           showSavedAnswers(); // Re-render the saved list to reflect the change
                        }
                    }
                });
                feedbackItem.appendChild(saveButton);
            }
            answerFeedback.appendChild(feedbackItem);
        });
    }

    // Show all answers
    function showAllAnswers() {
        const allAnswerData = [...correctAnswers, ...incorrectAnswers].sort((a, b) => 
            selectedQuestions.findIndex(q => q.question === a.question) - 
            selectedQuestions.findIndex(q => q.question === b.question)
        );
        displayFeedbackItems(allAnswerData, 'all');
    }

    // Show correct answers
    function showCorrectAnswers() {
        displayFeedbackItems(correctAnswers, 'correct');
    }

    // Show incorrect answers
    function showIncorrectAnswers() {
        displayFeedbackItems(incorrectAnswers, 'incorrect');
    }

    // Show saved questions
    function showSavedAnswers() {
        answerFeedback.innerHTML = ''; // Clear main feedback area
        savedAnswersList.innerHTML = ''; // Clear saved questions list
        quizContainer.innerHTML = ''; // Hide quiz questions (if any were displayed)
        submitQuizBtn.style.display = 'none'; // Hide quiz controls
        retakeQuizBtn.style.display = 'none'; // Hide quiz controls
        resetQuizBtn.style.display = 'block'; // Ensure reset is available from this view

        // Update active tab styles
        correctAnswersTab.classList.remove('active');
        incorrectAnswersTab.classList.remove('active');
        allAnswersTab.classList.remove('active');
        savedAnswersTab.classList.add('active'); // Set saved tab active

        savedAnswersContainer.style.display = 'block'; // Show saved section

        if (savedForReviewQuestions.length === 0) {
            savedAnswersList.innerHTML = '<p>No questions saved for review yet.</p>';
            clearSavedQuestionsBtn.style.display = 'none';
            return;
        }

        clearSavedQuestionsBtn.style.display = 'block';

        savedForReviewQuestions.forEach((q) => {
            const feedbackItem = document.createElement('div');
            feedbackItem.classList.add('feedback-item', 'saved'); // Add specific class for saved questions
            feedbackItem.innerHTML = `<strong>Question:</strong> ${q.question} (${q.topic})<br>`;
            feedbackItem.innerHTML += `Correct Answer(s): <span style="font-weight: bold;">${q.correct.join(', ')}</span>`;

            const removeButton = document.createElement('button');
            removeButton.classList.add('btn', 'btn-secondary', 'btn-small-feedback', 'remove-saved-btn');
            removeButton.textContent = 'Remove';
            removeButton.dataset.questionText = q.question; // Use question text for identification

            removeButton.addEventListener('click', (e) => {
                const textToRemove = e.target.dataset.questionText;
                savedForReviewQuestions = savedForReviewQuestions.filter(sq => sq.question !== textToRemove);
                saveQuestionsToLocalStorage();
                showSavedAnswers(); // Re-render the list
            });
            feedbackItem.appendChild(removeButton);
            savedAnswersList.appendChild(feedbackItem);
        });
    }

    // Reset quiz settings and state
    function resetQuiz() {
        numQuestionsSelect.value = Math.min(10, quizQuestions.length); // Reset to default number
        topicFilterSelect.value = 'all'; // Reset to all topics
        timeLimitSelect.value = '0'; // Reset time limit
        quizSettings.style.display = 'block'; // Ensure settings are visible
        quizContainer.innerHTML = ''; // Clear questions
        answerFeedback.innerHTML = ''; // Clear feedback
        savedAnswersList.innerHTML = ''; // Clear saved questions list
        savedAnswersContainer.style.display = 'none'; // Hide saved questions container

        quizResults.style.display = 'none'; // Hide results
        submitQuizBtn.style.display = 'none'; // Hide submit button
        retakeQuizBtn.style.display = 'none'; // Hide retake button
        resetQuizBtn.style.display = 'none'; // Hide reset button
        clearInterval(timerInterval); // Stop any running timer
        timerDisplay.style.display = 'none'; // Hide timer display
        
        // Reset all tab buttons to inactive, then set 'All Answers' as active
        correctAnswersTab.classList.remove('active');
        incorrectAnswersTab.classList.remove('active');
        savedAnswersTab.classList.remove('active');
        allAnswersTab.classList.add('active');
    }

    // Event listeners for quiz controls
    startQuizBtn.addEventListener('click', renderQuiz);
    submitQuizBtn.addEventListener('click', calculateScore);
    retakeQuizBtn.addEventListener('click', renderQuiz);
    resetQuizBtn.addEventListener('click', resetQuiz);
    correctAnswersTab.addEventListener('click', showCorrectAnswers);
    incorrectAnswersTab.addEventListener('click', showIncorrectAnswers);
    allAnswersTab.addEventListener('click', showAllAnswers);
    savedAnswersTab.addEventListener('click', showSavedAnswers); // New listener for saved tab
    clearSavedQuestionsBtn.addEventListener('click', () => { // New listener for clear saved button
        if (confirm('Are you sure you want to clear all saved questions? This action cannot be undone.')) {
            savedForReviewQuestions = [];
            saveQuestionsToLocalStorage();
            showSavedAnswers(); // Re-render the empty list
        }
    });


    // Initialize quiz settings and load saved questions on page load
    loadSavedQuestions(); // Load saved questions first
    populateTopicFilter();
    populateNumQuestions();
    resetQuiz(); // Call resetQuiz to set initial state correctly

    // --- Scroll to Top Button ---
    const scrollToTopBtn = document.querySelector('.scroll-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Show button after scrolling 300px
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
