export const isLogin = () => {
    if (localStorage.getItem("accessToken")) {
        return true;
    }

    return false;
}