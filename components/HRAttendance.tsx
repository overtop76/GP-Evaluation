import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { HRData } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

import { getHRScore } from '../utils/helpers';

const HRAttendance: React.FC = () => {
  const { state, updateHRData, updateHRWeight } = useApp();
  const [editingWeight, setEditingWeight] = useState(false);
  const [weightInput, setWeightInput] = useState((state.hrWeight ?? 5).toString());
  const [search, setSearch] = useState('');

  const handleWeightSave = () => {
    const w = parseInt(weightInput, 10);
    if (!isNaN(w) && w >= 0 && w <= 30) {
      updateHRWeight(w);
      setEditingWeight(false);
    } else {
      alert('Weight must be between 0 and 30');
    }
  };

  const handleBulkReset = () => {
    if (window.confirm('Are you sure you want to reset all attendance data for the current view? This cannot be undone.')) {
      state.teachers.forEach(t => {
        updateHRData({
          teacherId: t.id,
          absences: 0,
          earlyLeaves: 0,
          lateArrivals: 0,
          notes: '',
          lastUpdated: new Date().toISOString()
        });
      });
    }
  };

  const filteredTeachers = state.teachers.filter(t => 
    t.fullName.toLowerCase().includes(search.toLowerCase()) ||
    t.employeeId?.toLowerCase().includes(search.toLowerCase())
  );

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

  const chartData = useMemo(() => {
    return filteredTeachers.map(t => {
      const data = (state.hrData || []).find(d => d.teacherId === t.id) || { absences: 0, earlyLeaves: 0, lateArrivals: 0 };
      const s1 = getHRScore('absences', data.absences);
      const s2 = getHRScore('earlyLeaves', data.earlyLeaves);
      const s3 = getHRScore('lateArrivals', data.lateArrivals);
      const avg = (s1 + s2 + s3) / 3;
      return {
        name: t.fullName.split(' ')[0],
        fullName: t.fullName,
        absences: data.absences,
        earlyLeaves: data.earlyLeaves,
        lateArrivals: data.lateArrivals,
        avgScore: parseFloat(avg.toFixed(2))
      };
    }).sort((a, b) => b.avgScore - a.avgScore);
  }, [filteredTeachers, state.hrData]);

  const stats = useMemo(() => {
    const allData = state.teachers.map(t => {
      const data = (state.hrData || []).find(d => d.teacherId === t.id) || { absences: 0, earlyLeaves: 0, lateArrivals: 0 };
      const s1 = getHRScore('absences', data.absences);
      const s2 = getHRScore('earlyLeaves', data.earlyLeaves);
      const s3 = getHRScore('lateArrivals', data.lateArrivals);
      return (s1 + s2 + s3) / 3;
    });
    
    const total = allData.length;
    if (!total) return { avg: 0, excellent: 0, warning: 0 };
    const avg = allData.reduce((a, b) => a + b, 0) / total;
    const excellent = allData.filter(s => s >= 3.5).length;
    const warning = allData.filter(s => s < 2.5).length;
    return { avg: avg.toFixed(2), excellent, warning };
  }, [state.teachers, state.hrData]);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <span className="material-icons-outlined">event_available</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900" style={{ fontFamily: '"Barlow Condensed", sans-serif', letterSpacing: '-0.02em' }}>HR ATTENDANCE DOMAIN</h1>
          </div>
          <p className="text-slate-500 max-w-2xl">Manage staff attendance, punctuality, and early departures. This data directly impacts the final performance evaluation scores.</p>
        </div>
        
        <div className="flex items-center gap-4">
          {state.currentUser?.role === 'admin' && (
            <button 
              onClick={handleBulkReset}
              className="bg-white text-rose-600 border border-rose-100 px-4 py-2.5 rounded-2xl text-xs font-bold hover:bg-rose-50 transition-all flex items-center gap-2 shadow-sm"
            >
              <span className="material-icons-outlined" style={{ fontSize: '18px' }}>restart_alt</span>
              RESET ALL
            </button>
          )}
          
          {state.currentUser?.role === 'admin' && (
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-6">
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Domain Weight</div>
                {editingWeight ? (
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      min="0" max="30" 
                      value={weightInput} 
                      onChange={e => setWeightInput(e.target.value)}
                      className="w-16 px-2 py-1 border-2 border-indigo-100 rounded-lg text-center font-bold text-slate-700 focus:border-indigo-500 outline-none"
                    />
                    <span className="font-bold text-slate-400">%</span>
                    <button onClick={handleWeightSave} className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors">SAVE</button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black text-slate-900">{state.hrWeight}%</span>
                    <button onClick={() => setEditingWeight(true)} className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 flex items-center justify-center transition-all">
                      <span className="material-icons-outlined" style={{ fontSize: '18px' }}>edit</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <span className="material-icons-outlined text-indigo-500">analytics</span>
              Attendance Performance Overview
            </h2>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg Score</span>
              </div>
            </div>
          </div>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600, fill: '#64748b' }} />
                <YAxis domain={[0, 4]} axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600, fill: '#64748b' }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', padding: '12px' }}
                />
                <Bar dataKey="avgScore" radius={[6, 6, 0, 0]} barSize={32}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.avgScore >= 3.5 ? '#10b981' : entry.avgScore >= 2.5 ? '#6366f1' : '#f43f5e'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl shadow-slate-200 relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 opacity-10">
              <span className="material-icons" style={{ fontSize: '160px' }}>verified_user</span>
            </div>
            <div className="relative z-10">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-6">System Statistics</div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-black mb-1">{stats.avg}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg HR Score</div>
                </div>
                <div>
                  <div className="text-3xl font-black mb-1 text-emerald-400">{stats.excellent}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Excellent</div>
                </div>
                <div>
                  <div className="text-3xl font-black mb-1 text-rose-400">{stats.warning}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Needs Review</div>
                </div>
                <div>
                  <div className="text-3xl font-black mb-1 text-indigo-400">{chartData.length}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Staff</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 rounded-3xl p-8 border border-indigo-100">
            <h3 className="text-sm font-bold text-indigo-900 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="material-icons-outlined text-indigo-500" style={{ fontSize: '18px' }}>gavel</span>
              Scoring Rubric
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-indigo-700">Absences</span>
                <span className="text-[10px] font-mono text-indigo-500 bg-white px-2 py-1 rounded-md border border-indigo-100">4 = 0-2 | 3 = 3-5 | 2 = 6-9 | 1 = 10+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-indigo-700">Early Leaves</span>
                <span className="text-[10px] font-mono text-indigo-500 bg-white px-2 py-1 rounded-md border border-indigo-100">4 = 0-2 | 3 = 3-4 | 2 = 5-7 | 1 = 8+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-indigo-700">Late Arrivals</span>
                <span className="text-[10px] font-mono text-indigo-500 bg-white px-2 py-1 rounded-md border border-indigo-100">4 = 0-2 | 3 = 3-4 | 2 = 5-7 | 1 = 8+</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex flex-wrap justify-between items-center gap-4">
          <h2 className="text-lg font-bold text-slate-800">Staff Attendance Records</h2>
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative flex-1">
              <span className="material-icons-outlined" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--slate)', fontSize: '18px' }}>search</span>
              <input 
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="Search staff by name or ID..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Real-time Sync Active</div>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white">
              <th className="py-5 px-8 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Employee Details</th>
              <th className="py-5 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] text-center">Absences</th>
              <th className="py-5 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] text-center">Early Leaves</th>
              <th className="py-5 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] text-center">Late Arrivals</th>
              <th className="py-5 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] text-center">Final Score</th>
              <th className="py-5 px-8 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Notes & Observations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredTeachers.map(t => {
              const data = (state.hrData || []).find(d => d.teacherId === t.id) || { absences: 0, earlyLeaves: 0, lateArrivals: 0, notes: '' };
              
              const s1 = getHRScore('absences', data.absences);
              const s2 = getHRScore('earlyLeaves', data.earlyLeaves);
              const s3 = getHRScore('lateArrivals', data.lateArrivals);
              const avg = ((s1 + s2 + s3) / 3).toFixed(2);
              
              const isReadOnly = state.currentUser?.role !== 'admin' && state.currentUser?.role !== 'hr';

              return (
                <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-6 px-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-black text-xs">
                        {t.fullName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{t.fullName}</div>
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{t.role} · {t.subject}</div>
                        {t.employeeId && <div className="text-[10px] font-mono text-indigo-400 mt-1">ID: {t.employeeId}</div>}
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-6 text-center">
                    <div className="inline-block">
                      <input 
                        type="number" 
                        min="0"
                        value={(data.absences ?? 0).toString()} 
                        onChange={e => handleDataChange(t.id, 'absences', e.target.value)}
                        disabled={isReadOnly}
                        className="w-16 px-0 py-2 bg-slate-50 border-none rounded-xl text-center font-black text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all disabled:opacity-50"
                      />
                      <div className="text-[10px] font-black mt-2 px-2 py-0.5 rounded-full inline-block" style={{ 
                        backgroundColor: s1 >= 3 ? '#ecfdf5' : s1 === 2 ? '#fffbeb' : '#fef2f2',
                        color: s1 >= 3 ? '#10b981' : s1 === 2 ? '#f59e0b' : '#f43f5e'
                      }}>SCORE: {s1}</div>
                    </div>
                  </td>
                  <td className="py-6 px-6 text-center">
                    <div className="inline-block">
                      <input 
                        type="number" 
                        min="0"
                        value={(data.earlyLeaves ?? 0).toString()} 
                        onChange={e => handleDataChange(t.id, 'earlyLeaves', e.target.value)}
                        disabled={isReadOnly}
                        className="w-16 px-0 py-2 bg-slate-50 border-none rounded-xl text-center font-black text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all disabled:opacity-50"
                      />
                      <div className="text-[10px] font-black mt-2 px-2 py-0.5 rounded-full inline-block" style={{ 
                        backgroundColor: s2 >= 3 ? '#ecfdf5' : s2 === 2 ? '#fffbeb' : '#fef2f2',
                        color: s2 >= 3 ? '#10b981' : s2 === 2 ? '#f59e0b' : '#f43f5e'
                      }}>SCORE: {s2}</div>
                    </div>
                  </td>
                  <td className="py-6 px-6 text-center">
                    <div className="inline-block">
                      <input 
                        type="number" 
                        min="0"
                        value={(data.lateArrivals ?? 0).toString()} 
                        onChange={e => handleDataChange(t.id, 'lateArrivals', e.target.value)}
                        disabled={isReadOnly}
                        className="w-16 px-0 py-2 bg-slate-50 border-none rounded-xl text-center font-black text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all disabled:opacity-50"
                      />
                      <div className="text-[10px] font-black mt-2 px-2 py-0.5 rounded-full inline-block" style={{ 
                        backgroundColor: s3 >= 3 ? '#ecfdf5' : s3 === 2 ? '#fffbeb' : '#fef2f2',
                        color: s3 >= 3 ? '#10b981' : s3 === 2 ? '#f59e0b' : '#f43f5e'
                      }}>SCORE: {s3}</div>
                    </div>
                  </td>
                  <td className="py-6 px-6 text-center">
                    <div className="inline-flex flex-col items-center">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-sm border-2" style={{ 
                        backgroundColor: parseFloat(avg) >= 3.5 ? '#f0fdf4' : parseFloat(avg) >= 2.5 ? '#f5f3ff' : '#fff1f2',
                        borderColor: parseFloat(avg) >= 3.5 ? '#10b981' : parseFloat(avg) >= 2.5 ? '#6366f1' : '#f43f5e',
                        color: parseFloat(avg) >= 3.5 ? '#10b981' : parseFloat(avg) >= 2.5 ? '#6366f1' : '#f43f5e'
                      }}>
                        {avg}
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-8">
                    <textarea 
                      value={data.notes || ''} 
                      onChange={e => handleDataChange(t.id, 'notes', e.target.value)}
                      disabled={isReadOnly}
                      placeholder="Add HR observations..."
                      className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium text-slate-600 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all disabled:opacity-50 min-h-[80px] resize-none"
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
