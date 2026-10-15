import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Upload, Image as ImageIcon, Check, Trash2, Crown, 
  ExternalLink, Sparkles, MessageCircle, AlertCircle, RefreshCw, Layers
} from 'lucide-react';
import { 
  UploadedAsset, 
  getStoredAssets, 
  saveStoredAssets, 
  getCustomBrandLogo, 
  setCustomBrandLogo, 
  getCustomHeroImage, 
  setCustomHeroImage, 
  addProductCustomImage 
} from '../utils/mediaStore';
import { PRODUCTS } from '../data/products';

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProductImage?: (productId: string, imageUrl: string) => void;
  initialProductId?: string;
}

export const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  isOpen,
  onClose,
  onSelectProductImage,
  initialProductId,
}) => {
  const [assets, setAssets] = useState<UploadedAsset[]>([]);
  const [activeTab, setActiveTab] = useState<'upload' | 'gallery'>('upload');
  const [currentLogo, setCurrentLogo] = useState<string | null>(null);
  const [currentHero, setCurrentHero] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadFeedback, setUploadFeedback] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string>(initialProductId || PRODUCTS[0].id);
  
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync state on open
  useEffect(() => {
    if (isOpen) {
      setAssets(getStoredAssets());
      setCurrentLogo(getCustomBrandLogo());
      setCurrentHero(getCustomHeroImage());
      if (initialProductId) {
        setSelectedProductId(initialProductId);
      }
    }
  }, [isOpen, initialProductId]);

  if (!isOpen) return null;

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newAssets: UploadedAsset[] = [];
    let processed = 0;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        setUploadFeedback('Please upload only image files (PNG, JPG, WEBP, SVG).');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          const newAsset: UploadedAsset = {
            id: `upload-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
            name: file.name.replace(/\.[^/.]+$/, ''),
            dataUrl: result,
            sizeBytes: file.size,
            uploadedAt: Date.now(),
            role: 'product',
            targetProductId: selectedProductId,
            category: 'Uploaded Photo',
          };
          newAssets.push(newAsset);
        }

        processed++;
        if (processed === files.length) {
          const updated = [...newAssets, ...assets];
          setAssets(updated);
          saveStoredAssets(updated);
          setActiveTab('gallery');
          setUploadFeedback(`Successfully uploaded ${newAssets.length} image(s)!`);
          setTimeout(() => setUploadFeedback(null), 3500);

          // If assigned to a product, also add to product images
          if (newAssets.length > 0 && selectedProductId) {
            addProductCustomImage(selectedProductId, newAssets[0].dataUrl);
            if (onSelectProductImage) {
              onSelectProductImage(selectedProductId, newAssets[0].dataUrl);
            }
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleSetAsBrandLogo = (asset: UploadedAsset) => {
    setCustomBrandLogo(asset.dataUrl);
    setCurrentLogo(asset.dataUrl);
    window.dispatchEvent(new Event('mw_logo_updated'));
    setUploadFeedback(`Brand logo updated to "${asset.name}"!`);
    setTimeout(() => setUploadFeedback(null), 3000);
  };

  const handleResetBrandLogo = () => {
    setCustomBrandLogo(null);
    setCurrentLogo(null);
    window.dispatchEvent(new Event('mw_logo_updated'));
    setUploadFeedback('Reset brand logo to default Moose Wala Crown Monogram.');
    setTimeout(() => setUploadFeedback(null), 3000);
  };

  const handleSetAsHeroBanner = (asset: UploadedAsset) => {
    setCustomHeroImage(asset.dataUrl);
    setCurrentHero(asset.dataUrl);
    window.dispatchEvent(new Event('mw_hero_updated'));
    setUploadFeedback(`Hero banner updated to "${asset.name}"!`);
    setTimeout(() => setUploadFeedback(null), 3000);
  };

  const handleAssignToProduct = (asset: UploadedAsset, prodId: string) => {
    addProductCustomImage(prodId, asset.dataUrl);
    if (onSelectProductImage) {
      onSelectProductImage(prodId, asset.dataUrl);
    }
    const prod = PRODUCTS.find(p => p.id === prodId);
    setUploadFeedback(`Attached image to "${prod?.title || prodId}"!`);
    setTimeout(() => setUploadFeedback(null), 3000);
  };

  const handleDeleteAsset = (id: string) => {
    const asset = assets.find(a => a.id === id);
    if (asset && currentLogo === asset.dataUrl) {
      handleResetBrandLogo();
    }
    if (asset && currentHero === asset.dataUrl) {
      setCustomHeroImage(null);
      setCurrentHero(null);
      window.dispatchEvent(new Event('mw_hero_updated'));
    }
    const updated = assets.filter(a => a.id !== id);
    setAssets(updated);
    saveStoredAssets(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#111317] border border-neutral-800 text-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-black flex items-center justify-center font-bold">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-serif-luxury font-bold tracking-tight text-white">
                  Moose Wala Brand Asset &amp; Image Studio
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Ajmer Factory Live
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Upload photos to update the Brand Logo, Hero Showcase, or attach custom prints to garments.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feedback Alert */}
        {uploadFeedback && (
          <div className="px-6 py-2.5 bg-amber-500/10 border-b border-amber-500/30 text-amber-300 text-xs font-mono flex items-center gap-2">
            <Sparkles className="w-4 h-4 shrink-0 text-amber-400 animate-spin" />
            <span>{uploadFeedback}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="px-6 pt-3 border-b border-neutral-800 flex items-center gap-4 bg-[#0d0e12]">
          <button
            onClick={() => setActiveTab('upload')}
            className={`pb-3 text-xs font-mono tracking-wider uppercase border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'upload'
                ? 'border-amber-400 text-amber-300 font-bold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            Upload New Images
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`pb-3 text-xs font-mono tracking-wider uppercase border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'gallery'
                ? 'border-amber-400 text-amber-300 font-bold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Media Library ({assets.length})
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'upload' ? (
            <div className="space-y-6">
              
              {/* Target Product Selection */}
              <div className="p-4 bg-neutral-900/60 rounded-xl border border-neutral-800 space-y-2">
                <label className="text-xs font-mono text-neutral-300 block">
                  Select Target Apparel / Destination for Upload:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <select
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="">None (General Brand Gallery)</option>
                    {PRODUCTS.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.title} (₹{p.price})
                      </option>
                    ))}
                  </select>

                  <div className="text-[11px] font-mono text-neutral-400 flex items-center gap-1.5 bg-neutral-950/60 px-3 py-2 rounded-lg border border-neutral-800">
                    <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Uploads can also be set as the official Website Brand Logo anytime!</span>
                  </div>
                </div>
              </div>

              {/* Drag and Drop Upload Zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-4 ${
                  isDragging
                    ? 'border-amber-400 bg-amber-400/10 scale-[1.01]'
                    : 'border-neutral-700 hover:border-amber-400/70 bg-neutral-900/40 hover:bg-neutral-900/80'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/png,image/jpeg,image/webp,image/svg+xml"
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />

                <div className="w-16 h-16 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 flex items-center justify-center">
                  <ImageIcon className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <p className="text-base font-bold text-white">
                    Click to browse or drag and drop your photos here
                  </p>
                  <p className="text-xs text-neutral-400 font-mono">
                    Supports PNG, JPG, JPEG, WEBP or SVG (Multi-file upload enabled)
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400 text-black rounded-lg text-xs font-mono font-bold hover:bg-amber-300 transition-colors shadow-lg">
                  <Upload className="w-4 h-4" />
                  Choose Files from Device
                </div>
              </div>

              {/* Quick instructions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono text-neutral-400">
                <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800">
                  <span className="text-amber-400 font-bold block mb-1">1. Brand Logo:</span>
                  Set any uploaded image as the official Moose Wala website logo.
                </div>
                <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800">
                  <span className="text-amber-400 font-bold block mb-1">2. Product Fits:</span>
                  Attach photos to Bai Thaapi, Hoodies, Varsity Jackets &amp; Tracksuits.
                </div>
                <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800">
                  <span className="text-amber-400 font-bold block mb-1">3. WhatsApp Orders:</span>
                  Send custom apparel inquiry to 9461650052 with your uploaded design.
                </div>
              </div>

            </div>
          ) : (
            /* Gallery Tab */
            <div className="space-y-6">
              
              {/* Active Brand Logo Status Bar */}
              <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-neutral-900 border border-neutral-700 overflow-hidden flex items-center justify-center shrink-0">
                    {currentLogo ? (
                      <img src={currentLogo} alt="Current Brand Logo" className="w-full h-full object-contain p-1" />
                    ) : (
                      <Crown className="w-6 h-6 text-amber-400" />
                    )}
                  </div>
                  <div>
                    <span className="text-xs font-mono text-neutral-400 block">Current Website Brand Logo</span>
                    <span className="text-sm font-bold text-white">
                      {currentLogo ? 'Custom Uploaded Logo Active' : 'Default Royal Moose Wala Crown Emblem'}
                    </span>
                  </div>
                </div>

                {currentLogo && (
                  <button
                    onClick={handleResetBrandLogo}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg text-xs font-mono transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Reset to Default Logo
                  </button>
                )}
              </div>

              {/* Grid of All Assets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {assets.map((asset) => {
                  const isCurrentLogo = currentLogo === asset.dataUrl;
                  const isCurrentHero = currentHero === asset.dataUrl;

                  return (
                    <div
                      key={asset.id}
                      className="group bg-neutral-950 border border-neutral-800 hover:border-neutral-700 rounded-xl overflow-hidden flex flex-col transition-all shadow-md"
                    >
                      {/* Image Preview Box */}
                      <div className="relative aspect-square w-full bg-neutral-900 flex items-center justify-center overflow-hidden p-3 border-b border-neutral-800/80">
                        <img
                          src={asset.dataUrl}
                          alt={asset.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* Badges */}
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                          {isCurrentLogo && (
                            <span className="bg-amber-500 text-black font-mono font-bold text-[10px] px-2 py-0.5 rounded shadow-md flex items-center gap-1">
                              <Crown className="w-3 h-3" /> Active Logo
                            </span>
                          )}
                          {isCurrentHero && (
                            <span className="bg-blue-500 text-white font-mono font-bold text-[10px] px-2 py-0.5 rounded shadow-md">
                              Active Hero
                            </span>
                          )}
                        </div>

                        {/* Delete button */}
                        <button
                          onClick={() => handleDeleteAsset(asset.id)}
                          className="absolute top-2 right-2 p-1.5 bg-neutral-900/80 hover:bg-red-950 text-neutral-400 hover:text-red-400 rounded-md transition-colors"
                          title="Remove image"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Card Info & Quick Actions */}
                      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <h4 className="text-xs font-bold text-white truncate" title={asset.name}>
                            {asset.name}
                          </h4>
                          <span className="text-[10px] font-mono text-neutral-500 block">
                            {asset.category || 'Asset'}
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-1.5 pt-2 border-t border-neutral-800">
                          
                          {/* 1. Set as Logo */}
                          <button
                            onClick={() => handleSetAsBrandLogo(asset)}
                            className={`w-full py-1.5 px-2.5 rounded text-[11px] font-mono font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                              isCurrentLogo
                                ? 'bg-amber-400 text-black'
                                : 'bg-neutral-800 hover:bg-neutral-700 text-amber-300'
                            }`}
                          >
                            <Crown className="w-3 h-3" />
                            {isCurrentLogo ? 'Current Brand Logo' : 'Set as Brand Logo'}
                          </button>

                          {/* 2. Attach to Product Dropdown / Button */}
                          <button
                            onClick={() => handleAssignToProduct(asset, selectedProductId || PRODUCTS[0].id)}
                            className="w-full py-1.5 px-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 rounded text-[11px] font-mono flex items-center justify-center gap-1.5 border border-neutral-700 cursor-pointer"
                          >
                            <Layers className="w-3 h-3 text-neutral-400" />
                            Assign to Current Apparel
                          </button>

                          {/* 3. Pre-fill WhatsApp Custom Order */}
                          <a
                            href={`https://wa.me/919461650052?text=${encodeURIComponent(`Hi Moose Wala team! I want to place a custom order with this design: "${asset.name}". Please confirm fabric & printing pricing for Ajmer factory.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-1 px-2 text-neutral-400 hover:text-emerald-400 text-[10px] font-mono flex items-center justify-center gap-1 transition-colors"
                          >
                            <MessageCircle className="w-3 h-3 text-emerald-500" />
                            Order Custom Print on WhatsApp
                          </a>

                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 border-t border-neutral-800 bg-neutral-950 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] font-mono text-neutral-500 flex items-center gap-2">
            <span>Office &amp; Factory: Ajmer, Rajasthan, India</span>
            <span>·</span>
            <span>Support: +91 9461650052 / 9928359313</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab(activeTab === 'upload' ? 'gallery' : 'upload')}
              className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg text-xs font-mono transition-colors cursor-pointer"
            >
              {activeTab === 'upload' ? 'View Uploaded Gallery' : 'Upload More Files'}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-amber-400 hover:bg-amber-300 text-black font-bold rounded-lg text-xs font-mono transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
