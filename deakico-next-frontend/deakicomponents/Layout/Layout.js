import Footer from "./Footer/Footer";
import Header from "./Header/index";


export default function Layout(props) {

  return (
    <>
      <Header/>
        {props.children}
      <Footer/>
    </>
  );
}