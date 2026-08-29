import Fuse from 'fuse.js';
import { PAKISTAN_LAWS_LIBRARY } from '../data/lawsData';
import { LawEntry, LanguageCode } from '../types';

export function findMatchingLaw(userQuery: string, currentLang: LanguageCode): LawEntry[] {
  const query = userQuery.trim().toLowerCase();
  if (!query) return PAKISTAN_LAWS_LIBRARY;

  // Prepare searchable records
  const searchRecords = PAKISTAN_LAWS_LIBRARY.map((entry) => {
    const allKeywords = [
      ...entry.keywords.ur,
      ...entry.keywords.sd,
      ...entry.keywords.pa,
      ...entry.keywords.ps,
      ...entry.keywords.en,
    ].join(' ');

    const categoryText = `${entry.category.ur} ${entry.category.sd} ${entry.category.pa} ${entry.category.ps} ${entry.category.en}`;
    const lawNameText = `${entry.lawName.ur} ${entry.lawName.sd} ${entry.lawName.pa} ${entry.lawName.ps} ${entry.lawName.en}`;
    const explanationText = `${entry.simpleExplanation.ur} ${entry.simpleExplanation.sd} ${entry.simpleExplanation.pa} ${entry.simpleExplanation.ps} ${entry.simpleExplanation.en}`;

    return {
      lawEntry: entry,
      searchableText: `${allKeywords} ${categoryText} ${lawNameText} ${explanationText}`.toLowerCase(),
    };
  });

  const fuse = new Fuse(searchRecords, {
    keys: ['searchableText'],
    threshold: 0.4,
    ignoreLocation: true,
    minMatchCharLength: 2,
  });

  const results = fuse.search(query);

  if (results.length > 0) {
    return results.map((r) => r.item.lawEntry);
  }

  // Fallback: simple token overlap
  const tokens = query.split(/\s+/).filter((t) => t.length >= 2);
  const scored = searchRecords.map((rec) => {
    let matchCount = 0;
    for (const token of tokens) {
      if (rec.searchableText.includes(token)) {
        matchCount++;
      }
    }
    return { entry: rec.lawEntry, score: matchCount };
  });

  scored.sort((a, b) => b.score - a.score);
  const filtered = scored.filter((s) => s.score > 0).map((s) => s.entry);

  return filtered.length > 0 ? filtered : PAKISTAN_LAWS_LIBRARY.slice(0, 3);
}
