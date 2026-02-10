import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="app-container">
      {children}
    

      <footer className="app-footer">
        
        <div className="footer-links">
          <a href="#">Contact</a>
          <a href="#">Conditions d'Utilisation</a>
          <a href="#">Credits</a>
        </div>

        <p className="footer-disclaimer">
          Les développeurs de ce site ne sont pas responsables du contenu généré par les utilisateurs. © 2026 OSCARZ
        </p>

      </footer>

    </div>
  );
};

export default Layout;