import ReactLoading from "react-loading";

function Loader() {
  return (
    <>
      <div className="w-full h-full items-center flex flex-col justify-center">
        <div className="text-xs">Free render server might take some time</div>
        <ReactLoading type="spin" color="green" height={66} width={37} />
      </div>
    </>
  );
}

export { Loader };
