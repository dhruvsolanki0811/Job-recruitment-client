import ReactLoading from "react-loading";

function Loader({message='Free render server might take some time'}:{message?:string}) {
  return (
    <>
      <div className="w-full h-full items-center  flex flex-col justify-center items-center">
        <ReactLoading type="spinningBubbles" color="green" height={66} width={37} />
        <div className="text-[13px]">{message}</div>
      </div>
    </>
  );
}

export { Loader };
