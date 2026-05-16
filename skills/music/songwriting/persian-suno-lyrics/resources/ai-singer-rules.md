# AI singer rules for Persian Suno lyrics

The fixes below come from observed Suno failure modes on Persian text. Run this list before delivering a lyric.

---

## 1. Orthography normalisation

Convert ambiguous spellings to AI-stable forms:

| Avoid          | Prefer          | Why                                            |
|----------------|-----------------|------------------------------------------------|
| توو، دوو، یوو | تو، دو، یو      | Doubled vowels are non-standard; some checkpoints sing the literal `vv`. |
| اکنون / الان (mixed) | pick one     | Register lock.                                  |
| می‌رم vs میرم  | میرم            | Suno is more reliable without the half-space `‌`. |
| یَ، نَ (with حرکات) | یا، نا (no حرکات) | Suno mostly ignores diacritics; remove for clarity. |
| Latin punctuation in Persian | Persian (؟ ، ؛ «») | Mixed punctuation can confuse tokenisation.   |
| Numbers in Persian script | spell out      | Suno mispronounces digits often. ۲۰ → بیست.    |
| Arabic «ك» / «ي»  | Persian «ک» / «ی» | Some Suno versions fail on Arabic letterforms.  |

Half-space (نیم‌فاصله, U+200C): keep it for prefix/suffix attachment («می‌خوام», «نمی‌دانم») where it improves readability — but for AI singers, simple space («میخوام») is usually equally reliable and more portable.

---

## 2. Register lock

Single most-impactful rule. Build a tiny conversion table for the song before you start writing:

| Formal              | Colloquial        |
|---------------------|-------------------|
| می‌روم              | میرم              |
| نمی‌توانم            | نمی‌تونم           |
| این                 | این               |
| آن                  | اون               |
| آنها                | اونا              |
| خانه                | خونه              |
| خواهم رفت           | میرم              |
| دیدمش               | دیدمش             |
| است                 | است / -ـه (drop in colloquial) |
| را                  | رو                |
| که (formal)         | که (universal)    |

**Rule**: pick a column. Apply it everywhere. No mixing.

A common compromise — semi-formal — uses colloquial verbs («میرم») with formal nouns («خانه»). It works but only if applied consistently.

---

## 3. Hard-cluster handling

Words with hard consonant clusters that often misfire on long notes:

عشق، صبر، سخت، گفت، لطف، فعل، ضرب، شکست، عقل، خشم، گرگ.

Strategies:

1. **Pre-pad** with a vowel-starting word: «عشق» → «این عشق».
2. **Use the noun phrase form**: «عشق» → «عشقِ من» (the ezafe softens the attack).
3. **Substitute** with a synonym that opens with a vowel or simple onset: «عشق» → «عاشق» (different shape, related meaning).
4. **Move to a short note**: keep the hard word, but never melisma it.

---

## 4. Hook engineering for AI singers

A Suno chorus that doesn't earworm is a wasted song. The hook must:

- Be a single repeatable word or 2-syllable phrase.
- End with **â / i / u** (open vowel) for sustain.
- Start with a vowel or simple consonant (not ع، ح، ق، خ، غ).
- Have stress that aligns with the chorus's strong beat.

**Top-tier Persian hook words** for AI singers:

بیا · هنوز · تو · دل · رو · چراغ · آرام · یار · جان · شب · رفت · موند · بمون · نگو · حالا · یه روز.

Avoid as primary hook: عشق, دست, شب (overused), گفت, سخت, خواب (closed final).

---

## 5. Chorus rhyme verification

Visual rhymes that fool writers but fail at the AI's mouth:

| Visual pair       | Sounds like   | Status |
|-------------------|---------------|--------|
| خوب / گم          | xub / gom     | NOT a rhyme |
| دیر / دور         | dir / dur     | NOT a rhyme (different vowels) |
| خونه / تونه       | xune / tune   | rhyme ✓ |
| رفت / گفت         | raft / goft   | rhyme ✓ (final-syllable obstruent) |
| رفتن / گفتن       | raftan / goftan | rhyme ✓ |
| میری / میگیری     | miri / migiri | rhyme ✓ |
| بود / شد          | bud / šod     | NOT a rhyme |

Always read the rhyme aloud. If it doesn't ring in the mouth, rebuild it.

---

## 6. Length per line

Per style (see `styles.md` for full table). Quick reference:

- Pop: 6–10 syllables.
- Rap: 12–16 syllables (broken into 2–3 internal phrases).
- Rock: 8–12 syllables.
- Traditional: 7–11 syllables.
- Cinematic ballad: 8–14 syllables.
- Minimal poetic: 4–8 syllables.
- Electronic: 4–8 syllables.

Lines longer than the style's max get cut to size or broken into two.

---

## 7. Section tagging

Suno uses bracketed section tags. Required for reliable structure:

```
[Intro]
[Verse 1]
[Pre-Chorus]
[Chorus]
[Verse 2]
[Bridge]
[Final Chorus]
[Outro]
```

Keep tags in **English** (Suno parses them best). Lyrics in Persian.

---

## 8. Inline performance cues

Suno reads parenthetical cues in the lyric body. Use sparingly:

- `(whisper)` — for soft passages.
- `(shouted)` — for emphasis.
- `(spoken)` — for non-melodic delivery.
- `(female vocal)` / `(male vocal)` — for duets at the line level.
- `~~` — for held / sustained note (not officially Suno syntax, but useful for human readers; remove before submitting if needed).

Don't stack too many cues. One per section is plenty.

---

## 9. Pronunciation hints (when needed)

Suno does not read IPA. If a word is being misread, the cleanest fix is a **respelling that biases the model**:

| If Suno mispronounces | Try rewriting as |
|------------------------|------------------|
| دلم (sung as "DA-lam")    | دل-م (with hyphen, on a strong beat) |
| نگاه (sung as "ne-GA-h")  | نِگاه (with diacritic if needed) or break to «نـ گاه» |
| می‌رم (rendered as "mi RAM") | میرم (no half-space) |

This is trial-and-error per checkpoint. Document what works in the *Performance notes* block.

---

## 10. Quick AI-singer cleanup checklist

Run after drafting:

- [ ] Single register throughout.
- [ ] No mixed orthography («تو» vs «توو», etc.).
- [ ] No more than 2 ezafes per line.
- [ ] Chorus hook word starts with safe consonant, ends with open vowel.
- [ ] Chorus rhymes work by ear, not just by spelling.
- [ ] No hard consonant clusters on held notes.
- [ ] No ع، ح، ق، غ initials on hook syllables.
- [ ] Section tags in English brackets.
- [ ] Numbers spelled out.
- [ ] Latin punctuation removed (or intentionally kept).
