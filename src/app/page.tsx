import Link from "next/link";
import { Zap, ArrowRight, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background-primary">
      <header className="border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-cyan/10">
              <Zap className="h-5 w-5 text-accent-cyan" />
            </div>
            <span className="text-lg font-semibold text-text-primary">
              LitSignal
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/sign-in"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Sign in
            </Link>
            <Link href="/sign-up">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent-cyan/10 px-3 py-1 text-sm text-accent-cyan mb-6">
            <Zap className="h-4 w-4" />
            Litigation Intelligence Platform
          </div>
          <h1 className="text-5xl font-bold text-text-primary leading-tight mb-6">
            Turn Lawsuit Filings Into{" "}
            <span className="text-accent-cyan">Qualified Leads</span>
          </h1>
          <p className="text-xl text-text-secondary mb-8 leading-relaxed">
            When companies get sued, their competitors feel exposed. LitSignal
            captures this moment of elevated risk awareness to generate
            high-intent prospects for D&O, EPLI, and cyber liability coverage.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/sign-up">
              <Button size="lg">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button variant="secondary" size="lg">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-background-secondary">
              <div className="h-12 w-12 rounded-lg bg-accent-cyan/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-accent-cyan" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Trigger Events
              </h3>
              <p className="text-text-secondary">
                Lawsuit filings create urgency. We monitor federal courts and
                alert you to companies facing D&O, EPLI, and cyber liability
                exposure.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-background-secondary">
              <div className="h-12 w-12 rounded-lg bg-accent-cyan/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-accent-cyan" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Peer Companies
              </h3>
              <p className="text-text-secondary">
                The sued company already has coverage. We identify peer
                companies watching the lawsuit unfold, ready to evaluate their
                own protection.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-background-secondary">
              <div className="h-12 w-12 rounded-lg bg-accent-cyan/10 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-accent-cyan" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Enriched Dossiers
              </h3>
              <p className="text-text-secondary">
                Every prospect comes with company data, executive contacts, and
                coverage gap analysis. Ready for outreach in minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
          <p className="text-sm text-text-muted">
            © 2026 LitSignal. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-text-muted">
            <Link href="/privacy" className="hover:text-text-secondary">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-text-secondary">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
