import { redirect } from "next/navigation";

const SetupPage = async () => {
    // const profile = await initialProfile();
    
    
    // const server = await db.server.findFirst({
    //     where: {
    //         members:{
    //             some: {
    //                 profileId: profile.id
    //             }
    //         }
    //     }
    // })
    
    // if(server){
    //     return redirect('/servers/' + server.id);
    // }
    return redirect('/directs')
    // return ( 
    //     <InitialModal/>
    //  );
}
 
export default SetupPage;