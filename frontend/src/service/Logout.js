
import useUserStore from "../store/userStore"
import attractionStore from "../store/attractionStore";

const logoutService = async () => {

    const { clearUser } = useUserStore.getState()
    clearUser();
    const { resetAttractionList } = attractionStore.getState()
    resetAttractionList();
}

export default logoutService;