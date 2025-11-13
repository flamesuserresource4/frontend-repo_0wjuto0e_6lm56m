import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Spline from '@splinetool/react-spline'
import { ArrowRight, ExternalLink, Github, Linkedin, Mail, MoveRight, X } from 'lucide-react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(prefersReducedMotion())
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = () => setReduced(m.matches)
    m.addEventListener?.('change', handler)
    return () => m.removeEventListener?.('change', handler)
  }, [])
  return reduced
}

function useBackend() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const fetchJson = async (path, init) => {
    const res = await fetch(`${baseUrl}${path}`, init)
    if (!res.ok) throw new Error(`Request failed: ${res.status}`)
    return res.json()
  }
  return { baseUrl, fetchJson }
}

function GradientRing() {
  return (
    <div aria-hidden className="pointer-events-none absolute -inset-40 rounded-[100%] bg-[radial-gradient(circle_at_center,rgba(255,120,80,0.18),transparent_60%)] blur-3xl" />
  )
}

function Nav({ onViewWork }) {
  return (
    <div className="fixed top-0 inset-x-0 z-40 bg-gradient-to-b from-[#07070A]/70 to-transparent backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between text-neutral-200">
        <a href="#" className="font-bold tracking-tight text-white">Aarav Tatiya</a>
        <div className="flex items-center gap-4 text-sm">
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#work" onClick={onViewWork} className="hover:text-white transition-colors">Work</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </div>
  )
}

function Hero({ onViewWork }) {
  const reduced = usePrefersReducedMotion()
  const [showStatic, setShowStatic] = useState(false)
  useEffect(() => {
    // Fallback on low-power or reduced motion
    const isLowPower = navigator?.hardwareConcurrency && navigator.hardwareConcurrency <= 4
    setShowStatic(reduced || isLowPower)
  }, [reduced])

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen overflow-hidden bg-[#07070A] text-white">
      {!showStatic && (
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/VyGeZv58yuk8j7Yy/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
      )}
      {showStatic && (
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1920&auto=format&fit=crop" alt="Futuristic abstract background" className="w-full h-full object-cover opacity-70" />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#07070A]/40 to-[#07070A] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-28 sm:pt-36 pb-24">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight"
        >
          Hi — I’m Aarav Tatiya.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-orange-400 to-amber-300">I design & build immersive digital experiences.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mt-6 max-w-2xl text-neutral-300"
        >
          Futuristic, tactile, and performance-minded 3D interfaces. Lightweight WebGL layered into an accessible, SEO-friendly frontend.
        </motion.p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a href="#work" onClick={onViewWork} className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-600 to-amber-500 px-6 py-3 text-white shadow-lg shadow-rose-900/30 transition-transform will-change-transform hover:scale-[1.02] active:scale-[0.98]">
            <span>View Work</span>
            <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a href="mailto:hello@aaravtatiya.com" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-white hover:bg-white/20 backdrop-blur-md border border-white/15 transition-colors">
            <Mail className="w-4 h-4" /> Contact
          </a>
        </div>

        <div className="mt-10 flex items-center gap-4 text-neutral-300">
          <a className="inline-flex items-center gap-2 hover:text-white transition-colors" href="https://www.linkedin.com/in/aarav-tatiya-84a6b62a7/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin className="w-5 h-5" />
            <span>LinkedIn</span>
          </a>
          <a className="inline-flex items-center gap-2 hover:text-white transition-colors" href="https://www.skyreels.ai/home/canvas/1988854203521368064" target="_blank" rel="noreferrer" aria-label="Primary Portfolio">
            <ExternalLink className="w-5 h-5" />
            <span>Portfolio</span>
          </a>
        </div>
      </div>

      <GradientRing />
    </section>
  )
}

function About() {
  return (
    <section id="about" className="relative bg-[#07070A] text-neutral-200">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">About</h2>
            <p className="mt-4 text-neutral-300">
              I craft interactive 3D web experiences that balance aesthetics with performance. My focus is on tactile UI, subtle depth, and frictionless storytelling.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['3D web experiences', 'UI/UX design', 'React & WebGL', 'Framer Motion', 'Spline'].map((s) => (
                <span key={s} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm">{s}</span>
              ))}
            </div>
            <div className="mt-6">
              <a href="#" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-white hover:bg-white/20 border border-white/15" aria-label="Download resume">
                <ArrowRight className="w-4 h-4 rotate-90" /> Download Resume
              </a>
            </div>
          </div>
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-tr from-rose-500/20 via-amber-400/10 to-transparent">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-40 h-40 [transform-style:preserve-3d] animate-[spin_18s_linear_infinite]">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="absolute inset-0 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm" style={{ transform: `rotateY(${i * 45}deg) translateZ(90px)` }} />
                ))}
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#07070A] via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, onOpen }) {
  return (
    <button onClick={() => onOpen(project)} className="group relative text-left w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
      <div className="aspect-video overflow-hidden [transform-style:preserve-3d] will-change-transform group-hover:[transform:perspective(900px)_rotateX(3deg)_rotateY(-2deg)] transition-transform">
        <img src={project.images?.[0] || 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop'} alt="Project thumbnail" className="w-full h-full object-cover opacity-90" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">{project.title}</h3>
          <span className="text-xs rounded-full bg-white/10 px-2 py-0.5 border border-white/10">{project.year}</span>
        </div>
        <p className="mt-2 text-sm text-neutral-300 line-clamp-2">{project.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {(project.tech || []).slice(0, 4).map((t) => (
            <span key={t} className="text-xs rounded-full border border-white/10 bg-white/5 px-2 py-0.5">{t}</span>
          ))}
        </div>
      </div>
    </button>
  )
}

function Projects() {
  const { fetchJson } = useBackend()
  const [projects, setProjects] = useState([])
  const [active, setActive] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    fetchJson('/api/projects')
      .then((d) => mounted && setProjects(d.projects || []))
      .catch(() => {})
      .finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [])

  return (
    <section id="work" className="relative bg-[#07070A] text-neutral-200">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">Featured Projects</h2>
        <p className="mt-2 text-neutral-400">Selected works across 3D, UI, and interactive frontends.</p>

        {loading ? (
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 rounded-2xl bg-white/5 border border-white/10 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} onOpen={setActive} />)
            )}
          </div>
        )}

        <AnimatePresence>
          {active && (
            <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="absolute inset-0 bg-black/60" onClick={() => setActive(null)} aria-hidden />
              <motion.div role="dialog" aria-modal="true" className="relative z-10 w-full max-w-3xl rounded-2xl overflow-hidden border border-white/15 bg-[#0b0b10] text-neutral-100 shadow-2xl"
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}>
                <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{active.title}</h3>
                    <p className="text-sm text-neutral-400">{active.role} • {active.year}</p>
                  </div>
                  <button className="p-2 rounded-md hover:bg-white/10" onClick={() => setActive(null)} aria-label="Close">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="max-h-[70vh] overflow-y-auto">
                  <div className="aspect-video bg-white/5">
                    <img src={(active.images && active.images[0]) || 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop'} alt="Project hero" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <p className="text-neutral-300">{active.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {(active.tech || []).map((t) => (
                        <span key={t} className="text-xs rounded-full border border-white/10 bg-white/5 px-2 py-0.5">{t}</span>
                      ))}
                    </div>
                    {active.url && (
                      <a className="mt-5 inline-flex items-center gap-2 text-amber-300 hover:text-amber-200" href={active.url} target="_blank" rel="noreferrer">
                        View project <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

function CaseStudy() {
  return (
    <section className="relative bg-[#07070A] text-neutral-200">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Case Study: Interactive Launch</h2>
            <p className="mt-4 text-neutral-300">
              A scroll-driven narrative showing design thinking, rapid prototyping, and polished execution. Optimized materials, LOD meshes, and compressed textures ensure smooth performance.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              {[{label:'FPS Target', value:'60'}, {label:'Load Time', value:'<1.2s'}, {label:'Pages', value:'5+'}].map(i => (
                <div key={i.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-2xl font-bold text-white">{i.value}</div>
                  <div className="text-xs text-neutral-400">{i.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-tr from-rose-500/20 via-amber-400/10 to-transparent">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-rose-500/40 to-amber-300/30 blur-2xl" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#07070A] via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const { fetchJson } = useBackend()
  const [state, setState] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('Sending...')
    try {
      const res = await fetchJson('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state),
      })
      setStatus('Thanks! I will get back to you shortly.')
      setState({ name: '', email: '', message: '' })
    } catch (e) {
      setStatus('Something went wrong. Please try again later.')
    }
  }

  return (
    <section id="contact" className="relative bg-[#07070A] text-neutral-200">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">Let’s build something</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-8">
          <form onSubmit={onSubmit} className="md:col-span-2 space-y-4">
            <input aria-label="Name" required value={state.name} onChange={(e)=>setState(v=>({...v,name:e.target.value}))} placeholder="Name" className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-amber-300/40" />
            <input aria-label="Email" required type="email" value={state.email} onChange={(e)=>setState(v=>({...v,email:e.target.value}))} placeholder="Email" className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-amber-300/40" />
            <textarea aria-label="Message" required rows={5} value={state.message} onChange={(e)=>setState(v=>({...v,message:e.target.value}))} placeholder="Tell me about your project" className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-amber-300/40" />
            <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-600 to-amber-500 px-6 py-3 text-white shadow-lg shadow-rose-900/30">
              Send Message <MoveRight className="w-4 h-4" />
            </button>
            {status && <p className="text-sm text-neutral-300">{status}</p>}
          </form>

          <div className="space-y-4">
            <a className="flex items-center gap-3 rounded-lg bg-white/5 border border-white/10 p-3 hover:bg-white/10 transition-colors" href="mailto:hello@aaravtatiya.com">
              <Mail className="w-5 h-5" /> hello@aaravtatiya.com
            </a>
            <a className="flex items-center gap-3 rounded-lg bg-white/5 border border-white/10 p-3 hover:bg-white/10 transition-colors" href="https://www.linkedin.com/in/aarav-tatiya-84a6b62a7/" target="_blank" rel="noreferrer">
              <Linkedin className="w-5 h-5" /> LinkedIn
            </a>
            <a className="flex items-center gap-3 rounded-lg bg-white/5 border border-white/10 p-3 hover:bg-white/10 transition-colors" href="https://www.skyreels.ai/home/canvas/1988854203521368064" target="_blank" rel="noreferrer">
              <ExternalLink className="w-5 h-5" /> Portfolio
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-[#07070A] text-neutral-400 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} Aarav Tatiya. All rights reserved.</p>
        <nav className="flex items-center gap-4 text-sm">
          <a href="#" className="hover:text-white">Home</a>
          <a href="#about" className="hover:text-white">About</a>
          <a href="#work" className="hover:text-white">Work</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </nav>
      </div>
    </footer>
  )
}

export default function App() {
  const workRef = useRef(null)
  const onViewWork = (e) => {
    if (e) e.preventDefault()
    const el = document.getElementById('work')
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-[#07070A]">
      <Nav onViewWork={onViewWork} />
      <main>
        <Hero onViewWork={onViewWork} />
        <About />
        <Projects />
        <CaseStudy />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
