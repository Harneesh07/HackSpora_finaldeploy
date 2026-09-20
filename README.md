# ResumeIQ Career Intelligence Engine

ResumeIQ is an AI-powered resume analyzer, live job market intelligence platform, and skill gap detector.

## 🚀 Application Flow

1. **Upload Resume**: The user uploads their resume (PDF or Text) via the React frontend.
2. **Parsing & Analysis**: The FastAPI backend parses the resume using AI services to extract skills, experience, and calculate a resume score.
3. **Live Job Market Intelligence**: The backend connects to job providers (LinkedIn, Indeed) to fetch real-time job listings matching the user's profile and location. *(Note: Naukri is temporarily disabled due to service upgrades)*.
4. **Skill Gap Detection**: The engine compares the user's extracted skills against the requirements of live job listings to identify missing skills and suggest learning paths.
5. **Insights Dashboard**: The frontend presents a comprehensive dashboard featuring the resume score, recommended roles, matched jobs, and a personalized learning roadmap.

## 🏗️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS 4, Framer Motion, Lucide React
- **Backend**: Python, FastAPI, Uvicorn

## 🛠️ Setup Instructions

### 1. Backend Setup

Navigate to the backend directory and install the required Python packages.

```bash
cd backend
python -m venv venv
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
```

Run the backend server:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
# or
python main.py
```
The API will be available at `http://localhost:8000`. API documentation is available at `http://localhost:8000/docs`.

### 2. Frontend Setup

Navigate to the frontend directory and install the Node dependencies.

```bash
cd frontend
npm install
```

Run the frontend development server:

```bash
npm run dev
```
The application will be available at `http://localhost:5173` (or the port specified by Vite).
