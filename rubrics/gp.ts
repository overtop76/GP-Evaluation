import { Domain } from '../types';

export const GP_RUBRIC: Domain[] = [
  {
    "domain": "D1: Instructional Practices",
    "weight": 35,
    "subdomains": [
      {
        "name": "Lesson Planning",
        "indicators": [
          {
            "id": "1.1.1",
            "text": "Develops detailed lesson plans aligned with school standards and curriculum, including clear learning objectives and differentiated strategies.",
            "evidence": "Lesson Plans",
            "levels": {
              "4": "Plans demonstrate innovative, seamless integration of standards with highly personalized differentiation strategies. Plans are adjusted proactively based on real-time data.",
              "3": "Plans are comprehensive, standards-aligned, and include clear objectives and effective differentiation strategies suitable for class profile.",
              "2": "Plans are basic or superficial; objectives are unclear (SWBAT missing) or differentiation strategies are generic/not tailored to student needs.",
              "1": "Plans are missing, inaccessible, or show no alignment to standards. No evidence of planning for student needs."
            }
          },
          {
            "id": "1.1.2",
            "text": "Submits lesson plans and resources on or before deadlines consistently.",
            "evidence": "Lesson Plans",
            "levels": {
              "4": "Consistently submits plans well in advance of deadline; resources are meticulously organized and shared with colleagues proactively.",
              "3": "Consistently submits plans and resources by agreed-upon deadlines; resources are ready for use.",
              "2": "Frequently submits plans late or requires reminders; resources are often missing or incomplete at time of submission.",
              "1": "Habitually fails to submit plans or submits them significantly late, hindering instructional oversight."
            }
          },
          {
            "id": "1.1.3",
            "text": "Uses multiple sources of student data to guide planning.",
            "evidence": "Lesson Plans",
            "levels": {
              "4": "Synthesizes formative, summative, and behavioral data to create predictive, responsive lesson plans that target specific learning gaps.",
              "3": "Consistently utilizes available assessment and performance data to inform content and pacing of lesson plans.",
              "2": "References data sporadically or uses only one type of data (e.g., grades only) without adjusting planning based on findings.",
              "1": "Lesson planning ignores student data entirely; instruction proceeds regardless of student performance indicators."
            }
          },
          {
            "id": "1.1.4",
            "text": "Plans collaboratively with colleagues to enhance teaching and learning.",
            "evidence": "Lesson Plans",
            "levels": {
              "4": "Leads collaborative planning sessions; actively mentors peers in integrating cross-curricular connections and best practices.",
              "3": "Actively contributes ideas and resources during collaborative planning sessions; integrates team decisions into individual plans.",
              "2": "Participation in collaborative planning is passive; individual plans often deviate from agreed team goals.",
              "1": "Refuses to collaborate or frequently misses planning meetings; works in isolation without regard for team alignment."
            }
          }
        ]
      },
      {
        "name": "Instructional Delivery",
        "indicators": [
          {
            "id": "1.2.1",
            "text": "Utilizes diverse teaching methods to engage students and promote active learning.",
            "evidence": "Observation",
            "levels": {
              "4": "Seamlessly rotates through a wide repertoire of strategies (e.g., inquiry-based, gamification) to maximize student ownership of learning.",
              "3": "Utilizes a variety of teaching methods appropriate to content; students are actively engaged during lesson.",
              "2": "Relies heavily on one mode of instruction (e.g., lecture or direct instruction); student engagement is passive.",
              "1": "Instruction is monotonous or inappropriate; methods fail to engage students or cause confusion."
            }
          },
          {
            "id": "1.2.2",
            "text": "Incorporates scaffolding to ensure all students can access and master the content.",
            "evidence": "Observation",
            "levels": {
              "4": "Scaffolding is invisible and intuitive; teacher anticipates barriers and builds support structures that are removed as students demonstrate competence.",
              "3": "Provides clear, step-by-step support (graphic organizers, sentence stems) to help students access difficult content.",
              "2": "Scaffolding is 'one size fits all' or provided only after students have already failed the task.",
              "1": "No scaffolding is provided; content is delivered at a single level without support for struggling learners."
            }
          },
          {
            "id": "1.2.3",
            "text": "Uses questioning techniques to promote critical thinking and discussion.",
            "evidence": "Observation",
            "levels": {
              "4": "Uses higher-order questioning (Bloom’s Taxonomy) that encourages student-led inquiry, debate, and deep analysis.",
              "3": "Uses a mix of open and closed questions; effectively probes student thinking and encourages class discussion.",
              "2": "Questions are primarily recall/factual; rarely asks follow-up questions or probes for deeper understanding.",
              "1": "Questions are unclear, inappropriate, or limited to 'yes/no' responses; fails to check for understanding."
            }
          },
          {
            "id": "1.2.4",
            "text": "Builds on students' existing knowledge and skills.",
            "evidence": "Observation",
            "levels": {
              "4": "Expertly links new concepts to students' prior knowledge, personal interests, and current events to create relevance.",
              "3": "Explicitly activates prior knowledge at start of lessons and connects new learning to previous concepts.",
              "2": "Connections to prior knowledge are vague or forced; assumes students possess background knowledge they may lack.",
              "1": "Begins instruction without assessing or linking to prior knowledge; treats new content as isolated facts."
            }
          },
          {
            "id": "1.2.5",
            "text": "Differentiates instructional content, process, product, and learning environment to meet individual developmental needs.",
            "evidence": "Observation",
            "levels": {
              "4": "Differentiation is fluid and student-driven; students choose pathways, groups, or output methods based on self-assessment.",
              "3": "Teacher intentionally varies content, process, or product to address different readiness levels and learning styles.",
              "2": "Differentiation is tokenistic (e.g., 'extra' work rather than different work) or limited to a single subgroup.",
              "1": "Instruction is uniform; ignores diverse learning needs, language proficiency, or skill levels."
            }
          },
          {
            "id": "1.2.6",
            "text": "Motivates students and reinforces learning goals consistently throughout the lesson.",
            "evidence": "Observation",
            "levels": {
              "4": "Creates an intrinsic culture of learning where students are self-motivated and articulate purpose of their work.",
              "3": "Consistently communicates learning objectives and uses positive reinforcement to maintain focus and motivation.",
              "2": "Motivation is reliant on extrinsic rewards or teacher control; relevance of lesson is not clearly communicated.",
              "1": "Teacher expresses negativity or indifference; students appear disengaged or unsure of why they are learning the material."
            }
          },
          {
            "id": "1.2.7",
            "text": "Uses a variety of appropriate instructional strategies and resources to encourage active student engagement.",
            "evidence": "Observation",
            "levels": {
              "4": "Leverages cutting-edge resources and manipulatives to create immersive learning experiences.",
              "3": "Uses textbooks, technology, and manipulatives effectively to support lesson objectives.",
              "2": "Relies solely on textbook or whiteboard; resources are broken, outdated, or used ineffectively.",
              "1": "Instructional materials are missing or misused; teacher fails to utilize resources available to them."
            }
          }
        ]
      },
      {
        "name": "Assessment for Learning",
        "indicators": [
          {
            "id": "1.3.1",
            "text": "Designs formative and summative assessments that measure student progress effectively.",
            "evidence": "Gradebook/Samples",
            "levels": {
              "4": "Assessments are innovative, authentic performance tasks that measure higher-order thinking and application.",
              "3": "Assessments are clearly aligned to standards and learning objectives; measure the intended skills effectively.",
              "2": "Assessments are marginally aligned or contain ambiguous questions that do not accurately measure student learning.",
              "1": "Assessments are missing, misaligned with standards, or contain errors that invalidate the results."
            }
          },
          {
            "id": "1.3.2",
            "text": "Provides timely, constructive feedback to students to guide their learning.",
            "evidence": "Observation",
            "levels": {
              "4": "Feedback is immediate, specific, and actionable; students are taught how to self-critique based on feedback.",
              "3": "Feedback is provided regularly (during and after tasks) and offers specific guidance on how to improve.",
              "2": "Feedback is infrequent, generic (e.g., 'good job'), or given too long after the task to be useful.",
              "1": "Feedback is punitive, absent, or non-existent; students are not informed of their progress."
            }
          },
          {
            "id": "1.3.3",
            "text": "Analyzes assessment data and adjusts instruction to address gaps in understanding.",
            "evidence": "Gradebook/Samples",
            "levels": {
              "4": "Data analysis leads to immediate real-time pivoting in instruction; intervention groups are formed dynamically.",
              "3": "Reviews assessment data after lessons/units and plans future lessons to address common misconceptions.",
              "2": "Collects data but rarely analyzes it or changes instruction regardless of the results.",
              "1": "Fails to collect or analyze data; instruction proceeds without regard for student assessment results."
            }
          },
          {
            "id": "1.3.4",
            "text": "Uses pre-assessment data to develop expectations for students, to differentiate instruction, and to document learning.",
            "evidence": "Gradebook/Samples",
            "levels": {
              "4": "Uses pre-assessments to map learning trajectories for every student; groups are flexible based on ongoing data.",
              "3": "Administers pre-assessments and uses results to group students and set initial instructional goals.",
              "2": "Pre-assessments are given but results are not used to inform grouping or planning.",
              "1": "No pre-assessment occurs; instruction assumes all students start at the same point."
            }
          },
          {
            "id": "1.3.5",
            "text": "Involves students in setting learning goals and monitoring their own progress.",
            "evidence": "Observation",
            "levels": {
              "4": "Students autonomously track their data, set rigorous personal goals, and conduct peer-led conferences.",
              "3": "Teacher guides students in setting goals and provides tools for them to track their own progress.",
              "2": "Goal-setting is teacher-directed; students have limited ownership or understanding of their progress.",
              "1": "Students are unaware of their goals or current performance levels; tracking is solely the teacher's job."
            }
          },
          {
            "id": "1.3.6",
            "text": "Uses research-based questioning techniques to gauge student understanding.",
            "evidence": "Observation",
            "levels": {
              "4": "Utilizes 'No Opt Out' and 'Wait Time' strategies to ensure 100% participation and deep understanding before moving on.",
              "3": "Asks strategic questions to groups and individuals to verify understanding before moving to the next concept.",
              "2": "Relies on 'Choral Reading' or asking volunteers only ('Does anyone know?') which masks lack of understanding.",
              "1": "Fails to check for understanding or assumes learning has occurred without verification."
            }
          }
        ]
      },
      {
        "name": "Classroom Environment",
        "indicators": [
          {
            "id": "1.4.1",
            "text": "Maintains a positive, inclusive classroom where all students feel respected and valued.",
            "evidence": "Observation",
            "levels": {
              "4": "Cultivates a profound sense of belonging where students celebrate each other’s differences and actively include peers.",
              "3": "Interactions are consistently positive; teacher models respect and addresses insensitivity immediately.",
              "2": "Climate is generally neutral but lacks warmth; some students may appear withdrawn or hesitant to participate.",
              "1": "Environment is hostile, sarcastic, or demeaning; students ridicule or fear participating."
            }
          },
          {
            "id": "1.4.2",
            "text": "Implements effective classroom management strategies to create a focused learning environment.",
            "evidence": "Observation",
            "levels": {
              "4": "Management is subtle and preventative; teacher builds relationships that naturally eliminate disruptive behavior.",
              "3": "Implements clear rules and routines; minimizes disruptions and refocuses students quickly and fairly.",
              "2": "Rules are inconsistent; teacher struggles to maintain order and frequently raises voice or argues with students.",
              "1": "Chaos reigns; safety is compromised; teacher has lost control of the student group."
            }
          },
          {
            "id": "1.4.3",
            "text": "Encourages student independence, collaboration, and accountability.",
            "evidence": "Observation",
            "levels": {
              "4": "Students facilitate their own collaborative groups; teacher acts as a coach who empowers student leaders.",
              "3": "Structures lessons to require peer collaboration; holds students accountable for their role in the group.",
              "2": "Assigns group work but does not monitor or support interactions; resulting in 'hitchhiking' or social loafing.",
              "1": "Discourages collaboration; students work only in isolation or are off-task during group time."
            }
          },
          {
            "id": "1.4.4",
            "text": "Arranges and modifies the classroom to maximize learning while providing a safe environment.",
            "evidence": "Observation",
            "levels": {
              "4": "Seating and layout change dynamically to match the lesson flow (e.g., fishbowl, independent stations).",
              "3": "Furniture is arranged to support the learning activity (e.g., groups for projects, rows for testing); space is safe and clean.",
              "2": "Furniture arrangement is static or obstructs movement; displays are outdated or cluttered.",
              "1": "Room is messy, hazardous, or arranged in a way that impedes instruction (e.g., teacher facing wall, blind spots)."
            }
          },
          {
            "id": "1.4.5",
            "text": "Establishes clear expectations, with student input, for classroom rules and procedures early in the school year and enforces them consistently and fairly.",
            "evidence": "Observation",
            "levels": {
              "4": "Students co-create the social contract; they self-regulate and remind peers of expectations with teacher support.",
              "3": "Clear rules are posted, taught, and enforced consistently; expectations are logical and understood.",
              "2": "Rules are posted but enforced arbitrarily; some students are treated differently than others.",
              "1": "No clear rules established; consequences are capricious, harsh, or non-existent."
            }
          },
          {
            "id": "1.4.6",
            "text": "Maximizes instructional time and minimizes disruptions.",
            "evidence": "Observation",
            "levels": {
              "4": "Transitions are seamless and silent; every minute is used for learning (bell-to-bell instruction).",
              "3": "Pacing is appropriate; routines are efficient so instructional time is rarely lost.",
              "2": "Significant time is lost on management tasks, transitions, or off-topic conversations.",
              "1": "Lessons start late or end early; large chunks of time are wasted on discipline or logistics."
            }
          },
          {
            "id": "1.4.7",
            "text": "Establishes a climate of trust and teamwork by being fair, caring, respectful, and enthusiastic.",
            "evidence": "Observation",
            "levels": {
              "4": "Teacher creates a 'family' atmosphere; students feel safe taking academic risks because failure is viewed as learning.",
              "3": "Teacher is approachable and encouraging; demonstrates genuine care for students' well-being.",
              "2": "Teacher is professional but distant; rarely connects with students on a personal level.",
              "1": "Teacher is dismissive, cold, or sarcastic; erodes trust with students."
            }
          },
          {
            "id": "1.4.8",
            "text": "Encourages student engagement, inquiry, and intellectual risk-taking.",
            "evidence": "Observation",
            "levels": {
              "4": "Students confidently challenge ideas and propose 'what if' scenarios without fear of being wrong.",
              "3": "Teacher explicitly values wrong answers as learning opportunities; encourages students to think out loud.",
              "2": "Teacher emphasizes only 'correct' answers, causing students to hesitate to answer if unsure.",
              "1": "Teacher shames students for wrong answers or shuts down inquiry."
            }
          },
          {
            "id": "1.4.9",
            "text": "Promotes respectful interactions and an understanding of students' diversity, such as language, culture, race, gender, and special needs.",
            "evidence": "Observation",
            "levels": {
              "4": "Curriculum and discussions are culturally responsive; students actively educate peers on global perspectives.",
              "3": "Teacher facilitates discussions on diversity with sensitivity; integrates diverse perspectives into materials.",
              "2": "Diversity is acknowledged but superficially (e.g., 'Heroes' month only); stereotypes may go unchallenged.",
              "1": "Teacher ignores diversity or makes insensitive remarks; biases are evident in instruction."
            }
          },
          {
            "id": "1.4.10",
            "text": "Actively listens and makes accommodations for all students' needs, including social, emotional, behavioral, and intellectual.",
            "evidence": "Observation",
            "levels": {
              "4": "Anticipates needs before they arise (e.g., provides a fidget tool proactively); advocates for student services.",
              "3": "Responds promptly to student needs; implements accommodations (IEPs/504s) with fidelity.",
              "2": "Notices needs but reacts slowly or accommodations are applied inconsistently.",
              "1": "Ignores visible signs of distress or refuses to implement mandated accommodations."
            }
          },
          {
            "id": "1.4.11",
            "text": "Works with students individually as well as in small groups or whole groups.",
            "evidence": "Observation",
            "levels": {
              "4": "Teacher seamlessly rotates between individual conferencing, small group targeted instruction, and whole group facilitation.",
              "3": "Teacher balances modes of delivery; regularly pulls small groups for targeted support.",
              "2": "Instruction is almost exclusively whole group; teacher rarely interacts with individuals or small groups.",
              "1": "Teacher sits at desk and ignores students; fails to circulate or engage with groups."
            }
          },
          {
            "id": "1.4.12",
            "text": "Promotes an environment—whether in-person or virtual—that is academically appropriate, stimulating, and challenging.",
            "evidence": "Observation",
            "levels": {
              "4": "Environment is rich with student work, current anchor charts, and challenging prompts; digital spaces are equally interactive.",
              "3": "Room is organized and decorated with relevant learning materials; virtual platform is navigable.",
              "2": "Environment is sterile or distracting; digital spaces contain broken links or outdated files.",
              "1": "Environment is depressing or chaotic; digital spaces are inactive or inaccessible to students."
            }
          }
        ]
      }
    ]
  },
  {
    "domain": "D2: Student Learning & Outcomes",
    "weight": 20,
    "subdomains": [
      {
        "name": "Academic Progress",
        "indicators": [
          {
            "id": "2.1.1",
            "text": "Students demonstrate measurable growth on internal and external assessments.",
            "evidence": "Gradebook/Samples",
            "levels": {
              "4": "Class shows high growth percentiles; students at all levels (including advanced) show significant improvement.",
              "3": "Class shows expected levels of growth; majority of students meet expected growth targets.",
              "2": "Growth is stagnant; only a small percentage of students meet growth targets.",
              "1": "Students perform significantly below expectations; many show regression or zero growth."
            }
          },
          {
            "id": "2.1.2",
            "text": "Curriculum standards are achieved by a significant majority of students.",
            "evidence": "Observation",
            "levels": {
              "4": "Over 90% of students achieve mastery of standards; remediation rates are very low.",
              "3": "Majority of students (75%+) achieve proficiency on curriculum standards.",
              "2": "Less than 50% of students achieve proficiency; standards are not being met by the class.",
              "1": "Failure rate is excessive; curriculum is not being taught effectively enough for students to pass."
            }
          },
          {
            "id": "2.1.3",
            "text": "Sets acceptable, measurable, and appropriate achievement goals for student learning progress based on baseline data.",
            "evidence": "Observation",
            "levels": {
              "4": "Goals are ambitious yet realistic; specific stretch targets are set for subgroups; goals are adjusted dynamically.",
              "3": "Sets specific, measurable (SMART) goals for the class based on diagnostic data at the start of the year.",
              "2": "Goals are vague (e.g., 'students will do better') or not based on baseline data.",
              "1": "No achievement goals are set or shared; expectations are undefined."
            }
          },
          {
            "id": "2.1.4",
            "text": "Documents the progress of each student throughout the year.",
            "evidence": "Observation",
            "levels": {
              "4": "Maintains a comprehensive digital portfolio for every student showcasing growth over time in multiple domains.",
              "3": "Maintains up-to-date records of student performance in the gradebook and/or tracking sheets.",
              "2": "Documentation is sporadic, missing for some students, or not updated regularly.",
              "1": "Fails to document student progress; no evidence of performance tracking exists."
            }
          },
          {
            "id": "2.1.5",
            "text": "Provides evidence that achievement goals have been met, including school-provided progress data when available as well as other multiple measures.",
            "evidence": "Observation",
            "levels": {
              "4": "Presents a holistic body of evidence (data walls, portfolios, test scores) conclusively proving goal attainment.",
              "3": "Provides clear data reports (school assessments + classroom measures) demonstrating that goals were met.",
              "2": "Evidence is anecdotal or insufficient; cannot clearly prove goals were met with data.",
              "1": "Claims goals were met but provides no supporting evidence."
            }
          },
          {
            "id": "2.1.6",
            "text": "Uses available performance outcome data to continually document and communicate student academic progress and develop interim learning targets.",
            "evidence": "Observation",
            "levels": {
              "4": "Students and parents receive real-time data dashboards; interim targets are co-created with students.",
              "3": "Regularly updates gradebook and communicates progress; breaks annual goals into smaller interim steps.",
              "2": "Communication of progress is infrequent (e.g., only report cards); interim targets are not used.",
              "1": "Does not communicate progress; data is hoarded or not used to drive targets."
            }
          }
        ]
      },
      {
        "name": "Differentiation",
        "indicators": [
          {
            "id": "2.2.1",
            "text": "Ensures students with diverse needs (e.g., EAL, SEN) show consistent progress.",
            "evidence": "Observation",
            "levels": {
              "4": "EAL/SEN students often outperform their targets due to tailored scaffolding and specialized interventions.",
              "3": "EAL/SEN students meet their individualized growth goals and show steady progress.",
              "2": "Progress of diverse learners is flat or highly inconsistent; gaps widen.",
              "1": "Diverse learners are failing; no progress is evident for EAL/SEN populations."
            }
          },
          {
            "id": "2.2.2",
            "text": "Challenges advanced students through enrichment and higher-order tasks.",
            "evidence": "Observation",
            "levels": {
              "4": "Advanced students are accelerators; they work on independent passion projects or mentor peers.",
              "3": "Provides differentiated extension tasks that require deeper analysis or complexity for advanced learners.",
              "2": "Advanced learners are given 'more of the same' work rather than enrichment; they are bored.",
              "1": "Advanced learners are left to teach themselves or are ignored; no challenge provided."
            }
          },
          {
            "id": "2.2.3",
            "text": "Disaggregates assessment, engagement, behavioral, and attendance data by student groups.",
            "evidence": "Gradebook/Samples",
            "levels": {
              "4": "Deep dive analysis reveals specific trends within subgroups (gender, EAL, etc.); action plans are created based on disparities.",
              "3": "Reviews data by student groups to identify trends and adjust instruction accordingly.",
              "2": "Data is only viewed as a class average; subgroup disparities are unnoticed.",
              "1": "Data is not analyzed at all."
            }
          },
          {
            "id": "2.2.4",
            "text": "Identifies and applies differentiated strategies to address growth and learning needs of all students with specific attention to students within gap groups.",
            "evidence": "Data Analysis Sheets",
            "levels": {
              "4": "Teacher acts as a resource for others on closing achievement gaps; specific interventions yield measurable results for gap groups.",
              "3": "Implements targeted strategies identified in data meetings to support gap groups.",
              "2": "Aware of gap groups but applies general strategies rather than specific interventions.",
              "1": "Ignores gap groups; treats the class as a monolith, widening the achievement gap."
            }
          }
        ]
      },
      {
        "name": "Engagement and Participation",
        "indicators": [
          {
            "id": "2.3.1",
            "text": "Students actively participate in lessons and demonstrate enthusiasm for learning.",
            "evidence": "Observation",
            "levels": {
              "4": "Students are energized, self-directed, and visibly excited to learn; participation is voluntary and universal.",
              "3": "Most students participate voluntarily and stay on task throughout the lesson.",
              "2": "Participation is limited to a few volunteers; many students appear passive or bored.",
              "1": "Students are sleeping, off-task, or disruptive; refusal to participate is common."
            }
          },
          {
            "id": "2.3.2",
            "text": "Encourages critical thinking, collaboration, and creativity.",
            "evidence": "Observation",
            "levels": {
              "4": "Students generate novel solutions, debate complex topics, and critique ideas constructively without prompting.",
              "3": "Students regularly work together to solve problems and produce creative work.",
              "2": "Tasks are predominantly rote memorization or recall; little opportunity for creativity.",
              "1": "Tasks are low-level or exclusively fact-retrieval; no critical thinking required."
            }
          },
          {
            "id": "2.3.3",
            "text": "Utilizes LMS/Digital Platform’s communication tools to maintain engagement and foster collaboration.",
            "evidence": "Comm. Log",
            "levels": {
              "4": "Online forums are buzzing with student-led discussion; students support each other digitally outside school hours.",
              "3": "Teacher actively uses LMS features (discussion boards, announcements) to extend learning and collaboration.",
              "2": "LMS is used only as a repository for files; little to no interactive communication.",
              "1": "LMS is inactive or unused; digital communication is one-way or non-existent."
            }
          },
          {
            "id": "2.3.4",
            "text": "Encourages student engagement, inquiry, and intellectual risk-taking.",
            "evidence": "Observation",
            "levels": {
              "4": "Students initiate inquiry projects; they embrace mistakes as part of the learning cycle.",
              "3": "Teacher creates a safe space for questions; encourages students to try difficult problems.",
              "2": "Students are hesitant to take risks; they prefer safe, easy tasks.",
              "1": "Students fear making mistakes; they shut down when faced with challenge."
            }
          },
          {
            "id": "2.3.5",
            "text": "Promotes respectful interactions and an understanding of students' diversity.",
            "evidence": "Observation",
            "levels": {
              "4": "Students actively educate one another on cultural nuances; conflict is resolved through restorative justice practices.",
              "3": "Students interact respectfully; teacher intervenes immediately to mediate any disrespect.",
              "2": "Occasional micro-aggressions or disrespect go unnoticed or unchecked.",
              "1": "Disrespectful language or bullying is prevalent; teacher fails to intervene."
            }
          }
        ]
      },
      {
        "name": "Social and Emotional Development",
        "indicators": [
          {
            "id": "2.4.1",
            "text": "Supports the development of students’ confidence, resilience, and interpersonal skills.",
            "evidence": "Observation",
            "levels": {
              "4": "Students demonstrate high self-efficacy; they bounce back quickly from setbacks and support peers.",
              "3": "Teacher explicitly teaches social skills and provides 'emotional check-ins.'",
              "2": "SEL is mentioned but not integrated; teacher notices distress but offers little support.",
              "1": "Teacher undermines confidence or ignores signs of emotional distress."
            }
          },
          {
            "id": "2.4.2",
            "text": "Proactively addresses students’ emotional well-being and fosters a positive school experience.",
            "evidence": "Observation",
            "levels": {
              "4": "Teacher acts as a safe haven; students seek them out for mentorship; teacher coordinates with counselors proactively.",
              "3": "Teacher is aware of student stressors and adjusts environment/workload to support well-being.",
              "2": "Teacher reacts only to emotional outbursts rather than preventing them.",
              "1": "Teacher contributes to a toxic or stressful environment for students."
            }
          },
          {
            "id": "2.4.3",
            "text": "Supports students' social-emotional growth through classroom activities and uploads relevant materials to LMS.",
            "evidence": "Digital Artifacts",
            "levels": {
              "4": "LMS hosts a dedicated 'Wellness Hub' curated by the teacher; students access it regularly for self-regulation tools.",
              "3": "Teacher posts SEL resources and integrates SEL activities into the weekly routine.",
              "2": "SEL resources are posted but not used or referenced in class.",
              "1": "No SEL resources or activities are present."
            }
          },
          {
            "id": "2.4.4",
            "text": "Proactively addresses emotional well-being, using LMS to share resources for students’ personal development.",
            "evidence": "Digital Artifacts",
            "levels": {
              "4": "Digital resources are personalized; teacher messages individuals with specific support resources.",
              "3": "General announcements regarding mental health and support services are shared regularly.",
              "2": "Digital presence is purely academic; no support for personal growth is shared.",
              "1": "Digital environment is cold, bureaucratic, or discouraging."
            }
          }
        ]
      }
    ]
  },
  {
    "domain": "D3: Professionalism",
    "weight": 10,
    "subdomains": [
      {
        "name": "Ethics and Conduct",
        "indicators": [
          {
            "id": "3.1.1",
            "text": "Demonstrates integrity, respect, and professionalism in interactions.",
            "evidence": "Comm. Log",
            "levels": {
              "4": "Serves as a role model for the school; handles confidential information with impeccable discretion.",
              "3": "Consistently professional in speech, dress, and demeanor; maintains confidentiality.",
              "2": "Occasionally breaches professionalism (e.g., gossip) or shows inconsistency in demeanor.",
              "1": "Behavior is unethical, disrespectful, or breaches confidentiality."
            }
          },
          {
            "id": "3.1.2",
            "text": "Adheres to all school policies and ethical guidelines consistently.",
            "evidence": "Observation",
            "levels": {
              "4": "Vests in the school mission; acts as a guardian of school culture and policy.",
              "3": "Follows all school policies and procedures without reminders.",
              "2": "Requires reminders to adhere to specific policies; cuts corners occasionally.",
              "1": "Frequently violates school policies or ethical codes."
            }
          },
          {
            "id": "3.1.3",
            "text": "Adheres to Egyptian Ministry of Education laws, school/division policies, and procedural requirements.",
            "evidence": "Observation",
            "levels": {
              "4": "Interprets MoE guidelines expertly; helps colleagues navigate compliance.",
              "3": "Fully compliant with MoE laws and school requirements; documentation is accurate.",
              "2": "Knowledge of MoE guidelines is shaky; compliance is reactive rather than proactive.",
              "1": "Non-compliant with MoE or legal requirements; puts the school at risk."
            }
          }
        ]
      },
      {
        "name": "Collaboration and Teamwork",
        "indicators": [
          {
            "id": "3.2.1",
            "text": "Actively collaborates with colleagues on curriculum planning and problem-solving.",
            "evidence": "Lesson Plans",
            "levels": {
              "4": "Leads PLCs; generates innovative solutions that benefit the whole team.",
              "3": "Shares resources willingly and contributes to team planning and problem-solving.",
              "2": "Reluctant to share ideas or collaborate; works in a silo.",
              "1": "Hostile to collaboration; refuses to share or participate in team efforts."
            }
          },
          {
            "id": "3.2.2",
            "text": "Contributes positively to department and school-wide initiatives.",
            "evidence": "Observation",
            "levels": {
              "4": "Leads or organizes initiatives; enthusiasm encourages others to participate.",
              "3": "Participates actively in committees, events, and departmental duties.",
              "2": "Does the minimum required regarding initiatives; often complains about changes.",
              "1": "Openly negative about school initiatives; refuses to participate."
            }
          },
          {
            "id": "3.2.3",
            "text": "Works in a collegial and collaborative manner with administrators and community to promote students' well-being.",
            "evidence": "Observation",
            "levels": {
              "4": "Proactively builds partnerships with admin and community to secure resources for students.",
              "3": "Maintains positive, open communication with admin and community; supports student welfare.",
              "2": "Communication with admin or community is sporadic or one-way.",
              "1": "Antagonistic toward administration or alienates the community."
            }
          }
        ]
      },
      {
        "name": "Punctuality and Deadlines",
        "indicators": [
          {
            "id": "3.3.1",
            "text": "Consistently meets deadlines (plans, grading, meetings).",
            "evidence": "Comm. Log",
            "levels": {
              "4": "Submits work days ahead of schedule; helps organize time-sensitive projects.",
              "3": "Meets all deadlines reliably; grading and planning are current.",
              "2": "Frequently requires extensions; grading is often days late.",
              "1": "Chronically late; deadlines missed regularly causing operational issues."
            }
          },
          {
            "id": "3.3.2",
            "text": "Demonstrates reliability in fulfilling all professional responsibilities on time.",
            "evidence": "Observation",
            "levels": {
              "4": "100% reliable regarding duties, supervision, and attendance; never leaves responsibilities unattended.",
              "3": "Fulfills all assigned duties (recess, bus duty, etc.) promptly and reliably.",
              "2": "Occasionally late to duties or needs coverage for personal reasons.",
              "1": "Frequently absent from duties or leaves students unsupervised."
            }
          }
        ]
      },
      {
        "name": "Professional Dress Code",
        "indicators": [
          {
            "id": "3.4.1",
            "text": "Consistently adheres to the school’s dress code policy.",
            "evidence": "Observation",
            "levels": {
              "4": "Appearance is impeccable and models the highest professional standards.",
              "3": "Consistently adheres to the dress code; appearance is professional.",
              "2": "Occasionally violates dress code or appears unkempt.",
              "1": "Consistently violates dress code; appearance is unprofessional."
            }
          },
          {
            "id": "3.4.2",
            "text": "Models professionalism for students through appearance and demeanor.",
            "evidence": "Observation",
            "levels": {
              "4": "Teacher is a mentor for student deportment; models poise and confidence.",
              "3": "Appearance and demeanor project a professional image for students to emulate.",
              "2": "Demeanor is occasionally too casual or unprofessional for the educational setting.",
              "1": "Demeanor is inappropriate, offensive, or unprofessional in front of students."
            }
          }
        ]
      }
    ]
  },
  {
    "domain": "D4: Technology Integration",
    "weight": 10,
    "subdomains": [
      {
        "name": "Instructional Use of Technology",
        "indicators": [
          {
            "id": "4.1.1",
            "text": "Regularly incorporates digital tools/LMS for content delivery and tracking.",
            "evidence": "Digital Artifacts",
            "levels": {
              "4": "Teacher innovates with new tools; students use tech seamlessly to personalize learning paths.",
              "3": "LMS is fully populated; teacher uses diverse digital tools effectively for instruction.",
              "2": "Uses technology sporadically or only for basic delivery (e.g., PowerPoint).",
              "1": "No integration of technology; failure to use LMS."
            }
          },
          {
            "id": "4.1.2",
            "text": "Leverages LMS features (resources, gradebook, assignments) to enhance instruction.",
            "evidence": "Digital Artifacts",
            "levels": {
              "4": "Explores advanced LMS features; automates workflows to save time and improve feedback.",
              "3": "Uses core LMS features correctly to organize resources and assignments.",
              "2": "LMS use is disorganized; files are hard to find or misplaced.",
              "1": "Does not use LMS features; instruction is paper-based only."
            }
          },
          {
            "id": "4.1.3",
            "text": "Incorporates digital tools to create engaging, interactive lessons.",
            "evidence": "Digital Artifacts",
            "levels": {
              "4": "Lessons are gamified or highly interactive; students use tech to create, not just consume.",
              "3": "Uses interactive tools (Kahoot, Quizizz, etc.) to boost engagement regularly.",
              "2": "Tech use is passive (watching videos) or rare.",
              "1": "Technology malfunctions due to lack of preparation or is unused."
            }
          },
          {
            "id": "4.1.4",
            "text": "Leverages technology to differentiate instruction for varying needs.",
            "evidence": "Digital Artifacts",
            "levels": {
              "4": "Uses adaptive software that automatically adjusts to student reading/math levels.",
              "3": "Uses digital tools to provide different versions of content or support to different groups.",
              "2": "Uses same digital resources for all students regardless of ability.",
              "1": "Tech barriers prevent some students from accessing content."
            }
          }
        ]
      },
      {
        "name": "Digital Assessment",
        "indicators": [
          {
            "id": "4.2.1",
            "text": "Designs assessments using LMS quiz/grading features to track progress.",
            "evidence": "Digital Artifacts",
            "levels": {
              "4": "Creates complex, branched assessments on LMS that provide instant remediation links.",
              "3": "Regularly uses LMS for quizzes; uses auto-grading features for efficiency.",
              "2": "Assessments are paper-only; LMS gradebook is underutilized.",
              "1": "Manual entry of everything; no use of digital assessment efficiency."
            }
          },
          {
            "id": "4.2.2",
            "text": "Provides digital feedback and uses data from LMS to inform decisions.",
            "evidence": "Digital Artifacts",
            "levels": {
              "4": "Uses audio/video feedback; analyzes item-analysis data to reteach specific concepts.",
              "3": "Provides detailed digital comments; reviews LMS reports to identify struggling students.",
              "2": "Digital feedback is generic (e.g., 'Good job') or non-existent.",
              "1": "Ignores LMS data; does not use digital tools for feedback loops."
            }
          },
          {
            "id": "4.2.3",
            "text": "Utilizes online platforms to design, administer, and analyze assessments.",
            "evidence": "Digital Artifacts",
            "levels": {
              "4": "Uses platform analytics to drive tier 1 instruction; data dashboard is live.",
              "3": "Administers online assessments proficiently; analyzes basic data (mean, mode).",
              "2": "Online assessments are frequent but data is not analyzed.",
              "1": "Reluctant to use online assessments; complains about platform issues."
            }
          },
          {
            "id": "4.2.4",
            "text": "Uses student performance data to inform instructional decisions.",
            "evidence": "Digital Artifacts",
            "levels": {
              "4": "Teacher is a data expert; predicts outcomes and adjusts daily based on digital analytics.",
              "3": "Uses digital performance data to plan weekly reviews and groupings.",
              "2": "Looks at data only at reporting periods.",
              "1": "Instruction is disconnected from data evidence."
            }
          }
        ]
      },
      {
        "name": "Innovation and Creativity",
        "indicators": [
          {
            "id": "4.3.1",
            "text": "Encourages students to explore tech/creativity via LMS projects.",
            "evidence": "Digital Artifacts",
            "levels": {
              "4": "Students produce professional-level digital portfolios (podcasts, videos, code).",
              "3": "Students submit creative digital projects demonstrating mastery of tools.",
              "2": "Projects are basic or lack creativity; tech use is mandatory but uninspired.",
              "1": "No opportunities for creative digital expression."
            }
          },
          {
            "id": "4.3.2",
            "text": "Promotes responsible use of technology (educational/collaborative).",
            "evidence": "Observation",
            "levels": {
              "4": "Students are Digital Citizens; they teach peers about digital footprint and ethics.",
              "3": "Teacher explicitly teaches and enforces digital etiquette and copyright rules.",
              "2": "Rules exist but teacher ignores infractions (e.g., unauthorized gaming).",
              "1": "Students misuse technology frequently without consequence."
            }
          },
          {
            "id": "4.3.3",
            "text": "Introduces students to new digital tools and fosters responsible use.",
            "evidence": "Observation",
            "levels": {
              "4": "Teacher is an early adopter; beta-tests new tools and curates the best for students.",
              "3": "Regularly introduces a variety of tools to expand students' digital toolkit.",
              "2": "Uses the same one or two tools all year; no exploration of new tech.",
              "1": "Resistant to trying new tools; limits students' digital literacy."
            }
          },
          {
            "id": "4.3.4",
            "text": "Encourages students to create, collaborate, and explore using technology.",
            "evidence": "Observation",
            "levels": {
              "4": "Students collaborate globally or on complex simulations using tech.",
              "3": "Students use collaborative tools (docs/slides) effectively for group work.",
              "2": "Collab is forced or disorganized; tech hinders rather than helps collaboration.",
              "1": "Tech is used for isolation; no collaborative digital work occurs."
            }
          }
        ]
      }
    ]
  },
  {
    "domain": "D5: School Community",
    "weight": 10,
    "subdomains": [
      {
        "name": "Extracurricular Activities",
        "indicators": [
          {
            "id": "5.1.1",
            "text": "Leads or participates in school events, clubs, sports.",
            "evidence": "Observation",
            "levels": {
              "4": "Innovates new clubs or events; student participation is high due to teacher's leadership.",
              "3": "Actively attends and supports assigned events and extracurricular activities.",
              "2": "Participation is minimal; only does the bare minimum required.",
              "1": "Frequently skips assigned duties or events."
            }
          },
          {
            "id": "5.1.2",
            "text": "Supports school initiatives (assemblies, fundraising, service).",
            "evidence": "Observation",
            "levels": {
              "4": "Organizes key initiatives; rallies school spirit and participation.",
              "3": "Volunteers for committees and supports school functions.",
              "2": "Presence is felt but contribution is low profile.",
              "1": "Absent from school initiatives or visibly un-supportive."
            }
          },
          {
            "id": "5.1.3",
            "text": "Ensures related materials are uploaded to LMS/Digital Platform.",
            "evidence": "Digital Artifacts",
            "levels": {
              "4": "LMS 'Activities' section is vibrant; students have digital access to all club/sports info.",
              "3": "Materials for events are posted and kept up to date on the LMS.",
              "2": "Materials are missing, outdated, or disorganized on the platform.",
              "1": "No use of digital platform to support activities."
            }
          },
          {
            "id": "5.1.4",
            "text": "Actively supports school-wide initiatives and fosters participation.",
            "evidence": "Observation",
            "levels": {
              "4": "A 'cheerleader' for the school; motivates reluctant students to get involved.",
              "3": "Encourages students to participate and represents the school well.",
              "2": "Neutral stance; does not encourage student participation.",
              "1": "Discourages students from participating or is cynical about events."
            }
          }
        ]
      },
      {
        "name": "Mentorship and Leadership",
        "indicators": [
          {
            "id": "5.2.1",
            "text": "Provides support and guidance to colleagues, especially new teachers.",
            "evidence": "Meeting Minutes / Feedback",
            "levels": {
              "4": "Formal mentor who significantly impacts the practice of new hires.",
              "3": "Informally checks in on colleagues; offers helpful advice when asked.",
              "2": "Is too busy to help others or offers advice that is unsound.",
              "1": "Spreads negativity or undermines colleagues."
            }
          },
          {
            "id": "5.2.2",
            "text": "Takes leadership roles in improvement, curriculum, or projects.",
            "evidence": "Meeting Minutes / Feedback",
            "levels": {
              "4": "Chairs committees; leads curriculum writing; outcomes are tangible and improved.",
              "3": "Takes an active role in projects and completes assigned tasks diligently.",
              "2": "Participates in meetings but avoids taking ownership or leadership.",
              "1": "Blocks progress or refuses to serve on committees."
            }
          },
          {
            "id": "5.2.3",
            "text": "Provides guidance to new/less experienced teachers.",
            "evidence": "Meeting Minutes / Feedback",
            "levels": {
              "4": "Provides resources, lesson plans, and observation feedback to mentees.",
              "3": "Shares strategies and tips with new teachers.",
              "2": "Interactions with new teachers are minimal.",
              "1": "Criticizes new teachers without offering support."
            }
          },
          {
            "id": "5.2.4",
            "text": "Takes leadership in projects and contributes to school development.",
            "evidence": "Meeting Minutes / Feedback",
            "levels": {
              "4": "Drives school development projects; seeks grants or external opportunities.",
              "3": "Contributes ideas and labor to school development projects.",
              "2": "Contribution is passive; waits to be told what to do.",
              "1": "Hinders development projects through inertia or negativity."
            }
          },
          {
            "id": "5.2.5",
            "text": "Serves as a contributing member of the school’s Professional Learning Community (PLC).",
            "evidence": "Meeting Minutes / Feedback",
            "levels": {
              "4": "Facilitates PLC discussions; ensures data drives the conversation.",
              "3": "Attends PLC prepared; shares data and student work.",
              "2": "Attendance is spotty or comes unprepared.",
              "1": "Does not participate in the PLC culture."
            }
          }
        ]
      },
      {
        "name": "Community Engagement",
        "indicators": [
          {
            "id": "5.3.1",
            "text": "Builds positive relationships with parents/guardians via communication.",
            "evidence": "Comm. Log",
            "levels": {
              "4": "Parents view teacher as a partner; communication is frequent, positive, and solution-oriented.",
              "3": "Maintains regular, professional contact with parents regarding student progress.",
              "2": "Communication is mostly negative or reactive (only when problems arise).",
              "1": "Avoids parent communication or is hostile/confrontational."
            }
          },
          {
            "id": "5.3.2",
            "text": "Represents the school professionally at meetings, conferences, or external events.",
            "evidence": "Observation",
            "levels": {
              "4": "Ambassador for the school; articulates school vision clearly to the outside community.",
              "3": "Presents self professionally at all external events; follows protocols.",
              "2": "Appearance or behavior at external events is borderline unprofessional.",
              "1": "Damages school reputation through unprofessional behavior in public."
            }
          },
          {
            "id": "5.3.3",
            "text": "Builds relationships using LMS communication tools (portals, announcements).",
            "evidence": "Comm. Log",
            "levels": {
              "4": "LMS portal is a hub of community; parents engaged in dialogue.",
              "3": "Uses LMS to send newsletters, alerts, and student progress updates.",
              "2": "LMS communication is rare or one-way.",
              "1": "Fails to use digital tools; parents are uninformed."
            }
          }
        ]
      }
    ]
  },
  {
    "domain": "D6: Parent & Student Feedback",
    "weight": 10,
    "subdomains": [
      {
        "name": "Parent Communication",
        "indicators": [
          {
            "id": "6.1.1",
            "text": "Maintains regular, clear, and professional communication with parents.",
            "evidence": "Comm. Log",
            "levels": {
              "4": "Co-designs goals with parents; communication is personalized, culturally responsive, and proactive.",
              "3": "Regular updates provided (weekly/monthly); tone is professional and clear.",
              "2": "Communication is infrequent or unclear; language barriers not addressed.",
              "1": "Communication is nonexistent or unprofessional."
            }
          },
          {
            "id": "6.1.2",
            "text": "Resolves parent concerns promptly and effectively.",
            "evidence": "Comm. Log",
            "levels": {
              "4": "De-escalates conflict expertly; turns complaints into collaborative opportunities.",
              "3": "Addresses concerns within 24 hours; seeks solutions that benefit the student.",
              "2": "Responses are slow or defensive; concerns often re-occur.",
              "1": "Ignores parent concerns; creates adversarial relationships."
            }
          }
        ]
      },
      {
        "name": "Student Feedback",
        "indicators": [
          {
            "id": "6.2.1",
            "text": "Students report feeling supported, respected, and motivated.",
            "evidence": "Observation",
            "levels": {
              "4": "Students cite teacher as their favorite; feel genuinely cared for and pushed to excel.",
              "3": "Students generally report positive feelings and respect for the teacher.",
              "2": "Student feedback is mixed; some feel intimidated or ignored.",
              "1": "Student feedback is overwhelmingly negative regarding teacher demeanor."
            }
          },
          {
            "id": "6.2.2",
            "text": "Adapts teaching practices based on constructive student input.",
            "evidence": "Observation",
            "levels": {
              "4": "Solicits formal feedback regularly (surveys) and visibly changes methods based on student suggestions.",
              "3": "Listens to student concerns and makes reasonable adjustments to instruction.",
              "2": "Dismisses student feedback or explains it away without change.",
              "1": "Resistant to feedback; blames students for issues."
            }
          }
        ]
      }
    ]
  },
  {
    "domain": "D7: Professional Growth",
    "weight": 5,
    "subdomains": [
      {
        "name": "Professional Learning",
        "indicators": [
          {
            "id": "7.1.1",
            "text": "Actively participates in PD opportunities.",
            "evidence": "Observation",
            "levels": {
              "4": "Seeks out external PD; brings back knowledge to train the whole staff.",
              "3": "Attends all scheduled PD with an open mind and engaged attitude.",
              "2": "Attendance is mandatory only; often distracted or disengaged during PD.",
              "1": "Refuses to attend or disrupts PD sessions."
            }
          },
          {
            "id": "7.1.2",
            "text": "Applies new knowledge and strategies to improve teaching practices.",
            "evidence": "Observation",
            "levels": {
              "4": "Rapid prototyper; tries new strategies immediately, refines them, and shares results.",
              "3": "Implements new strategies learned in PD into classroom practice.",
              "2": "PD learning stays in the notebook; no application in the classroom.",
              "1": "Resists new strategies; claims 'we've always done it this way.'"
            }
          },
          {
            "id": "7.1.3",
            "text": "Seeks training on diversity, cultural inclusivity, and responsive teaching.",
            "evidence": "Observation",
            "levels": {
              "4": "Expert in culturally responsive teaching; leads equity initiatives.",
              "3": "Actively attends workshops on diversity and applies inclusive strategies.",
              "2": "Unaware of cultural biases; does not seek training in this area.",
              "1": "Demonstrates prejudice or refuses inclusive practices."
            }
          }
        ]
      },
      {
        "name": "Self-Reflection",
        "indicators": [
          {
            "id": "7.2.1",
            "text": "Regularly reflects on teaching practices to identify strengths/areas for growth.",
            "evidence": "Observation",
            "levels": {
              "4": "Maintains a reflective journal/blog; engages in action research.",
              "3": "Completes self-evaluations honestly and identifies specific steps for improvement.",
              "2": "Reflection is generic ('I need to manage time better') without specific action.",
              "1": "Cannot identify areas for growth; claims perfection."
            }
          },
          {
            "id": "7.2.2",
            "text": "Sets measurable professional goals and works towards achieving them.",
            "evidence": "Observation",
            "levels": {
              "4": "Exceeds ambitious goals early; sets new ones to continue growth trajectory.",
              "3": "Sets SMART goals at the start of the year and achieves them by year-end.",
              "2": "Goals are vague or not monitored; progress is unknown.",
              "1": "No professional goals are set."
            }
          },
          {
            "id": "7.2.3",
            "text": "Identifies personal strengths/weaknesses and sets goals for improvement.",
            "evidence": "Observation",
            "levels": {
              "4": "Seeks 360-degree feedback (admin, peers, students) to inform self-assessment.",
              "3": "Accurate self-assessment; leverages strengths and mitigates weaknesses.",
              "2": "Overestimates abilities; blind to clear weaknesses.",
              "1": "Lack of self-awareness; unaware of negative impact on others."
            }
          }
        ]
      },
      {
        "name": "Leadership Development",
        "indicators": [
          {
            "id": "7.3.1",
            "text": "Pursues opportunities to take on leadership roles within the school or department.",
            "evidence": "Observation",
            "levels": {
              "4": "Leads departments, grade levels, or administrative initiatives effectively.",
              "3": "Steps up to lead specific projects or committees when asked.",
              "2": "Avoids leadership roles; prefers to stay in the background.",
              "1": "Undermines current leadership."
            }
          },
          {
            "id": "7.3.2",
            "text": "Contributes to the school’s strategic planning or quality assurance processes.",
            "evidence": "Meeting Minutes",
            "levels": {
              "4": "Member of the strategic team; key architect of school improvement plans.",
              "3": "Participates in surveys and focus groups for school improvement.",
              "2": "Disengaged from the school's strategic vision.",
              "1": "Critical of the school's direction without offering constructive solutions."
            }
          },
          {
            "id": "7.3.3",
            "text": "Engages in activities outside the classroom for school/student enhancement.",
            "evidence": "Observation",
            "levels": {
              "4": "Highly visible at all school events; organizes community-building activities.",
              "3": "Regularly participates in non-classroom activities (socials, beautification, etc.).",
              "2": "Rarely seen outside the classroom setting.",
              "1": "Leaves campus immediately after contract hours; avoids school community."
            }
          }
        ]
      }
    ]
  }
];
