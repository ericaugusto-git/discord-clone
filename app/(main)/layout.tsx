

import Sidebar from "@/components/navigation/sidebar";

const MainLayout = ({children}: {children: React.ReactNode}) => {
    // const currentChat = useCurrentChat((state) => state.currentChat);
    // console.log(currentChat);
    return ( 
        <div className="h-[100dvh] flex p-9 relative gap-bento-gap">
            <div className="hidden md:flex h-full w-[72px] z-30 flex-col bento-items ">
               <Sidebar></Sidebar>
            </div>
            <main className="h-full w-full">
            {children}
            </main>
            <div className="absolute inset-4 rounded-bento-wrapper-radius border-2 border-[#747474] -z-10"></div>
        </div>
     );
}
 
export default MainLayout;