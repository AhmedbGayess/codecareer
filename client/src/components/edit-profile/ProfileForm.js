import React from "react";
import PropTypes from "prop-types";
import FormInput from "../common/FormInput";

const ProfileForm = ({
  about,
  setAbout,
  location,
  setLocation,
  github,
  setGithub,
  website,
  setWebsite,
  aboutError,
  locationError,
  isDeveloper
}) => {
  return (
    <form className="profile-form">
      <FormInput
        name="about"
        label="About"
        placeholder="Tell us a bit about you"
        value={about}
        onChange={setAbout}
        error={aboutError}
      />
      <FormInput
        name="location"
        label="Location"
        placeholder="Your current location"
        value={location}
        onChange={setLocation}
        error={locationError}
      />
      {isDeveloper && (
        <FormInput
          name="github"
          label="Github"
          placeholder="Your Github username"
          value={github}
          onChange={setGithub}
        />
      )}
      <FormInput
        name="website"
        label="Website"
        placeholder="Your website URL"
        value={website}
        onChange={setWebsite}
      />
    </form>
  );
};

ProfileForm.propTypes = {
  about: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  github: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  setAbout: PropTypes.func.isRequired,
  setLocation: PropTypes.func.isRequired,
  setGithub: PropTypes.func.isRequired,
  setWebsite: PropTypes.func.isRequired,
  isDeveloper: PropTypes.bool.isRequired
};

export default ProfileForm;
