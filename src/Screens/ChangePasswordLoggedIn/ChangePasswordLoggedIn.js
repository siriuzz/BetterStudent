import { settings } from "firebase/analytics";
import React from "react";
import ChangePasswordContent from "../../components/ChangePasswordContent";

export default function ChangePassword({navigation}){
  return(
    <ChangePasswordContent 
      loggedIn={true}
    />
  )
}