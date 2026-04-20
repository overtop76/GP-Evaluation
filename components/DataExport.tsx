import React, { useState } from 'react';
import { AppState } from '../types';
import { exportToExcel } from '../utils/excelExport';
import { computeScore } from '../utils/helpers';

interface DataExportProps {
  state: AppState;
}

const DataExport: React.FC<DataExportProps> = ({ state }) => {
  const [selectedData, setSelectedData] = useState<string[]>(['teachers', 'evaluations']);

  const toggleData = (data: string) => {
    setSelectedData(prev => 
      prev.includes(data) ? prev.filter(d => d !== data) : [...prev, data]
    );
  };

  const exportToJson = () => {
    const dataToExport: any = {};
    if (selectedData.includes('teachers')) dataToExport.teachers = state.teachers;
    if (selectedData.includes('evaluations')) {
      dataToExport.evaluations = state.evaluations.map(ev => {
        const teacher = state.teachers.find(t => t.id === ev.tid);
        const observer = state.observers.find(o => o.id === ev.oid);
        const hrData = state.hrData.find(h => h.teacherId === ev.tid);
        const score = computeScore(ev, state.customWeights, hrData, state.hrWeight, state.hrRubric);
        
        return {
          ...ev,
          teacherName: teacher?.fullName || 'Unknown',
          teacherEmployeeId: teacher?.employeeId || 'N/A',
          observerName: observer?.name || 'Unknown',
          computedScore: score !== null ? parseFloat(score.toFixed(2)) : null
        };
      });
    }
    if (selectedData.includes('observers')) dataToExport.observers = state.observers;
    if (selectedData.includes('hrData')) {
      dataToExport.hrData = state.hrData.map(hr => {
        const teacher = state.teachers.find(t => t.id === hr.teacherId);
        return {
          ...hr,
          teacherName: teacher?.fullName || 'Unknown',
          teacherEmployeeId: teacher?.employeeId || 'N/A'
        };
      });
    }
    if (selectedData.includes('logs')) dataToExport.logs = state.logs;

    const jsonString = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'EvaluationData.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card-xl" style={{ padding: '32px', marginBottom: '32px' }}>
      <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '28px', fontWeight: 900, color: 'var(--navy)', marginBottom: '8px' }}>Data Export</h2>
      <p style={{ fontSize: '15px', color: 'var(--slate)', marginBottom: '24px' }}>Select data to export to Excel or JSON.</p>
      
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {['teachers', 'evaluations', 'observers', 'hrData', 'logs'].map(data => (
          <label key={data} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={selectedData.includes(data)} 
              onChange={() => toggleData(data)} 
            />
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--navy)', textTransform: 'capitalize' }}>{data}</span>
          </label>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button 
          className="btn btn-primary" 
          style={{ padding: '12px 24px', borderRadius: '12px', fontWeight: 800, letterSpacing: '0.05em' }}
          onClick={() => exportToExcel(state, selectedData)}
          disabled={selectedData.length === 0}
        >
          Export to Excel
        </button>
        <button 
          className="btn btn-ghost" 
          style={{ padding: '12px 24px', borderRadius: '12px', fontWeight: 800, letterSpacing: '0.05em', border: '1px solid var(--border)' }}
          onClick={exportToJson}
          disabled={selectedData.length === 0}
        >
          Export to JSON
        </button>
      </div>
    </div>
  );
};

export default DataExport;
