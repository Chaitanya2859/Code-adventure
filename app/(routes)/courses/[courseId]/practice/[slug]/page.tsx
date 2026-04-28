import CodeSandbox from "@/app/components/CodeSandbox"
import { db } from "@/config/db"
import { chapterTable, completedExerciseTable } from "@/config/userschema"
import { eq, and } from "drizzle-orm"

// ────────────────────────────────────────────────────
// Static exercise data (keyed by slug)
// In production, pull this from DB or a content layer
// ────────────────────────────────────────────────────
const exerciseData: Record<string, any> = {
  'hello-world': {
    numberTitle: '01. The Silent Void',
    mainHeading: 'Lighting the Spark',
    introduction: 'You drift through an endless, empty digital void. Nothing exists here yet. No text, no colors, no images. Just an infinite black screen waiting for a spark of creation. Today, you are the architect. With a single line of code, you will breathe life into this empty space. 💫',
    conceptExplanation: 'To bring light to the void, we use HTML (HyperText Markup Language). Think of HTML as the ancient runes of the web—the magical words that tell the universe what things are. Before we can paint the walls or build fancy gadgets, we must construct the skeleton.',
    funFact: 'Tim Berners-Lee wrote the first HTML spell in 1991. The first webpage was just simple text on a screen, just like what you are about to create!',
    relatedConcepts: [
      { title: 'HTML', desc: 'The bones and structure (The Skeleton).' },
      { title: 'CSS', desc: 'The paint and style (The Skin).' },
      { title: 'JavaScript', desc: 'The logic and action (The Brain).' }
    ],
    taskTheme: 'A shooting star blazes across the empty screen! Quick, capture it and make a wish before it disappears! 🌠',
    steps: [
      'Locate the <code>&lt;body&gt;</code> tags in your editor on the right. This is where all visible magic happens.',
      'Inside the body, find the placeholder <code class="bg-[#1A1F35] px-1 rounded text-white">Write the date</code> and replace it with today\'s date.',
      'Replace <code class="bg-[#1A1F35] px-1 rounded text-white">Write your wish</code> with your deepest coding wish.'
    ],
    codeSnippet: { html1: 'h2', html2: 'p', css1: 'October 24th', css2: 'I want to build games!' },
    closingLine: 'The void is no longer empty. Happy coding! ✨',
    hint: 'Just type the text directly between the tags, like <h2>October 24th</h2>. Don\'t delete the < or > symbols!',
    defaultFiles: { html: '<!DOCTYPE html>\n<html>\n<body>\n  <!-- The void awaits... 💖 -->\n  <h2>Write the date</h2>\n  <p>Write your wish</p>\n</body>\n</html>' },
    language: 'html'
  },
  'basic-structure': {
    numberTitle: '02. Building the Skeleton',
    mainHeading: 'The Anatomy of a Page',
    introduction: 'The spark is lit, but a single star does not make a galaxy. To build a sturdy, long-lasting world, you need a strong foundation. 🏗️',
    conceptExplanation: 'Web browsers are very strict inspectors. They expect every HTML page to follow a very specific set of blueprints. We use special wrapping tags to give our page a head and a body.',
    funFact: 'The <!DOCTYPE html> declaration isn\'t actually an HTML tag; it\'s an instruction to the web browser about what version of HTML the page is written in (HTML5).',
    taskTheme: 'Let\'s lay down the foundational bricks for your new digital home! 🏠',
    steps: [
      'Add an <code>&lt;html&gt;</code> tag wrapping everything.',
      'Inside the <code>&lt;html&gt;</code> tag, create a <code>&lt;head&gt;</code> section and a <code>&lt;body&gt;</code> section.',
      'Inside the <code>&lt;head&gt;</code>, add a <code>&lt;title&gt;My Digital Home&lt;/title&gt;</code>.'
    ],
    closingLine: 'Great job laying the foundation! 🧱',
    hint: 'Remember, the <head> is for invisible information (like the title), and the <body> is for what you actually see on the page.',
    defaultFiles: { html: '<!DOCTYPE html>\n<!-- Write your skeleton here -->\n' },
    language: 'html'
  },
  'headings': {
    numberTitle: '03. Shouting from the Rooftops',
    mainHeading: 'Headings and Titles',
    introduction: 'When you read a newspaper, the biggest text grabs your attention first. HTML headings work exactly the same way! 📰',
    conceptExplanation: 'HTML has six levels of headings, ranging from <h1> (the largest, most important) down to <h6> (the smallest). You should only have one <h1> per page!',
    funFact: 'Search engines like Google use your headings (especially <h1> and <h2>) to understand what your webpage is about and how to rank it in search results.',
    taskTheme: 'You are starting your own intergalactic newspaper! Let\'s write the front page headlines. 🚀',
    steps: [
      'Create an <code>&lt;h1&gt;</code> tag and write "ALIENS LAND ON MARS" inside it.',
      'Below it, create an <code>&lt;h2&gt;</code> tag and write "Local rovers confused" inside it.',
      'Create an <code>&lt;h3&gt;</code> tag and write "Written by: You" inside it.'
    ],
    closingLine: 'Stop the presses! This looks amazing! 🗞️✨',
    hint: 'Example: <h1>Your text here</h1>',
    defaultFiles: { html: '<!DOCTYPE html>\n<html>\n<body>\n  <!-- Add headlines below 📰 -->\n\n</body>\n</html>' },
    language: 'html'
  },
  'basic-link': {
    numberTitle: '04. Connecting the Web',
    mainHeading: 'The Magic of Links',
    introduction: 'Have you ever wondered why it\'s called the "World Wide Web"? It\'s because of links! 🕸️ They connect pages together like a giant spiderweb.',
    conceptExplanation: 'We use the anchor tag <a> to create a link. It needs an attribute called "href" (hypertext reference) to know exactly where to take the user when they click it.',
    funFact: 'The very first hyperlink was created in 1989. Before that, you had to type exact file addresses to navigate between documents!',
    taskTheme: 'Let\'s create a portal to another dimension (or just another website)! 🌌',
    steps: [
      'Create an <code>&lt;a&gt;</code> tag.',
      'Add an <code>href</code> attribute pointing to "https://www.google.com".',
      'Make the clickable text inside the tag say "Travel to Google".'
    ],
    codeSnippet: { html1: 'a href="url"', html2: '/a', css1: 'Clickable Text', css2: '' },
    closingLine: 'Happy traveling! 🛸',
    hint: 'Make sure your url has https:// in front of it!',
    defaultFiles: { html: '<!DOCTYPE html>\n<html>\n<body>\n  <!-- Add your portal link below 🌀 -->\n\n</body>\n</html>' },
    language: 'html'
  },
  'show-image': {
    numberTitle: '05. A Picture is Worth 1000 Words',
    mainHeading: 'Adding Images',
    introduction: 'A web page with only text can be a bit boring. Let\'s spice things up by adding some visual flair! 📸',
    conceptExplanation: 'We use the <img> tag to embed images. Unlike most tags, <img> doesn\'t need a closing tag. It uses a "src" (source) attribute to find the image.',
    funFact: 'The first image ever uploaded to the web was a picture of a comedy band called "Les Horribles Cernettes" in 1992!',
    taskTheme: 'You are opening a digital art gallery. Let\'s hang your first masterpiece! 🎨',
    steps: [
      'Create an <code>&lt;img&gt;</code> tag.',
      'Set the <code>src</code> attribute to the URL of the provided cute dog image.',
      'Add an <code>alt</code> attribute describing the image (this is important for screen readers and in case the image fails to load!).'
    ],
    closingLine: 'A true masterpiece! 🖼️✨',
    hint: 'Example: <img src="url" alt="A cute dog">',
    defaultFiles: { html: '<!DOCTYPE html>\n<html>\n<body>\n  <!-- Add your masterpiece below 🐕 -->\n  <img src="https://images.unsplash.com/photo-1517849845537-4d257902454a" alt="" width="300">\n</body>\n</html>' },
    language: 'html'
  },
  _default: {
    numberTitle: 'Exercise',
    mainHeading: "Coding Practice",
    introduction: "Time to test your skills! 💻",
    steps: [
      "Read the instructions carefully.",
      "Edit the code in the editor panel.",
      "Click Run to see your output.",
      "Click Submit when you are happy with your solution.",
    ],
    hint: "You can switch between HTML, CSS, and JS tabs above the editor.",
    language: 'html',
  },
}

function getInstruction(slug: string) {
  return exerciseData[slug] ?? exerciseData._default
}

// ────────────────────────────────────────────────────
// Page
// ────────────────────────────────────────────────────
import { currentUser } from "@clerk/nextjs/server"

export default async function PracticePage({
  params,
}: {
  params: Promise<{ courseId: string; slug: string }>
}) {
  const { courseId, slug } = await params
  const exercise = getInstruction(slug)
  
  const user = await currentUser();
  let isAlreadyCompleted = false;
  
  if (user?.primaryEmailAddress?.emailAddress) {
    const existing = await db.select().from(completedExerciseTable).where(
      and(
        eq(completedExerciseTable.courseId, Number(courseId)),
        eq(completedExerciseTable.exerciseId, slug),
        eq(completedExerciseTable.userId, user.primaryEmailAddress.emailAddress)
      )
    );
    isAlreadyCompleted = existing.length > 0;
  }
  
  // Only show HTML tab if the course is HTML (courseId = 1)
  const isHtmlCourse = courseId === '1'
  const tabs = isHtmlCourse ? ['html' as const] : undefined

  // Calculate Navigation
  const slugs = Object.keys(exerciseData).filter(k => k !== '_default')
  const currentIndex = slugs.indexOf(slug)
  const prevSlug = currentIndex > 0 ? slugs[currentIndex - 1] : null
  const nextSlug = currentIndex < slugs.length - 1 ? slugs[currentIndex + 1] : null

  const prevHref = prevSlug ? `/courses/${courseId}/practice/${prevSlug}` : undefined
  const nextHref = nextSlug ? `/courses/${courseId}/practice/${nextSlug}` : undefined

  return (
    <CodeSandbox
      instruction={{
        numberTitle: exercise.numberTitle,
        mainHeading: exercise.mainHeading,
        introduction: exercise.introduction,
        conceptExplanation: exercise.conceptExplanation,
        funFact: exercise.funFact,
        relatedConcepts: exercise.relatedConcepts,
        taskTheme: exercise.taskTheme,
        steps: exercise.steps,
        closingLine: exercise.closingLine,
        hint: exercise.hint,
        codeSnippet: exercise.codeSnippet,
      }}
      defaultFiles={exercise.defaultFiles}
      language={exercise.language}
      tabs={tabs}
      backHref={`/courses/${courseId}`}
      courseId={courseId}
      exerciseSlug={slug}
      isAlreadyCompleted={isAlreadyCompleted}
      prevHref={prevHref}
      nextHref={nextHref}
      exerciseNumber={currentIndex + 1}
      totalExercises={slugs.length}
    />
  )
}
