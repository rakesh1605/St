import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/HighlightText";
import CTAButtton from "../components/Button";
import Banner from "../assets/Images/banner.mp4";
import Codeblocks from "../components/Codeblocks";
import Timelinesection from "../components/Timelinesection";
import LearningLanguageSection from "../components/LearningLanguageSection";
import Instuctersection from "../components/Instuctersection";
import Footer from "../components/common/Footer";
import ExploreMore from "../components/ExploreMore";
import ReviewSlider from "../components/common/ReviewSlider";
const Home = () => {
  return (
    <div>
      {/*Section1*/}
      <div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between max-w-maxContent">
        <Link to={"/signup"}>
          <div className=" group: mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblack-900">
              <p>Become an instructer</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>
        <div className="text-centre text-4xl font-semibold mt-7">
          Empower Your Future with
          <HighlightText text={"Coding Skils"}></HighlightText>
        </div>
        <div className=" mt-4 w-[90%] text-center text-lg font-bold text-richblack-300 ">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>
        <div className="flex flex-row gap-7 mt-8">
          <CTAButtton active={true} linkto={"/signup"}>
            Learn More
          </CTAButtton>
          <CTAButtton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButtton>
        </div>
        <div className=' " w-[70%] h-[70%] mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200"'>
          <video
            muted
            loop
            autoPlay
            className="shadow-[20px_20px_rgba(255,255,255)]"
          >
            <source src={Banner} type="video/mp4"></source>
          </video>
        </div>
        {/* code section1 */}
        <div>
          <Codeblocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock your
                <HighlightText text={"coding potential"} /> with our online
                courses.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            codeColor={"text-yellow-25"}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>
        {/* codesection2 */}
        <div className="mt-6">
          <Codeblocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock your
                <HighlightText text={"coding potential"} /> with our online
                courses.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            codeColor={"text-yellow-25"}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>
        <ExploreMore/>
      </div>
      {/*Section2*/}
      <div className="bg-pure-greys-5 text-richblack-700 mt-8">
        <div className="homepage_bg h-[310px] ">
          <div className="w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto justify-between">
            <div className="h-[140px]"></div>
            <div className="flex flex-row gap-7 text-white ">
              <CTAButtton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  Explore full Catalog
                  <FaArrowRight />
                </div>
              </CTAButtton>
              <CTAButtton active={false} linkto={"/signup"}>
                <div>Learn More</div>
              </CTAButtton>
            </div>
          </div>
        </div>
        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mt-[130px]">
          <div className="flex flex-row gap-5">
            <div className="text-4xl font-semibold w-[45%] ml-16">
              Get the Skills you nedd for a
              <HighlightText text={"Job that is in demand"} />
            </div>
            <div className="flex flex-col gap-10 w-[40%] items-start">
              <div className="text-[16px] ">
                The modern studyNotion is the dicates its own terms to bea
                competitive specialist requires more than professional skills
              </div>
              <CTAButtton active={true} linkto={"/signup"}>
                <div>Learn more</div>
              </CTAButtton>
            </div>
          </div>

          <Timelinesection />
          <LearningLanguageSection />
        </div>
      </div>
      <div className=" mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        
        <Instuctersection />
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
       <ReviewSlider />
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
