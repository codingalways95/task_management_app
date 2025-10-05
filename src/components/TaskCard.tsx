import React from "react";
import { Task } from "../types";
import "./TaskCard.css";

function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString();
  } catch {
    return iso;
  }
}

const statusColor = (status: string) => {
  switch (status) {
    case "In Progress":
      return "#f4a300";
    case "Completed":
      return "#2aa556";
    default:
      return "#bdbdbd";
  }
};

interface Props {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
}

export default function TaskCard({ task, onEdit, onDelete }: Props): React.ReactElement {
  return (
    <article className="task-card" aria-label={task.title}>
      <div className="left">
        <div className="avatar">{task.title.charAt(0).toUpperCase()}</div>
      </div>

      <div className="center">
        <div className="title-row">
          <h4 className="title">{task.title}</h4>
          <div className="status">
            <span className="dot" style={{ background: statusColor(task.status) }} />
            <span className="status-text">{task.status}</span>
          </div>
        </div>
        <p className="desc">{task.description}</p>
        <div className="createdDate">{formatDate(task.createdAt)}</div>
      </div>

      <div className="actions">
        <button className="icon-btn" title="Edit" onClick={onEdit} aria-label="Edit">
          ✎
        </button>
        <button className="icon-btn danger" title="Delete" onClick={onDelete} aria-label="Delete">
          🗑
        </button>
      </div>
    </article>
  );
}
