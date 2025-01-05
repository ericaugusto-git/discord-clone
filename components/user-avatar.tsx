import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
    src?: string | undefined;
    className?: string;
    name: string | undefined;
}

const UserAvatar = ({src, name, className}: UserAvatarProps) => {
    const initials = name?.slice(0, 2)?.toUpperCase() || 'U';
    return ( 
        <Avatar className={cn("size-7 md:size-10", className)}>
            <AvatarFallback>{initials}</AvatarFallback>
            <AvatarImage src={src}/>
        </Avatar>
     );
}
 
export default UserAvatar;