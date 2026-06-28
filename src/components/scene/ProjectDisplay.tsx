import type { Project } from '../../types/project';
import { ProjectPhone } from './objects/ProjectPhone';
import { ProjectCrystal } from './objects/ProjectCrystal';
import { ProjectPanel } from './objects/ProjectPanel';
import { ProjectShield } from './objects/ProjectShield';
import { ProjectServer } from './objects/ProjectServer';
import { ProjectNeuron } from './objects/ProjectNeuron';

interface ProjectDisplayProps {
  project: Project;
  isMobile?: boolean;
}

/** Роутер low-poly объектов по objectType */
export function ProjectDisplay({ project, isMobile }: ProjectDisplayProps) {
  switch (project.objectType) {
    case 'phone':
      return <ProjectPhone project={project} htmlScale={isMobile ? 0.24 : 0.34} />;
    case 'crystal':
      return <ProjectCrystal project={project} />;
    case 'panel':
      return <ProjectPanel project={project} />;
    case 'shield':
      return <ProjectShield project={project} />;
    case 'server':
      return <ProjectServer project={project} />;
    case 'neuron':
      return <ProjectNeuron project={project} />;
    default:
      return <ProjectCrystal project={project} />;
  }
}
