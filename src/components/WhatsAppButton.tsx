import { whatsappLink } from "@/lib/site";

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
    >
      <svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor" aria-hidden>
        <path d="M16 3C9.4 3 4 8.3 4 14.9c0 2.3.7 4.5 1.9 6.3L4 29l8-1.9c1.2.6 2.600.9 4 .9 6.600 0 12-5.300 12-11.900S22.600 3 16 3zm0 21.800c-1.300 0-2.500-.3-3.600-.9l-.5-.3-4.700 1.100 1.200-4.500-.3-.5a9.700 9.700 0 0 1-1.500-5.200C6.600 9.700 10.800 5.500 16 5.500s9.400 4.200 9.400 9.400-4.200 9.900-9.400 9.900zm5.200-7.300c-.3-.1-1.700-.8-1.900-.9-.3-.1-.5-.1-.7.100l-.9 1.100c-.2.200-.3.200-.6.100a7.600 7.600 0 0 1-3.800-3.300c-.3-.5.300-.5.800-1.500.1-.2 0-.4 0-.5l-.9-2.100c-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.100-.8.400-.3.300-1 1-1 2.400s1 2.800 1.200 3c.1.200 2.100 3.200 5.100 4.500 1.900.8 2.600.9 3.500.7.600-.1 1.700-.7 2-1.400.2-.7.200-1.200.2-1.400-.1-.1-.3-.2-.6-.3z" />
      </svg>
    </a>
  );
}
