"use client";

import Script from "next/script";
import { useState, useEffect, useRef } from "react";
import { Mail, Phone, MapPin, ExternalLink, Menu, X, Copy, Check } from "lucide-react";

function spotlightHandlers() {
  return {
    onMouseMove: (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
      e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
    },
    onMouseLeave: (e) => {
      e.currentTarget.style.setProperty("--x", "-999px");
      e.currentTarget.style.setProperty("--y", "-999px");
    },
  };
}

function spotlightStyle({ fill = palette.surface, extra = {} } = {}) {
  return {
    border: "1px solid transparent",
    background: `linear-gradient(${fill}, ${fill}) padding-box, radial-gradient(220px circle at var(--x, -999px) var(--y, -999px), ${palette.accent}, ${palette.border} 65%) border-box`,
    ...extra,
  };
}

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      // clipboard unavailable, ignore
    }
  };
  return (
    <button
      onClick={handleCopy}
      className="mono text-xs flex items-center gap-1.5 px-2.5 py-1.5 rounded shrink-0 transition-colors"
      style={{ border: `1px solid ${palette.border}`, color: copied ? palette.accent : palette.muted }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "copied" : "copy"}
    </button>
  );
}

function GithubIcon({ size = 18, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 0C5.37 0 0 5.5 0 12.3c0 5.44 3.44 10.05 8.21 11.68.6.11.82-.27.82-.6v-2.1c-3.34.74-4.04-1.65-4.04-1.65-.55-1.42-1.34-1.8-1.34-1.8-1.09-.77.08-.75.08-.75 1.21.09 1.85 1.27 1.85 1.27 1.07 1.87 2.81 1.33 3.5 1.02.11-.79.42-1.33.76-1.64-2.67-.31-5.47-1.37-5.47-6.1 0-1.35.46-2.45 1.22-3.31-.12-.31-.53-1.56.12-3.25 0 0 1-.33 3.28 1.26a11.1 11.1 0 0 1 5.98 0c2.28-1.59 3.28-1.26 3.28-1.26.65 1.69.24 2.94.12 3.25.76.86 1.22 1.96 1.22 3.31 0 4.74-2.81 5.78-5.49 6.09.43.38.81 1.14.81 2.3v3.4c0 .33.22.72.83.6C20.57 22.34 24 17.74 24 12.3 24 5.5 18.63 0 12 0Z" />
    </svg>
  );
}

const palette = {
  bg: "#0A0E14",
  surface: "#131920",
  border: "#232B36",
  text: "#E6E9EF",
  muted: "#8B98A9",
  accent: "#5EEAD4",
  accent2: "#F59E0B",
};

const nav = [
  { id: "about", label: "about" },
  { id: "work", label: "work" },
  { id: "skills", label: "skills" },
  { id: "contact", label: "contact" },
];

const stats = [
  { value: "4", label: "shipped projects" },
  { value: "2026", label: "CS graduate" },
  { value: "NC II", label: "systems servicing cert" },
];

const projects = [
  {
    tag: "Cybersecurity",
    title: "Security Monitoring & Threat Detection Lab",
    period: "2026",
    stack: ["Wazuh", "Sysmon", "Splunk", "Kali Linux"],
    desc: "Built a home SOC environment for security monitoring and log analysis. Simulated adversary activity mapped to MITRE ATT&CK (Active Scanning, PowerShell Execution, Registry Run Keys, Application Shimming), then wrote custom Wazuh detection rules and Splunk SPL queries to investigate the resulting alerts.",
    detail: "Correlated endpoint telemetry from Sysmon and Wazuh to spot suspicious behavior, and documented detection strategies and investigation procedures for future incident response.",
    accent: true,
  },
  {
    tag: "Development · Thesis",
    title: "Pathfinding Algorithms for Urban Transportation Networks",
    period: "2025 – 2026",
    stack: ["Next.js", "TypeScript", "Mapbox GL JS", "Tailwind CSS"],
    desc: "A web-based route analysis app comparing pathfinding algorithms — Dijkstra, A*, Greedy Best-First Search, Bellman-Ford, and D* Lite — over real transportation networks.",
    detail: "Integrated Mapbox GL JS and the Mapbox Geocoder for interactive maps, location search, and geocoding. Interface built with Radix UI and Lucide React, typed end to end, deployed on Vercel.",
  },
  {
    tag: "Backend",
    title: "NagaMed — Medical Appointment Management System",
    period: "2025 – 2026",
    stack: ["Node.js", "Express", "MongoDB", "Socket.IO"],
    desc: "A RESTful backend for managing users, doctors, clinics, appointments, and feedback, with modular controllers, models, routers, and middleware to keep the codebase scalable.",
    detail: "JWT + bcrypt auth, Socket.IO for real-time client-server updates, node-cron for scheduled jobs, and Mongoose population to resolve related patient, doctor, and clinic records.",
  },
  {
    tag: "Internship",
    title: "CRIMS — Crime Records & Incident Management System",
    period: "2026",
    stack: ["Full-stack", "SQL", "Version Control"],
    desc: "Contributed to a records and incident management system for the Camarines Sur Cyber Response Team, used to document and track crime-related incidents.",
    detail: "Built frontend interfaces and system functionality, assisted with database integration and testing, and worked from operational requirements gathered with the technical team.",
  },
];

const skillGroups = [
  { label: "Programming", items: ["Java", "Python", "JavaScript", "TypeScript", "SQL"] },
  { label: "Web development", items: ["React", "Next.js", "Node.js", "Express.js", "Laravel", "HTML/CSS"] },
  { label: "Databases", items: ["MySQL", "MongoDB", "Query optimization"] },
  { label: "Cybersecurity", items: ["Wazuh", "Sysmon", "MITRE ATT&CK", "SIEM monitoring", "Incident response"] },
  { label: "Tools & platforms", items: ["Git", "GitHub", "Linux", "Kali Linux", "Vercel"] },
];

const focusAreas = ["Full-stack web apps", "SOC & threat detection", "REST API design"];

function useTypewriterLoop(text, { typeSpeed = 45, eraseSpeed = 25, holdMs = 1800, pauseMs = 500 } = {}) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let i = 0;
    let mode = "typing";
    let timeoutId;

    const tick = () => {
      if (mode === "typing") {
        i++;
        setOut(text.slice(0, i));
        if (i >= text.length) {
          mode = "holding";
          timeoutId = setTimeout(tick, holdMs);
        } else {
          timeoutId = setTimeout(tick, typeSpeed);
        }
      } else if (mode === "holding") {
        mode = "erasing";
        timeoutId = setTimeout(tick, eraseSpeed);
      } else if (mode === "erasing") {
        i--;
        setOut(text.slice(0, i));
        if (i <= 0) {
          mode = "pausing";
          timeoutId = setTimeout(tick, pauseMs);
        } else {
          timeoutId = setTimeout(tick, eraseSpeed);
        }
      } else if (mode === "pausing") {
        mode = "typing";
        timeoutId = setTimeout(tick, typeSpeed);
      }
    };

    timeoutId = setTimeout(tick, typeSpeed);
    return () => clearTimeout(timeoutId);
  }, [text, typeSpeed, eraseSpeed, holdMs, pauseMs]);
  return out;
}

function DotGridBackground({ color = "#5EEAD4", dotSize = 3, spacing = 32, orbitSpeed = 1.2, impactRadius = 260, scaleOnHover = 2 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    let width = 0;
    let height = 0;
    let dots = [];
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;
    let angle = 0;
    let prevTime = 0;

    const h = color.replace("#", "");
    const n = parseInt(h, 16);
    const rgb = { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };

    function buildDots() {
      dots = [];
      const cols = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({
            x: c * spacing,
            y: r * spacing,
            offset: Math.random() * Math.PI * 2,
            speed: 0.7 + Math.random() * 0.6,
          });
        }
      }
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildDots();
    }

    function handleMove(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    function handleLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    function loop(ts) {
      raf = requestAnimationFrame(loop);
      const dt = Math.min((ts - (prevTime || ts)) / 1000, 0.05);
      prevTime = ts;
      angle += orbitSpeed * dt;
      ctx.clearRect(0, 0, width, height);
      for (const d of dots) {
        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let x = d.x;
        let y = d.y;
        let scale = 1;
        let alpha = 0.22;
        if (dist < impactRadius) {
          const t = 1 - dist / impactRadius;
          const eased = t * t * (3 - 2 * t);
          const orbitR = eased * spacing * 0.55;
          const theta = angle * d.speed + d.offset;
          x = d.x + Math.cos(theta) * orbitR;
          y = d.y + Math.sin(theta) * orbitR;
          scale = 1 + (scaleOnHover - 1) * eased;
          alpha = 0.22 + 0.65 * eased;
        }
        ctx.beginPath();
        ctx.arc(x, y, (dotSize / 2) * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
        ctx.fill();
      }
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, [color, dotSize, spacing, orbitSpeed, impactRadius, scaleOnHover]);

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

function RightRail() {
  return (
    <aside className="hidden lg:block sticky self-start" style={{ top: "2.5rem" }}>
      <div className="flex flex-col gap-6">
        <div className="p-5 rounded" {...spotlightHandlers()} style={spotlightStyle()}>
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block rounded-full" style={{ width: 8, height: 8, background: palette.accent }} />
            <span className="mono text-xs" style={{ color: palette.accent }}>open to work</span>
          </div>
          <dl className="flex flex-col gap-3">
            <div>
              <dt className="mono text-xs mb-1" style={{ color: palette.muted }}>based in</dt>
              <dd className="text-sm" style={{ color: palette.text }}>San Fernando, Camarines Sur, PH</dd>
            </div>
            <div>
              <dt className="mono text-xs mb-1" style={{ color: palette.muted }}>education</dt>
              <dd className="text-sm" style={{ color: palette.text }}>BS Computer Science, Naga College Foundation</dd>
            </div>
            <div>
              <dt className="mono text-xs mb-1" style={{ color: palette.muted }}>certification</dt>
              <dd className="text-sm" style={{ color: palette.text }}>TESDA NC II</dd>
            </div>
          </dl>
        </div>

        <div className="p-5 rounded" {...spotlightHandlers()} style={spotlightStyle()}>
          <p className="mono text-xs mb-3" style={{ color: palette.muted }}>focus areas</p>
          <div className="flex flex-col gap-2">
            {focusAreas.map((f) => (
              <span key={f} className="text-sm" style={{ color: palette.text }}>
                <span style={{ color: palette.accent2 }}>·</span> {f}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <a
            href="mailto:joshsibulo123@gmail.com"
            className="flex items-center justify-center gap-2 mono text-xs py-2.5 rounded transition-colors"
            style={{ background: palette.accent, color: palette.bg }}
          >
            <Mail size={14} /> email me
          </a>
          <a
            href="https://github.com/joxus3000"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 mono text-xs py-2.5 rounded transition-colors"
            {...spotlightHandlers()}
            style={{ ...spotlightStyle({ fill: "transparent" }), color: palette.text }}
          >
            <GithubIcon size={14} /> view github
          </a>
        </div>
      </div>
    </aside>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("about");
  const [mobileOpen, setMobileOpen] = useState(false);
  const refs = useRef({});
  const typed = useTypewriterLoop("Computer science graduate — full-stack dev & cybersecurity");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    Object.values(refs.current).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    setMobileOpen(false);
    refs.current[id]?.scrollIntoView({ behavior: "smooth" });
  };

  const activeIndex = nav.findIndex((n) => n.id === active);

  return (
    <div style={{ background: palette.bg, color: palette.text, minHeight: "100vh", fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
      <style>{`
        .mono { font-family: var(--font-jetbrains-mono), ui-monospace, monospace; }
        .cursor::after {
          content: '_';
          animation: blink 1s step-end infinite;
          color: ${palette.accent};
        }
        @keyframes blink { 50% { opacity: 0; } }
        ::selection { background: ${palette.accent}; color: ${palette.bg}; }
      `}</style>

      {/* Fixed background: cursor-reactive dot grid */}
      <DotGridBackground color={palette.accent} />

      <div className="relative" style={{ zIndex: 1 }}>

      {/* Mobile top bar */}
      <div className="lg:hidden flex items-center justify-between px-5 py-4 sticky top-0 z-20" style={{ background: palette.bg, borderBottom: `1px solid ${palette.border}` }}>
        <span className="mono text-sm" style={{ color: palette.accent }}>~/joshua-sibulo</span>
        <button onClick={() => setMobileOpen(!mobileOpen)} style={{ color: palette.text }}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {mobileOpen && (
        <div className="lg:hidden flex flex-col px-5 py-3 gap-3 mono text-sm" style={{ background: palette.surface, borderBottom: `1px solid ${palette.border}` }}>
          {nav.map((n) => (
            <button key={n.id} onClick={() => scrollTo(n.id)} className="text-left py-1" style={{ color: active === n.id ? palette.accent : palette.muted }}>
              ~/{n.label}
            </button>
          ))}
        </div>
      )}

      <div className="flex max-w-[1600px] mx-auto">
        {/* Desktop left rail */}
        <aside className="hidden lg:flex flex-col justify-between w-56 shrink-0 h-screen sticky top-0 px-5 py-8" style={{ borderRight: `1px solid ${palette.border}` }}>
          <div>
            <p className="mono text-xs mb-1" style={{ color: palette.accent }}>~/joshua-sibulo</p>
            <p className="mono text-xs mb-10" style={{ color: palette.muted }}>full-stack · security</p>
            <nav className="relative flex flex-col gap-1">
              <div className="absolute" style={{ left: 16, top: 18, bottom: 18, width: 1, background: palette.border }} />
              {nav.map((n, i) => {
                const isActive = active === n.id;
                const visited = i <= activeIndex;
                return (
                  <button
                    key={n.id}
                    onClick={() => scrollTo(n.id)}
                    className="relative flex items-center gap-3 mono text-sm text-left px-2 py-2.5 rounded transition-colors"
                    style={{
                      color: isActive ? palette.accent : palette.muted,
                      background: isActive ? palette.surface : "transparent",
                    }}
                  >
                    <span
                      className="inline-block rounded-full shrink-0"
                      style={{
                        width: 8,
                        height: 8,
                        background: visited ? palette.accent : palette.bg,
                        border: `1px solid ${visited ? palette.accent : palette.border}`,
                      }}
                    />
                    ~/{n.label}
                  </button>
                );
              })}
            </nav>
          </div>
          <div>
            <div className="flex items-center justify-between px-2 mb-4">
              <span className="mono text-xs" style={{ color: palette.muted }}>section</span>
              <span className="mono text-xs" style={{ color: palette.accent }}>
                {String(activeIndex + 1).padStart(2, "0")} / {String(nav.length).padStart(2, "0")}
              </span>
            </div>
            <div className="flex gap-3 px-2 pt-4" style={{ borderTop: `1px solid ${palette.border}` }}>
              <a href="https://github.com/joxus3000" target="_blank" rel="noreferrer" style={{ color: palette.muted }}>
                <GithubIcon size={18} />
              </a>
              <a href="mailto:joshsibulo123@gmail.com" style={{ color: palette.muted }}>
                <Mail size={18} />
              </a>
            </div>
          </div>
        </aside>

        {/* Main content + right rail */}
        <div className="flex-1 min-w-0 lg:grid lg:grid-cols-[1fr_280px] lg:gap-x-12 px-6 lg:px-16">
          <main className="min-w-0">
            {/* About */}
            <section id="about" ref={(el) => (refs.current.about = el)} className="pt-16 lg:pt-24 pb-16">
              <p className="mono text-sm mb-4" style={{ color: palette.accent2 }}>San Fernando, Camarines Sur, Philippines</p>
              <h1 className="mono font-bold mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", lineHeight: 1.15 }}>
                Joshua Sibulo
              </h1>
              <p className="mono text-lg mb-8 cursor" style={{ color: palette.muted, minHeight: "1.75rem" }}>
                {typed}
              </p>
              <p className="text-base leading-relaxed mb-4" style={{ color: palette.text, maxWidth: "62ch" }}>
                I build full-stack web applications and dig into how systems get attacked. My work spans
                REST APIs and React frontends to home-lab SOC environments where I simulate adversary
                behavior and write the detection rules to catch it.
              </p>
              <p className="text-base leading-relaxed mb-10" style={{ color: palette.muted, maxWidth: "62ch" }}>
                Trained in Computer Systems Servicing (NC II) with hands-on networking and server
                administration experience. Bachelor of Science in Computer Science, Naga College Foundation,
                2022–2026.
              </p>
              <div className="grid grid-cols-3 gap-4 max-w-xl">
                {stats.map((s) => (
                  <div key={s.label} className="p-4 rounded" {...spotlightHandlers()} style={spotlightStyle()}>
                    <p className="mono font-bold text-xl mb-1" style={{ color: palette.accent }}>{s.value}</p>
                    <p className="text-xs leading-snug" style={{ color: palette.muted }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Work */}
            <section id="work" ref={(el) => (refs.current.work = el)} className="py-16" style={{ borderTop: `1px solid ${palette.border}` }}>
              <h2 className="mono text-sm mb-10" style={{ color: palette.muted }}>selected work</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {projects.map((p) => (
                  <article
                    key={p.title}
                    className="p-5 lg:p-6 rounded flex flex-col"
                    {...spotlightHandlers()}
                    style={spotlightStyle()}
                  >
                    <div className="flex items-center justify-between gap-4 mb-3 flex-wrap">
                      <span className="mono text-xs px-2 py-1 rounded" style={{ color: palette.accent, background: "rgba(94,234,212,0.08)" }}>
                        {p.tag}
                      </span>
                      <span className="mono text-xs" style={{ color: palette.muted }}>{p.period}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-3" style={{ color: palette.text }}>{p.title}</h3>
                    <p className="text-sm leading-relaxed mb-3" style={{ color: palette.text }}>{p.desc}</p>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: palette.muted }}>{p.detail}</p>
                    <div className="flex flex-wrap gap-2 mt-auto pt-2">
                      {p.stack.map((s) => (
                        <span key={s} className="mono text-xs px-2 py-1 rounded" style={{ color: palette.muted, border: `1px solid ${palette.border}` }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Skills */}
            <section id="skills" ref={(el) => (refs.current.skills = el)} className="py-16" style={{ borderTop: `1px solid ${palette.border}` }}>
              <h2 className="mono text-sm mb-10" style={{ color: palette.muted }}>skills</h2>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                {skillGroups.map((g) => (
                  <div key={g.label}>
                    <p className="mono text-xs mb-2" style={{ color: palette.accent2 }}>{g.label}</p>
                    <p className="text-sm leading-relaxed" style={{ color: palette.text }}>{g.items.join(", ")}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8" style={{ borderTop: `1px solid ${palette.border}` }}>
                <p className="mono text-xs mb-4" style={{ color: palette.accent2 }}>certifications</p>
                <div className="inline-block p-4 rounded" {...spotlightHandlers()} style={spotlightStyle()}>
                  <div
                    data-iframe-width="150"
                    data-iframe-height="270"
                    data-share-badge-id="43257ece-66d6-4c0e-a933-836dd4566a3b"
                    data-share-badge-host="https://www.credly.com"
                  />
                </div>
              </div>
            </section>

            {/* Contact */}
            <section id="contact" ref={(el) => (refs.current.contact = el)} className="py-16 pb-24" style={{ borderTop: `1px solid ${palette.border}` }}>
              <h2 className="mono text-sm mb-10" style={{ color: palette.muted }}>contact</h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: palette.text, maxWidth: "56ch" }}>
                Open to full-stack and cybersecurity roles. The fastest way to reach me is email.
              </p>
              <div className="flex flex-col gap-3 max-w-xl">
                {[
                  { Icon: Mail, label: "email", value: "joshsibulo123@gmail.com", href: "mailto:joshsibulo123@gmail.com", copyable: true },
                  { Icon: Phone, label: "phone", value: "+63 993 201 6778", href: "tel:+639932016778", copyable: true },
                  { Icon: GithubIcon, label: "github", value: "github.com/joxus3000", href: "https://github.com/joxus3000", copyable: true, external: true },
                  { Icon: MapPin, label: "location", value: "San Fernando, Camarines Sur, Philippines", copyable: false },
                ].map((c) => (
                  <div
                    key={c.label}
                    className="flex items-center justify-between gap-4 p-4 rounded"
                    {...spotlightHandlers()}
                    style={spotlightStyle()}
                  >
                    <a
                      href={c.href}
                      target={c.external ? "_blank" : undefined}
                      rel={c.external ? "noreferrer" : undefined}
                      className="flex items-center gap-3 min-w-0"
                      style={{ color: c.href ? palette.accent : palette.muted, pointerEvents: c.href ? "auto" : "none" }}
                    >
                      <c.Icon size={16} className="shrink-0" />
                      <span className="mono text-sm truncate">{c.value}</span>
                      {c.external && <ExternalLink size={12} className="shrink-0" />}
                    </a>
                    {c.copyable && <CopyButton value={c.value} />}
                  </div>
                ))}
              </div>
            </section>
          </main>

          <RightRail />
        </div>
      </div>
      <Script src="https://cdn.credly.com/assets/utilities/embed.js" strategy="lazyOnload" />
    </div>
  </div>
  );
}