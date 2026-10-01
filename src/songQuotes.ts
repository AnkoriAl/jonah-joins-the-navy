import type { ChapterId } from './cinematic';

// Hebrew excerpts are copied verbatim from Almog's supplied lyric text.
// The English is a working translation of each excerpt, not additional narration.
export const songQuotes = {
  enlisted: { he: 'בְּיוֹם אֶחָד בָּהִיר הִתְגַּיֵּס לְחֵיל הַיָם.', en: 'He enlisted in the navy one fine day.' },
  board: { he: 'עָלָה עַל מַשְׁחֵתָּה', en: 'He boarded a destroyer.' },
  sleep: { he: 'בַּפִּנָּה שָׁכַב נִרְדַּם.', en: 'He lay asleep in a corner.' },
  wave: { he: 'הִגִּיעַ גַּל גָּדוֹל וְשָׁטַף אוֹתוֹ לַיָּם.', en: 'A great wave came and washed him into the sea.' },
  survival: { he: 'בְּקשִׁי הוּא נִצַּל, כִּי לִשְׂחוֹת הוּא לֹא יָדַע.', en: 'He barely survived, because he did not know how to swim.' },
  transfer: { he: 'בִּקֵּשׁ “הַעֲבָרָה” וְעָלָה לְטַרְפְּדָה.', en: 'He requested a transfer and boarded a torpedo boat.' },
  rolling: { he: 'רַבִּים הַטִּלְטוּלִים עַל הַמַּיִם כָּל הַזְּמַן.', en: 'The rolling on the water went on and on.' },
  volunteer: { he: 'אִם כָּךְ, אֶתְנַדֵּב כְּצוֹלְלָן.', en: 'In that case, I’ll volunteer as a submariner.' },
  buy: { he: 'לְאַנְגְלִיָה נָסְעוּ וְקָנוּ שָׁם דָּג עֲנָק', en: 'They went to England and bought a giant fish there.' },
  enter: { he: 'וְכָךְ נִכְנַס יוֹנָה לַמֵּעַיִם שֶׁל הַדָּג.', en: 'And so Jonah entered the fish’s innards.' },
  cramped: { he: 'בִּפְנִים הָיָה צָפוּף, כְּמוֹ בְּכָל הַצּוֹלְלוֹת.', en: 'It was cramped inside, as in every submarine.' },
  hammock: { he: 'יוֹנָה מָתַח עַרְסָל בֵּין הַטְּחוֹל וְהַכְּלָיוֹת', en: 'Jonah stretched a hammock between the spleen and kidneys.' },
  liver: { he: 'שִׁמֵּן אֶת הַכָּבֵד', en: 'He oiled the liver.' },
  gallbladder: { he: 'וְנִקָּה אֶת הַמָּרָה', en: 'And he cleaned the gallbladder.' },
  launch: { he: 'מָשַׁךְ בַּמְּעִי הַגַּס – וְטוֹרְפֵּדוֹ חִישׁ יָרָה.', en: 'He pulled the large intestine—and swiftly fired a torpedo.' },
  living: { he: 'לַדֶּרֶךְ אָז יָצְאָה הַצּוֹלֶלֶת הַחַיָּה.', en: 'Then the living submarine set off.' },
  throat: { he: 'הֵצִיץ בַּפֵּרִיסְקוֹפּ, בַּצִּנוֹר שֶׁל הַגָּרוֹן', en: 'He peered through the periscope—the tube of the throat.' },
  harbor: { he: 'וְלִנְמַל נִינְוֶה הוּא נִוֵּט בְּבִטָּחוֹן.', en: 'And he steered confidently toward the port of Nineveh.' },
  service: { he: 'וְגַם קִבֵּל צָלָ"ש: “צוֹלְלָן מִסְפָּר אַחַת.”', en: 'He even received a commendation: “Number-one submariner.”' },
  technion: { he: 'וּכְשֶׁהוּא הִשְׁתַּחְרֵר – הוּא עָבַר לַטֶּכְנִיּוֹן', en: 'When he was discharged, he went on to the Technion.' },
  research: { he: 'שָׁם הוּא עוֹשֶׂה מֶחְקָר עַל צִמְחֵי הַקִּיקָיוֹן.', en: 'There he researches kikayon plants.' },
} as const;

export type SongQuoteId = keyof typeof songQuotes;
export const chapterSongQuotes: Record<ChapterId, SongQuoteId[]> = {
  enlist: ['enlisted', 'board'], storm: ['sleep', 'wave'],
  transfer: ['survival', 'transfer', 'rolling', 'volunteer'], england: ['buy', 'enter'],
  machine: ['cramped', 'hammock', 'liver', 'gallbladder', 'launch', 'living'],
  periscope: ['throat', 'harbor', 'service'], lab: ['technion', 'research'],
};

const beats: Record<ChapterId, { start: number; end: number; quote: SongQuoteId }[]> = {
  enlist: [{ start: 7, end: 14.8, quote: 'board' }],
  storm: [{ start: .8, end: 12.9, quote: 'sleep' }, { start: 13.2, end: 20, quote: 'wave' }],
  transfer: [{ start: .2, end: 5.05, quote: 'survival' }, { start: 5.15, end: 8.8, quote: 'transfer' }, { start: 9, end: 14.05, quote: 'rolling' }, { start: 14.45, end: 20, quote: 'volunteer' }],
  england: [{ start: 0, end: 16.65, quote: 'buy' }, { start: 16.8, end: 24.85, quote: 'enter' }],
  machine: [{ start: 0, end: 5, quote: 'cramped' }, { start: 5, end: 15, quote: 'hammock' }, { start: 15, end: 23, quote: 'liver' }, { start: 23, end: 30, quote: 'gallbladder' }, { start: 30, end: 40, quote: 'launch' }, { start: 40, end: 45, quote: 'living' }],
  periscope: [{ start: .1, end: 7.9, quote: 'throat' }, { start: 8, end: 15.9, quote: 'harbor' }, { start: 16, end: 21.9, quote: 'service' }],
  lab: [{ start: .55, end: 9.8, quote: 'technion' }, { start: 10.05, end: 20.65, quote: 'research' }],
};
export function songQuoteAt(chapter: ChapterId, localTime: number) {
  const beat = beats[chapter].find(item => localTime >= item.start && localTime < item.end);
  return beat ? songQuotes[beat.quote] : undefined;
}
