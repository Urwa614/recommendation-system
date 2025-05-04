import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ManagePage from '../pages/ManagePage';
import ErrorPage from '../pages/ErrorPage';
import Dashboard from '../pages/Dashboard';
import DashboardHome from '../pages/dashboard/DashboardHome';
import UpdateProfile from '../pages/dashboard/UpdateProfile';
import CareerSuggestion from '../pages/dashboard/CareerSuggestion';
import DashboardLayout from '../pages/dashboard/DashboardLayout';


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/manage" element={<ManagePage />} />
            <Route path="*" element={<ErrorPage />} />


            <Route path="/manage" element={<DashboardLayout />}>
                <Route index element={<DashboardHome />} />
                <Route path="update-profile" element={<UpdateProfile />} />
                <Route path="career-suggestion" element={<CareerSuggestion />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
