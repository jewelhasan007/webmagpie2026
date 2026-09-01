import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { BLOG_POSTS } from '../constants';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import CTA from '../sections/CTA';

const BlogDetails = () => {
  const { id } = useParams<{ id: string }>();
  const post = BLOG_POSTS.find((p) => p.id === id);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

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
        <div className="max-w-4xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#F1E4D1]/70 hover:text-[#F1E4D1] transition-colors mb-6 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to blog
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2.5 text-xs text-[#F1E4D1] font-semibold mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F1E4D1]" />
              {post.category}
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-[#F1E4D1] leading-tight mb-4">
              {post.title}
            </h1>
            <div className="text-sm text-[#F1E4D1]/60">
              <span>{post.author}</span>
              <span className="mx-2">·</span>
              <span>{post.date}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Article body */}
      <div className="max-w-4xl mx-auto px-6 py-14 font-sans">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-xl overflow-hidden mb-10"
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-auto max-h-[360px] object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-5 text-[#475569] leading-relaxed">
            <p>{post.excerpt1}</p>
            <p>{post.excerpt2}</p>
          </div>

          {post.features && post.features.length > 0 && (
            <div className="md:col-span-1">
              <h3 className="text-sm font-semibold text-[#162660] mb-4">Key takeaways</h3>
              <div className="space-y-3">
                {post.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5 text-sm text-[#475569]">
                    <CheckCircle2 size={15} className="text-[#162660] mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <CTA />
    </motion.div>
  );
};

export default BlogDetails;