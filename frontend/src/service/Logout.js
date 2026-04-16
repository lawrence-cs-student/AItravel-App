
import useUserStore from "../store/userStore"

const logoutService = async () => {

    const clearUser = useUserStore.getState.clearUser()
    clearUser();
}

export default logoutService;