/* ============================================================
   Silver Circuit — "Which AI Companion Fits Your Parent?" quiz
   6 questions → weighted scoring → product recommendation
   Products: ElliQ, Meela, GrandPad, JubileeTV, "Start Simple"
   ============================================================ */

const QUESTIONS = [
  {
    text: "What's your parent's living situation?",
    options: [
      { label: "Lives alone", scores: { elliq: 2, meela: 2, jubileetv: 1 } },
      { label: "Lives with a spouse or partner", scores: { jubileetv: 2, grandpad: 1 } },
      { label: "Assisted living or with family", scores: { grandpad: 2, jubileetv: 1 } },
    ],
  },
  {
    text: "What's your biggest worry?",
    options: [
      { label: "Loneliness — the days are long and quiet", scores: { meela: 2, elliq: 2 } },
      { label: "Staying connected — we can't visit or call enough", scores: { jubileetv: 2, grandpad: 2 } },
      { label: "Daily routine — medications, appointments, activity", scores: { elliq: 3 } },
      { label: "Safety — falls, wandering, emergencies", scores: { startSimple: 3 } },
    ],
  },
  {
    text: "How does your parent feel about new technology?",
    options: [
      { label: "Curious — they'll try new things", scores: { elliq: 3 } },
      { label: "Neutral — needs to be very simple", scores: { jubileetv: 2, grandpad: 2, meela: 1 } },
      { label: "Resistant — the phone is enough", scores: { meela: 3 } },
    ],
  },
  {
    text: "How is your parent's memory and thinking these days?",
    options: [
      { label: "Sharp as ever", scores: { elliq: 2, meela: 1 } },
      { label: "Some mild decline", scores: { meela: 2, grandpad: 2, jubileetv: 1 } },
      { label: "Moderate decline or dementia", scores: { grandpad: 3, startSimple: 1 } },
    ],
  },
  {
    text: "What fits your budget best?",
    options: [
      { label: "Under $50/month, nothing upfront", scores: { meela: 3 } },
      { label: "A few hundred dollars, moderate ongoing cost", scores: { jubileetv: 2, grandpad: 2 } },
      { label: "Premium is fine if it truly helps", scores: { elliq: 3 } },
      { label: "Free options only — for now", scores: { startSimple: 3 } },
    ],
  },
  {
    text: "What would help YOU most as the caregiver?",
    options: [
      { label: "Knowing someone checks in every day", scores: { meela: 2, elliq: 2 } },
      { label: "Being able to help with tech problems remotely", scores: { jubileetv: 3 } },
      { label: "Easy video calls they can actually answer", scores: { jubileetv: 2, grandpad: 2 } },
      { label: "Just peace of mind that they're okay", scores: { elliq: 1, meela: 1, jubileetv: 1 } },
    ],
  },
];

const RESULTS = {
  elliq: {
    name: "ElliQ — AI Companion Robot",
    price: "≈ $588/year + $249 setup (lease model)",
    summary: "The most complete AI companion for a parent who lives alone, is open to new things, and needs daily engagement — proactive conversations, medication reminders, wellness nudges, and a caregiver app that keeps you in the loop.",
    reasons: [
      "Proactive: it starts conversations instead of waiting to be used",
      "Best-in-class daily routine support (medications, appointments, activity)",
      "Caregiver app gives you visibility into how the day went",
      "Backed by government aging programs in New York and other states",
    ],
    caveat: "Check whether your state or local Office for the Aging offers subsidized ElliQ units — most current users got theirs through a partner program.",
  },
  meela: {
    name: "Meela — the AI that calls your parent",
    price: "≈ $40/month, no hardware",
    summary: "The lowest-friction entry point in the category. Meela calls your parent on their regular phone at a set time every day for a real, personalized conversation — no new device, nothing to learn, and it honestly identifies itself as an AI on every call.",
    reasons: [
      "Zero learning curve — it uses the phone they already have",
      "Personalized from their life story; remembers past conversations",
      "Cheapest and easiest way to test whether companion tech helps",
      "Easy to cancel — no hardware to return",
    ],
    caveat: "Voice only — no screen or video. If family face-to-face contact is the priority, consider pairing it with a connected device later.",
  },
  grandpad: {
    name: "GrandPad — the senior-proof family tablet",
    price: "Device + monthly plan (check current pricing)",
    summary: "A radically simplified tablet built so a 90-year-old can video call grandkids and see family photos — big icons, no passwords, a closed safe network. The right answer when connection with real family matters more than AI.",
    reasons: [
      "Designed for cognitive decline — nothing to memorize or configure",
      "Family photos and messages appear automatically — no action needed",
      "Closed network blocks scam calls and phishing by design",
      "Human connection first: real faces and voices, every day",
    ],
    caveat: "It's about family connection, not AI companionship — for daily conversation between visits, a phone-based companion can complement it well.",
  },
  jubileetv: {
    name: "JubileeTV — their TV becomes your lifeline",
    price: "Hardware + subscription (check current pricing)",
    summary: "Connects your phone to your parent's TV: fix it remotely, start video calls on the big screen (it can auto-answer), and quietly check in. If tech frustration and family connection are the pain points, this is the highest-impact buy in the category.",
    reasons: [
      "Fix their TV from anywhere — no more 40-minute phone troubleshooting",
      "Full-room video calls on the screen they can actually see",
      "Optional routine notifications give you quiet peace of mind",
      "No new tech for them to learn — the TV they already know",
    ],
    caveat: "It connects your family, but it's not a companion — for the long quiet hours between your calls, consider adding a daily-call service.",
  },
  startSimple: {
    name: "Start Simple — no purchase yet",
    price: "Free",
    summary: "Based on your answers, companion tech isn't the first move. If safety is the main worry, look at medical alert and monitoring solutions before companion products. If budget is the constraint, check your state Office for the Aging — several states offer free or subsidized companion programs.",
    reasons: [
      "Safety concerns (falls, wandering) need monitoring tech, not companionship",
      "NY State and others have distributed companion devices at no cost",
      "A family code word and scam-proofing conversation costs nothing and protects immediately",
      "Revisit companion tech once the foundation is covered",
    ],
    caveat: "Take the free Buyer's Checklist — it includes the safety-vs-companionship decision tree and links to state program directories.",
  },
};

const quizRoot = document.getElementById("quizRoot");
const resultRoot = document.getElementById("resultRoot");
const progressBar = document.getElementById("progressBar");

let current = 0;
let totals = { elliq: 0, meela: 0, grandpad: 0, jubileetv: 0, startSimple: 0 };

function renderQuestion() {
  const q = QUESTIONS[current];
  progressBar.style.width = `${(current / QUESTIONS.length) * 100}%`;
  quizRoot.innerHTML = `
    <h2>${q.text}</h2>
    <div class="quiz-options">
      ${q.options
        .map(
          (opt, i) =>
            `<button class="quiz-option" data-index="${i}">${opt.label}</button>`
        )
        .join("")}
    </div>
    <p class="fine-print" style="margin-top:1.4rem; color: var(--muted);">Question ${current + 1} of ${QUESTIONS.length}</p>
  `;
  quizRoot.querySelectorAll(".quiz-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      const opt = q.options[Number(btn.dataset.index)];
      for (const [key, val] of Object.entries(opt.scores)) totals[key] += val;
      current++;
      current < QUESTIONS.length ? renderQuestion() : renderResult();
    });
  });
}

function renderResult() {
  progressBar.style.width = "100%";
  quizRoot.innerHTML = "";
  const winner = Object.entries(totals).sort((a, b) => b[1] - a[1])[0][0];
  const r = RESULTS[winner];
  resultRoot.innerHTML = `
    <div class="quiz-result">
      <span class="result-badge">Our recommendation</span>
      <h2>${r.name}</h2>
      <p class="result-price">${r.price}</p>
      <p style="max-width:560px; margin: 0 auto 0.5rem;">${r.summary}</p>
      <ul class="result-reasons">
        ${r.reasons.map((reason) => `<li>✓&nbsp; ${reason}</li>`).join("")}
      </ul>
      <p style="max-width:560px; margin: 0 auto 2rem; color: var(--muted);"><em>${r.caveat}</em></p>
      <a class="btn btn-gold btn-lg" href="index.html#checklist">Get the Free Buyer's Checklist</a>
      <br />
      <button class="quiz-again" id="quizAgain">Retake the quiz</button>
    </div>
  `;
  document.getElementById("quizAgain").addEventListener("click", () => {
    current = 0;
    totals = { elliq: 0, meela: 0, grandpad: 0, jubileetv: 0, startSimple: 0 };
    resultRoot.innerHTML = "";
    renderQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

renderQuestion();
