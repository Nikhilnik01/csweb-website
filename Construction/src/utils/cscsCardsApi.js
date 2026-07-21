// src/utils/cscsCardsApi.js
//
// Purely API-driven — every card shown on the site (listing, detail, and
// the application form) comes from whatever the admin panel has entered.
// No static/hardcoded card data is merged in anymore. Any field the API
// doesn't provide is simply left undefined, and the UI renders each
// section conditionally so nothing breaks when a field is missing.

const getCardColor = (cardName = "") => {
  const t = cardName.toLowerCase();
  if (t.includes("green")) return "green";
  if (t.includes("red")) return "red";
  if (t.includes("blue")) return "blue";
  if (t.includes("gold")) return "gold";
  if (t.includes("black")) return "black";
  if (t.includes("white")) return "white";
  return "blue";
};

const getApiCardsList = (response) => {
  const list = response?.res?.lists;
  return Array.isArray(list) ? list : [];
};

const decodeHtmlEntities = (value = "") => {
  if (typeof document !== "undefined") {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = value;
    return textarea.value;
  }

  return value
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
};

const htmlToText = (value = "") =>
  decodeHtmlEntities(String(value))
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

// Maps a raw API card object to the shape the CSCS card pages expect.
// `apiCard` is the only source of truth here — nothing from a static file
// is spread in, so whatever the admin has (or hasn't) filled in is exactly
// what shows up on the site.
export const mergeApiCardWithStatic = (apiCard) => {
  if (!apiCard) return null;

  const title = apiCard.cardName || `CSCS Card ${apiCard.id}`;
  const description = htmlToText(
    apiCard.cardShortDescription || apiCard.cardDescription || "",
  );
  const basePrice = Number(apiCard.basePrice);
  const bookingFee = Number(apiCard.bookingFee);
  const totalPrice = Number(apiCard.totalPrice);

  return {
    id: apiCard.id,
    title,
    slug: String(apiCard.id),
    cardColor: getCardColor(title),
    description,
    shortDescription: description,
    cardImage: apiCard.cardImage,
    cardDescriptionHtml: apiCard.cardDescription || "",
    validity: apiCard.cardValid || undefined,
    extra: apiCard.cardValid ? `Valid: ${apiCard.cardValid}` : undefined,
    isQualificationsNeed: Boolean(apiCard.cardQualifications),
    qualificationName: apiCard.cardQualifications || undefined,
    basePrice: Number.isFinite(basePrice) ? basePrice : undefined,
    bookingFee: Number.isFinite(bookingFee) ? bookingFee : undefined,
    totalPrice: Number.isFinite(totalPrice) ? totalPrice : undefined,
    amount: Number.isFinite(totalPrice) ? totalPrice : undefined,
    currency: apiCard.currency || "£",
    isConstructionCard: apiCard.isConstructionCard,
    apiCard,
  };
};

export const mergeApiCardsWithStatic = (response) => {
  const apiCards = getApiCardsList(response);
  return apiCards.map((apiCard) => mergeApiCardWithStatic(apiCard));
};