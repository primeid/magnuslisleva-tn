import type { AstroComponentFactory } from "astro/runtime/server/index.js";

export interface BaseFrontmatter {
  title: string;
  excerpt: string;
  publishDate: string | Date;
  updatedDate?: string | Date;
  tags?: string[];
  draft?: boolean;
  cover?: string;
  gallery?: string[];
}

export interface TextFrontmatter extends BaseFrontmatter {
  readingTime?: string;
  featured?: boolean;
}

export interface CreationFrontmatter extends BaseFrontmatter {
  creationType: "music" | "podcast" | "video" | "photo" | "app" | "other" | "event";
  externalUrl?: string;
  embedUrl?: string;
  stack?: string[];
}

interface MarkdownModule<T> {
  frontmatter: T;
  Content: AstroComponentFactory;
}

export interface BaseEntry<T extends BaseFrontmatter> {
  id: string;
  slug: string;
  collection: "texts" | "creations";
  data: Omit<T, "publishDate" | "updatedDate" | "tags" | "gallery" | "draft"> & {
    publishDate: Date;
    updatedDate?: Date;
    tags: string[];
    gallery: string[];
    draft: boolean;
  };
  Content: AstroComponentFactory;
}

export type TextEntry = BaseEntry<TextFrontmatter>;
export type CreationEntry = BaseEntry<CreationFrontmatter>;
export type Entry = TextEntry | CreationEntry;

const textModules = import.meta.glob("../content/texts/*.md", {
  eager: true,
}) as Record<string, MarkdownModule<TextFrontmatter>>;

const creationModules = import.meta.glob("../content/creations/*.md", {
  eager: true,
}) as Record<string, MarkdownModule<CreationFrontmatter>>;

function toDate(value: string | Date | undefined) {
  return value ? new Date(value) : undefined;
}

function getSlugFromPath(path: string) {
  return path.split("/").pop()?.replace(/\.md$/, "") ?? path;
}

function normalizeEntry<T extends BaseFrontmatter>(
  path: string,
  collection: "texts" | "creations",
  mod: MarkdownModule<T>,
): BaseEntry<T> {
  return {
    id: path,
    slug: getSlugFromPath(path),
    collection,
    Content: mod.Content,
    data: {
      ...mod.frontmatter,
      publishDate: new Date(mod.frontmatter.publishDate),
      updatedDate: toDate(mod.frontmatter.updatedDate),
      tags: mod.frontmatter.tags ?? [],
      gallery: mod.frontmatter.gallery ?? [],
      draft: mod.frontmatter.draft ?? false,
    },
  };
}

const texts = Object.entries(textModules).map(([path, mod]) =>
  normalizeEntry(path, "texts", mod),
);

const creations = Object.entries(creationModules).map(([path, mod]) =>
  normalizeEntry(path, "creations", mod),
);

export function slugifyTag(tag: string) {
  return tag.trim().toLowerCase().replace(/\s+/g, "-");
}

export function getEntrySlug(entry: Entry) {
  return entry.slug;
}

export function sortByDate<T extends Entry>(entries: T[]) {
  return [...entries].sort(
    (a, b) =>
      new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime(),
  );
}

export function groupEntriesByYear<T extends Entry>(entries: T[]) {
  return sortByDate(entries).reduce<Record<string, T[]>>((groups, entry) => {
    const year = String(new Date(entry.data.publishDate).getFullYear());
    groups[year] ??= [];
    groups[year].push(entry);
    return groups;
  }, {});
}

export function getEntryUrl(entry: Entry) {
  const slug = getEntrySlug(entry);
  return entry.collection === "texts"
    ? `/texts/${slug}/`
    : `/creations/${slug}/`;
}

export function getPublishedTexts() {
  return sortByDate(texts.filter((entry) => !entry.data.draft));
}

export function getPublishedCreations() {
  return sortByDate(creations.filter((entry) => !entry.data.draft));
}

export function getAllPublishedEntries() {
  return sortByDate([...getPublishedTexts(), ...getPublishedCreations()]);
}

export function getUniqueTags(entries: Entry[]) {
  return [...new Set(entries.flatMap((entry) => entry.data.tags))].sort((a, b) =>
    a.localeCompare(b),
  );
}

export function filterByTag<T extends Entry>(entries: T[], tag: string) {
  return entries.filter((entry) => entry.data.tags.includes(tag));
}
