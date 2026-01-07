
import React, { useState } from 'react';
import { BirthDetails } from '../types';

interface InputFormProps {
  onSubmit: (details: BirthDetails) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<BirthDetails>({
    fullName: '',
    dob: '',
    tob: '',
    pob: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.dob && formData.tob && formData.pob) {
      onSubmit(formData);
    }
  };

  return (
    <div className="w-full max-w-lg bg-[#1c1917]/80 backdrop-blur-md border border-amber-900/40 p-8 rounded-2xl shadow-2xl">
      <div className="text-center mb-8">
        <h1 className="font-cinzel text-3xl text-amber-500 mb-2">Jyotish Vision</h1>
        <p className="text-stone-400 text-sm italic">Unlock the celestial patterns of your soul.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs uppercase tracking-widest text-amber-700 font-semibold mb-2">Full Name</label>
          <input
            required
            type="text"
            className="w-full bg-stone-900/50 border border-stone-800 focus:border-amber-700 text-stone-200 rounded-lg px-4 py-3 outline-none transition-all"
            placeholder="Arjun Sharma"
            value={formData.fullName}
            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-amber-700 font-semibold mb-2">Date of Birth</label>
            <input
              required
              type="date"
              className="w-full bg-stone-900/50 border border-stone-800 focus:border-amber-700 text-stone-200 rounded-lg px-4 py-3 outline-none transition-all"
              value={formData.dob}
              onChange={e => setFormData({ ...formData, dob: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-amber-700 font-semibold mb-2">Time of Birth</label>
            <input
              required
              type="time"
              className="w-full bg-stone-900/50 border border-stone-800 focus:border-amber-700 text-stone-200 rounded-lg px-4 py-3 outline-none transition-all"
              value={formData.tob}
              onChange={e => setFormData({ ...formData, tob: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-amber-700 font-semibold mb-2">Place of Birth</label>
          <input
            required
            type="text"
            className="w-full bg-stone-900/50 border border-stone-800 focus:border-amber-700 text-stone-200 rounded-lg px-4 py-3 outline-none transition-all"
            placeholder="New Delhi, India"
            value={formData.pob}
            onChange={e => setFormData({ ...formData, pob: e.target.value })}
          />
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="w-full py-4 bg-amber-700 hover:bg-amber-600 disabled:bg-amber-900 text-white font-cinzel tracking-widest rounded-lg transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-amber-900/20"
        >
          {isLoading ? 'Aligning Stars...' : 'Generate Kundli'}
        </button>
      </form>
    </div>
  );
};

export default InputForm;
