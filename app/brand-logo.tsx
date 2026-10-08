/** Original supplied JPEG 2000 artwork, losslessly converted to PNG with its alpha. */
export default function BrandLogo({ animated = false }: { animated?: boolean }) {
  return <span className={'brand-logo'+(animated?' brand-logo-animated':'')}>
    <img src="/images/lora-exact.png" width={2172} height={635} alt="LORA" />
    {animated && <span className="logo-shimmer-mask" aria-hidden="true" style={{maskImage:'url(/images/lora-exact.png)',WebkitMaskImage:'url(/images/lora-exact.png)'}}><span className="logo-shimmer" /></span>}
  </span>;
}
