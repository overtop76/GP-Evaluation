import { Domain } from '../types';

export const HOMEROOM_RUBRIC: Domain[] = [
  {
    "domain": "D1: Planning, Creativity & Alignment",
    "weight": 20,
    "subdomains": [
      {
        "name": "Lesson Planning & Implementation",
        "indicators": [
          {
            "id": "H1.1",
            "text": "Develops detailed, innovative lesson plans aligned with K-3 school standards and curriculum frameworks.",
            "evidence": "Lesson Plans",
            "levels": {
              "4": "Plans demonstrate innovative, seamless integration of standards with highly personalized differentiation strategies; execution perfectly matches and often exceeds lesson objectives.",
              "3": "Plans are comprehensive, clearly aligned with K-3 standards, and include clear objectives; consistently implemented as written.",
              "2": "Plans are basic or superficial; objectives are occasionally unclear or implementation deviates from the written plan.",
              "1": "Plans are missing, incomplete, or consistently fail to align with K-3 curriculum standards."
            }
          },
          {
            "id": "H1.2",
            "text": "Submits lesson plans and teaching resources on or before agreed deadlines consistently.",
            "evidence": "Lesson Plans",
            "levels": {
              "4": "Consistently submits plans well in advance of deadlines; resources are meticulously organized, clearly labeled, and proactively shared with the HOD and Co-Teacher.",
              "3": "Consistently submits plans and supporting resources by agreed-upon deadlines; resources are complete and ready for use.",
              "2": "Frequently submits plans late or requires reminders from the HOD; resources are often missing or incomplete.",
              "1": "Habitually fails to submit plans on time or submits plans that are significantly incomplete, hindering departmental oversight."
            }
          },
          {
            "id": "H1.3",
            "text": "Uses multiple sources of student data (formative, summative, behavioral) to guide and adjust planning.",
            "evidence": "Data Sheets",
            "levels": {
              "4": "Synthesizes formative, summative, and behavioral data to create predictive, highly responsive lesson plans that are adjusted proactively based on real-time student performance.",
              "3": "Consistently utilizes available assessment and performance data to inform content selection, pacing, and grouping in lesson plans.",
              "2": "References data sporadically or uses only one type of data without meaningfully adjusting planning based on findings.",
              "1": "Lesson planning demonstrably ignores available student data; instruction proceeds regardless of student performance indicators."
            }
          }
        ]
      },
      {
        "name": "Creativity & Innovation",
        "indicators": [
          {
            "id": "H1.4",
            "text": "Designs high-interest, creative learning experiences that significantly enhance K-3 curriculum engagement.",
            "evidence": "Observation",
            "levels": {
              "4": "Consistently designs original, highly engaging activities that go significantly beyond the standard curriculum and inspire student curiosity and love of learning.",
              "3": "Regularly integrates creative elements, varied resources, and innovative approaches into lesson design.",
              "2": "Primarily follows standard curriculum guides with little personal creativity or innovation beyond the minimum.",
              "1": "Planning is repetitive, uninspired, or lacks engagement strategies appropriate for the K-3 age group."
            }
          }
        ]
      },
      {
        "name": "Leadership & Policy Alignment",
        "indicators": [
          {
            "id": "H1.5",
            "text": "Demonstrates responsiveness to HOD directives and proactively implements feedback to improve practice.",
            "evidence": "HOD Feedback Log",
            "levels": {
              "4": "Proactively seeks HOD guidance and feedback; implements all instructions and feedback instantly and effectively, often exceeding expectations.",
              "3": "Consistently adheres to HOD instructions; applies feedback promptly to improve instructional practice.",
              "2": "Requires multiple reminders to align with HOD directives; feedback application is inconsistent or partial.",
              "1": "Ignores or resists HOD instructions; demonstrates a pattern of non-responsiveness to professional feedback."
            }
          },
          {
            "id": "H1.6",
            "text": "Uses professional communication channels for all school-related communication with leadership and staff.",
            "evidence": "Comm. Log",
            "levels": {
              "4": "Models exemplary professional, proactive communication with HODs, Stage Principals, and Leadership; anticipates communication needs.",
              "3": "Communicates professionally and in a timely manner via appropriate school-sanctioned channels.",
              "2": "Communication is occasionally informal, delayed, or bypasses established professional protocols.",
              "1": "Communication with leadership is unprofessional, disrespectful, chronically absent, or creates a toxic information environment."
            }
          },
          {
            "id": "H1.7",
            "text": "Fully abides by all school rules, policies, and procedural requirements; acts as a guardian of school culture.",
            "evidence": "Observation",
            "levels": {
              "4": "Models school regulations consistently and serves as a guardian and advocate of school policy and positive culture for all staff and students.",
              "3": "Fully abides by all school rules, regulations, and procedural requirements without reminders.",
              "2": "Occasional lapses in policy compliance are observed; requires management oversight or reminders.",
              "1": "Demonstrates a flagrant disregard for school rules or regulations; behavior negatively impacts school culture."
            }
          },
          {
            "id": "H1.8",
            "text": "Actively leads and participates in educational events, exhibitions, and school showcases.",
            "evidence": "Observation",
            "levels": {
              "4": "Innovates and leads high-impact showcases and events; consistently generates high levels of student participation, creativity, and community engagement.",
              "3": "Actively leads or participates in assigned educational events and showcases effectively and enthusiastically.",
              "2": "Participation in events is passive or requires significant external support and direction to fulfill responsibilities.",
              "1": "Fails to participate in or actively undermines school showcases and educational events."
            }
          }
        ]
      }
    ]
  },
  {
    "domain": "D2: Instructional Delivery",
    "weight": 20,
    "subdomains": [
      {
        "name": "Literacy Instruction (K-3)",
        "indicators": [
          {
            "id": "H2.1",
            "text": "Delivers expert, fidelity-based phonics instruction using multi-sensory strategies aligned to the school's literacy framework.",
            "evidence": "Observation",
            "levels": {
              "4": "Demonstrates expert phonics fidelity with seamless integration of multi-sensory strategies; students show measurable accelerated literacy growth directly attributable to instruction.",
              "3": "Correctly and consistently implements the school's phonics framework and literacy workshop models with appropriate multi-sensory elements.",
              "2": "Inconsistent fidelity to the school's literacy framework; minor but recurring errors in phoneme articulation or skill modeling are observed.",
              "1": "Incorrect phoneme articulation, skill modeling errors, or significant departure from the school's required literacy framework."
            }
          },
          {
            "id": "H2.2",
            "text": "Delivers high-quality reading and writing workshop instruction, including guided reading and shared writing.",
            "evidence": "Observation",
            "levels": {
              "4": "Reading and writing workshops are expertly facilitated; guided reading groups are dynamic, data-driven, and accelerate student progress beyond typical benchmarks.",
              "3": "Effectively implements reading and writing workshop models; guided reading and shared writing sessions are purposeful and well-structured.",
              "2": "Workshop implementation is inconsistent; guided reading groups are rarely pulled or are not differentiated by reading level.",
              "1": "Reading/writing workshop models are absent or incorrectly implemented; students are not receiving targeted literacy instruction."
            }
          }
        ]
      },
      {
        "name": "Numeracy Instruction (K-3)",
        "indicators": [
          {
            "id": "H2.3",
            "text": "Delivers numeracy instruction using the Concrete-Pictorial-Abstract (CPA) methodology with conceptual depth.",
            "evidence": "Observation",
            "levels": {
              "4": "Expert use of CPA methodology; lessons move fluidly between representations and significantly enhance students' conceptual understanding beyond procedural fluency.",
              "3": "Effectively teaches math concepts using the required CPA methods; students demonstrate both procedural and conceptual understanding.",
              "2": "Instruction is overly procedural; CPA methodology is used superficially without building genuine conceptual depth.",
              "1": "Fails to model math concepts accurately; CPA methodology is absent or incorrectly applied, leading to student misconceptions."
            }
          },
          {
            "id": "H2.4",
            "text": "Uses concrete manipulatives, visual representations, and mathematical discourse to deepen student understanding.",
            "evidence": "Observation",
            "levels": {
              "4": "Manipulatives and visual models are seamlessly integrated; mathematical discourse is student-led and rich with mathematical vocabulary.",
              "3": "Consistently uses appropriate manipulatives and visual tools; facilitates structured mathematical discussions.",
              "2": "Manipulatives are used infrequently or without clear purpose; mathematical discourse is teacher-dominated.",
              "1": "Manipulatives are absent; students work procedurally without visual support or mathematical discussion."
            }
          }
        ]
      },
      {
        "name": "Active Engagement & Questioning",
        "indicators": [
          {
            "id": "H2.5",
            "text": "Achieves and sustains high levels of student engagement using high-order questioning and inquiry techniques.",
            "evidence": "Observation",
            "levels": {
              "4": "Achieves near-100% active student engagement; masterfully uses Bloom's higher-order questioning to prompt deep inquiry, critical thinking, and student-to-student discourse.",
              "3": "Achieves high student engagement; uses a deliberate mix of open and closed questions to check understanding and promote thinking.",
              "2": "Engagement is frequently passive; instruction relies heavily on teacher-led direct instruction with limited student response opportunity.",
              "1": "Students are consistently disengaged; lesson structure lacks clear methods for eliciting and sustaining student participation."
            }
          },
          {
            "id": "H2.6",
            "text": "Utilizes a diverse repertoire of age-appropriate instructional strategies to reach all K-3 learners.",
            "evidence": "Observation",
            "levels": {
              "4": "Seamlessly deploys a wide, research-backed repertoire of K-3 strategies (e.g., movement breaks, play-based learning, inquiry, storytelling) to maximize all learners' access and engagement.",
              "3": "Regularly uses a variety of age-appropriate teaching methods suited to the K-3 developmental stage.",
              "2": "Relies heavily on one or two instructional modes; instruction does not consistently account for the developmental needs of K-3 learners.",
              "1": "Instruction is monotonous, developmentally inappropriate, or fails to engage the K-3 age group."
            }
          }
        ]
      }
    ]
  },
  {
    "domain": "D3: Assessment & Data Use",
    "weight": 15,
    "subdomains": [
      {
        "name": "Formative Assessment",
        "indicators": [
          {
            "id": "H3.1",
            "text": "Uses real-time formative assessment strategies to monitor student understanding and pivot instruction accordingly.",
            "evidence": "Observation",
            "levels": {
              "4": "Expert, seamless use of formative assessment; pivots instruction in real-time based on student responses; provides instant, targeted feedback that accelerates learning.",
              "3": "Regularly and purposefully checks for understanding using a variety of formative strategies and adjusts the lesson path accordingly.",
              "2": "Checks for understanding are superficial, infrequent, or result in no observable change to instruction.",
              "1": "No evidence of formative assessment practice; continues instruction regardless of whether students have understood the content."
            }
          }
        ]
      },
      {
        "name": "Summative Assessment & Data Analysis",
        "indicators": [
          {
            "id": "H3.2",
            "text": "Designs and administers K-3 appropriate assessments; rigorously analyzes results to track individual and group progress.",
            "evidence": "Assessment Records",
            "levels": {
              "4": "Designs authentic, developmentally appropriate assessments; synthesizes multiple data points to create dynamic, responsive intervention and enrichment groups.",
              "3": "Administers required assessments accurately; maintains thorough records and analyzes results to identify trends and next instructional steps.",
              "2": "Assessment records are incomplete or inconsistently maintained; data is rarely used proactively to drive planning.",
              "1": "No systematic tracking of student progress; unable to use data to identify learning gaps or inform grouping."
            }
          },
          {
            "id": "H3.3",
            "text": "Uses diagnostic and benchmark data (e.g., Running Records, phonics screeners) to set individualized learning goals.",
            "evidence": "Data Records",
            "levels": {
              "4": "Expert interpretation of diagnostic data; uses benchmark results to set ambitious yet achievable individualized goals and proactively communicates them to families.",
              "3": "Reviews benchmark and diagnostic data; uses results to set appropriate learning goals for individual students.",
              "2": "Reviews benchmark data but rarely uses it to set specific, individualized goals or adjust instruction.",
              "1": "Ignores benchmark and diagnostic data; all students treated as having identical starting points."
            }
          }
        ]
      }
    ]
  },
  {
    "domain": "D4: Learning Environment",
    "weight": 10,
    "subdomains": [
      {
        "name": "Classroom Culture",
        "indicators": [
          {
            "id": "H4.1",
            "text": "Cultivates a warm, safe, and inclusive 'Family' classroom atmosphere where all K-3 students feel a profound sense of belonging.",
            "evidence": "Observation",
            "levels": {
              "4": "Cultivates an extraordinary 'Family' atmosphere; students demonstrate a deep sense of belonging, emotional safety, and self-regulation; positive culture is entirely student-owned.",
              "3": "Maintains a consistently positive, inclusive, and orderly environment where all students feel welcomed, respected, and safe.",
              "2": "Environment is generally neutral but lacks consistent warmth; some students may appear withdrawn or reluctant to participate.",
              "1": "Environment is hostile, dismissive, or demeaning; the classroom culture creates anxiety rather than safety."
            }
          },
          {
            "id": "H4.2",
            "text": "Implements proactive, positive behavior management that emphasizes routines and student self-regulation.",
            "evidence": "Observation",
            "levels": {
              "4": "Behavior management is entirely preventative and relationship-based; students self-regulate independently; classroom community has internalized all expectations.",
              "3": "Implements clear, consistent routines and positive behavior support strategies; minimizes disruptions and refocuses students respectfully.",
              "2": "Management is largely reactive; responds to behavior after disruption rather than preventing it through proactive strategies.",
              "1": "Classroom management is absent or punitive; safety or learning is regularly disrupted; teacher has lost consistent control."
            }
          }
        ]
      },
      {
        "name": "Physical & Digital Space",
        "indicators": [
          {
            "id": "H4.3",
            "text": "Designs and maintains a classroom environment that functions as a 'Third Teacher', stimulating curiosity and student agency.",
            "evidence": "Observation",
            "levels": {
              "4": "Classroom space is a masterfully curated 'Third Teacher'; displays of student thinking, learning walls, and interactive elements are current, purposeful, and student-generated.",
              "3": "Classroom is organized, safe, and displays current, relevant student work and learning materials that support instruction.",
              "2": "Space is cluttered, disorganized, or displays are outdated and no longer connected to current learning.",
              "1": "Room is hazardous, unstimulating, or arranged in a way that impedes movement, interaction, or learning."
            }
          }
        ]
      }
    ]
  },
  {
    "domain": "D5: Student Impact",
    "weight": 10,
    "subdomains": [
      {
        "name": "Academic Growth & Outcomes",
        "indicators": [
          {
            "id": "H5.1",
            "text": "Ensures a significant majority of students meet or exceed expected growth targets on K-3 benchmarks.",
            "evidence": "Assessment Data",
            "levels": {
              "4": "90%+ of students exceed expected growth targets on K-3 benchmarks; achievement gaps are actively closing for all student subgroups.",
              "3": "A clear majority of students (75%+) meet expected annual growth targets on school benchmarks.",
              "2": "Minimal growth is evident across the class; a significant proportion of students fail to meet growth targets.",
              "1": "Students demonstrate regression or consistently fail K-3 benchmarks; class-wide achievement is significantly below expectations."
            }
          },
          {
            "id": "H5.2",
            "text": "Students demonstrate age-appropriate independence in applying foundational literacy and numeracy skills.",
            "evidence": "Observation",
            "levels": {
              "4": "Students demonstrate advanced independence and automaticity in applying foundational skills; they transfer learning to novel contexts with confidence.",
              "3": "Most students demonstrate age-appropriate independence in applying foundational literacy and numeracy skills during independent practice.",
              "2": "Many students are over-dependent on teacher support for tasks they should be able to complete independently.",
              "1": "Students are unable to function independently; constant teacher redirection is required for the most basic tasks."
            }
          }
        ]
      },
      {
        "name": "Student Wellbeing & Holistic Development",
        "indicators": [
          {
            "id": "H5.3",
            "text": "Actively monitors and supports students' social-emotional development and overall wellbeing.",
            "evidence": "Observation",
            "levels": {
              "4": "Expert in proactive wellbeing support; uses structured SEL programs, individual check-ins, and coordinates with counselors to ensure holistic student development.",
              "3": "Consistently monitors student wellbeing, provides emotional check-ins, and adjusts environment or workload to support students' social-emotional needs.",
              "2": "Reacts to emotional issues only when they become significant; does not proactively monitor or support students' SEL needs.",
              "1": "Ignores visible signs of student distress or contributes to a stressful, anxiety-inducing classroom environment."
            }
          }
        ]
      }
    ]
  },
  {
    "domain": "D6: Professionalism & Leadership",
    "weight": 10,
    "subdomains": [
      {
        "name": "Co-Teacher Leadership",
        "indicators": [
          {
            "id": "H6.1",
            "text": "Effectively leads, mentors, and empowers the Co-Teacher to maximize their contribution to the classroom.",
            "evidence": "Observation",
            "levels": {
              "4": "Masterfully empowers and mentors the Co-Teacher; provides clear, professional, and developmental direction that significantly amplifies the Co-Teacher's impact.",
              "3": "Maintains a professional, collaborative, and respectful partnership with the Co-Teacher; provides clear daily direction and feedback.",
              "2": "Direction provided to Co-Teacher is inconsistent, unclear, or insufficient; partnership is not optimized for student benefit.",
              "1": "Undermines, ignores, or creates conflict with the Co-Teacher; partnership is dysfunctional and negatively impacts students."
            }
          }
        ]
      },
      {
        "name": "Ethics, Attendance & Conduct",
        "indicators": [
          {
            "id": "H6.2", "text": "Demonstrates impeccable integrity, ethics, and professional conduct in all interactions and responsibilities.",
            "evidence": "Observation",
            "levels": {
              "4": "Serves as an undisputed school ambassador; models the highest standards of integrity, ethics, and professionalism in every interaction and responsibility.",
              "3": "Consistently professional in conduct and demeanor; maintains high ethical standards in all school-related interactions.",
              "2": "Occasional lapses in professional conduct are observed; requires management follow-up or check-ins.",
              "1": "Demonstrates unethical behavior or violates fundamental professional standards; conduct is harmful to the school community."
            }
          },
          {
            "id": "H6.3",
            "text": "Maintains exemplary attendance and punctuality for all instructional duties, meetings, and school responsibilities.",
            "evidence": "HR Log",
            "levels": {
              "4": "Exemplary attendance record; zero unexcused absences; consistently present and fully prepared well before all duty start times.",
              "3": "Consistently meets all attendance requirements and arrives on time and prepared for all instructional duties and meetings.",
              "2": "Occasional lateness or unexcused absences that impact instructional flow or require coverage arrangements.",
              "1": "Frequent unexcused absences or chronic, pattern lateness that significantly disrupts school operations and student learning."
            }
          },
          {
            "id": "H6.4",
            "text": "Consistently adheres to the school's professional dress code; models professional appearance standards for all staff and students.",
            "evidence": "Observation",
            "levels": {
              "4": "Always models the highest standard of professional attire; appearance consistently projects authority, credibility, and serves as a model for both students and colleagues.",
              "3": "Consistently abides by the school's professional dress code policy; appearance is always professional and appropriate.",
              "2": "Occasional lapses in professional attire are observed; requires verbal reminders from management.",
              "1": "Frequently and flagrantly violates the school's dress code policy; appearance is unprofessional and negatively impacts the school's image."
            }
          }
        ]
      }
    ]
  },
  {
    "domain": "D7: Family & Community Partnership",
    "weight": 10,
    "subdomains": [
      {
        "name": "Parent Communication & Engagement",
        "indicators": [
          {
            "id": "H7.1",
            "text": "Maintains proactive, consistent, and professional communication with K-3 families about student progress and classroom life.",
            "evidence": "Comm. Log",
            "levels": {
              "4": "Builds a genuine and high-trust proactive partnership with families; communication is frequent, personalized, solution-focused, and culturally responsive.",
              "3": "Maintains consistent and professional communication with all families; provides regular updates on student progress and classroom activities.",
              "2": "Communication with families is primarily reactive, occurring only when significant problems arise; families receive insufficient updates.",
              "1": "Alienates or avoids families; communication is nonexistent, hostile, or unprofessional."
            }
          },
          {
            "id": "H7.2",
            "text": "Resolves parent concerns regarding K-3 student progress promptly, professionally, and effectively.",
            "evidence": "Comm. Log",
            "levels": {
              "4": "Expert at de-escalating and resolving complex parent concerns; transforms difficult conversations into collaborative partnerships focused on student growth.",
              "3": "Addresses parent concerns in a timely and professional manner; seeks solutions that genuinely benefit the student.",
              "2": "Responses to parent concerns are slow, defensive, or fail to resolve the underlying issue satisfactorily.",
              "1": "Ignores parent concerns or handles them in a way that is confrontational, unprofessional, or escalates the situation."
            }
          },
          {
            "id": "H7.3",
            "text": "Actively involves families in the K-3 learning journey through events, workshops, and regular engagement opportunities.",
            "evidence": "Observation",
            "levels": {
              "4": "Creates and leads innovative family engagement opportunities (e.g., parent workshops, learning showcases); generates high levels of family participation and investment.",
              "3": "Regularly invites families into the classroom and school community; actively encourages participation in school events and learning.",
              "2": "Family involvement opportunities are infrequent; teacher relies on school-mandated events rather than creating personal engagement.",
              "1": "Fails to engage families or actively discourages family involvement in the school community."
            }
          }
        ]
      }
    ]
  },
  {
    "domain": "D8: Professional Growth",
    "weight": 5,
    "subdomains": [
      {
        "name": "Professional Development & Reflection",
        "indicators": [
          {
            "id": "H8.1",
            "text": "Actively seeks, engages in, and leads professional development opportunities to continuously improve K-3 instructional practice.",
            "evidence": "PD Log",
            "levels": {
              "4": "Actively leads PD sessions for peers; seeks out and funds own external PD; implements new learning immediately and measures its impact.",
              "3": "Attends all required PD sessions with genuine engagement; applies new learning systematically to improve classroom practice.",
              "2": "Participation in PD is passive or compliance-based; slow and inconsistent in implementing new learning.",
              "1": "Avoids professional growth activities; resistant to new learning; no measurable improvement in practice over time."
            }
          },
          {
            "id": "H8.2",
            "text": "Engages in regular, honest self-reflection and sets measurable professional goals to guide continuous improvement.",
            "evidence": "Reflective Log",
            "levels": {
              "4": "Maintains a detailed reflective journal or portfolio; sets ambitious SMART goals; demonstrates sustained, measurable growth against all goals.",
              "3": "Engages in honest self-evaluation; sets clear goals for improvement and demonstrates meaningful progress toward them.",
              "2": "Reflection is superficial or generic; goals are vague and progress is not monitored or demonstrated.",
              "1": "Engages in no meaningful self-reflection; unable to accurately identify personal strengths or areas for growth."
            }
          }
        ]
      }
    ]
  }
];
