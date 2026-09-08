(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const root = document.documentElement;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let paused = reduced.matches;
  try {
    const saved = localStorage.getItem("portfolio-theme");
    if (["light", "dark"].includes(saved)) root.dataset.theme = saved;
  } catch {
    /* Storage is optional. */
  }
  function themeLabel() {
    const label = `Switch to ${root.dataset.theme === "dark" ? "light" : "dark"} theme`;
    $("themeToggle").setAttribute("aria-label", label);
    $("themeToggle").title = label;
  }
  themeLabel();
  $("themeToggle").addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("portfolio-theme", root.dataset.theme);
    } catch {
      /* Continue without persistence. */
    }
    themeLabel();
  });
  const menu = $("navLinks"),
    menuButton = $("menuButton");
  function closeMenu() {
    menu.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
  }
  menuButton.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  menu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      closeMenu();
      const target = document.querySelector(a.hash);
      if (target) {
        target.tabIndex = -1;
        target.focus({ preventScroll: true });
      }
    }),
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("open")) {
      closeMenu();
      menuButton.focus();
    }
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav")) closeMenu();
  });
  matchMedia("(min-width: 851px)").addEventListener("change", closeMenu);
  $("year").textContent = new Date().getFullYear();
  const roles = [
    "Cybersecurity & Systems Operations Professional",
    "Application Support Analyst",
    "Production Operations Engineer",
    "IT Service Management Professional",
    "Automation Builder",
  ];
  let role = 0;
  function motionState() {
    root.classList.toggle("motion-paused", paused || reduced.matches);
    $("motionToggle").textContent = reduced.matches
      ? "Reduced motion"
      : paused
        ? "Resume motion"
        : "Pause motion";
    $("motionToggle").setAttribute(
      "aria-pressed",
      String(paused || reduced.matches),
    );
    $("motionToggle").disabled = reduced.matches;
  }
  $("motionToggle").addEventListener("click", () => {
    paused = !paused;
    motionState();
  });
  reduced.addEventListener("change", () => {
    paused = reduced.matches;
    motionState();
  });
  motionState();
  setInterval(() => {
    if (
      paused ||
      reduced.matches ||
      document.hidden ||
      !heroVisible ||
      document.activeElement.closest(".hero")
    )
      return;
    role = (role + 1) % roles.length;
    $("rotatingRole").textContent = roles[role];
  }, 5000);
  let heroVisible = true;
  let workflowVisible = false;
  let workflowStep = 0;
  const workflowItems = [...document.querySelectorAll(".workflow li")];
  setInterval(() => {
    if (paused || reduced.matches || document.hidden || !workflowVisible)
      return;
    workflowItems.forEach((item, index) =>
      item.classList.toggle("workflow-active", index === workflowStep),
    );
    workflowStep = (workflowStep + 1) % workflowItems.length;
  }, 1600);
  if ("IntersectionObserver" in window) {
    new IntersectionObserver((entries) => {
      workflowVisible = entries[0].isIntersecting;
    }).observe(document.querySelector(".workflow"));
    new IntersectionObserver((entries) => {
      heroVisible = entries[0].isIntersecting;
      document.querySelector(".orbit").style.animationPlayState = heroVisible
        ? ""
        : "paused";
    }).observe($("home"));
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  }
  let scheduled = false;
  function updateScroll() {
    scheduled = false;
    const total = root.scrollHeight - innerHeight;
    $("scrollProgress").style.transform =
      `scaleX(${total > 0 ? Math.min(1, scrollY / total) : 0})`;
    let active;
    menu.querySelectorAll("a").forEach((a) => {
      const section = document.querySelector(a.hash);
      if (section && section.getBoundingClientRect().top <= 160) active = a;
      a.removeAttribute("aria-current");
    });
    if (active) active.setAttribute("aria-current", "location");
  }
  addEventListener(
    "scroll",
    () => {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(updateScroll);
      }
    },
    { passive: true },
  );
  updateScroll();
  $("skillSearch").addEventListener("input", (e) => {
    const query = e.target.value.trim().toLowerCase();
    let count = 0;
    document.querySelectorAll(".skill-card").forEach((card) => {
      card.hidden = !card.textContent.toLowerCase().includes(query);
      if (!card.hidden) count++;
    });
    $("skillStatus").textContent = query
      ? `${count} matching ${count === 1 ? "category" : "categories"}${count ? "." : ". Try another technology or clear the search."}`
      : "";
  });
  const states = [
    [
      "Healthy",
      "All simulated services are available.",
      "Start monitoring to inspect the service path.",
      "Start monitoring →",
    ],
    [
      "Monitoring",
      "Reviewing simulated service health.",
      "Check alerts, recent changes and dependencies before deciding whether to escalate.",
      "Detect an incident →",
    ],
    [
      "Incident detected",
      "A simulated application health check has failed.",
      "Assess impact, record the incident and engage the appropriate support team.",
      "Begin investigation →",
    ],
    [
      "Investigation",
      "Correlating the simulated alert with logs and dependencies.",
      "Validate the scope, communicate updates and identify a recovery action through the approved process.",
      "Restore service →",
    ],
    [
      "Service restored",
      "The simulated application health check is passing.",
      "Validate service recovery, communicate restoration and capture follow-up actions for problem management.",
      "Run again →",
    ],
  ];
  let state = 0;
  function renderSimulation() {
    const [name, summary, explanation, next] = states[state];
    $("appState").textContent = name;
    $("simState").textContent = `${name} — ${summary}`;
    $("simExplanation").textContent = explanation;
    $("simNext").textContent = next;
  }
  $("simNext").addEventListener("click", () => {
    state = (state + 1) % states.length;
    renderSimulation();
  });
  $("simReset").addEventListener("click", () => {
    state = 0;
    renderSimulation();
  });
  // Curated answers only. This provider can be replaced only by a secure server-side integration.
  const knowledge = Object.freeze({
    about: [
      "Singapore-based, Singapore Permanent Resident. 5+ years across payments, banking, semiconductor analysis and automation, with a BSc in Cybersecurity and Networks.",
      "about",
    ],
    experience: [
      "At Visa (2024–present), Anandhu supports mission-critical payment processing, L1/L2 triage, monitoring, incident bridges and operational automation. Previously, he provided L2 production support at DBS Asia Hub and worked in failure analysis at Micron.",
      "experience",
    ],
    automation: [
      "ATM status check automation used HP NonStop / Tandem, TACL, Tandem macros and Outlook integration in an XYGATE-controlled environment. Across 16 client environments, 10–15 minute manual validation became near-real-time reporting, recovering approximately 30–45 minutes during critical SW2V maintenance / transition activities.",
      "impact",
    ],
    banking: [
      "At DBS Asia Hub (Jun 2023–Jan 2024), Anandhu provided 24×7 rotational L2 production support with Linux, JBoss, Oracle SQL, HeidiSQL, Jira, CARA, batch/job monitoring, deployments, disaster recovery and SIT/UAT support.",
      "experience",
    ],
    skills: [
      "Linux, Windows, HP NonStop / Tandem, JBoss, TACL, Tandem macros, Python, Shell scripting, Oracle SQL, HeidiSQL, ServiceNow, Netcool, Prognosis, Vital Signs, OIP, Jira and CARA. See the skills section for capabilities by category.",
      "skills",
    ],
    projects: [
      "Explore Indian OTT Tracker, a public personal project using React/Vite, FastAPI, PostgreSQL and Redis/Celery, or read the ATM Status Check Automation case study.",
      "projects",
    ],
    certifications: [
      "ITIL® 4 Foundation Certificate in IT Service Management, issued by PeopleCert. No credential number, issue date, expiration date or verification URL has been supplied.",
      "certifications",
    ],
    fit: [
      "His DBS L2 support and Visa L1/L2 responsibilities connect directly to incident triage, monitoring, Linux operations, log analysis, change support and stakeholder communication. The portfolio also documents operational automation and ITIL 4 Foundation certification.",
      "experience",
    ],
    contact: [
      "Email: anadhu369@gmail.com. Based in Singapore and open to Application Support, Production Support, Systems Operations, IT Operations and related opportunities.",
      "contact",
    ],
    resume: [
      "View or download the professional resume from the Resume section.",
      "resume",
    ],
  });
  document.querySelectorAll("[data-question]").forEach((button) => {
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => {
      const [answer, source] = knowledge[button.dataset.question];
      $("assistantAnswer").textContent = answer;
      $("assistantSource").href = `#${source}`;
      $("assistantSource").textContent = `Source: ${source} ↗`;
      document
        .querySelectorAll("[data-question]")
        .forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
    });
  });
  const commands = [
    "help",
    "about",
    "experience",
    "skills",
    "projects",
    "certifications",
    "contact",
    "resume",
  ];
  $("terminalForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const command = $("terminalInput").value.trim().toLowerCase();
    let answer;
    if (command === "help")
      answer = `Available commands: ${commands.join(", ")}.\nThis is a portfolio UI; it cannot execute shell commands.`;
    else if (commands.includes(command) && knowledge[command])
      answer = knowledge[command][0];
    else
      answer =
        "Unknown command. Type help to see the available portfolio commands.";
    $("terminalOutput").textContent = `> ${command}\n\n${answer}`;
    $("terminalInput").value = "";
  });
  $("copyEmail").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("anadhu369@gmail.com");
      $("copyStatus").textContent = "Email copied.";
    } catch {
      $("copyStatus").textContent =
        "Copy unavailable. Select anadhu369@gmail.com or use the email link.";
    }
  });
})();
