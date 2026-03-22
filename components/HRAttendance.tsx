import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { HRData } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

import { getHRScore } from '../utils/helpers';

const HRAttendance: React.FC = () => {
  const { state, updateHRData, updateHRWeight } = useApp();
  const hrRubric = state.hrRubric || { absences: [2, 5, 9], earlyLeaves: [2, 4, 7], lateArrivals: [2, 4, 7] };
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
    const totals = state.teachers.reduce((acc, t) => {
      const data = (state.hrData || []).find(d => d.teacherId === t.id) || { absences: 0, earlyLeaves: 0, lateArrivals: 0 };
      acc.absences += getHRScore('absences', data.absences, hrRubric.absences);
      acc.earlyLeaves += getHRScore('earlyLeaves', data.earlyLeaves, hrRubric.earlyLeaves);
      acc.lateArrivals += getHRScore('lateArrivals', data.lateArrivals, hrRubric.lateArrivals);
      return acc;
    }, { absences: 0, earlyLeaves: 0, lateArrivals: 0 });

    const count = state.teachers.length || 1;
    return [
      { name: 'Absences', score: parseFloat((totals.absences / count).toFixed(2)), color: '#6366f1' },
      { name: 'Early Leaves', score: parseFloat((totals.earlyLeaves / count).toFixed(2)), color: '#8b5cf6' },
      { name: 'Late Arrivals', score: parseFloat((totals.lateArrivals / count).toFixed(2)), color: '#ec4899' },
    ];
  }, [state.teachers, state.hrData, state.hrRubric]);

  const stats = useMemo(() => {
    const allData = state.teachers.map(t => {
      const data = (state.hrData || []).find(d => d.teacherId === t.id) || { absences: 0, earlyLeaves: 0, lateArrivals: 0 };
      const s1 = getHRScore('absences', data.absences, hrRubric.absences);
      const s2 = getHRScore('earlyLeaves', data.earlyLeaves, hrRubric.earlyLeaves);
      const s3 = getHRScore('lateArrivals', data.lateArrivals, hrRubric.lateArrivals);
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
      <div className="flex justify-between items-start mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100">
              <span className="material-icons-outlined" style={{ fontSize: '28px' }}>event_available</span>
            </div>
            <h1 className="text-5xl font-black text-slate-900" style={{ fontFamily: '"Barlow Condensed", sans-serif', letterSpacing: '-0.02em' }}>HR ATTENDANCE DOMAIN</h1>
          </div>
          <p className="text-slate-500 max-w-2xl text-lg">Manage staff attendance, punctuality, and early departures. This data directly impacts the final performance evaluation scores.</p>
        </div>
        
        <div className="flex items-center gap-4 pt-2">
          {state.currentUser?.role === 'admin' && (
            <button 
              onClick={handleBulkReset}
              className="bg-white text-rose-600 border border-rose-100 px-5 py-3 rounded-2xl text-xs font-black hover:bg-rose-50 transition-all flex items-center gap-2 shadow-sm"
            >
              <span className="material-icons-outlined" style={{ fontSize: '20px' }}>restart_alt</span>
              RESET ALL
            </button>
          )}
          
          {state.currentUser?.role === 'admin' && (
            <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
              <div className="text-right">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">Domain Weight</div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-black text-indigo-600">{state.hrWeight}%</span>
                  <button onClick={() => setEditingWeight(true)} className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 flex items-center justify-center transition-all">
                    <span className="material-icons-outlined" style={{ fontSize: '18px' }}>edit</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                <span className="material-icons-outlined text-indigo-500" style={{ fontSize: '28px' }}>analytics</span>
                School Average Attendance
              </h2>
              <p className="text-slate-400 text-sm font-bold mt-1">Overall performance across all {state.teachers.length} staff members</p>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl">
              <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
              <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Avg Score (1-4)</span>
            </div>
          </div>
          <div style={{ height: '350px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ left: 40, right: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" domain={[0, 4]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#94a3b8' }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#475569' }} width={100} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 50px -12px rgba(0,0,0,0.15)', padding: '16px' }}
                />
                <Bar dataKey="score" radius={[0, 8, 8, 0]} barSize={40}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-8">
          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-slate-200 relative overflow-hidden flex-1">
            <div className="absolute -right-12 -bottom-12 opacity-10">
              <span className="material-icons" style={{ fontSize: '200px' }}>verified_user</span>
            </div>
            <div className="relative z-10">
              <div className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] mb-8">System Statistics</div>
              <div className="grid grid-cols-2 gap-y-10 gap-x-6">
                <div>
                  <div className="text-5xl font-black mb-2" style={{ fontFamily: '"Barlow Condensed", sans-serif' }}>{stats.avg}</div>
                  <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Avg HR Score</div>
                </div>
                <div>
                  <div className="text-5xl font-black mb-2 text-emerald-400" style={{ fontFamily: '"Barlow Condensed", sans-serif' }}>{stats.excellent}</div>
                  <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Excellent</div>
                </div>
                <div>
                  <div className="text-5xl font-black mb-2 text-rose-400" style={{ fontFamily: '"Barlow Condensed", sans-serif' }}>{stats.warning}</div>
                  <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Needs Review</div>
                </div>
                <div>
                  <div className="text-5xl font-black mb-2 text-indigo-400" style={{ fontFamily: '"Barlow Condensed", sans-serif' }}>{chartData.length}</div>
                  <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Total Staff</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 rounded-[2.5rem] p-10 border border-indigo-100">
            <h3 className="text-xs font-black text-indigo-900 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
              <span className="material-icons-outlined text-indigo-500" style={{ fontSize: '20px' }}>gavel</span>
              Scoring Rubric
            </h3>
            <div className="space-y-5">
              {(['absences', 'earlyLeaves', 'lateArrivals'] as const).map(key => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-xs font-black text-indigo-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="text-[11px] font-mono font-bold text-indigo-500 bg-white px-3 py-1.5 rounded-xl border border-indigo-100 shadow-sm">
                    4: 0-{hrRubric[key][0]} | 3: ≤{hrRubric[key][1]} | 2: ≤{hrRubric[key][2]} | 1: {'>'}{hrRubric[key][2]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-50 bg-slate-50/30 flex flex-wrap justify-between items-center gap-6">
          <h2 className="text-2xl font-black text-slate-800">Staff Attendance Records</h2>
          <div className="flex items-center gap-6 flex-1 max-w-xl">
            <div className="relative flex-1">
              <span className="material-icons-outlined" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '22px' }}>search</span>
              <input 
                className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-[1.5rem] text-sm font-bold text-slate-700 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
                placeholder="Search staff by name or ID..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Real-time Sync Active</div>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white">
              <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Employee Details</th>
              <th className="py-4 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] text-center">Absences</th>
              <th className="py-4 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] text-center">Early Leaves</th>
              <th className="py-4 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] text-center">Late Arrivals</th>
              <th className="py-4 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] text-center">Final Score</th>
              <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Notes & Observations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredTeachers.map(t => {
              const data = (state.hrData || []).find(d => d.teacherId === t.id) || { absences: 0, earlyLeaves: 0, lateArrivals: 0, notes: '' };
              
              const s1 = getHRScore('absences', data.absences ?? 0, hrRubric.absences);
              const s2 = getHRScore('earlyLeaves', data.earlyLeaves ?? 0, hrRubric.earlyLeaves);
              const s3 = getHRScore('lateArrivals', data.lateArrivals ?? 0, hrRubric.lateArrivals);
              const avg = ((s1 + s2 + s3) / 3).toFixed(2);
              
              const isReadOnly = state.currentUser?.role !== 'admin' && state.currentUser?.role !== 'hr';

              return (
                <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-6 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-black text-xs shadow-inner">
                        {t.fullName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-black text-slate-900 text-base">{t.fullName}</div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{t.role} · {t.subject}</div>
                        {t.employeeId && <div className="text-[9px] font-mono font-bold text-indigo-400 mt-1">ID: {t.employeeId}</div>}
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-4 text-center">
                    <div className="inline-block">
                      <input 
                        type="number" 
                        min="0"
                        value={(data.absences ?? 0).toString()} 
                        onChange={e => handleDataChange(t.id, 'absences', e.target.value)}
                        disabled={isReadOnly}
                        className="w-16 px-0 py-2 bg-slate-50 border-none rounded-xl text-center font-black text-slate-700 text-base focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all disabled:opacity-50"
                      />
                      <div className="text-[9px] font-black mt-2 px-2 py-0.5 rounded-full inline-block" style={{ 
                        backgroundColor: s1 >= 3 ? '#ecfdf5' : s1 === 2 ? '#fffbeb' : '#fef2f2',
                        color: s1 >= 3 ? '#10b981' : s1 === 2 ? '#f59e0b' : '#f43f5e',
                        border: `1px solid ${s1 >= 3 ? '#10b98120' : s1 === 2 ? '#f59e0b20' : '#f43f5e20'}`
                      }}>SCORE: {s1}</div>
                    </div>
                  </td>
                  <td className="py-6 px-4 text-center">
                    <div className="inline-block">
                      <input 
                        type="number" 
                        min="0"
                        value={(data.earlyLeaves ?? 0).toString()} 
                        onChange={e => handleDataChange(t.id, 'earlyLeaves', e.target.value)}
                        disabled={isReadOnly}
                        className="w-16 px-0 py-2 bg-slate-50 border-none rounded-xl text-center font-black text-slate-700 text-base focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all disabled:opacity-50"
                      />
                      <div className="text-[9px] font-black mt-2 px-2 py-0.5 rounded-full inline-block" style={{ 
                        backgroundColor: s2 >= 3 ? '#ecfdf5' : s2 === 2 ? '#fffbeb' : '#fef2f2',
                        color: s2 >= 3 ? '#10b981' : s2 === 2 ? '#f59e0b' : '#f43f5e',
                        border: `1px solid ${s2 >= 3 ? '#10b98120' : s2 === 2 ? '#f59e0b20' : '#f43f5e20'}`
                      }}>SCORE: {s2}</div>
                    </div>
                  </td>
                  <td className="py-6 px-4 text-center">
                    <div className="inline-block">
                      <input 
                        type="number" 
                        min="0"
                        value={(data.lateArrivals ?? 0).toString()} 
                        onChange={e => handleDataChange(t.id, 'lateArrivals', e.target.value)}
                        disabled={isReadOnly}
                        className="w-16 px-0 py-2 bg-slate-50 border-none rounded-xl text-center font-black text-slate-700 text-base focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all disabled:opacity-50"
                      />
                      <div className="text-[9px] font-black mt-2 px-2 py-0.5 rounded-full inline-block" style={{ 
                        backgroundColor: s3 >= 3 ? '#ecfdf5' : s3 === 2 ? '#fffbeb' : '#fef2f2',
                        color: s3 >= 3 ? '#10b981' : s3 === 2 ? '#f59e0b' : '#f43f5e',
                        border: `1px solid ${s3 >= 3 ? '#10b98120' : s3 === 2 ? '#f59e0b20' : '#f43f5e20'}`
                      }}>SCORE: {s3}</div>
                    </div>
                  </td>
                  <td className="py-6 px-4 text-center">
                    <div className="inline-flex flex-col items-center">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl shadow-sm border-4" style={{ 
                        backgroundColor: parseFloat(avg) >= 3.5 ? '#f0fdf4' : parseFloat(avg) >= 2.5 ? '#f5f3ff' : '#fff1f2',
                        borderColor: parseFloat(avg) >= 3.5 ? '#10b981' : parseFloat(avg) >= 2.5 ? '#6366f1' : '#f43f5e',
                        color: parseFloat(avg) >= 3.5 ? '#10b981' : parseFloat(avg) >= 2.5 ? '#6366f1' : '#f43f5e'
                      }}>
                        {avg}
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-6">
                    <textarea 
                      value={data.notes || ''} 
                      onChange={e => handleDataChange(t.id, 'notes', e.target.value)}
                      disabled={isReadOnly}
                      placeholder="Add HR observations..."
                      className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-xs font-bold text-slate-600 focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all disabled:opacity-50 min-h-[80px] resize-none placeholder:text-slate-300"
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
