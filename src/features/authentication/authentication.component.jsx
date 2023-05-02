import SignUpFrom from "../sign-up-form/sign-up-form.component";
import SignInFrom from "../sign-in-from/sign-in-from.component";

import "./authentication.styles.scss";

const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignInFrom />
      <SignUpFrom />
    </div>
  );
};

export default Authentication;
