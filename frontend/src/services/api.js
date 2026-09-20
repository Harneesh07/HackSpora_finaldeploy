const API_BASE_URL = 'http://localhost:8000/api';

export const fetchDemoResume = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/resume/demo`);
    if (!res.ok) throw new Error('API server returned error');
    const data = await res.json();
    return data.candidate;
  } catch (err) {
    console.warn('Backend API offline, using client fallback demo profile:', err);
    return getFallbackDemoCandidate();
  }
};

export const uploadResumeFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${API_BASE_URL}/resume/upload`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.detail || 'Upload failed');
    }
    const data = await res.json();
    return data.candidate;
  } catch (err) {
    console.error('Resume upload error:', err);
    throw err;
  }
};

export const uploadResumeText = async (text) => {
  try {
    const res = await fetch(`${API_BASE_URL}/resume/parse-text`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.detail || 'Text parsing failed');
    }
    const data = await res.json();
    return data.candidate;
  } catch (err) {
    console.error('Resume text parse error:', err);
    throw err;
  }
};


export const searchLiveJobs = async (queryPayload) => {
  try {
    const res = await fetch(`${API_BASE_URL}/jobs/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(queryPayload),
    });
    if (!res.ok) throw new Error('Failed to search jobs');
    return await res.json();
  } catch (err) {
    console.warn('Job search fallback:', err);
    return getFallbackJobResults(queryPayload.location);
  }
};

export const fetchMarketAnalysis = async (candidateSkills, location = 'Coimbatore, Tamil Nadu, India') => {
  try {
    const res = await fetch(`${API_BASE_URL}/analysis/market-match`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ candidate_skills: candidateSkills, location, distance_km: 100 }),
    });
    if (!res.ok) throw new Error('Failed to run market analysis');
    return await res.json();
  } catch (err) {
    console.warn('Market analysis fallback:', err);
    return getFallbackAnalysisResults(candidateSkills);
  }
};

export const analyzeJobDescription = async (jobDescriptionText, candidateSkills) => {
  try {
    const res = await fetch(`${API_BASE_URL}/analysis/jd-analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ job_description: jobDescriptionText, candidate_skills: candidateSkills }),
    });
    if (!res.ok) throw new Error('Failed to analyze JD');
    return await res.json();
  } catch (err) {
    console.error('JD analysis error:', err);
    throw err;
  }
};

// Client Fallbacks in case API server is unreachable
function getFallbackDemoCandidate() {
  return {
    name: "Alex Chen",
    email: "alex.chen@devmail.com",
    phone: "+91 98765 43210",
    location: "Coimbatore, Tamil Nadu, India",
    education: [
      {
        degree: "B.Tech in Computer Science & Engineering",
        institution: "PSG College of Technology",
        year: "2024",
        field_of_study: "Computer Science"
      }
    ],
    experience: [
      {
        title: "Full Stack Developer Intern",
        company: "Apex Cloud Systems",
        duration: "2023 - 2024 (1 year)",
        description: "Engineered responsive web applications using React, TypeScript, Node.js, and PostgreSQL."
      }
    ],
    projects: [
      {
        name: "Cloud Market Analytics Platform",
        description: "Built interactive dashboard with React, Tailwind CSS, Python FastAPI, and PostgreSQL.",
        technologies: ["React", "Python", "FastAPI", "PostgreSQL", "JavaScript", "SQL"]
      }
    ],
    certifications: [
      "AWS Certified Cloud Practitioner",
      "Full Stack Web Development - Meta Certified"
    ],
    skills: [
      { name: "JavaScript", category: "Programming", evidence: "Strong" },
      { name: "Python", category: "Programming", evidence: "Strong" },
      { name: "TypeScript", category: "Programming", evidence: "Moderate" },
      { name: "React", category: "Frontend", evidence: "Strong" },
      { name: "HTML", category: "Frontend", evidence: "Strong" },
      { name: "CSS", category: "Frontend", evidence: "Strong" },
      { name: "Tailwind CSS", category: "Frontend", evidence: "Strong" },
      { name: "Node.js", category: "Backend", evidence: "Strong" },
      { name: "Express", category: "Backend", evidence: "Strong" },
      { name: "FastAPI", category: "Backend", evidence: "Strong" },
      { name: "REST API", category: "Backend", evidence: "Strong" },
      { name: "SQL", category: "Database", evidence: "Strong" },
      { name: "PostgreSQL", category: "Database", evidence: "Strong" },
      { name: "MySQL", category: "Database", evidence: "Moderate" },
      { name: "Redis", category: "Database", evidence: "Moderate" },
      { name: "Git", category: "Tools", evidence: "Strong" },
      { name: "GitHub", category: "Tools", evidence: "Strong" },
      { name: "Postman", category: "Tools", evidence: "Strong" }
    ],
    detected_roles: ["Full Stack Developer", "Frontend Developer", "Backend Engineer", "Python Developer"],
    ai_summary: "Full-stack developer with 18 detected core skills across React, Node.js, Python, and SQL databases. Strong experience designing scalable web apps and REST microservices.",
    resume_score: 82,
    score_breakdown: {
      impact_score: 82,
      brevity_score: 88,
      skills_coverage: 90,
      formatting_score: 85
    },
    role_recommendations: [
      {
        role: "Full Stack Developer",
        alignment_percentage: 92,
        matched_skills: ["React", "JavaScript", "Node.js", "SQL", "TypeScript", "PostgreSQL"],
        missing_skills: ["Docker", "AWS"],
        explanation: "Strong alignment with frontend, backend, and relational database requirements. Adding Docker containerization increases match."
      },
      {
        role: "Frontend Developer",
        alignment_percentage: 88,
        matched_skills: ["React", "JavaScript", "HTML", "CSS", "TypeScript", "Tailwind CSS"],
        missing_skills: ["Next.js", "Redux"],
        explanation: "Excellent proficiency in React core ecosystem and UI styling frameworks."
      },
      {
        role: "Backend Engineer",
        alignment_percentage: 84,
        matched_skills: ["Python", "Node.js", "SQL", "REST API", "FastAPI", "PostgreSQL"],
        missing_skills: ["Docker", "Redis", "Microservices"],
        explanation: "Robust REST API and database modeling foundation with FastAPI and Node.js."
      }
    ]
  };
}

export function getFallbackJobResults(location = "Coimbatore, Tamil Nadu") {
  const jobs = [
    // --- LINKEDIN JOBS (12) ---
    {
      job: {
        id: "li-101",
        source: "LinkedIn",
        title: "Full Stack Developer",
        company: "Apex Cloud Systems",
        location: location,
        work_mode: "Hybrid",
        experience: "1-3 Years",
        description: "Looking for a Full Stack Developer proficient in React, JavaScript, Node.js, and SQL databases. Responsible for building user features, REST endpoints, and automated tests. Docker and AWS experience is a plus.",
        posted_at: "1 day ago",
        required_skills: ["React", "JavaScript", "Node.js", "SQL"],
        preferred_skills: ["Docker", "AWS", "TypeScript"],
        apply_url: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent("Full Stack Developer Apex Cloud Systems")}&location=${encodeURIComponent(location)}`,
        distance_km: 18.0
      },
      match_score: 91,
      match_category: "Best",
      matched_skills: ["React", "JavaScript", "Node.js", "SQL"],
      missing_skills: ["Docker", "AWS"],
      match_reason: "Matches 4 required skills. Docker is a key preferred technology."
    },
    {
      job: {
        id: "li-102",
        source: "LinkedIn",
        title: "Senior Frontend Engineer",
        company: "Cognizant Technology Solutions",
        location: location,
        work_mode: "On-site",
        experience: "3-6 Years",
        description: "Building high performance React and TypeScript applications. Strong understanding of state management, Redux, responsive design, and modern CSS frameworks.",
        posted_at: "2 days ago",
        required_skills: ["React", "TypeScript", "JavaScript", "HTML", "CSS"],
        preferred_skills: ["Redux", "Tailwind CSS", "Next.js"],
        apply_url: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent("Frontend Engineer Cognizant")}&location=${encodeURIComponent(location)}`,
        distance_km: 12.5
      },
      match_score: 88,
      match_category: "Best",
      matched_skills: ["React", "TypeScript", "JavaScript", "HTML", "CSS"],
      missing_skills: ["Redux"],
      match_reason: "Strong frontend alignment with React and TypeScript."
    },
    {
      job: {
        id: "li-103",
        source: "LinkedIn",
        title: "Python Backend Engineer",
        company: "Zeta Tech Labs",
        location: "Bengaluru, Karnataka",
        work_mode: "Remote",
        experience: "2-4 Years",
        description: "Seeking Python Backend Engineer with FastAPI or Django experience, PostgreSQL data modeling, Redis caching, and RESTful API architecture.",
        posted_at: "3 days ago",
        required_skills: ["Python", "FastAPI", "PostgreSQL", "REST API"],
        preferred_skills: ["Docker", "Redis", "Git"],
        apply_url: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent("Python Backend Engineer Zeta Tech Labs")}&location=Bengaluru`,
        distance_km: 310.0
      },
      match_score: 85,
      match_category: "Best",
      matched_skills: ["Python", "FastAPI", "PostgreSQL", "REST API", "Git", "Redis"],
      missing_skills: ["Docker"],
      match_reason: "Strong backend alignment with Python microservices."
    },
    {
      job: {
        id: "li-104",
        source: "LinkedIn",
        title: "MERN Stack Developer",
        company: "Payoda Tech Solutions",
        location: location,
        work_mode: "Hybrid",
        experience: "1-4 Years",
        description: "Requires React, Node.js, Express, MongoDB/SQL skills. Design web portals, integrate backend APIs, and configure GitHub Actions CI/CD pipelines.",
        posted_at: "Just now",
        required_skills: ["React", "Node.js", "Express", "JavaScript", "SQL"],
        preferred_skills: ["Docker", "TypeScript", "CI/CD"],
        apply_url: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent("MERN Stack Developer Payoda")}&location=${encodeURIComponent(location)}`,
        distance_km: 15.0
      },
      match_score: 84,
      match_category: "Best",
      matched_skills: ["React", "Node.js", "Express", "JavaScript", "SQL"],
      missing_skills: ["Docker", "TypeScript"],
      match_reason: "High MERN web stack candidate compatibility."
    },
    {
      job: {
        id: "li-105",
        source: "LinkedIn",
        title: "Cloud DevOps Engineer",
        company: "Infosys Technologies",
        location: location,
        work_mode: "Hybrid",
        experience: "2-5 Years",
        description: "DevOps practitioner managing Docker containers, Kubernetes deployment manifests, AWS EC2/S3 infrastructure, and automated Terraform deployments.",
        posted_at: "4 days ago",
        required_skills: ["Docker", "AWS", "Linux", "Git"],
        preferred_skills: ["Kubernetes", "Python", "Terraform"],
        apply_url: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent("DevOps Engineer Infosys")}&location=${encodeURIComponent(location)}`,
        distance_km: 20.0
      },
      match_score: 72,
      match_category: "Potential",
      matched_skills: ["Git", "Python"],
      missing_skills: ["Docker", "AWS", "Linux"],
      match_reason: "DevOps focused role requiring containerization skills."
    },
    {
      job: {
        id: "li-106",
        source: "LinkedIn",
        title: "React Native Mobile Developer",
        company: "Thoughtworks",
        location: "Chennai, Tamil Nadu",
        work_mode: "Remote",
        experience: "2-4 Years",
        description: "Develop cross-platform iOS and Android mobile apps using React Native, TypeScript, and Redux Toolkit. Collaborate with design and backend teams.",
        posted_at: "1 day ago",
        required_skills: ["React", "JavaScript", "TypeScript"],
        preferred_skills: ["Redux", "REST API", "Git"],
        apply_url: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent("React Native Thoughtworks")}&location=Chennai`,
        distance_km: 480.0
      },
      match_score: 80,
      match_category: "Strong",
      matched_skills: ["React", "JavaScript", "TypeScript", "REST API", "Git"],
      missing_skills: ["Redux"],
      match_reason: "Solid mobile UI engineering alignment."
    },
    {
      job: {
        id: "li-107",
        source: "LinkedIn",
        title: "Junior Web Applications Developer",
        company: "Kovai Systems",
        location: location,
        work_mode: "On-site",
        experience: "0-2 Years",
        description: "Great entry-level role for developers proficient in HTML, CSS, JavaScript, React, and SQL database queries. Mentorship provided.",
        posted_at: "Today",
        required_skills: ["HTML", "CSS", "JavaScript", "SQL"],
        preferred_skills: ["React", "Git"],
        apply_url: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent("Junior Web Developer Kovai")}&location=${encodeURIComponent(location)}`,
        distance_km: 8.0
      },
      match_score: 93,
      match_category: "Best",
      matched_skills: ["HTML", "CSS", "JavaScript", "SQL", "React", "Git"],
      missing_skills: [],
      match_reason: "100% skill match for entry level position."
    },
    {
      job: {
        id: "li-108",
        source: "LinkedIn",
        title: "Backend Microservices Architect",
        company: "Razorpay",
        location: "Bengaluru, Karnataka",
        work_mode: "Hybrid",
        experience: "4-8 Years",
        description: "Architect high throughput payment microservices using Python, Go, PostgreSQL, Redis, Kafka, and Docker on AWS cloud.",
        posted_at: "5 days ago",
        required_skills: ["Python", "SQL", "PostgreSQL", "REST API"],
        preferred_skills: ["Docker", "Redis", "AWS"],
        apply_url: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent("Backend Microservices Razorpay")}&location=Bengaluru`,
        distance_km: 310.0
      },
      match_score: 79,
      match_category: "Strong",
      matched_skills: ["Python", "SQL", "PostgreSQL", "REST API", "Redis"],
      missing_skills: ["Docker", "AWS"],
      match_reason: "High scale backend architecture position."
    },
    {
      job: {
        id: "li-109",
        source: "LinkedIn",
        title: "UI/UX Frontend Engineer",
        company: "Freshworks",
        location: "Chennai, Tamil Nadu",
        work_mode: "Hybrid",
        experience: "2-4 Years",
        description: "Implement modern UI components in React and TypeScript with Tailwind CSS. Ensure high accessibility, speed, and smooth user interactions.",
        posted_at: "2 days ago",
        required_skills: ["React", "TypeScript", "Tailwind CSS", "HTML", "CSS"],
        preferred_skills: ["JavaScript", "Git"],
        apply_url: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent("Frontend Engineer Freshworks")}&location=Chennai`,
        distance_km: 480.0
      },
      match_score: 90,
      match_category: "Best",
      matched_skills: ["React", "TypeScript", "Tailwind CSS", "HTML", "CSS", "JavaScript", "Git"],
      missing_skills: [],
      match_reason: "Matches all requested UI technologies."
    },
    {
      job: {
        id: "li-110",
        source: "LinkedIn",
        title: "Data Engineer - Python & SQL",
        company: "Mu Sigma",
        location: "Bengaluru, Karnataka",
        work_mode: "On-site",
        experience: "1-3 Years",
        description: "Build automated ETL data pipelines using Python, Pandas, SQL, and PostgreSQL. Maintain analytics dashboards and data warehouse schemas.",
        posted_at: "3 days ago",
        required_skills: ["Python", "SQL", "PostgreSQL"],
        preferred_skills: ["AWS", "Docker"],
        apply_url: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent("Data Engineer Mu Sigma")}&location=Bengaluru`,
        distance_km: 310.0
      },
      match_score: 82,
      match_category: "Strong",
      matched_skills: ["Python", "SQL", "PostgreSQL"],
      missing_skills: ["AWS", "Docker"],
      match_reason: "Core Python & SQL data engineering position."
    },
    {
      job: {
        id: "li-111",
        source: "LinkedIn",
        title: "Software Engineer II - React/Node",
        company: "Swiggy",
        location: "Bengaluru, Karnataka",
        work_mode: "Hybrid",
        experience: "2-5 Years",
        description: "Engineering customer-facing Web UI and backend Node.js microservices. Optimize web app performance and RESTful endpoints.",
        posted_at: "1 day ago",
        required_skills: ["React", "Node.js", "JavaScript", "SQL"],
        preferred_skills: ["Redis", "TypeScript", "AWS"],
        apply_url: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent("Software Engineer Swiggy")}&location=Bengaluru`,
        distance_km: 310.0
      },
      match_score: 87,
      match_category: "Best",
      matched_skills: ["React", "Node.js", "JavaScript", "SQL", "Redis", "TypeScript"],
      missing_skills: ["AWS"],
      match_reason: "High scale consumer web application development."
    },
    {
      job: {
        id: "li-112",
        source: "LinkedIn",
        title: "Full Stack Engineer - Cloud Solutions",
        company: "Zoho Corporation",
        location: location,
        work_mode: "On-site",
        experience: "1-4 Years",
        description: "Join Zoho cloud application team to build robust SaaS web applications in React, Node.js, and relational database systems.",
        posted_at: "Today",
        required_skills: ["React", "Node.js", "JavaScript", "SQL", "HTML"],
        preferred_skills: ["PostgreSQL", "Git", "REST API"],
        apply_url: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent("Full Stack Zoho")}&location=${encodeURIComponent(location)}`,
        distance_km: 10.0
      },
      match_score: 92,
      match_category: "Best",
      matched_skills: ["React", "Node.js", "JavaScript", "SQL", "HTML", "PostgreSQL", "Git", "REST API"],
      missing_skills: [],
      match_reason: "Perfect alignment with Zoho SaaS product tech stack."
    },

    // --- INDEED JOBS (11) ---
    {
      job: {
        id: "ind-201",
        source: "Indeed",
        title: "Software Engineer - Full Stack",
        company: "Kovai.co",
        location: location,
        work_mode: "On-site",
        experience: "1-3 Years",
        description: "Looking for passionate software engineers with React, Node.js, and SQL proficiency. Build scalable web applications, API services, and maintain database schemas. Experience in Docker and Azure is preferred.",
        posted_at: "1 day ago",
        required_skills: ["React", "Node.js", "JavaScript", "SQL"],
        preferred_skills: ["Docker", "Azure", "Git"],
        apply_url: `https://in.indeed.com/jobs?q=${encodeURIComponent("Software Engineer Kovai.co")}&l=${encodeURIComponent(location)}`,
        distance_km: 14.2
      },
      match_score: 87,
      match_category: "Best",
      matched_skills: ["React", "Node.js", "JavaScript", "SQL", "Git"],
      missing_skills: ["Docker", "Azure"],
      match_reason: "High alignment with required frontend and backend web stack."
    },
    {
      job: {
        id: "ind-202",
        source: "Indeed",
        title: "Python Web Developer",
        company: "Soliton Technologies",
        location: location,
        work_mode: "Hybrid",
        experience: "2-4 Years",
        description: "Develop automated testing tools, web microservices, and backend APIs using Python, FastAPI/Django, and SQL database systems.",
        posted_at: "4 days ago",
        required_skills: ["Python", "FastAPI", "SQL", "REST API"],
        preferred_skills: ["Git", "PostgreSQL", "Docker"],
        apply_url: `https://in.indeed.com/jobs?q=${encodeURIComponent("Python Developer Soliton Technologies")}&l=${encodeURIComponent(location)}`,
        distance_km: 11.0
      },
      match_score: 86,
      match_category: "Best",
      matched_skills: ["Python", "FastAPI", "SQL", "REST API", "Git", "PostgreSQL"],
      missing_skills: ["Docker"],
      match_reason: "Excellent Python backend engineer match."
    },
    {
      job: {
        id: "ind-203",
        source: "Indeed",
        title: "React Frontend Developer",
        company: "Bosch Global Software",
        location: location,
        work_mode: "Hybrid",
        experience: "2-5 Years",
        description: "React.js frontend engineer needed to design responsive user dashboards with TypeScript, Redux, and modern CSS modules.",
        posted_at: "2 days ago",
        required_skills: ["React", "JavaScript", "TypeScript", "HTML", "CSS"],
        preferred_skills: ["Redux", "Jest", "Git"],
        apply_url: `https://in.indeed.com/jobs?q=${encodeURIComponent("React Frontend Developer Bosch")}&l=${encodeURIComponent(location)}`,
        distance_km: 19.5
      },
      match_score: 89,
      match_category: "Best",
      matched_skills: ["React", "JavaScript", "TypeScript", "HTML", "CSS", "Git"],
      missing_skills: ["Redux"],
      match_reason: "Strong frontend single-page app specialization."
    },
    {
      job: {
        id: "ind-204",
        source: "Indeed",
        title: "Full Stack API Engineer",
        company: "Speridian Technologies",
        location: location,
        work_mode: "Hybrid",
        experience: "1-4 Years",
        description: "Engineers required to build Node.js and Python microservices, SQL databases, and React admin portals. Cloud deployment knowledge helpful.",
        posted_at: "3 days ago",
        required_skills: ["Node.js", "React", "Python", "SQL"],
        preferred_skills: ["FastAPI", "Docker", "Git"],
        apply_url: `https://in.indeed.com/jobs?q=${encodeURIComponent("Full Stack Speridian Technologies")}&l=${encodeURIComponent(location)}`,
        distance_km: 16.0
      },
      match_score: 88,
      match_category: "Best",
      matched_skills: ["Node.js", "React", "Python", "SQL", "FastAPI", "Git"],
      missing_skills: ["Docker"],
      match_reason: "Covers both Node.js and Python backend microservices."
    },
    {
      job: {
        id: "ind-205",
        source: "Indeed",
        title: "Junior Python Developer",
        company: "KGisl Micro Systems",
        location: location,
        work_mode: "On-site",
        experience: "0-2 Years",
        description: "Entry-level Python programmer position for developing script automation, REST API endpoints, and SQL database operations.",
        posted_at: "Today",
        required_skills: ["Python", "SQL", "REST API"],
        preferred_skills: ["FastAPI", "Git"],
        apply_url: `https://in.indeed.com/jobs?q=${encodeURIComponent("Junior Python Developer KGisl")}&l=${encodeURIComponent(location)}`,
        distance_km: 7.5
      },
      match_score: 94,
      match_category: "Best",
      matched_skills: ["Python", "SQL", "REST API", "FastAPI", "Git"],
      missing_skills: [],
      match_reason: "100% matched candidate skills for junior role."
    },
    {
      job: {
        id: "ind-206",
        source: "Indeed",
        title: "DevOps & Cloud Administrator",
        company: "Mindtree LTIMindtree",
        location: "Bengaluru, Karnataka",
        work_mode: "Hybrid",
        experience: "3-6 Years",
        description: "Provision and manage AWS cloud resources, Docker container pipelines, Kubernetes clusters, and automated monitoring dashboards.",
        posted_at: "5 days ago",
        required_skills: ["Docker", "AWS", "Linux"],
        preferred_skills: ["Kubernetes", "Python", "CI/CD"],
        apply_url: `https://in.indeed.com/jobs?q=${encodeURIComponent("DevOps Engineer Mindtree")}&l=Bengaluru`,
        distance_km: 310.0
      },
      match_score: 70,
      match_category: "Potential",
      matched_skills: ["Python"],
      missing_skills: ["Docker", "AWS", "Linux"],
      match_reason: "Infrastructure management focus."
    },
    {
      job: {
        id: "ind-207",
        source: "Indeed",
        title: "Full Stack Engineer - Node & React",
        company: "Capgemini",
        location: "Chennai, Tamil Nadu",
        work_mode: "Hybrid",
        experience: "2-4 Years",
        description: "Develop client Web interfaces and backend server applications using React, Express, Node.js, and PostgreSQL.",
        posted_at: "2 days ago",
        required_skills: ["React", "Node.js", "JavaScript", "SQL", "PostgreSQL"],
        preferred_skills: ["Docker", "Git"],
        apply_url: `https://in.indeed.com/jobs?q=${encodeURIComponent("Full Stack Engineer Capgemini")}&l=Chennai`,
        distance_km: 480.0
      },
      match_score: 86,
      match_category: "Best",
      matched_skills: ["React", "Node.js", "JavaScript", "SQL", "PostgreSQL", "Git"],
      missing_skills: ["Docker"],
      match_reason: "High PERN full stack compatibility."
    },
    {
      job: {
        id: "ind-208",
        source: "Indeed",
        title: "Database Developer & Administrator",
        company: "HCLTech",
        location: location,
        work_mode: "On-site",
        experience: "2-5 Years",
        description: "Database specialist responsible for designing relational tables, writing raw SQL queries, stored procedures, and PostgreSQL performance tuning.",
        posted_at: "3 days ago",
        required_skills: ["SQL", "PostgreSQL", "MySQL"],
        preferred_skills: ["Python", "Redis", "Git"],
        apply_url: `https://in.indeed.com/jobs?q=${encodeURIComponent("Database Developer HCLTech")}&l=${encodeURIComponent(location)}`,
        distance_km: 13.0
      },
      match_score: 83,
      match_category: "Strong",
      matched_skills: ["SQL", "PostgreSQL", "MySQL", "Python", "Redis", "Git"],
      missing_skills: [],
      match_reason: "Complete relational database mastery match."
    },
    {
      job: {
        id: "ind-209",
        source: "Indeed",
        title: "UI Engineer - React & Web Standards",
        company: "Suki.ai",
        location: "Bengaluru, Karnataka",
        work_mode: "Remote",
        experience: "2-4 Years",
        description: "Craft intuitive digital user interfaces with React, TypeScript, and modern CSS modules. Collaborate closely with AI/ML product engineers.",
        posted_at: "1 day ago",
        required_skills: ["React", "TypeScript", "JavaScript", "HTML", "CSS"],
        preferred_skills: ["Tailwind CSS", "Redux"],
        apply_url: `https://in.indeed.com/jobs?q=${encodeURIComponent("UI Engineer Suki.ai")}&l=Bengaluru`,
        distance_km: 310.0
      },
      match_score: 91,
      match_category: "Best",
      matched_skills: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
      missing_skills: [],
      match_reason: "High UI performance engineering match."
    },
    {
      job: {
        id: "ind-210",
        source: "Indeed",
        title: "Python Backend & API Specialist",
        company: "Ola Electric",
        location: "Bengaluru, Karnataka",
        work_mode: "On-site",
        experience: "3-5 Years",
        description: "Engineers required to build high-scale IoT and backend APIs in Python, FastAPI, PostgreSQL, Redis, and Docker on AWS infrastructure.",
        posted_at: "Just now",
        required_skills: ["Python", "FastAPI", "SQL", "REST API"],
        preferred_skills: ["Redis", "Docker", "AWS"],
        apply_url: `https://in.indeed.com/jobs?q=${encodeURIComponent("Python Developer Ola Electric")}&l=Bengaluru`,
        distance_km: 310.0
      },
      match_score: 84,
      match_category: "Best",
      matched_skills: ["Python", "FastAPI", "SQL", "REST API", "Redis"],
      missing_skills: ["Docker", "AWS"],
      match_reason: "High throughput backend API engineering position."
    },
    {
      job: {
        id: "ind-211",
        source: "Indeed",
        title: "Full Stack Application Developer",
        company: "Aspire Systems",
        location: location,
        work_mode: "Hybrid",
        experience: "1-3 Years",
        description: "Develop full-stack web applications using React, Node.js, Express, and SQL databases. Continuous integration and testing.",
        posted_at: "Today",
        required_skills: ["React", "Node.js", "JavaScript", "SQL"],
        preferred_skills: ["TypeScript", "Git"],
        apply_url: `https://in.indeed.com/jobs?q=${encodeURIComponent("Full Stack Aspire Systems")}&l=${encodeURIComponent(location)}`,
        distance_km: 9.0
      },
      match_score: 88,
      match_category: "Best",
      matched_skills: ["React", "Node.js", "JavaScript", "SQL", "TypeScript", "Git"],
      missing_skills: [],
      match_reason: "Comprehensive full stack web match."
    },

  ];

  return {
    total_listings: 100,
    platform_counts: { LinkedIn: 42, Indeed: 31 },
    search_location: location,
    distance_km: 100,
    ranked_jobs: jobs,
    categories: {
      best: jobs.filter(j => j.match_category === "Best"),
      strong: jobs.filter(j => j.match_category === "Strong"),
      potential: [],
      skill_building: []
    }
  };
}

function getFallbackAnalysisResults(candidateSkills) {
  const fallbackJobData = getFallbackJobResults();
  return {
    ranked_jobs: fallbackJobData.ranked_jobs,
    total_listings: fallbackJobData.total_listings,
    platform_counts: fallbackJobData.platform_counts,
    skill_frequencies: [
      { skill: "JavaScript", count: 87, total_jobs: 100, frequency_pct: 87.0, demand_level: "HIGH", platform_breakdown: { LinkedIn: 88, Indeed: 85, Overall: 87 } },
      { skill: "React", count: 74, total_jobs: 100, frequency_pct: 74.0, demand_level: "HIGH", platform_breakdown: { LinkedIn: 76, Indeed: 71, Overall: 74 } },
      { skill: "SQL", count: 65, total_jobs: 100, frequency_pct: 65.0, demand_level: "HIGH", platform_breakdown: { LinkedIn: 64, Indeed: 66, Overall: 65 } },
      { skill: "TypeScript", count: 58, total_jobs: 100, frequency_pct: 58.0, demand_level: "MEDIUM", platform_breakdown: { LinkedIn: 61, Indeed: 55, Overall: 58 } },
      { skill: "Docker", count: 47, total_jobs: 100, frequency_pct: 47.0, demand_level: "MEDIUM", platform_breakdown: { LinkedIn: 42, Indeed: 51, Overall: 47 } },
      { skill: "AWS", count: 41, total_jobs: 100, frequency_pct: 41.0, demand_level: "MEDIUM", platform_breakdown: { LinkedIn: 45, Indeed: 38, Overall: 41 } }
    ],
    comparison_table: [
      { skill: "React", resume_status: "Strong", market_demand_pct: 74.0, gap_level: "Low" },
      { skill: "JavaScript", resume_status: "Strong", market_demand_pct: 87.0, gap_level: "Low" },
      { skill: "Docker", resume_status: "Missing", market_demand_pct: 47.0, gap_level: "Medium" },
      { skill: "AWS", resume_status: "Missing", market_demand_pct: 41.0, gap_level: "Medium" },
      { skill: "TypeScript", resume_status: "Missing", market_demand_pct: 58.0, gap_level: "High" }
    ],
    skill_gaps: [
      { skill: "Docker", market_demand_pct: 47.0, candidate_evidence: "Not detected", role_importance: "Medium", learning_priority: "High", reason: "Docker appears in 47% of analyzed market job postings." },
      { skill: "AWS", market_demand_pct: 41.0, candidate_evidence: "Not detected", role_importance: "Medium", learning_priority: "High", reason: "AWS appears in 41% of current cloud engineering roles." }
    ],
    one_skill_away: {
      has_opportunity: true,
      role: "Full Stack Developer",
      company: "Apex Cloud Systems",
      match_score: 91,
      matched_skills: ["React", "JavaScript", "Node.js", "SQL"],
      missing_skill: "Docker",
      market_demand_pct: 47.0,
      apply_url: "https://www.linkedin.com/jobs/search/?keywords=Full+Stack+Developer+Apex+Cloud+Systems",
      source: "LinkedIn",
      recommendation: "Docker appears in 47% of current relevant postings. Adding containerization experience unlocks top-tier roles."
    },
    learning_roadmap: [
      {
        skill: "Docker",
        priority: "High",
        market_demand_pct: 47.0,
        recommendation: "Learn Docker fundamentals and containerize one app.",
        estimated_hours: 12,
        suggested_project: "Containerize a full-stack React + Node.js application using Docker Compose.",
        platforms: [
          { name: "Infosys Springboard", description: "Infosys Springboard official course catalog for Docker.", url: "https://www.google.com/search?q=site%3Ainfyspringboard.onwingspan.com+Docker+course", has_certificate: true, certificate_label: "Earn Certificate (Free)", certificate_note: "Has Certificate", type: "Enterprise Course" },
          { name: "Cisco Networking Academy", description: "Cisco Networking Academy specialized courses for Docker.", url: "https://www.google.com/search?q=site%3Anetacad.com+Docker+course", has_certificate: true, certificate_label: "Earn Certificate (Free)", certificate_note: "Has Certificate", type: "Guided Track" },
          { name: "Coursera Professional Certifications", description: "Top university specialization for Docker.", url: "https://www.coursera.org/search?query=Docker", has_certificate: true, certificate_label: "Earn Certificate", certificate_note: "Has Certificate", type: "Professional Certificate" },
          { name: "YouTube Full Workshop Video", description: "Free comprehensive video playlist for Docker.", url: "https://www.youtube.com/results?search_query=Docker+full+course+beginners+tutorial", has_certificate: false, certificate_label: "No Certificate", certificate_note: "You won't earn a certificate for this", type: "Video Playlist" }
        ],
        completion_roadmap: [
          { step_number: 1, title: "Core Fundamentals & Concept Mastery", estimated_hours: 4, description: "Learn syntax, primitive types, key architecture rules, and foundational patterns of Docker." },
          { step_number: 2, title: "Hands-on Project Implementation", estimated_hours: 6, description: "Build: Containerize a full-stack React + Node.js application using Docker Compose." },
          { step_number: 3, title: "Platform Verification & Assessment", estimated_hours: 2, description: "Complete platform assessment quiz on Infosys Springboard, Cisco Academy, or Coursera." },
          { step_number: 4, title: "Resume & Market Vector Integration", estimated_hours: 1, description: "Add Docker project repository link and evidence bullet points to your candidate profile." }
        ]
      },
      {
        skill: "AWS",
        priority: "High",
        market_demand_pct: 41.0,
        recommendation: "Deploy a project to AWS EC2 or Lambda.",
        estimated_hours: 15,
        suggested_project: "Deploy a serverless Python FastAPI app on AWS with S3 storage.",
        platforms: [
          { name: "Infosys Springboard", description: "Infosys Springboard official course catalog for AWS.", url: "https://www.google.com/search?q=site%3Ainfyspringboard.onwingspan.com+AWS+course", has_certificate: true, certificate_label: "Earn Certificate (Free)", certificate_note: "Has Certificate", type: "Enterprise Course" },
          { name: "Cisco Networking Academy", description: "Cisco Networking Academy specialized courses for AWS.", url: "https://www.google.com/search?q=site%3Anetacad.com+AWS+course", has_certificate: true, certificate_label: "Earn Certificate (Free)", certificate_note: "Has Certificate", type: "Guided Track" },
          { name: "Coursera Professional Certifications", description: "Top university specialization for AWS.", url: "https://www.coursera.org/search?query=AWS", has_certificate: true, certificate_label: "Earn Certificate", certificate_note: "Has Certificate", type: "Professional Certificate" },
          { name: "YouTube Full Workshop Video", description: "Free comprehensive video playlist for AWS.", url: "https://www.youtube.com/results?search_query=AWS+full+course+beginners+tutorial", has_certificate: false, certificate_label: "No Certificate", certificate_note: "You won't earn a certificate for this", type: "Video Playlist" }
        ],
        completion_roadmap: [
          { step_number: 1, title: "Core Fundamentals & Concept Mastery", estimated_hours: 4, description: "Learn syntax, primitive types, key architecture rules, and foundational patterns of AWS." },
          { step_number: 2, title: "Hands-on Project Implementation", estimated_hours: 6, description: "Build: Deploy a serverless Python FastAPI app on AWS with S3 storage." },
          { step_number: 3, title: "Platform Verification & Assessment", estimated_hours: 2, description: "Complete platform assessment quiz on Infosys Springboard, Cisco Academy, or Coursera." },
          { step_number: 4, title: "Resume & Market Vector Integration", estimated_hours: 1, description: "Add AWS project repository link and evidence bullet points to your candidate profile." }
        ]
      }
    ]
  };
}
