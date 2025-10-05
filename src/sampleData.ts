import { Task } from "./types";

export const sampleTasks = (): Task[] => [
  {
    id: "t1",
    title: "Lorem Ipsum",
    description: "Lorem Ipsum is simply dummy text of the printing.",
    status: "In Progress",
    createdAt: new Date().toISOString(),
  },
  {
    id: "t2",
    title: "Write unit tests",
    description: "Add tests for components and hooks.",
    status: "Pending",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "t3",
    title: "Deploy to staging",
    description: "Push build and test environment",
    status: "Completed",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
];
