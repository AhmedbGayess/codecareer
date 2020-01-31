import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getOwnProfile } from "../../store/actions/profiles";
import Loader from "../common/Loader";
import ProfileCard from "./ProfileCard";
import DevEdExpList from "./DevEdExpList";

const DevProfile = ({ profile, loading, getOwnProfile, history }) => {
  useEffect(() => {
    getOwnProfile();
  }, []);

  if (!profile || loading) {
    return <Loader />;
  }

  const {
    name,
    about,
    location,
    experience,
    education,
    github,
    website,
    skills,
    profilePicture
  } = profile;

  const myProfile = history.location.pathname === "/me";
  return (
    <div>
      <div className="container">
        <ProfileCard
          name={name}
          about={about}
          location={location}
          profilePicture={profilePicture}
          skills={skills}
          github={github}
          website={website}
          myProfile={myProfile}
        />
        {experience && <DevEdExpList list={experience} title="Experience" />}
        {education && <DevEdExpList list={education} title="Education" />}
      </div>
    </div>
  );
};

DevProfile.propTypes = {
  profile: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.instanceOf(null).isRequired
  ]),
  loading: PropTypes.bool.isRequired,
  getOwnProfile: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profiles.profile,
  loading: state.profiles.loading
});

export default connect(mapStateToProps, { getOwnProfile })(DevProfile);
