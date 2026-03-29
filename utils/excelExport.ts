import * as XLSX from 'xlsx';
import { AppState } from '../types';

export const exportToExcel = (state: AppState, selectedData: string[]) => {
  const wb = XLSX.utils.book_new();

  if (selectedData.includes('teachers')) {
    const ws = XLSX.utils.json_to_sheet(state.teachers);
    XLSX.utils.book_append_sheet(wb, ws, 'Teachers');
  }

  if (selectedData.includes('evaluations')) {
    const ws = XLSX.utils.json_to_sheet(state.evaluations);
    XLSX.utils.book_append_sheet(wb, ws, 'Evaluations');
  }

  if (selectedData.includes('observers')) {
    const ws = XLSX.utils.json_to_sheet(state.observers);
    XLSX.utils.book_append_sheet(wb, ws, 'Observers');
  }

  if (selectedData.includes('hrData')) {
    const ws = XLSX.utils.json_to_sheet(state.hrData);
    XLSX.utils.book_append_sheet(wb, ws, 'HR Data');
  }

  if (selectedData.includes('logs')) {
    const ws = XLSX.utils.json_to_sheet(state.logs);
    XLSX.utils.book_append_sheet(wb, ws, 'Logs');
  }

  XLSX.writeFile(wb, 'EvaluationData.xlsx');
};
