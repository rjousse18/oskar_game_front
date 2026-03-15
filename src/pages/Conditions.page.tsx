import HomeButton from "../components/HomeButton";
import "../css/conditions.css";

const Conditions = () => {
  return (
    <>
      <HomeButton />
      <div className="terms-container">
        <div className="terms-header">
          <h1 className="terms-title">
            Conditions d'Utilisation & Licence Open Source
          </h1>
          <p className="terms-subtitle">
            Dernière mise à jour :{" "}
            <span className="terms-last-updated">15 mars 2026</span>
          </p>
          <span>Oskarz est un projet open source sous licence MIT.</span>
        </div>

        <div className="terms-section">
          <h2 className="terms-section-title">1. Acceptation des Conditions</h2>
          <div className="terms-section-content">
            <p>
              En accédant ou en utilisant le site{" "}
              <span className="terms-highlight">Oskarz</span> (ci-après le «
              Site ») ou son code source, vous acceptez les présentes Conditions
              d'Utilisation et les termes de la{" "}
              <span className="terms-highlight">licence MIT</span> (voir
              ci-dessous).
            </p>
          </div>
        </div>

        <div className="terms-section">
          <h2 className="terms-section-title">2. Description du Service</h2>
          <div className="terms-section-content">
            <p>
              Oskarz est un jeu en ligne open source permettant de prédire les
              gagnants des Oscars en créant ou rejoignant des parties entre
              amis. Le code source est librement accessible, modifiable et
              redistribuable sous les conditions de la licence MIT.
            </p>
          </div>
        </div>

        <div className="terms-section">
          <h2 className="terms-section-title">3. Utilisation du Code Source</h2>
          <div className="terms-section-content">
            <p>Vous êtes autorisé(e) à :</p>
            <ul className="terms-list">
              <li>
                Utiliser, copier, modifier et redistribuer le code source, à des
                fins commerciales ou non.
              </li>
              <li>
                Publier des versions modifiées, à condition de conserver la
                mention de copyright et la licence d'origine.
              </li>
              <li>
                Intégrer tout ou partie du code dans d'autres projets, sous
                réserve de respecter les termes de la licence MIT.
              </li>
            </ul>
            <p>Vous vous engagez à :</p>
            <ul className="terms-list">
              <li>
                Ne pas supprimer les mentions de copyright ou de licence du
                projet original.
              </li>
              <li>
                Ne pas utiliser le nom "Oskarz" ou son logo pour promouvoir un
                produit dérivé sans autorisation écrite.
              </li>
            </ul>
          </div>
        </div>

        <div className="terms-section">
          <h2 className="terms-section-title">4. Licence MIT</h2>
          <div className="terms-license">
            Copyright (c) 2026 Rémi Joussé & les contributeurs d'Oskarz
            Permission is hereby granted, free of charge, to any person
            obtaining a copy of this software and associated documentation files
            (the "Software"), to deal in the Software without restriction,
            including without limitation the rights to use, copy, modify, merge,
            publish, distribute, sublicense, and/or sell copies of the Software,
            and to permit persons to whom the Software is furnished to do so,
            subject to the following conditions: The above copyright notice and
            this permission notice shall be included in all copies or
            substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS
            IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
            NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
            PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
            AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
            OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
            OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
            OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
          </div>
        </div>

        <div className="terms-section">
          <h2 className="terms-section-title">
            5. Responsabilités de l'Utilisateur
          </h2>
          <div className="terms-section-content">
            <p>
              Vous êtes seul(e) responsable de l'utilisation que vous faites du
              Site et de ses modifications. L'équipe d'Oskarz décline toute
              responsabilité en cas de :
            </p>
            <ul className="terms-list">
              <li>Bugs ou dysfonctionnements dans les versions modifiées.</li>
              <li>
                Utilisation non conforme à la licence ou aux lois en vigueur.
              </li>
              <li>
                Dommages indirects résultant de l'utilisation du Site ou de ses
                dérivés.
              </li>
            </ul>
          </div>
        </div>

        <div className="terms-section">
          <h2 className="terms-section-title">6. Contributions</h2>
          <div className="terms-section-content">
            <p>
              Les contributions au projet (code, design, documentation) sont les
              bienvenues et seront soumises à la même licence MIT. En
              contribuant, vous acceptez de céder vos droits d'auteur sur vos
              contributions au projet Oskarz.
            </p>
          </div>
        </div>

        <div className="terms-section">
          <h2 className="terms-section-title">
            7. Modification des Conditions
          </h2>
          <div className="terms-section-content">
            <p>
              Ces Conditions d'Utilisation et la licence peuvent être révisées à
              tout moment. Les modifications seront publiées sur cette page.
              L'utilisation continue du Site ou de son code source après une
              mise à jour vaut acceptation des nouveaux termes.
            </p>
          </div>
        </div>

        <div className="terms-section">
          <h2 className="terms-section-title">8. Contact</h2>
          <div className="terms-section-content">
            <p>
              Pour toute question, vous pouvez nous contacter à :{" "}
              <a href="mailto:contact@nastream.fr">contact@nastream.fr</a>.
            </p>
          </div>
        </div>

        <div className="terms-footer">
          <p>© 2026 Oskarz – Projet open source sous licence MIT.</p>
        </div>
      </div>
    </>
  );
};

export default Conditions;
