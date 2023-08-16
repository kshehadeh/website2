import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { allPages } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";
import type { MDXComponents } from "mdx/types";
import IconAndText from "@/components/IconAndText";

interface PageProps {
    params: {
        slug: string[];
    };
}

async function getPageFromParams(params: PageProps["params"]) {
    const slug = params?.slug?.join("/");
    const page = allPages.find((page) => page.slugAsParams === slug);

    if (!page) {
        return null;
    }

    return page;
}

const mdxComponents: MDXComponents = {
    IconAndText: (props) => <IconAndText {...props} />,
};

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const page = await getPageFromParams(params);

    if (!page) {
        return {};
    }

    return {
        title: page.title,
        description: page.description,
    };
}

export async function generateStaticParams(): Promise<PageProps["params"][]> {
    return allPages.map((page) => ({
        slug: page.slugAsParams.split("/"),
    }));
}

export default async function PagePage({ params }: PageProps) {
    const page = await getPageFromParams(params);

    if (!page) {
        notFound();
    }

    const Content = getMDXComponent(page.body.code, mdxComponents)    

    return (
        <article className="py-6 prose dark:prose-invert">
            <h1>{page.title}</h1>
            {page.description && <p className="text-xl">{page.description}</p>}
            <hr />
            <Content />
        </article>
    );
}
