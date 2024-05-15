import AdminNav from "./admin-nav/page";

export default function AdminLayout({ children }) {
    return (
        <div className=" flex flex-row justify-start gap-24">
            <AdminNav />
          
                <div className="md:me-28 me-2 flex flex-col justify-center items-center ">
                    <h1 className="text-red-600 font-bold text-3xl uppercase underline pt-10">
                        Admin panel
                    </h1>
                    {children}
                </div>
          
        </div>
    );
}
