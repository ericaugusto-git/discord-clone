

import Sidebar from "@/components/navigation/sidebar";
import BackgroundImage from "@/components/ui/background-image";
import Image from "next/image";

const MainLayout = ({children}: {children: React.ReactNode}) => {

    return ( 
        <div className="h-[100dvh] flex p-5 relative gap-bento-gap">
                <div className="flex h-full w-[72px] z-30 flex-col bento-items ">
                <Sidebar></Sidebar>
                </div>
                <main className="size-full flex flex-col gap-bento-gap">
                    {children}
                    {/* <div className="w-full h-28 bg-bento-item flex md:hidden rounded-bento-item-radius  items-center px-10 justify-between">
                            <div className="flex flex-col items-center">
                                <svg className="size-[20px] fill-white"  xmlns="http://www.w3.org/2000/svg" data-name="Layer 2" viewBox="0 0 35 35"><path d="M29.734 34.75h-7.156a1.25 1.25 0 0 1-1.25-1.25v-3.973a2.9 2.9 0 0 0-1.056-2.19 4.224 4.224 0 0 0-2.64-.987 4.127 4.127 0 0 0-2.932 1.127 3.19 3.19 0 0 0-1.025 2.275V33.5a1.25 1.25 0 0 1-1.25 1.25H5.266a3.136 3.136 0 0 1-3.132-3.132V13.324a5.949 5.949 0 0 1 2.455-4.806L14.9 1.065a4.494 4.494 0 0 1 5.2.018l10.332 7.542a5.949 5.949 0 0 1 2.434 4.79v18.2a3.136 3.136 0 0 1-3.132 3.135Zm-5.906-2.5h5.906a.632.632 0 0 0 .632-.632v-18.2a3.444 3.444 0 0 0-1.408-2.771L18.617 3.1a2.024 2.024 0 0 0-2.256-.007L6.054 10.544a3.441 3.441 0 0 0-1.42 2.78v18.294a.633.633 0 0 0 .632.632h5.906v-2.5a5.666 5.666 0 0 1 1.783-4.068 6.526 6.526 0 0 1 4.745-1.83 6.72 6.72 0 0 1 4.207 1.6 5.365 5.365 0 0 1 1.917 4.078Z"/></svg>
                                <span>Home</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <svg className="size-[28px] fill-white" xmlns="http://www.w3.org/2000/svg" data-name="Layer 2" viewBox="0 0 35 35"><path d="M29.81 31.3a2 2 0 0 1-.34 0l-2.81-.54a11.53 11.53 0 0 1-2.41.25c-5.7 0-10.34-4.17-10.34-9.29s4.64-9.29 10.34-9.29 10.35 4.14 10.35 9.26A8.76 8.76 0 0 1 31.82 28l-.17 1.62a1.85 1.85 0 0 1-1.84 1.66Zm-3.24-.59Zm.17 0Zm3.82-1.18Zm-3.91-1a2 2 0 0 1 .34 0l2.51.47.14-1.37a1.83 1.83 0 0 1 .58-1.15 6.58 6.58 0 0 0 2.18-4.82c0-3.91-3.65-7.09-8.15-7.09s-8.14 3.18-8.14 7.09 3.65 7.09 8.14 7.09a9 9 0 0 0 2-.22 1.72 1.72 0 0 1 .4-.01Z"/><path d="M6.26 26.15a1.83 1.83 0 0 1-.88-.23 1.86 1.86 0 0 1-1-1.59v-2.25a10.14 10.14 0 0 1-4-7.91C.4 8.32 5.75 3.56 12.32 3.56A12.09 12.09 0 0 1 23 9.39a1.1 1.1 0 1 1-1.91 1.09 9.91 9.91 0 0 0-8.73-4.72C7 5.76 2.6 9.53 2.6 14.17a8 8 0 0 0 3.25 6.28 1.81 1.81 0 0 1 .72 1.42v1.81l1.88-1.15a1.83 1.83 0 0 1 1.37-.22 10.71 10.71 0 0 0 1.38.22 1.1 1.1 0 1 1-.2 2.19 13.16 13.16 0 0 1-1.51-.24l-2.26 1.39a1.85 1.85 0 0 1-.97.28Z"/><circle cx="8.48" cy="12.17" r="1.24"/><circle cx="15.77" cy="12.17" r="1.24"/><circle cx="20.09" cy="19.2" r="1.08"/><circle cx="26.79" cy="19.2" r="1.08"/></svg>
                                <span>Directs</span>
                            </div>
                            <div className="flex flex-col items-center">
                            <svg className="fill-white size-[28px]" xmlns="http://www.w3.org/2000/svg" data-name="Layer 2" viewBox="0 0 35 35"><path d="M17.5 16.383a8.067 8.067 0 1 1 8.067-8.067 8.076 8.076 0 0 1-8.067 8.067Zm0-13.633a5.567 5.567 0 1 0 5.567 5.566A5.573 5.573 0 0 0 17.5 2.75ZM31.477 34.75a1.25 1.25 0 0 1-1.23-1.037A12.663 12.663 0 0 0 17.5 22.852 12.663 12.663 0 0 0 4.753 33.713a1.25 1.25 0 0 1-2.464-.426A15.1 15.1 0 0 1 17.5 20.352a15.1 15.1 0 0 1 15.211 12.935 1.25 1.25 0 0 1-1.02 1.444 1.2 1.2 0 0 1-.214.019Z"/></svg>                               
                            <span>Profile</span>
                            </div>
                    </div> */}
                </main>
        </div>
     );
}
 
export default MainLayout;



// import Sidebar from "@/components/navigation/sidebar";

// const MainLayout = ({children}: {children: React.ReactNode}) => {

//     return ( 
//         <div className="h-[100dvh] flex flex-col p-5 relative gap-bento-gap">
//             <div className="flex gap-bento-gap size-full">
//                 <div className="flex h-full w-[72px] z-30 flex-col bento-items ">
//                 <Sidebar></Sidebar>
//                 </div>
//                 <main className="size-full flex flex-col gap-bento-gap">
//                 {children}
//                 </main>
//             </div>
//             <footer className="w-full h-28 bg-bento-item rounded-bento-item-radius">

//             </footer>
//             <div className="absolute inset-1 rounded-bento-wrapper-radius border-[7px] dark:border-[#232323] border-[#e7e7e7] -z-10"></div>
//         </div>
//      );
// }
 
// export default MainLayout;