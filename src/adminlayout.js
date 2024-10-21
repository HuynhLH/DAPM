import React from "react";
import Dashboard from "./admincompoments/DashboadAdmin/Dashboard";

const AdminLayout = ({ children }) => {
    return (
        <div>
            <Dashboard /><div>{children}</div>
        </div>
    );
};

export default AdminLayout;
