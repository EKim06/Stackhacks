import * as React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ROUTE_BY_COMMAND = {
    projects: '/projects',
    about: '/about',
    eboard: '/eboard',
    events: '/events',
    contact: '/contact',
    contacts: '/contact',
    contances: '/contact',
}

export default function StackHacksTerminal() {
    const navigate = useNavigate()
    const [input, setInput] = useState('')
    const [history, setHistory] = useState([
    ])

    const openCommand = (cmd) => {
        const raw = cmd.trim()
        const command = raw.toLowerCase()

        if (command === 'clear') {
            setHistory([])
            return
        }

        const path = ROUTE_BY_COMMAND[command]
        if (path) {
            setHistory((prev) => [...prev, `> ${raw}`, `Opening ${path}...`])
            navigate(path)
            return
        }

        setHistory((prev) => [...prev, `> ${raw}`, 'Command not found'])
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && input.trim()) {
            openCommand(input)
            setInput('')
        }
    }

    return (
        <section className="w-full bg-background text-white px-6 py-24 border-t border-white/10">
            <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
                <div className="space-y-6 self-start">
                    <p className="text-sm uppsercase tacking-[0.25em] text-amber-400/80"> Hello </p>
                    <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                        Welcome to StackHacks <span className="text-amber-400"> throught the Terminal</span>
                    </h2>
                    <p className="text-lg text-white/65 max-w-wl leading-8">
                    This is the terminal for StackHacks. Here you can explore the projects and the team behind them.

                    <div className="mt-6 space-y-2 font-mono text-sm text-white/70">
                        <div className="text-amber-400">Available commands:</div>
                        <div>projects  - view all projects</div>
                        <div>about     - view about page</div>
                        <div>eboard    - view e-board page</div>
                        <div>events    - view events page</div>
                        <div>contact   - view contact page (contacts also works)</div>
                        <div>clear     - clear the terminal</div>
                    </div>
                    </p>

                    </div>

                    <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] shadow-2xl overflow-hidden">
                    <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 bg-white/[0.03]">
                        <div className="flex items-center gap-2">
                            <span className="h-3 w-3 rounded-full bg-white/20" />
                            <span className="h-3 w-3 rounded-full bg-white/15" />
                            <span className="h-3 w-3 rounded-full bg-white/10" />
                        </div>
                        <div className="text-sm text-white/45 font-mono"> StackHacks-Terminal </div>
                    </div>

                <div className="p-6 md:p-8 font-mono text-sm md:text-base leading-8 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.10),transparent_35%)]">
                    <div className="mb-4 text-amber-400"> visitor@StackHacks:~$ </div>
                    <div className="space-y-1 text-white/85">
                    {history.map((line, i) => (
                        <div key={i} className={line.startsWith('>') ? 'text-amber-400' : 'text-white/75'}>
                            {line || <span>&nbsp;</span>}
                        </div>
                    ))}

                    <div className="flex items-center gap-2 text-amber-400">
                        <span>&gt;</span>
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full bg-transparent outline-none text-white placeholder:text-white/30"
                            placeholder="type a command"
                            autoFocus
                        />
                    </div>
                    </div>
                </div>
            </div>
            </div>
        </section>
    )
}

