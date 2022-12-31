import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import AlertComponent from "./Components/AlertComponent";
import CompareButton from "./Components/CompareButton";
import { useTheme } from "./Context/ThemeContext";
import ComparePage from "./Pages/ComparePage";
import HomePage from "./Pages/HomePage";
import UserPage from "./Pages/UserPage";
import { GlobalStyles } from "./Styles/global";

function App() {
  const {theme} = useTheme();
  return (
   <ThemeProvider theme={theme}>
    <GlobalStyles/>
    <AlertComponent />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/user" element={<UserPage />} />
        <Route path='/compare/:username' element={<ComparePage/>} />
      </Routes>
  </ThemeProvider>
  );
}

export default App;
