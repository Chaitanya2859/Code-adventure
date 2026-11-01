'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import {
 Code2,
 Copy,
 Check,
 Zap,
 ArrowRight,
 BookOpen,
 Sparkles,
 Layers,
 Terminal,
 FileCode2,
 ExternalLink
} from 'lucide-react'

const textShadow = {
 textShadow: "1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000"
}

interface CrashCard {
 id: string
 title: string
 badge: string
 summary: string
 code: string
 proTip: string
 practiceLink: string
}

const HTML_LESSONS: CrashCard[] = [
 {
 id: 'html-1',
 title: '1. Document Skeleton',
 badge: 'Structure',
 summary: 'Every modern HTML page starts with <!DOCTYPE html> and wraps its content inside <html>, <head>, and <body>.',
 code: `<!DOCTYPE html>
<html lang="en">
 <head>
 <meta charset="UTF-8" />
 <title>My First Adventure</title>
 </head>
 <body>
 <h1>Welcome Hero!</h1>
 </body>
</html>`,
 proTip: 'Always specify the <meta charset="UTF-8"> to ensure characters and emojis render properly across all browsers.',
 practiceLink: '/courses/1'
 },
 {
 id: 'html-2',
 title: '2. Semantic Elements',
 badge: 'HTML5 Semantics',
 summary: 'Semantic tags describe their meaning to both the browser and search engines instead of generic <div> containers.',
 code: `<header>
 <nav><a href="/">Home</a></nav>
</header>
<main>
 <article>
 <h2>Quest Logs</h2>
 <p>Completed first dungeon!</p>
 </article>
</main>
<footer>© 2026 Code Adventure</footer>`,
 proTip: 'Using <main>, <header>, and <nav> drastically improves SEO rank and screen reader accessibility.',
 practiceLink: '/courses/1'
 },
 {
 id: 'html-3',
 title: '3. Links & Images',
 badge: 'Media & Nav',
 summary: 'Hyperlinks connect the web using <a> tags, while <img> displays visual graphics with accessible fallback text.',
 code: `<!-- Link to another realm -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
 Visit Tavern
</a>

<!-- Pixel Graphic -->
<img src="/hero.png" alt="Pixel Knight with sword" width="100" />`,
 proTip: 'Always include the "alt" attribute on <img>. When opening links in target="_blank", include rel="noopener noreferrer" for security.',
 practiceLink: '/courses/1'
 },
 {
 id: 'html-4',
 title: '4. Interactive Forms',
 badge: 'Forms & Inputs',
 summary: 'Forms capture player input using typed inputs, textareas, and buttons.',
 code: `<form action="/submit" method="POST">
 <label for="username">Hero Name:</label>
 <input type="text" id="username" name="hero" placeholder="e.g. Arthur" required />

 <label for="pass">Secret Key:</label>
 <input type="password" id="pass" name="key" required />

 <button type="submit">Begin Quest</button>
</form>`,
 proTip: 'Always match the <label for="id"> with the <input id="id"> to ensure clicking the label focuses the input field.',
 practiceLink: '/courses/1'
 },
 {
 id: 'html-5',
 title: '5. Lists & Data Tables',
 badge: 'Data Structures',
 summary: 'Organize related gear and inventory using ordered (<ol>), unordered (<ul>), or tabular (<table>) data structures.',
 code: `<!-- Gear Inventory List -->
<ul>
 <li>️ Wooden Sword</li>
 <li>️ Iron Shield</li>
 <li> Health Potion</li>
</ul>

<!-- Stats Table -->
<table>
 <tr><th>Level</th><th>XP Needed</th></tr>
 <tr><td>1</td><td>100 XP</td></tr>
</table>`,
 proTip: 'Use <ol> for sequential steps (1, 2, 3) and <ul> for itemized bullet lists.',
 practiceLink: '/courses/1'
 }
]

const CSS_LESSONS: CrashCard[] = [
 {
 id: 'css-1',
 title: '1. The Box Model in 60s',
 badge: 'Layout Core',
 summary: 'Every element is a box containing Content, Padding (inner space), Border (boundary), and Margin (outer spacing).',
 code: `* {
 box-sizing: border-box; /* Includes padding & border in width */
 margin: 0;
 padding: 0;
}

.card {
 width: 300px;
 padding: 16px; /* Inner breathing room */
 border: 4px solid #facc15; /* Pixel border */
 margin: 20px auto; /* Centered outer space */
}`,
 proTip: 'Always use "box-sizing: border-box" on all elements to stop padding from expanding an element beyond its declared width.',
 practiceLink: '/courses/2'
 },
 {
 id: 'css-2',
 title: '2. Flexbox Cheat Code',
 badge: 'Flexbox',
 summary: 'Flexbox solves 1-dimensional layouts (rows or columns) with automatic alignment and distribution.',
 code: `.container {
 display: flex;
 flex-direction: row; /* or column */
 justify-content: center; /* Main axis (horizontal) */
 align-items: center; /* Cross axis (vertical) */
 gap: 16px; /* Space between items */
}`,
 proTip: 'Use "display: flex; justify-content: center; align-items: center;" to instantly center any child element horizontally and vertically.',
 practiceLink: '/courses/2'
 },
 {
 id: 'css-3',
 title: '3. CSS Grid Speedrun',
 badge: 'Grid 2D',
 summary: 'Grid excels at 2-dimensional multi-column multi-row layouts with fraction units.',
 code: `.gallery {
 display: grid;
 grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
 gap: 20px;
}

.featured-item {
 grid-column: span 2; /* Spans 2 grid columns */
}`,
 proTip: 'The "repeat(auto-fit, minmax(250px, 1fr))" formula creates a fully responsive column layout without writing media queries!',
 practiceLink: '/courses/2'
 },
 {
 id: 'css-4',
 title: '4. Specificity & Hierarchy',
 badge: 'Cascade',
 summary: 'When conflicting rules apply, CSS calculates specificity: Inline style (1000) > ID (100) > Class (10) > Element (1).',
 code: `/* Specificity: (0, 0, 1) */
p { color: white; }

/* Specificity: (0, 1, 0) - Overrides element */
.hero-text { color: #facc15; }

/* Specificity: (1, 0, 0) - Overrides class */
#boss-title { color: #ef4444; }`,
 proTip: 'Avoid "!important" whenever possible. Instead, increase specificity with descriptive class combinations.',
 practiceLink: '/courses/2'
 },
 {
 id: 'css-5',
 title: '5. Positioning & Stacking',
 badge: 'Positioning',
 summary: 'Take control of flow with relative, absolute, fixed, and sticky positioning.',
 code: `.parent-card {
 position: relative; /* Anchor for absolute children */
}

.badge {
 position: absolute;
 top: 10px;
 right: 10px;
 z-index: 10;
}`,
 proTip: 'An absolute child positions itself relative to the nearest ancestor with position other than "static".',
 practiceLink: '/courses/2'
 }
]

const JS_LESSONS: CrashCard[] = [
 {
 id: 'js-1',
 title: '1. Variables: const & let',
 badge: 'Syntax Core',
 summary: 'Store values with const (immutable re-assignment) or let (re-assignable). Forget var in modern code.',
 code: `const heroName = "PixelKnight"; // Cannot be re-assigned
let healthPoints = 100; // Can change

healthPoints -= 25; // Now 75
console.log(\`Hero: \${heroName}, HP: \${healthPoints}\`);`,
 proTip: 'Default to "const" for everything. Only switch to "let" if you know the value needs to be re-assigned later.',
 practiceLink: '/courses/3'
 },
 {
 id: 'js-2',
 title: '2. Arrow Functions',
 badge: 'Functions',
 summary: 'Arrow functions provide concise syntax and inherit the "this" context from their enclosing lexical scope.',
 code: `// Concise one-liner with implicit return
const calculateXP = (level, multiplier = 10) => level * multiplier;

console.log(calculateXP(5)); // Output: 50

// Multi-line arrow function
const heal = (hp, amount) => {
 const newHp = Math.min(100, hp + amount);
 return newHp;
};`,
 proTip: 'Arrow functions do not bind their own "this", making them ideal for callbacks and array iterator methods.',
 practiceLink: '/courses/3'
 },
 {
 id: 'js-3',
 title: '3. Array Power Methods',
 badge: 'Arrays',
 summary: 'Master the big 3 array methods: .map() (transform), .filter() (select), and .reduce() (accumulate).',
 code: `const party = [
 { name: 'Arthur', role: 'Knight', hp: 90 },
 { name: 'Merlin', role: 'Mage', hp: 45 },
 { name: 'Robin', role: 'Archer', hp: 70 }
];

// Transform to names array
const names = party.map(member => member.name);

// Filter high HP members
const sturdy = party.filter(member => member.hp >= 70);

// Sum total party HP
const totalHp = party.reduce((sum, member) => sum + member.hp, 0);`,
 proTip: '.map() and .filter() return brand new arrays and never mutate the original source array.',
 practiceLink: '/courses/3'
 },
 {
 id: 'js-4',
 title: '4. Destructuring & Spread',
 badge: 'Modern Syntax',
 summary: 'Unpack values from arrays or properties from objects into distinct variables cleanly.',
 code: `// Object Destructuring
const hero = { id: 1, name: 'Arthur', stats: { atk: 50, def: 30 } };
const { name, stats: { atk } } = hero;

// Spread Operator (...)
const baseGear = ['Shield', 'Boots'];
const fullInventory = ['Sword', ...baseGear, 'Potion'];

// Cloning & Merging Objects
const updatedHero = { ...hero, title: 'Champion' };`,
 proTip: 'Use object destructuring in function parameter lists: "const greet = ({ name, rank }) => ..." for clean APIs.',
 practiceLink: '/courses/3'
 },
 {
 id: 'js-5',
 title: '5. Async / Await & Fetch',
 badge: 'Async JS',
 summary: 'Fetch data and handle asynchronous operations cleanly without callback hell.',
 code: `async function loadPlayerData(playerId) {
 try {
 const res = await fetch(\`/api/player/\${playerId}\`);
 if (!res.ok) throw new Error('Player not found');
 
 const data = await res.json();
 console.log('Player loaded:', data);
 return data;
 } catch (error) {
 console.error('Fetch error:', error.message);
 }
}`,
 proTip: 'Always wrap "await" calls in a "try...catch" block to gracefully handle network failures or rejected promises.',
 practiceLink: '/courses/3'
 }
]

export default function CrashCoursePage() {
 const [activeTrack, setActiveTrack] = useState<'html' | 'css' | 'js'>('html')
 const [copiedId, setCopiedId] = useState<string | null>(null)

 const handleCopy = (id: string, text: string) => {
 navigator.clipboard.writeText(text)
 setCopiedId(id)
 toast.success('Code copied to clipboard!')
 setTimeout(() => setCopiedId(null), 2000)
 }

 const currentLessons = activeTrack === 'html' ? HTML_LESSONS : activeTrack === 'css' ? CSS_LESSONS : JS_LESSONS

 return (
 <div className="min-h-screen pb-16 font-game">
 {/* Hero Banner */}
 <div className="relative">
 <Image
 src="/hero7.gif"
 alt="Crash Course Banner"
 width={1920}
 height={400}
 priority
 sizes="100vw"
 className="w-full object-cover h-[350px] md:h-[400px]"
 />
 <div
 style={textShadow}
 className="absolute top-0 h-full w-full pt-16 md:pt-24 px-6 md:px-20 lg:px-36 bg-linear-to-r from-black/85 via-black/60 to-transparent flex flex-col justify-center"
 >
 <h1 className="text-5xl md:text-7xl font-game text-white tracking-wide">
 Crash Courses
 </h1>
 <p className="text-xl md:text-3xl text-zinc-300 mt-2 max-w-2xl font-game">
 Bite-sized visual lessons, syntax examples, and pro tips to level up your HTML, CSS, and JavaScript skills fast!
 </p>
 </div>
 </div>

 {/* Main Container */}
 <div className="max-w-6xl mx-auto px-4 md:px-8 mt-10">
 {/* Track Selector Tabs */}
 <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-10">
 <Button
 onClick={() => setActiveTrack('html')}
 variant="pixel"
 className={`text-xl md:text-2xl font-game py-6 px-8 cursor-pointer transition-all ${
 activeTrack === 'html'
 ? 'bg-orange-500 text-white border-4 border-b-8 border-orange-700'
 : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-4 border-b-8 border-zinc-950'
 }`}
 >
 HTML Crash Course
 </Button>

 <Button
 onClick={() => setActiveTrack('css')}
 variant="pixel"
 className={`text-xl md:text-2xl font-game py-6 px-8 cursor-pointer transition-all ${
 activeTrack === 'css'
 ? 'bg-cyan-500 text-black border-4 border-b-8 border-cyan-700'
 : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-4 border-b-8 border-zinc-950'
 }`}
 >
 CSS Crash Course
 </Button>

 <Button
 onClick={() => setActiveTrack('js')}
 variant="pixel"
 className={`text-xl md:text-2xl font-game py-6 px-8 cursor-pointer transition-all ${
 activeTrack === 'js'
 ? 'bg-yellow-400 text-black border-4 border-b-8 border-yellow-600'
 : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-4 border-b-8 border-zinc-950'
 }`}
 >
 JavaScript Crash Course
 </Button>
 </div>

 {/* Track Introduction Strip */}
 <div className="bg-zinc-900 border-2 border-zinc-800 rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
 <div>
 <h2 className="text-3xl text-white">
 {activeTrack === 'html'
 ? 'HTML: The Skeleton of the Web'
 : activeTrack === 'css'
 ? 'CSS: The Design & Responsive Layout Engine'
 : 'JavaScript: The Brain & Dynamic Interaction'}
 </h2>
 <p className="text-zinc-400 text-base mt-1">
 {activeTrack === 'html'
 ? 'Master the core building blocks, tags, forms, and semantic document anatomy.'
 : activeTrack === 'css'
 ? 'Learn Flexbox, Grid, specificity, positioning, and modern responsive rules.'
 : 'Level up on modern variables, closures, arrow functions, array methods, and async/await.'}
 </p>
 </div>

 <div className="flex items-center gap-3 shrink-0">
 <Link href={activeTrack === 'html' ? '/quizzes/html' : activeTrack === 'css' ? '/quizzes/css' : '/quizzes/javascript'}>
 <Button variant="pixel" className="text-lg font-game py-4 px-6 bg-yellow-400 hover:bg-yellow-500 text-black border-4 border-b-8 border-yellow-600">
 Test in Quiz
 </Button>
 </Link>
 </div>
 </div>

 {/* Lesson Cards Stack */}
 <div className="space-y-8">
 {currentLessons.map((lesson) => (
 <div
 key={lesson.id}
 className="bg-zinc-900 border-4 border-zinc-800 rounded-2xl p-6 md:p-8 hover:border-zinc-700 transition-all shadow-xl"
 >
 <div className="flex items-center justify-between gap-4 mb-3">
 <h3 className="text-3xl text-white">{lesson.title}</h3>
 <span className="text-xs font-mono uppercase bg-zinc-800 text-yellow-400 border border-yellow-500/40 px-3 py-1 rounded-full">
 {lesson.badge}
 </span>
 </div>

 <p className="text-lg text-zinc-300 mb-5 leading-relaxed font-sans">
 {lesson.summary}
 </p>

 {/* Code Snippet Box */}
 <div className="relative rounded-xl bg-black/90 border-2 border-zinc-800 p-4 md:p-5 mb-5 shadow-inner">
 <button
 onClick={() => handleCopy(lesson.id, lesson.code)}
 className="absolute top-3 right-3 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1.5 rounded-lg border border-zinc-700 flex items-center gap-1.5 font-game transition-colors cursor-pointer"
 >
 {copiedId === lesson.id ? (
 <>
 <Check className="w-3.5 h-3.5 text-emerald-400" />
 <span>Copied!</span>
 </>
 ) : (
 <>
 <Copy className="w-3.5 h-3.5" />
 <span>Copy</span>
 </>
 )}
 </button>

 <pre className="font-mono text-sm md:text-base text-yellow-300 overflow-x-auto pr-16">
 <code>{lesson.code}</code>
 </pre>
 </div>

 {/* Pro Tip Callout */}
 <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-start gap-3">
 <Sparkles className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
 <p className="text-sm md:text-base text-yellow-200 font-sans">
 <strong className="font-game text-yellow-400">Pro-Tip: </strong>
 {lesson.proTip}
 </p>
 </div>
 </div>
 ))}
 </div>

 </div>
 </div>
 )
}
