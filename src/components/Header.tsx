"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, whatsappLink } from "@/lib/site";
import { Icon } from "./icons";
import ThemePicker, { ThemeList } from "./ThemePicker";

export function Logo() {
  return (
    <Link href="/" aria-label="AXORION home" className="flex min-h-11 items-center gap-2 text-lg font-bold tracking-tight sm:text-xl">
      <Image src="/logo-mark.png" alt="" width={456} height={278} priority className="h-7 w-auto sm:h-8" />
      AXORION
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-xl">
      <div className="container-x flex h-16 items-center justify-between gap-3">
        <Logo />
        <nav className="hidden items-center gap-1 text-sm lg:flex" aria-label="Main">
          {nav.map((n) => {
            const active = path === n.href || path.startsWith(`${n.href}/`);
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-lg px-3 py-2 transition-colors hover:bg-surface2 hover:text-fg ${active ? "text-fg" : "text-muted"}`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <ThemePicker className="hidden lg:block" />
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost hidden !min-h-10 !py-2 xl:inline-flex">
            WhatsApp
          </a>
          <Link href="/contact" className="btn btn-primary !min-h-10 !px-4 !py-2 !text-sm">
            Start a Project
          </Link>
          <button
            className="btn btn-ghost !min-h-10 !px-3 !py-2 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? "close" : "menu"} size={20} />
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto border-t border-line bg-bg lg:hidden">
          <div className="container-x flex flex-col py-4">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-line py-4 text-lg font-medium">
                {n.label}
                <Icon name="arrow" size={18} className="text-muted" />
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-line py-4 text-lg font-medium">
              Contact <Icon name="arrow" size={18} className="text-muted" />
            </Link>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-6 w-full">WhatsApp</a>
            <p className="mb-2 mt-6 text-xs font-semibold uppercase tracking-widest text-muted">Colour theme</p>
            <ThemeList />
          </div>
        </nav>
      )}
    </header>
  );
}
