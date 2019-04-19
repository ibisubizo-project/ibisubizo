var UserProfile = (function() {
    var userData = {};

    var getUserData = function() {
      if (!userData) { 
        userData = JSON.parse(localStorage.getItem("userData"));
      }
      return userData;
    };

    var setUserData = function(userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
      userData = JSON.parse(localStorage.getItem("userData"));
    };

    return {
      getUserData: getUserData,
      setUserData: setUserData
    }
  })();

  export default UserProfile;