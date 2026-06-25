import {
  BookOpen,
  Sparkles,
  Layers,
  MessageSquare,
  Brain,
  Rocket,
  Download,
  type LucideIcon,
} from "lucide-react";

export type DocStep = {
  title: string;
  text: string;
};

export type DocSection = {
  id: string;
  label: string;
  icon: LucideIcon;
  title: string;
  description: string;
  body: { heading?: string; text: string }[];
  steps?: DocStep[];
  /** When true, the Google Play download button is rendered for this section. */
  googlePlay?: boolean;
  /** Optional illustration rendered centered below the section content. */
  image?: { src: string; alt: string };
};

/** The only distribution channel currently available. */
export const GOOGLE_PLAY_URL = "https://play.google.com/store";

/** Section the "Get started" CTA redirects to. */
export const INSTALL_SECTION_ID = "installation";

export const docSections: DocSection[] = [
  {
    id: "introduction",
    label: "Introduction",
    icon: BookOpen,
    title: "Welcome to Atom",
    description:
      "An advanced ecosystem designed to simplify interaction with mobile devices.",
    body: [
      {
        text: "Atom is an advanced ecosystem designed to simplify interaction with mobile devices by automating complex workflows through natural language.",
      },
      {
        text: "Instead of navigating endless menus and settings, you simply tell Atom what you want — and it understands, plans, and executes the task across your Android device.",
      },
    ],
  },
  {
    id: "what-is-atom",
    label: "What is Atom",
    icon: Sparkles,
    title: "What is Atom",
    description: "The intelligent assistant at the core of your device.",
    body: [
      {
        text: "Atom centralizes control of your mobile device in an intelligent assistant with self-learning capabilities. It bridges the gap between human intent and machine action.",
      },
      {
        heading: "Why it matters",
        text: "Modern Android devices are powerful but fragmented. Every manufacturer ships its own customization layer, each with different settings, gestures, and behaviors. Atom abstracts that complexity away into a single, conversational interface.",
      },
    ],
    image: {
      src: "/instructionsATOM.png",
      alt: "How Atom works",
    },
  },
  {
    id: "ecosystem",
    label: "The Fragmentation Problem",
    icon: Layers,
    title: "Solving Android Fragmentation",
    description:
      "One assistant across OneUI, HyperOS, and every customization layer.",
    body: [
      {
        text: "The project addresses the fragmentation and difficulty of multiple Android customization layers — such as OneUI and HyperOS — that make a consistent experience nearly impossible.",
      },
      {
        heading: "A unified layer",
        text: "Atom sits above these differences, translating a single natural-language command into the right actions for whichever ecosystem your device runs. What works on a Samsung also works on a Xiaomi.",
      },
    ],
  },
  {
    id: "natural-language",
    label: "Natural Language",
    icon: MessageSquare,
    title: "Natural Language Control",
    description: "Talk to your phone the way you'd talk to a person.",
    body: [
      {
        text: "Atom understands natural language commands and automates complex tasks across different Android ecosystems. There are no rigid syntaxes or commands to memorize.",
      },
      {
        heading: "From intent to action",
        text: "Describe the outcome you want — Atom interprets the intent, orchestrates the required steps, and executes them in seconds.",
      },
    ],
  },
  {
    id: "self-learning",
    label: "Self-Learning",
    icon: Brain,
    title: "Self-Learning Intelligence",
    description: "An assistant that adapts to you over time.",
    body: [
      {
        text: "Atom is built with self-learning capabilities. The more you use it, the better it understands your habits, preferences, and the way you phrase your requests.",
      },
      {
        heading: "Personalized automation",
        text: "Over time, Atom anticipates recurring workflows and streamlines them, turning repetitive multi-step tasks into a single instruction.",
      },
    ],
  },
  {
    id: INSTALL_SECTION_ID,
    label: "Installation",
    icon: Download,
    title: "Installation",
    description: "Get Atom on your Android device in a few steps.",
    googlePlay: true,
    body: [
      {
        text: "Atom is currently distributed exclusively through the Google Play Store. Installing it takes less than a minute — just tap the button below and follow the steps.",
      },
    ],
    steps: [
      {
        title: "Open Google Play",
        text: "Tap the “Get it on Google Play” button below, or search for “Atom” in the Play Store app on your Android device.",
      },
      {
        title: "Install the app",
        text: "On the Atom listing, tap Install and wait for the download to finish. Atom is free to download.",
      },
      {
        title: "Grant permissions",
        text: "Open Atom and grant the accessibility and automation permissions it needs to act on your behalf. These let Atom execute tasks across your device.",
      },
      {
        title: "Start talking to Atom",
        text: "You're ready. Describe what you want in natural language and let Atom handle the rest.",
      },
    ],
  },
  {
    id: "getting-started",
    label: "Getting Started",
    icon: Rocket,
    title: "Getting Started",
    description: "Bring intelligence to your Android in minutes.",
    body: [
      {
        text: "Getting started with Atom is simple. Install the assistant, grant the permissions it needs to act on your behalf, and start describing what you want done.",
      },
      {
        heading: "Your first command",
        text: 'Try something natural like "turn on battery saver and silence notifications until 8am" and watch Atom handle every step for you.',
      },
    ],
  },
];
