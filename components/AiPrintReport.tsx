import React, { useEffect } from "react";
import { AppState } from "../types";
import { useLanguage } from "../context/LanguageContext";

interface AiPrintReportProps {
  teacherId: string;
  state: AppState;
  onBack: () => void;
}

export const AiPrintReport: React.FC<AiPrintReportProps> = ({ teacherId, state, onBack }) => {
  const { t } = useLanguage();
  const teacher = state.teachers.find(t => t.id === teacherId);

  useEffect(() => {
    // Auto-trigger print when component loads
    const timer = setTimeout(() => {
      window.print();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (!teacher || !teacher.aiSummary) {
    return (
      <div className="card max-w-2xl mx-auto mt-12 p-8">
        <h2 className="text-xl font-bold mb-4">No AI Summary available</h2>
        <button className="btn btn-dark" onClick={onBack}>Go Back</button>
      </div>
    );
  }

  const generatedDate = new Date(teacher.aiSummary.lastGenerated).toLocaleDateString(undefined, { 
    year: 'numeric', month: 'long', day: 'numeric' 
  });

  return (
    <div className="page p-12 max-w-4xl mx-auto bg-white" style={{ minHeight: "100vh" }}>
      <div className="no-print mb-8 frow flex-wrap gap-4" style={{ justifyContent: "space-between" }}>
        <button className="btn btn-ghost" onClick={onBack}>
          <span className="material-icons-outlined" style={{ fontSize: "18px", marginRight: 8 }}>arrow_back</span>
          Back
        </button>
        <button className="btn btn-dark" onClick={() => window.print()}>
          <span className="material-icons-outlined" style={{ fontSize: "18px", marginRight: 8 }}>print</span>
          Print Report
        </button>
      </div>

      <div className="print-only-layout">
        <div style={{ textAlign: "center", marginBottom: "40px", borderBottom: "2px solid #e2e8f0", paddingBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#1e293b", fontFamily: '"Barlow Condensed", sans-serif', textTransform: 'uppercase', letterSpacing: '1px' }}>
            AI-GENERATED PERFORMANCE SUMMARY
          </h1>
          <p style={{ fontSize: "16px", color: "#64748b", marginTop: "8px" }}>
            Teacher: <strong style={{ color: "#0f172a" }}>{teacher.fullName}</strong>
          </p>
          <p style={{ fontSize: "14px", color: "#64748b" }}>
            Generated on {generatedDate}
          </p>
        </div>

        <div style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#334155", marginBottom: "16px", paddingBottom: "8px", borderBottom: "1px solid #f1f5f9" }}>
            Executive Summary
          </h2>
          <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#334155" }}>
            {teacher.aiSummary.exec}
          </p>
        </div>

        <div style={{ marginBottom: "32px", background: "rgba(16, 185, 129, 0.05)", padding: "24px", borderRadius: "12px", border: "1px solid #bbf7d0" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#065f46", marginBottom: "16px" }}>
            Identified Strengths
          </h2>
          <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#064e3b" }}>
            {teacher.aiSummary.strengths}
          </p>
        </div>

        <div style={{ marginBottom: "32px", background: "rgba(239, 68, 68, 0.05)", padding: "24px", borderRadius: "12px", border: "1px solid #fecaca" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#991b1b", marginBottom: "16px" }}>
            Areas for Development
          </h2>
          <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#7f1d1d" }}>
            {teacher.aiSummary.areas}
          </p>
        </div>

        {teacher.aiSummary.hrInfo && (
          <div style={{ marginBottom: "32px", background: "rgba(59, 130, 246, 0.05)", padding: "24px", borderRadius: "12px", border: "1px solid #bfdbfe" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#1e40af", marginBottom: "16px" }}>
              HR Attendance & Punctuality
            </h2>
            <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#1e3a8a" }}>
              {teacher.aiSummary.hrInfo}
            </p>
          </div>
        )}
        
        <div style={{ marginTop: "60px", textAlign: "center", fontStyle: "italic", fontSize: "13px", color: "#94a3b8" }}>
          * This summary is generated via automated AI analysis based on verified classroom observation data.
        </div>
      </div>
    </div>
  );
};
export default AiPrintReport;
