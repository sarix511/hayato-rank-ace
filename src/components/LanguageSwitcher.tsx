import { useState } from "react";

export type Lang = "en" | "ur" | "hi";

const LANGS: { id: Lang; label: string; flag: string }[] = [
  { id: "en", label: "English", flag: "🇬🇧" },
  { id: "ur", label: "اردو", flag: "🇵🇰" },
  { id: "hi", label: "हिन्दी", flag: "🇮🇳" },
];

export const TRANSLATIONS: Record<Lang, Record<string, string>> = {
  en: {
    gameMode: "GAME MODE",
    selectRegion: "SELECT REGION",
    targetRank: "TARGET RANK",
    pushDuration: "PUSH DURATION",
    enterUid: "ENTER YOUR UID",
    tokenFile: "GAME TOKEN FILE",
    optional: "(Optional)",
    startRankUp: "🚀 START RANK UP",
    fillAllFields: "⚠️ FILL ALL FIELDS",
    chooseRegion: "Choose your server region...",
    uidHint: "Your UID can be found in your Free Fire profile",
    dropToken: "📂 Drop or click to upload .token file",
    tokenHint: "Free Fire game token for faster boost",
    botPersonality: "BOT PERSONALITY",
    friendsBoost: "🧑‍🤝‍🧑 FRIENDS BOOST",
    userReviews: "💬 USER REVIEWS",
    recentActivity: "🧾 RECENT ACTIVITY",
  },
  ur: {
    gameMode: "گیم موڈ",
    selectRegion: "ریجن منتخب کریں",
    targetRank: "ٹارگٹ رینک",
    pushDuration: "پُش دورانیہ",
    enterUid: "اپنا UID درج کریں",
    tokenFile: "گیم ٹوکن فائل",
    optional: "(اختیاری)",
    startRankUp: "🚀 رینک اپ شروع کریں",
    fillAllFields: "⚠️ تمام فیلڈز بھریں",
    chooseRegion: "اپنا سرور ریجن چنیں...",
    uidHint: "آپ کا UID آپ کی فری فائر پروفائل میں ہے",
    dropToken: "📂 .token فائل اپلوڈ کریں",
    tokenHint: "تیز بوسٹ کے لیے فری فائر ٹوکن",
    botPersonality: "بوٹ پرسنالٹی",
    friendsBoost: "🧑‍🤝‍🧑 فرینڈز بوسٹ",
    userReviews: "💬 صارف ریویوز",
    recentActivity: "🧾 حالیہ سرگرمی",
  },
  hi: {
    gameMode: "गेम मोड",
    selectRegion: "रीजन चुनें",
    targetRank: "टारगेट रैंक",
    pushDuration: "पुश अवधि",
    enterUid: "अपना UID दर्ज करें",
    tokenFile: "गेम टोकन फ़ाइल",
    optional: "(वैकल्पिक)",
    startRankUp: "🚀 रैंक अप शुरू करें",
    fillAllFields: "⚠️ सभी फ़ील्ड भरें",
    chooseRegion: "अपना सर्वर रीजन चुनें...",
    uidHint: "आपका UID आपकी फ्री फायर प्रोफाइल में है",
    dropToken: "📂 .token फ़ाइल अपलोड करें",
    tokenHint: "तेज़ बूस्ट के लिए फ्री फायर टोकन",
    botPersonality: "बॉट पर्सनैलिटी",
    friendsBoost: "🧑‍🤝‍🧑 फ्रेंड्स बूस्ट",
    userReviews: "💬 यूज़र रिव्यूज़",
    recentActivity: "🧾 हालिया गतिविधि",
  },
};

interface Props {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LanguageSwitcher = ({ lang, setLang }: Props) => (
  <div className="fixed top-12 right-4 z-50 flex gap-1">
    {LANGS.map((l) => (
      <button
        key={l.id}
        onClick={() => setLang(l.id)}
        className={`px-2 py-1 rounded text-xs font-mono transition-all ${
          lang === l.id
            ? "bg-primary text-primary-foreground"
            : "bg-card border border-border text-muted-foreground hover:text-foreground"
        }`}
        title={l.label}
      >
        {l.flag} {l.label}
      </button>
    ))}
  </div>
);

export default LanguageSwitcher;
