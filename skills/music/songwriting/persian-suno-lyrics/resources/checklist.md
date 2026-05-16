# Pre-delivery checklist

Walk this list before sending the lyric back. Every list item maps to a real Suno failure mode.

---

## Brief

- [ ] Style identified and matches the user's request (or the user accepted your suggestion).
- [ ] Theme reflected in the actual lyric, not just abstractly.
- [ ] Length matches user's ask (or matches the style's default if no length was given).

## Register lock

- [ ] One register chosen and applied to **every** verb form.
- [ ] No mixed «می‌روم» / «میرم» / «میرَم» combinations.
- [ ] Pronouns consistent: «این/آن» (formal) or «این/اون» (colloquial), not both.
- [ ] No formal noun ↔ colloquial verb mismatches mid-line.

## Orthography

- [ ] No doubled vowels («توو», «دوو»).
- [ ] No Arabic «ك» or «ي» — replaced with Persian «ک» / «ی».
- [ ] No Arabic numerals — spelled out.
- [ ] No Latin punctuation in Persian lines (or intentional and consistent).
- [ ] Half-spaces (نیم‌فاصله) used or omitted consistently.

## Per-line prosody

- [ ] No line exceeds the style's max syllable count.
- [ ] No line has more than 2 ezafes.
- [ ] No clitic on a strong beat where it would distort word stress.
- [ ] Verb stress falls on the verb's stem syllable, not on a clitic or suffix.

## Chorus

- [ ] Hook word identified.
- [ ] Hook word starts with a safe consonant (not ع، ح، ق، خ، غ).
- [ ] Hook word ends with an open vowel (â / i / u) for sustain.
- [ ] All chorus lines have the same syllable count (or match a strict 2-pattern).
- [ ] Chorus rhymes work **by ear**, not by spelling.
- [ ] No hard consonant cluster on a held note.

## Hard sounds

- [ ] No long-held «عشق», «صبر», «سخت», «گفت», «رفت» — pre-padded or moved to short notes.
- [ ] No melisma on closed syllables — moved to nearest open vowel.
- [ ] No melisma on hook words starting with ع، ح، ق، خ، غ.

## Section structure

- [ ] Section tags in English brackets: `[Verse]`, `[Pre-Chorus]`, `[Chorus]`, `[Bridge]`, `[Outro]`.
- [ ] Verses, pre-chorus, chorus, bridge each have distinct character (don't all sound the same).
- [ ] Repeats of the chorus are identical (or intentional variations are marked).

## Performance notes

- [ ] **یادداشت‌های اجرایی** block included — register, syllable count per chorus line, stress map, hook word, melisma points.
- [ ] If using regional flavour, معیار version is the lyric and dialect notes go in performance notes.

## Colloquial Abjad (required)

- [ ] **ابجد عامیانه** block included with the same lyric.
- [ ] Spells what the singer should *say*, not what's written (e.g. `khune` not `khâne`, `miram` not `miravam`).
- [ ] Stress marked with CAPITALS on the right syllable for every word in the chorus.
- [ ] Stress is on verb stems (not on clitics or suffixes); ezafes are never stressed.
- [ ] Held vowels marked with `~` and only on `â / i / u` or vowel-final words.
- [ ] Pause punctuation present: `,` for short, `.` for full stop, `...` for sustained.
- [ ] Intonation marks `↑` / `↓` at chorus line ends where it changes meaning.
- [ ] No double-letter artefacts (`too`, `doo`, `yoo`).
- [ ] No academic transliteration leaking in (`miravam`, `khâne`) — always colloquial.
- [ ] Bound morphemes hyphenated (`khune-mun`, `kheylî-am`).

## Honesty

- [ ] If a part of the lyric had to compromise (e.g. couldn't avoid a hard cluster), it's flagged in **Performance notes**.
- [ ] **No clarifying question was asked.** Any ambiguity in the brief was resolved by the defaults table in Step 0, and the chosen defaults are listed in **Performance notes**.
- [ ] If the brief contradicted itself, the conflict resolution is named in **Performance notes** — but you still shipped a lyric, not a question.

## Hand-off

- [ ] If the user wants the full Suno production brief, you handed off to *Suno Persian Songwriter* with the finished lyric.

If any box is unchecked, fix it. The user will hear the difference at generation time.
