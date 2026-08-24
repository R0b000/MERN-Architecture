import React from 'react';

interface LanguageItem {
  name: string;
  rating: string;
}

interface LanguagesProps {
  languages: {
    programming: LanguageItem[];
    spoken: LanguageItem[];
  };
}

export const Languages: React.FC<LanguagesProps> = ({ languages }) => {
  return (
    <section className="relative py-24 md:py-32 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="reveal flex items-center gap-4 mb-12">
          <span className="text-white/40 text-sm">02.5 //</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">LANGUAGES</h2>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="reveal">
            <div className="text-xs text-white/40 mb-6">// programming_languages</div>
            <div className="space-y-3">
              {languages.programming.map((lang, idx) => (
                <div key={idx} className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-white/40 text-xs">0{idx + 1}</span>
                    <span className="font-medium">{lang.name}</span>
                  </div>
                  <span className="text-xs text-white/40">{lang.rating}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal">
            <div className="text-xs text-white/40 mb-6">// spoken_languages</div>
            <div className="space-y-3">
              {languages.spoken.map((lang, idx) => (
                <div key={idx} className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-white/40 text-xs">0{idx + 1}</span>
                    <span className="font-medium">{lang.name}</span>
                  </div>
                  <span className="text-xs text-white/40">{lang.rating}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 code-block p-5">
              <div className="text-xs text-white/40 mb-3">$ echo "Hello World" in all languages</div>
              <pre className="text-xs text-white/80 leading-relaxed">{`नमस्ते  →  Nepali
Hello    →  English
नमस्ते   →  Hindi
console.log("Hello World");`}</pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Languages;
