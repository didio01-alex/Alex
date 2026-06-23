"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import { Shield } from "lucide-react"

interface HeroProps {
  trustBadge?: {
    text: string
  }
  headline: {
    line1: string
    line2: string
  }
  subtitle: string
  buttons?: {
    primary?: {
      text: string
      onClick?: () => void
    }
    secondary?: {
      text: string
      onClick?: () => void
    }
  }
  className?: string
}

const PARTICLES = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  left: `${(index * 17 + 5) % 100}%`,
  size: `${(index % 5) * 0.35 + 1}px`,
  duration: `${14 + (index % 7) * 3}s`,
  delay: `${-(index * 1.7)}s`,
}))

const defaultShaderSource = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)
float rnd(vec2 p) { p=fract(p*vec2(12.9898,78.233)); p+=dot(p,p+34.56); return fract(p.x*p.y); }
float noise(in vec2 p) { vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f); float a=rnd(i), b=rnd(i+vec2(1,0)), c=rnd(i+vec2(0,1)), d=rnd(i+1.); return mix(mix(a,b,u.x),mix(c,d,u.x),u.y); }
float fbm(vec2 p) { float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2); for (int i=0; i<5; i++) { t+=a*noise(p); p*=2.*m; a*=.5; } return t; }
float clouds(vec2 p) { float d=1., t=.0; for (float i=.0; i<3.; i++) { float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p); t=mix(t,d,a); d=a; p*=2./(i+1.); } return t; }
void main(void) {
  vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.5,-st.y));
  uv*=1.-.3*(sin(T*.2)*.5+.5);
  for (float i=1.; i<12.; i++) {
    uv+=.1*cos(i*vec2(.1+.01*i, .8)+i*i+T*.5+.1*uv.x);
    vec2 p=uv; float d=length(p);
    col+=.00125/d*(cos(sin(i)*vec3(0.0,1.0,0.7))+1.);
    float b=noise(i+p+bg*1.731);
    col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));
    col=mix(col,vec3(bg*.05,bg*.2,bg*.16),d);
  }
  O=vec4(col,1.0);
}`

const useShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl2")
    if (!gl) return

    const vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`

    const compile = (shader: WebGLShader, source: string) => {
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log("[v0] Shader compilation error:", gl.getShaderInfoLog(shader))
      }
    }

    const vs = gl.createShader(gl.VERTEX_SHADER)!
    const fs = gl.createShader(gl.FRAGMENT_SHADER)!
    compile(vs, vertexSrc)
    compile(fs, defaultShaderSource)

    const program = gl.createProgram()!
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.log("[v0] Program link error:", gl.getProgramInfoLog(program))
      return
    }

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]), gl.STATIC_DRAW)
    const position = gl.getAttribLocation(program, "position")
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    const resolutionLoc = gl.getUniformLocation(program, "resolution")
    const timeLoc = gl.getUniformLocation(program, "time")

    let dpr = Math.max(1, 0.5 * window.devicePixelRatio)
    const resize = () => {
      dpr = Math.max(1, 0.5 * window.devicePixelRatio)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener("resize", resize)

    let frame = 0
    const loop = (now: number) => {
      gl.clearColor(0, 0, 0, 1)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.useProgram(program)
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.uniform2f(resolutionLoc, canvas.width, canvas.height)
      gl.uniform1f(timeLoc, now * 1e-3)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(frame)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteBuffer(buffer)
    }
  }, [])

  return canvasRef
}

function splitHeadlineName(line: string): [string, string] {
  const parts = line.trim().split(/\s+/)
  if (parts.length >= 2) {
    return [parts[0], parts.slice(1).join(" ")]
  }
  return [line, ""]
}

const Hero: React.FC<HeroProps> = ({ trustBadge, headline, subtitle, buttons, className = "" }) => {
  const canvasRef = useShaderBackground()
  const [lastName, firstName] = splitHeadlineName(headline.line1)

  return (
    <div className={`relative min-h-screen w-full overflow-x-hidden bg-zinc-950 ${className}`}>
      {/* WebGL shader animation — preserved */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full touch-none" aria-hidden="true" />

      {/* High-tech grid overlay */}
      <div className="cyber-grid-bg pointer-events-none absolute inset-0 z-[1] opacity-60" aria-hidden="true" />

      {/* CSS floating particles — lightweight & reliable */}
      <div className="cyber-particles absolute inset-0 z-[2] opacity-70" aria-hidden="true">
        {PARTICLES.map((particle) => (
          <span
            key={particle.id}
            style={{
              left: particle.left,
              bottom: "-10px",
              width: particle.size,
              height: particle.size,
              animationDuration: particle.duration,
              animationDelay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Radial vignette + readability overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[3] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(9,9,11,0.35)_55%,rgba(9,9,11,0.75)_100%)]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 z-[4] bg-zinc-950/45" aria-hidden="true" />

      {/* Scan line effect */}
      <div
        className="cyber-scan-line pointer-events-none absolute inset-x-0 top-0 z-[5] h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent"
        aria-hidden="true"
      />

      {/* HUD status bar */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between border-b border-emerald-500/10 bg-zinc-950/60 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-500/50 backdrop-blur-sm sm:px-8 md:px-10">
        <span>SYS://SECURE_PORTFOLIO</span>
        <span className="hidden sm:inline">STATUS: ONLINE</span>
        <span className="cyber-neon-text-subtle text-emerald-400">LVL.3 ANALYST</span>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pb-10 pt-20 text-white sm:px-6 md:px-8 md:pb-14 md:pt-24">
        <div className="relative mx-auto w-full max-w-4xl">
          <div className="relative p-3 sm:p-6 md:p-8 lg:p-10">
            <span className="cyber-corner-bracket cyber-corner-bracket--tl" aria-hidden="true" />
            <span className="cyber-corner-bracket cyber-corner-bracket--tr" aria-hidden="true" />
            <span className="cyber-corner-bracket cyber-corner-bracket--bl" aria-hidden="true" />
            <span className="cyber-corner-bracket cyber-corner-bracket--br" aria-hidden="true" />

            <div className="cyber-dashboard-panel relative rounded-sm px-5 py-8 backdrop-blur-md sm:px-8 sm:py-10 md:px-12 md:py-12 lg:px-16 lg:py-14">
              <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent sm:inset-x-8 md:inset-x-12" />
              <div className="pointer-events-none absolute inset-x-5 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent sm:inset-x-8 md:inset-x-12" />

              {trustBadge && (
                <div className="mb-8 flex animate-fade-in-down justify-center md:mb-10">
                  <div className="flex items-center gap-3 rounded-sm border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] backdrop-blur-md sm:px-5 sm:py-2.5 sm:text-xs">
                    <Shield className="h-4 w-4 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" aria-hidden="true" />
                    <span className="cyber-neon-text-subtle">{trustBadge.text}</span>
                  </div>
                </div>
              )}

              <div className="mx-auto max-w-3xl space-y-8 text-center md:space-y-10">
                <div className="space-y-3 md:space-y-5">
                  <p className="animate-fade-in-up-delay-100 font-mono text-[10px] uppercase tracking-[0.35em] text-emerald-500/60 sm:text-[11px] sm:tracking-[0.45em]">
                    {"// Identity Verified"}
                  </p>

                  <h1 className="animate-fade-in-up-delay-200 cyber-headline-name text-balance text-4xl font-black leading-none tracking-wider sm:text-5xl md:text-7xl lg:text-8xl">
                    <span className="text-zinc-100 drop-shadow-[0_0_30px_rgba(255,255,255,0.08)]">{lastName}</span>
                    {firstName && (
                      <>
                        <span className="mx-2 text-emerald-500/40 md:mx-4">/</span>
                        <span className="cyber-neon-text">{firstName}</span>
                      </>
                    )}
                  </h1>

                  <h2 className="animate-fade-in-up-delay-400 cyber-headline-name text-balance text-xl font-semibold tracking-[0.12em] text-emerald-300/80 sm:text-2xl md:text-3xl lg:text-4xl">
                    <span className="cyber-neon-text-subtle">{headline.line2}</span>
                  </h2>
                </div>

                <div className="animate-fade-in-up-delay-600 mx-auto max-w-2xl border border-emerald-500/10 bg-emerald-500/[0.03] px-5 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6">
                  <p className="text-pretty font-mono text-sm leading-relaxed text-emerald-100/75 md:text-base lg:text-lg">
                    {subtitle}
                  </p>
                </div>

                {buttons && (
                  <div className="animate-fade-in-up-delay-800 flex flex-col justify-center gap-4 sm:flex-row sm:gap-5">
                    {buttons.primary && (
                      <button
                        type="button"
                        onClick={buttons.primary.onClick}
                        className="cyber-btn-primary rounded-sm bg-emerald-500 px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.15em] text-zinc-950 hover:scale-[1.03] hover:bg-emerald-400 sm:px-10 sm:py-4 sm:text-sm"
                      >
                        {buttons.primary.text}
                      </button>
                    )}
                    {buttons.secondary && (
                      <button
                        type="button"
                        onClick={buttons.secondary.onClick}
                        className="cyber-btn-secondary rounded-sm border border-emerald-500/40 bg-emerald-500/5 px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.15em] text-emerald-100 backdrop-blur-sm hover:scale-[1.03] hover:border-emerald-400/70 hover:bg-emerald-500/10 sm:px-10 sm:py-4 sm:text-sm"
                      >
                        {buttons.secondary.text}
                      </button>
                    )}
                  </div>
                )}

                <div className="animate-fade-in-up-delay-1000 flex flex-wrap items-center justify-center gap-5 border-t border-emerald-500/10 pt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-500/40 sm:gap-8 sm:pt-8">
                  <span className="flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                    Encrypted
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                    White Hat
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
