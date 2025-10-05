import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { Task, TaskStatus } from "./types";
import { loadTasks, saveTasks } from "./utils/storage";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import { TaskSection } from "./components/TaskSection";
import TaskForm, { TaskFormData } from "./components/TaskForm";
import AddButton from "./components/AddButton";
import { sampleTasks } from "./sampleData";

export function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = loadTasks();
    return stored.length ? stored : sampleTasks();
  });

  const [query, setQuery] = useState("");
  const [openForm, setOpenForm] = useState<{ mode: "add" | "edit"; task?: Task } | null>(null);
  const [collapsed, setCollapsed] = useState<Record<TaskStatus, boolean>>({
    "In Progress": false,
    Pending: true,
    Completed: true,
  });

  useEffect(() => saveTasks(tasks), [tasks]);

  const addTask = (data: TaskFormData) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: data.title.trim(),
      description: data.description.trim(),
      status: data.status,
      createdAt: new Date().toISOString(),
    };
    setTasks((s) => [newTask, ...s]);
    setOpenForm(null);
  };

  const updateTask = (id: string, data: TaskFormData) => {
    setTasks((s) => s.map((t) => (t.id === id ? { ...t, ...data } : t)));
    setOpenForm(null);
  };

  const deleteTask = (id: string) => {
    setTasks((s) => s.filter((t) => t.id !== id));
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tasks.filter(
      (t) =>
        (!q ||
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)) // search
    );
  }, [tasks, query]);

  const byStatus = useMemo(() => {
    const map: Record<TaskStatus, Task[]> = {
      Pending: [],
      "In Progress": [],
      Completed: [],
    };
    for (const t of filtered) map[t.status].push(t);
    return map;
  }, [filtered]);

  return (
    <div className="app-root">
      <Header />
      <main className="app-main">
        <div className="left-col">
          <SearchBar value={query} onChange={setQuery} />
          <div className="sections">
            <TaskSection
              title="In Progress"
              status="In Progress"
              tasks={byStatus["In Progress"]}
              collapsed={collapsed["In Progress"]}
              onToggleCollapse={() =>
                setCollapsed((c) => ({ ...c, "In Progress": !c["In Progress"] }))
              }
              onEdit={(task) => setOpenForm({ mode: "edit", task })}
              onDelete={deleteTask}
            />

            <TaskSection
              title={`Pending (${byStatus["Pending"].length})`}
              status="Pending"
              tasks={byStatus["Pending"]}
              collapsed={collapsed["Pending"]}
              onToggleCollapse={() =>
                setCollapsed((c) => ({ ...c, Pending: !c.Pending }))
              }
              onEdit={(task) => setOpenForm({ mode: "edit", task })}
              onDelete={deleteTask}
            />

            <TaskSection
              title={`Completed (${byStatus["Completed"].length})`}
              status="Completed"
              tasks={byStatus["Completed"]}
              collapsed={collapsed["Completed"]}
              onToggleCollapse={() =>
                setCollapsed((c) => ({ ...c, Completed: !c.Completed }))
              }
              onEdit={(task) => setOpenForm({ mode: "edit", task })}
              onDelete={deleteTask}
            />
          </div>
        </div>

        <div className="right-col">
          <div className="info-panel">
            <h3>Details</h3>
            <p>Tap a task to edit. Use the floating + button to add a task.</p>
          </div>
        </div>
      </main>

      <AddButton onClick={() => setOpenForm({ mode: "add" })} />

      {openForm && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal">
            <TaskForm
              initial={
                openForm.mode === "edit" && openForm.task
                  ? {
                      title: openForm.task.title,
                      description: openForm.task.description,
                      status: openForm.task.status,
                    }
                  : undefined
              }
              mode={openForm.mode}
              onCancel={() => setOpenForm(null)}
              onSubmit={(data) => {
                if (openForm.mode === "add") addTask(data);
                else if (openForm.mode === "edit" && openForm.task)
                  updateTask(openForm.task.id, data);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
