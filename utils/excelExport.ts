import * as XLSX from 'xlsx';
import { AppState } from '../types';
import { computeScore } from './helpers';

export const exportToExcel = (state: AppState, selectedData: string[]) => {
  const wb = XLSX.utils.book_new();

  if (selectedData.includes('teachers')) {
    const ws = XLSX.utils.json_to_sheet(state.teachers);
    XLSX.utils.book_append_sheet(wb, ws, 'Teachers');
  }

  if (selectedData.includes('evaluations')) {
    const formattedEvaluations = state.evaluations.map(ev => {
      const teacher = state.teachers.find(t => t.id === ev.tid);
      const observer = state.observers.find(o => o.id === ev.oid);
      const hrData = state.hrData.find(h => h.teacherId === ev.tid);
      const score = computeScore(ev, state.customWeights, hrData, state.hrWeight, state.hrRubric);

      return {
        Eval_ID: ev.id,
        Teacher_Name: teacher?.fullName || 'Unknown',
        Teacher_Employee_ID: teacher?.employeeId || 'N/A',
        Teacher_Subject: teacher?.subject || 'N/A',
        Teacher_Division: teacher?.division || 'N/A',
        Observer_Name: observer?.name || 'Unknown',
        Date: ev.date,
        Type: ev.type,
        Score: score !== null ? parseFloat(score.toFixed(2)) : null,
        Draft: ev.draft,
        Scores_JSON: ev.scores ? JSON.stringify(ev.scores) : '[]',
        Comments: ev.comments || ''
      };
    });
    const ws = XLSX.utils.json_to_sheet(formattedEvaluations);
    XLSX.utils.book_append_sheet(wb, ws, 'Evaluations');
  }

  if (selectedData.includes('observers')) {
    const formattedObservers = state.observers.map(obs => ({
      ...obs,
      permissions: obs.permissions ? JSON.stringify(obs.permissions) : '{}'
    }));
    const ws = XLSX.utils.json_to_sheet(formattedObservers);
    XLSX.utils.book_append_sheet(wb, ws, 'Observers');
  }

  if (selectedData.includes('hrData')) {
    const formattedHRData = state.hrData.map(hr => {
      const teacher = state.teachers.find(t => t.id === hr.teacherId);
      return {
        Teacher_Name: teacher?.fullName || 'Unknown',
        Teacher_Employee_ID: teacher?.employeeId || 'N/A',
        Absences: hr.absences,
        Early_Late: hr.earlyLate,
        Notes: hr.notes || '',
        Last_Updated: hr.lastUpdated
      };
    });
    const ws = XLSX.utils.json_to_sheet(formattedHRData);
    XLSX.utils.book_append_sheet(wb, ws, 'HR Data');
  }

  if (selectedData.includes('logs')) {
    const ws = XLSX.utils.json_to_sheet(state.logs);
    XLSX.utils.book_append_sheet(wb, ws, 'Logs');
  }

  XLSX.writeFile(wb, 'EvaluationData.xlsx');
};
