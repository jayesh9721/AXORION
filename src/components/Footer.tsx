import Link from "next/link";
import { footerNav, services, site } from "@/lib/site";
import { CookieSettingsButton } from "./Consent";
import { Logo } from "./Header";

export default function Footer() {
  const a = site.address;
  return (
    <footer className="mt-24 border-t border-line">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-muted">{site.tagline}. Web, software, AI &amp; automation.</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Company</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {footerNav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-fg">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Services</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services#${s.slug}`} className="hover:text-fg">{s.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Contact</h3>
          <address className="mt-3 space-y-2 text-sm not-italic text-muted">
            {site.emails.map((e) => (
              <p key={e}><a href={`mailto:${e}`} className="hover:text-fg">{e}</a></p>
            ))}
            <p>
              {a.street}, {a.district},<br />
              {a.region}, {a.country} – {a.postalCode}
            </p>
          </address>
          <div className="social mt-3 flex flex-wrap gap-x-5 text-sm text-muted">
            {site.social.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-fg">{s.label}</a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-2 py-5 text-xs text-muted sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} AXORION. All rights reserved.</p>
          <p className="flex flex-wrap gap-x-5">
            <Link href="/privacy" className="hover:text-fg">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-fg">Terms</Link>
            <CookieSettingsButton />
          </p>
        </div>
      </div>
    </footer>
  );
}
