/* Ligamina showcase — Vue 3 app with zh/en i18n */
/* global Vue */
(function () {
  "use strict";

  var LINKS = {
    repo: "https://github.com/Eternal-Wanderer-Vegetable/Ligamina",
    issues: "https://github.com/Eternal-Wanderer-Vegetable/Ligamina/issues",
    docs: "https://github.com/Eternal-Wanderer-Vegetable/Ligamina/tree/main/docs",
    license: "https://github.com/Eternal-Wanderer-Vegetable/Ligamina/blob/main/LICENSE"
  };

  var TITLES = {
    zh: "Ligamina — 一个运行时，多套聊天机器人插件生态",
    en: "Ligamina — One runtime, multiple chatbot plugin ecosystems"
  };

  var DICT = {
    /* ================= ZH ================= */
    zh: {
      nav: [
        { id: "about", label: "概述" },
        { id: "features", label: "特性" },
        { id: "architecture", label: "架构" },
        { id: "quickstart", label: "快速开始" },
        { id: "status", label: "现状" },
        { id: "links", label: "链接" }
      ],
      hero: {
        kicker: "聊天机器人插件互操作运行时 —— Rust · MCP",
        tagline: "一个运行时，承载多套聊天机器人插件生态。",
        sub: "让 Koishi、NoneBot 与 AstrBot 的原生插件原样运行，并通过 MCP 风格的接口把它们交给任何机器人或 AI 智能体——复用原生插件，无需重建它们的世界。",
        cta1: "前往 GitHub ↗",
        cta2: "快速开始"
      },
      about: {
        title: "Ligamina 是什么",
        paras: [
          "Ligamina（拉丁语：纽带）是一个基于 Rust 的运行时，让来自 Koishi、NoneBot 与 AstrBot 的聊天机器人插件<em>原封不动</em>地并排运行，共享同一个 MCP 风格的接口。",
          "Rust Core 监督相互隔离的 Host 进程——每个框架一个——完整保留各插件原生的命令解析、中间件与存储。对外，每个插件就是一个名为 <code>cmd.&lt;host&gt;.&lt;command&gt;</code> 的 MCP 工具，而每次工具调用都在一个全新的虚拟私聊会话中执行。",
          "它同时也是一个兼容性实验室：插件目录可以按自定义哈希冻结；第三方插件在与操作系统隔离的 Worker 中测试——每条结果都钉在确切的版本、哈希、依赖锁与测试用例上。"
        ]
      },
      featuresTitle: "它能做什么",
      features: [
        { title: "原生复用，零改写", body: "Koishi、NoneBot、AstrBot 的插件照原样运行——命令解析、中间件、存储全部保留。不移植，不魔改。" },
        { title: "每个插件都是一个 MCP 工具", body: "插件以 cmd.<host>.<command> 的形式暴露为工具；任何 MCP 客户端——从 Claude Code 到你自己的机器人——都能调用。" },
        { title: "一个 Core，多个世界", body: "Rust Core 通过事件路由器与操作账本，把事件与工具调用分发到按框架隔离的 Host 进程——每个框架一个。" },
        { title: "可复现的兼容性实验室", body: "目录按自定义哈希冻结；每条结果都钉在确切的版本、依赖锁与测试用例上。" },
        { title: "操作系统级隔离", body: "第三方插件在禁网的 Linux Worker 中运行——工具级检查 18/18 通过。Windows 沙箱强制已在路上。" },
        { title: "克制的安全模型", body: "预留的工具会话账号永不触碰真实平台；不确定的投递保持「未知」，绝不重放；日志永不含 token。" }
      ],
      arch: {
        title: "各部分如何相连",
        labels: { clients: "客户端层", mcp: "MCP · HTTP :8765 · Bearer 令牌", events: "事件上行 · 消息下行", core: "核心层", hosts: "宿主层" },
        clients: ["机器人与 MCP 客户端（如 Claude Code）", "OneBot v11 网关——参考实现已内置"],
        coreChips: ["命令目录", "工具会话", "事件路由器", "操作账本"],
        hosts: [
          { name: "Koishi", meta: "@koishijs/core 4.18.11 · TypeScript" },
          { name: "NoneBot", meta: "nonebot2 2.5.0 · Python" },
          { name: "AstrBot", meta: "4.29.1 · Python" }
        ],
        note: "Host 原样运行原生插件；每条命令都会变成一个工具：cmd.<host>.<command>。"
      },
      quickstart: {
        title: "快速开始",
        steps: [
          { title: "构建 Core", cmd: "cargo build -p ligamina-cli --locked" },
          { title: "准备 Host", desc: "Koishi Host 用 npm ci，Python Host 用 uv sync --locked。", cmd: "npm ci            # Koishi host\nuv sync --locked  # Python hosts" },
          { title: "配置 daemon", desc: "编辑 daemon.json：声明监听器、令牌、网关入口与 Host。命令工具默认关闭——通过 command_tools.enabled 开启。" },
          { title: "接入 MCP 客户端", desc: "把 Ligamina 注册到 Claude Code（Bearer 令牌来自 daemon.json）：", cmd: "claude mcp add --transport http plugins http://127.0.0.1:8765/mcp" }
        ],
        verify: "验证全栈：在 docs 或 full 模式下运行 init.ps1（Windows）或 init.sh（Linux / macOS）。"
      },
      statusTitle: "现状一览",
      statusWords: { pass: "通过", blocked: "受阻" },
      status: [
        { label: "Core + Koishi 与 NoneBot Host · HTTP 与 MCP", note: "第一阶段验收通过", state: "pass" },
        { label: "禁网 Linux Worker 中的命令工具", note: "工具级运行 18/18 通过", state: "pass" },
        { label: "AstrBot Host", note: "市场目录已冻结 · 3,265 个插件", state: "pass" },
        { label: "AstrBot 安装试点", note: "21/24", state: "pass" },
        { label: "AstrBot 行为测试", note: "24/24", state: "pass" },
        { label: "全目录兼容性", note: "", state: "blocked" },
        { label: "Windows 沙箱强制", note: "", state: "blocked" },
        { label: "真实平台投递", note: "测试机器人丢失工具回复", state: "blocked" }
      ],
      linksTitle: "链接",
      linksItems: [
        { k: "源代码仓库", href: LINKS.repo },
        { k: "提交 Issue", href: LINKS.issues },
        { k: "项目文档（docs/ · AGENTS.md）", href: LINKS.docs },
        { k: "许可证 · AGPL-3.0", href: LINKS.license }
      ],
      footer: {
        line: "一个运行时，多个世界——Ligamina 项目展示页。",
        top: "回到顶部 ↑"
      }
    },

    /* ================= EN ================= */
    en: {
      nav: [
        { id: "about", label: "Overview" },
        { id: "features", label: "Features" },
        { id: "architecture", label: "Architecture" },
        { id: "quickstart", label: "Quick start" },
        { id: "status", label: "Status" },
        { id: "links", label: "Links" }
      ],
      hero: {
        kicker: "Chatbot plugin interoperability runtime — Rust · MCP",
        tagline: "One runtime, multiple chatbot plugin ecosystems.",
        sub: "Run native Koishi, NoneBot and AstrBot plugins unchanged — and expose them to any bot or AI agent through an MCP-style interface. Reuse native plugins without rebuilding their worlds.",
        cta1: "View on GitHub ↗",
        cta2: "Quick start"
      },
      about: {
        title: "What is Ligamina",
        paras: [
          "Ligamina (Latin: “the bonds”) is a Rust-based runtime that runs chat-bot plugins from Koishi, NoneBot and AstrBot <em>unchanged</em> — side by side, behind one MCP-style interface.",
          "A Rust Core supervises isolated Host processes — one per framework — keeping each plugin's native command parsing, middleware and storage fully intact. To the outside, every plugin appears as an MCP tool named <code>cmd.&lt;host&gt;.&lt;command&gt;</code>, and every tool call executes inside a fresh virtual private conversation.",
          "It doubles as a compatibility lab: plugin catalogs can be frozen with custom hashes, and third-party plugins are tested in OS-isolated workers — every result pinned to exact versions, hashes, dependency locks and test cases."
        ]
      },
      featuresTitle: "What it does",
      features: [
        { title: "Native reuse, zero rewrites", body: "Koishi, NoneBot and AstrBot plugins run as-is — command parsing, middleware and storage all keep working. No ports, no forks." },
        { title: "Every plugin is an MCP tool", body: "Plugins surface as tools named cmd.<host>.<command>; any MCP client — from Claude Code to your own bot — can call them." },
        { title: "One Core, many worlds", body: "A Rust Core routes events and tool calls to isolated Host processes — one per framework — through an event router and an operation ledger." },
        { title: "A reproducible compatibility lab", body: "Catalogs freeze with custom hashes; every result is pinned to exact versions, dependency locks and test cases." },
        { title: "OS-isolated workers", body: "Third-party plugins run in network-disabled Linux workers — 18/18 tool-level checks passed. Windows sandbox enforcement is next." },
        { title: "A deliberate safety model", body: "Reserved tool-session accounts never touch real platforms; uncertain deliveries stay “unknown”, never replayed; logs stay token-free." }
      ],
      arch: {
        title: "How the pieces bond",
        labels: { clients: "Clients", mcp: "MCP · HTTP :8765 · Bearer token", events: "events in · messages out", core: "Core", hosts: "Hosts" },
        clients: ["Bots & MCP clients — e.g. Claude Code", "OneBot v11 Gateway — reference implementation included"],
        coreChips: ["command catalog", "tool sessions", "event router", "operation ledger"],
        hosts: [
          { name: "Koishi", meta: "@koishijs/core 4.18.11 · TypeScript" },
          { name: "NoneBot", meta: "nonebot2 2.5.0 · Python" },
          { name: "AstrBot", meta: "4.29.1 · Python" }
        ],
        note: "Hosts run native plugins unchanged; every command becomes a tool: cmd.<host>.<command>."
      },
      quickstart: {
        title: "Quick start",
        steps: [
          { title: "Build the Core", cmd: "cargo build -p ligamina-cli --locked" },
          { title: "Prepare the hosts", desc: "npm ci for the Koishi host, uv sync --locked for the Python hosts.", cmd: "npm ci            # Koishi host\nuv sync --locked  # Python hosts" },
          { title: "Configure the daemon", desc: "daemon.json declares listeners, tokens, gateway entries and hosts. Command tools are off by default — enable with command_tools.enabled." },
          { title: "Connect an MCP client", desc: "Register Ligamina with Claude Code (Bearer token from daemon.json):", cmd: "claude mcp add --transport http plugins http://127.0.0.1:8765/mcp" }
        ],
        verify: "Verify the whole stack: run init.ps1 (Windows) or init.sh (Linux / macOS) in docs or full mode."
      },
      statusTitle: "Where things stand",
      statusWords: { pass: "PASS", blocked: "BLOCKED" },
      status: [
        { label: "Core + Koishi & NoneBot hosts · HTTP & MCP", note: "Phase 1 acceptance passed", state: "pass" },
        { label: "Command tools in network-disabled Linux workers", note: "18/18 tool-level runs", state: "pass" },
        { label: "AstrBot host", note: "market catalog frozen · 3,265 plugins", state: "pass" },
        { label: "AstrBot install pilot", note: "21/24", state: "pass" },
        { label: "AstrBot behavior tests", note: "24/24", state: "pass" },
        { label: "Catalog-wide compatibility", note: "", state: "blocked" },
        { label: "Windows sandbox enforcement", note: "", state: "blocked" },
        { label: "Real-platform delivery", note: "a test bot drops tool replies", state: "blocked" }
      ],
      linksTitle: "Links",
      linksItems: [
        { k: "Source repository", href: LINKS.repo },
        { k: "Report an issue", href: LINKS.issues },
        { k: "Documentation (docs/ · AGENTS.md)", href: LINKS.docs },
        { k: "License · AGPL-3.0", href: LINKS.license }
      ],
      footer: {
        line: "One runtime, many worlds — the showcase page for the Ligamina project.",
        top: "Back to top ↑"
      }
    }
  };

  Vue.createApp({
    setup: function () {
      var ref = Vue.ref;
      var computed = Vue.computed;
      var watch = Vue.watch;

      var saved = null;
      try { saved = window.localStorage.getItem("ligamina-lang"); } catch (e) { /* private mode */ }
      var initial = (saved === "zh" || saved === "en")
        ? saved
        : ((navigator.language || "").toLowerCase().indexOf("zh") === 0 ? "zh" : "en");

      var lang = ref(initial);
      var t = computed(function () { return DICT[lang.value]; });

      function setLang(l) { lang.value = l; }

      function pad(n) { return String(n).padStart(2, "0"); }

      watch(lang, function (l) {
        try { window.localStorage.setItem("ligamina-lang", l); } catch (e) { /* ignore */ }
        document.documentElement.lang = l === "zh" ? "zh-CN" : "en";
        document.title = TITLES[l];
      }, { immediate: true });

      return { lang: lang, t: t, setLang: setLang, pad: pad, links: LINKS };
    }
  }).mount("#app");

  /* ---- hero network animation --------------------------------------
     CORE stays fixed at the centre; the three host nodes orbit it
     while their radius breathes on three sine waves with different
     periods, phases and amplitudes. ---- */
  function initNetwork() {
    var svg = document.querySelector(".net");
    if (!svg) return;

    var CX = 260, CY = 235; // CORE centre (never moves)
    var ORBIT = 46;         // seconds per revolution
    var cfg = [
      { R: 192, amp: 30, period: 13, phase: 0,     theta0: -2.388 }, // KOISHI
      { R: 198, amp: 26, period: 17, phase: 2.094, theta0: -0.691 }, // NONEBOT
      { R: 178, amp: 34, period: 11, phase: 4.189, theta0: 1.695 }   // ASTRBOT
    ];

    var nodes = svg.querySelectorAll(".net-node");
    var spokes = svg.querySelectorAll(".net-spoke");
    var chords = svg.querySelectorAll(".net-chord");
    if (nodes.length !== 3 || spokes.length !== 3 || chords.length !== 3) return;

    function place(t) {
      var pts = [];
      for (var i = 0; i < 3; i++) {
        var c = cfg[i];
        var ang = c.theta0 + (2 * Math.PI / ORBIT) * t;
        var r = c.R + c.amp * Math.sin((2 * Math.PI * t) / c.period + c.phase);
        var x = CX + r * Math.cos(ang);
        var y = CY + r * Math.sin(ang);
        pts.push([x, y]);
        nodes[i].setAttribute("transform", "translate(" + x.toFixed(2) + " " + y.toFixed(2) + ")");
        spokes[i].setAttribute("x2", x.toFixed(2));
        spokes[i].setAttribute("y2", y.toFixed(2));
      }
      var pairs = [[0, 1], [1, 2], [2, 0]];
      for (var j = 0; j < 3; j++) {
        chords[j].setAttribute("x1", pts[pairs[j][0]][0].toFixed(2));
        chords[j].setAttribute("y1", pts[pairs[j][0]][1].toFixed(2));
        chords[j].setAttribute("x2", pts[pairs[j][1]][0].toFixed(2));
        chords[j].setAttribute("y2", pts[pairs[j][1]][1].toFixed(2));
      }
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      place(0); // static layout only
      return;
    }

    var start = null;
    function frame(ts) {
      if (start === null) start = ts;
      place((ts - start) / 1000);
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  initNetwork();
})();
