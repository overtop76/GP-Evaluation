import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HRData } from '../types';

const HRAttendance: React.FC = () => {
  const { state, updateHRData, updateHRWeight } = useApp();
  const [editingWeight, setEditingWeight] = useState(false);
  const [weightInput, setWeightInput] = useState((state.hrWeight ?? 5).toString());

  const handleWeightSave = () => {
    const w = parseInt(weightInput, 10);
    if (!isNaN(w) && w >= 0 && w <= 30) {
      updateHRWeight(w);
      setEditingWeight(false);
    } else {
      alert('Weight must be between 0 and 30');
    }
  };

  const handleDataChange = (teacherId: string, field: keyof HRData, value: string) => {
    const existing = state.hrData.find(d => d.teacherId === teacherId) || {
      teacherId, absences: 0, earlyLeaves: 0, lateArrivals: 0, lastUpdated: new Date().toISOString()
    };
    
    const numValue = parseInt(value, 10) || 0;
    
    updateHRData({
      ...existing,
      [field]: field === 'notes' ? value : numValue,
      lastUpdated: new Date().toISOString()
    });
  };

  const getScore = (type: 'absences' | 'earlyLeaves' | 'lateArrivals', value: number) => {
    if (type === 'absences') {
      if (value <= 2) return 4;
      if (value <= 5) return 3;
      if (value <= 9) return 2;
      return 1;
    } else {
      if (value <= 2) return 4;
      if (value <= 4) return 3;
      if (value <= 7) return 2;
      return 1;
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: '"Barlow Condensed", sans-serif', textTransform: 'uppercase' }}>HR Attendance Domain</h1>
          <p className="text-gray-500 mt-2">Enter and manage attendance data for all staff. This domain contributes <strong className="text-gray-900">{state.hrWeight}%</strong> to the final evaluation score.</p>
        </div>
        
        {state.currentUser?.role === 'admin' && (
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
            <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">Domain Weight</div>
            {editingWeight ? (
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  min="0" max="30" 
                  value={weightInput} 
                  onChange={e => setWeightInput(e.target.value)}
                  className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                />
                <span className="text-gray-500">%</span>
                <button onClick={handleWeightSave} className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-blue-700">Save</button>
                <button onClick={() => setEditingWeight(false)} className="text-gray-500 hover:text-gray-700">
                  <span className="material-icons-outlined text-sm">close</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold text-gray-900">{state.hrWeight}%</span>
                <button onClick={() => setEditingWeight(true)} className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1">
                  <span className="material-icons-outlined" style={{ fontSize: '16px' }}>tune</span> Edit
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="bg-slate-900 rounded-2xl p-6 text-white mb-8 shadow-md">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">D-HR: Attendance & Punctuality</div>
        <h2 className="text-2xl font-black mb-6" style={{ fontFamily: '"Barlow Condensed", sans-serif' }}>Scoring Rubric</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">Absences</div>
            <div className="text-sm text-center text-slate-300">4 = 0-2 | 3 = 3-5 | 2 = 6-9 | 1 = 10+</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">Early Leaves</div>
            <div className="text-sm text-center text-slate-300">4 = 0-2 | 3 = 3-4 | 2 = 5-7 | 1 = 8+</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">Late Arrivals</div>
            <div className="text-sm text-center text-slate-300">4 = 0-2 | 3 = 3-4 | 2 = 5-7 | 1 = 8+</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Employee</th>
              <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Absences</th>
              <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Early Leaves</th>
              <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Late Arrivals</th>
              <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">HR Score</th>
              <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Notes</th>
            </tr>
          </thead>
          <tbody>
            {state.teachers.map(t => {
              const data = (state.hrData || []).find(d => d.teacherId === t.id) || { absences: 0, earlyLeaves: 0, lateArrivals: 0, notes: '' };
              
              const s1 = getScore('absences', data.absences);
              const s2 = getScore('earlyLeaves', data.earlyLeaves);
              const s3 = getScore('lateArrivals', data.lateArrivals);
              const avg = ((s1 + s2 + s3) / 3).toFixed(2);
              
              const isReadOnly = state.currentUser?.role !== 'admin' && state.currentUser?.role !== 'hr';

              return (
                <tr key={t.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="font-bold text-gray-900">{t.fullName}</div>
                    <div className="text-xs text-gray-500 mt-1">{t.role} • {t.subject}</div>
                    {t.employeeId && <div className="text-xs font-mono text-gray-400 mt-1">ID: {t.employeeId}</div>}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <input 
                      type="number" 
                      min="0"
                      value={(data.absences ?? 0).toString()} 
                      onChange={e => handleDataChange(t.id, 'absences', e.target.value)}
                      disabled={isReadOnly}
                      className="w-16 px-3 py-2 border border-gray-300 rounded-lg text-center font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                    />
                    <div className="text-xs font-bold mt-2" style={{ color: s1 >= 3 ? '#15803d' : s1 === 2 ? '#b45309' : '#dc2626' }}>Score: {s1}</div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <input 
                      type="number" 
                      min="0"
                      value={(data.earlyLeaves ?? 0).toString()} 
                      onChange={e => handleDataChange(t.id, 'earlyLeaves', e.target.value)}
                      disabled={isReadOnly}
                      className="w-16 px-3 py-2 border border-gray-300 rounded-lg text-center font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                    />
                    <div className="text-xs font-bold mt-2" style={{ color: s2 >= 3 ? '#15803d' : s2 === 2 ? '#b45309' : '#dc2626' }}>Score: {s2}</div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <input 
                      type="number" 
                      min="0"
                      value={(data.lateArrivals ?? 0).toString()} 
                      onChange={e => handleDataChange(t.id, 'lateArrivals', e.target.value)}
                      disabled={isReadOnly}
                      className="w-16 px-3 py-2 border border-gray-300 rounded-lg text-center font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                    />
                    <div className="text-xs font-bold mt-2" style={{ color: s3 >= 3 ? '#15803d' : s3 === 2 ? '#b45309' : '#dc2626' }}>Score: {s3}</div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg" style={{ 
                      backgroundColor: parseFloat(avg) >= 3 ? '#dcfce7' : parseFloat(avg) >= 2 ? '#fef3c7' : '#fee2e2',
                      color: parseFloat(avg) >= 3 ? '#15803d' : parseFloat(avg) >= 2 ? '#b45309' : '#dc2626'
                    }}>
                      {avg}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <textarea 
                      value={data.notes || ''} 
                      onChange={e => handleDataChange(t.id, 'notes', e.target.value)}
                      disabled={isReadOnly}
                      placeholder="Add notes..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500 min-h-[60px] resize-y"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HRAttendance;
