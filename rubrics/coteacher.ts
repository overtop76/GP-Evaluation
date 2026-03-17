import { Domain } from '../types';

export const COTEACHER_RUBRIC: Domain[] = [
  {
    "domain": "D1: Classroom Environment & Logistics",
    "weight": 12,
    "subdomains": [
      {
        "name": "Preparation & Setup",
        "indicators": [
          {
            "id": "C1.1",
            "text": "Arrives before the lesson begins and prepares all learning center materials, resources, and spaces accurately and independently.",
            "evidence": "Observation",
            "levels": {
              "4": "Consistently arrives early; all materials are differentiated, fully prepared, and organized before students enter; anticipates the Homeroom Teacher's lesson flow without being told.",
              "3": "Arrives on time and prepares all required materials accurately before the lesson begins.",
              "2": "Requires prompting to set up materials; occasional delays or inaccuracies in setup that impact the lesson start.",
              "1": "Materials are consistently missing or incorrectly prepared; disrupts the Homeroom Teacher's lesson through lack of preparation."
            }
          }
        ]
      },
      {
        "name": "Transitions & Routines",
        "indicators": [
          {
            "id": "C1.2",
            "text": "Actively manages and facilitates smooth, efficient student transitions between activities and learning spaces.",
            "evidence": "Observation",
            "levels": {
              "4": "Independently facilitates seamless transitions with minimal time loss (<2 min); students are independent and orderly; proactively identifies and resolves transition bottlenecks.",
              "3": "Facilitates orderly transitions; minimal loss of instructional time; actively supports students in following established routines.",
              "2": "Frequent reminders or verbal prompts are required from the Homeroom Teacher to manage transitions effectively.",
              "1": "Transitions are chaotic and result in major loss of instructional time; Co-Teacher is passive or contributes to the disorder."
            }
          }
        ]
      },
      {
        "name": "Behavior Support",
        "indicators": [
          {
            "id": "C1.3",
            "text": "Proactively prevents behavioral disruptions by circulating, monitoring, and reinforcing school-wide behavior expectations.",
            "evidence": "Observation",
            "levels": {
              "4": "Expert at proactive behavior prevention; circulates purposefully, models PBIS language, de-escalates using evidence-based strategies before issues become disruptive.",
              "3": "Consistently reinforces positive behavior expectations; circulates to monitor and provide proactive support.",
              "2": "Behavior support is inconsistent; tends to be reactive rather than proactive; requires Homeroom Teacher's direction.",
              "1": "Escalates behavioral situations or ignores clear warning signs; behavior management approach is ineffective or harmful."
            }
          },
          {
            "id": "C1.4",
            "text": "Maintains constant, safe, and appropriate supervision of all students, including during transitions and independent work.",
            "evidence": "Observation",
            "levels": {
              "4": "Maintains expert supervision at all times; anticipates safety risks and takes immediate, appropriate corrective action; leaves no student unsupervised.",
              "3": "Maintains safe supervision of all students at all times, including during transitions, outdoor time, and independent work.",
              "2": "Supervision lapses are occasionally observed; teacher is distracted or positioned in a way that creates monitoring blind spots.",
              "1": "Consistently fails to maintain adequate supervision; student safety is compromised through neglect of supervisory responsibilities."
            }
          }
        ]
      }
    ]
  },
  {
    "domain": "D2: Academic Instructional Support",
    "weight": 18,
    "subdomains": [
      {
        "name": "Literacy Support",
        "indicators": [
          {
            "id": "C2.1",
            "text": "Delivers accurate, fidelity-based literacy support aligned to the Homeroom Teacher's lesson, using correct phonics articulation.",
            "evidence": "Observation",
            "levels": {
              "4": "Implements literacy support with expert fidelity; students in targeted groups demonstrate measurable accelerated progress in phonics and reading directly attributable to this support.",
              "3": "Implements literacy support tasks and small group instruction accurately and as directed; phoneme articulation is consistently correct.",
              "2": "Scaffolding and support during literacy tasks are inconsistent; minor but recurring errors in phonics articulation are observed.",
              "1": "Incorrect phoneme articulation or significant modeling errors during literacy tasks; support negatively impacts student learning."
            }
          }
        ]
      },
      {
        "name": "Numeracy Support",
        "indicators": [
          {
            "id": "C2.2",
            "text": "Delivers accurate numeracy support using the Concrete-Pictorial-Abstract approach and correct mathematical modeling.",
            "evidence": "Observation",
            "levels": {
              "4": "Enhances conceptual understanding in numeracy beyond basic support; uses CPA with fluency; students assigned to this teacher demonstrate strong mathematical understanding.",
              "3": "Supports math tasks effectively and accurately using required CPA methods as directed by the Homeroom Teacher.",
              "2": "Numeracy support is primarily procedural; struggles to explain the conceptual 'why' behind mathematical operations using CPA.",
              "1": "Incorrect modeling of math concepts or operations; support using CPA is absent or incorrectly applied."
            }
          }
        ]
      },
      {
        "name": "Differentiation & Scaffolding",
        "indicators": [
          {
            "id": "C2.3",
            "text": "Checks for student understanding during independent/group work and adjusts prompts, questions, and support to address misconceptions.",
            "evidence": "Observation",
            "levels": {
              "4": "Independently identifies misconceptions and adjusts scaffolding prompts proactively before errors become entrenched; uses targeted questioning to redirect thinking.",
              "3": "Actively supports students' understanding during tasks as directed; asks clarifying questions and adjusts support based on student responses.",
              "2": "Support is primarily reactive; waits for students to be completely stuck before intervening; misses opportunities to address emerging misconceptions.",
              "1": "Minimal engagement with students during practice; sits passively or attends to administrative tasks instead of supporting learners."
            }
          },
          {
            "id": "C2.4",
            "text": "Precisely implements differentiation strategies for EAL and SEN students as directed in intervention plans or by the Homeroom Teacher.",
            "evidence": "Observation",
            "levels": {
              "4": "Implements all EAL/SEN differentiation strategies with precision and consistency; assigned students demonstrate clear, measurable progress on individualized targets.",
              "3": "Applies differentiation strategies accurately as directed by the Homeroom Teacher and/or intervention plans.",
              "2": "Differentiation support is generic rather than individualized; does not consistently follow specific strategies for EAL/SEN students.",
              "1": "Ignores or is unaware of the differentiation needs of EAL/SEN students; provides no specialized support."
            }
          }
        ]
      }
    ]
  },
  {
    "domain": "D3: Progress Monitoring & Intervention",
    "weight": 12,
    "subdomains": [
      {
        "name": "Observation & Record-Keeping",
        "indicators": [
          {
            "id": "C3.1",
            "text": "Maintains detailed, accurate, and actionable documentation of student observations, behaviors, and learning progress.",
            "evidence": "Observation Log",
            "levels": {
              "4": "Maintains thorough, detailed, and immediately actionable documentation; notes proactively inform intervention planning and are shared with the Homeroom Teacher and HOD.",
              "3": "Maintains required documentation consistently, accurately, and on time; records are clear and useful for tracking student progress.",
              "2": "Records are incomplete, inconsistently maintained, or lack the detail required to be useful for monitoring student progress.",
              "1": "No meaningful documentation is maintained; unable to provide any evidence of student progress monitoring."
            }
          },
          {
            "id": "C3.2",
            "text": "Follows intervention plans precisely as designed, monitoring fidelity and documenting the impact on student progress.",
            "evidence": "Intervention Records",
            "levels": {
              "4": "Implements intervention plans with perfect fidelity; proactively monitors and documents impact data; contributes to plan revision based on evidence.",
              "3": "Follows the intervention plan correctly as designed by the HOD or SENCO; documents implementation and basic student response.",
              "2": "Modifies or skips intervention steps without authorization; implementation fidelity is inconsistent.",
              "1": "Does not implement the assigned intervention plan; student assigned to intervention receives no targeted support."
            }
          }
        ]
      },
      {
        "name": "Progress Tracking & Communication",
        "indicators": [
          {
            "id": "C3.3",
            "text": "Tracks individual student progress against targets consistently and communicates concerns to the Homeroom Teacher proactively.",
            "evidence": "Data Records",
            "levels": {
              "4": "Tracks all assigned students' progress with precision; proactively identifies regression or stagnation early and initiates a solution-focused discussion with the Homeroom Teacher.",
              "3": "Tracks student progress accurately and consistently; communicates concerns and observations to the Homeroom Teacher in a timely manner.",
              "2": "Progress tracking is delayed, inaccurate, or inconsistent; Homeroom Teacher is not adequately informed of student progress or concerns.",
              "1": "No systematic tracking of student progress; student regression goes unnoticed or is not communicated to the Homeroom Teacher."
            }
          }
        ]
      }
    ]
  },
  {
    "domain": "D4: Social-Emotional Learning Support",
    "weight": 12,
    "subdomains": [
      {
        "name": "SEL & Emotional Regulation",
        "indicators": [
          {
            "id": "C4.1",
            "text": "Reinforces classroom SEL routines and explicitly supports students' emotional regulation and coping strategies.",
            "evidence": "Observation",
            "levels": {
              "4": "Explicitly and proactively teaches and reinforces emotional regulation strategies; students independently use learned coping strategies; supports a trauma-informed classroom approach.",
              "3": "Consistently reinforces the classroom's SEL routines and positively supports students' emotional regulation needs.",
              "2": "SEL support is reactive only; waits for emotional outbursts before intervening rather than proactively reinforcing strategies.",
              "1": "Escalates emotional situations through negative language or inappropriate responses; does not support students' emotional needs."
            }
          },
          {
            "id": "C4.2",
            "text": "Builds genuine, positive, and trusting relationships with all students, acting as a dependable and caring adult presence.",
            "evidence": "Observation",
            "levels": {
              "4": "Acts as a trusted adult figure for all students; students voluntarily seek out this Co-Teacher for academic and emotional support; relationships are warm and professionally appropriate.",
              "3": "Maintains consistently positive, warm, and encouraging rapport with all students.",
              "2": "Interactions with students are limited to task-based engagement; lacks the warmth and relational investment needed to be a trusted adult.",
              "1": "Distant, negative, or cold tone with students; relationships are transactional and fail to support student wellbeing."
            }
          },
          {
            "id": "C4.3",
            "text": "Actively promotes student independence and self-monitoring skills, resisting the urge to over-scaffold or create dependency.",
            "evidence": "Observation",
            "levels": {
              "4": "Masterfully promotes student autonomy, self-monitoring, and metacognition; deliberately fades support to build independence; students can self-correct and self-regulate.",
              "3": "Effectively supports student independence routines and self-monitoring strategies as modeled by the Homeroom Teacher.",
              "2": "Tends to over-assist students, completing tasks for them rather than supporting their independent problem-solving.",
              "1": "Creates unnecessary dependency in students; students are unable to function without constant Co-Teacher intervention."
            }
          }
        ]
      }
    ]
  },
  {
    "domain": "D5: Professional Teacher Partnership",
    "weight": 15,
    "subdomains": [
      {
        "name": "Collaboration & Alignment",
        "indicators": [
          {
            "id": "C5.1",
            "text": "Executes all instructions from the Homeroom Teacher precisely, accurately, and without requiring repeated clarification.",
            "evidence": "Observation",
            "levels": {
              "4": "Executes all instructions with precision and fidelity; independently anticipates the next steps of the lesson without prompting; requires zero repeated clarification.",
              "3": "Follows all Homeroom Teacher instructions accurately and promptly; occasionally asks for clarification but immediately acts on the answer.",
              "2": "Requires repeated clarification on the same instructions; execution of instructions is inconsistent or delayed.",
              "1": "Consistently deviates from Homeroom Teacher instructions without authorization or justification; undermines lesson execution."
            }
          },
          {
            "id": "C5.2",
            "text": "Maintains full instructional alignment with the Homeroom Teacher in tone, language, behavior expectations, and academic standards.",
            "evidence": "Observation",
            "levels": {
              "4": "Perfectly mirrors the Homeroom Teacher's tone, language, and expectations at all times; creates a completely seamless and unified classroom experience for students.",
              "3": "Generally aligned with the Homeroom Teacher's approach; any minor deviations are quickly self-corrected or addressed.",
              "2": "Occasional, noticeable misalignment with the Homeroom Teacher's tone, expectations, or approach confuses students.",
              "1": "Consistently undermines the Homeroom Teacher's authority or approach; creates a divided classroom environment."
            }
          },
          {
            "id": "C5.3",
            "text": "Communicates professionally, proactively, and in a solution-focused manner with the Homeroom Teacher.",
            "evidence": "Comm. Log",
            "levels": {
              "4": "Models proactive, solution-focused communication; brings forward observations, ideas, and concerns constructively; enhances the professional partnership.",
              "3": "Communicates professionally and in a timely manner about relevant classroom matters; maintains a positive working relationship.",
              "2": "Communication is limited, reactive, or requires the Homeroom Teacher to initiate; relevant information is not proactively shared.",
              "1": "Communication is poor, unprofessional, withheld, or creates conflict with the Homeroom Teacher."
            }
          }
        ]
      },
      {
        "name": "Workload & Support",
        "indicators": [
          {
            "id": "C5.4",
            "text": "Proactively identifies and takes on tasks that meaningfully reduce the Homeroom Teacher's workload.",
            "evidence": "Observation",
            "levels": {
              "4": "Significantly and consistently reduces the Homeroom Teacher's workload by proactively taking on preparation, documentation, and support tasks without being asked.",
              "3": "Provides consistent and reliable support that meaningfully reduces the Homeroom Teacher's workload.",
              "2": "Support is inconsistent; often waits to be directed rather than proactively identifying how to assist the Homeroom Teacher.",
              "1": "Creates additional workload for the Homeroom Teacher through carelessness, poor preparation, or requiring constant direction."
            }
          },
          {
            "id": "C5.5",
            "text": "Always presents a unified and professional front that actively reinforces the Homeroom Teacher's authority and decisions.",
            "evidence": "Observation",
            "levels": {
              "4": "Always presents a perfectly unified front; actively and verbally reinforces the Homeroom Teacher's authority and decisions in all student interactions.",
              "3": "Consistently supports the Homeroom Teacher's authority; never contradicts or undermines the Homeroom Teacher in front of students.",
              "2": "Occasionally and inadvertently contradicts or undermines the Homeroom Teacher's decisions in front of students.",
              "1": "Publicly and repeatedly challenges or contradicts the Homeroom Teacher's authority or decisions in front of students."
            }
          }
        ]
      }
    ]
  },
  {
    "domain": "D6: Professional Conduct & Reliability",
    "weight": 8,
    "subdomains": [
      {
        "name": "Attendance & Compliance",
        "indicators": [
          {
            "id": "C6.1",
            "text": "Maintains exemplary attendance and punctuality for all instructional duties, supervision, and school responsibilities.",
            "evidence": "HR Log",
            "levels": {
              "4": "Exemplary and unimpeachable reliability in attendance and punctuality; zero unexcused absences; always present and fully prepared before responsibilities begin.",
              "3": "Consistently meets all attendance expectations; arrives on time and prepared for all instructional and supervisory duties.",
              "2": "Occasional lateness or unexcused absences that directly impact duties or require coverage arrangements from colleagues.",
              "1": "Frequent unexcused absences or a chronic pattern of lateness that significantly disrupts the learning environment and colleagues' schedules."
            }
          },
          {
            "id": "C6.2",
            "text": "Fully compliant with all school policies, safeguarding requirements, and professional codes of conduct.",
            "evidence": "Observation",
            "levels": {
              "4": "Models complete policy compliance and exemplary safeguarding practice; proactively flags concerns and ensures all students are protected.",
              "3": "Fully and consistently compliant with all school policies and safeguarding requirements.",
              "2": "Requires reminders regarding specific school policies or safeguarding procedures.",
              "1": "Non-compliant with school policies or safeguarding requirements; behavior creates risk for students or the institution."
            }
          }
        ]
      }
    ]
  },
  {
    "domain": "D7: Family Interaction",
    "weight": 5,
    "subdomains": [
      {
        "name": "Professional Boundaries with Families",
        "indicators": [
          {
            "id": "C7.1",
            "text": "Maintains respectful, appropriate, and professionally boundaried interactions with parents and family members.",
            "evidence": "Observation",
            "levels": {
              "4": "Builds genuine trust and warmth with families while maintaining clear, healthy professional boundaries; referred to by the Homeroom Teacher for appropriate family-facing communication.",
              "3": "Consistently respectful, appropriate, and professionally boundaried in all parent interactions.",
              "2": "Occasionally oversteps professional boundaries with parents (e.g., sharing inappropriate information or making unauthorized commitments).",
              "1": "Severely inappropriate communication with parents, including sharing confidential information or escalating conflicts."
            }
          }
        ]
      }
    ]
  },
  {
    "domain": "D8: Impact on Student Foundations",
    "weight": 8,
    "subdomains": [
      {
        "name": "Student Growth Outcomes",
        "indicators": [
          {
            "id": "C8.1",
            "text": "Students supported by this Co-Teacher demonstrate consistent progress toward or beyond their individualized learning targets.",
            "evidence": "Assessment Data",
            "levels": {
              "4": "Students assigned to this Co-Teacher consistently exceed their growth targets; progress is measurably accelerated compared to baseline data.",
              "3": "Students assigned to this Co-Teacher consistently meet their expected growth targets.",
              "2": "Minimal or inconsistent growth is evident in students assigned to this Co-Teacher's targeted support.",
              "1": "Regression is evident in students receiving this Co-Teacher's targeted support; intervention is not working."
            }
          },
          {
            "id": "C8.2",
            "text": "Models foundational skills (phoneme production, letter formation, handwriting, number formation) accurately and consistently.",
            "evidence": "Observation",
            "levels": {
              "4": "Consistently accurate modeling of all foundational skills; students explicitly emulate and internalize the Co-Teacher's accurate modeling in their own work.",
              "3": "Generally accurate modeling of required foundational skills; errors are rare and self-corrected when noticed.",
              "2": "Minor but recurring inaccuracies in skill modeling that may lead to student errors (e.g., incorrect letter formation, vowel sounds).",
              "1": "Consistently incorrect modeling of foundational skills; inaccurate modeling is negatively and measurably impacting student skill development."
            }
          }
        ]
      }
    ]
  },
  {
    "domain": "D9: Developmentally Appropriate Practice",
    "weight": 5,
    "subdomains": [
      {
        "name": "Child Development & Play",
        "indicators": [
          {
            "id": "C9.1",
            "text": "Demonstrates a thorough understanding of K-3 child development and applies it to all interactions, expectations, and activities.",
            "evidence": "Observation",
            "levels": {
              "4": "Demonstrates expert-level understanding of K-3 child development; seamlessly adjusts all language, expectations, and activities to align with developmental stages and individual needs.",
              "3": "Consistently maintains age-appropriate interactions, language, and expectations for the K-3 age group.",
              "2": "Occasionally demonstrates unrealistic academic or behavioral expectations inappropriate for the developmental stage of K-3 students.",
              "1": "Demonstrates a fundamental misunderstanding of K-3 child development; interactions and expectations are consistently developmentally inappropriate."
            }
          },
          {
            "id": "C9.2",
            "text": "Actively enhances and facilitates teacher-designed structured play and inquiry-based learning experiences.",
            "evidence": "Observation",
            "levels": {
              "4": "Enhances structured play and inquiry experiences significantly beyond the basic facilitation role; introduces novel, appropriate extensions that deepen learning.",
              "3": "Effectively and enthusiastically supports and facilitates teacher-designed play-based and inquiry learning activities.",
              "2": "Passive during play-based activities; does not actively enhance the quality or learning value of the experience.",
              "1": "Actively discourages, mismanages, or undermines teacher-designed play-based or inquiry learning activities."
            }
          }
        ]
      }
    ]
  },
  {
    "domain": "D10: Professional Growth",
    "weight": 5,
    "subdomains": [
      {
        "name": "Development & Reflection",
        "indicators": [
          {
            "id": "C10.1",
            "text": "Actively seeks and engages in professional development opportunities beyond the minimum requirements.",
            "evidence": "PD Log",
            "levels": {
              "4": "Proactively seeks additional PD opportunities beyond requirements; shares new learning with colleagues and consistently implements new strategies in the classroom.",
              "3": "Actively attends all required PD sessions; engages genuinely and applies relevant new learning to practice.",
              "2": "PD participation is passive or compliance-based; new learning is rarely reflected in classroom practice.",
              "1": "Avoids PD entirely or attends without genuine engagement; demonstrates no professional growth."
            }
          },
          {
            "id": "C10.2",
            "text": "Implements feedback from observations and line management promptly, consistently, and with sustained improvement.",
            "evidence": "Observation",
            "levels": {
              "4": "Implements all feedback immediately and sustains improvement permanently; proactively seeks feedback between formal observations.",
              "3": "Implements feedback within a reasonable and agreed timeframe; demonstrates consistent improvement as a result.",
              "2": "Improvement from feedback is inconsistent; reverts to old habits after initial compliance; requires repeated feedback on the same issues.",
              "1": "No measurable improvement despite repeated feedback; resistant or defensive when given constructive criticism."
            }
          },
          {
            "id": "C10.3",
            "text": "Engages in regular self-reflection and sets measurable professional goals to guide continuous growth.",
            "evidence": "Reflective Log",
            "levels": {
              "4": "Sets ambitious, measurable SMART goals; systematically tracks and demonstrates growth against all goals; shows clear, documented improvement over time.",
              "3": "Reflects on practice honestly and sets general goals for improvement; demonstrates meaningful progress toward stated goals.",
              "2": "Reflection is superficial or limited; goals are vague and progress is not actively monitored or demonstrated.",
              "1": "Engages in no meaningful self-reflection; no professional growth plan; unable to identify personal areas for development."
            }
          }
        ]
      }
    ]
  }
];
