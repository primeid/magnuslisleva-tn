---
title: "A Forest Notebook for the Internet"
excerpt: "What a personal site can learn from field notes, source code, and the shape of a walk."
publishDate: 2026-03-24
readingTime: "6 min read"
featured: true
tags:
  - biology
  - philosophy
  - ai
cover: "/media/forest-notebook/forest-cover.svg"
gallery:
  - "/media/forest-notebook/leaf-study.svg"
  - "/media/forest-notebook/moss-study.svg"
---

The site is meant to feel like a publication, but not a newsroom and not a startup landing page.
It should move more like a notebook.

That means a text can be short, unfinished, image-led, or sharply argued. A creation can sit beside
an essay without feeling like a different product.

The structural reference comes from developer publishing: index pages, archive pages, clear URLs,
quiet typography, and fast loading. The emotional reference comes from somewhere else entirely:
field guides, lab margins, and the choreography of collecting small observations over time.

## Why this shape

Personal publishing tends to split into separate systems. Writing goes one way, media goes another,
projects go somewhere else again. The better approach here is a single home with a few strong
distinctions:

- `Texts` for language first.
- `Creations` for media and software first.
- `Tags` as the cross-section.

That keeps the information architecture simple while still giving each format room to breathe.

## The technical constraint

The site should be almost static by default. Minimal JavaScript, direct links, fast HTML, and an
authoring model that stays sane in Git.

Every post lives in its own folder. That is a small choice, but it matters. Text, cover image,
gallery media, and future assets stay together instead of scattering across the repo.
