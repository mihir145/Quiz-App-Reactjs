import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import NotFound from "./Core/NotFound";
import Signup from "../src/User/Signup";
import Signin from "../src/User/Signin";
import Home from "./Core/Home";
import AdminPanel from "./Admin/AdminPanel";
import AdminRoute from "./Admin/AdminRoute";
import "./App.css";
import CreateQuiz from "./Admin/CreateQuiz";
import Quizzes from "./User/Quizzes";
import ManageQuiz from "./Admin/ManageQuiz";
import UpdateQuiz from "./Admin/UpdateQuiz";
import AddQuest from "./Admin/AddQuest";
import ManageQuestions from "./Admin/ManageQuestions";
import DeleteQuestions from "./Admin/DeleteQuestions";
import EditQuestions from "./Admin/EditQuestions";
import AddQuestions from "./Admin/AddQuestions";
import PrivateRoute from "./Auth/Helper/PrivateRoute";
import Dashboard from "./User/Dashboard";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <AdminRoute exact path="/admin/dashboard" component={AdminPanel} />
        <AdminRoute exact path="/admin/create/quiz/" component={CreateQuiz} />
        <AdminRoute
          exact
          path="/admin/edit/quiz/:quizId"
          component={UpdateQuiz}
        />
        <AdminRoute exact path="/admin/manage/quiz/" component={ManageQuiz} />
        <PrivateRoute exact path="/quiz/:quizId" component={Quizzes} />
        <PrivateRoute path="/user/dashboard" component={Dashboard} />
        <AdminRoute
          exact
          path="/admin/manage/questions/"
          component={ManageQuestions}
        />
        <AdminRoute
          exact
          path="/quiz/add/question/:quizId"
          component={AddQuestions}
        />
        <AdminRoute
          exact
          path="/admin/quiz/add-questions/"
          component={AddQuest}
        />
        <AdminRoute
          exact
          path="/quiz/edit/questions/:quizId"
          component={EditQuestions}
        />
        <AdminRoute
          exact
          path="/quiz/delete/questions/:quizId"
          component={DeleteQuestions}
        />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
