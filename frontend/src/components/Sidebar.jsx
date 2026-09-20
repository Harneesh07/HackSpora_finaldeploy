import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  FileText, 
  Briefcase, 
  BarChart2, 
  Folder, 
  Settings, 
  User, 
  LogOut,
  X
} from 'lucide-react';
import { GithubIcon as Github } from './icons/GithubIcon';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '../context/AuthContext';

const NAV_ITEMS = [
  { name: 'Dashboard', path: '/dashboard', icon: Home },
  { name: 'Resume Analyzer', path: '/analyzer', icon: FileText },
  { name: 'GitHub Analyzer', path: '/github-analyzer', icon: Github },
  { name: 'Job Matching', path: '/jobs', icon: Briefcase },
  { name: 'Analyze JD', path: '/custom-jd', icon: FileText },
  { name: 'Skill Gap', path: '/skill-gap', icon: BarChart2 },
  { name: 'Projects', path: '/projects', icon: Folder },
  { name: 'Implementation', path: '/implementation', icon: Settings },
  { name: 'Profile', path: '/profile', icon: User },
];

export default function Sidebar({ isOpen, onClose }) {
  const { logout } = useAuth();

  return (
    <>
      {/* Mobile overlay */}
      {/* Overlay to close sidebar on click outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40" 
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={twMerge(
          "fixed top-0 left-0 z-50 h-screen w-[260px] bg-slate-50 border-r border-slate-200/80 flex flex-col transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200/80">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="font-bold text-slate-900 text-lg">R</span>
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-wide">ResumeIQ</span>
          </div>
          <button onClick={onClose} className="md:hidden text-slate-600 hover:text-slate-900 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => {
                onClose();
              }}
              className={({ isActive }) => clsx(
                "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                isActive 
                  ? "bg-blue-600/10 text-blue-400 font-semibold" 
                  : "text-slate-600 hover:bg-slate-100/50 hover:text-slate-800"
              )}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="active-nav"
                      className="absolute left-0 w-1 h-8 bg-blue-500 rounded-r-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  <item.icon className={clsx(
                    "w-5 h-5 transition-transform duration-200",
                    isActive ? "scale-110" : "group-hover:scale-110"
                  )} />
                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200/80">
          <button 
            className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 w-full text-left text-slate-600 hover:bg-red-500/10 hover:text-red-400 group"
            onClick={logout}
          >
            <LogOut className="w-5 h-5 transition-transform duration-200 group-hover:scale-110 group-hover:-translate-x-1" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
