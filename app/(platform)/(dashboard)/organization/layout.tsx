import { Navbar } from "./components/navbar";
import Sidebar from "./components/sidebar";
import SmSidebar from "./components/smSidebar";
const OrganizationLayout = ({ children }: {
    children: React.ReactNode;
}) => {
    return (
        <main className="pt-[58px]">
            <Navbar/>
            <div className="flex">
                <div className="fixed w-[200px] shrink-0 bg-white left-0 h-full border-r border-[#E6DFFC]">
                    <Sidebar/>
                </div>
                <div className="fixed mt-5 mr-5 ml-[200px] border border-[#E6DFFC]">
                    <SmSidebar/>
                </div>
                <div  className="w-full pl-[250px]">
                {children}
                </div>
            </div>
        </main>
    );
};
export default OrganizationLayout;