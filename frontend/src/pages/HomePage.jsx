import SearchForm from "../components/SearchForm";

export default function HomePage() {

    return (
        <div className="h-screen w-screen lg:grid lg:grid-cols-[1.5fr_1fr]">
            <div className="w-full h-full bg-[#EBECF1] flex justify-center items-center">
              <SearchForm />
            </div>

            <div className="hidden lg:block background">

            </div>
        </div>
    )
}