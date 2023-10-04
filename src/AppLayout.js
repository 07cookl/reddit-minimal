import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./AppLayout.module.css";
import { SearchBar } from "./features/SearchBar/SearchBar";

export default function AppLayout() {
    return (
        <div>
            <div className={styles.bar}>
            <div className={styles.logo}>
                <p>LOGO</p>
            </div>
            <nav className={styles.links}>
                <ul>
                <li>
                    <NavLink to={'home'} >
                    HomePage
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'search-results'} >
                    SearchResults
                    </NavLink>
                </li>
                </ul>
            </nav>
            <SearchBar />
            </div>
            <Outlet/>
        </div>

    );
}