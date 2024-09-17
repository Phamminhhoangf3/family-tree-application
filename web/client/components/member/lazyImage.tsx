import Image from "next/image";
import { useState } from "react";
import { Blurhash } from "react-blurhash";

const LazyImage = ({
  src,
  blurHash = "LEHV6nWB2yk8pyo0adR*.7kCMdnj",
  width,
  height,
}: {
  src: string;
  blurHash?: string;
  width: number;
  height: number;
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div style={{ position: "relative" }}>
      {isLoading && (
        <Blurhash
          hash={blurHash}
          resolutionX={32}
          resolutionY={32}
          punch={1}
          width={width}
          height={height}
        />
      )}
      <Image
        src={src}
        width={width}
        height={height}
        alt="Image with Blurhash"
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  );
};

export default LazyImage;
