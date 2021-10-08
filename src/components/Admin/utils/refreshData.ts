import router from 'next/router'

export const refreshData = () => {
    router.replace(router.asPath);
};