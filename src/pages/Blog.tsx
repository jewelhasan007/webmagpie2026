import React from 'react';
import { motion } from 'motion/react';
import { BLOG_POSTS } from '../constants';
import { Plus, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CATEGORIES = ['All', 'Technology', 'Marketing', 'Design', 'Business', 'Agency News'];

const Blog = () => {
  const [activeCategory, setActiveCategory] = React.useState('All');

  const filtered = activeCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter((p) => p.category === activeCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Fonts: move this <link> tag to index.html if you already load fonts elsewhere.
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,400;0,500;0,700;1,400&display=swap" rel="stylesheet"> */}
      <style>{`
        .font-display { font-family: 'Ubuntu', sans-serif; font-weight: 700; }
        .font-sans { font-family: 'Ubuntu', sans-serif; }
      `}</style>

      {/* Hero band */}
      <div className="bg-[#162660] pt-28 pb-10 px-6 font-sans">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-display text-4xl md:text-5xl font-medium text-[#F1E4D1] leading-[1.05]"
            >
              Insights & <span className="italic">updates.</span>
            </motion.h1>

            <div className="flex items-center gap-8 shrink-0">
              <div>
                <div className="font-display text-2xl text-[#F1E4D1]">{BLOG_POSTS.length}+</div>
                <div className="text-xs text-[#F1E4D1]/60">articles published</div>
              </div>
              <div className="w-px h-9 bg-[#F1E4D1]/20" />
              <Link
                to="/create-blog"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#F1E4D1]/40 text-[#F1E4D1] text-sm rounded-full hover:bg-[#F1E4D1] hover:text-[#162660] transition-colors"
              >
                <Plus size={15} /> Write a new post
              </Link>
            </div>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-sm rounded-full border transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#F1E4D1] text-[#162660] border-[#F1E4D1]'
                    : 'border-[#F1E4D1]/30 text-[#F1E4D1]/70 hover:border-[#F1E4D1]/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Alternating post spread */}
      <div className="max-w-5xl mx-auto px-6 py-14 font-sans">
        {filtered.map((post, index) => {
          const reversed = index % 2 === 1;
          return (
            <article
              key={post.id}
              className={`flex flex-col md:flex-row ${reversed ? 'md:flex-row-reverse' : ''} gap-6 md:gap-10 items-center py-8 ${
                index !== filtered.length - 1 ? 'border-b border-[#162660]/10' : ''
              }`}
            >
              <Link to={`/blog/${post.id}`} className="group block w-full md:w-2/5 shrink-0">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </Link>

              <div className="w-full md:w-3/5">
                <div className="flex items-center gap-2.5 text-xs text-[#162660] font-semibold mb-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#162660]" />
                  {post.category}
                </div>
                <Link to={`/blog/${post.id}`} className="group">
                  <h2 className="font-display text-xl md:text-2xl text-[#162660] mb-2.5 leading-tight group-hover:underline decoration-1 underline-offset-4">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-[#475569] text-sm leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt1}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-[#475569]">
                    <span>{post.author}</span>
                    <span className="mx-2">·</span>
                    <span>{post.date}</span>
                  </div>
                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-[#162660]/20 text-[#162660] hover:bg-[#162660] hover:text-white hover:border-[#162660] transition-colors"
                  >
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}

        {filtered.length === 0 && (
          <p className="text-[#475569] py-16 text-center">No posts in this category yet.</p>
        )}
      </div>

      {/* More from the blog — horizontal strip */}
      {BLOG_POSTS.length > 1 && (
        <div className="bg-[#F1E4D1]/30 py-10 px-6 font-sans">
          <div className="max-w-5xl mx-auto">
            <h4 className="text-[#162660] font-semibold text-sm mb-5">More from the blog</h4>
            <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
              {BLOG_POSTS.map((post) => (
                <Link
                  to={`/blog/${post.id}`}
                  key={post.id}
                  className="group shrink-0 w-44"
                >
                  <div className="w-full h-28 rounded-lg overflow-hidden mb-3">
                    <img
                      src={post.image}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h5 className="text-[#162660] font-medium text-xs leading-snug group-hover:underline decoration-1 underline-offset-2 line-clamp-2">
                    {post.title}
                  </h5>
                  <p className="text-[#475569] text-[11px] mt-1.5">{post.date}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Blog;