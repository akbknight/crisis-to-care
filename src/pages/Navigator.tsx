import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowLeft, Copy, CheckCircle2, ExternalLink, MapPin, Info, Send, Heart } from 'lucide-react';
import { NAVIGATOR_PATHWAYS } from '../data/mockData';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function Navigator() {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [selectedPathway, setSelectedPathway] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleSelect = (key: string) => {
    setSelectedPathway(key);
    setStep(2);
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const pathway = selectedPathway ? NAVIGATOR_PATHWAYS[selectedPathway as keyof typeof NAVIGATOR_PATHWAYS] : null;

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <header className="space-y-4 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-earth-charcoal leading-tight">
          {t.navigator.title}
        </h1>
        <p className="text-earth-charcoal/70 text-lg leading-relaxed max-w-2xl font-sans">
          {t.navigator.subtitle}
        </p>
      </header>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-serif font-bold text-earth-sage">{t.navigator.helpWith}</h2>
            <div className="grid gap-4">
              {Object.entries(NAVIGATOR_PATHWAYS).map(([key, data]) => (
                <button
                  key={key}
                  onClick={() => handleSelect(key)}
                  className="flex items-center justify-between p-8 bg-white rounded-[2rem] shadow-sm border border-earth-sand/20 hover:border-earth-sage hover:shadow-xl hover:shadow-earth-sage/10 transition-all text-left group"
                >
                  <div className="space-y-1">
                    <span className="font-serif text-2xl text-earth-charcoal group-hover:text-earth-sage transition-colors">{data.title}</span>
                    <p className="text-sm text-earth-charcoal/50 font-medium">{data.description}</p>
                  </div>
                  <div className="w-12 h-12 bg-earth-sage/5 rounded-full flex items-center justify-center group-hover:bg-earth-sage group-hover:text-white transition-all text-earth-sage">
                    <ChevronRight className="w-6 h-6" />
                  </div>
                </button>
              ))}
              <button
                onClick={() => handleSelect('identity')}
                className="flex items-center justify-between p-8 bg-earth-sage/5 rounded-[2rem] shadow-sm border border-earth-sage/20 hover:border-earth-sage hover:shadow-xl transition-all text-left group"
              >
                <div className="space-y-1">
                  <span className="font-serif text-2xl text-earth-sage">Unsure/Overwhelmed by everything</span>
                  <p className="text-sm text-earth-sage/70 font-medium">It's okay not to have a specific category. Let's start with community.</p>
                </div>
                <div className="w-12 h-12 bg-earth-sage/10 rounded-full flex items-center justify-center group-hover:bg-earth-sage group-hover:text-white transition-all text-earth-sage">
                  <ChevronRight className="w-6 h-6" />
                </div>
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && pathway && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-2 text-sm font-bold text-earth-sage hover:gap-3 transition-all uppercase tracking-widest"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.navigator.back}
            </button>

            <div className="glass-card p-8 border-earth-sage/20 bg-earth-sage/5 space-y-2">
              <h2 className="text-3xl font-serif font-bold text-earth-sage">{pathway.title}</h2>
              <p className="text-earth-charcoal/80 font-sans leading-relaxed">"{pathway.description}"</p>
            </div>

            <div className="space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-earth-charcoal/60 ml-1">Recommended AU Resources</h3>

              {pathway.resources.map((resource, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-earth-sand/10 space-y-6 hover:shadow-lg transition-all"
                >
                  <div className="flex justify-between items-start gap-4">
                    <h4 className="text-2xl font-serif font-bold text-earth-sage">{resource.name}</h4>
                    {resource.location && (
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-earth-cream text-earth-sand rounded-full text-[10px] font-bold uppercase tracking-wider border border-earth-sand/10">
                        <MapPin className="w-3 h-3" />
                        {resource.location}
                      </div>
                    )}
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="w-5 h-5 bg-earth-sage/10 text-earth-sage rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                          <Info className="w-3 h-3" />
                        </div>
                        <p className="text-sm text-earth-charcoal/70 leading-relaxed">
                          <span className="font-bold text-earth-charcoal block mb-1 uppercase text-[10px] tracking-widest">What they do</span>
                          {resource.description}
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-5 h-5 bg-earth-sage/10 text-earth-sage rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                          <CheckCircle2 className="w-3 h-3" />
                        </div>
                        <p className="text-sm text-earth-charcoal/70 leading-relaxed">
                          <span className="font-bold text-earth-charcoal block mb-1 uppercase text-[10px] tracking-widest">{t.navigator.expectHeader}</span>
                          {resource.expect}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 justify-end">
                      {resource.link && (
                        <a
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-6 py-4 bg-earth-sage text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-earth-sage/20 transition-all text-sm"
                        >
                          {t.navigator.visitSite} <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {!resource.emailTemplate && !resource.link && (
                        <div className="p-4 bg-earth-cream rounded-2xl text-center text-xs font-bold text-earth-sand uppercase tracking-wider">
                          Walk-in support available
                        </div>
                      )}
                    </div>
                  </div>

                  {resource.emailTemplate && (
                    <div className="space-y-3 pt-6 border-t border-earth-sand/10">
                      <div className="flex justify-between items-center px-1">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-earth-charcoal/40">Empathetic Script Template</span>
                        <button
                          onClick={() => handleCopy(resource.emailTemplate!, index)}
                          className="flex items-center gap-1.5 text-xs font-bold text-earth-sage hover:text-earth-terracotta transition-colors"
                        >
                          {copiedIndex === index ? (
                            <><CheckCircle2 className="w-4 h-4" /> {t.navigator.templateCopied}</>
                          ) : (
                            <><Copy className="w-4 h-4" /> {t.navigator.copyTemplate}</>
                          )}
                        </button>
                      </div>
                      <div className="bg-earth-cream/50 p-6 rounded-2xl text-sm text-earth-charcoal/80 font-sans relative group">
                        <div className="absolute top-4 right-4 text-earth-charcoal/10 group-hover:text-earth-sage/20 transition-colors">
                          <Send className="w-8 h-8 rotate-12" />
                        </div>
                        <div className="whitespace-pre-wrap leading-relaxed italic">
                          {resource.emailTemplate}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="p-10 bg-white rounded-[3rem] border border-earth-sand/10 text-center space-y-6">
              <div className="w-16 h-16 bg-earth-terracotta/10 text-earth-terracotta rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-serif text-earth-charcoal">Still not sure where to start?</h3>
                <p className="text-earth-charcoal/70 font-sans max-w-md mx-auto">
                  Connecting with peers who have been in your shoes can reveal resources you won't find on a map.
                </p>
              </div>
              <Link
                to="/community"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white border border-earth-sand/20 hover:border-earth-sage text-earth-sage font-bold rounded-2xl shadow-sm hover:shadow-md transition-all group"
              >
                Talk to the first-gen community
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
