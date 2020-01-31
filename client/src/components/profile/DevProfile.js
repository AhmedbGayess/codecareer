import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getOwnProfile } from "../../store/actions/profiles";
import Loader from "../common/Loader";

const DevProfile = ({ profile, loading, getOwnProfile }) => {
  useEffect(() => {
    getOwnProfile();
  }, []);

  if (!profile || loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1>Profile</h1>
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
