// useEffect: um Code auszuführen, wenn sich etwas ändert
import { useEffect } from "react";

// useLocation: liefert Infos über die aktuelle Route (URL)
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  // Wir holen uns den aktuellen Pfad aus der URL
  // Beispiel:
  // "/"           ->  Infopage
  // "/home"       ->  Homepage
  
  const { pathname } = useLocation();

  useEffect(() => {
    // window.scrollTo bewegt den viewport der seite
    // x = 0  ->  ganz links
    // y = 0  ->  ganz nach oben
    window.scrollTo(0, 0);
  }, [pathname]); 
  // dependency Array:
  // useEffect wird nur ausgeführt,
  // wenn sich "pathname" ändert (also bei Routenwechsel)

  // die Komponente rendert nichts im DOM
  // sie existiert nur wegen ihres Side-Effects (Scrollen)
  // deswegen return null!
  return null;
}

export default ScrollToTop;
