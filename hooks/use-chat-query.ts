import { useSocket } from "@/components/providers/socket-provider";
import { useInfiniteQuery } from "@tanstack/react-query";
import qs from "query-string";

interface ChatQueryProps {
    queryKey: string;
    apiUrl: string;
    paramKey: "channelId" | "directId";
    paramValue: string;
}

export const useChatQuery = (
    {queryKey, apiUrl, paramKey, paramValue}: ChatQueryProps
)=> {
    const { isConnected } = useSocket();
    // pageParam = message ID to be used as cursor
    const fetchMessages = async ({pageParam = undefined}) => {
        const url = qs.stringifyUrl({
            url: apiUrl,
            query: {
                cursor: pageParam,
                [paramKey]: paramValue
            }
        }, { skipNull: true });
        const res = await fetch(url);
        return res.json();
    };

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
    } = useInfiniteQuery({
        queryKey: [queryKey],
        queryFn: fetchMessages,
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        // starts polling if socket.io is off
        refetchInterval: isConnected ? false : 1000,
        initialPageParam: undefined
    })
  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
}