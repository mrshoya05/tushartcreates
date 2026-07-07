export const CONTACT = {
  phone: "+91 6396053045",
  phoneDial: "+916396053045",
  whatsapp: "916396053045",
  email: "tusharparcha04@gmail.com",
  instagramHandle: "@tushar_creates01",
  instagramUrl: "https://instagram.com/tushar_creates01",
};

export function whatsappLink(message) {
  const text = message || "Hi Tushar, I'd like to order a custom portrait.";
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function mailtoLink(subject) {
  const s = subject || "Portrait commission enquiry";
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(s)}`;
}

export function telLink() {
  return `tel:${CONTACT.phoneDial}`;
}
