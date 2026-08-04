import { useEffect } from "react";

/**
 * useBrandFonts
 * -----------------------------------------------------------------------
 * As fontes da marca (Mackinac + Inter) já são carregadas via <link> no
 * index.html. Este hook existe apenas como uma segunda camada de
 * segurança: garante que os links estejam presentes mesmo se o
 * componente for reaproveitado em outro contexto/projeto que não
 * carregue o index.html original.
 * -----------------------------------------------------------------------
 */
export function useBrandFonts() {
  useEffect(() => {
    const fontLinks = [
      {
        id: "font-mackinac",
        href:
          "https://db.onlinewebfonts.com/c/9d4d074c9335825a23cce178ee03b498?family=P22+Mackinac+W01+Book",
      },
      {
        id: "font-inter",
        href:
          "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap",
      },
    ];

    fontLinks.forEach(({ id, href }) => {
      if (document.getElementById(id)) return;
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    });
  }, []);
}
