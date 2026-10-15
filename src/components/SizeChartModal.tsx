import React, { useState } from 'react';
import { X, Ruler, CheckCircle2 } from 'lucide-react';

interface SizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  productTitle: string;
}

export const SizeChartModal: React.FC<SizeChartModalProps> = ({
  isOpen,
  onClose,
  productTitle,
}) => {
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!isOpen) return null;

  const measurements = [
    { size: 'XS', chestIn: '40', chestCm: '101.6', lengthIn: '28', lengthCm: '71.1', shoulderIn: '20', shoulderCm: '50.8' },
    { size: 'S', chestIn: '42', chestCm: '106.7', lengthIn: '29', lengthCm: '73.7', shoulderIn: '21', shoulderCm: '53.3' },
    { size: 'M', chestIn: '44', chestCm: '111.8', lengthIn: '30', lengthCm: '76.2', shoulderIn: '22', shoulderCm: '55.9' },
    { size: 'L', chestIn: '46', chestCm: '116.8', lengthIn: '31', lengthCm: '78.7', shoulderIn: '23', shoulderCm: '58.4' },
    { size: 'XL', chestIn: '48', chestCm: '121.9', lengthIn: '32', lengthCm: '81.3', shoulderIn: '24', shoulderCm: '61.0' },
    { size: 'XXL', chestIn: '50', chestCm: '127.0', lengthIn: '33', lengthCm: '83.8', shoulderIn: '25', shoulderCm: '63.5' },
    { size: 'XXXL', chestIn: '52', chestCm: '132.1', lengthIn: '34', lengthCm: '86.4', shoulderIn: '26', shoulderCm: '66.0' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-xl w-full p-6 sm:p-8 z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-neutral-100 rounded-md">
              <Ruler className="w-5 h-5 text-neutral-800" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-900 leading-tight">Size & Fit Guide</h3>
              <p className="text-xs text-neutral-500 font-mono mt-0.5">{productTitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-black rounded-md hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Unit Selector Toggle */}
        <div className="flex items-center justify-between mt-5 mb-4">
          <span className="text-xs font-medium text-neutral-600">
            Garment Dimensions (All Sizes)
          </span>

          <div className="flex items-center p-1 bg-neutral-100 rounded-lg text-xs font-mono">
            <button
              onClick={() => setUnit('inches')}
              className={`px-3 py-1 rounded transition-colors ${
                unit === 'inches' ? 'bg-white text-black font-bold shadow-xs' : 'text-neutral-500 hover:text-black'
              }`}
            >
              Inches (in)
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 rounded transition-colors ${
                unit === 'cm' ? 'bg-white text-black font-bold shadow-xs' : 'text-neutral-500 hover:text-black'
              }`}
            >
              Centimeters (cm)
            </button>
          </div>
        </div>

        {/* Sizing Table */}
        <div className="overflow-x-auto border border-neutral-200 rounded-lg">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-mono text-[11px] uppercase">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Size</th>
                <th className="py-2.5 px-3 font-semibold">Chest</th>
                <th className="py-2.5 px-3 font-semibold">Length</th>
                <th className="py-2.5 px-3 font-semibold">Shoulder</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-mono tabular-nums">
              {measurements.map((row) => (
                <tr 
                  key={row.size} 
                  className={`hover:bg-neutral-50/80 transition-colors ${
                    row.size === 'XXXL' ? 'text-neutral-400 bg-neutral-50/40' : 'text-neutral-800'
                  }`}
                >
                  <td className="py-2.5 px-3 font-bold text-neutral-900">
                    {row.size}
                    {row.size === 'XXXL' && <span className="ml-1.5 text-[10px] text-red-500 font-normal">Sold Out</span>}
                  </td>
                  <td className="py-2.5 px-3">{unit === 'inches' ? `${row.chestIn}"` : `${row.chestCm} cm`}</td>
                  <td className="py-2.5 px-3">{unit === 'inches' ? `${row.lengthIn}"` : `${row.lengthCm} cm`}</td>
                  <td className="py-2.5 px-3">{unit === 'inches' ? `${row.shoulderIn}"` : `${row.shoulderCm} cm`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fit Tip / Notes */}
        <div className="mt-5 p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 space-y-2">
          <div className="flex items-start gap-2 text-xs text-neutral-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Fit Advice:</strong> Designed with a boxy, dropped-shoulder silhouette. Order your normal size for the signature luxury streetwear drape, or size down by one for a closer tailored fit.
            </span>
          </div>
          <div className="text-[11px] text-neutral-500 font-mono">
            Model in editorial photos is 6'1" (185 cm) wearing size Large.
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
          >
            Done · Return to Product
          </button>
        </div>
      </div>
    </div>
  );
};
