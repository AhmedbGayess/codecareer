import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import ProfileForm from "./ProfileForm";
import EdExpList from "./EdExpList";
import "./EditProfile.scss";
import axios from "axios";
import ProfileImageInput from "./ProfileImageInput";
import ProfilePicture from "./ProfilePicture";
import { editProfile } from "../../store/actions/profiles";

const EditProfile = ({ editProfile, history }) => {
  const [about, setAbout] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [github, setGithub] = useState("");
  const [website, setWebsite] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [isEducationFormVisible, setEducationFormVisible] = useState(false);
  const [isExperienceFormVisible, setExperienceFormVisible] = useState(false);
  const [aboutError, setAboutError] = useState("");
  const [locationError, setLocationError] = useState("");

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

  const deleteImage = async () => {
    await axios.delete(`/api/images/${profilePicture}`);
    setProfilePicture("");
  };

  const handleValidation = () => {
    let isFormValid = true;
    if (about === "") {
      setAboutError("Let developers and companies know a bit about you!");
      isFormValid = false;
    } else {
      setAboutError("");
    }

    if (location === "") {
      setLocationError("Please specify your location");
      isFormValid = false;
    } else {
      setLocationError("");
    }

    return isFormValid;
  };

  const onProfileSubmit = () => {
    const isFormValid = handleValidation();
    if (!isFormValid) {
      return;
    }

    editProfile(
      {
        about,
        location,
        experience,
        education,
        skills,
        github,
        website,
        profilePicture
      },
      history
    );
  };

  return (
    <div className="edit-profile">
      <div className="container">
        <h1 className="edit-profile__title">SET YOUR PROFILE</h1>
        <>
          {profilePicture && (
            <ProfilePicture
              profilePicture={profilePicture}
              deleteImage={deleteImage}
            />
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
            aboutError={aboutError}
            locationError={locationError}
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
          <button
            className="btn btn--primary edit-profile__btn"
            onClick={onProfileSubmit}
          >
            Save profile
          </button>
        </>
      </div>
    </div>
  );
};

EditProfile.propTypes = {
  editProfile: PropTypes.func.isRequired
};

export default connect(null, { editProfile })(EditProfile);
