import React, { useState, useEffect } from 'react';
import { Camera, Upload, Crown, Sparkles, MapPin, ExternalLink, Heart, MessageCircle } from 'lucide-react';
import { UploadedAsset, getStoredAssets, setCustomBrandLogo } from '../utils/mediaStore';

interface LookbookSectionProps {
  onOpenUpload: () => void;
}

export const LookbookSection: React.FC<LookbookSectionProps> = ({ onOpenUpload }) => {
  const [assets, setAssets] = useState<UploadedAsset[]>([]);
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [activePreview, setActivePreview] = useState<UploadedAsset | null>(null);

  useEffect(() => {
    setAssets(getStoredAssets());
  }, []);

  useEffect(() => {
    const handleUpdate = () => {
      setAssets(getStoredAssets());
    };
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('mw_logo_updated', handleUpdate);
    window.addEventListener('mw_hero_updated', handleUpdate);
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('mw_logo_updated', handleUpdate);
      window.removeEventListener('mw_hero_updated', handleUpdate);
    };
  }, []);

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleQuickSetLogo = (asset: UploadedAsset, e: React.MouseEvent) => {
    e.stopPropagation();
    setCustomBrandLogo(asset.dataUrl);
    window.dispatchEvent(new Event('mw_logo_updated'));
  };

  return (
    <section id="lookbook" className="py-16 sm:py-20 bg-neutral-950 text-white border-t border-neutral-800 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(217,119,6,0.12),rgba(10,10,10,0.95))]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/10 border border-amber-400/30 rounded-full text-[11px] font-mono text-amber-300">
              <Camera className="w-3.5 h-3.5 text-amber-400" />
              <span>COMMUNITY LOOKBOOK &amp; UPLOAD GALLERY</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight uppercase">
              Brand Archive &amp; <span className="text-amber-400">Street Fits</span>
            </h2>
            
            <p className="text-sm text-neutral-400 max-w-xl font-normal">
              Customer shots, authentic factory drops, and community uploads. Upload your photos to preview them across the official store.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 bg-neutral-900 px-3 py-2 rounded-lg border border-neutral-800">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Office &amp; Factory: Ajmer, Rajasthan, India</span>
            </div>

            <button
              onClick={onOpenUpload}
              className="py-2.5 px-5 bg-amber-400 hover:bg-amber-300 active:scale-95 text-black font-mono font-bold text-xs rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-amber-400/10 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Your Photo</span>
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {assets.slice(0, 8).map((asset) => {
            const isLiked = likedIds.includes(asset.id);
            return (
              <div
                key={asset.id}
                onClick={() => setActivePreview(asset)}
                className="group relative bg-neutral-900 border border-neutral-800 hover:border-amber-400/60 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col"
              >
                {/* Visual Area */}
                <div className="relative aspect-square w-full bg-neutral-950 flex items-center justify-center p-2 overflow-hidden">
                  <img
                    src={asset.dataUrl}
                    alt={asset.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Top quick badges */}
                  <div className="absolute top-2.5 left-2.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/80 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                      {asset.category || 'Drop'}
                    </span>
                  </div>

                  {/* Like button */}
                  <button
                    onClick={(e) => toggleLike(asset.id, e)}
                    className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-md transition-colors"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
                  </button>

                  {/* Hover action bar */}
                  <div className="absolute bottom-2 inset-x-2 flex items-center justify-between gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => handleQuickSetLogo(asset, e)}
                      className="px-2 py-1 bg-amber-400 text-black text-[10px] font-mono font-bold rounded flex items-center gap-1 hover:bg-amber-300 transition-colors shadow"
                      title="Set as website brand logo"
                    >
                      <Crown className="w-3 h-3" />
                      Set as Logo
                    </button>

                    <a
                      href={`https://wa.me/919461650052?text=${encodeURIComponent(`Hi Moose Wala! I loved this design from the lookbook: "${asset.name}". How can I order this custom apparel from Ajmer factory?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 bg-emerald-600 text-white rounded hover:bg-emerald-500 transition-colors"
                      title="Order on WhatsApp"
                    >
                      <MessageCircle className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Info Caption */}
                <div className="p-3 bg-neutral-900/90 border-t border-neutral-800">
                  <h4 className="text-xs font-bold text-white truncate" title={asset.name}>
                    {asset.name}
                  </h4>
                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 mt-1">
                    <span>Ajmer Studio Drop</span>
                    <span className="text-amber-400">Moose Wala</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Upload Banner Card */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-850 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-400 text-black flex items-center justify-center shrink-0 font-bold">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Have custom photos or artwork for Moose Wala apparel?
              </h3>
              <p className="text-xs text-neutral-400 font-mono mt-0.5">
                Upload your image to test it on the website, set as logo, or direct-order with custom printing from our Ajmer factory.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenUpload}
            className="py-3 px-6 bg-white hover:bg-neutral-200 text-black font-mono font-bold text-xs rounded-xl transition-colors shrink-0 shadow-lg cursor-pointer"
          >
            Open Image Studio
          </button>
        </div>

      </div>

      {/* Fullscreen Preview Lightbox */}
      {activePreview && (
        <div 
          onClick={() => setActivePreview(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-2xl w-full overflow-hidden p-6 space-y-4 shadow-2xl text-white"
          >
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div>
                <h3 className="text-sm font-bold">{activePreview.name}</h3>
                <span className="text-[10px] font-mono text-neutral-400">Office &amp; Factory: Ajmer, Rajasthan, India</span>
              </div>
              <button 
                onClick={() => setActivePreview(null)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg bg-neutral-800"
              >
                ✕
              </button>
            </div>

            <div className="aspect-square max-h-[60vh] w-full flex items-center justify-center bg-black/60 rounded-xl overflow-hidden p-4">
              <img src={activePreview.dataUrl} alt={activePreview.name} className="w-full h-full object-contain" />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={() => {
                  setCustomBrandLogo(activePreview.dataUrl);
                  window.dispatchEvent(new Event('mw_logo_updated'));
                  setActivePreview(null);
                }}
                className="py-2 px-4 bg-amber-400 hover:bg-amber-300 text-black rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Crown className="w-4 h-4" />
                Set this as Official Website Brand Logo
              </button>

              <a
                href={`https://wa.me/919461650052?text=${encodeURIComponent(`Hi Moose Wala team! I want to order merchandise with design: "${activePreview.name}". Please confirm Ajmer factory production timeline.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-mono font-bold flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Concierge
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
