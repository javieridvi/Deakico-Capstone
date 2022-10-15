import Footer from "./Footer/Footer";
import Header from "./Header";


export default function Layout(props) {

  return (
    <>
      <Header/>
        {props.children}
      <Footer/>
    </>
  );
}