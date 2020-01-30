import React, { useState } from "react";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import ProfileForm from "./ProfileForm";
import EducationList from "./EducationList";
import "./EditProfile.scss";

const EditProfile = (props) => {
  const [about, setAbout] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [github, setGithub] = useState("");
  const [website, setWebsite] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [isEducationFormVisible, setEducationFormVisible] = useState(false);

  const addEducation = (ed) => {
    setEducation([ed, ...education]);
  };

  const deleteEducation = (id) => {
    setEducation(education.filter((ed) => ed.id !== id));
  };

  const addExperience = (exp) => {
    setExperience([exp, ...experience]);
  };

  const toggleEducationForm = () => {
    setEducationFormVisible(!isEducationFormVisible);
  };

  return (
    <div className="edit-profile">
      <div className="container">
        <h1 className="edit-profile__title">PROFILE</h1>
        <>
          <ProfileForm
            about={about}
            setAbout={setAbout}
            location={location}
            setLocation={setLocation}
            github={github}
            setGithub={setGithub}
            website={website}
            setWebsite={setWebsite}
          />
          <EducationList
            education={education}
            toggleEducationForm={toggleEducationForm}
            deleteEducation={deleteEducation}
          />
          {isEducationFormVisible && (
            <EducationForm
              addEducation={addEducation}
              toggleEducationForm={toggleEducationForm}
            />
          )}
          {/* <ExperienceForm addExperience={addExperience} /> */}
        </>
      </div>
    </div>
  );
};

export default EditProfile;
