import {
  Briefcase,
  PenTool,
  Music,
  Code,
  BarChart,
  Zap,
  GraduationCap,
  Heart,
  Building,
  Layers,
  Folder,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  briefcase: Briefcase,
  "pen-tool": PenTool,
  music: Music,
  code: Code,
  "bar-chart": BarChart,
  zap: Zap,
  "graduation-cap": GraduationCap,
  heart: Heart,
  building: Building,
  layers: Layers,
};

interface Props {
  name: string;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export function CategoryIcon({ name, size = 18, className, strokeWidth = 1.5 }: Props) {
  const Icon = MAP[name] ?? Folder;
  return <Icon size={size} className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
