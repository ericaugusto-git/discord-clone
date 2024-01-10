import Sidebar from "@/components/navigation/sidebar";

const MainLayout = ({children}: {children: React.ReactNode}) => {
    return ( 
        <div className="h-full">
            <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed">
               <Sidebar></Sidebar>
            </div>
            <main className="h-full md:pl-[72px]">
            {children}
            </main>
        </div>
     );
}
 
export default MainLayout;