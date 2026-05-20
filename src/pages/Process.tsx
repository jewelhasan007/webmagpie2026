import { motion } from 'motion/react';
import {
  Search,
  Lightbulb,
  PenTool,
  Code,
  Rocket,
  BarChart3,
  ArrowRight,
  ArrowLeft,
  ArrowDown,
} from 'lucide-react';

const steps = [
  {
    sl: 1,
    title: 'Discovery',
    description:
      'We dive deep into your business goals, target audience, and market landscape.',
    icon: Search,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    sl: 2,
    title: 'Strategy',
    description:
      'Developing a comprehensive roadmap tailored to your objectives.',
    icon: Lightbulb,
    color: 'from-purple-500 to-pink-500',
  },
  {
    sl: 3,
    title: 'Design',
    description:
      'Creating intuitive and visually stunning interfaces.',
    icon: PenTool,
    color: 'from-orange-500 to-red-500',
  },
  {
    sl: 4,
    title: 'Development',
    description:
      'Building scalable and robust digital solutions.',
    icon: Code,
    color: 'from-emerald-500 to-teal-500',
  },
  {
    sl: 5,
    title: 'Launch',
    description:
      'Deploying your product with precision and performance.',
    icon: Rocket,
    color: 'from-indigo-500 to-blue-500',
  },
  {
    sl: 6,
    title: 'Growth',
    description:
      'Continuous optimization and business scaling.',
    icon: BarChart3,
    color: 'from-fuchsia-500 to-violet-500',
  },
];

const Process = () => {
  return (
    <section className="py-28 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-24">
          <motion.span className="text-brand-primary font-bold uppercase tracking-widest text-sm">
            Our Workflow
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            How We Bring Your{' '}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Vision
            </span>{' '}
            To Life
          </h2>
        </div>

        {/* GRID */}
        <div className="relative">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">

            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.sl}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition-all text-center">

                    {/* ICON */}
                    <div
                      className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6`}
                    >
                      <Icon className="text-white" size={28} />
                    </div>

                    {/* STEP NUMBER */}
                    <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-white border shadow flex items-center justify-center font-bold text-brand-primary">
                      {step.sl}
                    </div>

                    {/* TITLE */}
                    <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">
                      {step.title}
                    </h3>

                    {/* DESCRIPTION (RESTORED) */}
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ARROWS */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none">

            {/* Row 1 */}
            <div className="absolute top-[18%] left-[33%]">
              <ArrowRight className="text-slate-400" />
            </div>

            <div className="absolute top-[18%] left-[66%]">
              <ArrowRight className="text-slate-400" />
            </div>

            {/* FIXED: Step 3 → Step 4 */}
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2">
              <ArrowDown className="text-slate-400" size={32} />
            </div>

            {/* Row 2 */}
            <div className="absolute top-[82%] left-[66%]">
              <ArrowLeft className="text-slate-400" />
            </div>

            <div className="absolute top-[82%] left-[33%]">
              <ArrowLeft className="text-slate-400" />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Process;