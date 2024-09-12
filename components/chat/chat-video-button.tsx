"use client";

import { PhoneCall, Video } from "lucide-react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import ActionTooltip from "../action-tooltip";
import { useSocket } from "@/components/providers/socket-provider";
import { useCurrentProfile } from "@/components/providers/profile-provider";

const ChatVideoButton = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { socket } = useSocket();
  const {profile} = useCurrentProfile()
  const searchParams = useSearchParams();
  const params = useParams();
  const isVideo = searchParams?.get("video");
  const isAudio = searchParams?.get("audio");

  const tooltipLabelVideo = isVideo ? "End video call" : "Start video call";
  const tooltipLabelPhone = isAudio ? "End audio call" : "Start audio call";

  const onClick = (video?: boolean) => {
    socket.emit('incoming_call', {receiverId: params?.profileId, type: video ? "video" : "audio"})
    console.log(params)
    const url = qs.stringifyUrl(
      {
        url: pathname || "",
        query: {
          [video ? "video" : "audio"]: (video ? isVideo : isAudio)
            ? undefined
            : true,
        },
      },
      { skipNull: true }
    );
    router.push(url);
  };

  return (
    <div className="flex items-center gap-2">
      <ActionTooltip side="bottom" label={tooltipLabelPhone}>
        <button onClick={() => onClick()} className="hover:opacity-75 transition mr-4">
          <PhoneCall className="size-5 text-zinc-500 dark:text-zinc-400" />
        </button>
      </ActionTooltip>
      <ActionTooltip side="bottom" label={tooltipLabelVideo}>
        <button onClick={() => onClick(true)} className="hover:opacity-75 transition mr-4">
          <Video className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
        </button>
      </ActionTooltip>
    </div>
  );
};

export default ChatVideoButton;
