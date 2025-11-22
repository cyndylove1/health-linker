import Image from "next/image";
import cover from "../../../public/Frame 2147226126.png";


export default function Cover() {
  return (
    <>
      <div className="fixed left-0 top-0 w-1/2 h-full hidden lg:flex">
        <Image
          src={cover}
          alt="cover-image"
          width={697}
          height={869}
          className="object-cover w-full h-full"
        />
      </div>
    </>
  );
}
