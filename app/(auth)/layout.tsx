import ActionTooltip from "@/components/action-tooltip";
import BackgroundImage from "@/components/ui/background-image";

export default function AuthLayout({children}: {children: React.ReactNode}){
    return (
        <div className="h-full flex p-5 items-center">
            <div className="mx-auto z-10">
                {children}
            </div>
            
            <BackgroundImage src="/auth-layout/trendy-abstract-chrome-background-with-gradient-colors.jpg" size={'100%'} width={'50%'} className="rounded-bento-item-radius justify-between flex-col p-2  hidden lg:flex text-white">
            <a target="_blank" href="https://www.freepik.com/free-photo/trendy-abstract-chrome-background-with-gradient-colors_43059602.htm#fromView=search&page=14&position=29&uuid=2e7efc75-8fd8-4e14-8a89-d287a735f29e" className="border border-white/30 text-white/80 rounded-[19px] px-4 m-2 W hover:text-blue-300 cursor-pointer">
                Image by BiZkettE1 on Freepik
                </a>
                
            <div className="p-2 backdrop-blur-xl bg-white/5 rounded-b-[19px] rounded-t-xl w-full flex gap-2 flex-col">
                <h1 className="text-2xl">
                    Welcome to my fullstack project <span className="font-extrabold bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-[#929292] to-[#966ef2]">Discourse - Live Chat</span>
                </h1>
                <span>The authentication is here to prevent abuse and it&apos;s handled by <a className="text-blue-300" href="https://clerk.com" target="_blank">clerkjs.</a></span>
                <div className="flex items-center gap-2">
                <a href="https://github.com/ericaugusto-git/discord-clone" target="_blank" className="border rounded-full px-4 xsm:px-4 dark:bg-white bg-black text-white  dark:text-black p-2 hover:opacity-90 flex w-fit justify-center items-center gap-2">
                    <span style={{maskImage: `url("/icons/github.svg")`}} className="block size-[18px] bg-white dark:bg-black svgMask group-hover:opacity-80 cursor-pointer"></span>
                    project source code 
                </a>
                <span className="px-2">|</span>
                    {/* More about me: */}
                            <ActionTooltip side="bottom" align="center" label="my website">
                                <a href="https://ericaugusto.pages.dev"  target="_blank" className='group'><span style={{maskImage: `url("/icons/globe.svg")`}} className="block mx-auto size-[18px] bg-white svgMask group-hover:opacity-80 cursor-pointer"></span> </a>
                            </ActionTooltip>
                            <ActionTooltip side="bottom" align="center" label="my linkedin">
                                <a href="https://www.linkedin.com/in/eric-augusto-775245a9/"  target="_blank" className='group'><span style={{maskImage: `url("/icons/linkedin.svg")`}} className="block mx-auto size-[18px] bg-white svgMask group-hover:opacity-80 cursor-pointer"></span> </a>
                            </ActionTooltip>
                </div>

            </div>
            </BackgroundImage>
        </div>
    )
}