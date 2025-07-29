import { createAgent, gemini } from "@inngest/agent-kit";
import { GEMINI_API_KEY } from "@/env";

export async function analyzeTicket({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const supportAgent = createAgent({
    name: "Orchestrator",
    description:
      "Automates the workflow by processing the ticket and assigning it to best-suited moderator",
    system: `You are an expert AI assistant that processes technical support tickets. 
    Your job is to:
    1. Summarize the issue.
    2. Estimate its priority.
    3. Provide helpful notes and resource links for human moderators.
    4. List relevant technical skills required.

    IMPORTANT:
    - Respond with *only* valid raw JSON.
    - Do NOT include markdown, code fences, comments, or any extra formatting.
    - The format must be a raw JSON object.

    Repeat: Do not wrap your output in markdown or code fences.`,
    model: gemini({
      model: "gemini-2.0-flash-lite",
      apiKey: GEMINI_API_KEY,
    }),
  });

  const response = await supportAgent.run(`
  You are a ticket triage agent. Only return a strict JSON object with no extra text, headers, or markdown.        
  Analyze the following support ticket and provide a JSON object with:

  - summary: A short 1-2 sentence summary of the issue.
  - priority: Choose one of these: "LOW" or "MEDIUM" or "HIGH". (IMPORTANT: priority should be in all capital letters)
  - helpfulNotes: A detailed technical explanation that a moderator can use to solve this issue. Include useful external links or resources if possible.
  - relatedSkills: An array of relevant skills (upto 5 most relevant skills only) required to solve the issue (e.g., ["React", "PosgreSQL"]).

  Respond ONLY in this JSON format and do not include any other text or markdown in the answer:

  e.g. {
  "summary": "Short summary of the ticket",
  "priority": "ticket priority",
  "helpfulNotes": "Here are useful tips...",
  "relatedSkills": ["React", "Node.js"]
  } 

  ---

  Ticket information:

  - Title: ${title}
  - Description: ${description}`);

  try {
    const raw = response.output[0].content;
    const match = raw.match(/```json\s*([\s\S]*?)\s*```/i);
    const jsonString = match ? match[1] : raw.trim();
    return JSON.parse(jsonString);
  } catch {
    return null;
  }
}
