import {createContext} from 'react';

const PreferencesContext = createContext({
 // estado del theme
  theme: '',
  // funcion para poder cambiar de theme
  toggleTheme: () => {},
});

export default PreferencesContext;