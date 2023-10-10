import { Metadata } from "next";
import Projects from "./components/Projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "",
};

export default function ProjectPage() {
  return (
    <div>
      <Projects />
    </div>
  );
}
