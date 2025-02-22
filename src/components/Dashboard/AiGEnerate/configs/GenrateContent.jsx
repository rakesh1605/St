const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = 'AIzaSyDFFZBQC82KYAGrcR2Z7A8ILCoVkHVTbrI';
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};


  export const GenerateCourseContent = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Provide a detailed explanation of the topic Python, focusing on the chapter Variables and Datatype. Return the response strictly as a valid, minified JSON array of objects, each containing fields like title,explanation,keytakeways and code example on given chapter in detail . Ensure the JSON is parseable and free of special characters or line breaks."},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n[\n  {\n    \"title\": \"Introduction to Variables in Python\",\n    \"explanation\": \"Variables are named storage locations in a computer's memory used to hold data. In Python, you don't need to explicitly declare the type of a variable; Python infers the type based on the value assigned to it. Variable names are case-sensitive and must adhere to certain naming conventions.\",\n    \"keytakeways\": [\n      \"Variables store data.\",\n      \"Python uses dynamic typing.\",\n      \"Variable names must start with a letter or underscore.\",\n      \"Variable names are case-sensitive.\"\n    ],\n    \"code_example\": \"x = 5\\nname = \\\"Alice\\\"\\nis_valid = True\\nprint(x, name, is_valid)\"\n  },\n  {\n    \"title\": \"Data Types in Python: Integers\",\n    \"explanation\": \"Integers represent whole numbers, both positive and negative, without any decimal points. Python has no limit on the size of integers (limited only by available memory).\",\n    \"keytakeways\": [\n      \"Represents whole numbers.\",\n      \"Can be positive or negative.\",\n      \"Unlimited size (limited by memory).\"\n    ],\n    \"code_example\": \"age = 30\\nquantity = -10\\nlarge_number = 12345678901234567890\\nprint(age, quantity, large_number)\"\n  },\n  {\n    \"title\": \"Data Types in Python: Floats\",\n    \"explanation\": \"Floats represent numbers with decimal points. They are used for representing real numbers with fractional parts.\",\n    \"keytakeways\": [\n      \"Represents numbers with decimal points.\",\n      \"Used for real numbers.\",\n      \"Limited precision (typically 64-bit).\",\n      \"Scientific notation supported.\"\n    ],\n    \"code_example\": \"price = 19.99\\npi = 3.14159\\nscientific_notation = 1.23e5\\nprint(price, pi, scientific_notation)\"\n  },\n  {\n    \"title\": \"Data Types in Python: Strings\",\n    \"explanation\": \"Strings represent sequences of characters. They are enclosed in single quotes ('...') or double quotes (\\\"...\\\"). Python strings are immutable, meaning they cannot be changed after creation.\",\n    \"keytakeways\": [\n      \"Represents text.\",\n      \"Enclosed in single or double quotes.\",\n      \"Immutable.\",\n      \"Supports various operations (slicing, concatenation, etc.).\"\n    ],\n    \"code_example\": \"name = \\\"Bob\\\"\\nmessage = 'Hello, world!'\\nmultiline = \\\"\\\"\\\"This is a\\nmultiline string.\\\"\\\"\\\"\\nprint(name, message, multiline)\"\n  },\n  {\n    \"title\": \"Data Types in Python: Booleans\",\n    \"explanation\": \"Booleans represent truth values: `True` or `False`. They are often used in conditional statements and logical operations.\",\n    \"keytakeways\": [\n      \"Represents truth values.\",\n      \"Can be `True` or `False`.\",\n      \"Used in conditional statements.\",\n      \"Used in logical operations.\"\n    ],\n    \"code_example\": \"is_active = True\\nis_logged_in = False\\nprint(is_active, is_logged_in)\"\n  },\n  {\n    \"title\": \"Data Types in Python: Lists\",\n    \"explanation\": \"Lists are ordered, mutable (changeable) sequences of items. They can contain items of different data types. Lists are created using square brackets `[]`.\",\n    \"keytakeways\": [\n      \"Ordered sequence of items.\",\n      \"Mutable (changeable).\",\n      \"Can contain different data types.\",\n      \"Created using square brackets `[]`.\"\n    ],\n    \"code_example\": \"my_list = [1, 2, \\\"apple\\\", 3.14, True]\\nprint(my_list)\\nmy_list[0] = 10 # Modifying the first element\\nprint(my_list)\"\n  },\n  {\n    \"title\": \"Data Types in Python: Tuples\",\n    \"explanation\": \"Tuples are ordered, immutable (unchangeable) sequences of items. They are similar to lists but cannot be modified after creation. Tuples are created using parentheses `()`.\",\n    \"keytakeways\": [\n      \"Ordered sequence of items.\",\n      \"Immutable (unchangeable).\",\n      \"Can contain different data types.\",\n      \"Created using parentheses `()`.\"\n    ],\n    \"code_example\": \"my_tuple = (1, 2, \\\"banana\\\", 2.71, False)\\nprint(my_tuple)\\n# my_tuple[0] = 10  # This will cause an error because tuples are immutable\"\n  },\n  {\n    \"title\": \"Data Types in Python: Dictionaries\",\n    \"explanation\": \"Dictionaries are unordered collections of key-value pairs. Keys must be unique and immutable (e.g., strings, numbers, or tuples), while values can be of any data type. Dictionaries are created using curly braces `{}`.\",\n    \"keytakeways\": [\n      \"Unordered collection of key-value pairs.\",\n      \"Keys must be unique and immutable.\",\n      \"Values can be of any data type.\",\n      \"Created using curly braces `{}`.\"\n    ],\n    \"code_example\": \"my_dict = {\\\"name\\\": \\\"Charlie\\\", \\\"age\\\": 25, \\\"city\\\": \\\"New York\\\"}\\nprint(my_dict)\\nprint(my_dict[\\\"name\\\"])\"\n  },\n  {\n    \"title\": \"Data Types in Python: Sets\",\n    \"explanation\": \"Sets are unordered collections of unique items. They do not allow duplicate elements. Sets are created using curly braces `{}` or the `set()` constructor.\",\n    \"keytakeways\": [\n      \"Unordered collection of unique items.\",\n      \"Does not allow duplicate elements.\",\n      \"Created using curly braces `{}` or `set()`.\",\n      \"Supports set operations (union, intersection, etc.).\"\n    ],\n    \"code_example\": \"my_set = {1, 2, 3, 3, 4, 5}\\nprint(my_set) # Output: {1, 2, 3, 4, 5}\\nmy_other_set = set([4, 5, 6, 7])\\nprint(my_other_set)\"\n  },\n  {\n    \"title\": \"Type Conversion (Casting) in Python\",\n    \"explanation\": \"Type conversion (or casting) allows you to change the data type of a variable. Python provides built-in functions like `int()`, `float()`, `str()`, `list()`, `tuple()`, and `set()` for this purpose.\",\n    \"keytakeways\": [\n      \"Changes the data type of a variable.\",\n      \"Uses built-in functions like `int()`, `float()`, `str()`, etc.\",\n      \"Can be explicit or implicit (automatic).\",\n      \"Not all conversions are possible.\"\n    ],\n    \"code_example\": \"number_str = \\\"10\\\"\\nnumber_int = int(number_str)\\nprint(number_int, type(number_int))\\nnumber_float = float(number_int)\\nprint(number_float, type(number_float))\\nlist_from_string = list(\\\"hello\\\")\\nprint(list_from_string)\"\n  }\n]\n```"},
        ],
      },
    ],
  });

 