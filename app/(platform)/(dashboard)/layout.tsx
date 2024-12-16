import { Navbar } from "./board/_components/navbar";
function DashboardLayout({ children }: { children: React.ReactNode; }) {
    return (
        <div className="h-full">
            


            {children}
        </div>
    );

}
export default DashboardLayout;