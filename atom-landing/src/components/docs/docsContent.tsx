import {
  BookOpen,
  Sparkles,
  Layers,
  MessageSquare,
  Brain,
  Rocket,
  Download,
  Cpu,
  Smartphone,
  Palette,
  AudioLines,
  Code,
  Server,
  Database,
  Boxes,
  Eye,
  Braces,
  Globe,
  Triangle,
  Atom,
  FileCode,
  Wind,
  Zap,
  Box,
  Component,
  type LucideIcon,
} from "lucide-react";

export type DocBlock = {
  heading?: string;
  text?: string;
  /** Optional illustration rendered inline, in the flow of the body. */
  image?: { src: string; alt: string };
};

export type DocStep = {
  title: string;
  text: string;
};

export type TechItem = {
  name: string;
  detail: string;
  icon: LucideIcon;
};

export type TechGroup = {
  category: string;
  icon: LucideIcon;
  items: TechItem[];
};

export type DocLink = {
  title: string;
  description: string;
};

export type DocSection = {
  id: string;
  label: string;
  icon: LucideIcon;
  title: string;
  description: string;
  body: DocBlock[];
  steps?: DocStep[];
  /** Grouped technology stack rendered as a grid of cards with icons. */
  tech?: TechGroup[];
  /** Reference links rendered as a list of cards. */
  links?: DocLink[];
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
    title: "Atom — Multi-Layer Action Agent with Generative AI",
    description:
      "An advanced ecosystem designed to simplify interaction with mobile devices.",
    body: [
      {
        text: "Atom is an advanced ecosystem designed to simplify interaction with mobile devices by automating complex workflows through natural language.",
      },
      {
        text: "Instead of navigating endless menus and settings, you simply tell Atom what you want — and it understands, plans, and executes the task across your Android device.",
      },
      {
        heading: "The mission",
        text: "Atom is developed with the goal of improving technological accessibility and reducing the digital divide through AI. It centralizes control of your device in an intelligent assistant with self-learning capabilities.",
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
      {
        // Imagen colocada en el medio: texto → imagen → texto.
        image: {
          src: "/instructionsATOM.png",
          alt: "How Atom interprets a command and acts on the device",
        },
      },
      {
        heading: "From words to actions",
        text: "When you speak to Atom, a multimodal model turns your audio into intent, a vision model reads the current screen, and an action layer drives the interface — tapping, scrolling, and typing — exactly as a person would.",
      },
      {
        heading: "Designed to disappear",
        text: "The best assistant is the one you forget is there. Atom stays out of the way until you need it, then resolves multi-step tasks in seconds so you can get back to what matters.",
      },
    ],
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
    id: "tech-stack",
    label: "Tech Stack",
    icon: Cpu,
    title: "Tech Stack",
    description:
      "The technologies that power Atom across the mobile client, AI layer, and data.",
    body: [
      {
        text: "Atom combines a native Android client, an NVIDIA-accelerated AI inference layer, and a hybrid persistence model. The stack is grouped below by responsibility.",
      },
    ],
    tech: [
      {
        category: "Frontend (Mobile)",
        icon: Smartphone,
        items: [
          {
            name: "Android SDK (Java 21)",
            detail: "Fully native client built on the modern Android SDK.",
            icon: Smartphone,
          },
          {
            name: "Material Design 3",
            detail:
              'XML UI with a minimalist "Pure Black" (#0A0A0C) approach.',
            icon: Palette,
          },
          {
            name: "Lottie for Android",
            detail: "Fluid, vector-based interface transitions and animations.",
            icon: AudioLines,
          },
        ],
      },
      {
        category: "Artificial Intelligence",
        icon: Brain,
        items: [
          {
            name: "NVIDIA NIM",
            detail:
              "Inference microservices infrastructure for optimized models.",
            icon: Server,
          },
          {
            name: "Gemma 4 — Orchestrator",
            detail: "Multimodal audio-to-intent processing.",
            icon: AudioLines,
          },
          {
            name: "Qwen 3.5 Coder-VL — Developer",
            detail:
              "Interface vision analysis and dynamic code generation.",
            icon: Eye,
          },
        ],
      },
      {
        category: "Persistence & Data",
        icon: Database,
        items: [
          {
            name: "PostgreSQL / Supabase",
            detail: "Profile management and personalization (SQL).",
            icon: Database,
          },
          {
            name: "ChromaDB",
            detail:
              "Vector store for mathematical representations of workflows.",
            icon: Boxes,
          },
          {
            name: "Java 21 + Project Loom",
            detail: "Virtual Threads for massive orchestration concurrency.",
            icon: Code,
          },
        ],
      },
      {
        category: "Landing Web",
        icon: Globe,
        items: [
          {
            name: "Next.js 16",
            detail: "React framework with App Router and Turbopack.",
            icon: Triangle,
          },
          {
            name: "React 19",
            detail: "Component-based UI library powering the interface.",
            icon: Atom,
          },
          {
            name: "TypeScript",
            detail: "Static typing across the entire landing codebase.",
            icon: FileCode,
          },
          {
            name: "Tailwind CSS 4",
            detail: "Utility-first styling with a Pure Black design system.",
            icon: Wind,
          },
          {
            name: "Motion",
            detail: "Declarative animations and section transitions.",
            icon: Zap,
          },
          {
            name: "GSAP",
            detail: "High-performance, timeline-based motion effects.",
            icon: Sparkles,
          },
          {
            name: "Three.js / OGL",
            detail: "WebGL-powered 3D and interactive visuals.",
            icon: Box,
          },
          {
            name: "Radix UI",
            detail: "Accessible, unstyled primitives behind the components.",
            icon: Component,
          },
        ],
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
      {
        heading: "Skills that write themselves",
        text: "Through Dynamic Class Loading, the developer AI can generate, compile, and run brand-new skills on the fly — so Atom keeps growing without waiting for an app update.",
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
    id: "development-setup",
    label: "Development Setup",
    icon: Braces,
    title: "Development Environment",
    description: "Everything you need to deploy the Atom backend locally.",
    body: [
      {
        text: "To deploy the development environment, the following components are required. Atom's orchestration and AI bridge run as separate services, so make sure each prerequisite is in place before starting.",
      },
    ],
    steps: [
      {
        title: "Java Development Kit (JDK) 21",
        text: "Required for the orchestration layer, which relies on Virtual Threads (Project Loom) for concurrency.",
      },
      {
        title: "Python 3.13",
        text: "Install Python 3.13 with all project dependencies for the natural language processing bridge.",
      },
      {
        title: "PostgreSQL",
        text: "Configure a PostgreSQL instance for user persistence and personalization profiles.",
      },
      {
        title: "Internet connection",
        text: "A constant internet connection is needed to consume the NVIDIA NIM inference API.",
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
