"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, DollarSign, Timer, Users, CheckCircle2, Shield, ArrowRight, Calendar, Globe2 } from "lucide-react";

const Button = ({ className = "", children, ...props }: any) => (
  <button
    className={`inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Card = ({ className = "", children }: any) => (
  <div className={`rounded-2xl bg-white/80 backdrop-blur shadow-sm ring-1 ring-slate-200 ${className}`}>{children}</div>
);
const CardHeader = ({ children, className = "" }: any) => <div className={`px-6 pt-6 ${className}`}>{children}</div>;
const CardContent = ({ children, className = "" }: any) => <div className={`px-6 pb-6 ${className}`}>{children}</div>;

const ROLE_BENCHMARKS = [
  { role: "SDR / BDR", usMin: 60000, usMax: 80000, latinMin: 28000, latinMax: 35000 },
  { role: "Customer Support (Bilingual)", usMin: 50000, usMax: 65000, latinMin: 24000, latinMax: 32000 },
  { role: "RevOps Analyst", usMin: 85000, usMax: 110000, latinMin: 42000, latinMax: 60000 },
  { role: "AP/AR Specialist", usMin: 55000, usMax: 70000, latinMin: 26000, latinMax: 36000 },
  { role: "Data Analyst", usMin: 90000, usMax: 120000, latinMin: 45000, latinMax: 65000 },
  { role: "QA Tester", usMin: 80000, usMax: 100000, latinMin: 38000, latinMax: 52000 },
  { role: "Executive Assistant (EN/ES)", usMin: 65000, usMax: 90000, latinMin: 30000, latinMax: 42000 },
  { role: "Marketing Ops", usMin: 85000, usMax: 110000, latinMin: 42000, latinMax: 60000 },
];

const MODELS: any = {
  recruitOnly: { label: "Recruit-Only", feeNote: "10% of annual comp (50% deposit)", feePct: 0.1 },
  fullyManaged: { label: "Fully Managed", feeNote: "+35% on contractor take-home", feePct: 0.35 },
};

const currency = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function calcSavings(usRange: any, latinRange: any) {
  const usAvg = (usRange.min + usRange.max) / 2;
  const laAvg = (latinRange.min + latinRange.max) / 2;
  const savings = usAvg - laAvg;
  const pct = usAvg > 0 ? Math.round((savings / usAvg) * 100) : 0;
  return { usAvg, laAvg, savings, pct };
}

export default function Page() {
  const [selectedRole, setSelectedRole] = useState<any>(ROLE_BENCHMARKS[0]);
  const [seats, setSeats] = useState<number>(3);
  const [model, setModel] = useState<"fullyManaged" | "recruitOnly">("fullyManaged");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [startDate, setStartDate] = useState("");
  const [customRole, setCustomRole] = useState("");
  const [showQuote, setShowQuote] = useState(false);
  const [consent, setConsent] = useState(true);

  const activeRole = useMemo(() => {
    if (customRole.trim()) {
      const usMin = 70000, usMax = 95000;
      const latinMin = Math.round(usMin * 0.45);
      const latinMax = Math.round(usMax * 0.55);
      return { role: customRole.trim(), usMin, usMax, latinMin, latinMax };
    }
    return selectedRole;
  }, [customRole, selectedRole]);

  const quote = useMemo(() => {
    const usRange = { min: activeRole.usMin, max: activeRole.usMax };
    const laRange = { min: activeRole.latinMin, max: activeRole.latinMax };
    const { usAvg, laAvg, savings, pct } = calcSavings(usRange, laRange);
    const feePct = MODELS[model].feePct;
    const annualService = Math.round(laAvg * feePct);
    const totalAnnualPerSeat = laAvg + annualService;
    const teamAnnual = totalAnnualPerSeat * seats;
    return { usRange, laRange, usAvg, laAvg, savings, pct, annualService, totalAnnualPerSeat, teamAnnual };
  }, [activeRole, seats, model]);

  const canSubmit = email && company && consent;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    // TODO: POST to your CRM/Endpoint
    setShowQuote(true);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
      <header className="sticky top-0 z-30 bg-white/70 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-indigo-600 text-white grid place-items-center font-bold">SL</div>
            <div className="font-semibold">Staff Latin</div>
          </div>
          <div className="hidden md:flex items-center gap-4 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2"><Globe2 className="h-4 w-4"/> EN / ES Bilingual</span>
            <span className="inline-flex items-center gap-2"><Shield className="h-4 w-4"/> Contractor/EOR, NDAs & DPAs</span>
            <a href="#quote" className="hover:underline">Get my quote</a>
          </div>
          <Button onClick={() => document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" })}>
            Get my quote <ArrowRight className="h-4 w-4"/>
          </Button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 pt-12 pb-6 grid md:grid-cols-2 gap-8 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Instant Staffing Quote: <span className="text-indigo-600">US vs Latin America</span>
          </h1>
          <p className="mt-4 text-lg text-slate-700">
            Get a free, no-commitment benchmark for the role you need: salary range, savings (typically 50–60%), and time-to-hire in <strong>2–4 weeks</strong>.
          </p>
          <ul className="mt-6 grid gap-3 text-slate-700">
            <li className="inline-flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-emerald-600"/> Near-US time zones, neutral accents (EN/ES)</li>
            <li className="inline-flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-emerald-600"/> Curated shortlists; scale from pilot → pod</li>
            <li className="inline-flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-emerald-600"/> Clean contractor/EOR compliance</li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={() => document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" })}>
              Start my quote <Calculator className="h-4 w-4"/>
            </Button>
            <a href="#how" className="text-indigo-700 font-medium inline-flex items-center gap-2">
              How it works <ArrowRight className="h-4 w-4"/>
            </a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center gap-2 text-sm uppercase tracking-wider text-slate-500"><DollarSign className="h-4 w-4"/> Example Quote</div>
              <h3 className="mt-2 text-2xl font-bold">SDR / BDR</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-slate-500 text-sm">US Avg</div>
                  <div className="text-xl font-semibold">$72,500</div>
                </div>
                <div>
                  <div className="text-slate-500 text-sm">Latin America Avg</div>
                  <div className="text-xl font-semibold">$31,500</div>
                </div>
                <div className="col-span-2">
                  <div className="text-slate-500 text-sm">Savings</div>
                  <div className="text-2xl font-bold text-emerald-700">~56%</div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-slate-600 text-sm"><Timer className="h-4 w-4"/> Time-to-hire: 2–4 weeks</div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* TRUST BAR */}
      <section className="mx-auto max-w-7xl px-4 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-slate-600">
          <div className="flex items-center gap-2"><Users className="h-4 w-4"/> 40–250 FTE SMBs</div>
          <div className="flex items-center gap-2"><Shield className="h-4 w-4"/> NDAs, BAAs/DPAs, RBAC</div>
          <div className="flex items-center gap-2"><Timer className="h-4 w-4"/> 2–4 week hiring</div>
          <div className="flex items-center gap-2"><DollarSign className="h-4 w-4"/> 50–60% labor savings</div>
        </div>
      </section>

      {/* QUOTE */}
      <QuoteSection
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        customRole={customRole}
        setCustomRole={setCustomRole}
        seats={seats}
        setSeats={setSeats}
        model={model}
        setModel={setModel}
        email={email}
        setEmail={setEmail}
        company={company}
        setCompany={setCompany}
        startDate={startDate}
        setStartDate={setStartDate}
        consent={consent}
        setConsent={setConsent}
        canSubmit={!!canSubmit}
        handleSubmit={handleSubmit}
        activeRole={activeRole}
        quote={quote}
        showQuote={showQuote}
        setShowQuote={setShowQuote}
      />

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-slate-600 grid md:grid-cols-2 gap-4">
          <div>
            <div className="font-semibold">Staff Latin</div>
            <p className="mt-2 max-w-prose">Nearshore staffing (Latin America) for CX, Revenue, Finance Ops, Data/Tech, and Admin roles. Save 50–60% vs US salaries while staying in near-US time zones.</p>
          </div>
          <div className="md:text-right flex md:justify-end items-start gap-4">
            <a href="#quote" className="text-indigo-700 font-medium">Get my quote</a>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 pb-8 text-xs text-slate-500">
          © {new Date().getFullYear()} Staff Latin. All rights reserved. Privacy • Terms. CASL/CAN-SPAM friendly. Unsubscribe anytime.
        </div>
      </footer>
    </div>
  );
}

function QuoteSection(props: any) {
  const {
    selectedRole, setSelectedRole, customRole, setCustomRole, seats, setSeats,
    model, setModel, email, setEmail, company, setCompany, startDate, setStartDate,
    consent, setConsent, canSubmit, handleSubmit, activeRole, quote, showQuote, setShowQuote
  } = props;

  return (
    <section id="quote" className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold">Get your instant quote</h2>
            <p className="mt-1 text-slate-600">No commitment. We’ll show a benchmark now and follow up with a tailored range.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Select a role</label>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  <select
                    className="w-full rounded-xl border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                    value={selectedRole.role}
                    onChange={(e) => {
                      const r = ROLE_BENCHMARKS.find((x) => x.role === e.target.value) || ROLE_BENCHMARKS[0];
                      setSelectedRole(r);
                      setCustomRole("");
                    }}
                  >
                    {ROLE_BENCHMARKS.map((r) => (
                      <option key={r.role} value={r.role}>{r.role}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Or enter a custom role"
                    className="w-full rounded-xl border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                    value={customRole}
                    onChange={(e) => setCustomRole(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Seats</label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={seats}
                    onChange={(e) => setSeats(Math.max(1, Math.min(50, Number(e.target.value) || 1)))}
                    className="mt-1 w-full rounded-xl border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700">Engagement model</label>
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    {Object.entries(MODELS).map(([key, m]) => (
                      <button
                        type="button"
                        key={key}
                        onClick={() => setModel(key as any)}
                        className={`rounded-xl border p-3 text-left ${model === key ? "border-indigo-600 ring-2 ring-indigo-200 bg-indigo-50" : "border-slate-300 hover:border-slate-400"}`}
                      >
                        <div className="font-semibold">{m.label}</div>
                        <div className="text-xs text-slate-600">{m.feeNote}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700">Work email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="mt-1 w-full rounded-xl border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Company</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme, Inc."
                    className="mt-1 w-full rounded-xl border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Ideal start date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="mt-1 w-full rounded-xl border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex items-end">
                  <label className="inline-flex items-center gap-2 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      checked={!!consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="rounded border-slate-300"
                    />
                    I agree to be contacted and accept the privacy notice.
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button type="submit" className={`${!canSubmit ? "opacity-60 pointer-events-none" : ""}`}>
                  Generate my quote <ArrowRight className="h-4 w-4" />
                </Button>
                <div className="text-sm text-slate-500 flex items-center gap-2"><Shield className="h-4 w-4" /> We don’t sell your data.</div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* LIVE ESTIMATE */}
        <Card className="sticky top-24">
          <CardHeader>
            <div className="text-sm uppercase tracking-wider text-slate-500 flex items-center gap-2"><Calculator className="h-4 w-4" /> Live estimate</div>
            <h3 className="text-2xl font-bold">{activeRole.role}</h3>
            <div className="text-slate-600 text-sm">{seats} {seats === 1 ? "seat" : "seats"} • {MODELS[model].label}</div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-slate-500 text-sm">US Range</div>
                <div className="text-xl font-semibold">{currency(quote.usRange.min)} – {currency(quote.usRange.max)}</div>
              </div>
              <div>
                <div className="text-slate-500 text-sm">Latin America Range</div>
                <div className="text-xl font-semibold">{currency(quote.laRange.min)} – {currency(quote.laRange.max)}</div>
              </div>
              <div className="col-span-2">
                <div className="text-slate-500 text-sm">Estimated savings</div>
                <div className="text-2xl font-bold text-emerald-700">{quote.pct}% vs US</div>
              </div>
            </div>

            <div className="mt-6 grid gap-2 text-sm">
              <div className="flex items-center justify-between"><span>Avg Latin America take-home</span><span className="font-semibold">{currency(quote.laAvg)}</span></div>
              <div className="flex items-center justify-between"><span>Service ({MODELS[model].feePct * 100}%)</span><span className="font-semibold">{currency(quote.annualService)}</span></div>
              <div className="flex items-center justify-between border-t pt-2"><span>Total / seat / year</span><span className="font-semibold">{currency(quote.totalAnnualPerSeat)}</span></div>
              <div className="flex items-center justify-between"><span>Total team ({seats})</span><span className="font-semibold">{currency(quote.teamAnnual)}</span></div>
            </div>

            <div className="mt-6 text-slate-600 text-sm flex items-center gap-2"><Timer className="h-4 w-4" /> Typical time-to-hire: <strong className="ml-1">2–4 weeks</strong></div>
            <p className="mt-2 text-xs text-slate-500">Estimates for planning only. Final offers depend on candidate seniority, tool stack, and language proficiency.</p>
          </CardContent>
        </Card>
      </div>

      {/* (Optional): Roles grid, FAQs could be added here to match the canvas version */}
    </section>
  );
}
