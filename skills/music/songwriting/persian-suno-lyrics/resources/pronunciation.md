# Persian pronunciation rules a sung lyric must respect

A working summary, not a phonetics textbook. Enough to write lyrics that an AI singer pronounces correctly.

---

## Syllables

Persian syllables come in three weights:

| Weight        | Shape                         | Examples              |
|---------------|-------------------------------|-----------------------|
| Light (CV)    | consonant + short vowel       | به /be/, که /ke/      |
| Heavy (CVC)   | C + short vowel + C            | دل /del/, شب /šab/    |
| Heavy (CVV)   | C + long vowel                 | با /bâ/, تو /tu/      |
| Superheavy    | C + long vowel + C, or CVCC    | راست /rāst/, عشق /ešq/ |

For sung Persian:

- **CV (light)** — flexible; works on any note.
- **CVC** — fine, but on long notes the closing consonant gets cut.
- **CVV** — best for long notes and melisma.
- **Superheavy** — keep on short notes; don't melisma.

---

## Vowels

Modern Persian has six vowels:

| Vowel | Symbol | Persian script | Sung-note safety |
|-------|--------|----------------|------------------|
| /a/   | a      | ـَ             | OK on short notes |
| /e/   | e      | ـِ             | OK on short notes |
| /o/   | o      | ـُ             | OK on short notes |
| /â/   | â      | ا، آ           | safe for long notes & melisma |
| /i/   | i      | ی              | safe for long notes & melisma |
| /u/   | u      | و              | safe for long notes & melisma |

**Rule for AI singers**: any held note longer than ~½ beat should land on **â / i / u**.

---

## Stress

Default stress pattern in Persian معیار:

- **Nouns and adjectives**: stress on the **last syllable**. خانه → خا**نه**. صبور → صبو**ر**.
- **Verbs**: stress on the **first syllable** of the verb stem (the prefix or the root). می‌**روم**, **رفت**م, ن**می**‌رود.
- **Adverbs**: usually final-stressed. زود → **زود**.
- **Compound words**: stress on the second element. اسب**سواری**, ماه**رو**.
- **Ezafe**: never stressed. کتا**بِ** من — stress stays on کتاب, not on the ـِ.
- **Clitics** (-ام, -ت, -ش, را, ها): never stressed. کتاب**م** — stress stays on کتاب, not the م.

For lyrics, the practical rule: **mark the stressed syllable of every chorus word and confirm it lands on the strong beat or a held note**. If a word's stress falls on a weak beat, the AI singer will mispronounce it ("kohnEH" instead of "KOHneh").

---

## Ezafe (ـِ)

The ezafe is the small unstressed /-e/ that links words: کتابِ من (kitāb-e man, "my book").

For sung lyrics:

- Ezafe **eats a syllable** but doesn't add a stress. کتابِ من = 4 syllables (ki / tâ / be / man), all stressable except the ezafe.
- **Chains of ezafes** kill singability: «در کوچه‌های خیسِ شبِ بارانیِ دیر» = 14 syllables of which 4 are ezafes, and the line is unsingable in standard pop tempo.
- **Rule**: max 2 ezafes per line in sung Persian. Three or more, rewrite.
- **Suno-specific**: «کوچه‌ی» (kuche-ye, with the ـی marker) is more reliable than «کوچهٔ» (kuche-ye with the hamza) — both are correct, but the ـی form sings more reliably.

---

## Clitics

Personal pronoun clitics (ـم، ـت، ـش، ـمان، ـتان، ـشان) and other clitics (را، که، هم) attach to the previous word and are **never stressed**.

- **Bad for AI**: putting a clitic on a strong beat. The AI will stress it, distorting the word.
  - «کتابِ **م**نو» on beat 1 → AI sings "ki-TÂ-be-MA-no" (wrong).
- **Fix**: rewrite so the host word (not the clitic) lands on the strong beat.
  - «**کتابم** اونجاست» — host «کتابم» on beat 1, stress lands on کتاب correctly.

---

## Consonant clusters

Persian allows complex syllable codas (CC and CCC). Most are fine in speech but problematic in sung Persian, especially for AI singers.

| Cluster type             | Examples       | Sung-note safety                     |
|--------------------------|----------------|--------------------------------------|
| Stop + stop              | کتاب, تخت     | OK on short notes only               |
| Stop + fricative         | عشق, لطف      | risky on any held note              |
| Fricative + stop         | اسب, دست      | OK; AI handles these                 |
| Three-consonant cluster  | فرست, کرسف    | avoid on held notes; consider rewrite |

**Rule for held notes**: pre-pad with a vowel-starting word, or substitute a less-cluster-heavy synonym.

- «عشق» on a held note → «این عشق» (vowel-starting pre-pad) or «عشقِ من» (vowel via ezafe, then resolve).
- «صبر» on a held note → «صبور» (vowel-extension, different word same root).

---

## Sounds that are AI-hard

These sounds are hard for current Suno checkpoints to render cleanly. Avoid them on long sustained notes:

| Sound | Letter | Reason                                  |
|-------|--------|-----------------------------------------|
| /ʔ/   | ع، ء   | Suno often drops the glottal stop entirely |
| /ħ/   | ح      | Often rendered as /h/ or dropped         |
| /q/   | ق      | Sometimes voiced as /g/ (acceptable but inconsistent) |
| /x/   | خ      | Hard to sustain; clip on short notes     |
| /ɣ/   | غ      | Same as /q/ above; inconsistent          |

**Practical rule**: if a chorus hook word starts with one of these, expect inconsistent generations. For maximum reliability, choose hook words that start with vowels or simple stops/fricatives: ب، پ، ت، س، ش، ل، م، ن، ر.

---

## Open-vs-closed final syllable for line endings

For end-of-line rhyme that sings reliably:

- **Open finals (CV / CVV)** — best. خونه, دیدی, رفتو.
- **Closed CVC finals** — OK if the consonant is sonorant (n, m, r, l). دلم, کنار.
- **Closed obstruent finals** — risky for held endings. شب, ندید, کتاب — fine on short notes, weaker on holds.

Build chorus end-rhymes from **open or sonorant-final** syllables when possible.

---

## Quick reference: melisma-safe vs melisma-unsafe

**Melisma-safe** (OK to hold for 2+ beats): جان، ای، آرام، یار، می، تو، بیا، نیا، نگاه، چرا، رها.

**Melisma-unsafe** (do NOT hold): عشق، شب، صبر، گفت، رفت، دست، سخت، لطف.

If a sung target lands on a melisma-unsafe word, either change the word or change the note duration.

---

## Literary → singable conversion table

Persian poetry on paper does not sing the same as conversational Persian. Suno's vocal engine handles short, spoken-register Persian better than dense literary lines. When the brief implies a modern style, convert literary phrasings to singable ones.

| Literary (avoid)                  | Singable (use)                       |
|-----------------------------------|--------------------------------------|
| میخواهم بدانم چرا رفتی            | میخوام بدونم...  /  چرا رفتی؟        |
| در این شبِ تاریک غمگین            | توی این شبِ تاریک...                 |
| قلب من از فراق تو سوخت            | دلم سوخت...  /  بی تو                |
| هرگز فراموش نخواهم کرد            | یادم نمیره...  /  هیچوقت             |
| بازگشت تو را آرزو میکنم           | کاش برگردی...                        |
| سخن می‌گویم با تو                 | باهات حرف میزنم                      |
| در آغوش گرفتمت                    | بغلت کردم                            |
| دیدگانم را                        | چشمامو                               |
| دل من برای تو می‌تپد              | دلم برات می‌تپه                      |

For traditional / classical style, keep the literary form. For pop / rap / rock / electronic / modern lyric, convert.

---

## Stretched vowels and emphasis (Persian script only)

These two techniques apply **only to the Persian-script lyric block**. The ابجد عامیانه block uses `~` and `~~` instead — never double letters.

**Stretched vowels.** For emotional weight on a single word, lengthen an open vowel by repeating the letter: `خووووب`, `بمووون`, `جاااان`. Suno reads these as held vowels.

Rules:

- Only on **open vowels** (و, ا, ی).
- Only on single-syllable or short words that sit at a phrase end.
- Maximum three repeats in pop/rap; up to six in cinematic/ballad.
- Never inside a consonant cluster.

**Emphasis with `!`.** A `!` after a single short word makes the AI singer hit it like a vocal accent. Use sparingly — one per section.

- Good: `بمون!` at the end of a chorus line.
- Bad: `بمون!!!` (Suno may interpret as shouted/distorted).
- Avoid on long phrases — emphasis works only on single words.

**Conversational endings.** When the style is colloquial, prefer:

| Formal       | Colloquial      |
|--------------|-----------------|
| می‌دانم      | میدونم          |
| نمی‌دانم     | نمیدونم         |
| می‌گویم      | میگم            |
| می‌روم       | میرم            |
| چرایی        | چرا             |
| قلبم         | دلم             |
| خانه‌ی من    | خونه‌م          |

**Pauses with `...`.** Persian script can use `...` between half-thoughts. Suno reads them as breath room. Always pair with a corresponding `...` in the ابجد block.

---

## Vowel quality for chorus endings

Open vowels (ا، و، ای) carry better than closed vowels (ـِ، ـُ) for sustain. When the chorus needs to soar, end lines on open vowels.

- Good: `بمووون...` / `بیا~~` / `جانا~~`
- Harder: `بمیر...` / `رفت~~` / `سخت~~`

For minimal/electronic styles where syllables are short, closed-vowel endings are fine — they won't be held.
