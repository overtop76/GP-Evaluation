import { Domain } from '../types';

export const HOD_RUBRIC: Domain[] = [
  {
    "domain": "D1: Instructional Leadership & Coaching",
    "weight": 25,
    "subdomains": [
      {
        "name": "Instructional Leadership & Coaching",
        "indicators": [
          {
            "id": "HOD1.1",
            "text": "Classroom Observations & Feedback",
            "evidence": "Observation Reports",
            "levels": {
              "4": "Conducts regular, high-impact observations; feedback leads to immediate, measurable teacher growth.",
              "3": "Performs scheduled observations and provides constructive, written feedback.",
              "2": "Observations are infrequent or feedback is generic/non-actionable.",
              "1": "Fails to conduct observations; provides no instructional guidance."
            }
          },
          {
            "id": "HOD1.2",
            "text": "Teacher Mentorship & Support",
            "evidence": "Coaching Records",
            "levels": {
              "4": "Acts as a master coach; proactively identifies and closes skill gaps in department staff.",
              "3": "Provides consistent mentorship and support to new and existing teachers.",
              "2": "Support is reactive (only when problems arise); lacks a coaching plan.",
              "1": "Ignores teacher development; fosters a non-supportive environment."
            }
          },
          {
            "id": "HOD1.3",
            "text": "PD Design & Delivery",
            "evidence": "PD Materials & Attendance",
            "levels": {
              "4": "Leads innovative PD sessions that are modeled by other departments.",
              "3": "Identifies PD needs and assists in delivery of departmental training.",
              "2": "Attendance at PD is passive; fails to identify staff training needs.",
              "1": "Avoids PD responsibilities; does not contribute to staff growth."
            }
          }
        ]
      }
    ]
  },
  {
    "domain": "D2: Curriculum, Innovation & Team Comm.",
    "weight": 20,
    "subdomains": [
      {
        "name": "Curriculum, Innovation & Team Comm.",
        "indicators": [
          {
            "id": "HOD2.1",
            "text": "Curriculum Development",
            "evidence": "Curriculum Maps",
            "levels": {
              "4": "Expertly refines curriculum for vertical/horizontal alignment; exceeds global standards.",
              "3": "Collaborates to refine curriculum aligned with school goals and standards.",
              "2": "Curriculum updates are superficial or lack alignment with stage goals.",
              "1": "Fails to oversee curriculum; content is outdated or misaligned."
            }
          },
          {
            "id": "HOD2.2",
            "text": "Instructional Technology & Innovation",
            "evidence": "Observation & LMS",
            "levels": {
              "4": "Drives the integration of cutting-edge tech; department models digital excellence.",
              "3": "Encourages and monitors the effective use of instructional technology.",
              "2": "Minimal push for innovation; tech use is sporadic or basic.",
              "1": "Resists new methodologies; relies on outdated instructional materials."
            }
          },
          {
            "id": "HOD2.3",
            "text": "Departmental Teacher Communication",
            "evidence": "Meeting Minutes & Comm. Log",
            "levels": {
              "4": "Models transparent, proactive communication with all department teachers; ensures 100% team alignment.",
              "3": "Facilitates regular, clear communication and information sharing with all department teachers.",
              "2": "Communication with the team is inconsistent, causing gaps in information.",
              "1": "Fails to communicate with teachers; creates a siloed or uninformed team."
            }
          }
        ]
      }
    ]
  },
  {
    "domain": "D3: Assessment Design & Data Monitoring",
    "weight": 15,
    "subdomains": [
      {
        "name": "Assessment Design & Data Monitoring",
        "indicators": [
          {
            "id": "HOD3.1",
            "text": "Assessment Design & Supervision",
            "evidence": "Assessment Samples",
            "levels": {
              "4": "Supervises creation of rigorous Formative/Summative assessments based on standards; integrates Academic Dean feedback perfectly.",
              "3": "Ensures all assessments are based on standards; abides by feedback from the Academic Dean.",
              "2": "Assessments are inconsistent in rigor; slow to incorporate Academic Dean feedback.",
              "1": "Fails to oversee assessment creation; ignores Academic Dean feedback/standards."
            }
          },
          {
            "id": "HOD3.2",
            "text": "Data Analysis & Intervention",
            "evidence": "Data Reports",
            "levels": {
              "4": "Uses data to predict trends; coordinates highly effective, proactive interventions.",
              "3": "Collaborates with teachers to analyze data and identify areas for improvement.",
              "2": "Data is collected but rarely analyzed to change instructional paths.",
              "1": "No data analysis; student regression goes unnoticed."
            }
          }
        ]
      }
    ]
  },
  {
    "domain": "D4: Strategic Coordination & Alignment",
    "weight": 15,
    "subdomains": [
      {
        "name": "Strategic Coordination & Alignment",
        "indicators": [
          {
            "id": "HOD4.1",
            "text": "Vertical & Horizontal Alignment",
            "evidence": "Meeting Minutes",
            "levels": {
              "4": "Facilitates seamless transitions between grade levels; eliminates instructional gaps.",
              "3": "Collaborates with other HODs to ensure curriculum and practice alignment.",
              "2": "Coordination with other departments is minimal or reactive.",
              "1": "Department works in a silo; significant alignment gaps exist."
            }
          },
          {
            "id": "HOD4.2",
            "text": "Departmental Meetings",
            "evidence": "Meeting Minutes",
            "levels": {
              "4": "Meetings are solution-focused, highly collaborative, and drive school strategy.",
              "3": "Facilitates regular meetings and clear communication channels.",
              "2": "Meetings are disorganized or lack clear objectives/minutes.",
              "1": "Fails to facilitate communication or hold departmental meetings."
            }
          }
        ]
      }
    ]
  },
  {
    "domain": "D5: Stakeholder Communication",
    "weight": 10,
    "subdomains": [
      {
        "name": "Stakeholder Communication",
        "indicators": [
          {
            "id": "HOD5.1",
            "text": "Stage Principal & Academic Dean Comm.",
            "evidence": "Reports & Emails",
            "levels": {
              "4": "Proactively briefs both Stage Principal and Academic Dean with detailed, solution-oriented reports.",
              "3": "Maintains professional and timely communication with both Stage Principal and Academic Dean.",
              "2": "Communication with leadership is reactive or requires frequent follow-ups.",
              "1": "Fails to report to Stage Principal or Academic Dean; hides departmental issues."
            }
          },
          {
            "id": "HOD5.2",
            "text": "Parent & Community Engagement",
            "evidence": "Comm. Log",
            "levels": {
              "4": "Builds strong community trust; handles complex parent concerns with expert diplomacy.",
              "3": "Engages parents regarding programs, progress, and school events.",
              "2": "Parent communication is infrequent or lacks professional polish.",
              "1": "Avoids parent interaction; unprofessional in stakeholder engagement."
            }
          }
        ]
      }
    ]
  },
  {
    "domain": "D6: Deadlines, Compliance & Professionalism",
    "weight": 15,
    "subdomains": [
      {
        "name": "Deadlines, Compliance & Professionalism",
        "indicators": [
          {
            "id": "HOD6.1",
            "text": "Policy Implementation",
            "evidence": "Observation & Files",
            "levels": {
              "4": "Models 100% compliance; proactively updates departmental guidelines.",
              "3": "Ensures compliance with all school policies and procedural requirements.",
              "2": "Requires reminders to enforce school policies within the department.",
              "1": "Non-compliant; ignores school procedures and academic policies."
            }
          },
          {
            "id": "HOD6.2",
            "text": "Deadline Adherence & Conduct",
            "evidence": "Submission Log",
            "levels": {
              "4": "Zero late submissions; perfectly adheres to all deadlines set by Stage Principal and Academic Dean.",
              "3": "Consistently meets all administrative deadlines set by the Stage Principal and Academic Dean.",
              "2": "Frequently misses deadlines or requires extensions; lacks administrative punctuality.",
              "1": "Chronically late with reports/submissions; ignores leadership deadlines."
            }
          }
        ]
      }
    ]
  }
];
