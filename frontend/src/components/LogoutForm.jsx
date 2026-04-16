

export default function LogoutForm () {
    return (
        <form className="w-full md:w-1/3 h-auto bg-[#EBECF1] place-self-center p-8">
            <h1 className="text-sm md:text-md lg:text-lg xl:text-2xl">Are you sure you want to logout?</h1>
            <div className="grid grid-cols-2">
                <button className="w-full bg-[#8E1616] p-2 rounded-xl">
                    Confirm
                </button>
                <button>
                    Cancel
                </button>
            </div>
        </form>
    )
}