import React, { useState } from "react";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import ProfileForm from "./ProfileForm";
import EdExpList from "./EdExpList";
import "./EditProfile.scss";
import axios from "axios";
import ProfileImageInput from "./ProfileImageInput";

const EditProfile = (props) => {
  const [about, setAbout] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  // const [skills, setSkills] = useState([]);
  const [github, setGithub] = useState("");
  const [website, setWebsite] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [isEducationFormVisible, setEducationFormVisible] = useState(false);
  const [isExperienceFormVisible, setExperienceFormVisible] = useState(false);

  const addEducation = (ed) => {
    setEducation([ed, ...education]);
  };

  const deleteEducation = (id) => {
    setEducation(education.filter((ed) => ed.id !== id));
  };

  const toggleEducationForm = () => {
    setEducationFormVisible(!isEducationFormVisible);
  };

  const addExperience = (exp) => {
    setExperience([exp, ...experience]);
  };

  const deleteExperience = (id) => {
    setExperience(experience.filter((exp) => exp.id !== id));
  };

  const toggleExperienceForm = () => {
    setExperienceFormVisible(!isExperienceFormVisible);
  };

  const uploadImage = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    const { data } = await axios.post("/api/images", formData, config);
    setProfilePicture(data.image);
  };

  return (
    <div className="edit-profile">
      <div className="container">
        <h1 className="edit-profile__title">PROFILE</h1>
        <>
          {profilePicture && (
            <img src={`/images/${profilePicture}`} alt="profile" />
          )}
          {!profilePicture && <ProfileImageInput onChange={uploadImage} />}
          <ProfileForm
            about={about}
            setAbout={setAbout}
            location={location}
            setLocation={setLocation}
            github={github}
            setGithub={setGithub}
            website={website}
            setWebsite={setWebsite}
            onImageChange={uploadImage}
          />
          <EdExpList
            edExp={education}
            toggleForm={toggleEducationForm}
            deleteEdExp={deleteEducation}
            title="Education"
          />
          <EdExpList
            edExp={experience}
            toggleForm={toggleExperienceForm}
            deleteEdExp={deleteExperience}
            title="Experience"
          />
          {isEducationFormVisible && (
            <EducationForm
              addEducation={addEducation}
              toggleEducationForm={toggleEducationForm}
            />
          )}
          {isExperienceFormVisible && (
            <ExperienceForm
              addExperience={addExperience}
              toggleExperienceForm={toggleExperienceForm}
            />
          )}
        </>
      </div>
    </div>
  );
};

export default EditProfile;
