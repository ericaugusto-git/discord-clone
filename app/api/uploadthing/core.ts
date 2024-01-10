import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
const handleAuth = () => {
    const { userId } = auth()
    if(!userId) throw new Error("Unauthorized");
    return {userId: userId}
} 

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    // Set permissions and file types for this FileRoute
    .middleware(() => handleAuth())
    .onUploadComplete(async ({ metadata, file }) => {
    //   console.log("Upload complete for userId:", metadata.userId);
 
    //   console.log("file url", file.url);
 
    //   return { uploadedBy: metadata.userId };
    }),
    messageFile: f(["image", "pdf", "video"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {})
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;