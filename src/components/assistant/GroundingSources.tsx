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
    <div id="grounding-sources-container" className="mt-4 pt-3 border-t border-white/[0.08] space-y-3">
      {/* Search Queries if available */}
      {metadata.webSearchQueries && metadata.webSearchQueries.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#A9A096]">
          <span className="font-medium text-[#C8B79F]">Grounded search:</span>
          {metadata.webSearchQueries.map((query, idx) => (
            <span
              key={idx}
              className="bg-[#0D0C0A] border border-white/[0.08] text-[#F3EDE3] px-2 py-0.5 rounded font-mono text-[11px]"
            >
              &ldquo;{query}&rdquo;
            </span>
          ))}
        </div>
      )}

      {/* Google Maps Places */}
      {mapChunks.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#C8B79F] mb-2 tracking-wide uppercase">
            <MapPin className="w-3.5 h-3.5 text-[#C8B79F]" />
            <span>Google Maps Grounded Locations</span>
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
                  className="group relative flex flex-col justify-between p-3.5 rounded-lg bg-[#0D0C0A] border border-white/[0.08] hover:border-[#C8B79F]/40 transition-all text-left"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h4 className="text-xs font-medium text-[#F3EDE3] group-hover:text-[#C8B79F] transition-colors line-clamp-1">
                        {title}
                      </h4>
                      {onSaveItem && (
                        <button
                          type="button"
                          onClick={() => handleSave('place', title, uri, snippet)}
                          disabled={isSaved || savingUri === uri}
                          className={`p-1 rounded transition-colors ${
                            isSaved
                              ? 'text-[#C8B79F] bg-white/[0.08]'
                              : 'text-[#A9A096] hover:text-[#F3EDE3] hover:bg-white/[0.04]'
                          }`}
                          title={isSaved ? 'Saved to bookmarks' : 'Save place'}
                        >
                          {isSaved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                        </button>
                      )}
                    </div>

                    {snippet && (
                      <p className="text-[11px] text-[#A9A096] line-clamp-2 leading-relaxed mb-2 italic font-light">
                        &ldquo;{snippet}&rdquo;
                      </p>
                    )}
                  </div>

                  <div className="mt-2 flex items-center justify-between pt-2 border-t border-white/[0.06] text-[11px]">
                    <span className="flex items-center gap-1 text-[#C8B79F] font-medium text-[10px] uppercase tracking-wider">
                      <Star className="w-3 h-3 text-[#C8B79F] fill-[#C8B79F]" />
                      Maps Place
                    </span>
                    <a
                      href={uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#C8B79F] hover:text-[#F3EDE3] font-medium transition-colors"
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
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#C8B79F] mb-2 tracking-wide uppercase">
            <Globe className="w-3.5 h-3.5 text-[#C8B79F]" />
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
                  className="inline-flex items-center gap-2 max-w-full text-xs bg-[#0D0C0A] border border-white/[0.08] rounded-lg px-3 py-1.5 text-[#F3EDE3] hover:border-[#C8B79F]/40 transition-colors"
                >
                  <a
                    href={uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate max-w-[220px] sm:max-w-xs text-[#C8B79F] hover:text-[#F3EDE3] font-medium flex items-center gap-1.5 transition-colors"
                    title={title}
                  >
                    <span className="truncate">{title}</span>
                    <ExternalLink className="w-3 h-3 shrink-0 text-[#C8B79F]" />
                  </a>

                  {onSaveItem && (
                    <button
                      type="button"
                      onClick={() => handleSave('web', title, uri)}
                      disabled={isSaved || savingUri === uri}
                      className={`p-0.5 rounded transition-colors ${
                        isSaved
                          ? 'text-[#C8B79F]'
                          : 'text-[#A9A096] hover:text-[#F3EDE3]'
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
