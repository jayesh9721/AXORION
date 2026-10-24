// Scripted conversations for the on-site AI Agent demos. These are illustrative only:
// no AI model is called and nothing the visitor clicks is stored.

export type AgentOption = { label: string; next: string };
export type AgentNode = {
  bot: string[];
  /** Saves the visitor's choice under this key so later messages can mention it as {{key}}. */
  key?: string;
  options?: AgentOption[];
  end?: boolean;
};
export type Agent = {
  id: string;
  title: string;
  icon: string;
  summary: string;
  features: string[];
  channel: string;
  nodes: Record<string, AgentNode>;
};

const again: AgentOption = { label: "Start over", next: "start" };

export const agents: Agent[] = [
  {
    id: "support",
    title: "AI Customer Support Agent",
    icon: "chat",
    summary: "Answers common questions, captures leads and hands over to a person when needed.",
    features: ["Answers FAQs", "Handles customer queries", "Captures leads", "Escalates to a human"],
    channel: "Website chat",
    nodes: {
      start: {
        bot: ["Hi! I'm the support agent for a sample business. How can I help?"],
        options: [
          { label: "What are your hours?", next: "faq" },
          { label: "I have a problem with an order", next: "order" },
          { label: "I want a quote", next: "lead" },
          { label: "Talk to a person", next: "human" },
        ],
      },
      faq: {
        bot: ["In a real deployment I answer from your own FAQs and documents. For example: \"We're open Monday to Saturday, 9am to 6pm.\"", "Anything else?"],
        options: [
          { label: "I have a problem with an order", next: "order" },
          { label: "I want a quote", next: "lead" },
          { label: "Talk to a person", next: "human" },
        ],
      },
      order: {
        bot: ["Sorry about that. Could you tell me what went wrong?"],
        key: "issue",
        options: [
          { label: "Item arrived late", next: "orderDone" },
          { label: "Wrong or damaged item", next: "orderDone" },
          { label: "Refund question", next: "orderDone" },
        ],
      },
      orderDone: {
        bot: ["Thanks. I've noted: \"{{issue}}\". I'd share your order number, check the status in your system and reply with the next steps.", "If I can't solve it, I pass the whole conversation to your team so the customer never repeats themselves."],
        options: [{ label: "Escalate to a person", next: "human" }, again],
      },
      lead: {
        bot: ["Happy to help. What are you interested in?"],
        key: "interest",
        options: [
          { label: "A product", next: "leadDone" },
          { label: "A service", next: "leadDone" },
          { label: "A bulk order", next: "leadDone" },
        ],
      },
      leadDone: {
        bot: ["Great, I'd now ask for the visitor's name and phone or email, then send this lead to your team: \"Interested in: {{interest}}\"."],
        options: [again],
      },
      human: {
        bot: ["Handing over to a human agent with the full conversation attached. In a live setup this notifies your team on email or WhatsApp."],
        end: true,
        options: [again],
      },
    },
  },
  {
    id: "sales",
    title: "AI Sales Qualification Agent",
    icon: "growth",
    summary: "Asks the right questions, qualifies enquiries and prepares a clean summary for sales.",
    features: ["Asks customer requirements", "Qualifies leads", "Collects contact details", "Sends lead to sales"],
    channel: "Website chat",
    nodes: {
      start: {
        bot: ["Hi! Thinking about a new project? I'll ask a few quick questions so the right person can follow up."],
        options: [{ label: "Sure, let's start", next: "need" }],
      },
      need: {
        bot: ["What do you need?"],
        key: "need",
        options: [
          { label: "A business website", next: "budget" },
          { label: "AI / automation", next: "budget" },
          { label: "Custom software", next: "budget" },
          { label: "An online store", next: "budget" },
        ],
      },
      budget: {
        bot: ["Roughly what budget range are you considering?"],
        key: "budget",
        options: [
          { label: "Small", next: "timeline" },
          { label: "Medium", next: "timeline" },
          { label: "Large", next: "timeline" },
          { label: "Not sure yet", next: "timeline" },
        ],
      },
      timeline: {
        bot: ["And when would you like to start?"],
        key: "timeline",
        options: [
          { label: "Immediately", next: "summary" },
          { label: "In 1-3 months", next: "summary" },
          { label: "Just exploring", next: "summary" },
        ],
      },
      summary: {
        bot: ["Thanks! Here's the summary I'd send to your sales team:", "Need: {{need}}\nBudget: {{budget}}\nTiming: {{timeline}}\nStatus: ready for follow-up", "A real agent would also collect the visitor's name, phone and email at this step."],
        end: true,
        options: [again],
      },
    },
  },
  {
    id: "logistics",
    title: "WhatsApp Logistics Agent",
    icon: "logistics",
    summary: "Gives customers shipment status and delivery updates on WhatsApp, and helps dispatch.",
    features: ["Shipment status", "Delivery queries", "Customer notifications", "Dispatch assistance"],
    channel: "WhatsApp-style chat",
    nodes: {
      start: {
        bot: ["Hello! This is the delivery assistant (sample). What would you like to do?"],
        options: [
          { label: "Track my shipment", next: "track" },
          { label: "Change delivery time", next: "slot" },
          { label: "Talk to dispatch", next: "dispatch" },
        ],
      },
      track: {
        bot: ["Please send your tracking ID."],
        options: [{ label: "Use sample ID: DEMO-1042", next: "status" }],
      },
      status: {
        bot: ["Shipment DEMO-1042 (sample data)\nStatus: Out for delivery\nExpected: today, 4-6 PM", "Would you like updates on this chat?"],
        options: [
          { label: "Yes, notify me", next: "notify" },
          { label: "Change delivery time", next: "slot" },
        ],
      },
      notify: {
        bot: ["Done. You'll get a message when the driver is nearby and when the parcel is delivered. Real systems pull this from your tracking data."],
        options: [again],
      },
      slot: {
        bot: ["Which time suits you better?"],
        key: "slot",
        options: [
          { label: "Morning", next: "slotDone" },
          { label: "Afternoon", next: "slotDone" },
          { label: "Evening", next: "slotDone" },
        ],
      },
      slotDone: {
        bot: ["Request noted: {{slot}} delivery. The dispatch team is notified and you get a confirmation message."],
        options: [again],
      },
      dispatch: {
        bot: ["Connecting you to the dispatcher. For the team, the agent can also summarise open delivery issues and suggest which orders need attention first."],
        end: true,
        options: [again],
      },
    },
  },
  {
    id: "appointment",
    title: "AI Appointment Agent",
    icon: "clock",
    summary: "Collects what the customer needs and captures their preferred date and time.",
    features: ["Collects requirements", "Handles appointment requests", "Captures preferred date/time"],
    channel: "Website chat",
    nodes: {
      start: {
        bot: ["Hi! I can help you request an appointment (sample). What is it for?"],
        key: "type",
        options: [
          { label: "A consultation", next: "day" },
          { label: "A follow-up", next: "day" },
          { label: "A site visit", next: "day" },
        ],
      },
      day: {
        bot: ["Which day works best?"],
        key: "day",
        options: [
          { label: "Tomorrow", next: "time" },
          { label: "This week", next: "time" },
          { label: "Next week", next: "time" },
        ],
      },
      time: {
        bot: ["And what time of day?"],
        key: "time",
        options: [
          { label: "Morning", next: "done" },
          { label: "Afternoon", next: "done" },
          { label: "Evening", next: "done" },
        ],
      },
      done: {
        bot: ["Request captured:\nType: {{type}}\nDay: {{day}}\nTime: {{time}}", "A live version checks your calendar, confirms the slot and sends reminders to both sides."],
        end: true,
        options: [again],
      },
    },
  },
];
