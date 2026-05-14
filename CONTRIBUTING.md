# Contributing

Thanks for adding to the directory. The submission flow is small on purpose.

## TL;DR

```bash
# 1. Fork + clone
git clone https://github.com/<you>/skills && cd skills
npm install

# 2. Scaffold
npm run new-skill

# 3. Edit the generated SKILL.md (and add files under resources/ if needed)

# 4. Validate
npm run validate

# 5. Commit, push, open a PR
```

CI runs the same validator on every PR. A maintainer reviews, merges, and the site rebuilds within minutes.

## What makes a good skill

1. **The description is specific.** It's the field Claude (or any compatible model) uses to decide whether to invoke the skill, so write it like a trigger condition, not a brochure. Max 200 characters.
2. **There's at least one worked example.** Show the input the skill expects and the behaviour it produces.
3. **It's been tested.** Run it against a real model. Note in the PR what worked.
4. **No secrets.** No API keys, passwords, PII, or proprietary data anywhere in the folder.
5. **License-compatible.** Default is CC BY 4.0. If your skill carries a different license, drop a `LICENSE.txt` in the folder.
6. **Files under 5 MB.** Anything bigger should live elsewhere and be linked.

## Folder layout

A skill is a folder. The path encodes its category:

```
skills/<category>/<subcategory>/<skill-slug>/
  SKILL.md           # required
  README.md          # optional, human-readable
  LICENSE.txt        # optional, defaults to CC BY 4.0
  resources/         # optional supporting files
  scripts/           # optional helper scripts
  templates/         # optional templates
```

Categories and subcategories are defined in [`categories.yml`](categories.yml). To add a new category, propose it via PR — it's a small change, just edit the YAML.

The slug is kebab-case and unique within its subcategory.

## SKILL.md frontmatter

Required (per the Anthropic spec):

- `name` — ≤ 64 characters
- `description` — ≤ 200 characters; this triggers the skill

Optional:

- `dependencies` — array of strings, e.g. `["python>=3.10"]`

Directory-only fields (Claude ignores these; the site uses them):

- `category` — must match an `id` in `categories.yml`
- `subcategory` — must match a subcategory `id` under that category
- `tags` — 1 to 8 kebab-case strings
- `author` — `{ name, url?, github? }`
- `license` — defaults to `CC-BY-4.0`
- `version` — semver
- `created` / `updated` — ISO dates

See `skills/_TEMPLATE/SKILL.md` for the full template.

## Validation rules

The validator (`npm run validate`) fails on:

- Missing or malformed frontmatter
- `name` > 64 chars or `description` > 200 chars
- Unknown `category` or `subcategory`
- `tags` outside 1–8 kebab-case strings
- Missing `author.name`
- Folder path doesn't match `skills/<category>/<subcategory>/<slug>/`
- Slug isn't kebab-case
- Body has no `## ` heading
- Any file over 5 MB
- Nested `SKILL.md` files (one per folder)

## PR template

A checklist will appear automatically. Fill it in honestly — the boxes are for you, not for show.

## Code of conduct

Read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). Be kind, be useful, contribute things you'd be glad to find yourself.
