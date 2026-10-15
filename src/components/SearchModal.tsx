import React, { useState } from 'react';
import { Search, X, ChevronRight } from 'lucide-react';
import { Product, CurrencyCode } from '../types/store';
import { CURRENCIES } from '../data/products';
import { ProductVisual } from './ProductVisual';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  currentCurrency: CurrencyCode;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  currentCurrency,
}) => {
  const [query, setQuery] = useState('');
  const currency = CURRENCIES[currentCurrency];

  if (!isOpen) return null;

  const filtered = query.trim() === '' 
    ? products.slice(0, 4) 
    : products.filter(p => 
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-xl w-full p-5 z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Search Bar Input */}
        <div className="relative flex items-center border-b border-neutral-200 pb-3">
          <Search className="w-5 h-5 text-neutral-400 absolute left-2 pointer-events-none" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Bai Thaapi, 295 Hoodie, SMW Flames, Jackets, Bandana..."
            className="w-full pl-10 pr-10 py-2 text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="absolute right-8 text-neutral-400 hover:text-black p-1 text-xs"
            >
              Clear
            </button>
          ) : null}
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-black rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex items-center gap-1.5 py-3 overflow-x-auto text-[11px] font-mono text-neutral-500 border-b border-neutral-100">
          <span>Popular:</span>
          {['Bai Thaapi', '295 Hoodie', 'SMW Flames', 'Malwa Block', 'Bandana', 'Shawls'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2 py-0.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded transition-colors whitespace-nowrap"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto divide-y divide-neutral-100 mt-2">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-neutral-500 font-mono">
              No streetwear items found matching "{query}".
            </div>
          ) : (
            filtered.map((prod) => {
              const price = (prod.price * currency.rateFromINR).toLocaleString('en-IN', { maximumFractionDigits: 2 });
              return (
                <div
                  key={prod.id}
                  onClick={() => {
                    onSelectProduct(prod);
                    onClose();
                  }}
                  className="py-2.5 px-2 flex items-center justify-between gap-3 hover:bg-neutral-50 rounded-lg cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-14 bg-neutral-900 rounded overflow-hidden shrink-0 border border-neutral-200">
                      <ProductVisual product={prod} size="sm" className="w-full h-full scale-90" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-heading font-black text-xs uppercase text-neutral-900 truncate group-hover:text-amber-700 transition-colors">
                        {prod.title}
                      </h4>
                      <p className="text-[11px] font-mono text-neutral-500">{prod.category} · {currency.symbol} {price}</p>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-black group-hover:translate-x-0.5 transition-transform" />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
