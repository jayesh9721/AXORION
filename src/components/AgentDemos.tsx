"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { agents, type Agent } from "@/lib/agents";
import { Icon } from "./icons";

type Msg = { from: "bot" | "user"; text: string };

const fill = (text: string, answers: Record<string, string>) => text.replace(/\{\{(\w+)\}\}/g, (_, k) => answers[k] ?? "");
const opening = (agent: Agent): Msg[] => agent.nodes.start.bot.map((text) => ({ from: "bot", text }));

export default function AgentDemos() {
  const [agentId, setAgentId] = useState(agents[0].id);
  const agent = agents.find((a) => a.id === agentId)!;
  const [nodeId, setNodeId] = useState("start");
  const [msgs, setMsgs] = useState<Msg[]>(() => opening(agents[0]));
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [typing, setTyping] = useState(false);
  const list = useRef<HTMLDivElement>(null);
  const chat = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    // Scroll only the chat box, never the page.
    list.current?.scrollTo({ top: list.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  const node = agent.nodes[nodeId];

  function reset(a: Agent) {
    clearTimeout(timer.current);
    setAgentId(a.id);
    setNodeId("start");
    setMsgs(opening(a));
    setAnswers({});
    setTyping(false);
  }

  function pick(label: string, next: string) {
    if (typing) return;
    const nextAnswers = node.key ? { ...answers, [node.key]: label } : answers;
    if (next === "start") {
      reset(agent);
      return;
    }
    setAnswers(nextAnswers);
    setMsgs((m) => [...m, { from: "user", text: label }]);
    setTyping(true);
    timer.current = setTimeout(() => {
      const target = agent.nodes[next];
      setMsgs((m) => [...m, ...target.bot.map((t): Msg => ({ from: "bot", text: fill(t, nextAnswers) }))]);
      setNodeId(next);
      setTyping(false);
    }, 650);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1.05fr]">
      <div role="tablist" aria-label="AI agents" className="space-y-3">
        {agents.map((a) => {
          const active = a.id === agentId;
          return (
            <button
              key={a.id}
              role="tab"
              aria-selected={active}
              onClick={() => {
                reset(a);
                // On phones the chat sits below the list, so bring it into view.
                if (window.matchMedia("(max-width: 1023px)").matches) chat.current?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`card w-full p-4 text-left sm:p-5 ${active ? "!border-accent" : ""}`}
            >
              <span className="flex items-center gap-3">
                <span className="icon-box !h-10 !w-10 shrink-0"><Icon name={a.icon} size={20} /></span>
                <span className="flex-1 font-semibold leading-snug">{a.title}</span>
                <span className={`text-xs font-semibold ${active ? "text-accent2" : "text-muted"}`}>{active ? "Open" : "Try demo"}</span>
              </span>
              {active && (
                <span className="mt-3 block text-sm text-muted">
                  {a.summary}
                  <span className="mt-3 flex flex-wrap gap-1.5">
                    {a.features.map((f) => <span key={f} className="chip">{f}</span>)}
                  </span>
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div ref={chat} className="card flex h-[30rem] scroll-mt-20 sm:h-[34rem] flex-col overflow-hidden">
        <div className="flex items-center gap-3 border-b border-line bg-surface2 px-4 py-3">
          <span className="icon-box !h-9 !w-9"><Icon name={agent.icon} size={18} /></span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{agent.title}</p>
            <p className="text-xs text-muted">{agent.channel}</p>
          </div>
          <button onClick={() => reset(agent)} className="-mr-2 px-2 py-2.5 text-xs font-medium text-accent2 hover:underline">Restart</button>
        </div>
        <p className="border-b border-line bg-accent/10 px-4 py-1.5 text-center text-[11px] font-medium text-accent2">
          AXORION AI Demo – Illustrative Experience
        </p>

        <div ref={list} aria-live="polite" className="flex-1 space-y-2.5 overflow-y-auto p-4">
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
              <p className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${m.from === "user" ? "rounded-br-sm bg-accent text-onaccent" : "rounded-bl-sm border border-line bg-surface2"}`}>
                {m.text}
              </p>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start" aria-label="Agent is typing">
              <span className="flex gap-1 rounded-2xl rounded-bl-sm border border-line bg-surface2 px-4 py-3">
                {[0, 1, 2].map((d) => <span key={d} className="float h-1.5 w-1.5 rounded-full bg-muted" style={{ animationDelay: `${d * 0.15}s`, animationDuration: "1s" }} />)}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-2 border-t border-line p-3">
          {!typing && node.options && (
            <div className="flex flex-wrap gap-2">
              {node.options.map((o) => (
                <button key={o.label} onClick={() => pick(o.label, o.next)} className="rounded-full border border-accent/60 px-3.5 py-2 text-sm font-medium text-accent2 transition-colors hover:bg-accent hover:text-onaccent">
                  {o.label}
                </button>
              ))}
            </div>
          )}
          {node.end && !typing && (
            <Link href="/contact" className="flex min-h-10 items-center justify-center gap-1 text-xs font-semibold text-accent2 hover:underline">
              Want an agent like this for your business? Talk to AXORION <Icon name="arrow" size={14} />
            </Link>
          )}
          <p className="text-center text-[11px] text-muted">Simulated conversation. No AI model is called and nothing is stored.</p>
        </div>
      </div>
    </div>
  );
}
