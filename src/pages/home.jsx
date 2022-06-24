import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

import "../css/home.css";
import Card from "../components/card";
import groovyWalkAnimation from "../assets/animations/loader.json";
import Header from "../components/header";
import projectsApi from "../api/projects";

export default function Home() {
  const [projects, setProjects] = useState();
  const [searchedProjects, setSearchedProjects] = useState();
  const [tags, setTags] = useState();
  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    setLoading(true);
    const { ok, data } = await projectsApi.getProjets();
    if (!ok) return alert("Something went wrong on getting projects!");
    setSearchedProjects(data);
    setProjects(data);
    gettingTags(data);
    setLoading(false);
  };

  const gettingTags = (data) => {
    let tagSet = new Set();
    data?.map((project) => tagSet.add(...project.tags));
    setTags(tagSet);
  };

  const handleSearch = (searchText) => {
    if (
      (selectedTags.length === 0 && (!searchText || searchText.length < 3)) ||
      (searchText.length > 0 && searchText.length < 3)
    )
      return alert("Please enter at least 3 character to search.");

    let filteredProject = projects.filter((project) => {
      if (searchText && selectedTags.length === 0) {
        return (
          project.title.toLowerCase().includes(searchText.toLowerCase()) ||
          project.description.toLowerCase().includes(searchText.toLowerCase())
        );
      } else if (!searchText && selectedTags.length > 0) {
        return project.tags.some((r) => selectedTags.includes(r)); //check both array contains same tag.
      } else {
        return (
          project.tags.some((r) => selectedTags.includes(r)) &&
          (project.title.toLowerCase().includes(searchText.toLowerCase()) ||
            project.description
              .toLowerCase()
              .includes(searchText.toLowerCase()))
        );
      }
    });
    setSearchedProjects(filteredProject);
  };

  const handleSelect = (value) => {
    setSelectedTags([...value]); //spreading the array to get new reference for child update.
  };

  return (
    <>
      <Header
        tags={tags}
        selectedTags={selectedTags}
        handleSelect={handleSelect}
        handleSearch={handleSearch}
      />
      {loading && (
        <Lottie className="loader" animationData={groovyWalkAnimation} />
      )}
      {!loading && (
        <div className="container">
          {searchedProjects && searchedProjects.length == 0 && (
            <div className="noRecordLabel">No Records Found!</div>
          )}
          <div className="d-flex flex-wrap projectsContainer">
            {searchedProjects &&
              searchedProjects.map((project, index) => (
                <Card key={index} project={project} />
              ))}
          </div>
        </div>
      )}
    </>
  );
}
