import * as XLSX from "xlsx";
import { AppState } from "../types";
import { computeScore, getHRScore } from "./helpers";

export const exportToExcel = (state: AppState, selectedData: string[]) => {
  const wb = XLSX.utils.book_new();

  if (selectedData.includes("teachers")) {
    const ws = XLSX.utils.json_to_sheet(state.teachers);
    XLSX.utils.book_append_sheet(wb, ws, "Teachers");
  }

  if (selectedData.includes("evaluations")) {
    const formattedEvaluations = state.evaluations.map((ev) => {
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
        Eval_ID: ev.id,
        Teacher_Name: teacher?.fullName || "Unknown",
        Teacher_Employee_ID: teacher?.employeeId || "N/A",
        Teacher_Subject: teacher?.subject || "N/A",
        Teacher_Division: teacher?.division || "N/A",
        Observer_Name: observer?.name || "Unknown",
        Date: ev.date,
        Type: ev.type,
        Score: score !== null ? parseFloat(score.toFixed(2)) : null,
        Draft: ev.draft,
        Scores_JSON: ev.scores ? JSON.stringify(ev.scores) : "[]",
        Comments: ev.comments || "",
      };
    });
    const ws = XLSX.utils.json_to_sheet(formattedEvaluations);
    XLSX.utils.book_append_sheet(wb, ws, "Evaluations");
  }

  if (selectedData.includes("finalEvaluation")) {
    const finals = state.evaluations.filter((e) => !e.draft);
    const hrRubricLevel = {
      absences: state.hrRubric?.absences || [2, 5, 9],
      earlyLate: state.hrRubric?.earlyLate ||
        (state.hrRubric as any)?.earlyLeaves || [2, 4, 7],
    };

    const finalData = state.teachers.map((teacher) => {
      const teacherFinals = finals.filter((f) => f.tid === teacher.id);
      const teacherHRData = state.hrData?.find(
        (h) => h.teacherId === teacher.id,
      );

      let obsSum = 0;
      let hrSum = 0;
      let hrCount = 0;
      let finalSum = 0;

      teacherFinals.forEach((f) => {
        // Pure observer score (ignoring HR weight/data entirely)
        obsSum += computeScore(
          f,
          state.customWeights,
          undefined,
          undefined,
          undefined,
        );

        // Final computed score (including HR data)
        finalSum += computeScore(
          f,
          state.customWeights,
          teacherHRData,
          state.hrWeight,
          hrRubricLevel,
        );

        // HR Score evaluation
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
        "# NAME": `${teacher.fullName} (${teacherFinals.length} eval${teacherFinals.length === 1 ? "" : "s"})`,
        "EMPLOYEE ID": teacher.employeeId || "N/A",
        SUBJECT: teacher.subject || "N/A",
        DIVISION: teacher.division || "N/A",
        TYPE: teacher.role || "N/A",
        "OBS SCORE": avgObsScore !== null ? avgObsScore : "N/A",
        "HR SCORE": avgHRScore !== null ? avgHRScore : "N/A",
        "AVG SCORE (FINAL)": avgFinalScore !== null ? avgFinalScore : "N/A",
      };
    });

    const ws = XLSX.utils.json_to_sheet(finalData);
    XLSX.utils.book_append_sheet(wb, ws, "Final Evaluation");
  }

  if (selectedData.includes("observers")) {
    const formattedObservers = state.observers.map((obs) => ({
      ...obs,
      permissions: obs.permissions ? JSON.stringify(obs.permissions) : "{}",
    }));
    const ws = XLSX.utils.json_to_sheet(formattedObservers);
    XLSX.utils.book_append_sheet(wb, ws, "Observers");
  }

  if (selectedData.includes("hrData")) {
    const formattedHRData = state.hrData.map((hr) => {
      const teacher = state.teachers.find((t) => t.id === hr.teacherId);
      return {
        Teacher_Name: teacher?.fullName || "Unknown",
        Teacher_Employee_ID: teacher?.employeeId || "N/A",
        Absences: hr.absences,
        Early_Late: hr.earlyLate,
        Notes: hr.notes || "",
        Last_Updated: hr.lastUpdated,
      };
    });
    const ws = XLSX.utils.json_to_sheet(formattedHRData);
    XLSX.utils.book_append_sheet(wb, ws, "HR Data");
  }

  if (selectedData.includes("logs")) {
    const ws = XLSX.utils.json_to_sheet(state.logs);
    XLSX.utils.book_append_sheet(wb, ws, "Logs");
  }

  XLSX.writeFile(wb, "EvaluationData.xlsx");
};
