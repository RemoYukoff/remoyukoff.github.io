/* ─────────────────────────────────────────────────────────────────────────
   INTERACTIVE TERMINAL — Nate-style console with real commands.
   Commands: help, about, whoami, skills, stack, projects, oss,
             experience, exp, clients, contact, education, edu,
             languages, lang [es|en], ls, cd <section>, clear, sudo,
             coffee, matrix.
   ───────────────────────────────────────────────────────────────────────── */
(function () {
  const body = document.getElementById('console-body');
  const form = document.getElementById('console-form');
  const input = document.getElementById('console-cmd');

  const history = [];
  let histIdx = -1;

  const t = (k) => {
    const d = (window.__i18n && window.__i18n.dict[window.__i18n.current]) || {};
    return d[k] || k;
  };

  function el(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.firstElementChild;
  }
  function line(html, cls = '') {
    const div = document.createElement('div');
    div.className = 't-line ' + cls;
    div.innerHTML = html;
    body.appendChild(div);
    return div;
  }
  function blank() { line('&nbsp;'); }
  function scroll() { body.scrollTop = body.scrollHeight; }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    }[c]));
  }

  /* ───── Output renderers ─────────────────────────────────────────── */
  const commands = {
    help() {
      line('<span class="t-h">Available commands</span>');
      blank();
      const cmds = [
        ['help',           'lista de comandos · list commands'],
        ['about',          'quién soy · who I am'],
        ['whoami',         'one-liner'],
        ['skills',         'stack técnico'],
        ['projects',       'open source projects'],
        ['experience',     'historia laboral · work history'],
        ['clients',        'clientes destacados'],
        ['education',      'estudios'],
        ['languages',      'idiomas'],
        ['contact',        'email, github, linkedin'],
        ['social',         'links sociales'],
        ['cv',             'descargar CV · download CV'],
        ['theme [light|dark]', 'cambiar tema · switch theme'],
        ['lang [es|en]',   'cambiar idioma · switch language'],
        ['ls',             'listar secciones'],
        ['cd &lt;section&gt;',  'ir a sección · go to section'],
        ['clear',          'limpiar consola · clear console'],
      ];
      cmds.forEach(([c, d]) => {
        line(`<span class="t-row"><span class="t-key">${c.padEnd(16)}</span><span class="t-dim">${d}</span></span>`);
      });
      blank();
      line('<span class="t-dim">tip: <span class="t-accent">↑/↓</span> historial · <span class="t-accent">Tab</span> autocompletar</span>');
    },

    about() {
      line('<span class="t-h">Remo Yukoff</span> <span class="t-dim">— Senior SDET</span>');
      blank();
      const isEs = window.__i18n.current === 'es';
      const lines = isEs ? [
        'Senior Software Development Engineer in Test con 7+ años de',
        'experiencia construyendo frameworks de automatización escalables',
        'para plataformas web, APIs y data pipelines.',
        '',
        'Especializado en Python automation, CI/CD integration e',
        'infraestructura de testing cloud-based. He trabajado con',
        'organizaciones globales como Disney, PwC, Cision, Under Armour',
        'e Intercontinental Exchange.',
        '',
        'Creador de herramientas open source: Aqueductus (data testing)',
        'y Behave Runner (VS Code extension para BDD).',
      ] : [
        'Senior Software Development Engineer in Test with 8+ years of',
        'experience building scalable automation frameworks for web',
        'platforms, APIs and data pipelines.',
        '',
        'Specialized in Python automation, CI/CD integration and',
        'cloud-based testing infrastructure. Worked with global',
        'organizations including Disney, PwC, Cision, Under Armour',
        'and Intercontinental Exchange.',
        '',
        'Author of open-source developer tools: Aqueductus (data',
        'testing) and Behave Runner (VS Code extension for BDD).',
      ];
      lines.forEach(l => l ? line(`<span class="t-out">${l}</span>`) : blank());
    },

    whoami() {
      line('<span class="t-accent">remo</span>');
      line('<span class="t-dim">uid=1337(remo) gid=1337(sdet) groups=automation,python,data,coffee</span>');
    },

    skills() {
      line('<span class="t-h">Stack &amp; tooling</span>');
      blank();
      const rows = [
        ['Languages',      'Python · Java · JavaScript'],
        ['Automation',     'pytest · Selenium · Playwright · Behave · Cucumber · Appium'],
        ['API',            'REST · GraphQL · requests · Postman · Rest-Assured'],
        ['Performance',    'k6 · Locust'],
        ['CI/CD',          'Jenkins · GitHub Actions · GitLab CI'],
        ['Infra',          'Docker · Localstack'],
        ['Cloud',          'AWS (S3 · Athena · Glue)'],
        ['Data',           'SQL validation · schema validation · dataset compare'],
        ['Observability',  'Prometheus · Elastic · Grafana'],
        ['Databases',      'PostgreSQL · MySQL · MongoDB'],
      ];
      rows.forEach(([k, v]) => {
        line(`<span class="t-row"><span class="t-key">${k.padEnd(14)}</span><span class="t-out">${v}</span></span>`);
      });
    },

    projects() {
      line('<span class="t-h">Projects</span>');
      blank();
      const isEs = window.__i18n.current === 'es';
      line('<span class="t-accent">★ inflacion.ar</span> <span class="t-dim">— inflacion-ar-frontend.vercel.app</span> <span class="t-warn">[WIP]</span>');
      line(`  <span class="t-out">${isEs
        ? 'Plataforma de datos económicos argentinos abiertos · 41 fuentes.'
        : 'Argentine economic data platform · open data · 41 sources.'}</span>`);
      blank();
      line('<span class="t-accent">★ 4foodies</span> <span class="t-dim">— 4foodies.app · App Store</span> <span class="t-ok">[v1]</span>');
      line(`  <span class="t-out">${isEs
        ? 'App social de reseñas de comida · React Native + Supabase.'
        : 'Social food review app · React Native + Supabase.'}</span>`);
      blank();
      line('<span class="t-accent">▣ aqueductus</span> <span class="t-dim">— github.com/RemoYukoff/aqueductus</span>');
      line(`  <span class="t-out">${isEs
        ? 'Framework para testing de datos vía SQL, configurado en YAML.'
        : 'Data testing framework via SQL, configured in YAML.'}</span>`);
      blank();
      line('<span class="t-accent">▤ behave-runner</span> <span class="t-dim">— open-vsx.org/extension/remoyukoff/behave-runner</span>');
      line(`  <span class="t-out">${isEs
        ? 'Extensión de VS Code para correr tests BDD con Behave.'
        : 'VS Code extension to run BDD tests with Behave.'}</span>`);
    },

    experience() {
      line('<span class="t-h">$ git log --author="Remo" --oneline</span>');
      blank();
      const entries = [
        ['a8f3d2c', 'Oct 2024 → now    ', 'Senior SDET @ The Walt Disney Company (via Wizeline)'],
        ['b1e7a04', 'May 2024 → Oct 2024', 'SDET @ PwC (via TCS)'],
        ['c52f1d9', 'Jun 2022 → May 2024', 'SDET @ Eclypsium'],
        ['d10a8b7', 'Aug 2021 → Feb 2023', 'Test Automation @ Cision (via Encora)'],
        ['e9c3f51', 'Mar 2018 → Aug 2021', 'Test Automation @ Under Armour / ICE (via Solvd)'],
      ];
      entries.forEach(([h, d, msg]) => {
        line(`<span class="t-accent">${h}</span> <span class="t-dim">${d}</span>  <span class="t-out">${msg}</span>`);
      });
      blank();
      line('<span class="t-dim">→ ' + (window.__i18n.current === 'es'
        ? 'scrolleá a #experience para ver detalles'
        : 'scroll to #experience for details') + '</span>');
    },

    clients() {
      line('<span class="t-h">Selected clients</span>');
      blank();
      ['The Walt Disney Company', 'PwC', 'Cision', 'Under Armour', 'Intercontinental Exchange']
        .forEach((c, i) => line(`<span class="t-accent">[0${i+1}]</span> <span class="t-out">${c}</span>`));
    },

    education() {
      line('<span class="t-h">' + (window.__i18n.current === 'es' ? 'Formación' : 'Education') + '</span>');
      blank();
      const rows = [
        ['UNCAUS',              'Computer Science · Bachelor'],
        ['UBA — IALAB',         'Artificial Intelligence'],
        ['Acámica',             'Data Science'],
        ['Globant',             'Python — Flask, Django'],
        ['Informatorio Chaco',  'Fullstack Development'],
      ];
      rows.forEach(([k, v]) => {
        line(`<span class="t-row"><span class="t-key">${k.padEnd(22)}</span><span class="t-out">${v}</span></span>`);
      });
    },

    languages() {
      line('<span class="t-h">' + (window.__i18n.current === 'es' ? 'Idiomas' : 'Languages') + '</span>');
      blank();
      line('<span class="t-row"><span class="t-key">Español</span><span class="t-out">' + t('edu.lang.native') + ' [██████████]</span></span>');
      line('<span class="t-row"><span class="t-key">English</span><span class="t-out">Advanced C1  [████████░░]</span></span>');
    },

    contact() {
      line('<span class="t-h">Contact</span>');
      blank();
      line('<span class="t-row"><span class="t-key">email   </span><a class="t-link" href="mailto:remo.yukoff@gmail.com">remo.yukoff@gmail.com</a></span>');
      line('<span class="t-row"><span class="t-key">phone   </span><a class="t-link" href="tel:+5493644338125">+54 9 3644 338125</a></span>');
      line('<span class="t-row"><span class="t-key">github  </span><a class="t-link" href="https://github.com/RemoYukoff" target="_blank">github.com/RemoYukoff</a></span>');
      line('<span class="t-row"><span class="t-key">linkedin</span><a class="t-link" href="https://www.linkedin.com/in/remoyukoff" target="_blank">linkedin.com/in/remoyukoff</a></span>');
      line('<span class="t-row"><span class="t-key">location</span><span class="t-out">Argentina · Remote</span></span>');
    },

    cv() {
      line('<span class="t-accent">$ </span><span class="t-out">downloading Remo_Yukoff_CV.pdf...</span>');      try {
        const a = document.createElement('a');
        a.href = 'assets/Remo_Yukoff_CV.pdf';
        a.download = 'Remo_Yukoff_CV.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
        line('<span class="t-ok">[ok]</span> <span class="t-dim">transfer complete</span>');
      } catch (e) {
        line('<span class="t-err">error: ' + escapeHtml(e.message) + '</span>');
      }
    },

    theme(arg) {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      if (!arg) {
        const next = current === 'dark' ? 'light' : 'dark';
        setTheme(next);
        line('<span class="t-ok">✓ theme: ' + next + '</span>');
        return;
      }
      if (arg === 'light' || arg === 'dark') {
        setTheme(arg);
        line('<span class="t-ok">✓ theme set to ' + arg + '</span>');
      } else if (arg === 'toggle') {
        const next = current === 'dark' ? 'light' : 'dark';
        setTheme(next);
        line('<span class="t-ok">✓ theme: ' + next + '</span>');
      } else {
        line('<span class="t-err">theme: unknown mode "' + escapeHtml(arg) + '" (use light|dark)</span>');
      }
    },

    ls() {
      const sections = ['hero', 'clients', 'experience', 'projects', 'stack', 'edu', 'contact'];
      line('<span class="t-out">' + sections.map(s => `<span class="t-accent">${s}</span>/`).join('  ') + '</span>');
    },

    cd(arg) {
      if (!arg) { line('<span class="t-err">cd: missing operand</span>'); return; }
      const map = {
        '..': 'top', '~': 'top', 'home': 'top', 'top': 'top',
        'clients': 'clients', 'experience': 'experience', 'exp': 'experience',
        'projects': 'projects', 'oss': 'projects', 'open-source': 'projects',
        'stack': 'stack', 'skills': 'stack',
        'edu': 'edu', 'education': 'edu',
        'contact': 'contact',
      };
      const target = map[arg.toLowerCase()];
      if (!target) { line(`<span class="t-err">cd: ${escapeHtml(arg)}: no such directory</span>`); return; }
      line(`<span class="t-dim">→ /${target}</span>`);
      const node = document.getElementById(target);
      if (node) node.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },

    lang(arg) {
      if (!arg) {
        line('<span class="t-out">current: <span class="t-accent">' + window.__i18n.current + '</span></span>');
        line('<span class="t-dim">usage: lang [es|en]</span>');
        return;
      }
      if (arg === 'es' || arg === 'en') {
        window.__i18n.apply(arg);
        line('<span class="t-ok">✓ language set to ' + arg + '</span>');
      } else {
        line('<span class="t-err">lang: unsupported locale "' + escapeHtml(arg) + '"</span>');
      }
    },

    clear() { body.innerHTML = ''; },
    cls() { body.innerHTML = ''; },

    /* easter eggs */
    sudo() {
      line('<span class="t-err">[sudo] password for remo: </span><span class="t-dim">****</span>');
      line('<span class="t-err">Sorry, try again.</span>');
    },
    coffee() {
      line('<span class="t-warn">☕ brewing...</span>');
      setTimeout(() => line('<span class="t-ok">✓ coffee.ready = true</span>'), 400);
      setTimeout(() => { line('<span class="t-dim">// ' + (window.__i18n.current === 'es' ? 'caffeine levels nominal' : 'caffeine levels nominal') + '</span>'); scroll(); }, 800);
    },
    matrix() {
      const chars = '01アイウエオカキクケコサシスセソタチツテト';
      let count = 0;
      const id = setInterval(() => {
        const s = Array.from({length: 40}, () => chars[Math.floor(Math.random()*chars.length)]).join('');
        line(`<span class="t-accent">${s}</span>`);
        scroll();
        if (++count > 8) { clearInterval(id); line('<span class="t-dim">[wake up, neo...]</span>'); scroll(); }
      }, 120);
    },
    exit() { line('<span class="t-dim">¯\\_(ツ)_/¯  no salgas, todavía falta el contact</span>'); },
  };

  // aliases
  commands.exp = commands.experience;
  commands.oss = commands.projects;
  commands.edu = commands.education;
  commands.social = commands.contact;
  commands.stack = commands.skills;
  commands.who = commands.whoami;
  commands.dark = () => commands.theme('dark');
  commands.light = () => commands.theme('light');

  /* ───── Theme management ─────────────────────────────────────────── */
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) {}
  }
  function bindThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const cur = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(cur === 'dark' ? 'light' : 'dark');
    });
  }

  /* ───── Boot output ──────────────────────────────────────────────── */
  function boot() {
    body.innerHTML = '';
    const banner = document.createElement('div');
    banner.className = 't-banner';
    banner.innerHTML =
      '<div class="t-banner-row"><span class="t-h">RY · PORTFOLIO</span> <span class="t-dim">v1.0.0</span></div>' +
      '<div class="t-banner-row t-dim">remo@portfolio — interactive shell</div>';
    body.appendChild(banner);
    blank();
    line('<span class="t-dim">Booting…</span>');
    line('<span class="t-ok">[ok]</span> <span class="t-dim">loaded selectors @ 0x7fa3</span>');
    line('<span class="t-ok">[ok]</span> <span class="t-dim">pytest engine ready</span>');
    line('<span class="t-ok">[ok]</span> <span class="t-dim">CI runner attached</span>');
    line('<span class="t-ok">[ok]</span> <span class="t-dim">8+ years uptime</span>');
    blank();
    const greet = window.__i18n.current === 'es'
      ? 'Bienvenido. Tipeá <span class="t-accent">help</span> para ver qué se puede hacer, o <span class="t-accent">about</span> para empezar.'
      : 'Welcome. Type <span class="t-accent">help</span> to see what\'s available, or <span class="t-accent">about</span> to start.';
    line('<span class="t-out">' + greet + '</span>');
    blank();
    scroll();
  }

  /* ───── Input handling ───────────────────────────────────────────── */
  function run(raw) {
    const cmdLine = raw.trim();
    // echo the command
    line(
      `<span class="t-prompt">remo@portfolio:~$</span><span class="t-cmd">${escapeHtml(cmdLine)}</span>`
    );
    if (!cmdLine) { scroll(); return; }
    history.push(cmdLine);
    histIdx = history.length;

    const [cmd, ...args] = cmdLine.split(/\s+/);
    const fn = commands[cmd.toLowerCase()];
    if (fn) {
      try { fn(args.join(' ')); }
      catch (e) { line('<span class="t-err">runtime error: ' + escapeHtml(e.message) + '</span>'); }
    } else {
      line(`<span class="t-err">command not found: ${escapeHtml(cmd)}</span>`);
      line('<span class="t-dim">try <span class="t-accent">help</span></span>');
    }
    scroll();
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = input.value;
    input.value = '';
    run(v);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (histIdx > 0) histIdx--;
      input.value = history[histIdx] || '';
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx < history.length - 1) { histIdx++; input.value = history[histIdx]; }
      else { histIdx = history.length; input.value = ''; }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const v = input.value.trim().toLowerCase();
      if (!v) return;
      const matches = Object.keys(commands).filter(c => c.startsWith(v));
      if (matches.length === 1) input.value = matches[0] + ' ';
      else if (matches.length > 1) {
        line(`<span class="t-prompt">remo@portfolio:~$</span><span class="t-cmd">${escapeHtml(v)}</span>`);
        line('<span class="t-dim">' + matches.join('  ') + '</span>');
        scroll();
      }
    } else if (e.key === 'l' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      commands.clear();
    }
  });

  // focus console when clicking anywhere in it
  document.getElementById('console').addEventListener('click', (e) => {
    if (e.target.tagName !== 'A') input.focus();
  });

  function matchConsoleHeight() {
    const heroLeft = document.querySelector('.hero-left');
    const consoleEl = document.getElementById('console');
    if (!heroLeft || !consoleEl) return;
    consoleEl.style.height = heroLeft.offsetHeight + 'px';
  }

  document.addEventListener('DOMContentLoaded', () => {
    bindThemeToggle();
    boot();
    matchConsoleHeight();
    window.addEventListener('resize', () => requestAnimationFrame(matchConsoleHeight));
  });
})();
