import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="flex flex-col gap-5 items-center animate-pulse">
        <Image
          height={100}
          width={100}
          alt="Logo"
          className=""
          src="/images/logo.svg"
        />
        <span className="text-3xl text-primary-title font-semibold">
          Support Coordinator
        </span>
      </div>
    </div>
  );
}
