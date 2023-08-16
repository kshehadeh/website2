import React from "react";
import Image from "next/image";

export default function IconAndText({
    icon,
    href,
    text,
}: {
    icon: string;
    href: string;
    text: string;
}) {
    return (
        <div className="flex items-center space-x-2">
            <Image src={icon} alt="twitter" width="22" />
            <a href={href}>{text}</a>
        </div>
    );
}
