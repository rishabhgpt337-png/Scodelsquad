"use client";

import { useState } from 'react';
import { MapPin, ExternalLink, Bookmark, Check, Globe, Star } from 'lucide-react';
import { GroundingMetadata, SavedItem } from '@/types/assistant';

interface GroundingSourcesProps {
  metadata?: GroundingMetadata | null;
  onSaveItem?: (item: Omit<SavedItem, 'id' | 'savedAt' | 'userId'>) => Promise<void>;
  savedUrls?: Set<string>;
}

export default function GroundingSources({
  metadata,
  onSaveItem,
  savedUrls = new Set(),
}: GroundingSourcesProps) {
  const [savingUri, setSavingUri] = useState<string | null>(null);

  if (!metadata || !metadata.groundingChunks || metadata.groundingChunks.length === 0) {
    return null;
  }

  // Filter chunks
  const mapChunks = metadata.groundingChunks.filter((c) => c.maps && (c.maps.uri || c.maps.title));
  const webChunks = metadata.groundingChunks.filter((c) => c.web && (c.web.uri || c.web.title));

  if (mapChunks.length === 0 && webChunks.length === 0) {
    return null;
  }

  const handleSave = async (
    type: 'place' | 'web',
    title: string,
    uri: string,
    snippet?: string
  ) => {
    if (!onSaveItem) return;
    setSavingUri(uri);
    try {
      await onSaveItem({
        type,
        title: title || (type === 'place' ? 'Google Maps Place' : 'Web Resource'),
        uri,
        snippet: snippet || '',
      });
    } catch (err) {
      console.error('Failed to save item:', err);
    } finally {
      setSavingUri(null);
    }
  };

  return (
    <div id="grounding-sources-container" className="mt-4 pt-3 border-t border-stone-200/80 space-y-3">
      {/* Search Queries if available */}
      {metadata.webSearchQueries && metadata.webSearchQueries.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-500">
          <span className="font-medium text-stone-600">Grounded search:</span>
          {metadata.webSearchQueries.map((query, idx) => (
            <span
              key={idx}
              className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md font-mono text-[11px]"
            >
              &ldquo;{query}&rdquo;
            </span>
          ))}
        </div>
      )}

      {/* Google Maps Places */}
      {mapChunks.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 mb-2">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>Google Maps Grounded Places</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {mapChunks.map((chunk, idx) => {
              const place = chunk.maps!;
              const uri = place.uri || '#';
              const title = place.title || 'Location details';
              const snippet = place.placeAnswerSources?.reviewSnippets?.[0]?.snippetText;
              const isSaved = savedUrls.has(uri);

              return (
                <div
                  key={idx}
                  id={`maps-place-${idx}`}
                  className="group relative flex flex-col justify-between p-3 rounded-xl bg-emerald-50/40 border border-emerald-200/80 hover:border-emerald-300 transition-all text-left shadow-2xs"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-xs font-semibold text-stone-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                        {title}
                      </h4>
                      {onSaveItem && (
                        <button
                          type="button"
                          onClick={() => handleSave('place', title, uri, snippet)}
                          disabled={isSaved || savingUri === uri}
                          className={`p-1 rounded-md transition-colors ${
                            isSaved
                              ? 'text-emerald-600 bg-emerald-100'
                              : 'text-stone-400 hover:text-emerald-700 hover:bg-emerald-100/60'
                          }`}
                          title={isSaved ? 'Saved to bookmarks' : 'Save place'}
                        >
                          {isSaved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                        </button>
                      )}
                    </div>

                    {snippet && (
                      <p className="text-[11px] text-stone-600 line-clamp-2 leading-relaxed mb-2 italic">
                        &ldquo;{snippet}&rdquo;
                      </p>
                    )}
                  </div>

                  <div className="mt-2 flex items-center justify-between pt-1 border-t border-emerald-200/50 text-[11px]">
                    <span className="flex items-center gap-1 text-emerald-700 font-medium">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      Maps Place
                    </span>
                    <a
                      href={uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 hover:underline font-medium"
                    >
                      <span>View in Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Google Search Web Sources */}
      {webChunks.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-800 mb-2">
            <Globe className="w-3.5 h-3.5 text-sky-600" />
            <span>Google Search Sources &amp; Citations</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {webChunks.map((chunk, idx) => {
              const web = chunk.web!;
              const uri = web.uri || '#';
              const title = web.title || uri;
              const isSaved = savedUrls.has(uri);

              return (
                <div
                  key={idx}
                  id={`web-source-${idx}`}
                  className="inline-flex items-center gap-2 max-w-full text-xs bg-sky-50/70 border border-sky-200/80 rounded-lg px-2.5 py-1 text-stone-700 hover:border-sky-300 transition-colors"
                >
                  <a
                    href={uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate max-w-[220px] sm:max-w-xs hover:text-sky-800 hover:underline font-medium flex items-center gap-1.5"
                    title={title}
                  >
                    <span>{title}</span>
                    <ExternalLink className="w-3 h-3 shrink-0 text-sky-600" />
                  </a>

                  {onSaveItem && (
                    <button
                      type="button"
                      onClick={() => handleSave('web', title, uri)}
                      disabled={isSaved || savingUri === uri}
                      className={`p-0.5 rounded transition-colors ${
                        isSaved
                          ? 'text-sky-600'
                          : 'text-stone-400 hover:text-sky-700'
                      }`}
                      title={isSaved ? 'Saved to bookmarks' : 'Save bookmark'}
                    >
                      {isSaved ? <Check className="w-3 h-3" /> : <Bookmark className="w-3 h-3" />}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

