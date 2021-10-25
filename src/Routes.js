import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout, Normal as NormalLayout } from './layouts';

import {
  Cockpit as CockpitView,
  ForecastingModule as ForecastingModuleView,
  SimulationInfo as SimulationInfoView,
  SimulationInfoEdit as SimulationInfoEditView,
  OwnSimulations as OwnSimulationsView,
  CreateOwnSimulations as CreateOwnSimulationsView,
  ImportJobOffer as ImportJobOfferView,
  JobOffer as JobOfferView,
  Profile as ProfileView,
  ChangePassword as ChangePasswordView,
  Analyzes as AnalyzesView,
  SavedSimulations as SavedSimulationsView,
  Help as HelpView,
  ContentManagement as ContentManagementView,
  BlockText as BlockTextView,
  SignUp as SignUpView,
  // SignUpAsAdvanced as SignUpAsAdvancedView,
  SignIn as SignInView,
  ValidateUser as ValidateUserView,
  Forgot as ForgotView,
  ResetPassword as ResetPasswordView,
  NotFound as NotFoundView
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/login"/>
      <RouteWithLayout
        component={CockpitView}
        exact
        layout={MainLayout}
        title='Kokpit'
        path="/cockpit"
      />
      <RouteWithLayout
        component={ForecastingModuleView}
        exact
        layout={MainLayout}
        title='Moduł prognostyczny'
        path="/forecasting_module"
      />
      <RouteWithLayout
        component={SimulationInfoView}
        exact
        layout={MainLayout}
        title='Moduł prognostyczny'
        path="/forecasting_module/simulation_info"
      />
      <RouteWithLayout
        component={SimulationInfoEditView}
        exact
        layout={MainLayout}
        title='Moduł prognostyczny'
        path="/forecasting_module/simulation_info/edit"
      />
      <RouteWithLayout
        component={OwnSimulationsView}
        exact
        layout={MainLayout}
        title='Własne symulacje'
        path="/own_simulations"
      />
      <RouteWithLayout
        component={CreateOwnSimulationsView}
        exact
        layout={MainLayout}
        title='Własne symulacje'
        path="/own_simulations/create"
      />
      <RouteWithLayout
        component={ImportJobOfferView}
        exact
        layout={MainLayout}
        title='Import Ofert Pracy'
        path="/import_job_offer"
      />
      <RouteWithLayout
        component={JobOfferView}
        exact
        layout={MainLayout}
        title='Moduł Internetowych Ofert Pracy'
        path="/job_offer"
      />
      <RouteWithLayout
        component={ProfileView}
        exact
        layout={MainLayout}
        title='Twój Profil'
        path="/profile"
      />
      <RouteWithLayout
        component={ChangePasswordView}
        exact
        layout={MainLayout}
        title='Twój Profil'
        path="/profile/change_password"
      />
      <RouteWithLayout
        component={AnalyzesView}
        exact
        layout={MainLayout}
        title='Zapisane analizy'
        path="/analyzes"
      />
      <RouteWithLayout
        component={SavedSimulationsView}
        exact
        layout={MainLayout}
        title='Zapisane symulacje'
        path="/saved_simulations"
      />
      <RouteWithLayout
        component={HelpView}
        exact
        layout={MainLayout}
        title='Pomoc'
        path="/help"
      />
      <RouteWithLayout
        component={ContentManagementView}
        exact
        layout={MainLayout}
        title='Zarządzanie treścią'
        path="/content_management"
      />
      <RouteWithLayout
        component={BlockTextView}
        exact
        layout={MainLayout}
        title='Zarządzanie treścią'
        path="/content_management/:id"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/register"
      />
      {/* <RouteWithLayout
        component={SignUpAsAdvancedView}
        exact
        layout={MinimalLayout}
        path="/registerAsAdvanced"
      /> */}
      <RouteWithLayout
        component={ValidateUserView}
        exact
        layout={MinimalLayout}
        path="/verification"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/login"
      />
      <RouteWithLayout
        component={ForgotView}
        exact
        layout={MinimalLayout}
        path="/forgotpassword"
      />
      <RouteWithLayout
        component={ResetPasswordView}
        exact
        layout={MinimalLayout}
        path="/reset_password"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={NormalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
