const ProfileInfos = ({ user }) => {
  // console.log(user);
  return (
    <article className="aside-profile-wrapper">
      <img
        className="profile-picture aside-profile-picture"
        src={user.profilePicture}
        alt=""
      />
      <h2>{`${user.firstName} ${user.lastName}`}</h2>
      <p className="aside-profile-username">@{user.userName}</p>
      <p className="aside-profile-bio">{user.bio}</p>
      <div className="stats-wrapper">
        <div className="stats">
          <h3>Tweets</h3>
          <p>{user.tweets}</p>
        </div>
        <div className="stats">
          <h3>Followers</h3>
          <p>{user.followers}</p>
        </div>
        <div className="stats">
          <h3>Following</h3>
          <p>{user.following}</p>
        </div>
      </div>
    </article>
  );
};

export default ProfileInfos;
