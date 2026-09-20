import React from 'react';
import SkillGapCard from '../components/SkillGapCard';
import LearningRoadmap from '../components/LearningRoadmap';
import JobDescriptionAnalyzer from '../components/JobDescriptionAnalyzer';
import { User, Briefcase, GraduationCap, Folder } from 'lucide-react';

export const CustomJD = ({ candidate }) => (
  <div className="max-w-7xl mx-auto px-4 py-10 space-y-8 text-left">
    <div>
      <h1 className="text-3xl font-extrabold text-slate-900">Custom Job Description Analysis</h1>
      <p className="text-sm text-slate-600 mt-2">
        Paste any job description here to see how well your resume matches it.
      </p>
    </div>
    <JobDescriptionAnalyzer candidateSkills={candidate?.skills ? candidate.skills.map(s => s.name) : []} />
  </div>
);

export const SkillGap = ({ marketResults }) => (
  <div className="max-w-7xl mx-auto px-4 py-10 space-y-8 text-left">
    <div>
      <h1 className="text-3xl font-extrabold text-slate-900">Skill Gap Analysis</h1>
      <p className="text-sm text-slate-600 mt-2">
        A detailed breakdown of the skills you need to acquire to land your target roles.
      </p>
    </div>
    
    <SkillGapCard skillGaps={marketResults?.skill_gaps} />
    <LearningRoadmap roadmap={marketResults?.learning_roadmap} />
  </div>
);

export const Projects = ({ candidate }) => (
  <div className="max-w-7xl mx-auto px-4 py-10 space-y-8 text-left">
    <div>
      <h1 className="text-3xl font-extrabold text-slate-900">Projects Portfolio</h1>
      <p className="text-sm text-slate-600 mt-2">
        Showcase your projects here to strengthen your profile.
      </p>
    </div>

    {candidate?.projects && candidate.projects.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {candidate.projects.map((project, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Folder className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{project.name}</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{project.description}</p>
            {project.technologies && (
              <div className="flex flex-wrap gap-2 pt-2">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium border border-slate-200">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    ) : (
      <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center">
        <p className="text-sm text-slate-600">No projects found in your resume.</p>
      </div>
    )}
  </div>
);

export const Profile = ({ candidate }) => (
  <div className="max-w-4xl mx-auto px-4 py-10 space-y-8 text-left">
    <div>
      <h1 className="text-3xl font-extrabold text-slate-900">User Profile</h1>
      <p className="text-sm text-slate-600 mt-2">
        Your personal information, education, and career experience.
      </p>
    </div>

    {candidate ? (
      <div className="space-y-6">
        {/* Basic Info */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-bold">
              {candidate.name?.charAt(0) || <User />}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{candidate.name}</h2>
              <p className="text-sm text-slate-500">{candidate.email} • {candidate.phone}</p>
              <p className="text-sm text-slate-500">{candidate.location}</p>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-500" />
            Experience
          </h3>
          {candidate.experience?.length > 0 ? (
            <div className="space-y-4">
              {candidate.experience.map((exp, idx) => (
                <div key={idx} className="border-l-2 border-slate-200 pl-4 py-1">
                  <h4 className="font-bold text-slate-800">{exp.title}</h4>
                  <p className="text-sm text-blue-600 font-medium">{exp.company} <span className="text-slate-400">|</span> <span className="text-slate-500">{exp.duration}</span></p>
                  <p className="text-sm text-slate-600 mt-2">{exp.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">No experience found.</p>
          )}
        </div>

        {/* Education */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-500" />
            Education
          </h3>
          {candidate.education?.length > 0 ? (
            <div className="space-y-4">
              {candidate.education.map((edu, idx) => (
                <div key={idx} className="border-l-2 border-slate-200 pl-4 py-1">
                  <h4 className="font-bold text-slate-800">{edu.degree}</h4>
                  <p className="text-sm text-slate-600">{edu.institution} <span className="text-slate-400">|</span> {edu.year}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">No education found.</p>
          )}
        </div>
      </div>
    ) : (
      <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center">
        <p className="text-sm text-slate-600">Please upload a resume to view your profile.</p>
      </div>
    )}
  </div>
);
