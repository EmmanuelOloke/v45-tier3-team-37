import { redirect } from 'next/navigation';
import BooksSkeleton from "@/components/BooksSkeleton";
import { lazy } from "react";
import { Suspense } from "react";
import { searchBooks } from "@/utils/fetcher";

export default async function Page ({
    searchParams
} : {
    searchParams: {
        search?: string;
        title?: string;
        author?: string;
        publisher?: string;
    }
}) {

    if(Object.keys(searchParams).length === 0) {
        redirect("/");
    }

    const books = await searchBooks(searchParams);

	if(!books) {
		return <h3>No books found with this search criteria. Please try again using another search input.</h3>
	}

    function delayView(promise: any) {
        return new Promise(resolve => {
            setTimeout(resolve, 1000);
        }).then(() => promise);
    }

    const BooksView = lazy(() => delayView(import("@/components/BooksView")));

    return (
        <Suspense fallback={<BooksSkeleton />}>
            <BooksView books={books}/>
        </Suspense>
    )
}