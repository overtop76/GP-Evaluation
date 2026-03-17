import { Domain } from '../types';

export const HOD_RUBRIC: Domain[] = [
  {
    "domain": "D1: Instructional Leadership & Teacher Coaching",
    "weight": 25,
    "subdomains": [
      {
        "name": "Classroom Observations",
        "indicators": [
          {
            "id": "HOD1.1",
            "text": "Conducts regular, structured, and high-impact classroom observations; provides specific, evidence-based written feedback that leads to measurable teacher growth.",
            "evidence": "Observation Reports",
            "levels": {
              "4": "Conducts frequent, high-impact observations with differentiated coaching cycles; feedback is immediately actionable and leads to measurable, sustained teacher growth across all staff.",
              "3": "Performs scheduled formal and informal observations and provides constructive, specific written feedback to all teachers in the department.",
              "2": "Observations are infrequent, inconsistently scheduled, or feedback provided is too generic and non-actionable to lead to teacher improvement.",
              "1": "Fails to conduct classroom observations; provides no structured instructional feedback or guidance to teachers."
            }
          },
          {
            "id": "HOD1.2",
            "text": "Acts as a master coach for all department teachers; proactively identifies skill gaps and designs differentiated support plans.",
            "evidence": "Coaching Records",
            "levels": {
              "4": "Functions as a master coach; proactively maps skill gaps across all staff and implements differentiated coaching cycles that result in measurable improvement in every teacher's practice.",
              "3": "Provides consistent, structured mentorship and targeted instructional support to both new and experienced teachers in the department.",
              "2": "Coaching support is reactive (only when problems are escalated); lacks a proactive coaching plan or schedule.",
              "1": "Ignores teacher development entirely; fosters a non-collaborative, non-supportive departmental environment."
            }
          }
        ]
      },
      {
        "name": "Professional Development Leadership",
        "indicators": [
          {
            "id": "HOD1.3",
            "text": "Identifies departmental PD needs based on data, designs responsive PD sessions, and actively facilitates staff learning.",
            "evidence": "PD Materials & Attendance",
            "levels": {
              "4": "Leads innovative, data-driven PD sessions that are celebrated and replicated by other departments; ensures all staff have personalized PD pathways.",
              "3": "Identifies departmental PD needs based on observation and performance data; contributes meaningfully to the design and delivery of targeted training.",
              "2": "PD participation is passive; fails to proactively identify staff training needs or design responsive learning opportunities.",
              "1": "Avoids PD design and facilitation responsibilities; makes no visible contribution to staff professional growth."
            }
          },
          {
            "id": "HOD1.4",
            "text": "Builds a collaborative, growth-oriented departmental culture where teachers feel safe to experiment, share, and improve.",
            "evidence": "Observation & Staff Feedback",
            "levels": {
              "4": "Cultivates a thriving learning community within the department; teachers are highly collaborative, mutually supportive, and collectively driven to improve practice.",
              "3": "Fosters a generally positive and collaborative departmental culture; creates conditions where teachers feel supported and valued.",
              "2": "Departmental culture is neutral or inconsistent; some staff feel unsupported or disconnected from the team.",
              "1": "Departmental culture is toxic, siloed, or fear-based; teacher morale is low and collaboration is absent."
            }
          }
        ]
      }
    ]
  },
  {
    "domain": "D2: Curriculum, Innovation & Team Communication",
    "weight": 20,
    "subdomains": [
      {
        "name": "Curriculum Oversight & Development",
        "indicators": [
          {
            "id": "HOD2.1",
            "text": "Oversees and actively leads curriculum development and mapping to ensure rigorous vertical and horizontal alignment across all grade levels.",
            "evidence": "Curriculum Maps",
            "levels": {
              "4": "Expertly leads curriculum refinement; achieves seamless vertical and horizontal alignment that exceeds international benchmarks; curriculum is an exemplar for other departments.",
              "3": "Collaborates effectively to develop and refine curriculum maps that are aligned with school goals, standards, and stage expectations.",
              "2": "Curriculum oversight is superficial; alignment gaps between grade levels exist and are not being proactively addressed.",
              "1": "Fails to oversee curriculum; content is outdated, misaligned with standards, or inconsistently applied across the department."
            }
          },
          {
            "id": "HOD2.2",
            "text": "Drives the integration of innovative, research-based instructional methodologies and technology across the department.",
            "evidence": "Observation & LMS",
            "levels": {
              "4": "Actively drives a culture of instructional innovation; department is a recognized leader in technology integration and research-based practice across the whole school.",
              "3": "Consistently encourages and monitors the effective integration of appropriate instructional technology and innovative teaching practices.",
              "2": "Minimal push for instructional innovation; technology integration across the department is sporadic, uncoordinated, or basic.",
              "1": "Resists new instructional methodologies; the department relies on outdated materials and approaches."
            }
          }
        ]
      },
      {
        "name": "Departmental Communication",
        "indicators": [
          {
            "id": "HOD2.3",
            "text": "Facilitates transparent, consistent, and proactive communication with all department teachers to ensure 100% team alignment.",
            "evidence": "Meeting Minutes & Comm. Log",
            "levels": {
              "4": "Models transparent, proactive communication at all times; ensures 100% team alignment on all instructions, policy updates, and curriculum changes with zero information gaps.",
              "3": "Facilitates regular, clear, and effective communication with all department teachers; key information is disseminated in a timely manner.",
              "2": "Departmental communication is inconsistent; some teachers are left uninformed, creating information gaps and misalignment.",
              "1": "Communication within the department is absent or dysfunctional; the team is uninformed, siloed, and unable to operate cohesively."
            }
          },
          {
            "id": "HOD2.4",
            "text": "Manages all departmental administrative tasks (timetables, resources, budgets, materials) efficiently and proactively.",
            "evidence": "Admin Records",
            "levels": {
              "4": "Manages all departmental operations with exceptional efficiency and foresight; anticipates needs and resolves issues before they impact teaching and learning.",
              "3": "Manages departmental administrative tasks competently and on schedule; resources and logistics are organized and ready.",
              "2": "Administrative management is reactive; issues are addressed only after they have already impacted the department's operations.",
              "1": "Departmental administration is neglected; chronic disorganization negatively impacts teaching quality and staff morale."
            }
          }
        ]
      }
    ]
  },
  {
    "domain": "D3: Assessment Design & Data-Driven Improvement",
    "weight": 15,
    "subdomains": [
      {
        "name": "Assessment Design & Quality Assurance",
        "indicators": [
          {
            "id": "HOD3.1",
            "text": "Supervises and ensures the creation of rigorous, standards-based, and pedagogically sound assessments across all department grade levels.",
            "evidence": "Assessment Samples",
            "levels": {
              "4": "Leads the design of exemplary, rigorous assessments; provides expert editorial feedback to all teachers; assessments are models of standards-based design.",
              "3": "Ensures all department assessments are standards-based and quality-assured; incorporates feedback from the Academic Dean effectively.",
              "2": "Assessment oversight is inconsistent; some assessments lack rigor or do not align with standards; slow to incorporate Academic Dean feedback.",
              "1": "Fails to oversee assessment quality; ignores Academic Dean feedback and allows misaligned or low-quality assessments to be administered."
            }
          },
          {
            "id": "HOD3.2",
            "text": "Leads systematic data analysis processes across the department; uses findings to identify trends and implement targeted interventions.",
            "evidence": "Data Reports",
            "levels": {
              "4": "Leads expert, systematic data analysis; uses predictive data models to proactively identify at-risk students and implement targeted, evidence-based interventions.",
              "3": "Collaborates regularly with department teachers to analyze performance data; identifies trends and implements responsive intervention plans.",
              "2": "Data collection is performed but rarely followed by rigorous analysis or changes to intervention strategies.",
              "1": "No systematic data analysis occurs; student regression goes unidentified and unaddressed; the department lacks a data-driven culture."
            }
          }
        ]
      },
      {
        "name": "Assessment Design & Quality Assurance",
        "indicators": [
          {
            "id": "HOD3.1",
            "text": "Supervises and ensures the creation of rigorous, standards-based, and pedagogically sound assessments across all department grade levels.",
            "evidence": "Assessment Samples",
            "levels": {
              "4": "Leads the design of exemplary, rigorous assessments; provides expert editorial feedback to all teachers; assessments are models of standards-based design.",
              "3": "Ensures all department assessments are standards-based and quality-assured; incorporates feedback from the Academic Dean effectively.",
              "2": "Assessment oversight is inconsistent; some assessments lack rigor or do not align with standards; slow to incorporate Academic Dean feedback.",
              "1": "Fails to oversee assessment quality; ignores Academic Dean feedback and allows misaligned or low-quality assessments to be administered."
            }
          },
          {
            "id": "HOD3.2",
            "text": "Leads systematic data analysis processes across the department; uses findings to identify trends and implement targeted interventions.",
            "evidence": "Data Reports",
            "levels": {
              "4": "Leads expert, systematic data analysis; uses predictive data models to proactively identify at-risk students and implement targeted, evidence-based interventions.",
              "3": "Collaborates regularly with department teachers to analyze performance data; identifies trends and implements responsive intervention plans.",
              "2": "Data collection is performed but rarely followed by rigorous analysis or changes to intervention strategies.",
              "1": "No systematic data analysis occurs; student regression goes unidentified and unaddressed; the department lacks a data-driven culture."
            }
          }
        ]
      }
    ]
  },
  {
    "domain": "D4: Strategic Coordination & Whole-School Alignment",
    "weight": 15,
    "subdomains": [
      {
        "name": "Vertical & Horizontal Alignment",
        "indicators": [
          {
            "id": "HOD4.1",
            "text": "Actively collaborates with other HODs and stage leaders to ensure seamless vertical and horizontal curriculum and pedagogical alignment.",
            "evidence": "Meeting Minutes",
            "levels": {
              "4": "Architects seamless transitions and alignment between all grade levels and departments; effectively eliminates instructional gaps through proactive, cross-departmental collaboration.",
              "3": "Collaborates actively with other HODs to ensure curriculum content and pedagogical approaches are aligned across stages.",
              "2": "Cross-departmental coordination is minimal or reactive; alignment gaps between stages are not being proactively addressed.",
              "1": "Department operates in a complete silo; significant alignment gaps with other departments and stages exist and persist."
            }
          }
        ]
      },
      {
        "name": "Departmental Meetings & Strategy",
        "indicators": [
          {
            "id": "HOD4.2",
            "text": "Facilitates regular, purposeful, and data-driven departmental meetings with clear agendas, documented minutes, and actionable outcomes.",
            "evidence": "Meeting Minutes",
            "levels": {
              "4": "Departmental meetings are models of collaborative professionalism; data-driven, solution-focused, and consistently produce actionable decisions that drive school strategy.",
              "3": "Facilitates regular meetings with clear agendas and documented minutes; meetings are productive and result in clear action plans.",
              "2": "Meetings are held irregularly, lack clear objectives, or fail to produce actionable outcomes; minutes are missing or inadequate.",
              "1": "Fails to facilitate departmental meetings or maintain any documentation; team lacks direction and coordination."
            }
          },
          {
            "id": "HOD4.3",
            "text": "Contributes meaningfully to whole-school strategic planning, curriculum committees, and school improvement initiatives.",
            "evidence": "School Documents",
            "levels": {
              "4": "A key architect of school improvement plans; leads cross-school committees and initiatives that produce tangible, measurable improvements in school quality.",
              "3": "Actively contributes to whole-school strategic planning and school improvement initiatives; completes assigned school-wide responsibilities diligently.",
              "2": "Contribution to whole-school strategy is passive; attends committees but rarely initiates or leads meaningful change.",
              "1": "Disengaged from whole-school strategic planning; blocks or ignores school improvement efforts."
            }
          }
        ]
      }
    ]
  },
  {
    "domain": "D5: Stakeholder Communication & Reporting",
    "weight": 10,
    "subdomains": [
      {
        "name": "Leadership Reporting",
        "indicators": [
          {
            "id": "HOD5.1",
            "text": "Proactively briefs the Stage Principal and Academic Dean with accurate, timely, and solution-focused departmental reports.",
            "evidence": "Reports & Emails",
            "levels": {
              "4": "Consistently briefs both the Stage Principal and Academic Dean proactively; reports are comprehensive, data-rich, solution-oriented, and consistently submitted ahead of schedule.",
              "3": "Maintains professional, timely, and transparent communication with both the Stage Principal and Academic Dean.",
              "2": "Communication with leadership is primarily reactive; requires follow-ups from the Stage Principal or Academic Dean to obtain updates.",
              "1": "Fails to communicate with Stage Principal or Academic Dean; conceals departmental challenges or submits no reports."
            }
          }
        ]
      },
      {
        "name": "Parent & Community Engagement",
        "indicators": [
          {
            "id": "HOD5.2",
            "text": "Engages families regarding departmental programs and student progress; handles escalated parent concerns with professionalism and diplomacy.",
            "evidence": "Comm. Log",
            "levels": {
              "4": "Builds strong community trust; expert at handling complex, escalated parent concerns; transforms adversarial situations into collaborative partnerships.",
              "3": "Engages parents professionally regarding departmental programs and student progress; resolves concerns efficiently and constructively.",
              "2": "Parent communication is infrequent or reactive; struggles to handle escalated concerns effectively.",
              "1": "Avoids parent engagement; handles concerns in an unprofessional or confrontational manner that damages school-community relations."
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
        "name": "Compliance & Policy Implementation",
        "indicators": [
          {
            "id": "HOD6.1",
            "text": "Ensures 100% departmental compliance with all school policies, academic procedures, and regulatory requirements.",
            "evidence": "Observation & Files",
            "levels": {
              "4": "Models 100% compliance personally; proactively ensures every department teacher is fully compliant; updates departmental guidelines ahead of policy changes.",
              "3": "Ensures full compliance with all school policies and procedural requirements across the department.",
              "2": "Requires management reminders to enforce school policies within the department; compliance is inconsistent.",
              "1": "Non-compliant with or ignores school procedures and academic policies; creates institutional risk."
            }
          }
        ]
      },
      {
        "name": "Deadline Adherence",
        "indicators": [
          {
            "id": "HOD6.2",
            "text": "Submits all departmental reports, data, and administrative deliverables on or ahead of schedule with zero exceptions.",
            "evidence": "Submission Log",
            "levels": {
              "4": "Zero late submissions; all administrative deliverables are consistently submitted ahead of schedule; is proactive in clarifying deadlines and requirements.",
              "3": "Consistently meets all administrative deadlines set by the Stage Principal, Academic Dean, and school calendar.",
              "2": "Frequently misses deadlines or requires extensions; administrative punctuality is a documented and recurring concern.",
              "1": "Chronically late with reports and submissions; ignores deadlines set by leadership; creates dependency and workflow disruption."
            }
          },
          {
            "id": "HOD6.3",
            "text": "Models impeccable professional conduct, ethical behavior, and professionalism in all school-related interactions.",
            "evidence": "Observation",
            "levels": {
              "4": "An unimpeachable professional who is consistently cited as a role model by staff, admin, and parents for their integrity, conduct, and dedication.",
              "3": "Consistently professional, ethical, and collegial in all school-related interactions; maintains high personal standards of conduct.",
              "2": "Occasional lapses in professional conduct are observed; requires management guidance on professional behavior.",
              "1": "Demonstrates unprofessional or unethical conduct; behavior negatively impacts staff morale, school culture, or institutional reputation."
            }
          }
        ]
      }
    ]
  }
];
