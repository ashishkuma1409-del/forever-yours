// All copy & content for "Yes, Vedika". Ashish can edit everything in this one place.

export const page0 = {
  line1: "😉 aree madamm jii aap...Sharam aa rhii h jii apkoo dekh k 🫣",
  line2: "chaliyee start kartee h jii",
  button: "Chaliyee",
};

export const page1 = {
  line1: "hey miss vedikaa...here is something for uuu from the depth of my heart.",
  line2: "Madamm jii kyaa aap ready ho?",
  beginLabel: "Tap to Begin 💗",
};

export const page2 = {
  message: "Let's begin our love story",
  button: "Madamm please...",
};

export const page3 = {
  title: "Our First Chapter",
  note: "uss dinn ptaa nhii thaa kii yeh chhota saa itnaa khash moment ban jayegaa ham donoo k liyee... uss dinn se baat aage badhtee gyaa aur ham donoo ekk dusree k aur pass aate gyee thanks for coming in my life betuuu.",
};

/** Gallery of Us — 5 chapters, each its own little page. */
export const galleryChapters: {
  title: string;
  subtitle: string;
  photos: { key: GalleryKey; caption: string }[];
}[] = [
  {
    title: "Happy Moment",
    subtitle: "wo hansi, wo raat, wo hum donoo 💗",
    photos: [{ key: "happy", caption: "Happy Moment 💗" }],
  },
  {
    title: "Birthday Special",
    subtitle: "tumhara din, meri sabse pyaari yaad 🎂",
    photos: [
      { key: "bday1", caption: "Happy Birthday Girl 🎂" },
      { key: "bday2", caption: "wo cake, wo smile ✨" },
    ],
  },
  {
    title: "Tour Special",
    subtitle: "ghumna sirf bahana tha, saath rehna asli plan 🌿",
    photos: [
      { key: "tour1", caption: "Us, under the trees 🌳" },
      { key: "tour2", caption: "Obsessed : ) 💚" },
    ],
  },
  {
    title: "Pooja",
    subtitle: "bhagwan ke saamne bhi tum hi maangi thi 🙏",
    photos: [{ key: "pooja", caption: "Pooja day 🌺" }],
  },
  {
    title: "Our Beautiful Memory",
    subtitle: "chhat, thandi hawa aur tum ❤️",
    photos: [{ key: "memory", caption: "Our beautiful memory 🌙" }],
  },
];

export type GalleryKey =
  | "happy"
  | "bday1"
  | "bday2"
  | "tour1"
  | "tour2"
  | "pooja"
  | "memory";

export const page4 = {
  title: "Gallery of Us",
};

export const page5 = {
  title: "Reasons Why You're Very Special",
  reasons: [
    "apkaa caring nature apkoo hameshaa special bnatii h",
    "tum mujhee hameshaa 1 priority detii ho 🤗",
    "Tumharee sath rehnee pe mujhee fully comfort bilkul apnee jaisaa feel krtaa huu..!!",
    "Meree liyee tumharaa presence hii enough h 💓",
    "Tumharee sath silence bhi mujhee precious moment feel hotaa h 💎",
    "Apkee sath meraa future imagine krnaa dil ko bhuut sukoon detaa h 😇",
    "Tumko dekh k meree face pe automatic ekk smile aa jataa h 😊",
    "ptaa Nhii parr kyuu apkoo hameshaa khone se dartaa huu 🥺 kahii aap kisii se reason se durr naa chll jaoo 😕",
    "You are not my favourite person only you are my favourite feeling also my darling 💗",
    "Saree reasons khtam ho jayee gee yaar lekin mujhee apkoo pasand karnee kaa reason kbhii khtam Nhii hogaa 🥹😍😊",
  ],
};

/** The big love-letter envelope page. */
export const loveLetter = {
  coverLabel: "open me madamm jii 💗",
  to: "To: myy prettiest cutest girl 🫀❤",
  subject: "Subject:  Dil kaa baat pahunchanaa..!!👉🏻💌👈🏻",
  greeting: "Dear Madamm jii ✨,",
  body: [
    "Ye application kisi school, college ya job ke liye nahi hai… 😌",
    "Ye application hai tumhari life mein thodi aur special jagah maangne ke liye. ❤️",
    "Hamari kahani shuru hui thi ek simple si chhat par baat krtee huee…",
    "Tab shayad humein idea bhi nhii tha ki woh simple sii conversations itni special memories ban jayengi.",
    "Dheere-dheere tum meri life ka woh hissa ban gayi jiske bina kuch moments incomplete se lagne lage. ❤️",
    "Tumhare saath aur bhi beautiful memories bananaa h aur tumhe hameshaa smile krtee huee dekhna h aur hamari story ka next chapter saath mein ho hameshaa... 📖✨",
  ],
  fields: [
    { label: "Position Applied For", value: "apkaa favourite person bannaa 🫣❤️" },
    { label: "Desired Duration", value: "Forever ♾️" },
  ],
  finalRequestLabel: "Final Request:",
  finalRequest: "Kya Veduuu, tum merii iss application ko “Approved ❤️” karogi?",
  signatureLabel: "Signature:",
  signature: "Ashikaa",
  next: "Aage badhoo",
};

export const page6 = {
  question: "Will uuu be mine for every second, every moment, and every part of my life?",
  yes: "Yes 💖",
  no: "Sorry... No",
  dodgeCaptions: [
    "nahi milega 😌",
    "try kar lo 😏",
    "ab bhi nahi 😌",
    "haan hi bol do 💗",
  ],
};

export const page7 = {
  finalMessage: "I love you, Vedika. Forever starts now.",
  closing: "The End 💗",
  wishTitle: "Ek chhoti si wish 🙏",
  wish: [
    "Bappa, bas ek chhoti si wish hai… 🙏❤️",
    "Jiske chehre ki smile mere liye itni special hai, uski smile kabhi kam mat hone dena. Uske har sapne ko poora karna, har mushkil se uski raksha karna aur uski zindagi ko hamesha khushiyon se bhar dena.",
    "Aur Bappa… agar ho sake, toh uski har khushi mein mujhe bhi uske saath rakhna. ❤️",
    "Ganpati Bappa Morya! 🌺🙏",
  ],
};

export type PageNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
