import { backendUrl } from "../../api/api";
import {
  ReloadContext,
  TokenDataContext,
  UserDataContext,
} from "../../context/Context";
import "./ProfileSettings.css";
import { useContext, useState } from "react";

const ProfileSettings = ({ setUser, user }) => {
  const [settingsToggle, setSettingsToggle] = useState(false);
  const { user: myUserData, setUser: setMyUserData } =
    useContext(UserDataContext);
  const { token } = useContext(TokenDataContext);
  const { reloadProfile, setReloadProfile } = useContext(ReloadContext);
  const [updateUserInfo, setUpdateUserInfo] = useState({
    userName: user.userName,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    bio: user.bio,
    profilePicture: user.profilePicture,
  });
  const [test, setTest] = useState();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64 = reader.result;
      setUpdateUserInfo({ ...updateUserInfo, profilePicture: base64 });
    };
  };

  const changeUserInfoHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${backendUrl}/user`, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...updateUserInfo }),
      });

      const data = await res.json();
      // setUser(data.result);
      setMyUserData(data.result);
      setSettingsToggle((settingsToggle) => !settingsToggle);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <article>
      <button
        onClick={() => setSettingsToggle((settingsToggle) => !settingsToggle)}
        className="settings-btn"
      >
        <img src="/dots.svg" alt="" />
      </button>
      {settingsToggle && (
        <div className="settings-popup">
          <div className="settings-info-wrapper">
            <button
              onClick={() =>
                setSettingsToggle((settingsToggle) => !settingsToggle)
              }
              className="close-settings"
            >
              <img src="/highlight_off_24px.svg" alt="" />
            </button>
            <div className="settings-description">
              <h2>Profile settings</h2>
              <p>You can change your user informations below: </p>
            </div>
            <div className="settings-wrapper">
              <form action="">
                <div className="settings-input">
                  <label htmlFor="userName">Username:</label>
                  <input
                    type="text"
                    id="userName"
                    value={updateUserInfo.userName}
                    onChange={(e) =>
                      setUpdateUserInfo({
                        ...updateUserInfo,
                        userName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="settings-input">
                  <label htmlFor="firstName">firstName:</label>
                  <input
                    type="text"
                    id="firstName"
                    value={updateUserInfo.firstName}
                    onChange={(e) =>
                      setUpdateUserInfo({
                        ...updateUserInfo,
                        firstName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="settings-input">
                  <label htmlFor="lastName">lastName:</label>
                  <input
                    type="text"
                    id="lastName"
                    value={updateUserInfo.lastName}
                    onChange={(e) =>
                      setUpdateUserInfo({
                        ...updateUserInfo,
                        lastName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="settings-input">
                  <label htmlFor="email">email:</label>
                  <input
                    type="text"
                    id="email"
                    value={updateUserInfo.email}
                    onChange={(e) =>
                      setUpdateUserInfo({
                        ...updateUserInfo,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="settings-input">
                  <label htmlFor="bio">bio:</label>
                  <input
                    type="text"
                    id="bio"
                    value={updateUserInfo.bio}
                    onChange={(e) =>
                      setUpdateUserInfo({
                        ...updateUserInfo,
                        bio: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="settings-input">
                  <label htmlFor="profilePicture">profilePicture:</label>
                  <input
                    type="file"
                    id="profilePicture"
                    accept=".jpg, .png, .jpeg"
                    onChange={handleImageChange}
                  />
                </div>
                <button
                  onClick={changeUserInfoHandler}
                  className="btn profile-settings-btn"
                >
                  Change user infos
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default ProfileSettings;
