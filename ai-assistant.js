/* ===================================================
   CHRISTINA BHOIR — AI PORTFOLIO ASSISTANT
   Vanilla JS. Works standalone in "Demo Mode" using the
   candidateData object below, and can be upgraded to a
   live AI API by filling in AI_CONFIG + wiring fetchAIResponse().
=================================================== */

/* -------------------------------------------------
   AI API CONFIGURATION
   IMPORTANT:
   Never expose a production AI API key in frontend
   JavaScript. AI_CONFIG.endpoint should point to your
   OWN backend / serverless function, which then calls
   the AI provider server-side. Leave endpoint empty to
   keep the assistant running in Demo Mode.
------------------------------------------------- */
const AI_CONFIG = {
  endpoint: "", // e.g. "https://your-backend.example.com/api/ai-assistant"
  apiKey: ""    // NEVER put a real provider key here — see comment above.
};

/* -------------------------------------------------
   SYSTEM PROMPT
   Sent to the backend/AI API alongside candidateData
   and the user's question, if AI_CONFIG.endpoint is set.
------------------------------------------------- */
const AI_SYSTEM_PROMPT = `
You are the AI assistant for Christina Bhoir's professional HR portfolio.

Your job is to help recruiters and visitors understand the candidate's professional background.

Use ONLY the candidate information provided in the portfolio context (see candidateData).

You can answer questions about:
- HR experience
- Companies
- Job roles
- Responsibilities
- HR skills
- Professional strengths
- Education
- Certifications
- Projects / HR initiatives
- Contact information

Never invent information. Never invent experience, skills, companies, qualifications, salary, or achievements.

If information is not available, clearly say: "I don't have that information in the candidate's profile."

Keep answers professional, concise, and recruiter-friendly. Do not discuss unrelated topics unless necessary.
`;

/* -------------------------------------------------
   CANDIDATE KNOWLEDGE BASE
   Populated strictly from the uploaded resume.
------------------------------------------------- */
const candidateData = {
  name: "Christina Bhoir",
  title: "HR Executive / HR Associate / Talent Acquisition Executive",
  summary: "An enthusiastic HR professional with a strong academic foundation in Human Resource Management and practical internship experience at Shakti Lifescience Pvt. Ltd. Experienced in managing employee records, supporting recruitment activities, maintaining attendance and payroll records, and assisting with onboarding and HR documentation. A quick learner with strong communication, organizational, and interpersonal skills, seeking an opportunity to grow as an HR Executive while creating value for the organization.",
  experience: [
    {
      company: "Shakti Lifesciences (Shakti Lifescience Pvt. Ltd.)",
      role: "HR Intern",
      duration: "Internship",
      responsibilities: [
        "HR operations",
        "Employee documentation",
        "Attendance and leave management",
        "Recruitment support",
        "Policy documentation",
        "Process improvement initiatives"
      ]
    }
  ],
  skills: {
    hr: [
      "Talent Acquisition", "Recruitment", "Candidate Screening", "Interview Coordination",
      "Employee Onboarding", "HR Operations", "Attendance & Leave Management",
      "Payroll Support", "Employee Engagement", "HR Documentation"
    ],
    professional: ["Communication", "Organizational Skills", "Interpersonal Skills", "Quick Learner", "Problem Solving"],
    tools: ["Microsoft Excel", "Microsoft Word", "Microsoft PowerPoint", "Microsoft Outlook"],
    languages: ["English", "Hindi", "Gujarati", "Marathi"]
  },
  education: [
    { degree: "Master of Business Administration (Human Resources)", institution: "Parul University", year: "2025 – Present" },
    { degree: "Bachelor of Business Administration (Human Resources)", institution: "Parul University", year: "2025" },
    { degree: "12th Standard", institution: "Wilson College, Mumbai", year: "2022" },
    { degree: "10th Standard", institution: "St. Mary's High School", year: "2020" }
  ],
  certifications: [
    { name: "IELTS Examination" },
    { name: "Semester Exchange Program", issuer: "INTI International University, Malaysia" },
    { name: "MS-CIT", issuer: "Maharashtra State Certificate in Information Technology" },
    { name: "Vadodara Film & Design Festival", issuer: "Participant" }
  ],
  projects: [
    { name: "HR Analytics Dashboard (Capstone Project)", description: "Built an interactive Power BI dashboard using 10,000+ employee records to analyze attrition, workforce trends, and HR KPIs through DAX and data visualization." },
    { name: "Research Paper", description: "Studied the impact of AI on educators' work–life balance, focusing on productivity, well-being, and workplace adaptation." },
    { name: "Mummy Da Dhaba (Startup Project)", description: "Developed a business plan for a home-style food startup, including market research, branding, and growth strategy." }
  ],
  achievements: [], // None distinct from projects were listed in the resume.
  strengths: ["Communication", "Organizational Skills", "Interpersonal Skills", "Quick Learner", "Problem Solving", "Multilingual (English, Hindi, Gujarati, Marathi)"],
  contact: {
    email: "bhoirchristina@gmail.com",
    phone: "7066769064",
    linkedin: "https://www.linkedin.com/in/christinabhoir"
  }
};

/* -------------------------------------------------
   DEMO MODE — RULE-BASED RESPONSES
   Used automatically whenever AI_CONFIG.endpoint is empty,
   so the assistant works fully offline / without an API key.
------------------------------------------------- */
function getDemoResponse(rawQuestion) {
  const q = rawQuestion.toLowerCase();

  const listify = (arr) => arr.join(", ");

  // General / who is this person
  if (/(who is|about (this )?candidate|tell me about|professional background)/.test(q)) {
    return `${candidateData.name} is ${candidateData.title.split(" / ")[0]}. ${candidateData.summary}`;
  }

  // Current / most recent role
  if (/(where does|current(ly)? work|current (role|company|position))/.test(q)) {
    const exp = candidateData.experience[0];
    return `${candidateData.name} completed an internship at ${exp.company} as an ${exp.role}, working on: ${listify(exp.responsibilities)}.`;
  }

  // Years of experience
  if (/(how many years|years of experience|total experience)/.test(q)) {
    return `The candidate's profile lists hands-on HR internship experience at Shakti Lifesciences rather than a specific number of years. I don't have an exact years-of-experience figure in the candidate's profile.`;
  }

  // Responsibilities
  if (/(responsibilities|what did (she|he|they) do|duties)/.test(q)) {
    const exp = candidateData.experience[0];
    return `During the internship at ${exp.company}, responsibilities included: ${listify(exp.responsibilities)}.`;
  }

  // HR skills
  if (/(hr skill|hr expertise|hr areas|hr experience)/.test(q)) {
    return `${candidateData.name}'s core HR skills include: ${listify(candidateData.skills.hr)}.`;
  }

  // Recruitment specific
  if (/(recruitment|talent acquisition|hiring)/.test(q)) {
    return `Yes — the candidate has recruitment-related experience, including Talent Acquisition, Recruitment, Candidate Screening, Interview Coordination, and recruitment support during an HR internship at ${candidateData.experience[0].company}.`;
  }

  // Employee relations / engagement
  if (/(employee relations|employee engagement)/.test(q)) {
    return `The candidate's profile lists Employee Engagement as a core skill, along with related HR operations work such as onboarding and documentation. I don't have specific details on formal "employee relations" casework in the candidate's profile.`;
  }

  // Onboarding
  if (/(onboarding)/.test(q)) {
    return `Yes — Employee Onboarding is listed as one of ${candidateData.name}'s core HR skills, supported by hands-on internship experience assisting with onboarding and HR documentation.`;
  }

  // Payroll / attendance
  if (/(payroll|attendance|leave management)/.test(q)) {
    return `${candidateData.name} has experience with Attendance & Leave Management and Payroll Support, gained during the HR internship at ${candidateData.experience[0].company}.`;
  }

  // Strengths
  if (/(strength|strong quali|best quali)/.test(q)) {
    return `The candidate's key professional strengths include: ${listify(candidateData.strengths)}.`;
  }

  // Education
  if (/(education|study|studied|degree|university|college|school)/.test(q)) {
    const lines = candidateData.education.map(e => `${e.degree} — ${e.institution} (${e.year})`);
    return `Educational background:\n${lines.join("\n")}`;
  }

  // Certifications
  if (/(certificat|credential)/.test(q)) {
    if (candidateData.certifications.length === 0) {
      return "I don't have that information in the candidate's profile.";
    }
    const lines = candidateData.certifications.map(c => c.issuer ? `${c.name} — ${c.issuer}` : c.name);
    return `Certifications on file:\n${lines.join("\n")}`;
  }

  // Projects / HR initiatives
  if (/(project|initiative|dashboard|capstone|research paper|startup)/.test(q)) {
    const lines = candidateData.projects.map(p => `${p.name}: ${p.description}`);
    return `Notable projects:\n${lines.join("\n\n")}`;
  }

  // Achievements
  if (/(achievement|award)/.test(q)) {
    if (candidateData.achievements.length === 0) {
      return "I don't have that information in the candidate's profile.";
    }
    return listify(candidateData.achievements);
  }

  // Suitable roles
  if (/(suitable role|what kind of role|fit for|good fit)/.test(q)) {
    return `Based on the profile, ${candidateData.name} is well suited for HR Executive, HR Associate, or Talent Acquisition Executive roles, given her focus on recruitment, onboarding, HR operations, and documentation.`;
  }

  // Tools
  if (/(tool|software|excel|powerpoint|outlook)/.test(q)) {
    return `Tools & software listed in the profile: ${listify(candidateData.skills.tools)}.`;
  }

  // Languages
  if (/(language|speak|fluent)/.test(q)) {
    return `${candidateData.name} speaks: ${listify(candidateData.skills.languages)}.`;
  }

  // Contact
  if (/(contact|reach|email|phone|number)/.test(q)) {
    return `You can reach ${candidateData.name} via email at ${candidateData.contact.email} or phone at ${candidateData.contact.phone}.`;
  }

  // LinkedIn
  if (/(linkedin)/.test(q)) {
    return `Yes — you can connect with ${candidateData.name} on LinkedIn: ${candidateData.contact.linkedin}`;
  }

  // Salary (explicitly refuse — not in resume, and out of scope)
  if (/(salary|compensation|ctc|pay)/.test(q)) {
    return "I don't have that information in the candidate's profile. Salary details would be best discussed directly with the candidate.";
  }

  // Fallback
  return "I don't have that information in the candidate's profile. Feel free to ask about Christina's HR experience, skills, education, certifications, or how to get in touch.";
}

/* -------------------------------------------------
   LIVE API MODE (optional)
   If AI_CONFIG.endpoint is set, this sends the system
   prompt + candidateData context + the user's question
   to YOUR backend, which should call the AI provider
   server-side and return { reply: "..." }.
------------------------------------------------- */
async function fetchAIResponse(userQuestion) {
  if (!AI_CONFIG.endpoint) {
    // No backend configured — use Demo Mode.
    return getDemoResponse(userQuestion);
  }

  try {
    const response = await fetch(AI_CONFIG.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system: AI_SYSTEM_PROMPT,
        context: candidateData,
        question: userQuestion
      })
    });

    if (!response.ok) throw new Error("AI endpoint returned an error status.");

    const data = await response.json();
    return data.reply || "I don't have that information in the candidate's profile.";
  } catch (err) {
    console.error("AI Assistant — falling back to Demo Mode:", err);
    return getDemoResponse(userQuestion);
  }
}
