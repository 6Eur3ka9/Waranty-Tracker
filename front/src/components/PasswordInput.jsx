import React, { useState } from 'react';
import zxcvbn from 'zxcvbn';

export default function PasswordInput({ value, onChange }) {
  const [strength, setStrength] = useState(0);

  const handleChange = e => {
    const pwd = e.target.value;
    onChange(pwd);
    const { score } = zxcvbn(pwd);
    setStrength(score); 
  };


  const percent = (strength / 4) * 100;


  const bgColor =
    strength <= 1 ? 'bg-red-500' :
    strength === 2 ? 'bg-yellow-500' :
    'bg-green-500';

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Mot de passe
      </label>
      <input
        type="password"
        value={value}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-2"
        placeholder="••••••••"
        required
      />

    
      <div className="h-2 w-full bg-gray-200 rounded overflow-hidden">
        <div
          className={`h-full ${bgColor} transition-all duration-200`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-1 text-xs text-gray-600">
        Force du mot de passe : {percent === 0 ? '–' : `${Math.round(percent)}%`}
      </p>
    </div>
  );
}
