import { Terminal, Monitor, Shield, Network, BarChart3, Lock } from "lucide-react"

const skills = [
  { icon: Terminal, title: "Kali Linux", desc: "Système d'exploitation pour tests d'intrusion" },
  { icon: Monitor, title: "VirtualBox", desc: "Laboratoires virtualisés et isolés" },
  { icon: Shield, title: "Analyse de Vulnérabilités", desc: "Évaluation et gestion des CVE" },
  { icon: Network, title: "Wireshark", desc: "Analyse de trafic réseau" },
  { icon: BarChart3, title: "Data Analysis", desc: "Python / Pandas pour la détection" },
  { icon: Lock, title: "Ethical Hacking", desc: "Méthodologies white hat" },
]

export default function SkillsSection() {
  return (
    <section id="skills" className="relative overflow-hidden bg-zinc-950 py-24 text-zinc-100">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-14 flex flex-col gap-3 text-center">
          <span className="font-mono text-sm uppercase tracking-[0.3em] text-emerald-400">Outils & Environnements</span>
          <h2 className="text-balance text-4xl font-bold tracking-tight text-white md:text-5xl">Arsenal Technique</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <div
              key={skill.title}
              className="group relative flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/40 hover:shadow-[0_0_30px_-10px_rgba(16,185,129,0.4)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950/60 text-emerald-400 transition-colors group-hover:border-emerald-500/40">
                  <skill.icon className="h-6 w-6" />
                </div>
                <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-zinc-500">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  Actif
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white">{skill.title}</h3>
              <p className="text-pretty text-sm leading-relaxed text-zinc-400">{skill.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
