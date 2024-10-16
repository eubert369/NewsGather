import React, { useCallback, useEffect } from "react";
import Image from "next/image";

function SearchModal({
  closeModal,
}: {
  closeModal: (vallue: boolean) => void;
}) {
  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal(false);
      }
    },
    [closeModal]
  );

  useEffect(() => {
    document.addEventListener("keyup", handleEscape);
  }, [handleEscape]);

  return (
    <div className="z-30 absolute w-full h-full bg-[#000000a4] flex justify-center items-center">
      <div className="bg-white w-2/5 h-96 max-h-96 rounded-[25px] flex flex-col">
        <div className="flex justify-between px-[25px] pt-[25px] pb-[15px] border-b border-[#8A8A8A]">
          <div className="w-full flex gap-[10px]">
            <div className="w-[25px] h-[25px] relative">
              <Image
                fill
                sizes="100%"
                src={"/assets/search-icon.svg"}
                alt="image"
              />
            </div>
            <input
              className="w-full outline-none text-black"
              placeholder="Search news, articles, and etc."
            />
          </div>
          <button
            onClick={(): void => closeModal(false)}
            className="text-[#646464] text-sm border border-[#646464] px-[10px] py-[5px] h-fit w-fit rounded-[10px] hover:border-black hover:text-black hover:font-semibold"
          >
            Esc
          </button>
        </div>
        test
      </div>
    </div>
  );
}

export default SearchModal;
