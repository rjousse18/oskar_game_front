import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="app-container">
      {children}
    

      <footer className="app-footer">
        app by neneth, pauline et elie
      </footer>

    </div>
  );
};

export default Layout;