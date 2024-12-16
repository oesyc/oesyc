
import { Info } from "../../components/info";
import Tabs from "./_components/tabs";



const MemberPage = () => {
    return (
        <div className="w-full">
            <div>
                <Info />
            </div>
            <h1 className="text-2xl font-semibold text-black mt-5">Collaborators</h1>
            <Tabs/>
        </div>
    );
};

export default MemberPage;
