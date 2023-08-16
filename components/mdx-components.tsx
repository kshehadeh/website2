import Image from "next/image"
import IconAndText from "@/components/IconAndText"
import { useMDXComponent } from "next-contentlayer/hooks"

const components = {
  Image,
  IconAndText
}

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return <Component components={components} />
}
