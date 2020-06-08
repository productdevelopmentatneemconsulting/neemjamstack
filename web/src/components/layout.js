import React from "react";
import Navbar from "./navbar";

import "../styles/layout.css";
import styles from "./layout.module.css";

const Layout = ({ children, siteTitle, navlinks }) => (
  <>
    <Navbar siteTitle={siteTitle} navlinks={navlinks} />
    <div className={styles.content}>{children}</div>
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.siteInfo}>
          &copy; {new Date().getFullYear()}, Built with <a href="https://www.sanity.io">Sanity</a>{" "}
          &amp;
          {` `}
          <a href="https://www.gatsbyjs.org">Neem</a>
        </div>
      </div>
    </footer>
  </>
);

export default Layout;
