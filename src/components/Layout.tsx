import { Link, Outlet, useLocation } from 'react-router-dom';
import { Heart, Home, Users, Compass, Phone, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../data/translations';

export default function Layout() {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'hi', label: 'हि' },
    { code: 'es', label: 'ES' },
    { code: 'zh', label: '中' },
  ];

  return (
    <div className="min-h-screen bg-earth-cream text-earth-charcoal font-sans flex flex-col">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-earth-sand/20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-earth-sage font-bold text-2xl tracking-tight shrink-0">
            <Heart className="w-7 h-7 fill-earth-terracotta text-earth-terracotta" />
            <span className="font-serif">Crisis to Care</span>
          </Link>

          <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link to="/community" className={`transition-all py-1 ${location.pathname === '/community' ? 'text-earth-sage border-b-2 border-earth-sage' : 'text-earth-charcoal/60 hover:text-earth-sage'}`}>
                {t.nav.community}
              </Link>
              <Link to="/navigator" className={`transition-all py-1 ${location.pathname.includes('/navigator') ? 'text-earth-sage border-b-2 border-earth-sage' : 'text-earth-charcoal/60 hover:text-earth-sage'}`}>
                {t.nav.navigator}
              </Link>
              <Link to="/crisis" className="px-5 py-2.5 bg-earth-terracotta/10 text-earth-terracotta rounded-full hover:bg-earth-terracotta hover:text-white transition-all font-bold shadow-sm">
                {t.nav.crisis}
              </Link>
            </nav>

            <div className="flex items-center gap-1 bg-earth-sand/5 p-1 rounded-full border border-earth-sand/10">
              <Globe className="w-3.5 h-3.5 ml-2 mr-1 text-earth-sage/60" />
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-black transition-all uppercase tracking-tighter ${language === lang.code
                    ? 'bg-earth-sage text-white shadow-sm'
                    : 'text-earth-sage hover:bg-earth-sage/10'
                    }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 md:py-12">
        <Outlet />
      </main>

      {/* Mobile Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-earth-sand/20 flex justify-around items-center pb-safe pt-3 px-4 z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <Link to="/" className={`flex flex-col items-center gap-1 transition-all ${location.pathname === '/' ? 'text-earth-sage scale-110' : 'text-earth-charcoal/40'}`}>
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">{t.nav.home}</span>
        </Link>
        <Link to="/community" className={`flex flex-col items-center gap-1 transition-all ${location.pathname === '/community' ? 'text-earth-sage scale-110' : 'text-earth-charcoal/40'}`}>
          <Users className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">{t.nav.community}</span>
        </Link>
        <Link to="/navigator" className={`flex flex-col items-center gap-1 transition-all ${location.pathname.includes('/navigator') ? 'text-earth-sage scale-110' : 'text-earth-charcoal/40'}`}>
          <Compass className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">{t.nav.navigator}</span>
        </Link>
        <Link to="/crisis" className={`flex flex-col items-center gap-1 transition-all ${location.pathname.includes('/crisis') ? 'text-earth-terracotta scale-110 font-bold' : 'text-earth-charcoal/40'}`}>
          <Phone className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">{t.nav.crisis}</span>
        </Link>
      </nav>

      <footer className="bg-white/50 border-t border-earth-sand/10 py-12 mb-20 md:mb-0">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="flex flex-col items-center gap-2">
            <Heart className="w-8 h-8 text-earth-terracotta/40" />
            <h3 className="text-xl font-serif text-earth-sage">Crisis to Care</h3>
            <p className="text-sm text-earth-charcoal/60 max-w-md mx-auto italic">
              "Building a roadmap where there was none, for those who are building their own future."
            </p>
          </div>

          <div className="flex justify-center gap-8 text-sm font-medium text-earth-charcoal/50">
            <Link to="#" className="hover:text-earth-sage transition-colors underline underline-offset-4 decoration-earth-sand/30">About Project</Link>
            <Link to="#" className="hover:text-earth-sage transition-colors underline underline-offset-4 decoration-earth-sand/30">AU Resources</Link>
            <Link to="#" className="hover:text-earth-sage transition-colors underline underline-offset-4 decoration-earth-sand/30">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
