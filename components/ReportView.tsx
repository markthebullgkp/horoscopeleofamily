
import React, { useState } from 'react';
import { VedicReport } from '../types';
import KundliChart from './KundliChart';

interface ReportViewProps {
  report: VedicReport;
  onReset: () => void;
}

const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-6">
    <h2 className="font-cinzel text-xl text-amber-500 uppercase tracking-widest border-b border-amber-900/30 pb-2">{title}</h2>
    {subtitle && <p className="text-stone-500 text-xs mt-1 uppercase tracking-tighter">{subtitle}</p>}
  </div>
);

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`bg-stone-900/40 border border-stone-800/50 p-6 rounded-2xl ${className}`}>
    {children}
  </div>
);

const ReportView: React.FC<ReportViewProps> = ({ report, onReset }) => {
  const [activeChart, setActiveChart] = useState<'D1' | 'D9'>('D1');

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="text-center mb-16">
        <button 
          onClick={onReset}
          className="text-stone-500 hover:text-amber-500 text-xs uppercase tracking-widest mb-8 transition-colors"
        >
          ← New Analysis
        </button>
        <h1 className="font-cinzel text-4xl md:text-5xl text-amber-200 mb-4">Cosmic Blueprint</h1>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-stone-400">
          <span className="bg-stone-800/50 px-3 py-1 rounded-full border border-stone-700">Lagna: {report.overview.lagna}</span>
          <span className="bg-stone-800/50 px-3 py-1 rounded-full border border-stone-700">Moon: {report.overview.moonSign}</span>
          <span className="bg-stone-800/50 px-3 py-1 rounded-full border border-stone-700">Sun: {report.overview.sunSign}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Charts & Quick Insights */}
        <div className="lg:col-span-4 space-y-8">
          <div className="space-y-4">
            <div className="flex justify-center gap-2 mb-2">
              <button 
                onClick={() => setActiveChart('D1')}
                className={`px-4 py-1 text-[10px] uppercase tracking-widest rounded-full transition-all border ${activeChart === 'D1' ? 'bg-amber-700 border-amber-600 text-white' : 'bg-stone-900 border-stone-700 text-stone-500'}`}
              >
                Rashi (D1)
              </button>
              <button 
                onClick={() => setActiveChart('D9')}
                className={`px-4 py-1 text-[10px] uppercase tracking-widest rounded-full transition-all border ${activeChart === 'D9' ? 'bg-amber-700 border-amber-600 text-white' : 'bg-stone-900 border-stone-700 text-stone-500'}`}
              >
                Navamsa (D9)
              </button>
            </div>
            {activeChart === 'D1' ? (
              <KundliChart placements={report.placements} lagnaSign={report.overview.lagna} title="Main Birth Chart (Rashi)" />
            ) : (
              <KundliChart placements={report.navamsa.placements} lagnaSign={report.navamsa.lagna} title="Fruit of the Soul (Navamsa)" />
            )}
          </div>
          
          <Card>
            <SectionTitle title="Elemental Balance" subtitle="Pancha Tatva" />
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-stone-400">Dominant Element</span>
                <span className="text-amber-400 font-medium">{report.overview.dominantElement}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-400">Guna Influence</span>
                <span className="text-amber-400 font-medium">{report.overview.dominantGuna}</span>
              </div>
            </div>
          </Card>

          <Card>
            <SectionTitle title="Numerology" subtitle="Sacred Numbers" />
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-stone-800/30 p-4 rounded-xl">
                <div className="text-3xl font-cinzel text-amber-500">{report.numerology.driver}</div>
                <div className="text-[10px] uppercase tracking-widest text-stone-500 mt-1">Driver</div>
              </div>
              <div className="bg-stone-800/30 p-4 rounded-xl">
                <div className="text-3xl font-cinzel text-amber-500">{report.numerology.conductor}</div>
                <div className="text-[10px] uppercase tracking-widest text-stone-500 mt-1">Conductor</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-stone-400 leading-relaxed italic">
              {report.numerology.traits}
            </p>
          </Card>
        </div>

        {/* Right Column - Deep Analysis */}
        <div className="lg:col-span-8 space-y-8">
          {/* Navamsa Deep Dive */}
          <Card className="border-amber-700/30 bg-amber-900/5">
            <SectionTitle title="Navamsa (D9) Analysis" subtitle="The Internal Blueprint" />
            <div className="space-y-6">
              <p className="text-sm text-stone-400 leading-relaxed italic border-l-2 border-amber-600 pl-4">
                {report.navamsa.significanceExplanation}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="text-amber-500 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    Marriage & Relationships
                  </h4>
                  <p className="text-sm text-stone-300">{report.navamsa.relationshipInsight}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-amber-500 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    Spiritual Path
                  </h4>
                  <p className="text-sm text-stone-300">{report.navamsa.spiritualInsight}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Planetary Strength */}
          <Card>
            <SectionTitle title="Planetary Strengths" subtitle="Shadbala Overview" />
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-stone-800 text-stone-500">
                    <th className="py-3 px-2">Planet</th>
                    <th className="py-3 px-2">Sign</th>
                    <th className="py-3 px-2">House</th>
                    <th className="py-3 px-2 text-center">Strength</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800">
                  {report.placements.map((p, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-2 font-medium text-amber-200">{p.planet}</td>
                      <td className="py-3 px-2 text-stone-300">{p.sign}</td>
                      <td className="py-3 px-2 text-stone-300">{p.house}</td>
                      <td className="py-3 px-2 text-center">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                          p.strength === 'Strong' ? 'bg-emerald-900/30 text-emerald-400' :
                          p.strength === 'Moderate' ? 'bg-blue-900/30 text-blue-400' :
                          'bg-rose-900/30 text-rose-400'
                        }`}>
                          {p.strength}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Core Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <SectionTitle title="Mind & Self" subtitle="Moon & 4th Bhava" />
              <p className="text-sm text-stone-300 leading-relaxed">{report.analysis.mind}</p>
            </Card>
            <Card>
              <SectionTitle title="Intellect" subtitle="Mercury & 5th Bhava" />
              <p className="text-sm text-stone-300 leading-relaxed">{report.analysis.intelligence}</p>
            </Card>
          </div>

          {/* Remedies Section Refined */}
          <Card className="border-emerald-900/30 bg-emerald-900/5">
            <SectionTitle title="Dharma & Remedies" subtitle="Alignment & Harmonization" />
            <div className="space-y-8">
              <div className="bg-emerald-900/10 p-4 rounded-xl border border-emerald-900/20">
                <p className="text-xs text-emerald-500 leading-relaxed italic">
                  Ethical Note: These suggestions are optional tools for psychological and spiritual alignment. 
                  They work through conscious habit-shifting and symbolic resonance to help balance planetary archetypes within.
                </p>
              </div>

              {/* Targeted Remedies */}
              {report.remedies.targetedRemedies && report.remedies.targetedRemedies.length > 0 && (
                <div>
                  <h3 className="text-stone-400 text-xs uppercase tracking-[0.2em] mb-4">Targeted Celestial Guidance</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {report.remedies.targetedRemedies.map((tr, i) => (
                      <div key={i} className="bg-stone-900/60 p-4 rounded-xl border border-stone-800 hover:border-emerald-900/40 transition-colors">
                        <div className="text-[10px] text-emerald-500 font-bold uppercase mb-1">Affliction: {tr.issue}</div>
                        <div className="text-sm text-amber-200 font-medium mb-1">{tr.suggestion}</div>
                        <div className="text-xs text-stone-500 leading-relaxed">{tr.context}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* General Alignment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-emerald-900/10">
                <div className="space-y-4">
                  {report.remedies.mantra && (
                    <div>
                      <h4 className="text-emerald-500 font-bold text-[10px] uppercase tracking-widest mb-1">Mantra / Affirmation</h4>
                      <p className="text-sm text-stone-300 italic">{report.remedies.mantra}</p>
                    </div>
                  )}
                  {report.remedies.charity && (
                    <div>
                      <h4 className="text-emerald-500 font-bold text-[10px] uppercase tracking-widest mb-1">Service (Seva)</h4>
                      <p className="text-sm text-stone-300">{report.remedies.charity}</p>
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  {report.remedies.habit && (
                    <div>
                      <h4 className="text-emerald-500 font-bold text-[10px] uppercase tracking-widest mb-1">Daily Alignment</h4>
                      <p className="text-sm text-stone-300">{report.remedies.habit}</p>
                    </div>
                  )}
                  <div className="flex gap-8">
                    {report.remedies.color && (
                      <div>
                        <h4 className="text-emerald-500 font-bold text-[10px] uppercase tracking-widest mb-1">Varna (Color)</h4>
                        <p className="text-sm text-stone-300">{report.remedies.color}</p>
                      </div>
                    )}
                    {report.remedies.weekday && (
                      <div>
                        <h4 className="text-emerald-500 font-bold text-[10px] uppercase tracking-widest mb-1">Key Day</h4>
                        <p className="text-sm text-stone-300">{report.remedies.weekday}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <footer className="text-center pt-8 border-t border-stone-800">
            <p className="text-stone-500 text-sm font-lora italic">
              "A birth chart shows tendencies and karmic patterns. Free will, discipline, and conscious action shape outcomes."
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ReportView;
