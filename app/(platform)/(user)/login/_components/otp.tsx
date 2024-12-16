import { useState } from "react";
import { toast } from "sonner";

interface OtpProps {
    generatedOtp: string | null;
    email: string | null;
}
const Otp = ({ generatedOtp, email }: OtpProps) => {
    const [otp, setOtp] = useState("");
    const handleOtpSubmit = async (event: any) => {
        event.preventDefault();
        if (otp === generatedOtp) {
            try {
                const response = await fetch("/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                });

                const result = await response.json();

                if (response.ok) {
                    localStorage.setItem('userDetails', JSON.stringify(result.userDetails));
                    window.location.href = "/select-org";
                } else {
                    toast.error("login failed")
                }
            } catch (error) {
                toast.error("login failed")
            } // Replace with your desired redirect URL
        } else {
            alert('Invalid OTP. Please try again.');
        }
    };
    return (
        <div className="flex items-center justify-center p-11 bg-gradient-to-r from-[#6432FF] to-[#EC0BE9] h-full rounded-lg">
            
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm bg-opacity-20">
                <h2 className="text-2xl font-semibold mb-6 text-center">Enter OTP</h2>
                <form onSubmit={handleOtpSubmit} className="flex flex-col space-y-4">
                    <label className="block text-gray-700 font-medium">
                        OTP (6 characters):
                        <input
                            type="text"
                            placeholder="Enter 6-character OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="mt-2 block w-full border border-gray-300 rounded-lg p-2 bg-[#f2f2ff] focus:border-blue-500 focus:outline-none"

                            required
                        />
                    </label>
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-none font-semibold hover:bg-blue-600 transition duration-200"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};
export default Otp;