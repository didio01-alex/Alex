"use client"

import type React from "react"
import { useState } from "react"
import { Send, Code2, Briefcase, Target } from "lucide-react"

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: "", email: "", message: "" })
  }

  return (
    <footer id="contact" className="relative overflow-hidden bg-zinc-950 py-24 text-zinc-100">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-14 flex flex-col gap-3 text-center">
          <span className="font-mono text-sm uppercase tracking-[0.3em] text-emerald-400">Contact</span>
          <h2 className="text-balance text-4xl font-bold tracking-tight text-white md:text-5xl">
            Établir Connexion Sécurisée
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-xl flex-col gap-5 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-sm md:p-8"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-mono text-xs uppercase tracking-wider text-zinc-400">
              Nom
            </label>
            <input
              id="name"
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-lg border border-zinc-700 bg-zinc-950/60 px-4 py-3 text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-emerald-500"
              placeholder="Votre nom"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-mono text-xs uppercase tracking-wider text-zinc-400">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="rounded-lg border border-zinc-700 bg-zinc-950/60 px-4 py-3 text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-emerald-500"
              placeholder="vous@exemple.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="font-mono text-xs uppercase tracking-wider text-zinc-400">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="resize-none rounded-lg border border-zinc-700 bg-zinc-950/60 px-4 py-3 text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-emerald-500"
              placeholder="Votre message..."
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-zinc-950 transition-colors hover:bg-emerald-600"
          >
            {sent ? "Message transmis" : "Transmettre"}
            <Send className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-10 flex justify-center gap-4">
          {[
            { icon: Code2, label: "GitHub", href: "#" },
            { icon: Briefcase, label: "LinkedIn", href: "#" },
            { icon: Target, label: "TryHackMe", href: "#" },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className="flex h-12 w-12 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-400 transition-colors hover:border-emerald-500/50 hover:text-emerald-400"
            >
              <social.icon className="h-5 w-5" />
            </a>
          ))}
        </div>

        <p className="mt-12 text-center font-mono text-xs text-zinc-600">
          © 2024 DIDIO Alex | White Hat Security Analyst | Environnements virtualisés &amp; éthiques
        </p>
      </div>
    </footer>
  )
}
