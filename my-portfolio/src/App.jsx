import { useState, useEffect, useRef } from "react";

const PHOTO = null;

const C = {
  bg: "#0c0c0c",
  bg2: "#111111",
  bg3: "#161616",
  red: "#ff1a1a",
  white: "#f5f5f0",
  grey: "#888880",
  dim: "#444440",
  border: "#2a2a2a",
  h: "'Bebas Neue','Barlow Condensed',Impact,sans-serif",
  b: "'IBM Plex Mono','Courier New',monospace",
  s: "'Barlow Condensed','Arial Narrow',sans-serif",
};

function Tag({ children, color }) {
  const c = color || C.red;
  return (
    <span
      style={{
        fontFamily: C.b,
        fontSize: "10px",
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: c,
        border: "1px solid " + c + "44",
        padding: "2px 10px",
        background: c + "0d",
      }}
    >
      {children}
    </span>
  );
}

function BigH({ children }) {
  return (
    <h2
      style={{
        fontFamily: C.h,
        fontWeight: 400,
        lineHeight: 0.9,
        letterSpacing: "1px",
        fontSize: "clamp(52px,8vw,96px)",
        color: C.white,
      }}
    >
      {children}
    </h2>
  );
}

function SLabel({ children, color }) {
  const c = color || C.red;
  return (
    <div
      style={{
        fontFamily: C.b,
        fontSize: "10px",
        letterSpacing: "4px",
        textTransform: "uppercase",
        color: c,
        marginBottom: "12px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: "24px",
          height: "1px",
          background: c,
        }}
      />
      {children}
    </div>
  );
}

function Counter({ pre, end, suf, trigger }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let st;
    const step = (ts) => {
      if (!st) st = ts;
      const p = Math.min((ts - st) / 1600, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [trigger, end]);
  return (
    <span>
      {pre || ""}
      {n}
      {suf || ""}
    </span>
  );
}

function GHHeatmap({ contributions, mobile }) {
  const COLORS = ["#1c1c1c", "#3d0000", "#7a0000", "#b80000", "#ff1a1a"];
  if (!contributions || !contributions.length)
    return (
      <div
        style={{
          fontFamily: C.b,
          fontSize: "10px",
          color: C.dim,
          padding: "20px 0",
          letterSpacing: "2px",
        }}
      >
        LOADING HEATMAP...
      </div>
    );
  const sz = mobile ? 9 : 12;
  const weeks = [];
  let week = [];
  const firstDay = new Date(contributions[0].date).getDay();
  for (let i = 0; i < firstDay; i++) week.push(null);
  contributions.forEach(function (d) {
    week.push(d);
    if (week.length === 7) {
      weeks.push(week.slice());
      week = [];
    }
  });
  if (week.length) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }
  const DAYS = ["S", "M", "T", "W", "T", "F", "S"];
  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "4px",
          overflowX: "auto",
          paddingBottom: "4px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2px",
            marginRight: "4px",
            paddingTop: "0",
          }}
        >
          {DAYS.map(function (d, i) {
            return (
              <div
                key={i}
                style={{
                  height: sz + "px",
                  width: "10px",
                  fontFamily: C.b,
                  fontSize: "8px",
                  color: C.dim,
                  display: "flex",
                  alignItems: "center",
                  opacity: i % 2 === 0 ? 0 : 1,
                }}
              >
                {d}
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: "2px" }}>
          {weeks.map(function (wk, wi) {
            return (
              <div
                key={wi}
                style={{ display: "flex", flexDirection: "column", gap: "2px" }}
              >
                {wk.map(function (d, di) {
                  const lvl = d ? Math.min(d.level, 4) : -1;
                  const bg = lvl === -1 ? "transparent" : COLORS[lvl];
                  const glow = lvl === 4 ? "0 0 5px #ff1a1a88" : "none";
                  return (
                    <div
                      key={di}
                      title={
                        d ? d.date + " : " + d.count + " contributions" : ""
                      }
                      style={{
                        width: sz + "px",
                        height: sz + "px",
                        background: bg,
                        boxShadow: glow,
                        cursor: d ? "default" : "auto",
                      }}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          marginTop: "12px",
          justifyContent: "flex-end",
        }}
      >
        <span
          style={{
            fontFamily: C.b,
            fontSize: "9px",
            color: C.dim,
            marginRight: "2px",
          }}
        >
          LESS
        </span>
        {COLORS.map(function (col, i) {
          return (
            <div
              key={i}
              style={{
                width: "10px",
                height: "10px",
                background: col,
                border: "1px solid #2a2a2a",
              }}
            />
          );
        })}
        <span
          style={{
            fontFamily: C.b,
            fontSize: "9px",
            color: C.dim,
            marginLeft: "2px",
          }}
        >
          MORE
        </span>
      </div>
    </div>
  );
}

const NAV = [
  "Home",
  "About",
  "Experience",
  "Projects",
  "Process",
  "Skills",
  "Services",
  "GitHub",
  "Music",
  "Contact",
];

const STATS = [
  { pre: "~", end: 70, suf: "%", lab: "Revenue driven at Edoofa" },
  { end: 500, suf: "+", lab: "Leads managed end-to-end" },
  { end: 1, suf: "yr+", lab: "Business development exp." },
  { end: 3, suf: "+", lab: "Freelance projects shipped" },
];

const EXP = [
  {
    period: "AUG 2024 — SEP 2025",
    role: "Business Development Associate",
    co: "EDOOFA",
    type: "Full-time · Gurugram",
    color: C.red,
    desc: "International EdTech — higher education abroad for Indian students.",
    bullets: [
      "Owned end-to-end post-enrollment conversion for 500+ international student leads",
      "Managed high-value client relationships via WhatsApp, voice & video across time zones",
      "Drove university registrations contributing ~70% of company revenue — highest-margin stream",
      "Tracked installment-based payment schedules across intakes, ensuring timely collections",
      "Handled student visa processing: documentation coordination and application support",
      "Conducted weekly mentoring & orientation sessions on university readiness and relocation",
      "Collaborated on campaigns, festive promotions and student communication materials",
      "Supported post-arrival ops: airport coordination and student settlement assistance",
    ],
  },
  {
    period: "JAN — APR 2024",
    role: "Social Media Manager",
    co: "TRAVNAARI",
    type: "Contract · Remote",
    color: "#ff8800",
    desc: "Travel and lifestyle brand — curated experiences.",
    bullets: [
      "Designed and executed campaigns that measurably grew brand awareness",
      "Produced creatives: images, reels and stories with tracked engagement uplift",
      "Refined content strategy iteratively using post-level performance data",
      "Improved lead generation and audience reach through data-driven content",
    ],
  },
  {
    period: "ONGOING",
    role: "Freelance Web Designer & Developer",
    co: "INDEPENDENT",
    type: "Self-employed",
    color: "#00ff88",
    desc: "Premium digital products for startups and growing businesses.",
    bullets: [
      "Performance-first websites using React, Next.js, Three.js and Tailwind CSS",
      "Full workflow: Figma design → React build → Vercel deployment",
      "Strategy-informed design bridging UX thinking with business conversion goals",
      "AI-augmented development using prompt engineering for faster, cleaner delivery",
    ],
  },
];

const PROCESS = [
  {
    n: "01",
    t: "DISCOVERY",
    c: C.red,
    d: "Deep-dive call on your business goals, audience, and success metrics. My BD background means I ask questions a typical developer doesn't — about conversion, retention, ROI.",
  },
  {
    n: "02",
    t: "DESIGN",
    c: "#ff8800",
    d: "Figma wireframes to high-fidelity mockups with your brand system. Full review cycle before a single line of code is written.",
  },
  {
    n: "03",
    t: "BUILD",
    c: "#00ff88",
    d: "React/Next.js production code with animations, mobile-first, Core Web Vitals optimised. Clean, documented, built to scale.",
  },
  {
    n: "04",
    t: "LAUNCH",
    c: "#00aaff",
    d: "Deployment, domain, analytics and a 30-day support window post-launch. Full handover so you own your site completely.",
  },
];

const SKILLS_T = [
  { n: "React / Next.js", p: 88, c: C.red },
  { n: "Figma & UI Design", p: 85, c: "#ff8800" },
  { n: "Three.js / WebGL", p: 76, c: "#00ff88" },
  { n: "AI Prompting", p: 90, c: "#00aaff" },
  { n: "Tailwind / CSS", p: 86, c: C.red },
  { n: "Canva", p: 82, c: "#ff8800" },
];
const SKILLS_B = [
  "Client Relationship Mgmt",
  "Consultative Selling",
  "Revenue Conversion",
  "Key Account Mgmt",
  "CRM & Automation",
  "Go-to-Market Strategy",
  "Payment Tracking",
  "Campaign Collab",
  "Visa Documentation",
  "Student Mentoring",
];
const SKILLS_S = [
  "Adaptability",
  "Communication",
  "Problem-Solving",
  "Teamwork",
  "Stakeholder Mgmt",
  "Data-Driven Thinking",
  "Process Optimization",
  "Attention to Detail",
];
const RCOLS = [C.red, "#ff8800", "#00ff88", "#00aaff", "#ff44aa", "#ffcc00"];

const CSS = [
  "@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;700;900&family=IBM+Plex+Mono:wght@300;400;500;700&display=swap');",
  "*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}",
  "html{scroll-behavior:smooth}",
  "body{background:#0c0c0c;font-family:'IBM Plex Mono',monospace;color:#f5f5f0;overflow-x:hidden;background-image:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.012) 2px,rgba(255,255,255,0.012) 4px)}",
  "::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:#0c0c0c}::-webkit-scrollbar-thumb{background:#ff1a1a}",
  "@media(hover:hover){html,body,a,button{cursor:none}.co{position:fixed;z-index:9999;pointer-events:none;width:20px;height:20px;border:2px solid #ff1a1a;transform:translate(-50%,-50%);transition:width .1s,height .1s;mix-blend-mode:difference}.ci{position:fixed;z-index:9999;pointer-events:none;width:4px;height:4px;background:#ff1a1a;transform:translate(-50%,-50%)}.co.h{width:44px;height:44px;border-color:#f5f5f0}.co.c{width:10px;height:10px}}",
  "@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}",
  "@keyframes rPulse{0%{box-shadow:0 0 0 0 rgba(255,26,26,0.45)}70%{box-shadow:0 0 0 14px rgba(255,26,26,0)}100%{box-shadow:0 0 0 0 rgba(255,26,26,0)}}",
  "@keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}",
  "@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}",
  "@keyframes flicker{0%,91%,95%,100%{opacity:1}92%,94%{opacity:.55}}",
  "@keyframes glitch{0%{clip-path:inset(0 0 95% 0);transform:translate(-4px,0);color:#ff1a1a}20%{clip-path:inset(80% 0 10% 0);transform:translate(-2px,0)}30%,100%{clip-path:inset(0 0 0 0);transform:none}}",
  "@keyframes glitchB{0%{clip-path:inset(50% 0 30% 0);transform:translate(3px,0);color:#00aaff}30%,100%{clip-path:inset(0 0 0 0);transform:none}}",
  ".card{background:#111111;border:1px solid #2a2a2a;transition:border-color .15s,box-shadow .15s}",
  ".card:hover{border-color:#ff1a1a;box-shadow:0 0 0 1px rgba(255,26,26,0.13),inset 0 0 30px rgba(255,26,26,0.04)}",
  ".bt{transition:all .15s;border:none;outline:none;cursor:pointer}",
  ".bt:hover{transform:translate(-2px,-2px);box-shadow:3px 3px 0 #ff1a1a}",
  ".bt:active{transform:translate(0,0);box-shadow:none}",
  ".nl{font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#888880;text-decoration:none;transition:color .1s;cursor:pointer;position:relative}",
  ".nl:hover,.nl.act{color:#f5f5f0}",
  ".nl.act::after{content:'';position:absolute;bottom:-4px;left:0;right:0;height:2px;background:#ff1a1a}",
  ".gh{position:relative;display:inline-block}",
  ".gh::before,.gh::after{content:attr(data-text);position:absolute;inset:0;color:inherit;pointer-events:none;opacity:0}",
  ".gh:hover::before{animation:glitch .4s steps(1) forwards;opacity:1}",
  ".gh:hover::after{animation:glitchB .4s steps(1) .05s forwards;opacity:1}",
  ".scanlines{position:fixed;inset:0;z-index:2;pointer-events:none;background:repeating-linear-gradient(0deg,transparent,transparent 1px,rgba(0,0,0,0.04) 1px,rgba(0,0,0,0.04) 2px);animation:flicker 8s ease-in-out infinite}",
  ".mwrap{overflow:hidden;white-space:nowrap}",
  ".minner{display:inline-block;animation:marquee 22s linear infinite}",
  "input,textarea,select{outline:none}",
  "input::placeholder,textarea::placeholder{color:#444440}",
].join("\n");

export default function Portfolio() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const curORef = useRef(null);
  const curIRef = useRef(null);
  const curPos = useRef({ x: 0, y: 0 });
  const curTgt = useRef({ x: 0, y: 0 });
  const statsRef = useRef(null);

  const [nav, setNav] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [statsLive, setStatsLive] = useState(false);
  const [ghLive, setGhLive] = useState(false);
  const [repos, setRepos] = useState([]);
  const [reposLoad, setReposLoad] = useState(true);
  const [ghProfile, setGhProfile] = useState(null);
  const [ghContribs, setGhContribs] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    budget: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const ghRef = useRef(null);

  useEffect(() => {
    document.title = "ISHAN JAIN — WEB DESIGNER x BD PROFESSIONAL";
    const el = document.createElement("style");
    el.textContent = CSS;
    document.head.appendChild(el);
    const chk = () => setMobile(window.innerWidth < 769);
    chk();
    window.addEventListener("resize", chk);
    return () => {
      window.removeEventListener("resize", chk);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = window.innerWidth,
      h = window.innerHeight,
      raf;
    canvas.width = w;
    canvas.height = h;
    const chars = "01ISHAN/BD#%@!<>[]".split("");
    const cols = Math.floor(w / 28);
    const drops = Array.from({ length: cols }, () => Math.random() * -60);
    const draw = () => {
      raf = requestAnimationFrame(draw);
      ctx.fillStyle = "rgba(12,12,12,0.13)";
      ctx.fillRect(0, 0, w, h);
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.font = "bold 11px 'IBM Plex Mono',monospace";
        ctx.fillStyle = "rgba(255,26,26," + (Math.random() * 0.5 + 0.25) + ")";
        ctx.fillText(char, i * 28, y * 16);
        if (y * 16 > h && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.35;
      });
      const cg = ctx.createRadialGradient(
        mouseRef.current.x,
        mouseRef.current.y,
        0,
        mouseRef.current.x,
        mouseRef.current.y,
        130,
      );
      cg.addColorStop(0, "rgba(255,26,26,0.025)");
      cg.addColorStop(1, "transparent");
      ctx.fillStyle = cg;
      ctx.fillRect(0, 0, w, h);
    };
    draw();
    const onR = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    const onM = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("resize", onR);
    window.addEventListener("mousemove", onM);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onR);
      window.removeEventListener("mousemove", onM);
    };
  }, []);

  useEffect(() => {
    if (mobile) return;
    const o = curORef.current,
      dot = curIRef.current;
    if (!o || !dot) return;
    let raf;
    const lerp = (a, b, t) => a + (b - a) * t;
    const onM = (e) => {
      curTgt.current = { x: e.clientX, y: e.clientY };
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";
    };
    const tick = () => {
      curPos.current.x = lerp(curPos.current.x, curTgt.current.x, 0.12);
      curPos.current.y = lerp(curPos.current.y, curTgt.current.y, 0.12);
      o.style.left = curPos.current.x + "px";
      o.style.top = curPos.current.y + "px";
      raf = requestAnimationFrame(tick);
    };
    tick();
    const onE = () => o.classList.add("h"),
      onL = () => o.classList.remove("h");
    const onD = () => o.classList.add("c"),
      onU = () => o.classList.remove("c");
    window.addEventListener("mousemove", onM);
    window.addEventListener("mousedown", onD);
    window.addEventListener("mouseup", onU);
    document.querySelectorAll("a,button,.card").forEach((el) => {
      el.addEventListener("mouseenter", onE);
      el.addEventListener("mouseleave", onL);
    });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onM);
    };
  }, [mobile]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStatsLive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) setNav(e.target.id);
        });
      },
      { threshold: 0.25 },
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.toLowerCase());
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    fetch(
      "https://api.github.com/users/ishan1501/repos?sort=updated&per_page=100",
    )
      .then((r) => r.json())
      .then((data) => {
        setRepos(Array.isArray(data) ? data : []);
        setReposLoad(false);
      })
      .catch(() => setReposLoad(false));
    fetch("https://api.github.com/users/ishan1501")
      .then((r) => r.json())
      .then((data) => setGhProfile(data))
      .catch(() => {});
    fetch("https://github-contributions-api.jogruber.de/v4/ishan1501?y=last")
      .then((r) => r.json())
      .then((data) => {
        if (data && data.contributions) setGhContribs(data.contributions);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setGhLive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    if (ghRef.current) obs.observe(ghRef.current);
    return () => obs.disconnect();
  }, []);

  const goto = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const submitForm = () => {
    if (!form.name || !form.message) return;
    const msg =
      "Hi Ishan! Portfolio inquiry.\n\nName: " +
      form.name +
      "\nEmail: " +
      form.email +
      "\nBudget: " +
      form.budget +
      "\nMessage: " +
      form.message;
    window.open(
      "https://wa.me/918279988591?text=" + encodeURIComponent(msg),
      "_blank",
    );
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const W = { maxWidth: "1200px", margin: "0 auto" };
  const P = { padding: "clamp(72px,10vw,120px) clamp(16px,4vw,48px)" };
  const iSty = {
    background: C.bg3,
    border: "1px solid " + C.border,
    padding: "12px 16px",
    color: C.white,
    fontFamily: C.b,
    fontSize: "13px",
    width: "100%",
    transition: "border-color .15s",
  };
  const onFocus = (e) => {
    e.target.style.borderColor = C.red;
  };
  const onBlur = (e) => {
    e.target.style.borderColor = C.border;
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg }}>
      {!mobile && (
        <>
          <div ref={curORef} className="co" />
          <div ref={curIRef} className="ci" />
        </>
      )}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0.5,
        }}
      />
      <div className="scanlines" />
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "fixed",
            top: (i + 1) * 16.66 + "%",
            left: 0,
            right: 0,
            height: "1px",
            background: "rgba(255,255,255,0.02)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 500,
          background: "rgba(12,12,12,0.96)",
          borderBottom: "2px solid " + C.red,
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <div
          style={{
            ...W,
            padding: "0 24px",
            height: "52px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            onClick={() => goto("home")}
            className="gh"
            data-text="ISHAN JAIN"
            style={{
              fontFamily: C.h,
              fontSize: "26px",
              letterSpacing: "2px",
              color: C.white,
              cursor: "pointer",
            }}
          >
            ISHAN JAIN<span style={{ color: C.red }}>_</span>
          </div>
          {!mobile && (
            <div style={{ display: "flex", gap: "20px" }}>
              {NAV.map((n) => (
                <span
                  key={n}
                  className={"nl" + (nav === n.toLowerCase() ? " act" : "")}
                  onClick={() => goto(n.toLowerCase())}
                >
                  {n}
                </span>
              ))}
            </div>
          )}
          {!mobile && (
            <a
              href="https://wa.me/918279988591"
              target="_blank"
              rel="noreferrer"
              className="bt"
              style={{
                padding: "8px 20px",
                background: C.red,
                color: C.bg,
                fontFamily: C.b,
                fontWeight: 700,
                fontSize: "12px",
                letterSpacing: "1px",
                textDecoration: "none",
                textTransform: "uppercase",
              }}
            >
              HIRE ME
            </a>
          )}
          {mobile && (
            <button
              className="bt"
              onClick={() => setMenuOpen((m) => !m)}
              style={{
                background: "none",
                color: C.white,
                fontSize: "22px",
                padding: "4px 8px",
                border: "1px solid " + C.border,
                lineHeight: 1,
                fontFamily: "sans-serif",
              }}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          )}
        </div>
        {menuOpen && (
          <div
            style={{
              background: C.bg,
              borderTop: "1px solid " + C.border,
              padding: "16px 24px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {NAV.map((n) => (
              <span
                key={n}
                onClick={() => goto(n.toLowerCase())}
                style={{
                  fontFamily: C.s,
                  fontSize: "18px",
                  fontWeight: 700,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: nav === n.toLowerCase() ? C.red : C.grey,
                  padding: "12px 0",
                  borderBottom: "1px solid " + C.border,
                  cursor: "pointer",
                }}
              >
                {n}
              </span>
            ))}
            <a
              href="https://wa.me/918279988591"
              target="_blank"
              rel="noreferrer"
              style={{
                marginTop: "14px",
                padding: "14px",
                textAlign: "center",
                background: C.red,
                color: C.bg,
                fontFamily: C.b,
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "14px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                display: "block",
              }}
            >
              HIRE ME
            </a>
          </div>
        )}
      </nav>

      <div style={{ position: "relative", zIndex: 3, paddingTop: "52px" }}>
        {/* HERO */}
        <section
          id="home"
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 clamp(16px,4vw,48px)",
            borderBottom: "1px solid " + C.border,
            position: "relative",
          }}
        >
          {!mobile && (
            <div
              style={{
                position: "absolute",
                top: "20px",
                right: "24px",
                fontFamily: C.b,
                fontSize: "10px",
                color: C.dim,
                letterSpacing: "1px",
                lineHeight: 1.8,
              }}
            >
              <div>28.4595 N</div>
              <div>77.0266 E</div>
              <div style={{ color: C.red, marginTop: "4px" }}>GURUGRAM</div>
            </div>
          )}
          <div style={{ marginBottom: "28px" }}>
            <Tag>AVAILABLE FOR HIRE</Tag>
          </div>
          <h1
            className="gh"
            data-text="ISHAN"
            style={{
              fontFamily: C.h,
              fontWeight: 400,
              fontSize: "clamp(88px,20vw,240px)",
              lineHeight: 0.82,
              letterSpacing: "2px",
              color: C.white,
            }}
          >
            ISHAN
          </h1>
          <h1
            style={{
              fontFamily: C.h,
              fontWeight: 400,
              fontSize: "clamp(88px,20vw,240px)",
              lineHeight: 0.82,
              letterSpacing: "2px",
              color: "transparent",
              WebkitTextStroke: "2px " + C.red,
            }}
          >
            JAIN
          </h1>
          <div
            style={{
              marginTop: "36px",
              display: "flex",
              flexDirection: mobile ? "column" : "row",
              alignItems: "flex-start",
              gap: mobile ? "24px" : "48px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: 1, minWidth: "260px" }}>
              <p
                style={{
                  fontFamily: C.b,
                  fontSize: "clamp(12px,1.4vw,15px)",
                  color: C.grey,
                  lineHeight: 1.75,
                  maxWidth: "460px",
                }}
              >
                I build{" "}
                <span style={{ color: C.white }}>websites that convert</span> —
                and{" "}
                <span style={{ color: C.white }}>
                  BD strategies that grow revenue.
                </span>
                <br />
                <br />
                Ex-Edoofa · B.Tech CSE · Freelance Designer
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "28px",
                  flexWrap: "wrap",
                }}
              >
                <button
                  className="bt"
                  onClick={() => goto("services")}
                  style={{
                    padding: "12px 28px",
                    background: C.red,
                    color: C.bg,
                    fontFamily: C.b,
                    fontWeight: 700,
                    fontSize: "13px",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    animation: "rPulse 2.5s ease-in-out infinite",
                  }}
                >
                  HIRE ME
                </button>
                <button
                  className="bt"
                  onClick={() => goto("projects")}
                  style={{
                    padding: "12px 28px",
                    background: "transparent",
                    border: "1px solid " + C.border,
                    color: C.white,
                    fontFamily: C.b,
                    fontSize: "13px",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                  }}
                >
                  SEE WORK
                </button>
              </div>
            </div>
            <div
              ref={statsRef}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px 36px",
              }}
            >
              {STATS.map((s, i) => (
                <div key={i}>
                  <div
                    style={{
                      fontFamily: C.h,
                      fontSize: mobile ? "38px" : "50px",
                      lineHeight: 1,
                      color: i === 0 ? C.red : C.white,
                      letterSpacing: "1px",
                    }}
                  >
                    <Counter {...s} trigger={statsLive} />
                  </div>
                  <div
                    style={{
                      fontFamily: C.b,
                      fontSize: "10px",
                      color: C.grey,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      marginTop: "5px",
                      maxWidth: "130px",
                    }}
                  >
                    {s.lab}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "28px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              animation: "floatY 3s ease-in-out infinite",
              opacity: 0.4,
            }}
          >
            <span
              style={{
                fontFamily: C.b,
                fontSize: "9px",
                letterSpacing: "4px",
                color: C.dim,
                textTransform: "uppercase",
              }}
            >
              SCROLL
            </span>
            <div
              style={{
                width: "1px",
                height: "36px",
                background:
                  "linear-gradient(to bottom," + C.red + ",transparent)",
              }}
            />
          </div>
        </section>

        {/* MARQUEE */}
        <div
          style={{ background: C.red, padding: "10px 0", overflow: "hidden" }}
        >
          <div className="mwrap">
            <div className="minner">
              {"WEB DESIGN · BUSINESS DEVELOPMENT · AI WORKFLOWS · REACT · FIGMA · NEXT.JS · CONVERSION STRATEGY · ".repeat(
                4,
              )}
            </div>
          </div>
        </div>

        {/* ABOUT */}
        <section
          id="about"
          style={{ ...W, ...P, borderBottom: "1px solid " + C.border }}
        >
          <div style={{ marginBottom: "56px" }}>
            <SLabel>ABOUT</SLabel>
            <BigH>
              THE PERSON
              <br />
              <span style={{ color: C.red }}>BEHIND</span>
              <br />
              THE WORK
            </BigH>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: mobile ? "1fr" : "1fr 1.8fr",
              gap: "40px",
              alignItems: "start",
            }}
          >
            <div>
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    top: "-6px",
                    left: "-6px",
                    width: "24px",
                    height: "24px",
                    borderTop: "2px solid " + C.red,
                    borderLeft: "2px solid " + C.red,
                    zIndex: 2,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "-6px",
                    right: "-6px",
                    width: "24px",
                    height: "24px",
                    borderBottom: "2px solid " + C.red,
                    borderRight: "2px solid " + C.red,
                    zIndex: 2,
                  }}
                />
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "3/3.5",
                    background: C.bg3,
                    border: "1px solid " + C.border,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {PHOTO ? (
                    <img
                      src={PHOTO}
                      alt="Ishan"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <>
                      <div
                        style={{
                          fontFamily: C.h,
                          fontSize: "88px",
                          color: C.red,
                          lineHeight: 1,
                        }}
                      >
                        IJ
                      </div>
                      <div
                        style={{
                          fontFamily: C.b,
                          fontSize: "9px",
                          color: C.dim,
                          letterSpacing: "3px",
                          marginTop: "8px",
                        }}
                      >
                        UPLOAD PHOTO
                      </div>
                    </>
                  )}
                </div>
                <div
                  className="card"
                  style={{ marginTop: "12px", padding: "16px 20px" }}
                >
                  <div
                    style={{
                      fontFamily: C.h,
                      fontSize: "22px",
                      letterSpacing: "1px",
                      color: C.white,
                    }}
                  >
                    ISHAN JAIN
                  </div>
                  <div
                    style={{
                      fontFamily: C.b,
                      fontSize: "11px",
                      color: C.grey,
                      marginTop: "4px",
                    }}
                  >
                    GURUGRAM, HARYANA
                  </div>
                  <div
                    style={{
                      fontFamily: C.b,
                      fontSize: "11px",
                      color: C.grey,
                      marginTop: "2px",
                    }}
                  >
                    jainishan18@gmail.com
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      marginTop: "12px",
                      flexWrap: "wrap",
                    }}
                  >
                    {[
                      ["GH", "https://github.com/ishan1501"],
                      ["LI", "https://linkedin.com/in/ishan1501/"],
                      ["EM", "mailto:jainishan18@gmail.com"],
                    ].map(([l, h]) => (
                      <a
                        key={l}
                        href={h}
                        target="_blank"
                        rel="noreferrer"
                        className="bt"
                        style={{
                          padding: "5px 12px",
                          background: "transparent",
                          border: "1px solid " + C.border,
                          color: C.grey,
                          fontFamily: C.b,
                          fontWeight: 700,
                          fontSize: "11px",
                          textDecoration: "none",
                          letterSpacing: "1px",
                        }}
                      >
                        [{l}]
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "18px" }}
            >
              <p
                style={{
                  fontFamily: C.b,
                  fontSize: "14px",
                  color: C.white,
                  lineHeight: 1.85,
                }}
              >
                I'm a CS graduate who went deep into business development —
                spending a year managing the full post-enrollment funnel at
                Edoofa, an international EdTech company, and contributing to
                ~70% of company revenue.
              </p>
              <p
                style={{
                  fontFamily: C.b,
                  fontSize: "12px",
                  color: C.grey,
                  lineHeight: 1.85,
                }}
              >
                That experience gave me something most developers don't have: a
                real understanding of how businesses grow, what clients actually
                need, and how to communicate across cultures and time zones.
              </p>
              <p
                style={{
                  fontFamily: C.b,
                  fontSize: "12px",
                  color: C.grey,
                  lineHeight: 1.85,
                }}
              >
                Now I combine both — building premium websites with a conversion
                mindset, and consulting on BD strategy with technical precision.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1px",
                  background: C.border,
                  border: "1px solid " + C.border,
                }}
              >
                {[
                  ["DEGREE", "B.Tech CSE — LPU"],
                  ["LOCATION", "Gurugram, Haryana"],
                  ["LANGUAGES", "English, Hindi"],
                  ["STATUS", "Open to Work"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    style={{ background: C.bg2, padding: "14px 16px" }}
                  >
                    <div
                      style={{
                        fontFamily: C.b,
                        fontSize: "9px",
                        color: C.red,
                        letterSpacing: "2px",
                        marginBottom: "5px",
                      }}
                    >
                      {k}
                    </div>
                    <div
                      style={{
                        fontFamily: C.s,
                        fontSize: "14px",
                        fontWeight: 700,
                        color: C.white,
                      }}
                    >
                      {v}
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="card"
                style={{ padding: "20px", borderLeft: "3px solid " + C.red }}
              >
                <div
                  style={{
                    fontFamily: C.b,
                    fontSize: "9px",
                    color: C.red,
                    letterSpacing: "2px",
                    marginBottom: "14px",
                  }}
                >
                  EDUCATION
                </div>
                {[
                  ["B.Tech, Computer Science & Engineering", "LPU"],
                  ["Intermediate — 12th", "I.G.P.I.C Manjhola Billoch"],
                  ["Matriculation — 10th", "PMSS Dhampur, Bijnor"],
                ].map(([d, inst], idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "12px",
                      paddingBottom: idx < 2 ? "10px" : "0",
                      marginBottom: idx < 2 ? "10px" : "0",
                      borderBottom: idx < 2 ? "1px solid " + C.border : "none",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: C.b,
                        fontSize: "12px",
                        color: C.white,
                      }}
                    >
                      {d}
                    </div>
                    <div
                      style={{
                        fontFamily: C.b,
                        fontSize: "11px",
                        color: C.grey,
                        textAlign: "right",
                        flexShrink: 0,
                      }}
                    >
                      {inst}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section
          id="experience"
          style={{ ...W, ...P, borderBottom: "1px solid " + C.border }}
        >
          <div style={{ marginBottom: "56px" }}>
            <SLabel color={C.red}>TRACK RECORD</SLabel>
            <BigH>
              WORK
              <br />
              <span style={{ color: C.red }}>EXPERIENCE</span>
            </BigH>
          </div>
          {EXP.map((job, ji) => (
            <div
              key={job.co}
              style={{
                position: "relative",
                paddingLeft: mobile ? "0" : "32px",
                paddingBottom: "24px",
              }}
            >
              {!mobile && (
                <>
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "20px",
                      bottom: 0,
                      width: "1px",
                      background:
                        "linear-gradient(to bottom," +
                        job.color +
                        "55,transparent)",
                      display: ji === EXP.length - 1 ? "none" : "block",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: "-5px",
                      top: "18px",
                      width: "11px",
                      height: "11px",
                      background: job.color,
                      boxShadow: "0 0 12px " + job.color,
                    }}
                  />
                </>
              )}
              <div
                className="card"
                style={{ borderLeft: "3px solid " + job.color }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "12px",
                    marginBottom: "8px",
                    padding: "24px 24px 0",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: C.h,
                        fontSize: mobile ? "20px" : "26px",
                        letterSpacing: "1px",
                        color: C.white,
                        marginBottom: "4px",
                      }}
                    >
                      {job.role}
                    </div>
                    <div
                      style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
                    >
                      <span
                        style={{
                          fontFamily: C.s,
                          fontWeight: 800,
                          fontSize: "14px",
                          color: job.color,
                          textTransform: "uppercase",
                        }}
                      >
                        {job.co}
                      </span>
                      <span
                        style={{
                          fontFamily: C.b,
                          fontSize: "11px",
                          color: C.grey,
                        }}
                      >
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <Tag color={job.color}>{job.period}</Tag>
                </div>
                <p
                  style={{
                    fontFamily: C.b,
                    fontSize: "12px",
                    color: C.dim,
                    fontStyle: "italic",
                    padding: "12px 24px 16px",
                    borderBottom: "1px solid " + C.border,
                  }}
                >
                  {job.desc}
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                    padding: "16px 24px 24px",
                  }}
                >
                  {job.bullets.map((b, bi) => (
                    <li
                      key={bi}
                      style={{
                        display: "flex",
                        gap: "12px",
                        alignItems: "flex-start",
                      }}
                    >
                      <span
                        style={{
                          color: job.color,
                          flexShrink: 0,
                          fontFamily: C.b,
                          fontSize: "10px",
                          marginTop: "5px",
                        }}
                      >
                        &#9654;
                      </span>
                      <span
                        style={{
                          fontFamily: C.b,
                          fontSize: "12px",
                          color: C.grey,
                          lineHeight: 1.75,
                        }}
                      >
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        {/* PROJECTS - live GitHub */}
        <section
          id="projects"
          style={{ ...W, ...P, borderBottom: "1px solid " + C.border }}
        >
          <div style={{ marginBottom: "56px" }}>
            <SLabel color="#ff8800">PORTFOLIO</SLabel>
            <BigH>
              GITHUB
              <br />
              <span style={{ color: "#ff8800" }}>PROJECTS</span>
            </BigH>
          </div>
          {reposLoad ? (
            <div
              style={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
                padding: "40px 0",
              }}
            >
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  style={{
                    width: "6px",
                    height: "6px",
                    background: C.red,
                    display: "inline-block",
                    animation:
                      "blink 1.2s ease-in-out " + d * 0.3 + "s infinite",
                  }}
                />
              ))}
              <span
                style={{
                  fontFamily: C.b,
                  fontSize: "12px",
                  color: C.grey,
                  marginLeft: "8px",
                  letterSpacing: "1px",
                }}
              >
                FETCHING REPOS...
              </span>
            </div>
          ) : repos.length === 0 ? (
            <div
              style={{
                fontFamily: C.b,
                fontSize: "13px",
                color: C.grey,
                padding: "40px 0",
              }}
            >
              NO REPOS FOUND —{" "}
              <a
                href="https://github.com/ishan1501"
                target="_blank"
                rel="noreferrer"
                style={{ color: C.red }}
              >
                VIEW ON GITHUB
              </a>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr",
                gap: "1px",
                background: C.border,
                border: "1px solid " + C.border,
              }}
            >
              {repos.slice(0, 12).map((repo, pi) => {
                const col = RCOLS[pi % RCOLS.length];
                return (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="card"
                    style={{
                      background: C.bg2,
                      display: "flex",
                      flexDirection: "column",
                      textDecoration: "none",
                      borderTop: "2px solid " + col,
                    }}
                  >
                    <div
                      style={{
                        padding: "16px 18px 12px",
                        borderBottom: "1px solid " + C.border,
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: "8px",
                          height: "8px",
                          background: col,
                          flexShrink: 0,
                        }}
                      />
                      <div
                        style={{
                          fontFamily: C.h,
                          fontSize: "18px",
                          letterSpacing: "1px",
                          color: C.white,
                          lineHeight: 1,
                          flex: 1,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {repo.name.toUpperCase().replace(/-/g, " ")}
                      </div>
                    </div>
                    <div
                      style={{
                        padding: "14px 18px 18px",
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: C.b,
                          fontSize: "12px",
                          color: C.grey,
                          lineHeight: 1.75,
                          flex: 1,
                          minHeight: "48px",
                        }}
                      >
                        {repo.description || "No description provided."}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          gap: "12px",
                          alignItems: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        {repo.language && (
                          <span
                            style={{
                              fontFamily: C.b,
                              fontSize: "10px",
                              color: col,
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            <span
                              style={{
                                width: "7px",
                                height: "7px",
                                borderRadius: "50%",
                                background: col,
                                display: "inline-block",
                              }}
                            />
                            {repo.language.toUpperCase()}
                          </span>
                        )}
                        {repo.stargazers_count > 0 && (
                          <span
                            style={{
                              fontFamily: C.b,
                              fontSize: "10px",
                              color: C.grey,
                            }}
                          >
                            &#9733; {repo.stargazers_count}
                          </span>
                        )}
                        <span
                          style={{
                            fontFamily: C.b,
                            fontSize: "10px",
                            color: C.dim,
                            marginLeft: "auto",
                          }}
                        >
                          {new Date(repo.updated_at)
                            .toLocaleDateString("en-GB", {
                              month: "short",
                              year: "numeric",
                            })
                            .toUpperCase()}
                        </span>
                      </div>
                      {repo.homepage && (
                        <div
                          style={{
                            fontFamily: C.b,
                            fontSize: "10px",
                            color: col,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {repo.homepage.replace(/^https?:\/\//, "")}
                        </div>
                      )}
                    </div>
                  </a>
                );
              })}
            </div>
          )}
          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <a
              href="https://github.com/ishan1501"
              target="_blank"
              rel="noreferrer"
              className="bt card"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 28px",
                textDecoration: "none",
                color: C.white,
                fontFamily: C.b,
                fontSize: "12px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                background: C.bg2,
              }}
            >
              VIEW ALL ON GITHUB
            </a>
          </div>
        </section>

        {/* PROCESS */}
        <section
          id="process"
          style={{ ...W, ...P, borderBottom: "1px solid " + C.border }}
        >
          <div style={{ marginBottom: "56px" }}>
            <SLabel color="#00ff88">HOW I WORK</SLabel>
            <BigH>
              THE
              <br />
              <span style={{ color: "#00ff88" }}>PROCESS</span>
            </BigH>
            <p
              style={{
                fontFamily: C.b,
                fontSize: "13px",
                color: C.grey,
                lineHeight: 1.75,
                marginTop: "16px",
                maxWidth: "480px",
              }}
            >
              Transparent, structured, accountable.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: mobile ? "1fr" : "repeat(4,1fr)",
              gap: "1px",
              background: C.border,
              border: "1px solid " + C.border,
            }}
          >
            {PROCESS.map((p) => (
              <div
                key={p.n}
                className="card"
                style={{
                  background: C.bg2,
                  padding: "28px 22px",
                  borderTop: "3px solid " + p.c,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    fontFamily: C.h,
                    fontSize: "56px",
                    color: p.c + "15",
                    position: "absolute",
                    top: "8px",
                    right: "14px",
                    lineHeight: 1,
                  }}
                >
                  {p.n}
                </div>
                <div
                  style={{
                    fontFamily: C.b,
                    fontSize: "10px",
                    color: p.c,
                    letterSpacing: "3px",
                    marginBottom: "14px",
                  }}
                >
                  STEP {p.n}
                </div>
                <div
                  className="gh"
                  data-text={p.t}
                  style={{
                    fontFamily: C.h,
                    fontSize: "28px",
                    letterSpacing: "1px",
                    color: C.white,
                    marginBottom: "14px",
                  }}
                >
                  {p.t}
                </div>
                <p
                  style={{
                    fontFamily: C.b,
                    fontSize: "12px",
                    color: C.grey,
                    lineHeight: 1.8,
                  }}
                >
                  {p.d}
                </p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "32px" }}>
            <a
              href="https://wa.me/918279988591?text=Hi+Ishan!+Discovery+call."
              target="_blank"
              rel="noreferrer"
              className="bt"
              style={{
                padding: "14px 36px",
                background: "#00ff88",
                color: C.bg,
                fontFamily: C.b,
                fontWeight: 700,
                fontSize: "13px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                display: "inline-block",
                textDecoration: "none",
              }}
            >
              BOOK DISCOVERY CALL
            </a>
          </div>
        </section>

        {/* SKILLS */}
        <section
          id="skills"
          style={{ ...W, ...P, borderBottom: "1px solid " + C.border }}
        >
          <div style={{ marginBottom: "56px" }}>
            <SLabel color="#00aaff">CAPABILITIES</SLabel>
            <BigH>
              SKILL
              <br />
              <span style={{ color: "#00aaff" }}>SET</span>
            </BigH>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr",
              gap: "24px",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: C.b,
                  fontSize: "9px",
                  color: C.red,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                — TECHNICAL
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {SKILLS_T.map((s) => (
                  <div
                    key={s.n}
                    className="card"
                    style={{ padding: "12px 14px" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "7px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: C.b,
                          fontSize: "12px",
                          color: C.white,
                        }}
                      >
                        {s.n}
                      </span>
                      <span
                        style={{
                          fontFamily: C.b,
                          fontSize: "10px",
                          color: C.grey,
                        }}
                      >
                        {s.p}%
                      </span>
                    </div>
                    <div style={{ height: "2px", background: C.border }}>
                      <div
                        style={{
                          height: "100%",
                          width: s.p + "%",
                          background: s.c,
                          boxShadow: "0 0 6px " + s.c,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontFamily: C.b,
                  fontSize: "9px",
                  color: "#ff8800",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                — BUSINESS
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                {SKILLS_B.map((s) => (
                  <div
                    key={s}
                    className="card"
                    style={{
                      padding: "10px 14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span style={{ color: "#ff8800", fontSize: "8px" }}>
                      &#9654;
                    </span>
                    <span
                      style={{
                        fontFamily: C.b,
                        fontSize: "12px",
                        color: C.grey,
                      }}
                    >
                      {s}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontFamily: C.b,
                  fontSize: "9px",
                  color: "#00ff88",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                — SOFT SKILLS
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px",
                  marginBottom: "24px",
                }}
              >
                {SKILLS_S.map((s) => (
                  <span
                    key={s}
                    style={{
                      fontFamily: C.b,
                      fontSize: "11px",
                      color: C.grey,
                      border: "1px solid " + C.border,
                      padding: "4px 10px",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div
                style={{
                  fontFamily: C.b,
                  fontSize: "9px",
                  color: "#00aaff",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  marginBottom: "14px",
                }}
              >
                — LANGUAGES
              </div>
              <div
                style={{ display: "flex", gap: "8px", marginBottom: "20px" }}
              >
                {[
                  ["ENGLISH", "Fluent"],
                  ["HINDI", "Native"],
                ].map(([l, lv]) => (
                  <div
                    key={l}
                    className="card"
                    style={{
                      padding: "12px 16px",
                      flex: 1,
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: C.h,
                        fontSize: "18px",
                        color: C.white,
                      }}
                    >
                      {l}
                    </div>
                    <div
                      style={{
                        fontFamily: C.b,
                        fontSize: "10px",
                        color: C.grey,
                        marginTop: "3px",
                      }}
                    >
                      {lv}
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  fontFamily: C.b,
                  fontSize: "9px",
                  color: C.dim,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  marginBottom: "14px",
                }}
              >
                — TOOLS
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                {[
                  "Figma",
                  "Canva",
                  "Notion",
                  "WhatsApp Biz",
                  "Meta Suite",
                  "Google Workspace",
                  "VS Code",
                  "GitHub",
                ].map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: C.b,
                      fontSize: "10px",
                      color: C.dim,
                      border: "1px solid " + C.border,
                      padding: "3px 8px",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section
          id="services"
          style={{ ...W, ...P, borderBottom: "1px solid " + C.border }}
        >
          <div style={{ marginBottom: "56px" }}>
            <SLabel color={C.red}>SERVICES</SLabel>
            <BigH>
              WHAT I<br />
              <span style={{ color: C.red }}>OFFER</span>
            </BigH>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: mobile ? "1fr" : "1.5fr 1fr",
              gap: "1px",
              background: C.border,
              border: "1px solid " + C.border,
            }}
          >
            <div
              className="card"
              style={{
                background: C.bg2,
                borderTop: "3px solid " + C.red,
                padding: "36px",
                gridRow: mobile ? "auto" : "span 2",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: C.b,
                    fontSize: "9px",
                    color: C.red,
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    marginBottom: "16px",
                  }}
                >
                  01 — FLAGSHIP
                </div>
                <h3
                  style={{
                    fontFamily: C.h,
                    fontSize: mobile ? "30px" : "40px",
                    color: C.white,
                    lineHeight: 1,
                    marginBottom: "4px",
                  }}
                >
                  PREMIUM WEB
                </h3>
                <h3
                  style={{
                    fontFamily: C.h,
                    fontSize: mobile ? "30px" : "40px",
                    color: C.red,
                    lineHeight: 1,
                    marginBottom: "20px",
                  }}
                >
                  DESIGN & DEV
                </h3>
                <p
                  style={{
                    fontFamily: C.b,
                    fontSize: "13px",
                    color: C.grey,
                    lineHeight: 1.85,
                    marginBottom: "20px",
                  }}
                >
                  From Figma to deployed. Performance-first websites built to
                  convert. I bring a BD lens to every project — I care about
                  your conversion rate, not just your colour palette.
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                    marginBottom: "20px",
                  }}
                >
                  {[
                    "Next.js",
                    "React",
                    "Three.js",
                    "Figma",
                    "Tailwind",
                    "Framer Motion",
                    "SEO",
                    "Mobile-First",
                  ].map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    listStyle: "none",
                    marginBottom: "28px",
                  }}
                >
                  {[
                    "Custom design — no templates",
                    "Full mobile responsiveness",
                    "Core Web Vitals optimised",
                    "AI chatbot integration available",
                    "Delivered in 1–3 weeks",
                  ].map((pt) => (
                    <li
                      key={pt}
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                        fontFamily: C.b,
                        fontSize: "12px",
                        color: C.grey,
                      }}
                    >
                      <span style={{ color: "#00ff88" }}>✓</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="https://wa.me/918279988591?text=Hi+Ishan!+Web+design+enquiry."
                target="_blank"
                rel="noreferrer"
                className="bt"
                style={{
                  display: "block",
                  padding: "14px 24px",
                  textAlign: "center",
                  background: C.red,
                  color: C.bg,
                  fontFamily: C.b,
                  fontWeight: 700,
                  fontSize: "13px",
                  textDecoration: "none",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                }}
              >
                START A PROJECT
              </a>
            </div>
            {[
              {
                n: "02",
                t: "BD & SALES CONSULTING",
                c: "#ff8800",
                d: "Go-to-market, key account frameworks, conversion funnel optimisation. Backed by real EdTech experience driving ~70% of company revenue.",
              },
              {
                n: "03",
                t: "SOCIAL MEDIA + AI WORKFLOWS",
                c: "#00aaff",
                d: "Campaigns that drive engagement. Prompt engineering and workflow automation — practical AI, not theory.",
              },
            ].map((sv, i) => (
              <div
                key={sv.n}
                className="card"
                style={{
                  background: C.bg2,
                  padding: "28px",
                  borderTop: "3px solid " + sv.c,
                }}
              >
                <div
                  style={{
                    fontFamily: C.b,
                    fontSize: "9px",
                    color: sv.c,
                    letterSpacing: "3px",
                    marginBottom: "12px",
                  }}
                >
                  {sv.n}
                </div>
                <div
                  style={{
                    fontFamily: C.h,
                    fontSize: "22px",
                    color: C.white,
                    marginBottom: "12px",
                    lineHeight: 1.1,
                  }}
                >
                  {sv.t}
                </div>
                <p
                  style={{
                    fontFamily: C.b,
                    fontSize: "12px",
                    color: C.grey,
                    lineHeight: 1.8,
                    marginBottom: "16px",
                  }}
                >
                  {sv.d}
                </p>
                <a
                  href="https://wa.me/918279988591"
                  target="_blank"
                  rel="noreferrer"
                  className="bt"
                  style={{
                    display: "inline-block",
                    padding: "8px 18px",
                    border: "1px solid " + sv.c + "44",
                    color: sv.c,
                    fontFamily: C.b,
                    fontSize: "11px",
                    textDecoration: "none",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    background: "transparent",
                  }}
                >
                  ENQUIRE
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* GITHUB */}
        <section
          id="github"
          style={{ ...W, ...P, borderBottom: "1px solid " + C.border }}
          ref={ghRef}
        >
          <div style={{ marginBottom: "48px" }}>
            <SLabel color={C.grey}>OPEN SOURCE</SLabel>
            <BigH>
              GITHUB
              <br />
              <span style={{ color: C.red }}>ACTIVITY</span>
            </BigH>
          </div>

          {/* Profile banner */}
          <div
            className="card"
            style={{
              padding: "24px 28px",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "24px",
              flexWrap: "wrap",
              borderTop: "2px solid " + C.red,
            }}
          >
            {ghProfile && ghProfile.avatar_url && (
              <img
                src={ghProfile.avatar_url}
                alt="avatar"
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "0",
                  border: "2px solid " + C.red,
                  flexShrink: 0,
                }}
              />
            )}
            <div style={{ flex: 1, minWidth: "180px" }}>
              <div
                style={{
                  fontFamily: C.h,
                  fontSize: "26px",
                  letterSpacing: "2px",
                  color: C.white,
                  lineHeight: 1,
                }}
              >
                {ghProfile ? ghProfile.login.toUpperCase() : "ISHAN1501"}
              </div>
              <div
                style={{
                  fontFamily: C.b,
                  fontSize: "11px",
                  color: C.grey,
                  marginTop: "5px",
                }}
              >
                {ghProfile && ghProfile.bio
                  ? ghProfile.bio
                  : "React · Next.js · Three.js · Web Designer & BD Professional"}
              </div>
              {ghProfile && ghProfile.location && (
                <div
                  style={{
                    fontFamily: C.b,
                    fontSize: "10px",
                    color: C.dim,
                    marginTop: "4px",
                  }}
                >
                  {ghProfile.location}
                </div>
              )}
            </div>
            <a
              href="https://github.com/ishan1501"
              target="_blank"
              rel="noreferrer"
              className="bt"
              style={{
                padding: "10px 22px",
                background: C.red,
                color: C.bg,
                fontFamily: C.b,
                fontWeight: 700,
                fontSize: "12px",
                textDecoration: "none",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              VIEW PROFILE
            </a>
          </div>

          {/* Animated stat counters */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(4,1fr)",
              gap: "1px",
              background: C.border,
              border: "1px solid " + C.border,
              marginBottom: "20px",
            }}
          >
            {[
              {
                label: "PUBLIC REPOS",
                val: ghProfile ? ghProfile.public_repos : 0,
                color: C.red,
              },
              {
                label: "FOLLOWERS",
                val: ghProfile ? ghProfile.followers : 0,
                color: "#ff8800",
              },
              {
                label: "TOTAL STARS",
                val: repos.reduce(function (s, r) {
                  return s + (r.stargazers_count || 0);
                }, 0),
                color: "#ffcc00",
              },
              {
                label: "TOTAL FORKS",
                val: repos.reduce(function (s, r) {
                  return s + (r.forks_count || 0);
                }, 0),
                color: "#00ff88",
              },
            ].map(function (st, i) {
              return (
                <div
                  key={i}
                  style={{
                    background: C.bg2,
                    padding: "22px 20px",
                    borderTop: "2px solid " + st.color,
                  }}
                >
                  <div
                    style={{
                      fontFamily: C.h,
                      fontSize: mobile ? "38px" : "48px",
                      lineHeight: 1,
                      color: st.color,
                    }}
                  >
                    <Counter end={st.val} trigger={ghLive} />
                  </div>
                  <div
                    style={{
                      fontFamily: C.b,
                      fontSize: "9px",
                      color: C.grey,
                      letterSpacing: "2px",
                      marginTop: "7px",
                    }}
                  >
                    {st.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Language breakdown */}
          {repos.length > 0 &&
            (function () {
              const langMap = {};
              repos.forEach(function (r) {
                if (r.language)
                  langMap[r.language] = (langMap[r.language] || 0) + 1;
              });
              const langs = Object.entries(langMap)
                .sort(function (a, b) {
                  return b[1] - a[1];
                })
                .slice(0, 6);
              const total = langs.reduce(function (s, l) {
                return s + l[1];
              }, 0);
              const LCOLS = [
                C.red,
                "#ff8800",
                "#00ff88",
                "#00aaff",
                "#ff44aa",
                "#ffcc00",
              ];
              return (
                <div
                  className="card"
                  style={{ padding: "22px 24px", marginBottom: "20px" }}
                >
                  <div
                    style={{
                      fontFamily: C.b,
                      fontSize: "9px",
                      color: C.dim,
                      letterSpacing: "3px",
                      textTransform: "uppercase",
                      marginBottom: "16px",
                    }}
                  >
                    LANGUAGE BREAKDOWN
                  </div>
                  {/* Bar */}
                  <div
                    style={{
                      display: "flex",
                      height: "8px",
                      gap: "2px",
                      marginBottom: "16px",
                    }}
                  >
                    {langs.map(function (l, i) {
                      return (
                        <div
                          key={l[0]}
                          style={{
                            flex: l[1] / total,
                            background: LCOLS[i],
                            height: "100%",
                            boxShadow: "0 0 6px " + LCOLS[i] + "66",
                          }}
                        />
                      );
                    })}
                  </div>
                  {/* Legend */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "12px 24px",
                    }}
                  >
                    {langs.map(function (l, i) {
                      const pct = Math.round((l[1] / total) * 100);
                      return (
                        <div
                          key={l[0]}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "7px",
                          }}
                        >
                          <div
                            style={{
                              width: "10px",
                              height: "10px",
                              background: LCOLS[i],
                              flexShrink: 0,
                            }}
                          />
                          <span
                            style={{
                              fontFamily: C.b,
                              fontSize: "11px",
                              color: C.white,
                            }}
                          >
                            {l[0]}
                          </span>
                          <span
                            style={{
                              fontFamily: C.b,
                              fontSize: "10px",
                              color: C.dim,
                            }}
                          >
                            {pct}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

          {/* Contribution heatmap */}
          <div
            className="card"
            style={{
              padding: "22px 24px",
              marginBottom: "20px",
              overflowX: "auto",
            }}
          >
            <div
              style={{
                fontFamily: C.b,
                fontSize: "9px",
                color: C.dim,
                letterSpacing: "3px",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              CONTRIBUTION HEATMAP — LAST 365 DAYS
              {ghContribs.length > 0 && (
                <span style={{ color: C.red, marginLeft: "12px" }}>
                  {ghContribs.reduce(function (s, d) {
                    return s + d.count;
                  }, 0)}{" "}
                  TOTAL
                </span>
              )}
            </div>
            <GHHeatmap contributions={ghContribs} mobile={mobile} />
          </div>

          {/* Top repos by stars */}
          {repos.length > 0 && (
            <div>
              <div
                style={{
                  fontFamily: C.b,
                  fontSize: "9px",
                  color: C.dim,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                TOP REPOS BY STARS
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr",
                  gap: "1px",
                  background: C.border,
                  border: "1px solid " + C.border,
                }}
              >
                {repos
                  .slice()
                  .sort(function (a, b) {
                    return b.stargazers_count - a.stargazers_count;
                  })
                  .slice(0, 6)
                  .map(function (repo, pi) {
                    const col = RCOLS[pi % RCOLS.length];
                    return (
                      <a
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="card"
                        style={{
                          background: C.bg2,
                          display: "flex",
                          flexDirection: "column",
                          textDecoration: "none",
                          borderTop: "2px solid " + col,
                        }}
                      >
                        <div
                          style={{
                            padding: "14px 16px 10px",
                            borderBottom: "1px solid " + C.border,
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "7px",
                              height: "7px",
                              background: col,
                              flexShrink: 0,
                            }}
                          />
                          <div
                            style={{
                              fontFamily: C.h,
                              fontSize: "16px",
                              letterSpacing: "1px",
                              color: C.white,
                              lineHeight: 1,
                              flex: 1,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {repo.name.toUpperCase().replace(/-/g, " ")}
                          </div>
                        </div>
                        <div
                          style={{
                            padding: "12px 16px",
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                          }}
                        >
                          <p
                            style={{
                              fontFamily: C.b,
                              fontSize: "11px",
                              color: C.grey,
                              lineHeight: 1.7,
                              flex: 1,
                            }}
                          >
                            {repo.description || "No description."}
                          </p>
                          <div
                            style={{
                              display: "flex",
                              gap: "12px",
                              alignItems: "center",
                              flexWrap: "wrap",
                            }}
                          >
                            {repo.language && (
                              <span
                                style={{
                                  fontFamily: C.b,
                                  fontSize: "10px",
                                  color: col,
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                }}
                              >
                                <span
                                  style={{
                                    width: "6px",
                                    height: "6px",
                                    borderRadius: "50%",
                                    background: col,
                                    display: "inline-block",
                                  }}
                                />
                                {repo.language}
                              </span>
                            )}
                            <span
                              style={{
                                fontFamily: C.b,
                                fontSize: "10px",
                                color: C.grey,
                              }}
                            >
                              &#9733; {repo.stargazers_count}
                            </span>
                            <span
                              style={{
                                fontFamily: C.b,
                                fontSize: "10px",
                                color: C.dim,
                                marginLeft: "auto",
                              }}
                            >
                              {new Date(repo.updated_at)
                                .toLocaleDateString("en-GB", {
                                  month: "short",
                                  year: "numeric",
                                })
                                .toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </a>
                    );
                  })}
              </div>
            </div>
          )}
        </section>

        {/* MUSIC */}
        <section
          id="music"
          style={{ ...W, ...P, borderBottom: "1px solid " + C.border }}
        >
          <div style={{ marginBottom: "40px" }}>
            <SLabel color="#ff8800">VIBE CHECK</SLabel>
            <BigH>
              THE
              <br />
              <span style={{ color: "#ff8800" }}>JUKEBOX</span>
            </BigH>
            <p
              style={{
                fontFamily: C.b,
                fontSize: "13px",
                color: C.grey,
                lineHeight: 1.75,
                marginTop: "14px",
              }}
            >
              Music I actually listen to. Hit play while you browse.
            </p>
          </div>
          <div
            className="card"
            style={{ padding: "6px", borderTop: "3px solid #ff8800" }}
          >
            <iframe
              src="https://www.youtube.com/embed/videoseries?list=PLyLXPcBWCFhkQxop7fEudlEE7TeOp1nUb&autoplay=0&rel=0"
              width="100%"
              height="80"
              style={{ border: "none", display: "block", background: C.bg }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Ishan Playlist"
            />
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{ ...W, ...P }}>
          <div style={{ marginBottom: "56px" }}>
            <SLabel color={C.red}>CONTACT</SLabel>
            <h2
              className="gh"
              data-text="READY TO BUILD?"
              style={{
                fontFamily: C.h,
                fontWeight: 400,
                fontSize: "clamp(52px,10vw,120px)",
                lineHeight: 0.88,
                color: C.white,
              }}
            >
              READY TO
              <br />
              <span style={{ color: C.red }}>BUILD?</span>
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
              gap: "24px",
            }}
          >
            <div
              className="card"
              style={{ padding: "32px", borderTop: "3px solid " + C.red }}
            >
              <div
                style={{
                  fontFamily: C.b,
                  fontSize: "9px",
                  color: C.red,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  marginBottom: "24px",
                }}
              >
                SEND A MESSAGE
              </div>
              {sent ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "40px 0",
                    fontFamily: C.h,
                    fontSize: "28px",
                    color: "#00ff88",
                  }}
                >
                  MESSAGE SENT
                  <br />
                  <span
                    style={{ fontSize: "16px", color: C.grey, fontFamily: C.b }}
                  >
                    I'll reply within 24 hours.
                  </span>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
                      gap: "12px",
                    }}
                  >
                    <input
                      placeholder="NAME *"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      style={iSty}
                      onFocus={onFocus}
                      onBlur={onBlur}
                    />
                    <input
                      placeholder="EMAIL"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      style={iSty}
                      onFocus={onFocus}
                      onBlur={onBlur}
                    />
                  </div>
                  <select
                    value={form.budget}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, budget: e.target.value }))
                    }
                    style={{ ...iSty, WebkitAppearance: "none" }}
                  >
                    <option value="">BUDGET (OPTIONAL)</option>
                    {[
                      "Under Rs 15,000",
                      "Rs 15,000-50,000",
                      "Rs 50,000-1,00,000",
                      "Rs 1,00,000+",
                      "LET'S DISCUSS",
                    ].map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                  <textarea
                    placeholder="WHAT ARE YOU BUILDING? *"
                    rows={4}
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    style={{ ...iSty, resize: "vertical" }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                  <button
                    className="bt"
                    onClick={submitForm}
                    style={{
                      padding: "13px 28px",
                      background: C.red,
                      color: C.bg,
                      fontFamily: C.b,
                      fontWeight: 700,
                      fontSize: "13px",
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      alignSelf: "flex-start",
                    }}
                  >
                    SEND VIA WHATSAPP
                  </button>
                </div>
              )}
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {[
                {
                  l: "WHATSAPP",
                  h: "https://wa.me/918279988591",
                  c: "#00c853",
                  desc: "+91 82799 88591",
                },
                {
                  l: "LINKEDIN",
                  h: "https://linkedin.com/in/ishan1501/",
                  c: "#0077b5",
                  desc: "linkedin.com/in/ishan1501",
                },
                {
                  l: "GITHUB",
                  h: "https://github.com/ishan1501",
                  c: C.white,
                  desc: "github.com/ishan1501",
                },
                {
                  l: "EMAIL",
                  h: "mailto:jainishan18@gmail.com",
                  c: C.red,
                  desc: "jainishan18@gmail.com",
                },
              ].map((b) => (
                <a
                  key={b.l}
                  href={b.h}
                  target="_blank"
                  rel="noreferrer"
                  className="bt card"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "18px 20px",
                    textDecoration: "none",
                    background: C.bg2,
                    borderLeft: "3px solid " + b.c,
                  }}
                >
                  <div>
                    <div
                      style={{ fontFamily: C.h, fontSize: "20px", color: b.c }}
                    >
                      {b.l}
                    </div>
                    <div
                      style={{
                        fontFamily: C.b,
                        fontSize: "11px",
                        color: C.grey,
                        marginTop: "3px",
                      }}
                    >
                      {b.desc}
                    </div>
                  </div>
                  <span
                    style={{ fontFamily: C.b, fontSize: "18px", color: C.dim }}
                  >
                    &#8594;
                  </span>
                </a>
              ))}
              <div
                className="card"
                style={{ padding: "18px 20px", background: C.bg3 }}
              >
                <div
                  style={{
                    fontFamily: C.b,
                    fontSize: "9px",
                    color: C.dim,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                  }}
                >
                  LOCATION
                </div>
                <div
                  style={{ fontFamily: C.b, fontSize: "13px", color: C.grey }}
                >
                  Gurugram, Haryana, India
                </div>
                <div
                  style={{
                    fontFamily: C.b,
                    fontSize: "11px",
                    color: C.dim,
                    marginTop: "4px",
                  }}
                >
                  Open to remote and on-site
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <div
          style={{
            borderTop: "2px solid " + C.red,
            padding: "16px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <div
            style={{
              fontFamily: C.h,
              fontSize: "18px",
              color: C.white,
              letterSpacing: "2px",
            }}
          >
            ISHAN JAIN<span style={{ color: C.red }}>.</span>
          </div>
          <div
            style={{
              fontFamily: C.b,
              fontSize: "10px",
              color: C.dim,
              letterSpacing: "1px",
            }}
          >
            2025 · WEB DESIGN x BUSINESS DEVELOPMENT · GURUGRAM
          </div>
        </div>
      </div>
    </div>
  );
}
