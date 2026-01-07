
import React from 'react';
import { PlanetaryPosition } from '../types';

interface KundliChartProps {
  placements: PlanetaryPosition[];
  lagnaSign: string;
  title?: string;
}

const KundliChart: React.FC<KundliChartProps> = ({ placements, lagnaSign, title = "Rashi Chart (D1)" }) => {
  // Mapping signs to numbers (Aries = 1, etc.)
  const signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
  const lagnaIndex = signs.findIndex(s => lagnaSign.includes(s)) + 1;
  const startSign = lagnaIndex > 0 ? lagnaIndex : 1;

  // Helper to get sign number for a house
  const getSignForHouse = (house: number) => {
    let s = (startSign + house - 1) % 12;
    return s === 0 ? 12 : s;
  };

  // Helper to filter planets for a house
  const getPlanetsForHouse = (house: number) => {
    return placements
      .filter(p => p.house === house)
      .map(p => p.planet.substring(0, 2))
      .join(', ');
  };

  return (
    <div className="w-full max-w-md mx-auto aspect-square bg-[#1c1917] p-4 rounded-xl shadow-2xl border border-amber-900/30">
      <svg viewBox="0 0 400 400" className="w-full h-full text-amber-200">
        {/* Outer Frame */}
        <rect x="10" y="10" width="380" height="380" fill="none" stroke="currentColor" strokeWidth="2" />
        
        {/* Diagonal Lines */}
        <line x1="10" y1="10" x2="390" y2="390" stroke="currentColor" strokeWidth="1" />
        <line x1="390" y1="10" x2="10" y2="390" stroke="currentColor" strokeWidth="1" />
        
        {/* Diamond Shape */}
        <path d="M200 10 L390 200 L200 390 L10 200 Z" fill="none" stroke="currentColor" strokeWidth="1" />

        {/* House Labels (Sign Numbers) and Planet Listings */}
        {/* House 1 - Top Center */}
        <text x="200" y="80" textAnchor="middle" className="text-xs font-bold fill-amber-500">{getSignForHouse(1)}</text>
        <text x="200" y="110" textAnchor="middle" className="text-[10px] fill-amber-100">{getPlanetsForHouse(1)}</text>

        {/* House 2 - Top Left */}
        <text x="110" y="55" textAnchor="middle" className="text-xs fill-amber-500">{getSignForHouse(2)}</text>
        <text x="110" y="85" textAnchor="middle" className="text-[10px] fill-amber-100">{getPlanetsForHouse(2)}</text>

        {/* House 3 - Left Top */}
        <text x="55" y="110" textAnchor="middle" className="text-xs fill-amber-500">{getSignForHouse(3)}</text>
        <text x="55" y="140" textAnchor="middle" className="text-[10px] fill-amber-100">{getPlanetsForHouse(3)}</text>

        {/* House 4 - Left Center */}
        <text x="80" y="200" textAnchor="middle" className="text-xs fill-amber-500 font-bold">{getSignForHouse(4)}</text>
        <text x="80" y="230" textAnchor="middle" className="text-[10px] fill-amber-100">{getPlanetsForHouse(4)}</text>

        {/* House 5 - Left Bottom */}
        <text x="55" y="290" textAnchor="middle" className="text-xs fill-amber-500">{getSignForHouse(5)}</text>
        <text x="55" y="320" textAnchor="middle" className="text-[10px] fill-amber-100">{getPlanetsForHouse(5)}</text>

        {/* House 6 - Bottom Left */}
        <text x="110" y="345" textAnchor="middle" className="text-xs fill-amber-500">{getSignForHouse(6)}</text>
        <text x="110" y="375" textAnchor="middle" className="text-[10px] fill-amber-100">{getPlanetsForHouse(6)}</text>

        {/* House 7 - Bottom Center */}
        <text x="200" y="320" textAnchor="middle" className="text-xs fill-amber-500 font-bold">{getSignForHouse(7)}</text>
        <text x="200" y="350" textAnchor="middle" className="text-[10px] fill-amber-100">{getPlanetsForHouse(7)}</text>

        {/* House 8 - Bottom Right */}
        <text x="290" y="345" textAnchor="middle" className="text-xs fill-amber-500">{getSignForHouse(8)}</text>
        <text x="290" y="375" textAnchor="middle" className="text-[10px] fill-amber-100">{getPlanetsForHouse(8)}</text>

        {/* House 9 - Right Bottom */}
        <text x="345" y="290" textAnchor="middle" className="text-xs fill-amber-500">{getSignForHouse(9)}</text>
        <text x="345" y="320" textAnchor="middle" className="text-[10px] fill-amber-100">{getPlanetsForHouse(9)}</text>

        {/* House 10 - Right Center */}
        <text x="320" y="200" textAnchor="middle" className="text-xs fill-amber-500 font-bold">{getSignForHouse(10)}</text>
        <text x="320" y="230" textAnchor="middle" className="text-[10px] fill-amber-100">{getPlanetsForHouse(10)}</text>

        {/* House 11 - Right Top */}
        <text x="345" y="110" textAnchor="middle" className="text-xs fill-amber-500">{getSignForHouse(11)}</text>
        <text x="345" y="140" textAnchor="middle" className="text-[10px] fill-amber-100">{getPlanetsForHouse(11)}</text>

        {/* House 12 - Top Right */}
        <text x="290" y="55" textAnchor="middle" className="text-xs fill-amber-500">{getSignForHouse(12)}</text>
        <text x="290" y="85" textAnchor="middle" className="text-[10px] fill-amber-100">{getPlanetsForHouse(12)}</text>
      </svg>
      <div className="mt-2 text-center text-[10px] uppercase tracking-widest text-amber-700">{title}</div>
    </div>
  );
};

export default KundliChart;
