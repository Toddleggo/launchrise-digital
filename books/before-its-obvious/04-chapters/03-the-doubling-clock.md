# Chapter 3
## The Doubling Clock

There's an old riddle about a pond.

A single lily pad appears on a pond. Every day, the number of lily pads doubles. After thirty days, the pond is completely covered.

On what day was the pond half covered?

Most people's gut says day fifteen. The answer is day twenty-nine.

And here's the part that matters: on day twenty-five, the pond was only about 3% covered. If you'd walked past that pond on day twenty-five, you'd have seen a few lily pads in the corner and thought, *nothing much going on here.*

Four days later, it's gone.

Our brains aren't built for doubling. We think in straight lines. Add a bit each year. The world mostly works that way, so our instincts do too. But some things don't add. They multiply. And when something multiplies, the early part looks boring, right up until it doesn't.

This chapter is about whether AI is one of those things.

---

### A stopwatch for machines

For a long time, the way people measured AI progress was with tests. Can it pass the bar exam? Can it solve maths olympiad problems? Can it score well on a medical licensing test?

Those tests matter, but they have a problem. They measure whether AI can *answer questions*, not whether it can *do work*. And they get "used up": once AI aces a test, the test stops telling you anything.

So in 2025, a small independent research group in California called METR came up with a different measuring stick. I think it's the single most useful number in this whole debate, so let me explain it carefully.

They took a large set of real tasks — mostly software and technical work, the kind of thing that people get paid to do. Then they timed skilled humans doing them. Some tasks took a person two minutes. Some took an hour. Some took a full working day or more.

Then they gave the same tasks to AI systems and asked: **how long a task, measured in human time, can the AI complete successfully about half the time?**

That's the "time horizon." Think of it as the size of a job you could hand to the AI and walk away from, with a coin-flip chance it's done when you come back.

Here's what they found when they lined up AI systems from 2019 onwards:

- In 2019, the best systems could reliably handle tasks that took a human a few *seconds*.
- By early 2023, a few *minutes*.
- By 2025, around an *hour* or so.
- By early 2026, METR's own estimates put the best models at *several hours* of human-expert work — though with very wide margins of error.

When they plotted that on a graph, it made a remarkably steady line. Over the whole period from 2019, the length of task AI could handle **doubled roughly every seven months.** In METR's January 2026 update, the doubling since 2024 looked even faster — closer to every three to four months.

By mid-2026, METR was saying something striking: their test was running out of road. The newest models were scoring near the top of what their task set could reliably measure — around sixteen hours of human work.

> **FORECAST LABEL: NOW** — The length of task AI can complete on its own (at ~50% success) has been doubling roughly every 4–7 months for several years, according to the leading independent measurement.

---

### What doubling feels like

Let's make that concrete.

Say an AI can do a one-hour task today. If the doubling continues at seven months:

- In 7 months: 2-hour tasks
- In 14 months: 4-hour tasks — half a working day
- In 21 months: 8-hour tasks — a full day
- In 28 months: 2-day tasks
- In 35 months: nearly a working week

Just under three years from "an hour" to "most of a week."

At the faster four-month pace, it's quicker than that.

Now, I want to be careful here, because this is exactly the kind of calculation that gets breathlessly shared online with "AND BY 2030 IT WILL DO A YEAR OF WORK IN A SECOND!!!" in capital letters.

Trends don't have to continue. Plenty of things that doubled for a while have stopped. The lily pond riddle has a finite pond.

So let's look hard at the caveats. Because they're real.

---

### The honest small print

**1. "Half the time" isn't "reliably."**
That time horizon is the length of task the AI completes successfully *about 50% of the time*. Would you hire someone who got the job done half the time? For a lot of real work — accounts, medicine, anything legal — you need it right almost every time. When METR measured at 80% success instead of 50%, the time horizons were much shorter. A system that can sometimes do a sixteen-hour task might only reliably do a three-hour one.

**2. It's mostly technical work.**
METR's tasks are mostly software and research-type tasks. AI tends to be strongest at exactly that kind of thing. It doesn't automatically follow that the same curve applies to managing a building site, calming an upset customer, or teaching a room of fourteen-year-olds.

**3. The margins are huge.**
METR themselves say their confidence intervals are "very wide." For one top model in early 2026, their best estimate was around five hours, but the plausible range stretched from under three hours to over twelve. They also noted that only a handful of their longest tasks had actually been timed with real humans. They're being honest about the limits of their ruler. I respect that.

**4. A test isn't a workplace.**
Doing a well-defined task in a clean test environment is different from doing it inside a real company with messy data, unclear instructions, office politics and a boss who changes their mind.

So the fair summary is:

> **Trust the trend. Distrust any single number.**

The exact figures are shaky. The direction is not. Every independent measurement I've seen points the same way: these systems are getting able to do longer, more complicated chunks of work on their own, and they're doing it fast.

The International AI Safety Report — a major review published in February 2026, led by the Turing Award-winning scientist Yoshua Bengio and written by over a hundred experts from more than thirty countries — reached a similar conclusion. Capabilities are advancing quickly, and faster than the rules meant to manage them.

---

### The Jagged Edge

Here's the second big idea in this chapter, and it's the one that will save you from embarrassing mistakes.

AI is not evenly good.

In 2023, researchers from Harvard Business School and elsewhere ran a proper experiment with 758 consultants from Boston Consulting Group — some of the most highly trained professionals in business. Half got access to GPT-4, one of the leading AI models of the time. Half didn't. Then they gave everyone realistic consulting tasks.

On tasks that the AI was good at, the consultants using it:

- completed about **12% more tasks**,
- finished about **25% faster**,
- and produced work rated roughly **40% higher in quality**.

That's a huge jump. For elite professionals.

But the researchers had slipped in a trick. One task was chosen specifically because it *looked* like something the AI would be good at, but actually needed careful judgement that the AI tended to get wrong.

On that task, consultants using AI were **19 percentage points less likely** to get the right answer than the ones working alone.

They trusted the machine. The machine was confidently wrong. And being smart and highly trained didn't save them.

The researchers called this the **"jagged technological frontier."** I call it the Jagged Edge. Picture a coastline instead of a straight wall. In some places, the AI's abilities stretch way out past what you'd expect. In others, right next door, they fall well short. And from the inside, you can't see where the coastline goes. The AI sounds exactly as confident on both sides of it.

> **The danger isn't that AI is stupid. The danger is that it's brilliant and stupid at the same time, and it doesn't tell you which one you're getting.**

This is exactly why the people who'll do best aren't the ones who use AI the most. They're the ones who know *where the edge is* in their own field — and check the work that falls near it.

That knowledge comes from experience. Which is one more reason experienced workers have an advantage, if they learn to use it.

---

### The perception trap

One more study, because it's one of my favourites and it's slightly uncomfortable.

In early 2025, METR ran another experiment. They took sixteen experienced software developers working on big, real, open-source projects they already knew inside out. For each task, a coin flip decided whether the developer could use AI tools or not.

Before starting, the developers predicted AI would make them about 24% faster.

Afterwards, they *believed* it had made them about 20% faster.

It had actually made them about **19% slower.**

METR has since said this result is "historical" — the tools have improved a lot since early 2025, and they've changed how they run these studies. So I'm not telling you AI slows people down. In many other studies, it clearly speeds them up.

I'm telling you something about *us*.

We are bad at judging whether AI is actually helping. It *feels* productive. The words appear so fast. It's so fluent. That feeling is not the same as the work being better or quicker.

So measure. Time yourself with and without. Check the output. Don't just trust the buzz.

---

### Where this leaves us

Let me pull the chapter together into something you can carry around.

**One:** The amount of work AI can do on its own is growing fast, and has been for years. The best measurement we have suggests it's doubling every several months.

**Two:** The exact numbers are uncertain, and the tests don't cover everything. But the direction is consistent across many different measurements.

**Three:** AI is jagged. Great at some things, bad at others, and it sounds equally sure of itself either way.

**Four:** Our own sense of whether it's helping is unreliable. Measure, don't assume.

And here's the thing that ties it back to the pond.

If you look at AI today and think "it's useful, but it can't do my job" — you might be completely right. *Today.* The question to ask isn't "can it do my job now?" It's: **"If the length of work it can handle keeps doubling a few more times, which parts of my job does it reach, and when?"**

That's not a scary question. It's a planning question. And planning questions have answers.

Part II is where we start answering it.

---

> ### DO THIS NOW
>
> **1. Find its edge in your world.** Give an AI one task from your job that you're *expert* at. Look for where it goes wrong. Write down exactly what it missed. That gap is part of your value. (15 minutes)
>
> **2. Time it.** Pick one small task you do regularly (an email, a quote, a summary). Do it once without AI and time yourself. Next time, do it with AI — including checking and fixing — and time that. Compare honestly. (Two tasks, this week)
>
> **3. Explain the pond.** Tell someone the lily-pad riddle tonight. Watch their face on "day twenty-nine." Then tell them about the Doubling Clock. Teaching something is the fastest way to own it. (5 minutes)

---

### Research Notes — Chapter 3

- **METR time horizon methodology and doubling** — Kwa, T., et al. (METR), *Measuring AI Ability to Complete Long Tasks*, 2025; and METR, *Time Horizon 1.1*, 29 January 2026 (overall doubling ~196 days/7 months; since 2024 ~89 days; Claude Opus 4.5 ~320 min [170–729], GPT-5 ~214 min; only 5 of 31 long tasks had human baselines; confidence intervals "still very wide"). metr.org/blog/2026-1-29-time-horizon-1-1/ — **NOW**
- **Measurements above ~16 hrs unreliable (May 2026)** — METR, *Task-Completion Time Horizons of Frontier AI Models*, metr.org/time-horizons/ (updated May 2026). — **NOW** ⚠️ confirm exact per-model figures on METR's graph at time of print
- **"Seconds in 2019 … minutes in 2023 … ~an hour in 2025"** — approximate reading of METR's published trend chart. ⚠️ confirm phrasing against chart
- **International AI Safety Report 2026** — Bengio, Y., et al., published 3 February 2026; 100+ authors, 30+ countries. internationalaisafetyreport.org — **NOW**
- **Jagged frontier experiment** — Dell'Acqua, F., McFowland, E., Mollick, E., et al., *Navigating the Jagged Technological Frontier*, Harvard Business School Working Paper 24-013 (2023); 758 BCG consultants; +12.2% tasks, +25.1% speed, +40% quality inside frontier; 19 percentage points less likely correct outside. — **NOW**
- **METR developer RCT** — Becker, J., et al. (METR), *Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity*, July 2025, arXiv:2507.09089; 16 devs, 246 tasks; expected +24%, perceived +20%, measured −19%. METR later labelled the result historical (Feb 2026). — **NOW**
- **Doubling arithmetic** — illustrative projection, not a forecast. **POSSIBLE**
- **Lily pad riddle** — traditional puzzle.
