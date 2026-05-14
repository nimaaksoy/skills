# skills.nimaaksoy.com

An open directory of AI Skills. Free to use. Free to contribute.

Every skill in this repo is a Markdown `SKILL.md` file compatible with Claude (per Anthropic's Agent Skills spec) and any other AI tool that adopts the `agentskills.io` open standard. Find a skill, copy it, drop it into your tool, use it.

- **Live:** [skills.nimaaksoy.com](https://skills.nimaaksoy.com)
- **Sponsors:** [Bowora](https://bowora.com) · [Vestoin](https://vestoin.com)
- **License:** MIT for site code · CC BY 4.0 for skill content
- **Curator:** [Nima Aksoy](https://nimaaksoy.com)

## Quick start

```bash
# install
npm install

# scaffold a new skill (interactive)
npm run new-skill

# validate every SKILL.md
npm run validate

# build the catalog (writes web/public/skills.json + zips)
npm run build

# run the site locally
npm run dev
```

## Repository layout

```
skills/                  # the catalog — every contributed skill lives here
  _TEMPLATE/             # canonical starter
  <category>/<sub>/<slug>/SKILL.md
categories.yml           # source of truth for the category tree
scripts/                 # validate, build-index, new-skill CLI
web/                     # Next.js site, statically exported
```

## Contribute

Read **[CONTRIBUTING.md](CONTRIBUTING.md)**. The flow is: fork → `npm run new-skill` → edit → `npm run validate` → PR. Every PR is checked by CI; merge to `main` rebuilds the site.

## Compatibility

Skills here are drop-in compatible with Claude — upload the folder via Claude.ai's *Customize → Skills* picker, drop it in `~/.claude/skills/` for Claude Code, or load it through the API's code-execution tool. The `SKILL.md` format follows [Anthropic's Agent Skills spec](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills).

The directory adds a few extra YAML fields (`category`, `subcategory`, `tags`, `author`) that Claude ignores but the site uses for browsing.
