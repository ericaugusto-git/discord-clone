import { useRouter } from 'next/navigation';

const useRedirectToDirect = () => {
    const router = useRouter();

    const redirectToDirect = (profileId: string) => {
        if (profileId) {
            router.push(`/directs/direct/${profileId}`);
        }
    };

    return { redirectToDirect };
};

export default useRedirectToDirect;
