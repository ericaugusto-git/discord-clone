

import Sidebar from "@/components/navigation/sidebar";

const MainLayout = ({children}: {children: React.ReactNode}) => {

    return ( 
        <div className="h-[100dvh] flex p-5 relative gap-bento-gap">
            <div className="hidden md:flex h-full w-[72px] z-30 flex-col bento-items ">
               <Sidebar></Sidebar>
            </div>
            <main className="size-full">
            {children}
            </main>
            <div className="absolute inset-1 rounded-bento-wrapper-radius border-[7px] dark:border-[#232323] border-[#e7e7e7] -z-10"></div>
        </div>
     );
}
 
export default MainLayout;