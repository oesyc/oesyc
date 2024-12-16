
import HeadingSlider from "../_components/customSlider";
import Slider from "../_components/slider";
import TestimonialSlider from "../_components/testimonialSlider";

const MarketingPage = () => {
  return (
    <div className="flex items-center justify-center flex-col md:max-w-screen-2xl">
      <div className="w-full min-h-[130vh] bg-gradient-to-r from-[#6432FF] to-[#EC0BE9] relative flex flex-col items-center justify-top text-center p-8 pt-32 overflow-hidden">
        {/* Top Right Half-Circle */}
        <div className="absolute top-[-100px] right-[-100px] w-[250px] h-[250px] bg-[#6432FF] rounded-full flex items-center justify-center">
          <div className="w-[150px] h-[150px] bg-[#EC0BE9] rounded-full"></div>
        </div>

        {/* Bottom Left Half-Circle */}
        <div className="absolute bottom-[-100px] left-[-100px] w-[250px] h-[250px] bg-[#EC0BE9] rounded-full flex items-center justify-center">
          <div className="w-[150px] h-[150px] bg-[#6432FF] rounded-full"></div>
        </div>

        {/* Center Content */}
        <h1 className="text-white text-5xl font-bold mb-4">Streamline Your Projects,<br /> Empower Your Team</h1>
        <p className="text-white text-lg mb-6">From planing to execution, manage every aspect of your<br />project seamlessly with OESYC, Designed for efficiency<br />Built for productivity .</p>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button className="px-6 py-2 bg-transparent text-white rounded-none border border-white">Start Free Trail</button>
          <button className="px-6 py-2 bg-[#6432FF] text-white rounded-none">Login</button>
        </div>
      </div>
      <div className="w-2/3 mx-auto relative bg-cover bg-center p-8 top-[-270px]" style={{ backgroundImage: 'url("/hero.png")', height: '500px' }}>

        {/* Top Left Square with Gradient Background and Heading */}
        <div className="absolute top-[-25px] left-32 w-[200px] h-24 bg-gradient-to-br from-[#EC0BE9] to-[#6432FF] flex items-center justify-center overflow-hidden">
          <h2 className="text-white font-light text-center">PowerFull integration</h2>
        </div>

        {/* Top Right Square with Gradient Background and Heading */}
        <div className="absolute top-5 right-[-70px] w-[200px] h-24 bg-gradient-to-br from-[#EC0BE9] to-[#6432FF] flex items-center justify-center">
          <h2 className="text-white font-light text-center">Flexible task management</h2>
        </div>

        {/* Bottom Left Square with Gradient Background and Heading */}
        <div className="absolute bottom-40 left-[-40px] w-[200px] h-24 bg-gradient-to-br from-[#EC0BE9] to-[#6432FF] flex items-center justify-center">
          <h2 className="text-white font-light">Realtime Collaburation</h2>
        </div>

        {/* Bottom Right Square with Gradient Background and Heading */}
        <div className="absolute bottom-7 right-[-70px] w-[200px] h-24 bg-gradient-to-br from-[#6432FF] to-[#EC0BE9] flex items-center justify-center">
          <h2 className="text-white font-light">Customizable Workflow</h2>
        </div>
      </div>
      <div className="flex items-center justify-center mt-[-200px]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-[#6532FF] to-[#EA0CEA] bg-clip-text text-transparent">
            AI at the core of Oesyc<br />Work smarter not harder
          </h1>
          <p className="text-black text-center text-light">
            Leverage the power of AI to predict deadlines, automate repetive<br />
            task and gain insights into your projects health in real time.
          </p>

        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <HeadingSlider />
      </div>
      <div className="w-full min-h-screen bg-gradient-to-r from-[rgba(220,235,254)] to-[rgba(236,11,233,0.35)] relative flex flex-col items-center justify-top text-center p-8 pt-32 overflow-hidden">
        {/* Top Right Half-Circle */}
        <div className="absolute top-[-100px] left-[-100px] w-[250px] h-[250px] bg-[rgba(224,214,255)] rounded-full flex items-center justify-center">
          <div className="w-[150px] h-[150px] bg-[rgba(220,235,254)] rounded-full"></div>
        </div>

        {/* Bottom Left Half-Circle */}
        <div className="absolute bottom-[-100px] right-[-100px] w-[250px] h-[250px] bg-[rgba(100,50,255,0.10)] rounded-full flex items-center justify-center">
          <div className="w-[150px] h-[150px] bg-[rgba(224,214,255)] rounded-full"></div>
        </div>

        {/* Center Content */}
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-[#EA0CEA] to-[#6532FF] bg-clip-text text-transparent">Powerfull Feature Built to<br /> Simplify Project Management</h1>
        <p className="text-black text-medium mb-6">From planing to execution, manage every aspect of your<br />project seamlessly with OESYC, Designed for efficiency<br />Built for productivity .</p>

        <Slider />
      </div>
      <div className="mt-12">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-[#6532FF] to-[#EA0CEA] bg-clip-text text-transparent">
          Why Choose Oesyc
        </h1>
        <p className="text-black text-center text-light">
          Oesyc empowers team to rach thier goals faster collaburate<br />
          seamlesly, and make smarter decisions
        </p>
      </div>
      <div className="flex items-center justify-center w-4/5 space-x-4 mt-5">
        <div className="flex flex-col bg-[#F2F2FF] items-center justify-center p-8">
          <h3 className="text-md text-black font-bold">
            Increased Productivity with AI-Powered Automation
          </h3>
          <p className="text-black font-light text-center text-sm mt-2">
            Increased productivity with AI-powered automation refers to the use of artificial intelligence to streamline and optimize tasks, reducing manual effort and errors.
          </p>
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-3 rounded-none text-white mt-4">
            <p className="text-sm text-white text-center">Teams report a 20% reduction in time spent on task management, leading to heigher productivity</p>
          </div>
        </div>
        <div className="flex flex-col bg-[#F0F8FF] items-center justify-center p-8">
          <h3 className="text-md text-black font-bold">
            Enhance Collaburation and Comunication
          </h3>
          <p className="text-black font-light text-center text-sm mt-2">
            AI-powered platforms can automate meeting scheduling, transcribe conversations, analyze communication patterns, and even provide real-time language translation
          </p>
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-3 rounded-none text-white mt-4">
            <p className="text-sm text-white text-center">This helps teams work more seamlessly across time zones and locations, ultimately boosting productivity</p>
          </div>
        </div>
      </div>
      {/* second */}
      <div className="flex items-center justify-center w-4/5 space-x-4 mt-5">
        <div className="flex flex-col bg-[#FFF2FE] items-center justify-center p-8">
          <h3 className="text-md text-black font-bold">
            Customizable Workflow To Fit Your Team Needs
          </h3>
          <p className="text-black font-light text-center text-sm mt-2">
            Customizable workflows allow teams to tailor processes and tasks to their specific needs, ensuring greater efficiency and alignment with goals.
            AI-driven tools..
          </p>
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-3 rounded-none text-white mt-4">
            <p className="text-sm text-white text-center">This flexibility empowers teams to optimize their operations, reduce bottlenecks, and maintain focus on high-priority tasks</p>
          </div>
        </div>
        <div className="flex flex-col bg-[#F2F2FF] items-center justify-center p-8">
          <h3 className="text-md text-black font-bold">
            Data-Driven Insights For Better Decision-Making
          </h3>
          <p className="text-black font-light text-center text-sm mt-2">
            Data-driven insights empower teams and organizations to make informed decisions based on real-time data analysis. By leveraging AI and advanced analytics This..
          </p>
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-3 rounded-none text-white mt-4">
            <p className="text-sm text-white text-center">With accurate, actionable information at their fingertips, leaders can drive growth, optimize processes.</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center pt-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-[#6532FF] to-[#EA0CEA] bg-clip-text text-transparent">
            Team Love Working With Oesyc
          </h1>
          <p className="text-black text-center text-light">
            See how Oesyc empowers team to work smarter and acheive more
          </p>
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <TestimonialSlider />
      </div>


      <div className="w-full h-[250px] relative bg-gradient-to-r from-[#6432FF] to-[#EC0BE9] overflow-hidden">
        {/* Background Shape */}
        <div className="absolute inset-0 overflow-hidden">
          <svg
            className="absolute top-0 left-0 w-full h-full"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M0,30 C50,50 50,10 100,20 L100,0 L0,0 Z"
              fill="rgba(255,255,255,0.2)"
            />
          </svg>
        </div>

        {/* Shapes */}
        <div className="absolute bottom-[-100px] right-[-100px] w-[250px] h-[250px] bg-[#6432FF] rounded-full flex items-center justify-center">
          <div className="w-[150px] h-[150px] bg-[#EC0BE9] rounded-full"></div>
        </div>

        <div className="absolute top-[-100px] left-[-100px] w-[180px] h-[180px] bg-[#48B9F9] rounded-full flex items-center justify-center">
          <div className="w-[150px] h-[150px] bg-[#6432FF] rounded-full"></div>
        </div>

        {/* Centered Form */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <h2 className="text-3xl font-semibold mb-4">Subscribe to Our Newsletter</h2>
          <form className="space-x-2 flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-5 rounded-none text-White focus:outline-none bg-transparent border border-white"
            />
            <button
              type="submit"
              className="bg-white text-[#6432FF] py-3 px-6 rounded-none hover:bg-yellow-400 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>


    </div>
  );
}
export default MarketingPage;