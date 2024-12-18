import Footer from "../_components/footer";
import { Navbar } from "../_components/navbar";

const MarketingLayout = ({
    children
}:{
    children: React.ReactNode;
}) => {
  return(
    <div className="h-full">
        <Navbar/>
        <main className="">
        {children}
        </main>
        <Footer/>
    </div>

  );
}
export default MarketingLayout;