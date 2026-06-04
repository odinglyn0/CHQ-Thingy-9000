import { CameraStream } from "@/components/camera-stream"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "CHQ Thingy 9000",
  url: "https://chqthingy.odinglynn.com",
  description:
    "A proxy of a security camera in the CHQ Building, Dublin, Ireland.",
  inLanguage: "en",
  isAccessibleForFree: true,
  publisher: {
    "@type": "Person",
    name: "Odin Glynn",
  },
  mainEntity: {
    "@type": "VideoObject",
    name: "The CHQ Live Camera",
    description:
      "Live feed relayed from a network camera at the CHQ Building, Dublin.",
    contentUrl: "https://chqthingy.odinglynn.com/api/stream",
    embedUrl: "https://chqthingy.odinglynn.com",
    uploadDate: "2026-06-04",
    thumbnailUrl: "https://chqthingy.odinglynn.com/opengraph-image",
    isLiveBroadcast: true,
  },
}

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex flex-1 flex-col items-center justify-center gap-10 px-6 py-16">
        <h1 className="font-heading text-center text-5xl text-white sm:text-6xl md:text-7xl">
          CHQ Thingy 9000
        </h1>
        <div className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-xl border bg-black shadow-2xl">
          <CameraStream />
        </div>
      </main>
      <footer className="flex justify-center px-6 py-6">
        <p className="w-full max-w-4xl text-center font-sans text-xs text-muted-foreground">
          THIS SITE RELAYS A PUBLICLY BROADCAST IP CAMERA FEED REQUIRING NO
          AUTHENTICATION. NO SYSTEMS WERE ACCESSED WITHOUT AUTHORISATION CONTRARY
          TO THE CRIMINAL JUSTICE (OFFENCES RELATING TO INFORMATION SYSTEMS) ACT
          2017. THIS SERVICE DOES NOT STORE, PROCESS, OR TRANSMIT PERSONAL DATA
          WITHIN THE MEANING OF THE GDPR.
        </p>
      </footer>
    </div>
  )
}
