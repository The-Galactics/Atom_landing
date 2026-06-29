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
  Target,
  Compass,
  Workflow,
  Mic,
  ListChecks,
  Type,
  Volume2,
  Milestone,
  Network,
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
        heading: "It listens, plans, and acts",
        text: "Atom doesn't just listen and reply — it creates, plans, and acts. If you don't know how to send an email, Atom learns it by searching and planning the action, coordinating an Orchestrator AI and a Developer AI to get it done, always within a secure environment where you have the final word.",
      },
      {
        heading: "Designed to disappear",
        text: "The best assistant is the one you forget is there. Atom stays out of the way until you need it, then resolves multi-step tasks in seconds so you can get back to what matters.",
      },
      {
        // Imagen final de la sección.
        image: {
          src: "/ATOMsettings.png",
          alt: "Atom adjusting device settings",
        },
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
        text: "The project addresses the fragmentation and difficulty of multiple Android customization layers — such as OneUI, HyperOS, and Nothing OS — that make a consistent experience nearly impossible and raise the learning curve for users without prior knowledge.",
      },
      {
        heading: "A unified layer",
        text: "Atom sits above these differences, translating a single natural-language command into the right actions for whichever ecosystem your device runs. What works on a Samsung also works on a Xiaomi.",
      },
      {
        heading: "Accessibility first",
        text: "By removing customization-layer barriers, Atom also integrates assistive technology for people with limited technological knowledge or disabilities — such as motor or visual impairments — that hinder device interaction.",
      },
    ],
  },
  {
    id: "objectives",
    label: "Objectives",
    icon: Target,
    title: "Project Objectives",
    description:
      "A multi-agent, generative-AI system that centralizes device tasks.",
    body: [
      {
        heading: "General objective",
        text: "To develop a multi-agent system based on generative AI that creates real-time responses, centralizing user tasks into a single point by automating the manual flow for accessing or managing the device through voice or text commands that interpret natural language.",
      },
      {
        text: "The specific objectives are organized across the surfaces that make up the Atom ecosystem.",
      },
    ],
    links: [
      {
        title: "Landing Page",
        description:
          "Main animation, text visuals and transitions, an app download button, and AI management over the website.",
      },
      {
        title: "UX / UI",
        description:
          "A minimalist, intuitive interface with user-interaction animations and fast response times.",
      },
      {
        title: "Database (NoSQL · MongoDB)",
        description:
          "User registration and tiers, Argon2id credential hashing, queries under 100ms, and an AI personalization profile collection (name, nickname, personality).",
      },
      {
        title: "Vector Database",
        description:
          "Source and business-logic storage, plus saved Developer-AI steps the Orchestrator can retrieve.",
      },
      {
        title: "Artificial Intelligence",
        description:
          "Google Gemini APIs, natural-language interpretation, 90% intent-classification accuracy, and a vision / interface-analysis module.",
      },
      {
        title: "Testing",
        description:
          "Unit tests, intensive AI testing, continuous business-logic review, and bug hunting.",
      },
    ],
  },
  {
    id: "scope",
    label: "Scope & Goals",
    icon: Compass,
    title: "Scope & Measurable Goals",
    description: "A focused 6-week cycle with concrete, measurable targets.",
    body: [
      {
        text: "The scope focuses on a multi-layer action agent that centralizes the complexity of different customization layers. In a 6-week cycle, the system creates automation flows from a natural-language instruction, analyzes the device's visual interface in real time, and executes sequences of actions (clicks, gestures, typing) to complete tasks across at least two customization layers — for example OneUI and HyperOS.",
      },
      {
        heading: "In scope",
        text: "An informative landing page leading to the app download, a basic user structure for persistence, audio input answered by chat or text, the Python ↔ Java backend connection, and complete, continuously updated documentation.",
      },
      {
        heading: "Out of scope",
        text: "Multilingual support (the MVP focuses on Spanish first), full user-management logic (only a basic test profile), and payments or monetization.",
      },
    ],
    links: [
      {
        title: "Connectivity",
        description:
          "An always-on internet connection is required to consume external API keys.",
      },
      {
        title: "Operating System",
        description:
          "Android 8.0 Oreo (API 26) or higher for library compatibility.",
      },
      {
        title: "Minimum Hardware",
        description:
          "4GB of RAM or more for AI power and background processing.",
      },
      {
        title: "Base Languages",
        description: "Java 21 and Python 3.12.",
      },
    ],
    steps: [
      {
        title: "Multi-interface execution success",
        text: "By week 6, perform at least 5 system-configuration tasks at a 70% success rate across different customization layers, with no brand-specific code.",
      },
      {
        title: "Self-learning rate",
        text: "Complete 3 entirely new, unprogrammed workflows on the first or second attempt in 70% of cases.",
      },
      {
        title: "Interaction reduction",
        text: "Cut the taps and swipes needed for the 5 base tasks by at least 65% versus manual execution.",
      },
      {
        title: "AI personalization",
        text: "Correctly apply user preferences (nicknames, personality) in at least 85% of generated responses.",
      },
    ],
  },
  {
    id: "roadmap",
    label: "Roadmap",
    icon: Milestone,
    title: "Product Roadmap",
    description:
      "Four sprints from foundation to Play Store launch — traceable to Atom's Jira board.",
    body: [
      {
        text: "Atom's backlog is organized into four sprints and tracked on the Atom Jira board, where every user story maps to a real ATOM-XX key. Story points follow a Fibonacci scale (1, 2, 3, 5, 8), from a very simple task to one of significantly higher complexity.",
      },
    ],
    steps: [
      {
        title: "Sprint 1 — Foundation & Connectivity",
        text: "Establish the base infrastructure, the Java–Python bridge, and initial voice/text capture: landing layout, a minimalist Android UI, domain entities and hexagonal ports, the gRPC bridge, a base STT/TTS voice module, password hashing, and global validation & exception handling.",
      },
      {
        title: "Sprint 2 — Functionality & Connections",
        text: "Wire the services together (Android client ↔ Python AI service), enable the vector database, and build the action-inference flow: an accessibility service for gesture injection, mobile adapters, an embeddings module, STT/TTS exposed over a local API, and an external-API fallback orchestrator.",
      },
      {
        title: "Sprint 3 — Polishing & Quality",
        text: "Refine the experience: real-time screen reading, gesture automation on third-party apps, private local history, semantic memory search in Qdrant, a unified natural TTS voice, and a hands-free “ATOM” wake word.",
      },
      {
        title: "Sprint 4 — QA, Testing & Deployment",
        text: "Stabilize the MVP: device-integrity and anti-fraud security, email authentication with MongoDB profiles, multi-OEM compatibility (HyperOS, Oppo, Vivo…), stress testing, the Google Play beta launch, and stabilization documentation.",
      },
    ],
  },
  {
    id: "tech-stack",
    label: "Tech Stack",
    icon: Cpu,
    title: "Tech Stack",
    description:
      "The technologies that power Atom across the mobile client, backend, AI layer, and data.",
    body: [
      {
        text: "Atom combines a native Android client built on a hexagonal core, a Python FastAPI AI service orchestrated with LangGraph, Google Gemini models, and a document + vector persistence layer — all engineered around a sub-4-second response goal. The stack is grouped below by responsibility.",
      },
    ],
    tech: [
      {
        category: "Frontend (Mobile)",
        icon: Smartphone,
        items: [
          {
            name: "Android SDK (Java 21)",
            detail:
              "Fully native client (min. Android 8 Oreo, targeting Android 15) with direct access to accessibility services and hardware.",
            icon: Smartphone,
          },
          {
            name: "Material Design 3",
            detail:
              'XML UI with a minimalist "Pure Black" (#0A0A0C) approach optimized for OLED.',
            icon: Palette,
          },
          {
            name: "ViewModel + LiveData",
            detail:
              "Lifecycle-aware UI state and real-time voice streams, exposing ephemeral transcriptions to the view reactively.",
            icon: Zap,
          },
          {
            name: "Custom Canvas Views",
            detail:
              "AtomCoreView animates the core at 60fps with Canvas radial/sweep gradients — no external animation dependency.",
            icon: AudioLines,
          },
          {
            name: "Geist Serif & Lora",
            detail:
              "Geist Serif for titles and Lora for body — technical elegance with high legibility.",
            icon: Type,
          },
        ],
      },
      {
        category: "Backend & AI Service (Python)",
        icon: Workflow,
        items: [
          {
            name: "FastAPI + Uvicorn",
            detail:
              "Python 3.12 AI service exposing the agent asynchronously and with high performance.",
            icon: Server,
          },
          {
            name: "gRPC (proto3)",
            detail:
              "Low-latency binary transport on port 50051 (ai.proto / AtomAgentService) with streaming.",
            icon: Network,
          },
          {
            name: "LangChain + LangGraph",
            detail:
              "A graph of specialized agents that classify intents, plan, and execute tasks with robust state.",
            icon: Workflow,
          },
          {
            name: "Hexagonal Architecture",
            detail:
              "Domain / application / adapters / infrastructure decoupling that keeps the business core isolated.",
            icon: Boxes,
          },
          {
            name: "Semantic Skill Memory",
            detail:
              "Generated skills stored as vectors in Qdrant and reused by similarity — no retraining or restart.",
            icon: Code,
          },
        ],
      },
      {
        category: "Artificial Intelligence",
        icon: Brain,
        items: [
          {
            name: "Google Gemini 3.1 Flash Lite",
            detail:
              "Multimodal brain: intent classification, vision, planning, and LangGraph coordination.",
            icon: Eye,
          },
          {
            name: "gemini-embedding-2",
            detail:
              "Generates the embeddings powering semantic search, with native Google Search grounding.",
            icon: Boxes,
          },
          {
            name: "faster-whisper (STT)",
            detail:
              "Backend-local speech-to-text (small model, int8 on CPU) — low-cost and privacy-controlled.",
            icon: AudioLines,
          },
        ],
      },
      {
        category: "Text-to-Speech",
        icon: Volume2,
        items: [
          {
            name: "Kokoro (self-hosted)",
            detail:
              "CPU voice synthesis served at /v1/audio/speech (af_heart) — natural voice, no per-character cost.",
            icon: Volume2,
          },
          {
            name: "Android Native TTS",
            detail:
              "Offline, SDK-level fallback with sub-100ms latency for quick confirmations.",
            icon: Smartphone,
          },
        ],
      },
      {
        category: "Persistence & Data",
        icon: Database,
        items: [
          {
            name: "MongoDB (motor)",
            detail:
              "Async document store for profiles and personalization, with Argon2id hashing and JWT RS256 auth.",
            icon: Database,
          },
          {
            name: "Qdrant",
            detail:
              "Vector store for the memory and skills collections, retrieving workflows by semantic similarity.",
            icon: Boxes,
          },
          {
            name: "Redis",
            detail:
              "Session storage backing JWT authentication and Google OIDC sign-in.",
            icon: Server,
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
    id: "architecture",
    label: "Architecture",
    icon: Workflow,
    title: "System Architecture",
    description:
      "A hexagonal core inside the Android client, isolated from the outside world.",
    body: [
      {
        text: "Atom's hexagonal core lives inside the Android client itself (Java 21, with manual dependency injection via AppContainer — no Spring). It is split into domain, application, infrastructure, and presentation, where dependencies point inward only: the domain depends on nothing, and nothing inner imports from the outer layers.",
      },
      {
        heading: "Request flow",
        text: "A request travels from the client through an in-process call into the SecurityController (an inbound adapter), through the application's input ports and use-cases (input validation, device security, command execution, and chat), down to the domain models and business exceptions, and back out through the output ports.",
      },
      {
        heading: "Outbound adapters",
        text: "Output ports are implemented by infrastructure adapters: an InteractionGrpcAdapter that talks to the external Python AI service via the ai.proto / AtomAgentService contract, a DeviceInspectorAdapter for the device environment, an Argon2 password-encoder adapter for security, and MongoDB for persistence through the Python backend service.",
      },
      {
        heading: "Cross-cutting security",
        text: "A DeviceSecurityAspect (@SecureOperation) validates integrity around the use-cases, and a dedicated security exception handler keeps error responses consistent at the controller boundary.",
      },
    ],
  },
  {
    id: "design-system",
    label: "Design System",
    icon: Palette,
    title: "Visual Identity",
    description: "Typography, color, and the principles behind Atom's calm UI.",
    body: [
      {
        text: "The visual identity is built to meet Atom's minimalist standards and provide a non-suffocating interaction between the user and the app.",
      },
      {
        heading: "Typography",
        text: "Geist Serif is used for titles, function names, and landing headings — technical elegance with an immediate visual hierarchy. Lora is used for assistant responses, long descriptions, and guides, optimized for comfortable, prolonged reading.",
      },
      {
        heading: "Design principles",
        text: "Extreme simplicity: no more than three actionable elements per view. Negative space is prioritized so text can breathe and information never feels cluttered.",
      },
    ],
    links: [
      {
        title: "Pure Black · #0A0A0C",
        description:
          "Background optimized for OLED screens — eliminates distractions and saves energy.",
      },
      {
        title: "White · #FFFFFF",
        description:
          "Main text, providing the maximum 21:1 contrast ratio for effortless reading.",
      },
      {
        title: "Steel Gray · #A1A1A1",
        description:
          "Metadata and less critical information, preserving the reading hierarchy.",
      },
      {
        title: "Lavender · #B794F4",
        description: "Reserved exclusively for immediate-interaction buttons.",
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
        text: "New skills and flows are stored as vectors in a semantic skill memory (Qdrant). The LangGraph agents retrieve and reuse them by similarity, so Atom keeps growing without retraining or restarting the service.",
      },
    ],
  },
  {
    id: "interactions",
    label: "Interactions",
    icon: Mic,
    title: "Voice & Interaction Design",
    description:
      "The quality-of-life details that keep the main screen and overlay in sync.",
    body: [
      {
        text: "Atom's main screen and floating overlay share a small set of polished interactions. Every state change routes through the same helpers, so the atom core, status text, and sub-status always stay in sync.",
      },
    ],
    steps: [
      {
        title: "Microphone mute",
        text: "Long-press the mic to toggle a persisted mute. The core desaturates and dims so a muted mic reads differently from the vivid idle state.",
      },
      {
        title: "Tap-to-cancel",
        text: "Tap the mic while a recognition is in flight to cancel it, stop the pulse, and settle the core back to idle.",
      },
      {
        title: "Send gating",
        text: "The send button only enables when there's non-whitespace text, and dims when disabled as the primary affordance.",
      },
      {
        title: "Haptic feedback",
        text: "Distinct haptics confirm a mic tap, a mute long-press, and a successful send.",
      },
      {
        title: "Error auto-recovery",
        text: "After an error, the status line eases back to idle on its own — unless you've already started a new request.",
      },
      {
        title: "Overlay parity",
        text: "The floating bubble mirrors the main screen; muting on either surface instantly updates the other, since both share one preferences file.",
      },
    ],
  },
  {
    id: "requirements",
    label: "Requirements",
    icon: ListChecks,
    title: "Functional & Non-Functional Requirements",
    description: "What the MVP must do — and the qualities it must uphold.",
    body: [
      {
        text: "The requirements below frame the MVP: functional requirements describe what Atom does, while non-functional requirements set the bar for how it behaves.",
      },
    ],
    links: [
      {
        title: "Multimodal input",
        description:
          "Capture a request by text or voice and interpret it to provide a response.",
      },
      {
        title: "Adaptive responses",
        description:
          "Reply with text or speech depending on the assistant's configuration.",
      },
      {
        title: "Autonomous control",
        description:
          "Handle touch input and read the device screen to interact autonomously.",
      },
      {
        title: "Activation",
        description:
          "Launch via a wake command or by triggering the floating bubble.",
      },
      {
        title: "Task confirmation",
        description:
          "Confirm a completed autonomous task visually or by audio.",
      },
      {
        title: "Personalization",
        description:
          "Configure name, nicknames, and personality in 3 minutes or less.",
      },
      {
        title: "Privacy guardrails",
        description:
          "Identify sensitive apps (e.g. banking) to protect privacy and security.",
      },
      {
        title: "Permission disclosure",
        description:
          "Disclose the assistant's accessibility permissions clearly.",
      },
      {
        title: "Workflow memory",
        description:
          "Save the steps of a successful new flow and link them to the instruction.",
      },
    ],
    steps: [
      {
        title: "Simple navigation",
        text: "Reach or configure important settings in a maximum of 3 buttons.",
      },
      {
        title: "Minimalist UI",
        text: "Follow minimalist principles to reduce cognitive load, with integrated assistive technology.",
      },
      {
        title: "Availability",
        text: "Function correctly on a minimum 3G internet connection.",
      },
      {
        title: "Performance",
        text: "Keep the time between request and action under 4 seconds.",
      },
      {
        title: "Security",
        text: "Hash passwords with Argon2id to protect user privacy.",
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
        text: "Required to build the native Android client and its hexagonal core.",
      },
      {
        title: "Python 3.12",
        text: "Install Python 3.12 with the FastAPI AI-service dependencies (LangChain/LangGraph and faster-whisper).",
      },
      {
        title: "MongoDB & Qdrant",
        text: "Run MongoDB for user persistence and Qdrant for the vector skill memory (Redis backs the auth sessions).",
      },
      {
        title: "Internet connection",
        text: "A constant internet connection is needed to consume the Google Gemini API.",
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
