import { checkSubscription } from "@/lib/subscription";
import { Info } from "./_components/info";
import { SubscriptionButton } from "./_components/subscription-button";
import { Separator } from "@/components/ui/separator";
import AiToggle from "./_components/ai-toggle";

const OrgSettings = async () => {

    const isPro = await checkSubscription();



    return (
        <div className="w-full">
            <div>
                <Info />
            </div>
            <div className="mt-3 flex justify-between items-center mr-8 mb-2">
                <h1 className="text-black text-3xl font-light">Organization Setting</h1>
                <SubscriptionButton isPro={isPro} />
            </div>
            <Separator />
            <div className="mt-3 flex justify-between items-start w-2/3">
                <div>
                    <h1 className="text-black text-sm font-light">OESYC AI</h1>
                    <p className="text-slate-500 text-sm">AI will help you on every step.Dont bother yourself.<br /> This AI will make board and tasks acording to your Plans.</p>
                </div>
                <AiToggle isPro={isPro} />
            </div>
            <div className="mt-3 flex justify-between items-start w-2/3">
                <div>
                    <h1 className="text-black text-sm font-light">WorkSpace Visibilty</h1>
                    <p className="text-slate-500 text-sm">refers to the settings and configurations that control<br /> who can see, access, and interact with the various elements within a workspace.</p>
                </div>
                <form>
                    <select className="block w-full p-2 border border-gray-300 rounded-md shadow-sm">
                        <option value="private" className="text-gray-700">Private</option>
                        <option value="public" className="text-gray-700">Public</option>
                    </select>
                </form>
            </div>
            <div className="mt-3 flex justify-between items-start w-2/3">
                <div>
                    <h1 className="text-black text-sm font-light">Boards</h1>
                    <p className="text-slate-500 text-sm">Who have all access about Boards e.g Delete Boards, <br />Create boards or add something In Boards</p>
                </div>
                <form>
                    <select className="block w-full p-2 border border-gray-300 rounded-md shadow-sm">
                        <option value="user" className="text-gray-700">User</option>
                        <option value="member" className="text-gray-700">Member</option>
                    </select>
                </form>
            </div>
            <div className="mt-4">
                <button className="bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                    Delete
                </button>
            </div>

        </div>
    );
};

export default OrgSettings;
