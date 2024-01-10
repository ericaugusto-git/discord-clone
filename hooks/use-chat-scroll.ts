import { useEffect, useState } from "react";

type ChatScrollProps = {
    chatRef: React.RefObject<HTMLDivElement>;
    bottomRef: React.RefObject<HTMLDivElement>;
    shouldLoadMore: boolean;
    loadMore: () => void;
    count: number;
};

export const useChatScroll = (
    {
        chatRef,
        bottomRef,
        shouldLoadMore,
        count,
         loadMore
    }: ChatScrollProps) => {
    const [hasInitialized, setHasInitialized] = useState(false);

    useEffect(() => {
        const topDiv = chatRef?.current

        const handdleScroll = () => {
            const scrollTop = topDiv?.scrollTop;

            if(scrollTop === 0 && shouldLoadMore){
                loadMore();
            }
        }

        topDiv?.addEventListener("scroll", handdleScroll);
        return () => {
            topDiv?.removeEventListener("scroll", handdleScroll);
        }
    }, [shouldLoadMore, loadMore, chatRef]);



    useEffect(() => {
        const bottomDiv = bottomRef?.current;
        const topDiv = chatRef.current;
        console.log("use effect")
        const shouldAutoScroll = () => {
            if(!hasInitialized && bottomDiv){
                setHasInitialized(true);
                return true;
            }

            if(!topDiv){
                return false;
            }

            const distanceFromBottom = topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight;
            return distanceFromBottom <= 100;
        }
        const shouldScroll = shouldAutoScroll();
        console.log(shouldScroll)
        if(shouldScroll){
            setTimeout(() => {
            bottomRef.current?.scrollIntoView({
                behavior: "smooth"
                    });   
            }, 100)
        }
    }, [bottomRef, chatRef, count, hasInitialized])
}