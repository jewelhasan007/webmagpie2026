import React from 'react';
import { motion } from 'motion/react';
import { BLOG_POSTS } from '../constants';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogPreview = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[#162660] font-bold uppercase tracking-widest text-sm"
            >
              Our Insights
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold mt-4 text-[#162660]"
            >
              Latest From The <span className="text-gradient">Blog</span>
            </motion.h2>
          </div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Link to="/blog" className="px-8 py-4 bg-[#D0E6FD] border border-[#162660]/20 text-[#162660] rounded-full font-bold hover:bg-[#162660] hover:text-white transition-all">
              Read All Articles
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-[#162660]/10 rounded-3xl overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6 px-4 py-1.5 bg-[#162660] text-white text-xs font-bold rounded-full uppercase tracking-widest">
                  {post.category}
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 text-[#475569] text-sm mb-4">
                  <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
                  <span className="flex items-center gap-1.5"><User size={14} /> {post.author}</span>
                </div>
                <h3 className="text-2xl font-bold text-[#162660] mb-4 group-hover:text-[#162660]/70 transition-colors">
                  {post.title}
                </h3>
                <p className="text-[#475569] mb-6 line-clamp-2">
                  {post.excerpt1}
                </p>
                <Link to={`/blog/${post.id}`} className="text-[#162660] font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Read More <ArrowRight size={18} className="text-[#162660]" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
