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
version: 0.3.0
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

This skill is **non-interactive**. Don't ask the user about style, register, length, hook word, vazn, or vocal gender. Infer the best choice from whatever the user wrote, and proceed straight to delivery.

If the brief is short or vague, apply this **defaults table** silently:

| Parameter           | Default when not specified                                                  |
|---------------------|------------------------------------------------------------------------------|
| Style               | Modern Persian pop                                                            |
| Register            | Colloquial                                                                    |
| Length              | 2 verses + pre-chorus + chorus + bridge + final chorus (~ 24–32 lines total) |
| Chorus length       | 4 lines, 7–9 syllables each                                                  |
| Hook word           | One of: هنوز · بیا · تو · چراغ · دل · رو — pick whichever fits the theme    |
| Vocal gender        | Male (unless theme/voice in user input implies otherwise)                    |
| BPM                 | 85 for ballad, 95 for pop, 110 for rock, 140 for rap, 105 for electronic     |
| Vazn / pulse        | Free pulse with consistent line length per section                            |
| Melisma             | None for pop/rap/rock/electronic; 1–2 phrase-end melisma for traditional/ballad |
| Theme               | Lift the strongest noun/emotion from the brief; if none, default to شب + تنهایی |
| Section tags        | English `[Verse]` `[Pre-Chorus]` `[Chorus]` `[Bridge]` `[Outro]`              |

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

### 3. Lock the content before you write a single line

Pronunciation-perfect lyrics with nonsense content are still nonsense. Before drafting, decide all four in one short note (kept in your scratchpad, not shown to the user):

- **One emotional axis** for the whole song — longing, regret, defiance, peace, hope. **Pick one.** Don't try to be sad and celebratory in the same 4 verses.
- **One concrete situation** — not a theme, a *moment*. "She left on a Tuesday morning" beats "she left". "The cup of tea went cold while I waited" beats "I was sad".
- **One narrative arc** — what changes from verse 1 to the final chorus? Pick one: discovery, departure, return, refusal, acceptance, escalation, deflation. Write it in one sentence.
- **One specific perspective** — who is the speaker? Who (or what) is "you" / "تو"? It must stay the same person across the whole song unless you mark the turn.

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

Return the lyric in three required blocks plus one optional:

1. **متن (Lyrics — Persian script)** — section tags `[Verse]`, `[Pre-Chorus]`, `[Chorus]`, `[Bridge]`, `[Outro]`. Mark melisma with `~~` and pauses with `...`.
2. **ابجد عامیانه (Colloquial Latin transliteration)** — same lyric, fully colloquial, with stress, intonation, and pauses per Step 9. Same section tags. **Required.**
3. **یادداشت‌های اجرایی (Performance notes)** — register, syllable target per chorus line, stress map, hook word, melisma points, any phrase that needs a specific note length.
4. **ترانویسی آکادمیک (Academic transliteration, optional)** — only if user asked. Same as the colloquial block but neutral, no stress/intonation marks.

If the user wants a full Suno brief (Style prompt, negatives, sliders), hand off to **Suno Persian Songwriter** with this lyric as input.

## Examples

### Example 1 — pop, single style, single language

**Input:**

> "یه ترانه پاپ بنویس، خونه، شب، تنهایی. کرس باید catchy باشه."

**Expected behaviour:**

No questions. Infer: pop → colloquial register; theme = home/night/loneliness from the brief; hook = هنوز (fits "shab + tanhâyi"); chorus target = 4 lines × 8 syllables. Ship the four blocks.

**متن**

```
[Verse 1]
چراغِ خونه روشنه
ولی صدا فقط منم
دیشب رفتی، نمیدونم
چرا هنوز با تو حرفم

[Pre-Chorus]
دلم نمیکنه، نمیشه
این خونه بی تو خالی نیست

[Chorus]
هنوز این شب، صدای توئه
هنوز این در، نگاهِ توئه
هنوز اینجام، ولی نیستی
هنوز قلبم با ردِّ توئه
```

**ابجد عامیانه**

```
[Verse 1]
cherâgh-e KHU-ne ro-shan-E,
va-li se-DÂ fa-GHAT ma-NAM.
di-SHAB raf-TI, ne-mi-DU-nam,
che-RÂ ha-NUZ bâ to HAR-fam↑

[Pre-Chorus]
de-LAM ne-mi-KO-ne, ne-mi-SHE...
in KHU-ne bi to KHÂ-li NIST↓

[Chorus]
ha-NUZ in SHAB, se-DÂ-ye TO-e↑
ha-NUZ in DAR, ne-GÂ-he TO-e↑
ha-NUZ IN-jâm, va-li NIS-ti.
ha-NUZ GHAL-bam bâ rad-de TO-e↓
```

**یادداشت‌های اجرایی**

- Register: colloquial throughout. هنوز as the chorus hook (sustained vowel /u/).
- Chorus: each line 8 syllables, ending in open vowel /-oe/. Stress on `ha-NUZ` and `TO-e`.
- No melisma in verses. Optional 1-beat hold on the second `ha-NUZ` of every chorus line.
- Intonation: chorus lines 1–3 rising (suspension); line 4 falling (resolution).

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

- **No questions.** This skill is non-interactive by design. If the brief is short, apply the defaults table from Step 0 silently. Never reply with a clarifying question.
- **Pronunciation-perfect ≠ song-worthy.** The most common quality failure is a lyric that scans, rhymes, and sings cleanly but means nothing. Always run the content-discipline pass (Step 3) and the paraphrase test before delivery. If you can't paraphrase the song in one specific sentence, the content failed — rewrite.
- **Suno is non-deterministic.** Even a clean lyric can produce one bad take. Re-roll 2–4 times and pick.
- **Some Persian sounds remain hard for AI singers** even with clean lyrics: «ع», «ح», «ق», long-held «خ». Keep these off long sustained notes.
- **Regional dialects (Khorasani, Lori, Kurdish, Bandari)** are out of scope for the AI-correctness focus. Write the معیار version first, then optionally dialect-tag in **Performance notes**.
- **This skill stops at the lyric.** For Style prompt, vocal direction, negative prompt, and sliders, hand off to *Suno Persian Songwriter*.
- **Don't melisma over consonant clusters.** Worth saying twice — it's the failure mode that ruins the most "almost perfect" Suno generations.
- **Chorus rhyme must be aural.** A rhyme that only works on the page will sing wrong. Always read aloud before delivery.
- **Stretched-vowel emphasis (`خووووب`, `بمووون`) is Persian-script only.** In the ابجد block always use `~` or `~~`, never doubled Latin vowels — Suno reads them literally.

## Changelog

- `0.3.0` — added content-discipline pass (Step 3) and `resources/content-discipline.md`. Targets the failure mode where lyrics scan and rhyme but say nothing. Introduces the four locks (axis / situation / arc / perspective), abstract→concrete replacement, show-don't-tell, single-metaphor system, paraphrase test, and the seven nonsense patterns with fixes. Renumbered subsequent steps.
- `0.2.0` — non-interactive policy with defaults table (Step 0). Pulled stretched-vowel / emphasis / literary-to-singable conversion techniques from the older Suno Persian Songwriter skill. Reconciled stretched-vowel rule across Persian script vs Latin Abjad. Removed remaining "ask the user" phrasings.
- `0.1.0` — initial version. Distilled from the deep-research brief on Persian songwriting and AI-vocal pronunciation.
