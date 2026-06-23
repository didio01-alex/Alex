import { Shield, Eye, Brain } from "lucide-react"

const principles = [
  { icon: Shield, title: "Éthique & Intégrité", desc: "Agir dans le respect de la loi et des autorisations." },
  { icon: Eye, title: "Vigilance Continue", desc: "Surveiller et anticiper les menaces en permanence." },
  { icon: Brain, title: "Apprentissage Permanent", desc: "Évoluer constamment face aux nouvelles attaques." },
]

export default function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-zinc-950 py-24 text-zinc-100">
      <div className="pointer-events-none absolute left-0 bottom-0 h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-14 flex flex-col gap-3 text-center">
          <span className="font-mono text-sm uppercase tracking-[0.3em] text-emerald-400">À Propos</span>
          <h2 className="text-balance text-4xl font-bold tracking-tight text-white md:text-5xl">
            Philosophie White Hat
          </h2>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <blockquote className="relative rounded-2xl border-l-2 border-emerald-500 bg-zinc-900/40 p-8">
            <p className="text-balance text-2xl font-semibold leading-relaxed text-white md:text-3xl">
              « La sécurité n&apos;est pas une option, c&apos;est une nécessité. Mon approche : comprendre pour mieux
              protéger. »
            </p>
          </blockquote>

          <div className="flex flex-col gap-6">
            {principles.map((p) => (
              <div key={p.title} className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                  <p.icon className="h-6 w-6" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                  <p className="text-pretty text-sm leading-relaxed text-zinc-400">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-12 max-w-3xl text-pretty text-center text-base leading-relaxed text-zinc-400">
          Spécialiste en cybersécurité de niveau 3, je me consacre au hacking éthique et à la protection des
          infrastructures numériques. Dans des environnements virtualisés et contrôlés, j&apos;identifie les
          vulnérabilités avant qu&apos;elles ne soient exploitées, en alliant rigueur technique et responsabilité.
        </p>
      </div>
    </section>
  )
}
