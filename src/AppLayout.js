import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./AppLayout.module.css";
import { SearchBar } from "./features/SearchBar/SearchBar";

export default function AppLayout(props) {

    return (
        <div>

            <Outlet/>
        </div>

    );
}