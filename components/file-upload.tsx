import { UploadDropzone } from "@/lib/uploadthing";
import { FileIcon, X } from "lucide-react";
import Image from "next/image";

type FIleUploadProps = {
    endpoint: "serverImage" | "messageFile",
    onChange: (url?: string) => void,
    value: string
}

const FileUpload = ({onChange, value, endpoint}: FIleUploadProps) => {
    const fileType = value?.split('.').pop();
    if(value && fileType != 'pdf'){
        return (
            <div className="relative flex items-center justify-center h-20 w-20">
                <Image
                fill
                className="rounded-full"
                src={value}
                alt=""
                />  
                <button
                onClick={() => onChange("")}
                className="bg-rose-500 text-white p-0.5 white rounded-full absolute top-0 right-0
                shadow-sm" type="button"
                >
                    <X/>
                </button>              
            </div>
        )
    }
    if(value && fileType === "pdf"){
       return <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
            <FileIcon className="h-10 2-10 fill-indigo-200 stroke-indigo-400"/>
            <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
            >
                {value}
            </a>
            <button
                onClick={() => onChange("")}
                className="bg-rose-500 text-white p-1 white rounded-full absolute -top-2 -right-2
                shadow-sm" type="button"
                >
                    <X/>
                </button>    
        </div>
    }
    return ( 
    <UploadDropzone
    endpoint={endpoint}
    onClientUploadComplete={(res) => {
        console.log(res?.[0].url);
        onChange(res?.[0].url)
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
    />
    );
}
 
export default FileUpload;