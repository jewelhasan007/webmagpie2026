import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="py-24 px-6 bg-[#F1E4D1]/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[40px] overflow-hidden bg-[#162660] p-12 md:p-24 text-center"
        >
          {/* Decorative */}
          <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-10" />
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#D0E6FD]/10 blur-[100px] rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/5 blur-[100px] rounded-full" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-display font-extrabold text-white mb-8 leading-tight">
              Ready to Build Your Next Digital Product?
            </h2>
            <p className="text-white/70 text-xl mb-12 leading-relaxed">
              Let's collaborate to create something extraordinary. Our team is ready to turn your ideas into reality.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                to="/contact"
                className="px-10 py-5 bg-[#D0E6FD] text-[#162660] rounded-full font-bold text-lg hover:scale-105 hover:bg-white transition-all shadow-2xl"
              >
                Start a Conversation
              </Link>
              <Link
                to="/portfolio"
                className="px-10 py-5 bg-transparent border-2 border-[#D0E6FD]/40 text-white rounded-full font-bold text-lg hover:bg-[#D0E6FD]/10 transition-all"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
