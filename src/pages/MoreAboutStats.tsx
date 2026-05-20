import React from "react";
import { motion } from "motion/react";
import { FolderKanban, Users, Clock, UserCog } from "lucide-react";

const stats = [
  { label: "Projects Completed", value: "100+", icon: FolderKanban, desc: "We have successfully delivered over 100 projects across web development, UI/UX design, and digital solutions." },
  { label: "Happy Clients", value: "50+", icon: Users, desc: "More than 50 satisfied clients worldwide trust our team to grow their digital presence." },
  { label: "Years Experience", value: "6+", icon: Clock, desc: "Our agency has been working in the tech industry for over six years, gaining strong expertise." },
  { label: "Team Experts", value: "25+", icon: UserCog, desc: "A passionate team of developers, designers, and strategists working together." },
];

const MoreAboutStats = () => {
  return (
    <section className="min-h-screen bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6 text-[#162660]"
        >
          Our <span className="text-gradient">Achievements.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-[#475569] leading-relaxed"
        >
          Numbers that represent our dedication and success.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-[#F1E4D1] border border-[#162660]/10 p-10 rounded-2xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="grid grid-cols-[60px_auto] items-center gap-4 mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#162660] shrink-0">
                  <Icon className="text-white" size={26} />
                </div>
                <h2 className="text-5xl font-bold text-[#162660] leading-none flex items-center">{stat.value}</h2>
              </div>
              <h3 className="text-xl text-[#162660] font-semibold mt-3">{stat.label}</h3>
              <p className="text-[#475569] mt-4">{stat.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default MoreAboutStats;
