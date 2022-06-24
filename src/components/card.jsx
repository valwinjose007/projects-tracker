import React from "react";

import "../css/card.css";

export default function Card({ project }) {
  return (
    <div className="card">
      <img src={project.img} className="card-img-top" alt="..." />
      <div className="card-body">
        <h3>{project.title}</h3>
        <div className="card-text">
          <p>{project.description}</p>
          <hr />
          {project.tags &&
            project.tags.map((tag, index) => (
              <span key={index} className="badge bg-info">
                {tag}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
