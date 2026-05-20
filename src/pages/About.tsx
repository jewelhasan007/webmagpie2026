import React from 'react';
import { motion } from 'motion/react';
import AboutSection from '../sections/About';
import Testimonials from '../sections/Testimonials';
import { Users, Target, Shield, Award } from 'lucide-react';

const About = () => {
  const values = [
    {
      title: 'Innovation',
      description: 'We constantly push the boundaries of what is possible in the digital space.',
      icon: Target,
    },
    {
      title: 'Integrity',
      description: 'We believe in transparent communication and building long-term trust with our partners.',
      icon: Shield,
    },
    {
      title: 'Excellence',
      description: 'Our commitment to quality ensures that every project we deliver is world-class.',
      icon: Award,
    },
    {
      title: 'Collaboration',
      description: 'We work closely with our clients to ensure their vision is perfectly realized.',
      icon: Users,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32"
    >
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className="max-w-3xl">
          <span className="text-[#162660] font-bold uppercase tracking-widest text-sm">Our Story</span>
          <h1 className="text-5xl md:text-7xl font-display font-extrabold mt-4 mb-8">
            Building The <span className="text-gradient">Digital Future</span> Together.
          </h1>
          <p className="text-xl text-[#475569] leading-relaxed">
            Founded in 2020, Nexus Digital started with a simple mission: to help businesses leverage technology to achieve their full potential. Today, we are a global team of designers, developers, and strategists.
          </p>
        </div>
      </div>

      <AboutSection />

      <section className="py-24 px-6 bg-[#162660]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-display font-bold mb-6 text-white">Our Core Values</h2>
            <p className="text-[#475569] max-w-2xl mx-auto">The principles that guide everything we do at Nexus Digital.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-[#162660]/10 shadow-md p-10 rounded-3xl text-center group hover:border-[#162660]/50 transition-all"
              >
                <div className="w-16 h-16 bg-[#D0E6FD] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#162660] group-hover:text-white transition-colors">
                  <value.icon size={32} className="text-[#162660] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{value.title}</h3>
                <p className="text-[#475569] text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
    </motion.div>
  );
};

export default About;
