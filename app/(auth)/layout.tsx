import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen border-2 border-red-500 ">
      <section className=" bg-red-500 p-10 border-3 border-green-500  ">
        <Image src="/logo.png" alt="logo" width={50} height={50} />

        <div className="space-y-5 text-white">
          <h1 className="">Manage your files the best way</h1>
          <p className="body-1">
            This is a place where you can manage your files in the best way
            possible.
          </p>
        </div>
        <Image src="/logo.png" alt="logo" width={50} height={50} className="" />
      </section>
      {children}
    </div>
  );
};

export default Layout;
