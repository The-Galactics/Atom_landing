"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ExternalLink, GitBranch, Home } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/animate-ui/components/radix/sidebar";
import {
  docSections,
  GOOGLE_PLAY_URL,
} from "@/components/docs/docsContent";
import GooglePlayButton from "@/components/docs/GooglePlayButton";

type DocsViewProps = {
  initialSection?: string;
};

// Animaciones suaves y reutilizables para el contenido de la documentación.
const easeOut = [0.22, 1, 0.36, 1] as const;

// Contenedor que escalona la entrada de sus hijos.
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: easeOut },
  },
};

// Cada bloque sube y aparece con un leve desenfoque.
const itemVariants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: easeOut },
  },
};

const MotionImage = motion.create(Image);

export default function DocsView({ initialSection }: DocsViewProps) {
  const initialId =
    initialSection && docSections.some((s) => s.id === initialSection)
      ? initialSection
      : docSections[0].id;
  const [activeId, setActiveId] = useState(initialId);
  const active =
    docSections.find((s) => s.id === activeId) ?? docSections[0];

  return (
    <div className="dark min-h-svh bg-black text-white">
      <SidebarProvider>
        <Sidebar collapsible="icon" className="border-white/10">
          <SidebarHeader>
            <Link
              href="/"
              className="flex items-center gap-3 px-2 py-2 transition-opacity hover:opacity-80"
            >
              <Image
                src="/logoAtomBorder.png"
                alt="Atom logo"
                width={16}
                height={26}
                className="h-8 w-8 shrink-0 object-contain"
              />
              <span className="text-lg font-bold tracking-[0.25em] text-white group-data-[collapsible=icon]:hidden">
                ATOM
              </span>
            </Link>
          </SidebarHeader>

          <SidebarSeparator />

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Documentation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {docSections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <SidebarMenuItem key={section.id}>
                        <SidebarMenuButton
                          isActive={section.id === activeId}
                          tooltip={section.label}
                          onClick={() => setActiveId(section.id)}
                        >
                          <Icon />
                          <span>{section.label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Back to home">
                  <Link href="/">
                    <Home />
                    <span>Back to home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="GitHub">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitBranch />
                    <span>GitHub</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>

          <SidebarRail />
        </Sidebar>

        <SidebarInset className="bg-black">
          {/* Top bar */}
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-3 border-b border-white/10 bg-black/80 px-4 backdrop-blur">
            <SidebarTrigger className="text-white/70 hover:text-white" />
            <div className="h-5 w-px bg-white/10" />
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <span className="text-sm text-white/30">/</span>
            <span className="text-sm font-medium text-white/80">Docs</span>
          </header>

          {/* Content */}
          <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-14 sm:px-10">
            {/* Al cambiar de sección, el contenido sale y entra con un escalonado suave */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <motion.p
                  variants={itemVariants}
                  className="text-xs font-bold uppercase tracking-[0.25em] text-white/40"
                >
                  {active.label}
                </motion.p>

                <motion.h1
                  variants={itemVariants}
                  className="mt-3 text-4xl font-bold tracking-tight text-white"
                >
                  {active.title}
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="mt-4 text-lg text-white/60"
                >
                  {active.description}
                </motion.p>

                <div className="mt-10 flex flex-col gap-8">
                  {active.body.map((block, i) => (
                    <motion.section key={i} variants={itemVariants}>
                      {block.heading && (
                        <h2 className="mb-3 text-xl font-semibold text-white">
                          {block.heading}
                        </h2>
                      )}
                      {block.text && (
                        <p className="text-base leading-relaxed text-white/70">
                          {block.text}
                        </p>
                      )}
                      {block.image && (
                        <div className="flex justify-center">
                          <MotionImage
                            src={block.image.src}
                            alt={block.image.alt}
                            width={900}
                            height={600}
                            className="h-auto w-full max-w-2xl rounded-2xl border border-white/10"
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.6,
                              ease: easeOut,
                              delay: 0.1,
                            }}
                          />
                        </div>
                      )}
                    </motion.section>
                  ))}
                </div>

                {active.image && (
                  <motion.div
                    variants={itemVariants}
                    className="mt-12 flex justify-center"
                  >
                    <MotionImage
                      src={active.image.src}
                      alt={active.image.alt}
                      width={900}
                      height={600}
                      className="h-auto w-full max-w-3xl rounded-2xl"
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, ease: easeOut, delay: 0.1 }}
                    />
                  </motion.div>
                )}

                {active.tech && active.tech.length > 0 && (
                  <div className="mt-12 flex flex-col gap-10">
                    {active.tech.map((group, gi) => {
                      const GroupIcon = group.icon;
                      return (
                        <motion.div
                          key={group.category}
                          variants={itemVariants}
                        >
                          <div className="mb-4 flex items-center gap-2.5">
                            <GroupIcon className="h-5 w-5 text-white/70" />
                            <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-white/80">
                              {group.category}
                            </h2>
                          </div>
                          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {group.items.map((item, ii) => {
                              const ItemIcon = item.icon;
                              return (
                                <motion.div
                                  key={item.name}
                                  className="group flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-white/25 hover:bg-white/[0.05]"
                                  initial={{ opacity: 0, y: 14 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{
                                    duration: 0.4,
                                    ease: easeOut,
                                    delay: 0.2 + gi * 0.1 + ii * 0.06,
                                  }}
                                >
                                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition-transform group-hover:scale-110">
                                    <ItemIcon className="h-5 w-5" />
                                  </span>
                                  <div className="flex flex-col gap-1">
                                    <h3 className="text-sm font-semibold text-white">
                                      {item.name}
                                    </h3>
                                    <p className="text-xs leading-relaxed text-white/55">
                                      {item.detail}
                                    </p>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                {active.links && active.links.length > 0 && (
                  <div className="mt-12 grid gap-3 sm:grid-cols-2">
                    {active.links.map((link, i) => (
                      <motion.a
                        key={link.title}
                        href="#"
                        className="group flex items-start justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-white/25 hover:bg-white/[0.05]"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          ease: easeOut,
                          delay: 0.2 + i * 0.06,
                        }}
                      >
                        <div className="flex flex-col gap-1">
                          <h3 className="text-sm font-semibold text-white">
                            {link.title}
                          </h3>
                          <p className="text-xs leading-relaxed text-white/55">
                            {link.description}
                          </p>
                        </div>
                        <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-white/30 transition-colors group-hover:text-white" />
                      </motion.a>
                    ))}
                  </div>
                )}

                {active.googlePlay && (
                  <motion.div variants={itemVariants} className="mt-10">
                    <GooglePlayButton href={GOOGLE_PLAY_URL} />
                  </motion.div>
                )}

                {active.steps && active.steps.length > 0 && (
                  <motion.ol
                    variants={itemVariants}
                    className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-10"
                  >
                    {active.steps.map((step, i) => (
                      <motion.li
                        key={i}
                        className="flex gap-4"
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          ease: easeOut,
                          delay: 0.3 + i * 0.08,
                        }}
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-sm font-semibold text-white">
                          {i + 1}
                        </span>
                        <div className="flex flex-col gap-1">
                          <h3 className="text-base font-semibold text-white">
                            {step.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-white/60">
                            {step.text}
                          </p>
                        </div>
                      </motion.li>
                    ))}
                  </motion.ol>
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
