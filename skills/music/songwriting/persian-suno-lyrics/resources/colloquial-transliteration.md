# Colloquial Abjad — phonetic transliteration system

The romanised system used in the **ابجد عامیانه** block. Designed for AI singers (Suno, Eleven, Riffusion) and non-Persian-reading collaborators. Optimised for *what gets sung*, not academic accuracy.

---

## Letter-to-sound map

| Persian | Latin   | Sound                            | Notes                                     |
|---------|---------|----------------------------------|-------------------------------------------|
| ا، آ    | â       | as in *father*                   | Always long, always open. Safe for melisma. |
| ـَ       | a       | as in *cat*                      | Short.                                    |
| ـِ       | e       | as in *bed*                      | Short.                                    |
| ـُ       | o       | as in *off*                      | Short.                                    |
| ای، ی   | i       | as in *meet*                     | Long. Safe for melisma.                   |
| او، و   | u       | as in *boot*                     | Long. Safe for melisma.                   |
| ب       | b       | b                                |                                            |
| پ       | p       | p                                |                                            |
| ت، ط    | t       | t                                |                                            |
| ث، س، ص | s       | s                                |                                            |
| ج       | j       | j                                |                                            |
| چ       | ch      | ch (as in *chair*)              |                                            |
| ح، ه    | h       | h                                |                                            |
| خ       | kh      | as German *Bach*                 | Hard to hold; keep on short notes.        |
| د       | d       | d                                |                                            |
| ذ، ز، ض، ظ | z    | z                                |                                            |
| ر       | r       | tapped r                         |                                            |
| ژ       | zh      | as in *measure*                  |                                            |
| ش       | sh      | sh                               |                                            |
| غ، ق    | gh      | uvular g (or sometimes /q/)      | Suno sometimes voices it as /g/.          |
| ف       | f       | f                                |                                            |
| ک       | k       | k                                |                                            |
| گ       | g       | g                                |                                            |
| ل       | l       | l                                |                                            |
| م       | m       | m                                |                                            |
| ن       | n       | n                                |                                            |
| و       | v       | v (when consonantal)             | `vali`, `vâ-led`                          |
| ی       | y       | y (when consonantal)             | `ya-ki`, `yâr`                            |
| ع، ء    | '       | glottal stop                     | Only when audible. Usually omit.          |

---

## Colloquial conversion rules

Persian script can be formal or colloquial; the **ابجد عامیانه** is always colloquial. Apply these conversions on the fly:

| Formal script    | Colloquial Latin     |
|------------------|----------------------|
| می‌روم            | miram                 |
| می‌رود            | mire                  |
| می‌رویم           | mirim                 |
| می‌خواهم          | mikhâm                |
| نمی‌خواهم         | nemikhâm              |
| می‌خواهی          | mikhây                |
| می‌خواهد          | mikhâd                |
| خواهم رفت         | miram                 |
| است               | -e (suffixed) / hast / -as |
| این است           | ine                   |
| آن                | un                    |
| آنها              | una                   |
| این را            | ino                   |
| را                | -o / -ro              |
| خانه              | khune                 |
| می‌گویم            | migam                 |
| می‌گوید            | mige                  |
| یک                | ye                    |
| که                | ke                    |
| دیگر              | dige                  |
| آری               | âre                   |
| نه                | na                    |
| اکنون             | alân                  |
| همین‌طور           | hamintor              |
| می‌توانم           | mitunam               |
| نمی‌توانم         | nemitunam             |

---

## Stress marking

Use **CAPITAL letters** for the stressed syllable. Persian default stress:

- Nouns / adjectives: last syllable. `khâne` → `khâ-NE`.
- Verbs: first stem syllable. `miram` → `MI-ram`, `mikhânam` → `mi-KHÂ-nam`.
- Clitics (`-am`, `-at`, `-esh`, `-o`, `-ro`, `-â`): never stressed. `kheylî-am` → `khey-LÎ-am`.
- Ezafe (`-e`): never stressed. `khune-ye man` → `KHU-ne ye MAN`.

Always mark the stress on every word in the chorus. In verses, mark only on words that fall on strong beats.

---

## Intonation marks

Use at line ends only, and only when the intonation changes meaning. Default unmarked = neutral.

| Mark | Meaning                          | When to use                                |
|------|----------------------------------|--------------------------------------------|
| ↑    | rising                            | questions, suspended thoughts, list items, lines that *want* an answer in the next line |
| ↓    | falling                           | statements, resolutions, finals, chorus closes |
| (none) | neutral / flat                  | factual statements that don't open or close anything |

Examples:

```
chera RAF-ti↑          → why did you leave? (question)
ha-MIN-jâ-yam↓         → I'm right here. (statement, falling)
del-AM mi-GE bi-Â      → my heart says come (neutral; expects the listener to keep listening)
```

---

## Pause / breath punctuation

| Mark | Length          | Use                                          |
|------|------------------|----------------------------------------------|
| ` `  | (space, no pause) | between syllables of one phrase             |
| `,`  | short pause (~ ¼ beat) | mid-line breath, comma-equivalent       |
| `.`  | full stop (~ ½ beat) | end of statement                          |
| `...` | sustained pause (~ 1 beat) | dramatic break, fermata-like         |
| `—`  | in-line break (no stop)  | when the phrase continues but needs separation |

For sung material, punctuation in the ابجد block is **rhythmic**, not grammatical. Don't be afraid to break a grammatical clause for breath, or run two clauses together when they sing as one.

---

## Held vowels

Use `~` for a single beat hold, `~~` for a longer hold (~ 2 beats). Place only on **â / i / u** or at vowel-final words.

```
jâ~n          → 1-beat hold on jân (open vowel, safe)
biâ~~         → 2-beat hold on the â of biâ
yâ~r          → 1-beat hold on yâr (long â)
```

Never:

```
eshgh~        → ✗ closed cluster, won't sing
sakht~        → ✗ closed cluster
to~           → ✗ short vowel won't sustain naturally; use to-o-o instead if needed
```

---

## Bound morphemes (hyphen rule)

Hyphenate bound morphemes so the AI singer doesn't slur them as a single word:

| Persian        | ابجد        |
|----------------|-------------|
| خونه‌مون       | khune-mun   |
| خیلیم           | kheylî-am   |
| دیدمش          | di-dam-esh  |
| این‌جام        | in-jâm      |
| نگفتم          | na-GOF-tam  |
| رفته‌بودم      | raf-te-BU-dam |
| گفتش           | gof-TESH    |

The hyphen helps Suno give the morpheme its own syllable slot. Without it, you get slurs like `khunemun` rendered as `khu-NE-mun` (wrong stress) instead of `KHU-ne-mun`.

---

## Common contraction shortcuts

Memorise these:

| Persian               | ابجد         |
|-----------------------|--------------|
| تو که                 | to ke        |
| می‌گویم به تو         | migam be-het |
| نمی‌فهمم              | nemifahmam   |
| داره میره             | dâ-re MI-re  |
| یه روز                | ye RUZ       |
| این یکی               | in YE-ki     |
| بیا اینجا             | biâ IN-jâ    |
| دلم می‌خواد           | de-LAM mi-KHÂD |
| باشه                  | bâ-SHE       |
| بریم                  | be-RIM       |

---

## What NOT to do

Common mistakes to avoid:

- **Double-letter spellings**: `too` for تو, `doo` for دو, `yoo` for یو. Always single-vowel: `to`, `do`, `yo`. (For sustained-vowel emphasis use `~` or `~~`, e.g. `to~~` or `do-o-o`, never `too` / `doo`.)
- **Ignoring stress** in the chorus. Untracked stress is the #1 cause of robotic Suno output.
- **Using academic transliteration in the colloquial block**: writing `miravam` when the singer should say `miram`. The point of the colloquial block is what gets sung, not what's grammatically formal.
- **Diacritics inside Latin**: don't write `mı-rām` with macrons; use only `â` (and only on long /a/).
- **English spelling habits**: `gh` is uvular, not silent. `kh` is fricative, not just `k`. Spell what you hear, not what looks English-friendly.
- **Forgetting line-end intonation** in chorus. Every chorus line either rises (↑) or falls (↓). Mark them.

> **Note on stretched vowels.** Persian script may use repeated letters for emotional emphasis (`خووووب`, `بمووون`, `جاااان`). In the ابجد block, the equivalent is `~` or `~~`: `khu~~b`, `bemu~~n`, `jâ~~n`. Never `khoooob` or `bemoooon` in the Latin block — Suno reads the doubled Latin letters literally.

---

## Worked example

Persian (colloquial script):

```
تو هنوز توی ذهنم راه میری
هر جا که میرم، با منی، نمیری
```

Colloquial Latin (this system):

```
to ha-NUZ tu-ye ZEH-nam RÂH MI-ri↑
har JÂ ke MI-ram, bâ MA-ni, ne-mi-RI↓
```

What this tells the AI singer:

1. Line 1 ends rising — suspended, the song isn't done.
2. Line 2 has two short commas — breath room, then a falling final — resolution.
3. Stress on `ha-NUZ`, `ZEH-nam`, `RÂH`, `MI-ri` (line 1); `JÂ`, `MI-ram`, `MA-ni`, `ne-mi-RI` (line 2).
4. All sustainable vowels (`â`, `i`) land on or near the stressed syllables — safe for any held notes.
