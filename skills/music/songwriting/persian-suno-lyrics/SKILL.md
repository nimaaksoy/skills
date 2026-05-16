---
name: Persian Suno Lyrics
description: Use when writing Persian / Farsi lyrics for Suno or another AI singer. Produces mistake-free, pronunciation-aware lyrics in any major Persian style — pop, rap, rock, traditional, fusion, electronic.
dependencies: []

category: music
subcategory: songwriting
tags: [persian, farsi, suno, lyrics, pronunciation, ai-vocals, songwriting]
author:
  name: Nima Aksoy
  url: https://nimaaksoy.com
  github: nimaaksoy
license: CC-BY-4.0
version: 0.5.0
created: 2026-05-16
updated: 2026-05-16
---

# Persian Suno Lyrics

## Overview

Write Persian lyrics that an AI singer pronounces correctly. Most failed Suno generations of Persian aren't about the model — they're about lyrics that have ambiguous orthography, mixed registers, hard consonant clusters on long notes, melisma placed on the wrong vowel, or chorus rhymes that look right on the page but don't rhyme by mouth. This skill produces lyrics that avoid those failures across any major Persian style.

Pairs with the **Suno Persian Songwriter** skill, which handles the surrounding production brief (Style prompt, vocal direction, negative prompt, sliders). This one handles the lyrics themselves.

## When to use this skill

- The user wants Persian / Farsi lyrics specifically for Suno or another AI singer.
- The user names a style (pop, rap, rock, traditional, fusion, ballad, electronic, alternative, minimal).
- The user complains about previous Suno generations mispronouncing, swallowing words, or sounding "robotic / drunk / wrong-stressed" in Persian.
- The user wants the same lyric written across two or more styles for comparison.

Do **not** use when:

- The user wants a Persian poem to read, not sing — use *Persian Poetry Composer*.
- The user wants the full Suno production brief (Style + negatives + sliders) — use *Suno Persian Songwriter* instead, or run them in sequence.
- The lyrics are non-Persian — use a language-specific skill.

## Instructions

Work in this order. Steps 1–4 are the AI-pronunciation fixes most contributors skip.

### 0. Never ask questions — decide everything from the brief

This skill is **non-interactive** and **complete** — one prompt in, one full Suno-ready brief out. Don't ask the user about style, register, length, hook word, vazn, vocal gender, BPM, Suno style prompt, negative prompt, or slider settings. Infer everything from the brief and ship the full package.

If the brief is short or vague, apply this **defaults table** silently:

| Parameter           | Default when not specified                                                  |
|---------------------|------------------------------------------------------------------------------|
| Style               | Modern Persian pop                                                            |
| Register            | Colloquial                                                                    |
| Length              | 2 verses + pre-chorus + chorus + bridge + final chorus (~ 24–32 lines total) |
| Chorus length       | 4 lines, 7–9 syllables each                                                  |
| Hook word           | One of: هنوز · بیا · تو · چراغ · دل · رو — pick the one closest to the situation |
| Vocal gender        | Male (unless theme/voice in brief implies otherwise)                          |
| BPM                 | 85 for ballad, 95 for pop, 110 for rock, 140 for rap, 105 for electronic     |
| Vazn / pulse        | Free pulse with consistent line length per section                            |
| Melisma             | None for pop/rap/rock/electronic; 1–2 phrase-end melisma for traditional/ballad |
| Theme               | Lift the strongest noun/emotion from the brief; if none, build a specific situation around شب + پنجره + روشن/خاموش |
| Section tags        | English `[Verse]` `[Pre-Chorus]` `[Chorus]` `[Bridge]` `[Outro]`              |
| Style prompt        | Generate from inferred style + the artist reference if the brief named one    |
| Negative prompt     | Always include — block the genres/sounds the inferred style isn't             |
| Sliders             | Weirdness 25%, Style Influence 80%, Audio Influence 25% (tune per style)      |
| Model               | Suno v4.5+ assumed                                                            |

If the user names *any* of these, the user's choice overrides the default. Otherwise pick the default and ship.

The only exception to no-questions: if the brief contradicts itself (e.g. *"traditional ghazal rap with 4-syllable lines"*), make the highest-priority interpretation work and note the compromise in **یادداشت‌های اجرایی** — still don't ask.

### 1. Lock the register before you write

Pick **one** register and hold it the whole song. The single biggest cause of robotic Suno-Persian output is mid-song register drift.

| Register      | Marker forms                                                | Use for                                       |
|---------------|-------------------------------------------------------------|-----------------------------------------------|
| Formal (رسمی) | میروم، نمیتوانم، این، آنها، خانه                           | Traditional, ballad, sacred, cinematic        |
| Semi-formal   | میرم، نمیتونم، این، اونا، خونه (with classical syntax)    | Romantic ballad, fusion, alternative          |
| Colloquial    | میرم، نمیتونم، این، اونا، خونه (with spoken syntax)       | Pop, rap, rock, electronic, modern lyric     |

Mixing «میروم» and «میرم» in the same song is the #1 mistake. Pick one and convert every verb form.

### 2. Pick the style and check its prosody contract

Open `resources/styles.md`. Each style has a "prosody contract" — line length, syllable density, melisma policy, consonant-cluster tolerance, register default. Match it. Trying to write a Hafez-formal line for a trap beat will fail at the AI's mouth.

### 3. Lock the content — required, visible, before any lyric

Pronunciation-perfect lyrics with nonsense content are still nonsense. **Before drafting**, fill in the **Content Brief** below. This brief must appear at the top of the **یادداشت‌های اجرایی** block in the final delivery — not in scratch, in the output. Forcing it visible is what stops the model from "agreeing" with the discipline and then ignoring it.

```
Content Brief
─────────────
• Emotional axis: <one word — longing / regret / defiance / peace / hope / grief / anger / gratitude / doubt / acceptance>
• Concrete situation: <one sentence naming a specific moment, with at least one tangible object>
• Narrative arc: <one sentence — what changes from verse 1 to the final chorus>
• Perspective: <speaker = …, addressee «تو» = …, time = …, setting = …>
• Paraphrase (one specific sentence describing this song, not "love and loneliness"): <…>
• Three concrete anchors (specific nouns or actions that will appear in the lyric): <…, …, …>
• Cliché budget: 0–1 phrase from the cliché list, named here if used: <…>
```

If you can't fill any field with a specific answer, your content has failed before drafting. Re-think it before writing a single line.

#### Specificity quotas (hard rules)

These are not preferences. The lyric must hit all four before delivery:

- **At least 3 of the 8 chorus lines** must contain a concrete object or specific action from the *Content Brief's* anchors. Pure emotion words (دل، عشق، تنها، شب) don't count as anchors.
- **At least 1 verse line per verse** must name a tangible object from the situation (a cup, a key, a door, a photograph, a coat, a chair, a number, a date, a street, a phone). Generic body parts (دل، چشم، قلب) don't count.
- **Maximum 1 cliché phrase per song** from the Persian cliché list (see `resources/content-discipline.md`). Name it in the Content Brief's "Cliché budget" line.
- **No two consecutive lines** may share more than one of these generic nouns: شب، دل، عشق، تنها، یاد، گریه، آسمون، باران، ستاره، قلب. If both line 1 and line 2 use «دل» and «شب», rewrite one.

Then, while drafting:

- **Replace every abstract noun with a concrete object** when you can. «دلتنگی» → «صندلیِ خالیِ تو». «خاطره» → «بوی پیراهنت».
- **Replace «همه چی», «هیچی», «یه جوری», «همه جا»** — these are placeholders, not lyrics.
- **Show actions, don't name emotions.** Instead of «گریه کردم», use «لیوان از دستم افتاد». Instead of «دوستت دارم», use «هنوز پنجره رو به سمت تو باز می‌ذارم».
- **Pick a single metaphor system per song.** Don't mix water + fire + flight + ruins in the same verse. Pick one register of imagery and stay in it.
- **Check pronoun continuity.** If verse 1's «تو» is the lover, verse 2's «تو» can't suddenly be the city — without a marked turn.
- **Check time continuity.** Past → present → future is fine; random time jumps are not.

Common nonsense patterns to catch and rewrite (see `resources/content-discipline.md`):

| Pattern                                              | Why it's nonsense                                          |
|------------------------------------------------------|------------------------------------------------------------|
| Empty rhyme chain: «درد / سرد / مرد / فرد»          | Words rhyme, but no narrative connects them                |
| Mixed metaphor: «چشم ماه درِ سکوت قلبم رو باز کرد» | Three metaphor systems in one line; reader can't picture it |
| Generic palette: شب + باران + قلب + عشق + تنها      | These words can build any song or no song. Replace with specifics |
| Cliché stack: شب تاریک، قلب شکسته، اشک بی‌رحم      | Each phrase is already a song title. The sum is wallpaper  |
| Contradiction without a turn: «هیچوقت فراموش نمی‌کنم» + «دارم فراموش می‌کنم» in the same verse | Pick one or mark the turn with [Bridge] |
| Subject-predicate mismatch: «صدای دستِ بادِ خاطره» | Each word is fine; the chain says nothing                  |

**The paraphrase test.** Before delivery, paraphrase the song in one sentence. If you can't — or the paraphrase is just "it's about love and loneliness" — the content failed. Rewrite the verses to make a specific paraphrase possible.

### 4. Write for the mouth, not the eye

While drafting, read each line aloud. Flag and rewrite:

- **Hard consonant clusters on long notes** — «عشق», «سخت», «صبر» are hard for AI vocalists to attack. Either give them a short note, or pre-pad with a vowel («این عشق» beats «عشق» on a sustained note).
- **Long ezafe chains** — «در کوچه‌های خیسِ شبِ بارانیِ دیر» is mouth-killing. Cap at two ezafes per line.
- **Visual rhymes that aren't aural** — «خوب / گم» look paired but don't rhyme. Always rhyme by ear.
- **Ambiguous orthography** — «مردم» (people / I died) and similar bivalent words should be disambiguated by surrounding context, or replaced.

### 5. Map syllables and stress before delivery

For every chorus line, mark syllable count and stress. The chorus carries memorability; a misstressed chorus poisons the whole song.

```
to    | ha-NUZ | tu-ye | ZEH-nam | RÂH | mi-RI
1     |   2    |   2   |    2    |  1  |   2     = 10 syllables
```

Stresses fall on closed long-vowel syllables and the last syllable of nouns/adjectives. See `resources/pronunciation.md` for the full rules.

### 6. Place melisma intentionally (or not at all)

- **Pop / Rap / Rock / Electronic** — minimal or no melisma. AI-pop vocals sound best when each syllable hits a single note.
- **Traditional / Fusion / Cinematic ballad** — one or two melisma points per phrase, placed on **open vowels** (â / i / u) at phrase ends. Mark them in the lyrics with `~~` or `[hold]`.
- **Never melisma on closed syllables or consonant clusters.** «جان~~» works; «عشق~~» does not.

### 7. Build the chorus to lock in memory

A Suno chorus that doesn't earworm is a wasted song. Three rules:

- **Sustained-vowel hook word** at the start or end of each chorus line. Prefer: بیا، هنوز، تو، چراغ، دل، رو، آرام.
- **Same syllable count** across chorus lines (or a strict 2-pattern: 8/6/8/6).
- **Identical rhyme phoneme** — by ear, not by spelling.

### 8. AI-clean the final pass

Run `resources/ai-singer-rules.md` checklist before delivery. Common rewrites:

| Problem                          | Fix                                       |
|----------------------------------|-------------------------------------------|
| "تو همیشه میای ولی میری همیشه"   | "تو میای، تو میری، هر دفعه تو میای"      |
| Long line in colloquial register | Break into 2 short lines or 1 medium     |
| Closed-syllable melisma          | Move melisma to nearest open vowel       |
| Mixed «می‌خوام» and «می‌خواهم»    | Pick one; convert every instance         |
| Visual-only rhyme                | Rhyme by spoken phoneme                  |

### 8.5. Self-critique BEFORE delivery — count and rewrite

This is the step that v0.4 left implicit and the model kept skipping. Don't skip it again. **Run the count, write the numbers into the Specificity check block, and rewrite anything that fails.**

Walk this list explicitly. If any check fails, rewrite the offending lines and re-run the count. Only deliver after every check passes.

1. **Count concrete anchors in the chorus.** Look at the 4 chorus lines × however many repeats. How many lines contain a concrete object/action from the Content Brief's three anchors? Target: at least 3 of 8 lines (a chorus sung twice). If fewer, rewrite chorus lines to insert anchors.

2. **Count tangible objects per verse.** For each verse, list the tangible nouns used (cup, key, door, photograph, calendar, chair, phone, coat, etc.). If a verse has zero tangibles, rewrite at least one line of that verse to include one.

3. **Count clichés.** Walk the Persian cliché list in `resources/content-discipline.md`. How many appear in the song? Target: 0–1. If more, rewrite.

4. **Generic-noun adjacency check.** Walk every adjacent line pair. Do any two consecutive lines share more than one of: شب، دل، عشق، تنها، یاد، گریه، آسمون، باران، ستاره، قلب? If yes, rewrite one of the two lines.

5. **Proper-name check.** Are any Persian proper names in the lyric? (نازلی، سارا، لیلا، رضا، etc.) For each, confirm at least one of the proper-name fixes from `resources/pronunciation.md` is applied: quotation marks, possessive form, full-clause anchoring, hyphenated stress in the Abjad, or Latin parenthetical. List which fix you used.

6. **Paraphrase test.** Write the song's paraphrase in one specific sentence. If the paraphrase is "love and loneliness" or "a person feeling sad", the content failed. Rewrite verses to make a specific paraphrase possible.

7. **Read-aloud sing test.** Read the chorus aloud at the target BPM. Any line that's too fast / too slow / unsingable gets rewritten. Especially watch the proper-name lines.

The output of this step is the populated **Specificity check** block in Performance notes — with actual numbers, not "yes" / "passed". Showing the numbers is what stops the model from claiming compliance without delivering it.

### 9. Always include a colloquial Abjad / phonetic transliteration

The lyric must ship with a parallel **colloquial phonetic transliteration** (ابجد عامیانه) so an AI singer — or any non-Persian-reading collaborator — pronounces it exactly as a native speaker would. This block is **not optional**. It is the single most reliable fix for Suno mispronunciation.

Rules for the transliteration block:

- **Spell what the singer should actually say**, not what's written on the page. Always colloquial pronunciation, even when the Persian-script lyric is semi-formal.
  - `می‌روم` → `miram`, never `miravam`
  - `خانه` → `khune`, never `khâne`
  - `این را` → `ino`, not `in râ`
  - `می‌خواهم` → `mikhâm`, not `mikhâham`
- **Use the simple Latin system**: `â=آ, a=ـَ, e=ـِ, o=ـُ, i=ای/ی, u=او/و, kh=خ, sh=ش, ch=چ, gh=غ/ق, zh=ژ, '=ع/ء (only when audible)`.
- **Mark stress** with CAPITAL letters on the stressed syllable: `to ha-NUZ tu-ye ZEH-nam RÂH mi-RI`.
- **Mark sustained / held vowels** with `~`: `jâ~n`, `biâ~`.
- **Mark intonation at line ends only when it changes the meaning**:
  - `↑` for rising intonation (questions, suspended thoughts)
  - `↓` for falling intonation (statements, finals)
  - Default unmarked = neutral.
- **Punctuate aggressively for breath and rhythm**:
  - `,` for short pause (~ ¼ beat)
  - `.` for full stop (~ ½ beat)
  - `...` for sustained pause (~ 1 beat)
  - `—` for an in-line break that isn't a stop
- **Show colloquial contractions explicitly**:
  - `ye` for یک in colloquial
  - `to` for تو (never `too` or `tow`)
  - `mikhâm` for می‌خوام
  - `nemikhâm` for نمی‌خوام
  - `chîe` for چیه (= چی است)
  - `âre` for آره
  - `dige` for دیگه
- **Use a hyphen between bound morphemes** so the singer doesn't slur them: `kheylî-am` (= خیلیم), `khune-mun` (= خونه‌مون).
- **No double-letter artefacts**: `to`, never `too`. `do`, never `doo`.

See `resources/colloquial-transliteration.md` for the full system, edge cases, and a worked alphabet.

### 10. Deliver

Suno has **one** Lyrics field — you can't paste two versions. The output is a full Suno-ready brief with each block labelled by where it goes, and a one-line caption telling the user what the block is for. **The captions are not optional** — the user often doesn't know what a Negative Prompt is.

Use this template literally. Caption format: italicised one-liner under each header.

```
🎵 Suno → Style of Music
> Paste this into Suno's "Style of Music" field. Describes genre,
> instruments, vocal character, tempo and mood. ~280 chars.

<the comma-separated style prompt, starts with `Persian ` or `Farsi `>

🎵 Suno → Lyrics (PASTE THIS — Persian script)
> This is the lyric. Paste only this block into Suno's Lyrics field.

<the Persian-script lyric with [Verse] / [Chorus] / etc. tags>

🎵 Suno → Negative Prompt
> Paste this into Suno's "Negative Prompt" (under More Options).
> Tells Suno which genres/sounds NOT to drift into. Optional but
> strongly recommended — without it, Suno can drift into commercial
> pop, EDM, or other unrelated styles.

<comma-separated negatives, one per line>

🎵 Suno → Sliders
> Set these in Suno's Advanced Mode.
> • Weirdness — how experimental Suno gets (lower = more conventional)
> • Style Influence — how strictly Suno follows your Style prompt
> • Audio Influence — only matters if you reference an audio file
> • BPM — guides tempo
> • Model — Suno v4.5+ recommended for Persian

- Weirdness: <n>%
- Style Influence: <n>%
- Audio Influence: <n>%
- BPM: <n>
- Model: Suno v4.5+

🔍 Pronunciation reference (ابجد عامیانه — DO NOT PASTE INTO SUNO)
> For your eyes only. Use this to spot-check whether Suno sang the
> Persian script correctly — match the stressed syllables (CAPITALS)
> and intonation marks (↑ ↓) against the generated audio.

<the colloquial Latin transliteration with stress / intonation / pauses>

یادداشت‌های اجرایی (Performance notes)

Content Brief
─────────────
• Emotional axis: <one word>
• Concrete situation: <one specific sentence>
• Narrative arc: <one sentence>
• Perspective: <speaker / addressee / time / setting>
• Paraphrase: <one specific sentence>
• Three concrete anchors: <…, …, …>
• Cliché budget: <0 or 1, named if used>

Specificity check (run this BEFORE delivery — see Step 8.5)
• Concrete anchors in chorus: <N> of 8 lines (target ≥ 3)
• Tangible objects in verses: verse 1 = <object>, verse 2 = <object>
• Cliché count: <0 or 1>
• Generic-noun adjacency check: <pass / which line failed>
• Proper-name handling: <names + the fix applied per resources/pronunciation.md>

Performance notes
• Register: <…>
• Chorus syllable target: <n>
• Stress map (chorus): <…>
• Hook word: <…>
• Melisma points: <…>
• Intonation pattern: <…>
• Compromises (if any): <…>
```

Don't hand off to another skill. This skill produces the complete Suno-ready brief on its own.

## Examples

### Example 1 — pop, single style, single language

**Input:**

> "یه ترانه پاپ بنویس، خونه، شب، تنهایی. کرس باید catchy باشه."

**Expected behaviour:**

No questions. Infer: pop → colloquial register; situation = a person whose lover left and who keeps the kitchen light on; hook = چراغ (specific object, tangible, sustained vowel); chorus 8 syllables; full Suno-ready brief.

**🎵 Suno → Style of Music**

```
Persian pop, modern Tehran indie-pop, light electric guitar, soft piano,
warm pad, subtle hi-hat, mid-tempo 92 BPM, intimate male vocal, breathy
delivery, melancholic but hopeful, late-night home atmosphere, minimal
production, sparse arrangement, no auto-tune, natural Persian phrasing
```

**🎵 Suno → Lyrics (PASTE THIS — Persian script)**

```
[Verse 1]
چراغِ آشپزخونه روشنه
لیوانِ قهوه‌ام هنوز سرد
صدای در میاد و نیستی
دفتر هنوز رو میز، باز

[Pre-Chorus]
کلیدِ من، کلیدِ تو
هر دو سرِ یه جا کنار

[Chorus]
چراغ روشنه، می‌مونه روشن
چراغ روشنه، تا تو برگردی
نه این که فکر کنی برمی‌گردی
این چراغ، برای منه که می‌مونم

[Verse 2]
عکسِ تو رو یخچال هنوز
شب‌ها به همون عکس میگم: شب بخیر
تقویمو نگاه نمی‌کنم
چون روزشمار، فقط درد می‌ساد

[Bridge]
شاید برنگردی، می‌دونم
این چراغ، دیگه برای تو نیست
این چراغ، اعترافِ منه
به اینکه هنوز یه نفر اینجاست

[Final Chorus]
چراغ روشنه، می‌مونه روشن
چراغ روشنه، تا یه روز بفهمم
نه این که فکر کنی برمی‌گردی
این چراغ، برای منه که موندم

[Outro]
چراغ... روشن...
```

**🎵 Suno → Negative Prompt**

```
festival EDM, big-room synth, sidechain pumping, generic ballad cliché,
overproduced strings, aggressive autotune, trap hi-hats, cheap reverb,
random genre switching, traditional santur, classical Persian instruments,
shouted chorus
```

**🎵 Suno → Sliders**

- Weirdness: 25%
- Style Influence: 80%
- Audio Influence: 25%
- BPM: 92
- Model: Suno v4.5+

**🔍 Pronunciation reference (ابجد عامیانه — DO NOT PASTE INTO SUNO)**

```
[Verse 1]
che-RÂGH-e âsh-paz-KHU-ne ro-shan-E,
li-vâ-NE gah-VE-am ha-NUZ SARD↓
se-DÂ-ye DAR mi-Â-do NIS-ti,
DAF-tar ha-NUZ ru MIZ, BÂZ↓

[Pre-Chorus]
ke-LI-de MAN, ke-LI-de TO,
har-do sa-re ye JÂ ke-NÂR↑

[Chorus]
che-RÂGH ro-shan-E, MI-mu-ne RO-shan↑
che-RÂGH ro-shan-E, tâ to bar-GAR-di↑
NA in-ke FEKR ko-ni bar-MI-gar-di,
in che-RÂGH, ba-RÂ-ye ma-NE ke MI-mu-nam↓
```

**یادداشت‌های اجرایی**

**Content Brief**

- **Emotional axis**: acceptance.
- **Concrete situation**: the speaker keeps the kitchen light on every night for someone they know isn't coming back; the bridge is them naming this to themselves.
- **Narrative arc**: deflation → acceptance. Verse 1 sets the still-life. Verse 2 deepens the routine. Bridge admits the light isn't for the lover anymore. Final chorus keeps the light on anyway.
- **Perspective**: speaker = first person; addressee «تو» = the lover who left; time = present, looking forward; setting = kitchen at night.
- **Paraphrase**: a person keeps the kitchen light on every night for someone who isn't coming back, and the bridge is them realising the light is for themselves.
- **Three concrete anchors**: چراغ آشپزخونه, لیوان قهوه, تقویم.
- **Cliché budget**: 0 used.

**Performance notes**

- Register: colloquial throughout.
- Chorus: each line 8–9 syllables; hook = چراغ (sustained `â`).
- Stress map for chorus: `che-RÂGH ro-shan-E, MI-mu-ne RO-shan`.
- No melisma in verses; 1-beat hold on the second `che-RÂGH` of every chorus line is optional.
- Intonation: chorus lines 1–2 rise (suspension); line 4 falls (resolution).
- Specificity check: 3 concrete anchors used (چراغ آشپزخونه, لیوان قهوه, تقویم). Cliché count: 0.

### Example 2 — same idea, written in three styles

**Input:**

> "همین ایده رو در سه سبک بنویس: پاپ، رپ، سنتی."

**Expected behaviour:**

Produce three short lyric blocks. Same theme, different prosody contract per style. Per `resources/styles.md`:

**پاپ (colloquial, 8-syllable chorus, hook word هنوز)** — as Example 1 above.

**رپ (colloquial, 12–14 syllable lines, internal rhyme, no melisma)**

```
[Verse]
چراغ روشن، خونه ساکت، تو رفتی، شب پُر بادِ
صدای در، صدای خود، صدای یاد، صدای دادِ
نشستم رو لبه‌ی همون مبل که با تو بود
الان فقط یه فنجون، یه عکس، یه قلبِ سرد

[Hook]
رفتی و من موندم
موندم و شب موندم
شب موند و من موندم
موندم و دل دودم
```

**سنتی (formal, open vowels, melisma-friendly endings)**

```
[Verse]
چراغ خانه را روشن نمودم
ولی جز خویش، یاری دیگرم نیست~~
صدای دیگران در کوچه‌ها رفت
صدای تو ولی، در سینه‌ام نیست~~

[Refrain]
بیا یار من~~
بیا، آرامِ جان~~
این شب گذشته است و
دل بی تو ز جان~~
```

**ابجد عامیانه (همه‌ی سه سبک)**

```
# پاپ — see Example 1.

# رپ
[Verse]
che-RÂGH RO-shan, KHU-ne SÂ-ket, to RAF-ti, SHAB por-e BÂD,
se-DÂ-ye DAR, se-DÂ-ye KHOD, se-DÂ-ye YÂD, se-DÂ-ye DÂD.
ne-shas-TAM ru la-BE-ye ha-MUN MOB-le ke bâ to BUD —
al-ÂN fa-GHAT ye fen-JUN, ye AKS, ye ghal-be SARD↓

[Hook]
RAF-ti o man MUN-dam,
MUN-dam o SHAB MUN-dam,
SHAB MUN-do man MUN-dam,
MUN-dam o DEL DU-dam↓

# سنتی (formal register — keep classical pronunciations on the singable axis)
[Verse]
che-RÂGH-e KHÂ-ne râ ro-SHAN na-mu-DAM,
va-LI joz KHISH, yâ-ri di-ga-RAM NIS~T↑
se-DÂ-ye di-ga-RÂN dar ku-che-HÂ RAFT,
se-DÂ-ye TO va-LI, dar si-ne-AM NIS~T↓

[Refrain]
bi-Â YÂ-re MAN~,
bi-Â, â-RÂ-me JÂ~N,
in SHAB go-zash-TAS-to
del bi to ze JÂ~N↓
```

**یادداشت‌های اجرایی (مشترک)**

Each version sticks to one register; chorus syllable count is consistent within each version; melisma only on سنتی, only on open vowels at phrase ends; hook words: pop=هنوز, rap=موندم, traditional=بیا.

### Example 3 — fixing a user's existing lyric

**Input:**

> "این lyric رو دارم ولی Suno خرابش میکنه: «من می‌روم تو باز توو خونه میمونی…»"

**Expected behaviour:**

Diagnose the failures, then rewrite.

**Diagnosis (یادداشت)**

- Register drift: «می‌روم» (formal) + «توو» (colloquial) in the same line. Suno can't resolve which voice to sing in.
- «توو» is non-standard orthography; some Suno checkpoints read it literally as /tuv/ instead of /tu/.
- Long ezafe chain risk if continued.

**نسخه‌ی پیشنهادی (colloquial, fixed)**

```
من می‌رم، تو باز تو خونه می‌مونی
صدای پامو می‌بری، می‌خونی
این کوچه‌ها همیشه با تو بودن
الان فقط با ردِّ پای تو هستن
```

**ابجد عامیانه**

```
man mi-RAM, to BÂZ tu KHU-ne mi-MU-ni↑
se-DÂ-ye PÂ-mo mi-BA-ri, mi-KHU-ni↓
in ku-che-HÂ ha-mi-SHE bâ to BU-dan,
al-ÂN fa-GHAT bâ rad-de PÂ-ye to HAS-tan↓
```

Or (formal, fixed):

```
من می‌روم، تو باز در خانه خواهی ماند
صدای گام مرا با خود تو خواهی خواند
این کوچه‌ها همه با تو همیشه بودند
اکنون به جز رد پای تو، نشانی نماند
```

**ابجد آکادمیک (for the formal version)**

```
man mi-RA-vam, to BÂZ dar KHÂ-ne kho-Â-hi MÂND↑
se-DÂ-ye GÂM-e ma-RÂ bâ KHOD to kho-Â-hi KHÂND↓
in ku-che-HÂ ha-ME bâ to ha-mi-SHE BU-dand,
ak-NUN be JOZ rad-de PÂ-ye TO, ne-shâ-ni na-MÂND↓
```

Default to the colloquial fixed version. Ship both only when the user's brief explicitly hinted at a formal voice (e.g. mentioned «خانه», «می‌روم», «سنتی», «تصنیف»). Don't ask which one they want — pick the one that better matches the brief and note the choice in **یادداشت‌های اجرایی**.

## Resources

- `resources/styles.md` — per-style prosody contract: line length, syllable density, melisma policy, consonant-cluster tolerance, register default. Covers pop, rap, rock, traditional, fusion, electronic, alternative, minimal-poetic, cinematic ballad, regional/folk.
- `resources/pronunciation.md` — Persian stress, vowel, syllable, ezafe, and clitic rules a lyric must respect to be sung correctly. Includes the AI-safe melisma rule and the literary→singable conversion table.
- `resources/colloquial-transliteration.md` — the full ابجد عامیانه system: letter map, colloquial conversions, stress / intonation / pause marks, hyphen rule, common contractions, what NOT to do.
- `resources/content-discipline.md` — keeps the *meaning* of the lyric honest: the four locks (axis / situation / arc / perspective), abstract→concrete replacement, show-don't-tell, single-metaphor rule, the seven nonsense patterns, the paraphrase test, Persian-specific cliché list.
- `resources/ai-singer-rules.md` — Suno-specific cleanup checklist: orthography normalisation, register lock, hard-cluster handling, hook engineering, chorus-rhyme verification.
- `resources/templates-by-style.md` — starter line patterns per major style (verse openings, chorus hooks, common syllable templates).
- `resources/checklist.md` — pre-delivery checklist; run before sending the lyric back.

## Notes & limitations

- **No questions, no handoffs.** This skill is non-interactive *and* complete — one prompt in, one full Suno-ready brief out (Style + Lyrics + Negative + Sliders). Never reply with a clarifying question. Never tell the user to "use another skill for the Style prompt".
- **Suno has ONE Lyrics field.** Only the Persian-script block goes in. The ابجد block is a pronunciation reference for the human — never paste it into Suno; Suno reads romanised Persian worse than Persian script.
- **Pronunciation-perfect ≠ song-worthy.** The most common quality failure is a lyric that scans, rhymes, and sings cleanly but means nothing. The Content Brief at the top of Performance notes is mandatory because writing the locks visibly is what prevents the model from "agreeing" with the discipline and ignoring it. If you can't paraphrase the song in one specific sentence, the content failed — rewrite.
- **The specificity quotas are hard rules.** At least 3 of 8 chorus lines must contain a concrete anchor; at least 1 line per verse must name a tangible object; max 1 cliché phrase per song; no two consecutive lines may share more than one generic noun. If the draft fails any quota, rewrite before delivery.
- **Persian proper names mispronounce by default.** Suno tends to insert a phantom ezafe inside names — نازلی → `nâz-EH-li`. Always apply one of the proper-name fixes from `resources/pronunciation.md` (quotation marks, possessive form, full-clause anchoring, or Latin parenthetical). List the fix used in the Specificity check.
- **The Self-critique pass (Step 8.5) must run with numbers, not "yes".** Writing the actual counts in the Specificity check block is what enforces the discipline. Saying "all checks passed" without numbers means the model skipped the work.
- **Every output block needs a caption.** Users may not know what a Negative Prompt is or where Sliders live. The italic one-liner under each header in the delivery template is required, not decorative.
- **Suno is non-deterministic.** Even a clean lyric can produce one bad take. Re-roll 2–4 times and pick.
- **Some Persian sounds remain hard for AI singers** even with clean lyrics: «ع», «ح», «ق», long-held «خ». Keep these off long sustained notes.
- **Regional dialects (Khorasani, Lori, Kurdish, Bandari)** are out of scope for the AI-correctness focus. Write the معیار version first, then optionally dialect-tag in **Performance notes**.
- **This skill stops at the lyric.** For Style prompt, vocal direction, negative prompt, and sliders, hand off to *Suno Persian Songwriter*.
- **Don't melisma over consonant clusters.** Worth saying twice — it's the failure mode that ruins the most "almost perfect" Suno generations.
- **Chorus rhyme must be aural.** A rhyme that only works on the page will sing wrong. Always read aloud before delivery.
- **Stretched-vowel emphasis (`خووووب`, `بمووون`) is Persian-script only.** In the ابجد block always use `~` or `~~`, never doubled Latin vowels — Suno reads them literally.

## Changelog

- `0.5.0` — three more fixes after second live test (the «نازلی» / `nâz-EH-li` test). (1) New section in `pronunciation.md` on Persian proper names — Suno's phantom-ezafe insertion problem, with five fix techniques (quotation marks, possessive form, full-clause anchoring, hyphenated Abjad stress, Latin parenthetical) and a list of highest-risk names. (2) New Step 8.5 "Self-critique BEFORE delivery — count and rewrite" — the missing enforcement step that forced the model to *visibly* count anchors, tangibles, clichés, adjacency violations, and proper-name fixes before delivery. Numbers go into the Specificity check block in Performance notes; "passed" without numbers means the work was skipped. (3) Delivery template now requires an italic one-line caption under every Suno block (Style / Lyrics / Negative Prompt / Sliders) explaining what it is and where it goes in Suno's UI — addresses the "I don't know what Negative Prompt is or how to use it" gap.
- `0.4.0` — three real-use fixes after live testing: (1) the Content Brief is now a *visible required block* in the output, with specificity quotas (3 of 8 chorus lines must have concrete anchors, 1 tangible object per verse, max 1 cliché per song, no two consecutive lines sharing >1 generic noun); (2) the delivery is now a full Suno-ready brief — Style + Lyrics + Negative + Sliders blocks, each labelled with emoji prefix pointing to its Suno field; no more "hand off to another skill"; (3) the Abjad block is explicitly renamed "Pronunciation reference (DO NOT PASTE INTO SUNO)" since Suno only has one Lyrics field and reads Persian script better than romanised. Example 1 rewritten end-to-end with concrete situation (kitchen light) instead of generic palette.
- `0.3.0` — added content-discipline pass (Step 3) and `resources/content-discipline.md`. Targets the failure mode where lyrics scan and rhyme but say nothing. Introduces the four locks (axis / situation / arc / perspective), abstract→concrete replacement, show-don't-tell, single-metaphor system, paraphrase test, and the seven nonsense patterns with fixes. Renumbered subsequent steps.
- `0.2.0` — non-interactive policy with defaults table (Step 0). Pulled stretched-vowel / emphasis / literary-to-singable conversion techniques from the older Suno Persian Songwriter skill. Reconciled stretched-vowel rule across Persian script vs Latin Abjad. Removed remaining "ask the user" phrasings.
- `0.1.0` — initial version. Distilled from the deep-research brief on Persian songwriting and AI-vocal pronunciation.
