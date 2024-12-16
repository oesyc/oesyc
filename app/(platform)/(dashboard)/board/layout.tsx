import { Navbar } from "./_components/navbar";
import Sidebar from "./_components/sidebar";
import SmSidebar from "./_components/smSidebar";
const OrganizationLayout = ({ children }: {
    children: React.ReactNode;
}) => {
    return (
        <main className="pt-[58px] bg-gradient-to-tr from-blue-600 to-pink-600 min-h-screen">
            <Navbar/>
            <div className="flex">
                <div className="fixed w-[200px] shrink-0 left-0 h-full border-r border-[#E6DFFC]">
                    <Sidebar/>
                </div>
                <div className="fixed mt-14 mr-5 ml-[200px] border border-[#E6DFFC]">
                    <SmSidebar/>
                </div>
                <div  className="w-full pl-[235px] overflow-x-auto">
                {children}
                </div>
            </div>
        </main>
    );
};
export default OrganizationLayout;