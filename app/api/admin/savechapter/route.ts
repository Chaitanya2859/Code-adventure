import { db } from "@/config/db";
import { chapterTable } from "@/config/userschema";
import { NextRequest } from "next/server";

const data= [
  {
    "id": 1,
    "name": "Introduction to React",
    "desc": "Understand what React is and why it is used for building UI.",
    "exercises": [
      { "name": "Create Your First React App", "slug": "first-react-app", "xp": 10, "difficulty": "easy" },
      { "name": "JSX Basics", "slug": "jsx-basics", "xp": 10, "difficulty": "easy" },
      { "name": "Render Your First Component", "slug": "render-first-component", "xp": 10, "difficulty": "easy" }
    ]
  },
  {
    "id": 2,
    "name": "Components",
    "desc": "Learn how to create and reuse components in React.",
    "exercises": [
      { "name": "Function Component", "slug": "function-component", "xp": 10, "difficulty": "easy" },
      { "name": "Component Props", "slug": "component-props", "xp": 10, "difficulty": "easy" },
      { "name": "Multiple Components", "slug": "multiple-components", "xp": 10, "difficulty": "easy" }
    ]
  },
  {
    "id": 3,
    "name": "State",
    "desc": "Manage dynamic data using the useState hook.",
    "exercises": [
      { "name": "Create State", "slug": "create-state", "xp": 10, "difficulty": "easy" },
      { "name": "Update State", "slug": "update-state", "xp": 10, "difficulty": "easy" },
      { "name": "Counter App", "slug": "counter-app", "xp": 10, "difficulty": "easy" }
    ]
  },
  {
    "id": 4,
    "name": "Events",
    "desc": "Learn how to handle clicks, inputs, and other user actions.",
    "exercises": [
      { "name": "Click Event", "slug": "click-event", "xp": 10, "difficulty": "easy" },
      { "name": "Input Change Event", "slug": "input-change-event", "xp": 10, "difficulty": "easy" },
      { "name": "Button Interaction", "slug": "button-interaction", "xp": 10, "difficulty": "easy" }
    ]
  },
  {
    "id": 5,
    "name": "Conditional Rendering",
    "desc": "Show or hide UI based on conditions.",
    "exercises": [
      { "name": "If Rendering", "slug": "if-rendering", "xp": 10, "difficulty": "easy" },
      { "name": "Ternary Rendering", "slug": "ternary-rendering", "xp": 10, "difficulty": "easy" },
      { "name": "Loading Component", "slug": "loading-component", "xp": 10, "difficulty": "easy" }
    ]
  },
  {
    "id": 6,
    "name": "Lists & Keys",
    "desc": "Render lists of data using map() and unique keys.",
    "exercises": [
      { "name": "Render a List", "slug": "render-list", "xp": 10, "difficulty": "easy" },
      { "name": "Add Keys", "slug": "add-keys", "xp": 10, "difficulty": "easy" },
      { "name": "Dynamic List Rendering", "slug": "dynamic-list", "xp": 10, "difficulty": "easy" }
    ]
  },
  {
    "id": 7,
    "name": "useEffect",
    "desc": "Learn how to perform side effects in React using useEffect.",
    "exercises": [
      { "name": "Basic useEffect", "slug": "basic-useeffect", "xp": 10, "difficulty": "easy" },
      { "name": "Dependency Array", "slug": "dependency-array", "xp": 10, "difficulty": "easy" },
      { "name": "Fetch Data Example", "slug": "fetch-data-example", "xp": 10, "difficulty": "easy" }
    ]
  },
  {
    "id": 8,
    "name": "Forms & Controlled Inputs",
    "desc": "Manage form elements using React’s state and handlers.",
    "exercises": [
      { "name": "Controlled Input", "slug": "controlled-input", "xp": 10, "difficulty": "easy" },
      { "name": "Handle Submit", "slug": "handle-submit", "xp": 10, "difficulty": "easy" },
      { "name": "Simple Form App", "slug": "simple-form-app", "xp": 10, "difficulty": "easy" }
    ]
  },
  {
    "id": 9,
    "name": "React Router Basics",
    "desc": "Learn how to navigate between pages using React Router.",
    "exercises": [
      { "name": "Setup React Router", "slug": "setup-react-router", "xp": 10, "difficulty": "easy" },
      { "name": "Create Routes", "slug": "create-routes", "xp": 10, "difficulty": "easy" },
      { "name": "Link Between Pages", "slug": "link-between-pages", "xp": 10, "difficulty": "easy" }
    ]
  }
]


export async function GET(req: NextRequest) {
  try {
    for (const item of data) {
      await db.insert(chapterTable).values({
        courseId: 3,
        chapterId: item.id,
        title: item.name,
        desc: item.desc,
        exercises: item.exercises
      });
    }

    return Response.json({ message: "course inserted successfully" });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to insert data" }, { status: 500 });
  }
}