export default function Loading() {
  return (
    <>
      {" "}
      <div className="animate-pulse  mt-10 flex justify-center ">
        <div className="w-[80%] text-3xl text-gray-300">
          Fetching from chat gpt (this might take time please dont refresh...)
        </div>
      </div>
      <div className="animate-pulse flex justify-center items-center mt-2 flex-col">
        <div className="w-[80%]">
          <div className="mt-4 bg-gray-300 h-10 rounded-md " />
          <div className="mt-4 bg-gray-300 h-6 rounded-md " />{" "}
          <div className="mt-4 bg-gray-300 h-6 rounded-md " />
          <div className="mt-4 bg-gray-300 h-6 rounded-md " />
          <div className="flex flex-wrap gap-4 justify-between">
            <div className="mt-4 flex-1  min-w-[300px] flex items-center justify-center w-full h-72 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
              <svg
                className="h-[50%] text-gray-200"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 640 512"
              >
                <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
              </svg>
            </div>
            <div className="w-[70%] flex-1 min-w-[300px]">
              <div className="mt-4 bg-gray-300 h-6 rounded-md " />
              <div className="mt-4 bg-gray-300 h-6 rounded-md w-[90%]" />{" "}
              <div className="mt-4 bg-gray-300 h-6 rounded-md w-[80%]" />{" "}
              <div className="mt-4 bg-gray-300 h-6 rounded-md w-[70%]" />{" "}
              <div className="mt-4 bg-gray-300 h-6 rounded-md w-[60%]" />{" "}
              <div className="mt-4 bg-gray-300 h-6 rounded-md w-[50%]" />{" "}
              <div className="mt-4 bg-gray-300 h-6 rounded-md w-[40%]" />{" "}
            </div>
          </div>
          <div className="mt-4 bg-gray-300 h-6 rounded-md " />
          <div className="mt-4 bg-gray-300 h-6 rounded-md w-[90%]" />{" "}
          <div className="mt-4 bg-gray-300 h-6 rounded-md w-[75%]" />{" "}
          <div className="mt-4 bg-gray-300 h-6 rounded-md w-[50%]" />{" "}
        </div>
      </div>
    </>
  );
}
