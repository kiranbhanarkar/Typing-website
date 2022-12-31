import { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import Footer from "../Components/Footer";
import TypingBox from "../Components/TypingBox";
import { useTheme } from "../Context/ThemeContext";
import { GlobalStyles } from "../Styles/global";
import { auth } from "../firebaseConfig";
import Header from "../Components/Header";

var randomWords =  require('random-words');

const HomePage = () => {
  
    const {theme} = useTheme();
    const words = randomWords(100);
     //console.log(process.env)
    // useEffect(()=>{
    //   console.log("theme in app", theme);
    // },[theme]);
  
    return (
  
     
        <div className="canvas">
          
          <Header />
          <TypingBox words={words}/>
          <Footer/>
        </div>
   
  );
}

export default HomePage