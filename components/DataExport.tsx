import React, { useState } from 'react';
import { AppState } from '../types';
import { exportToExcel } from '../utils/excelExport';

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

  return (
    <div className="card-xl" style={{ padding: '32px', marginBottom: '32px' }}>
      <h2 style={{ fontFamily: '"Barlow Condensed", sans-serif', fontSize: '28px', fontWeight: 900, color: 'var(--navy)', marginBottom: '8px' }}>Data Export</h2>
      <p style={{ fontSize: '15px', color: 'var(--slate)', marginBottom: '24px' }}>Select data to export to Excel.</p>
      
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

      <button 
        className="btn btn-primary" 
        style={{ padding: '12px 24px', borderRadius: '12px', fontWeight: 800, letterSpacing: '0.05em' }}
        onClick={() => exportToExcel(state, selectedData)}
        disabled={selectedData.length === 0}
      >
        Export to Excel
      </button>
    </div>
  );
};

export default DataExport;
