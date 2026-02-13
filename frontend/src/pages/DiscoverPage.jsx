import SearchForm from "../components/SearchForm"

export default function DiscoverPage() {
    return (
        <main className="h-screen py-[150px]">
            <div className="w-full sm:w-3/4 mx-auto flex items-center justify-center">
                <SearchForm />
            </div>
        </main>
    )
}