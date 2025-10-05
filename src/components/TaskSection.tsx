import React from "react";
import { Task, TaskStatus } from "../types";
import TaskCard from "./TaskCard";
import "./TaskSection.css";

interface Props {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  collapsed: boolean;
  onToggleCollapse: () => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskSection: React.FC<Props> = ({
  title,
  tasks,
  collapsed,
  onToggleCollapse,
  onEdit,
  onDelete,
}) => {
  return (
    <section className="task-section">
      <div className="section-header" onClick={onToggleCollapse} role="button" tabIndex={0}>
        <div>{title}</div>
        <div className="caret">{collapsed ? "▾" : "▴"}</div>
      </div>

      <div className={`section-body ${collapsed ? "collapsed" : ""}`}>
        {tasks.length === 0 ? (
          <div className="empty">No tasks</div>
        ) : (
          tasks.map((t) => (
            <TaskCard key={t.id} task={t} onEdit={() => onEdit(t)} onDelete={() => onDelete(t.id)} />
          ))
        )}
      </div>
    </section>
  );
}
