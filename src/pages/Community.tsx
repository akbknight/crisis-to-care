// Community feed for anonymous support
import { useState, FormEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Send, Plus } from 'lucide-react';
import { MOCK_POSTS, CATEGORIES } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

interface Post {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  category: string;
  reactions: number;
  openToConnect: boolean;
}

export default function Community() {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [openToConnect, setOpenToConnect] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const savedPosts = localStorage.getItem('c2c_posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(MOCK_POSTS);
    }
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('c2c_posts', JSON.stringify(posts));
    }
  }, [posts]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const post: Post = {
        id: Date.now().toString(),
        author: `First-Gen Student #${Math.floor(Math.random() * 900) + 100}`,
        content: newPost,
        timestamp: 'Just now',
        category: selectedCategory,
        reactions: 0,
        openToConnect
      };

      setPosts([post, ...posts]);
      setNewPost('');
      setOpenToConnect(false);
      setIsSubmitting(false);
      setShowForm(false);
    }, 800);
  };

  const handleReaction = (id: string) => {
    setPosts(posts.map(post =>
      post.id === id ? { ...post, reactions: post.reactions + 1 } : post
    ));
  };

  const filteredPosts = activeCategory === 'All'
    ? posts
    : posts.filter(p => p.category === activeCategory);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <header className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-4xl font-serif font-bold text-earth-charcoal">{t.community.title}</h1>
          <p className="text-earth-charcoal/70">{t.community.subtitle}</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-6 py-3 bg-earth-sage text-white rounded-full font-bold hover:shadow-lg hover:shadow-earth-sage/20 transition-all active:scale-95"
        >
          {showForm ? t.community.close : <><Plus className="w-5 h-5" /> {t.community.shareStory}</>}
        </button>
      </header>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => setActiveCategory('All')}
          className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeCategory === 'All' ? 'bg-earth-sage text-white' : 'bg-white text-earth-sage border border-earth-sand/20 hover:bg-earth-sage/5'}`}
        >
          {t.community.allStories}
        </button>
        {CATEGORIES.map(c => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeCategory === c ? 'bg-earth-sage text-white' : 'bg-white text-earth-sage border border-earth-sand/20 hover:bg-earth-sage/5'}`}
          >
            {c}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] p-8 shadow-sm border border-earth-sand/20 space-y-6">
              <div className="space-y-4">
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder={t.community.postPlaceholder}
                  className="w-full p-6 bg-earth-cream/30 border border-earth-sand/20 rounded-2xl focus:ring-2 focus:ring-earth-sage focus:border-earth-sage outline-none resize-none min-h-[160px] text-lg font-sans placeholder:text-earth-charcoal/40"
                  maxLength={500}
                  required
                />

                <div className="flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center">
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-earth-charcoal/60 ml-1">{t.community.categoryLabel}</span>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="block w-full p-3 bg-white border border-earth-sand/20 rounded-xl text-sm font-bold text-earth-sage outline-none focus:ring-2 focus:ring-earth-sage appearance-none cursor-pointer"
                    >
                      {CATEGORIES.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <label className="flex items-center gap-3 p-4 bg-earth-sage/5 rounded-2xl cursor-pointer hover:bg-earth-sage/10 transition-colors">
                    <input
                      type="checkbox"
                      checked={openToConnect}
                      onChange={(e) => setOpenToConnect(e.target.checked)}
                      className="w-5 h-5 rounded-lg border-earth-sand/40 text-earth-sage focus:ring-earth-sage transition-all"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-earth-sage">{t.community.openToConnect}</span>
                      <span className="text-[10px] text-earth-charcoal/50 leading-none">Let others message you anonymously</span>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !newPost.trim()}
                className="w-full py-4 bg-earth-sage text-white font-bold rounded-2xl hover:bg-earth-sage/95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
              >
                {isSubmitting ? t.community.posting : <><Send className="w-5 h-5" /> {t.community.postAnonymously}</>}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white p-8 rounded-[2rem] shadow-sm border border-earth-sand/10 space-y-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-earth-charcoal/5 rounded-full flex items-center justify-center">
                    <UserSecret className="w-5 h-5 text-earth-charcoal/40" />
                  </div>
                  <div>
                    <h4 className="font-bold text-earth-charcoal text-sm">{post.author}</h4>
                    <span className="text-earth-charcoal/40 text-[11px] font-bold uppercase tracking-widest">{post.timestamp}</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-3 py-1 bg-earth-cream text-earth-sage rounded-full border border-earth-sand/20 uppercase tracking-wider">
                  {post.category}
                </span>
              </div>

              <p className="text-earth-charcoal/80 text-lg leading-relaxed font-sans">{post.content}</p>

              <div className="flex items-center justify-between pt-4 border-t border-earth-sand/10">
                <button
                  onClick={() => handleReaction(post.id)}
                  className="flex items-center gap-2 group transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-earth-terracotta/5 flex items-center justify-center group-hover:bg-earth-terracotta/10 transition-colors">
                    <Heart className={`w-5 h-5 transition-transform group-active:scale-150 ${post.reactions > 0 ? 'fill-earth-terracotta text-earth-terracotta' : 'text-earth-charcoal/40'}`} />
                  </div>
                  <span className={`font-bold text-sm ${post.reactions > 0 ? 'text-earth-terracotta' : 'text-earth-charcoal/60'}`}>
                    {post.reactions}
                  </span>
                </button>

                {post.openToConnect && (
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-earth-sage/5 text-earth-sage hover:bg-earth-sage/10 transition-all font-bold text-xs uppercase tracking-wider">
                    <MessageCircle className="w-4 h-4" />
                    Connect
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function UserSecret(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 21a8 8 0 0 1 13.292-6" />
      <circle cx="10" cy="8" r="5" />
      <path d="M19 16.36a3 3 0 1 1-3.73 5.06l3.73-5.06Z" />
      <path d="m21 21-2.23-4.47" />
    </svg>
  );
}
