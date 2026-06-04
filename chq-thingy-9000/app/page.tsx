import { CameraStream } from "@/components/camera-stream"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col">
      <main className="flex flex-1 flex-col items-center justify-center gap-10 px-6 py-16">
        <h1 className="font-heading text-center text-5xl text-white sm:text-6xl md:text-7xl">
          CHQ Thingy 9000
        </h1>
        <CameraStream className="max-w-4xl" />
      </main>
      <footer className="flex justify-center px-6 py-6">
        <p className="w-full max-w-4xl text-center font-sans text-xs text-muted-foreground">
          THIS SITE RELAYS A PUBLICLY BROADCAST IP CAMERA FEED REQUIRING NO AUTHENTICATION. NO SYSTEMS WERE ACCESSED WITHOUT AUTHORISATION CONTRARY TO THE CRIMINAL JUSTICE (OFFENCES RELATING TO INFORMATION SYSTEMS) ACT 2017. THIS SERVICE DOES NOT STORE, PROCESS, OR TRANSMIT PERSONAL DATA WITHIN THE MEANING OF THE GDPR.
        </p>
      </footer>
    </div>
  )
}
