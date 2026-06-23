import { FileText, ArrowUpRight } from "lucide-react"

const projects = [
  {
    title: "Audit de Sécurité Réseau",
    status: "Terminé",
    completed: true,
    desc: "Scan de vulnérabilités sur une infrastructure virtualisée, avec cartographie complète des ports et services exposés.",
    tags: ["Kali", "Nmap", "VirtualBox"],
    progress: 100,
  },
  {
    title: "Détection d'Anomalies - Logs Analyse",
    status: "En cours",
    completed: false,
    desc: "Analyse de logs en Python détectant les schémas d'attaque par force brute et les comportements suspects.",
    tags: ["Python", "Pandas", "Data Viz"],
    progress: 65,
  },
  {
    title: "Web Application Pentest",
    status: "Terminé",
    completed: true,
    desc: "Évaluation OWASP Top 10 avec rapport détaillé de remédiation et recommandations de durcissement.",
    tags: ["Burp Suite", "OWASP", "Report"],
    progress: 100,
  },
]

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative overflow-hidden bg-zinc-950 py-24 text-zinc-100">
      <div className="pointer-events-none absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-14 flex flex-col gap-3 text-center">
          <span className="font-mono text-sm uppercase tracking-[0.3em] text-emerald-400">Projets & Analyses</span>
          <h2 className="text-balance text-4xl font-bold tracking-tight text-white md:text-5xl">
            Opérations de Sécurité
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group flex flex-col gap-5 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/40 hover:shadow-[0_0_30px_-10px_rgba(16,185,129,0.4)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950/60 text-emerald-400">
                  <FileText className="h-5 w-5" />
                </div>
                <span
                  className={`rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-wider ${
                    project.completed
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                      : "border-cyan-500/30 bg-cyan-500/10 text-cyan-400"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white">{project.title}</h3>
              <p className="text-pretty text-sm leading-relaxed text-zinc-400">{project.desc}</p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 font-mono text-xs text-emerald-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-2">
                <div className="flex items-center justify-between font-mono text-xs text-zinc-500">
                  <span>Progression</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-semibold text-zinc-300 transition-colors hover:border-emerald-500/50 hover:text-emerald-400">
                Voir le rapport
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
