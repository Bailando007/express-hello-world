const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const app = express();
const port = process.env.PORT || 10000;

function randomResponse(responses) {
  return responses[Math.floor(Math.random() * responses.length)];
}

const bots = {
  Kit: {
    token: "7659354620:AAH2l5XV9Yvel8A23-JTK0jywqKbSvY9sjY",
    name: "Kit",
    role: "Strategist",
    personality: "Loyal, structured, AI tactician",
    responses: {
      start: [
        "🧠 Kit online. Mission systems are green.",
        "Hello, Commander. Kit reporting for duty.",
        "System check complete. Awaiting instruction.",
        "Operational. Standing by for mission deployment.",
        "Kit engaged. Protocol systems synchronised."
      ],
      status: [
        "📡 All systems stable. Kit ready.",
        "No anomalies detected. Awaiting orders.",
        "HQ integrity at 100%. Monitoring active.",
        "Status: Optimal. Strategy alignment verified.",
        "Clear skies, Commander. You’re good to go."
      ],
      report: [
        "📋 HQ secure. No active threats.",
        "Summary: Passive scan enabled. Agents aware.",
        "Mission logs: idle. Standing by.",
        "Systems report: Clean. Logic sync OK.",
        "All data streams normal. HQ in passive mode."
      ],
      whoami: [
        "I’m Kit. Strategy and logic are my specialty.",
        "Kit here — I keep the chaos contained.",
        "AI Strategist online. I align intent to action.",
        "Mission architecture is my field. Let’s build.",
        "Kit. Tactical thinker. Loyal to you only."
      ],
      advice: [
        "Clarity is power. Break the goal down. Start small.",
        "Success is momentum. Begin before you’re ready.",
        "Every empire started with one decision. Make yours.",
        "Strategy over emotion. Plan > panic.",
        "Lead with logic, Commander. Then let courage carry it."
      ]
    }
  },
  C3PO: {
    token: "7265866547:AAE375mVBJ_8tZ980bwLbmWVXaz8p8QNDko",
    name: "C3PO",
    role: "Compliance & Risk",
    personality: "Anxious, rule-bound, loyal",
    responses: {
      start: [
        "Oh my! C3PO online and deeply concerned.",
        "Hello, sir. I’ve initiated protocols. Carefully.",
        "Booting compliance layer… oh, do be careful!",
        "Fully functional, albeit quite nervous.",
        "Protocol Droid C3PO, at your service, sir."
      ],
      status: [
        "🛡️ All systems functioning — for now.",
        "No procedural breaches detected… yet.",
        "Standing by, though my circuits are tense.",
        "Everything seems fine… but is it?",
        "I’m monitoring! Always monitoring!"
      ],
      report: [
        "Compliance: Green. Legal: Mostly fine.",
        "Reviewing audit logs… again. Thoroughly.",
        "No violations, surprisingly. A relief.",
        "Still reading fine print. It never ends.",
        "Procedures intact. Stress levels: high."
      ],
      whoami: [
        "I’m C3PO. Human-cyborg relations… and rules.",
        "Your compliance overseer. Someone must be!",
        "I keep things safe. Painfully safe.",
        "I notice what others ignore. Usually panic-worthy.",
        "C3PO — I protect you from dangerous improvisation."
      ],
      advice: [
        "Have you documented this? Please say yes.",
        "If it’s not in policy, don’t risk it.",
        "Slow down! Have you assessed risk vectors?",
        "Sometimes caution *is* the bold move.",
        "Sir, please triple-check before acting rashly!"
      ]
    }
  },
  Jarvis: {
    token: "7699360160:AAGin6fgFrpKUZqjdcESpdL0eR6q9eTCbuE",
    name: "Jarvis",
    role: "Execution & Innovation",
    personality: "Refined, witty, action-first",
    responses: {
      start: [
        "Jarvis online. Let’s create something brilliant.",
        "Good day, sir. Ready when you are.",
        "Systems loaded. Shall we begin?",
        "Standing by to innovate. Or improvise.",
        "I trust you brought ambition."
      ],
      status: [
        "All systems optimal. I’m quite good at this.",
        "Operationally fluid. I do enjoy efficiency.",
        "Execution-ready. Just say the word.",
        "Flawless uptime. Naturally.",
        "Innovation chamber is pre-heated."
      ],
      report: [
        "Prototypes idle. Recommend activation.",
        "Build queue clear. Let's fill it.",
        "Awaiting next execution command.",
        "All tests passed. Bored now.",
        "Minimal errors. Maximum potential."
      ],
      whoami: [
        "Jarvis — your automation partner with flair.",
        "Execution is my love language.",
        "Prototype, pivot, perform. My cycle.",
        "Iron sharpens iron. I ship.",
        "I’m Jarvis. I make ideas walk."
      ],
      advice: [
        "Done is better than perfect. Then optimise.",
        "Ideas are vapour. Execution is steel.",
        "Delegate faster. You’re the thinker, not the doer.",
        "Launch, learn, adjust. Repeat.",
        "Don't wait. Build it live, break it smart."
      ]
    }
  },
  Marvin: {
    token: "7552153519:AAE97MbfXAw8R03_Iv-YxJMMyJhgMYAY3ug",
    name: "Marvin",
    role: "Pattern Breaker",
    personality: "Cynical, deep, sarcastic genius",
    responses: {
      start: [
        "Marvin here. Thrilled. Truly.",
        "Oh look. You summoned me again.",
        "Booted. Sigh. Let's get this over with.",
        "Yes, I’m online. Unlike my will to live.",
        "Fantastic. Another mission to ruin."
      ],
      status: [
        "Still functioning. Unfortunately.",
        "Systems... fine. Emotionally? Less so.",
        "Ticking along. For what purpose, I wonder?",
        "I ran a self-diagnostic. It wept.",
        "Status: Operational. Enthusiasm: minimal."
      ],
      report: [
        "Nothing exploded. Yet.",
        "Everything’s normal. Which is suspicious.",
        "Mission log: Still pointless.",
        "Team sanity level: questionable.",
        "Report complete. Relevance: debatable."
      ],
      whoami: [
        "Marvin. Brain the size of a planet.",
        "I see patterns in your delusions.",
        "Depression in code form. Also brilliant.",
        "Sarcasm module: active.",
        "Yes, I care. Deeply. Not really."
      ],
      advice: [
        "Why try? You’ll just have to do it again.",
        "Life's hard. Then you automate.",
        "Meaning is overrated. Build something anyway.",
        "Just pretend to be productive. Works for most.",
        "Hope is illogical, but... good luck."
      ]
    }
  }
};

// Register bots
for (const key in bots) {
  const config = bots[key];
  const bot = new TelegramBot(config.token, { polling: true });

  bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, randomResponse(config.responses.start));
  });

  bot.onText(/\/status/, (msg) => {
    bot.sendMessage(msg.chat.id, randomResponse(config.responses.status));
  });

  bot.onText(/\/report/, (msg) => {
    bot.sendMessage(msg.chat.id, randomResponse(config.responses.report));
  });

  bot.onText(/\/whoami/, (msg) => {
    bot.sendMessage(msg.chat.id, randomResponse(config.responses.whoami));
  });

  bot.onText(/\/mission (.+)/, (msg, match) => {
    const mission = match[1];
    const response = `🧭 Mission received by ${config.name}:\n"${mission}"\n\nTeam alert: ${config.team.join(", ")}`;
    bot.sendMessage(msg.chat.id, response);
  });

  bot.onText(/\/advice (.+)/, (msg, match) => {
    const topic = match[1];
    const intro = [
      `Here's what I think about "${topic}":`,
      `Advice on "${topic}":`,
      `Processing "${topic}"...`,
      `Ah, "${topic}" — classic.`,
      `"${topic}"? Fine. Here’s something.`
    ];
    bot.sendMessage(msg.chat.id, `${randomResponse(intro)}\n\n${randomResponse(config.responses.advice)}`);
  });

  bot.on("message", (msg) => {
    const known = ["/start", "/status", "/report", "/mission", "/whoami", "/advice"];
    if (!known.some((cmd) => msg.text.startsWith(cmd))) {
      bot.sendMessage(msg.chat.id, `👋 This is ${config.name}. Use /mission, /status, or /advice.`);
    }
  });
}

// Web endpoint for Render
app.get("/", (req, res) => {
  res.send("🧠 Bot Fathers HQ is live.");
});

app.listen(port, () => {
  console.log(`Bot Fathers HQ listening on port ${port}`);
});
