import Image from "next/image";

export default function IconAndText({
    icon,
    href,
    text,
    imageDims
}: {
    icon: string;
    href: string;
    text: string;
    imageDims: {
        width: number;
        height: number;
    };
}) {
    return (
        <div className="flex items-center space-x-2">
            <Image src={icon} alt="twitter" width={imageDims.width} height={imageDims.height} />
            <a href={href}>{text}</a>
        </div>
    );
}
