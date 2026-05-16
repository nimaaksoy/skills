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
version: 0.1.0
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

### 3. Write for the mouth, not the eye

While drafting, read each line aloud. Flag and rewrite:

- **Hard consonant clusters on long notes** — «عشق», «سخت», «صبر» are hard for AI vocalists to attack. Either give them a short note, or pre-pad with a vowel («این عشق» beats «عشق» on a sustained note).
- **Long ezafe chains** — «در کوچه‌های خیسِ شبِ بارانیِ دیر» is mouth-killing. Cap at two ezafes per line.
- **Visual rhymes that aren't aural** — «خوب / گم» look paired but don't rhyme. Always rhyme by ear.
- **Ambiguous orthography** — «مردم» (people / I died) and similar bivalent words should be disambiguated by surrounding context, or replaced.

### 4. Map syllables and stress before delivery

For every chorus line, mark syllable count and stress. The chorus carries memorability; a misstressed chorus poisons the whole song.

```
to    | ha-NUZ | tu-ye | ZEH-nam | RÂH | mi-RI
1     |   2    |   2   |    2    |  1  |   2     = 10 syllables
```

Stresses fall on closed long-vowel syllables and the last syllable of nouns/adjectives. See `resources/pronunciation.md` for the full rules.

### 5. Place melisma intentionally (or not at all)

- **Pop / Rap / Rock / Electronic** — minimal or no melisma. AI-pop vocals sound best when each syllable hits a single note.
- **Traditional / Fusion / Cinematic ballad** — one or two melisma points per phrase, placed on **open vowels** (â / i / u) at phrase ends. Mark them in the lyrics with `~~` or `[hold]`.
- **Never melisma on closed syllables or consonant clusters.** «جان~~» works; «عشق~~» does not.

### 6. Build the chorus to lock in memory

A Suno chorus that doesn't earworm is a wasted song. Three rules:

- **Sustained-vowel hook word** at the start or end of each chorus line. Prefer: بیا، هنوز، تو، چراغ، دل، رو، آرام.
- **Same syllable count** across chorus lines (or a strict 2-pattern: 8/6/8/6).
- **Identical rhyme phoneme** — by ear, not by spelling.

### 7. AI-clean the final pass

Run `resources/ai-singer-rules.md` checklist before delivery. Common rewrites:

| Problem                          | Fix                                       |
|----------------------------------|-------------------------------------------|
| "تو همیشه میای ولی میری همیشه"   | "تو میای، تو میری، هر دفعه تو میای"      |
| Long line in colloquial register | Break into 2 short lines or 1 medium     |
| Closed-syllable melisma          | Move melisma to nearest open vowel       |
| Mixed «می‌خوام» and «می‌خواهم»    | Pick one; convert every instance         |
| Visual-only rhyme                | Rhyme by spoken phoneme                  |

### 8. Deliver

Return the lyric in three blocks:

1. **متن (Lyrics)** — Persian script only, with section tags `[Verse]`, `[Pre-Chorus]`, `[Chorus]`, `[Bridge]`, `[Outro]`. Mark melisma with `~~` and pauses with `...`.
2. **یادداشت‌های اجرایی (Performance notes)** — register chosen, syllable target per chorus line, stress map for the chorus, hook word, and any phrase that needs a specific note length.
3. **ترانویسی (Transliteration, optional)** — only if the user asked or appears non-Persian-reading. Use simple Persian-academic style: `â=آ, kh=خ, sh=ش, ch=چ, gh=غ/ق, zh=ژ`.

If the user wants a full Suno brief (Style prompt, negatives, sliders), hand off to **Suno Persian Songwriter** with this lyric as input.

## Examples

### Example 1 — pop, single style, single language

**Input:**

> "یه ترانه پاپ بنویس، خونه، شب، تنهایی. کرس باید catchy باشه."

**Expected behaviour:**

Confirm in one line: pop, colloquial register, theme = home/night/loneliness, chorus must hook. Pick hook word (e.g. هنوز). Build syllable target (chorus 8 syllables/line). Draft, syllable-map the chorus, deliver.

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

**یادداشت‌های اجرایی**

- Register: colloquial throughout. هنوز as the chorus hook (sustained vowel /u/).
- Chorus: each line 8 syllables, ending in open vowel /uee/. Stress on هَنوز و توئه.
- No melisma in verses. Optional 1-beat hold on the second هنوز of every chorus line.

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

Or (formal, fixed):

```
من می‌روم، تو باز در خانه خواهی ماند
صدای گام مرا با خود تو خواهی خواند
این کوچه‌ها همه با تو همیشه بودند
اکنون به جز رد پای تو، نشانی نماند
```

Tell the user which register they want before locking the choice.

## Resources

- `resources/styles.md` — per-style prosody contract: line length, syllable density, melisma policy, consonant-cluster tolerance, register default. Covers pop, rap, rock, traditional, fusion, electronic, alternative, minimal-poetic, cinematic ballad, regional/folk.
- `resources/pronunciation.md` — Persian stress, vowel, syllable, ezafe, and clitic rules a lyric must respect to be sung correctly. Includes the AI-safe melisma rule.
- `resources/ai-singer-rules.md` — Suno-specific cleanup checklist: orthography normalisation, register lock, hard-cluster handling, hook engineering, chorus-rhyme verification.
- `resources/templates-by-style.md` — starter line patterns per major style (verse openings, chorus hooks, common syllable templates).
- `resources/checklist.md` — pre-delivery checklist; run before sending the lyric back.

## Notes & limitations

- **Suno is non-deterministic.** Even a clean lyric can produce one bad take. Re-roll 2–4 times and pick.
- **Some Persian sounds remain hard for AI singers** even with clean lyrics: «ع», «ح», «ق», long-held «خ». Keep these off long sustained notes.
- **Regional dialects (Khorasani, Lori, Kurdish, Bandari)** are out of scope for the AI-correctness focus. Write the معیار version first, then optionally dialect-tag in **Performance notes**.
- **This skill stops at the lyric.** For Style prompt, vocal direction, negative prompt, and sliders, hand off to *Suno Persian Songwriter*.
- **Don't melisma over consonant clusters.** Worth saying twice — it's the failure mode that ruins the most "almost perfect" Suno generations.
- **Chorus rhyme must be aural.** A rhyme that only works on the page will sing wrong. Always read aloud before delivery.

## Changelog

- `0.1.0` — initial version. Distilled from the deep-research brief on Persian songwriting and AI-vocal pronunciation.
