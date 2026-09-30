/** Responsive generated-anchor image. Phones get the 9:16 crop; desktops never download it and
 *  phones never download the landscape master. */
type Props = { name: "k1" | "k2" | "k3"; alt?: string; priority?: boolean; className?: string; landscapeOnly?: boolean };

const set = (base: string, widths: number[], ext: string) => widths.map((w) => `/media/anchors/${base}-${w}.${ext} ${w}w`).join(", ");

export function Anchor({ name, alt = "", priority, className, landscapeOnly }: Props) {
  const wide = [960, 1600, 2560];
  const tall = [720, 1080];
  return (
    <picture className={className}>
      {!landscapeOnly && (
        <>
          <source media="(max-width: 899.98px)" type="image/avif" srcSet={set(`${name}-portrait`, tall, "avif")} sizes="100vw" />
          <source media="(max-width: 899.98px)" type="image/webp" srcSet={set(`${name}-portrait`, tall, "webp")} sizes="100vw" />
          <source media="(max-width: 899.98px)" srcSet={set(`${name}-portrait`, tall, "jpg")} sizes="100vw" />
        </>
      )}
      <source type="image/avif" srcSet={set(name, wide, "avif")} sizes="100vw" />
      <source type="image/webp" srcSet={set(name, wide, "webp")} sizes="100vw" />
      <img
        src={`/media/anchors/${name}-1600.jpg`}
        srcSet={set(name, wide, "jpg")}
        sizes="100vw"
        alt={alt}
        width={1600}
        height={893}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  );
}
