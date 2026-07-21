const KlarnaBanner = () => {
  return (
    <section className="w-full">
      <div className="flex justify-center items-center overflow-hidden">
        <img
          src="/images/Klarna.jpeg"
          alt="Construction worker holding a CSCS card with Klarna payment option"
          className="w-full max-w-[500px] h-auto block rounded-xl"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>
    </section>
  );
};

export default KlarnaBanner;