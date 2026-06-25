"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, GitBranch, Home } from "lucide-react";
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
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/40">
              {active.label}
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-white">
              {active.title}
            </h1>

            <p className="mt-4 text-lg text-white/60">{active.description}</p>

            <div className="mt-10 flex flex-col gap-8">
              {active.body.map((block, i) => (
                <section key={i}>
                  {block.heading && (
                    <h2 className="mb-3 text-xl font-semibold text-white">
                      {block.heading}
                    </h2>
                  )}
                  <p className="text-base leading-relaxed text-white/70">
                    {block.text}
                  </p>
                </section>
              ))}
            </div>

            {active.image && (
              <div className="mt-12 flex justify-center">
                <Image
                  src={active.image.src}
                  alt={active.image.alt}
                  width={900}
                  height={600}
                  className="h-auto w-full max-w-3xl rounded-2xl"
                />
              </div>
            )}

            {active.googlePlay && (
              <div className="mt-10">
                <GooglePlayButton href={GOOGLE_PLAY_URL} />
              </div>
            )}

            {active.steps && active.steps.length > 0 && (
              <ol className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-10">
                {active.steps.map((step, i) => (
                  <li key={i} className="flex gap-4">
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
                  </li>
                ))}
              </ol>
            )}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
