import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';

// Vazirmatn weights actually used in variables.css (400 body text, up to
// 800 for the hero headline). @fontsource ships every weight from 100
// to 900 — import more of these if you use a weight that isn't here.
import '@fontsource/vazirmatn/400.css';
import '@fontsource/vazirmatn/500.css';
import '@fontsource/vazirmatn/600.css';
import '@fontsource/vazirmatn/700.css';
import '@fontsource/vazirmatn/800.css';

// Design tokens first, then base/reset, then everything else — later
// files can rely on the variables and resets from the earlier ones.
import './styles/variables.css';
import './styles/global.css';
import './styles/animations.css';
import './styles/ui.css';
import './styles/layout.css';
import './styles/home.css';
import './styles/shop.css';
import './styles/product-detail.css';
import './styles/cart.css';
import './styles/checkout.css';
import './styles/admin.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* HashRouter (not BrowserRouter) on purpose: GitHub Pages is a
        static file host with no way to redirect an unknown path like
        /shop back to index.html, so a direct link or a page refresh on
        any route but "/" would 404. HashRouter keeps the route after a
        "#", which the browser never sends to the server at all — every
        URL genuinely requests "/", and React Router reads the part
        after "#" itself. Trade-off: URLs look like .../#/shop instead
        of .../shop. If you move this off GitHub Pages to a host that
        can rewrite unknown paths to index.html, switch back to
        BrowserRouter for cleaner URLs. */}
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
);
