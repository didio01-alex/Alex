import Image from "next/image"
import { Shield, ArrowRight, Download, CheckCircle2 } from "lucide-react"

export default function CyberHero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-zinc-950 text-zinc-100">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="pointer-events-none absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="container relative z-10 mx-auto grid items-center gap-12 px-6 py-20 md:grid-cols-2">
        {/* Left Column: White Hat Image */}
        <div className="relative order-1 flex justify-center">
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 opacity-60 blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 shadow-2xl backdrop-blur-sm">
            <Image
              src="/white-hat-hacker.png"
              alt="White hat cybersecurity emblem: a white hat over a digital shield"
              width={520}
              height={520}
              priority
              className="h-auto w-full max-w-md object-cover"
            />
          </div>
        </div>

        {/* Right Column: Name & Content */}
        <div className="order-2 flex flex-col gap-8 md:items-end md:text-right">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400">
            <Shield className="h-4 w-4" />
            White Hat Security Analyst
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-mono text-sm uppercase tracking-[0.3em] text-emerald-400">Portfolio</span>
            <h1 className="text-balance text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
              DIDIO{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Alex</span>
            </h1>
          </div>

          <p className="max-w-lg text-pretty text-lg leading-relaxed text-zinc-400">
            Spécialiste en cybersécurité de niveau 3, dédié au hacking éthique, à l&apos;évaluation des vulnérabilités et
            à l&apos;analyse de données. J&apos;utilise Kali Linux et des environnements virtualisés pour sécuriser les
            infrastructures numériques.
          </p>

          <div className="flex flex-wrap gap-4 md:justify-end">
            <button className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-zinc-950 transition-colors hover:bg-emerald-600">
              Voir mes projets
              <ArrowRight className="h-4 w-4" />
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-6 py-3 font-semibold text-zinc-300 transition-colors hover:border-zinc-500">
              <Download className="h-4 w-4" />
              Télécharger le CV
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 md:justify-end">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Kali Linux
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> VirtualBox
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Analyse de données
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
