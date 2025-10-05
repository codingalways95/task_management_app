import React, { useState } from "react";
import { TaskStatus } from "../types";
import "./TaskForm.css";

export type TaskFormData = {
  title: string;
  description: string;
  status: TaskStatus;
};

interface Props {
  initial?: TaskFormData;
  mode: "add" | "edit";
  onCancel: () => void;
  onSubmit: (data: TaskFormData) => void;
}

export default function TaskForm({ initial, mode, onCancel, onSubmit }: Props): React.JSX.Element {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [status, setStatus] = useState<TaskStatus>(initial?.status ?? "Pending");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title: title.trim(), description: description.trim(), status });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>{mode === "add" ? "Add Task" : "Edit Task"}</h3>

      <label className="field">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the title"
          aria-label="Title"
          required
        />
      </label>

      <label className="field">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter the description"
          rows={4}
          aria-label="Description"
        />
      </label>

      <label className="field status-field">
        <span>Status</span>
        <select value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)}>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </label>

      <div className="form-actions">
        <button type="button" className="btn cancel" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn primary">
          {mode === "add" ? "Add" : "Update"}
        </button>
      </div>
    </form>
  );
}
