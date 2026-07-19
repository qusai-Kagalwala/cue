// src/data/scenarios.solo.js
// v2-5b — SOLO tier: the original 24 hand-written, interview-sourced
// scenarios (T6.1), extracted verbatim from lessons.js. Gemini-evaluated,
// XP-awarded — the real performances. Do not dilute.

export const SOLO = {
  "l1": {
    "student": {
      "scenario": "Your Environmental Science assignment is due Thursday: a case study on water pollution. Your professor hates generic essays — last time she wrote 'which river? which city? BE SPECIFIC' in red on your friend's submission.",
      "task": "Ask the AI to help you build a case study — specific enough that it couldn't be about just any river in any city.",
      "exampleBad": "write about water pollution in india",
      "hints": [
        "What would make YOUR case study different from every other student in class?",
        "Pick one river, one city, one cause — name all three in your prompt."
      ]
    },
    "everyday": {
      "scenario": "You're making biryani in a pressure cooker for the first time — your mother always just knew how many whistles, but she's not picking up the phone. You have basmati rice, a 5-litre cooker, and guests arriving in two hours.",
      "task": "Ask the AI for cooking guidance with enough detail that its answer works for YOUR cooker and YOUR rice — not some general recipe.",
      "exampleBad": "how many whistles for biryani",
      "hints": [
        "What would your mother ask you before answering? Which rice? How much? What size cooker?",
        "Mention the rice type, quantity, cooker size, and whether the chicken is already cooked."
      ]
    },
    "professional": {
      "scenario": "Your manager pings you: 'Send me a status update before the client call at 4.' You have three workstreams — one on track, one delayed by a vendor, one waiting on the client themselves. A generic 'all good' will get you grilled on the call.",
      "task": "Ask the AI to help you draft a status update that covers your actual situation — not a template that says nothing.",
      "exampleBad": "write a project status update email",
      "hints": [
        "What are the three specific things your manager actually needs to know?",
        "Name each workstream, its status, and the one blocker — the AI cannot invent your project."
      ]
    }
  },
  "l2": {
    "student": {
      "scenario": "You're stuck on integration and the exam is Monday. But 'integration' means very different things to a Class 12 CBSE student and an engineering undergrad — and the AI has no idea which one you are, what you already know, or that your textbook uses different notation.",
      "task": "Ask the AI to explain a maths topic with enough context about your level that the explanation actually lands.",
      "exampleBad": "explain integration",
      "hints": [
        "If a new tuition teacher joined today, what would they need to know about you first?",
        "State your class/board, what you already understand, and where exactly you get lost."
      ]
    },
    "everyday": {
      "scenario": "Your grandmother swears by haldi on cuts — she's already applied turmeric to the gash on your hand from the kitchen knife. You want to know if that's actually fine or if this cut needs more, but 'is turmeric good for cuts' will get you a generic article, not advice about THIS cut.",
      "task": "Ask the AI about the home remedy with enough context — the cut, the person, the situation — to get an answer you can act on.",
      "exampleBad": "is turmeric good for cuts",
      "hints": [
        "What would a pharmacist ask before recommending anything? How deep? How long ago? Who?",
        "Describe the cut's size and depth, when it happened, what's been applied, and any conditions like diabetes."
      ]
    },
    "professional": {
      "scenario": "A client's email sounds annoyed — third follow-up about a delayed feature. You want the AI's help drafting a reply, but you've only typed 'help me reply to an angry client' and the AI hasn't seen the email, doesn't know the history, and doesn't know the delay was partly the client's own late approvals.",
      "task": "Ask the AI to help draft the reply, giving it the context it needs: the thread, the history, and the outcome you want.",
      "exampleBad": "help me reply to an angry client email",
      "hints": [
        "The AI is like a colleague who just joined today — what would you brief them on first?",
        "Paste or summarise the email, explain the real cause of the delay, and say what tone you want."
      ]
    }
  },
  "l3": {
    "student": {
      "scenario": "Two days to the Operating Systems exam and your notes are a mess. You want revision material from the AI — but last time it gave you a 2,000-word essay you never read. What actually works for you is question-answer flashcards you can drill on the bus.",
      "task": "Ask the AI for revision material in the exact format you revise best with — and say the format explicitly.",
      "exampleBad": "give me notes on process scheduling",
      "hints": [
        "How do YOU actually revise — paragraphs, tables, flashcards, one-liners?",
        "Ask for a specific structure: '10 flashcards, question on one line, answer under 20 words'."
      ]
    },
    "everyday": {
      "scenario": "Your cousin's wedding is in three weeks and you're managing the guest list for your side of the family — 60+ people across Mumbai, Pune, and two villages. You asked the AI for help organising it and got a rambling paragraph of advice instead of something you can actually use.",
      "task": "Ask the AI to organise the guest planning as a structured format you can copy into a notebook or share on WhatsApp.",
      "exampleBad": "help me manage my wedding guest list",
      "hints": [
        "What would the finished thing look like on paper — columns? Groups? A checklist?",
        "Ask for a table with the exact columns you need: name, family group, city, invited-by, RSVP status."
      ]
    },
    "professional": {
      "scenario": "You just finished a 45-minute client call and typed rough notes. Your team needs minutes before end of day — and your company's format is strict: decisions at the top, then action items with owners and dates, nothing else. The AI's default 'summary' won't match it.",
      "task": "Ask the AI to convert your rough notes into minutes in your exact required structure.",
      "exampleBad": "summarize these meeting notes",
      "hints": [
        "Your company already has a format — describe it to the AI instead of accepting the AI's format.",
        "Spell out the sections in order: 'Decisions (bullets), then a table of Action | Owner | Due date'."
      ]
    }
  },
  "l4": {
    "student": {
      "scenario": "The sociology assignment is 800 words, due tomorrow, and here's the trap: half your class is using AI, and the professor can smell identical AI essays from across the room. You need it faster AND unique — your own examples, simple English that sounds like you, nothing that reads like a Wikipedia intro.",
      "task": "Ask the AI for a draft with constraints that make the output sound like you, not like every other AI essay submitted that day.",
      "exampleBad": "write my sociology assignment on urbanization",
      "hints": [
        "What makes YOUR writing recognisably yours — and what AI-isms do you want banned?",
        "Constrain it: exactly 800 words, simple English, examples from Mumbai locals, no phrases like 'in conclusion' or 'delve into'."
      ]
    },
    "everyday": {
      "scenario": "Family trip to Goa: four people, three days, and a hard budget of ₹20,000 total — trains not flights, veg food only for your parents, and your father will absolutely not walk more than a couple of kilometres a day. The AI's default Goa itinerary assumes none of this.",
      "task": "Ask for a trip plan with every real-life constraint stated, so the plan survives contact with your actual family.",
      "exampleBad": "plan a 3 day goa trip",
      "hints": [
        "List the deal-breakers first — budget, food, travel mode, walking limits.",
        "Put numbers on everything: '₹20,000 total for 4 people, veg restaurants only, max 2km walking per day'."
      ]
    },
    "professional": {
      "scenario": "You're posting on LinkedIn about your team shipping a project. Company social guidelines: under 150 words, no confidential details, no buzzwords, and absolutely no emoji walls. The AI's natural LinkedIn voice violates all four.",
      "task": "Ask for the post with your constraints stated up front, so the first draft is publishable — not a jargon soup you have to gut.",
      "exampleBad": "write a linkedin post about my project launch",
      "hints": [
        "What does your company forbid, and what does the platform punish?",
        "State the fences: 'under 150 words, no client names, plain English, zero emojis, no words like synergy or thrilled'."
      ]
    }
  },
  "l5": {
    "student": {
      "scenario": "You've found a revision style that works: one-line questions with answers under 15 words, slightly funny so they stick. You want 20 more in exactly that style for your Computer Networks exam — but describing 'slightly funny short flashcards' to the AI gets you stiff, textbook-toned cards.",
      "task": "Give the AI one or two examples of your exact flashcard style, then ask for more in the same voice.",
      "exampleBad": "make funny flashcards for computer networks",
      "hints": [
        "You already have cards you love — show one instead of describing it.",
        "Paste an example: 'Q: What does DNS do? A: Phonebook of the internet — names in, numbers out.' Then say: 20 more like this."
      ]
    },
    "everyday": {
      "scenario": "Your 5-year-old nephew is obsessed with the mandala on your mother's puja room wall and wants to draw one. The designs the AI suggested last time were beautiful — for adults. He can barely hold the sketch pen steady, so 'simple mandala for kids' is clearly not landing the level you mean.",
      "task": "Describe one example of the difficulty level he can handle, then ask for more ideas at exactly that level.",
      "exampleBad": "simple mandala designs for kids",
      "hints": [
        "'Simple' means different things — show what simple means for HIM.",
        "Give a sample: 'He can draw a circle, big petals around it, and dots — like a sunflower. More designs at exactly this level.'"
      ]
    },
    "professional": {
      "scenario": "Your company has a house tone for customer emails — warm but brief, first names, never 'Dear Sir/Madam', always ends with a clear next step. Every AI draft you've asked for sounds like a bank's legal department. You have a perfect past email sitting in your Sent folder.",
      "task": "Show the AI one real example of your company's email voice, then ask it to write the new email in that same voice.",
      "exampleBad": "write a customer email in a friendly professional tone",
      "hints": [
        "'Friendly professional' describes a thousand different tones — your Sent folder has the exact one.",
        "Paste a past email (details removed) and say: 'Match this tone and structure exactly for the following situation…'"
      ]
    }
  },
  "l6": {
    "student": {
      "scenario": "Your DBMS viva is on Friday and your external examiner has a reputation: rapid-fire questions, interrupts waffly answers, loves asking 'but WHY?' three times in a row. Practising with a friend is useless — they're too nice. You need the AI to stop being helpful and start being HIM.",
      "task": "Assign the AI a role that turns it into your practice examiner, and tell it how to behave in that role.",
      "exampleBad": "ask me dbms questions",
      "hints": [
        "Who exactly do you need across the table — and how do they behave?",
        "Set the role and rules: 'Act as a strict external examiner for a DBMS viva. One question at a time, interrupt vague answers, push with why.'"
      ]
    },
    "everyday": {
      "scenario": "Your 62-year-old mother's knees ache climbing the building stairs, and the doctor said 'light exercise' — nothing more specific. Generic workout advice from the AI keeps suggesting squats and lunges she absolutely should not do. The advice needs to come from the right kind of expert.",
      "task": "Assign the AI an appropriate expert role so its suggestions fit a 62-year-old with knee pain — then ask for a gentle routine.",
      "exampleBad": "exercises for knee pain",
      "hints": [
        "Whose advice would you actually trust for her — a gym trainer or someone gentler?",
        "Frame the role: 'Act as a physiotherapist who works with seniors. Suggest gentle, sitting-friendly exercises for a 62-year-old with knee pain climbing stairs.' (And check with her doctor.)"
      ]
    },
    "professional": {
      "scenario": "You teach 60 students in a classroom with one blackboard, no projector, and a strict syllabus clock — and every teaching idea the AI gives you starts with 'display a video' or 'have students use their laptops.' The AI is planning for a classroom that isn't yours.",
      "task": "Assign the AI the role of a teacher who works in YOUR conditions, so its ideas fit one blackboard and zero devices.",
      "exampleBad": "creative teaching ideas for photosynthesis",
      "hints": [
        "The role can carry your constraints — describe the teacher you need it to be.",
        "Set it: 'Act as an experienced teacher in a low-resource Indian school — 60 students, one blackboard, no devices. Activity ideas for photosynthesis that need only chalk and paper.'"
      ]
    }
  },
  "l7": {
    "student": {
      "scenario": "The AI's essay draft came back and it's… fine. Generic-fine. The introduction could open any essay ever written, the examples are American, and paragraph three repeats paragraph one. Your instinct is to throw it away and re-prompt from scratch — but the structure is actually good.",
      "task": "Don't restart — refine. Tell the AI exactly what's wrong with which part, and what to change it to.",
      "exampleBad": "this is bad, write it again",
      "hints": [
        "'Write it again' gets you a different generic essay. What EXACTLY is wrong, and where?",
        "Point and direct: 'Keep the structure. Replace the intro with a hook about Mumbai locals, swap the US examples for Indian ones, and cut paragraph 3 — it repeats paragraph 1.'"
      ]
    },
    "everyday": {
      "scenario": "You asked for a cake recipe for your daughter's birthday and the AI's version needs an oven, a stand mixer, and cream cheese from a gourmet store. You have a gas stove, a kadhai, a steel whisk, and whatever the kirana downstairs stocks. Classic jugaad situation — the recipe isn't wrong, it just doesn't fit YOUR kitchen.",
      "task": "Refine the AI's recipe to work with the equipment and ingredients you actually have — tell it what to substitute and why.",
      "exampleBad": "i dont have these things give me another recipe",
      "hints": [
        "Don't reject the whole recipe — tell it what you DO have and ask it to adapt.",
        "Get specific: 'Adapt this for no oven — I have a gas stove and a kadhai with a lid. Replace cream cheese with something from a local kirana store.'"
      ]
    },
    "professional": {
      "scenario": "The AI drafted your email to a long-time vendor and it reads like a legal notice — 'pursuant to our agreement,' 'kindly revert at the earliest.' You've known this vendor for four years; he sends you Diwali sweets. The content is right but the temperature is completely wrong.",
      "task": "Refine the draft: keep the content, fix the tone — and tell the AI precisely what temperature you want.",
      "exampleBad": "make it better",
      "hints": [
        "'Better' is not a direction. What should stay, and what should change?",
        "Direct the edit: 'Keep all the points, but rewrite warmer — we've worked together 4 years. Drop kindly revert, write like I'd talk to him on a call.'"
      ]
    }
  },
  "l8": {
    "student": {
      "scenario": "It's 11:40 PM, the exam is at 9 AM, and you have one specific doubt about normalization in DBMS. This is not the time for 'Hello, I hope you're doing well, I am a second-year student and I was wondering if perhaps…' — you have 40 tokens. Make every one count.",
      "task": "Ask your exact doubt within the token budget — everything the answer needs, nothing it doesn't.",
      "exampleBad": "hello! i hope you are doing well. i am a computer science student and tomorrow i have my dbms exam and i was wondering if you could please explain to me the concept of normalization because i find it a little confusing",
      "hints": [
        "Which words in your draft change the answer, and which are just politeness padding?",
        "Strip it to the bone: 'Explain 2NF vs 3NF with one table example each. Exam tomorrow, keep it short.'"
      ]
    },
    "everyday": {
      "scenario": "You're at the sabzi mandi, one bar of network, 2% battery, and you need to know right now whether the slightly soft lauki in your hand is fine to cook tonight or already gone. Forty tokens of battery life — no essays.",
      "task": "Get your answer within the budget: the exact question, the deciding details, nothing else.",
      "exampleBad": "hi, so i am at the vegetable market right now and i found this bottle gourd which looks okay from outside but it feels a little bit soft when i press it and i am not sure if it is still good to use for cooking dinner tonight or if i should not buy it",
      "hints": [
        "What are the two or three facts that actually decide the answer?",
        "Compress: 'Lauki slightly soft when pressed, skin intact — safe to cook tonight or skip?'"
      ]
    },
    "professional": {
      "scenario": "You're between back-to-back meetings with 90 seconds to get a subject line for the quarterly report email before you're pulled into the next call. Long prompts waste the one resource you don't have. Forty tokens, one shot.",
      "task": "Get exactly what you need within the budget — the request plus only the details that shape it.",
      "exampleBad": "hey, i need some help with something quick. i have to send out our quarterly report email to the leadership team today and i have been struggling to come up with a good subject line that sounds professional but also gets people to actually open the email, can you suggest some options",
      "hints": [
        "The AI needs the what and the audience — not your schedule or your struggle.",
        "One line does it: '5 subject lines: Q2 report email to leadership. Professional, high open-rate.'"
      ]
    }
  }
}