import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { ExternalLink } from "lucide-react";

export default function AppStatusModal({ children }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        className="
          sm:max-w-lg
          rounded-3xl
          border border-black/10
          bg-white/90
          p-8
          shadow-[0_20px_80px_rgba(0,0,0,0.15)]
          backdrop-blur-xl
        "
      >
        <DialogHeader className="space-y-4 text-center">
          <DialogTitle className="text-xl font-semibold tracking-tight">
            🚧 Mobile App is Under Development
          </DialogTitle>

          <div className="flex justify-center">
            <div
              className="
                rounded-full
                border border-yellow-200
                bg-yellow-100
                px-4 py-1.5
                text-xs
                font-medium
                text-yellow-700
              "
            >
              Closed Testing • In Progress
            </div>
          </div>

          <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
            FinTrack is not live yet.
          </h3>

          <DialogDescription
            className="
              mx-auto
              max-w-md
              text-sm
              leading-relaxed
              text-gray-600
              md:text-base
            "
          >
            We’re currently running{" "}
            <span className="font-medium text-black">
              Google Play Closed Testing
            </span>{" "}
            to refine performance and polish the experience before launch.
            <br />
            <br />
            You can request early access or reach out to the developer directly.
          </DialogDescription>
        </DialogHeader>

        <div className="my-6 h-px bg-black/5" />

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href="https://satinder-portfolio.vercel.app/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button
              className="
                h-11
                w-full
                rounded-full
                bg-black
                text-sm
                font-medium
                text-white
                hover:bg-gray-900
              "
            >
              Contact Developer
              <ExternalLink className="ml-2" size={16} />
            </Button>
          </a>

          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="
                h-11
                rounded-full
                border-black/10
                bg-white
                px-6
                text-sm
                font-medium
                hover:bg-gray-50
                sm:w-auto
              "
            >
              Maybe later
            </Button>
          </DialogTrigger>
        </div>

        <p className="mt-4 text-center text-sm text-gray-400">
          Public release coming soon...
        </p>
      </DialogContent>
    </Dialog>
  );
}
