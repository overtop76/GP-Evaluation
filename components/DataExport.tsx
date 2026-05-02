import React, { useState } from "react";
import { AppState } from "../types";
import { exportToExcel } from "../utils/excelExport";
import { computeScore, getHRScore } from "../utils/helpers";

interface DataExportProps {
  state: AppState;
}

const DataExport: React.FC<DataExportProps> = ({ state }) => {
  const [selectedData, setSelectedData] = useState<string[]>([
    "teachers",
    "evaluations",
  ]);

  const toggleData = (data: string) => {
    setSelectedData((prev) =>
      prev.includes(data) ? prev.filter((d) => d !== data) : [...prev, data],
    );
  };

  const exportToJson = () => {
    const dataToExport: any = {};
    if (selectedData.includes("teachers"))
      dataToExport.teachers = state.teachers;
    if (selectedData.includes("evaluations")) {
      dataToExport.evaluations = state.evaluations.map((ev) => {
        const teacher = state.teachers.find((t) => t.id === ev.tid);
        const observer = state.observers.find((o) => o.id === ev.oid);
        const hrData = state.hrData.find((h) => h.teacherId === ev.tid);
        const score = computeScore(
          ev,
          state.customWeights,
          hrData,
          state.hrWeight,
          state.hrRubric,
        );

        return {
          ...ev,
          teacherName: teacher?.fullName || "Unknown",
          teacherEmployeeId: teacher?.employeeId || "N/A",
          observerName: observer?.name || "Unknown",
          computedScore: score !== null ? parseFloat(score.toFixed(2)) : null,
        };
      });
    }
    if (selectedData.includes("finalEvaluation")) {
      const finals = state.evaluations.filter((e) => !e.draft);
      const hrRubricLevel = {
        absences: state.hrRubric?.absences || [2, 5, 9],
        earlyLate: state.hrRubric?.earlyLate ||
          (state.hrRubric as any)?.earlyLeaves || [2, 4, 7],
      };

      dataToExport.finalEvaluation = state.teachers.map((teacher) => {
        const teacherFinals = finals.filter((f) => f.tid === teacher.id);
        const teacherHRData = state.hrData?.find(
          (h) => h.teacherId === teacher.id,
        );

        let obsSum = 0;
        let hrSum = 0;
        let hrCount = 0;
        let finalSum = 0;

        teacherFinals.forEach((f) => {
          obsSum += computeScore(
            f,
            state.customWeights,
            undefined,
            undefined,
            undefined,
          );
          finalSum += computeScore(
            f,
            state.customWeights,
            teacherHRData,
            state.hrWeight,
            hrRubricLevel,
          );

          if (teacherHRData && state.hrWeight && state.hrWeight > 0) {
            const s1 = getHRScore(
              "absences",
              teacherHRData.absences ?? 0,
              hrRubricLevel.absences,
            );
            const s2 = getHRScore(
              "earlyLate",
              teacherHRData.earlyLate ?? 0,
              hrRubricLevel.earlyLate,
            );
            hrSum += (s1 + s2) / 2;
            hrCount++;
          }
        });

        const avgObsScore =
          teacherFinals.length > 0
            ? parseFloat((obsSum / teacherFinals.length).toFixed(2))
            : null;
        const avgHRScore =
          hrCount > 0 ? parseFloat((hrSum / hrCount).toFixed(2)) : null;
        const avgFinalScore =
          teacherFinals.length > 0
            ? parseFloat((finalSum / teacherFinals.length).toFixed(2))
            : null;

        return {
          Name: teacher.fullName,
          Evals_Count: teacherFinals.length,
          Employee_ID: teacher.employeeId || "N/A",
          Subject: teacher.subject || "N/A",
          Division: teacher.division || "N/A",
          Type_Role: teacher.role || "N/A",
          Obs_Score: avgObsScore,
          HR_Score: avgHRScore,
          Avg_Score_Final: avgFinalScore,
        };
      });
    }
    if (selectedData.includes("observers"))
      dataToExport.observers = state.observers;
    if (selectedData.includes("hrData")) {
      dataToExport.hrData = state.hrData.map((hr) => {
        const teacher = state.teachers.find((t) => t.id === hr.teacherId);
        return {
          ...hr,
          teacherName: teacher?.fullName || "Unknown",
          teacherEmployeeId: teacher?.employeeId || "N/A",
        };
      });
    }
    if (selectedData.includes("logs")) dataToExport.logs = state.logs;

    const jsonString = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "EvaluationData.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card-xl" style={{ padding: "32px", marginBottom: "32px" }}>
      <h2
        style={{
          fontFamily: '"Barlow Condensed", sans-serif',
          fontSize: "28px",
          fontWeight: 900,
          color: "var(--navy)",
          marginBottom: "8px",
        }}
      >
        Data Export
      </h2>
      <p
        style={{
          fontSize: "15px",
          color: "var(--slate)",
          marginBottom: "24px",
        }}
      >
        Select data to export to Excel or JSON.
      </p>

      <div
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}
      >
        {[
          { id: "teachers", label: "Teachers" },
          { id: "evaluations", label: "Evaluations" },
          { id: "finalEvaluation", label: "Final Evaluation" },
          { id: "observers", label: "Observers" },
          { id: "hrData", label: "HR Data" },
          { id: "logs", label: "Logs" },
        ].map((data) => (
          <label
            key={data.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={selectedData.includes(data.id)}
              onChange={() => toggleData(data.id)}
            />
            <span
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--navy)",
              }}
            >
              {data.label}
            </span>
          </label>
        ))}
      </div>

      <div style={{ display: "flex", gap: "12px" }}>
        <button
          className="btn btn-primary"
          style={{
            padding: "12px 24px",
            borderRadius: "12px",
            fontWeight: 800,
            letterSpacing: "0.05em",
          }}
          onClick={() => exportToExcel(state, selectedData)}
          disabled={selectedData.length === 0}
        >
          Export to Excel
        </button>
        <button
          className="btn btn-ghost"
          style={{
            padding: "12px 24px",
            borderRadius: "12px",
            fontWeight: 800,
            letterSpacing: "0.05em",
            border: "1px solid var(--border)",
          }}
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
