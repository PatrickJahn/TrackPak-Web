import Lottie from "lottie-react";
import LoadingTruck from "@/assets/LoadingTruck.json";

const LoadingView = () => {
  return (
    <div className="w-full  h-screen flex bg-white dark:bg-dark-paper pt-36">
      <div className="w-fit mx-auto">
        <Lottie
          animationData={LoadingTruck}
          loop={true}
          className="w-[28rem] "
          autoplay
        />
        <div className="text-center">
          <p className="animate-pulse text-xl text-blue-500">Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingView;
