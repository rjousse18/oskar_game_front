import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="app-container">
      {children}

      <footer className="app-footer">
        APP by neneth, elie et pauline !
      </footer>
    </div>
  );
};

export default Layout;