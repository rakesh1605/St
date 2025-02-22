const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = 'AIzaSyDFFZBQC82KYAGrcR2Z7A8ILCoVkHVTbrI';
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};


export  const GenerateCourseLayout_AI = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Generate a course tutorial with the following details in JSON format. Ensure that each chapter name is distinct and covers different aspects of the topic without repetition. The course should include: Course Name, Description, Chapters (with unique Chapter Names, About section, and Duration). The details are: Category: AIML, Topic: Python, Level: Basic,     Duration: 1 hour, No. of Chapters: 5 Each chapter should have a unique and meaningful name that reflects its distinct focus within the Python topic. Avoid generic repetition and ensure variety in chapter coverage. in JSON format"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"courseName\": \"Python Fundamentals for AI/ML\",\n  \"description\": \"This course provides a foundational understanding of Python programming, specifically tailored for individuals interested in pursuing Artificial Intelligence and Machine Learning. It covers essential syntax, data structures, and control flow, equipping you with the necessary skills to begin your journey in the world of AI/ML.\",\n  \"category\": \"AIML\",\n    \"topic\": \"Python\",\n    \"level\": \"Basic\",\n  \"duration\": \"1 hour\",\n  \"chapters\": [\n    {\n      \"chapterName\": \"Setting the Stage: Python Basics and Environment Setup\",\n      \"about\": \"This chapter introduces you to the Python programming language, guiding you through installation, setting up your development environment (including an explanation of IDEs), and running your first Python program. We will cover key concepts like variables, data types (integers, floats, strings, booleans) and basic input/output operations.\",\n      \"duration\": \"15 minutes\"\n    },\n    {\n      \"chapterName\": \"Data Wrangling with Python: Lists, Tuples, and Dictionaries\",\n      \"about\": \"This chapter focuses on understanding and manipulating core Python data structures. You will learn how to use lists, tuples, and dictionaries effectively to store and organize data. We will explore common operations like indexing, slicing, adding, removing, and modifying elements within these structures, building a strong base for data processing tasks in AI/ML.\",\n      \"duration\": \"15 minutes\"\n    },\n   {\n      \"chapterName\": \"Control Flow Mastery: Conditional Statements and Loops\",\n      \"about\": \"This chapter dives into the core mechanisms for controlling the flow of execution in Python. You'll learn how to use conditional statements (if, elif, else) to make decisions in your code, and how to use loops (for and while) to repeat actions. This knowledge is fundamental for creating complex logic and automating repetitive tasks, which are crucial in AI/ML.\",\n      \"duration\": \"10 minutes\"\n   },\n    {\n      \"chapterName\": \"Function Fundamentals: Defining and Using Reusable Code\",\n      \"about\": \"This chapter introduces the concept of functions and their importance in organizing and reusing code. You will learn how to define your own functions, pass arguments, return values, and understand the principles of modular programming. This is a crucial step towards writing efficient and maintainable code for AI/ML projects.\",\n      \"duration\": \"10 minutes\"\n    },\n    {\n      \"chapterName\": \"Introduction to Modules and Packages: Leveraging the Power of Libraries\",\n       \"about\": \"This chapter explores Python's powerful library ecosystem, focusing on how to import and utilize modules. We'll touch on the concept of packages and introduce some essential libraries that are commonly used in the AI/ML domain. This chapter provides a glimpse into the vast resources available to simplify complex AI/ML tasks, setting the foundation for advanced courses.\",\n      \"duration\": \"10 minutes\"\n    }\n  ]\n}\n```\n"},
        ],
      },
    ],
  });

  