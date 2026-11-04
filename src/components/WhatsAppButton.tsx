import { MessageCircle, PhoneCall } from "lucide-react";

const whatsappNumber = "919053866128";
const whatsappDisplayNumber = "+91 90538 66128";
const callNumber = "+917088686900";
const callDisplayNumber = "+91 70886 86900";

export function WhatsAppButton() {
  return (
    <div className="fixed right-4 bottom-4 z-40 flex max-w-[calc(100vw-2rem)] flex-col items-end gap-2 sm:right-6 sm:bottom-6">
      <a
        href={`tel:${callNumber}`}
        aria-label={`Call ${callDisplayNumber}`}
        className="inline-flex max-w-full items-center gap-2 rounded-full bg-navy-700 px-4 py-3 text-[0.88rem] font-bold text-white shadow-lg transition hover:bg-navy-800 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-navy-600"
      >
        <PhoneCall aria-hidden className="h-5 w-5 shrink-0" />
        <span>Call {callDisplayNumber}</span>
      </a>
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat on WhatsApp at ${whatsappDisplayNumber}`}
        className="inline-flex max-w-full items-center gap-2 rounded-full bg-leaf-600 px-4 py-3 text-[0.88rem] font-bold text-white shadow-lg transition hover:bg-leaf-700 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-leaf-600"
      >
        <MessageCircle aria-hidden className="h-5 w-5 shrink-0" />
        <span>WhatsApp {whatsappDisplayNumber}</span>
      </a>
    </div>
  );
}