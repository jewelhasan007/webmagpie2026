import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  CheckCircle2,
  Search,
  Lightbulb,
  PenTool,
  Code,
  Rocket,
  BarChart3,
} from 'lucide-react';
import { processSteps } from '../lib/ProcessData';

/* ICON MAP */
const getIcon = (id: number) => {
  switch (id) {
    case 1: return Search;
    case 2: return Lightbulb;
    case 3: return PenTool;
    case 4: return Code;
    case 5: return Rocket;
    case 6: return BarChart3;
    default: return CheckCircle2;
  }
};

const ProcessDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const step = processSteps.find((s) => s.sl === Number(id));

  if (!step) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Step not found
      </div>
    );
  }

  const Icon = step.icon;

  return (
    <section className="min-h-screen bg-white px-6 py-16">

      <div className="max-w-5xl mx-auto">

        {/* BACK */}
        <motion.button
          onClick={() => navigate('/#workflow')}
          whileHover={{ x: -4 }}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-10"
        >
          <ArrowLeft size={18} />
          Back to workflow
        </motion.button>

        {/* HERO (SIMPLE + PREMIUM) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-14"
        >

          <div className="flex items-start gap-6">

            {/* ICON */}
            <div
              className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-sm`}
            >
              <Icon className="text-white" size={40} />
            </div>

            {/* TEXT */}
            <div>

              <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-2">
                Step {step.sl} / {processSteps.length}
              </p>

              <h1 className="text-4xl font-bold text-slate-900">
                {step.title}
              </h1>

              <p className="text-slate-600 mt-3 max-w-xl leading-relaxed">
                {step.short}
              </p>

            </div>

          </div>

        </motion.div>

        {/* MAIN STORY FLOW (THE NEW UX CORE) */}
        <div className="relative border-l border-slate-200 pl-8 space-y-10 mb-14">

          {processSteps.map((s) => {
            const StepIcon = getIcon(s.sl);
            const isActive = s.sl === step.sl;
            const isDone = s.sl < step.sl;

            return (
              <div key={s.sl} className="relative">

                {/* DOT */}
                <div
                  className={`absolute -left-[42px] w-8 h-8 rounded-full flex items-center justify-center border
                  ${
                    isActive
                      ? `bg-gradient-to-br ${step.color} text-white border-transparent`
                      : isDone
                      ? 'bg-emerald-500 text-white border-transparent'
                      : 'bg-white border-slate-300 text-slate-400'
                  }`}
                >
                  <StepIcon size={14} />
                </div>

                {/* CONTENT */}
                <div className="group">

                  <h3 className={`font-semibold ${
                    isActive ? 'text-slate-900' : 'text-slate-500'
                  }`}>
                    {s.title}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1 max-w-xl">
                    {s.description}
                  </p>

                  {isActive && (
                    <div
                      className={`mt-3 h-1 w-16 rounded-full bg-gradient-to-r ${step.color}`}
                    />
                  )}

                </div>

              </div>
            );
          })}

        </div>

        {/* DETAILS SECTION (CLEAN INSIGHT BLOCK) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-50 border rounded-2xl p-8"
        >

          <h2 className="text-lg font-semibold text-slate-900 mb-6">
            What happens in this stage
          </h2>

          <div className="space-y-4">

            {step.details.map((item, i) => (
              <div key={i} className="flex gap-3">

                <CheckCircle2
                  className={`text-${step.color.includes('blue') ? 'blue' : 'slate'}-500 mt-1`}
                  size={18}
                />

                <p className="text-slate-700 text-sm leading-relaxed">
                  {item}
                </p>

              </div>
            ))}

          </div>

        </motion.div>

        {/* NAVIGATION */}
        <div className="mt-12 flex justify-between border-t pt-8">

          <button
            onClick={() => navigate(`/process/${step.sl - 1}`)}
            disabled={step.sl === 1}
            className="text-slate-500 hover:text-slate-900 disabled:opacity-40"
          >
            ← Previous stage
          </button>

          <button
            onClick={() => navigate(`/process/${step.sl + 1}`)}
            disabled={step.sl === processSteps.length}
            className="text-slate-500 hover:text-slate-900 disabled:opacity-40"
          >
            Next stage →
          </button>

        </div>

      </div>
    </section>
  );
};

export default ProcessDetail;