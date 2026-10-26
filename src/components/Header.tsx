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
    <Link href="/" aria-label="AXORION home" className="flex min-h-11 shrink-0 items-center gap-1.5 text-base font-bold tracking-tight sm:gap-2 sm:text-xl">
      <Image src="/logo-mark.png" alt="" width={456} height={278} priority className="h-6 w-auto sm:h-8" />
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
    <header className="sticky top-0 z-50 border-b border-line">
      <div className="absolute inset-0 -z-10 bg-bg/80 backdrop-blur-xl" aria-hidden />
      <div className="container-x flex h-16 !max-w-[80rem] items-center justify-between gap-2 sm:gap-3">
        <Logo />
        <nav className="hidden items-center gap-0.5 text-sm xl:flex" aria-label="Main">
          {nav.map((n) => {
            const active = path === n.href || path.startsWith(`${n.href}/`);
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-lg px-2.5 py-2 transition-colors hover:bg-surface2 hover:text-fg ${active ? "text-fg" : "text-muted"}`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <ThemePicker className="hidden xl:block" />
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost hidden !min-h-10 !py-2 2xl:inline-flex">
            WhatsApp
          </a>
          <Link href="/contact" className="btn btn-primary !min-h-10 !px-3 !py-2 !text-[13px] sm:!px-4 sm:!text-sm">
            Get a Quote
          </Link>
          <button
            className="btn btn-ghost !min-h-10 !px-3 !py-2 xl:hidden"
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
        <nav id="mobile-nav" aria-label="Mobile" className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto border-t border-line bg-bg xl:hidden">
          <div className="container-x flex flex-col py-4">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-line py-4 text-lg font-medium">
                {n.label}
                <Icon name="arrow" size={18} className="text-muted" />
              </Link>
            ))}
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-6 w-full">WhatsApp</a>
            <p className="mb-2 mt-6 text-xs font-semibold uppercase tracking-widest text-muted">Colour theme</p>
            <ThemeList />
          </div>
        </nav>
      )}
    </header>
  );
}
