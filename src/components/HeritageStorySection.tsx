import React from 'react';
import { Quote, Star, ShieldCheck, MapPin } from 'lucide-react';

export const HeritageStorySection: React.FC = () => {
  const reviews = [
    {
      id: 'rev-1',
      name: 'Harmanpreet S.',
      location: 'Mohali, Punjab',
      product: 'Sidhu Moose Wala Bai Thaapi T-shirt (Size L)',
      rating: 5,
      comment: 'The premium heavyweight fabric thickness is unreal. The baroque lion print on the back has crisp raised details and zero fading after 5 cold washes. Authentic Sidhu Moose Wala energy.',
    },
    {
      id: 'rev-2',
      name: 'Manraj Brar',
      location: 'Brampton, Canada / Mansa',
      product: 'Undercover Varsity Bomber Jacket',
      rating: 5,
      comment: 'The quote embroidery on the leather sleeve gives me goosebumps every time. Heavy melton wool, real premium camel leather, and pristine chenille SMW patch.',
    },
    {
      id: 'rev-3',
      name: 'Simranjeet Kaur',
      location: 'New Delhi, India',
      product: 'Heritage Gurmukhi Lohi Shawl',
      rating: 5,
      comment: 'Warm, soft brushed pure wool with reflective Gurmukhi calligraphy. It pairs effortlessly with both my black streetwear hoodies and ethnic suits.',
    },
  ];

  return (
    <section className="bg-neutral-950 text-white py-16 sm:py-24 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heritage Story Quote Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-16 border-b border-neutral-800">
          <div className="lg:col-span-8 space-y-4">
            <div className="text-[11px] font-mono uppercase tracking-widest text-amber-400 flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                Office & Factory: Ajmer, Rajasthan, India
              </span>
              <span className="text-neutral-600">·</span>
              <span>Moose Wala Official Archive</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-black tracking-tight uppercase leading-tight">
              "Never Fold. <br />Never Back Down."
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 max-w-2xl leading-relaxed">
              Constructed at our state-of-the-art manufacturing factory in Ajmer, Rajasthan, India, the official Moose Wala streetwear archive honors Sidhu Moose Wala's fearless voice. Every garment is crafted without compromise: high-density discharge prints, custom-milled loopback textiles, and cultural sovereignty woven into every stitch.
            </p>
          </div>

          <div className="lg:col-span-4 p-6 bg-neutral-900 border border-neutral-800 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-amber-400">
              <ShieldCheck className="w-5 h-5" />
              <span className="font-heading uppercase font-bold text-sm tracking-wider">Archival Certification</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Every drop is numbered and tagged with individual QR authenticity security tokens ensuring genuine collector provenance.
            </p>
            <div className="text-[11px] font-mono text-neutral-400 pt-2 border-t border-neutral-800 space-y-1">
              <div>Verified Moose Wala Official Estate Archive</div>
              <div className="text-amber-400/90 text-[10px]">
                Office & Factory: Ajmer, Rajasthan, India
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews & Street Testimonials */}
        <div className="pt-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight">
              Verified Brotherhood Reviews
            </h3>
            <p className="text-xs text-neutral-400 mt-1 font-mono">
              Over 2,400+ five-star deliveries completed across India & diaspora
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div 
                key={rev.id}
                className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex flex-col justify-between space-y-4 hover:border-neutral-700 transition-colors"
              >
                <div className="space-y-3">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-800 text-xs">
                  <div className="font-bold text-white uppercase font-heading">{rev.name}</div>
                  <div className="flex items-center gap-1 text-[11px] text-neutral-500 font-mono mt-0.5">
                    <MapPin className="w-3 h-3 text-neutral-400" />
                    <span>{rev.location}</span>
                  </div>
                  <div className="text-[10px] text-amber-400/90 font-mono mt-1">
                    Verified Buyer · {rev.product}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
