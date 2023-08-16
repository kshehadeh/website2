import { allPosts } from "@/.contentlayer/generated";
import Link from "next/link";

function buildDescription(body: string): string {   
    // remove headers and empty lines.       
    const description = body.split('\n').filter((line: string) => !line.trim().startsWith('#')).join('\n');
    return description.length > 255 ? `${description.substring(0, 255)}...` : description;
}

function compareDates(a: string, b: string) {
    const dateA = new Date(a);
    const dateB = new Date(b);

    if (dateA > dateB) {
        return -1;
    }
    if (dateA < dateB) {
        return 1;
    }
    return 0;
}

export default function Home() {
    return (
        <div className="prose dark:prose-invert">
            {allPosts
                .sort((a, b) => compareDates(a.date, b.date))
                .map((post) => (
                    <article key={post._id}>
                        <Link href={post.slug}>
                            <h2>{post.title}</h2>
                        </Link>
                        {<p>{post.description ?? buildDescription(post.body.raw)}</p>}
                    </article>
                ))}
        </div>
    );
}
