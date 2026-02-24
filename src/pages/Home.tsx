import { Link } from 'react-router-dom';
import { Users, Compass, Phone, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 }
    }
  } as const;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-16 py-4"
    >
      <section className="text-center space-y-6 max-w-2xl mx-auto">
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl font-bold text-earth-charcoal leading-[1.1] font-serif"
        >
          {t.home.hero}
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-earth-charcoal/70 leading-relaxed font-sans"
        >
          {t.home.subhero}
        </motion.p>
      </section>

      <section className="grid gap-6 md:grid-cols-1 max-w-xl mx-auto">
        <motion.div variants={itemVariants}>
          <Link to="/community" className="group flex items-center p-6 bg-white rounded-[2rem] shadow-sm border border-earth-sand/20 hover:border-earth-sage hover:shadow-xl hover:shadow-earth-sage/5 transition-all duration-300">
            <div className="w-16 h-16 bg-earth-sage/10 text-earth-sage rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
              <Users className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h2 className="font-serif text-2xl text-earth-charcoal mb-1">{t.home.ctaTalk}</h2>
              <p className="text-sm text-earth-charcoal/50">{t.nav.community}</p>
            </div>
            <ArrowRight className="w-6 h-6 text-earth-sand group-hover:text-earth-sage group-hover:translate-x-1 transition-all" />
          </Link>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Link to="/navigator" className="group flex items-center p-6 bg-white rounded-[2rem] shadow-sm border border-earth-sand/20 hover:border-earth-sage hover:shadow-xl hover:shadow-earth-sage/5 transition-all duration-300">
            <div className="w-16 h-16 bg-earth-sage/10 text-earth-sage rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
              <Compass className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h2 className="font-serif text-2xl text-earth-charcoal mb-1">{t.home.ctaFind}</h2>
              <p className="text-sm text-earth-charcoal/50">{t.nav.navigator}</p>
            </div>
            <ArrowRight className="w-6 h-6 text-earth-sand group-hover:text-earth-sage group-hover:translate-x-1 transition-all" />
          </Link>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Link to="/crisis" className="group flex items-center p-6 bg-earth-terracotta/5 rounded-[2rem] shadow-sm border border-earth-terracotta/20 hover:border-earth-terracotta hover:shadow-xl hover:shadow-earth-terracotta/5 transition-all duration-300">
            <div className="w-16 h-16 bg-earth-terracotta/10 text-earth-terracotta rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
              <Phone className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h2 className="font-serif text-2xl text-earth-terracotta mb-1">{t.home.ctaCrisis}</h2>
              <p className="text-sm text-earth-terracotta/70">{t.nav.crisis}</p>
            </div>
            <ArrowRight className="w-6 h-6 text-earth-terracotta group-hover:translate-x-1 transition-all" />
          </Link>
        </motion.div>
      </section>

      <motion.section
        variants={itemVariants}
        className="glass-card p-8 md:p-12 space-y-6 text-center bg-earth-sage/5 border-earth-sage/10"
      >
        <h3 className="text-3xl font-serif text-earth-sage">{t.home.pioneerTitle}</h3>
        <p className="text-earth-charcoal/80 leading-relaxed max-w-2xl mx-auto text-lg italic">
          {t.home.pioneerText}
        </p>
      </motion.section>
    </motion.div>
  );
}
