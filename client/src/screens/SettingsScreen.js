import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "../actions/authActions";
import ChangePasswordForm from "../components/ChangePasswordForm";
import Layout from "../components/Layout";

const SettingsScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <Layout>
      <div className="settings-container">
        <ChangePasswordForm />
      </div>
    </Layout>
  );
};

export default SettingsScreen;
