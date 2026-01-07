import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import CreateVacancy from "../pages/Vacancies/CreateVacancy";
import MyApplications from "../pages/Applications/MyApplications";
import VacancyDetail from "../pages/Vacancies/VacancyDetail";
import Layout from "../components/Layout";

export const RenderRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create-vacancy" element={<CreateVacancy />} />
                <Route path="/my-applications" element={<MyApplications />} />
                <Route path="/vacancies/:id" element={<VacancyDetail />} />
            </Route>
        </Routes>
    );
};

export default RenderRoute;
