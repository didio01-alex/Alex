import { Activity, ShieldAlert, Gauge, AlertTriangle } from "lucide-react"

const stats = [
  { icon: Activity, label: "Paquets Analysés", value: "1.2M", accent: "text-emerald-400" },
  { icon: ShieldAlert, label: "Menaces Détectées", value: "47", accent: "text-cyan-400" },
  { icon: Gauge, label: "Disponibilité", value: "99.9%", accent: "text-emerald-400" },
]

const bars = [42, 58, 35, 70, 48, 82, 60, 90, 55, 75, 68, 95]

const alerts = [
  { msg: "Tentative de force brute bloquée — 192.168.1.42", time: "14:32:08" },
  { msg: "Scan de ports détecté sur l'interface eth0", time: "13:57:41" },
]

export default function DashboardSection() {
  return (
    <section id="dashboard" className="relative overflow-hidden bg-zinc-950 py-24 text-zinc-100">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-14 flex flex-col gap-3 text-center">
          <span className="font-mono text-sm uppercase tracking-[0.3em] text-emerald-400">Tableau de Bord</span>
          <h2 className="text-balance text-4xl font-bold tracking-tight text-white md:text-5xl">
            Analyse de Données & Visualisation
          </h2>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-[0_0_50px_-20px_rgba(16,185,129,0.5)] backdrop-blur-sm md:p-8">
          {/* Stat cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5">
                <div className="mb-3 flex items-center gap-2 text-zinc-500">
                  <stat.icon className={`h-4 w-4 ${stat.accent}`} />
                  <span className="font-mono text-xs uppercase tracking-wider">{stat.label}</span>
                </div>
                <p className={`font-mono text-3xl font-bold ${stat.accent}`}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-mono text-sm text-zinc-300">Trafic Réseau</span>
              <span className="font-mono text-xs text-emerald-400">Temps réel</span>
            </div>
            <div className="flex h-40 items-end gap-2">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-gradient-to-t from-emerald-500/40 to-cyan-400 transition-all duration-300 hover:from-emerald-400 hover:to-cyan-300"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          {/* Alerts */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {alerts.map((alert) => (
              <div
                key={alert.time}
                className="flex items-start gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4"
              >
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-zinc-200">{alert.msg}</p>
                  <span className="font-mono text-xs text-zinc-500">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
