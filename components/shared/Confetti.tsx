import Confetti from "react-confetti";

const Confett = () => {
  return (
    <div className="absolute top-0 left-0 z-10">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
      />
    </div>
  );
};

export default Confett;
