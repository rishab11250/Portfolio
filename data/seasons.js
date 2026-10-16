/**
 * Japan's 72 Microseasons (Shichijuni Ko)
 * Strictly based on the standard calendar published on Nippon.com ("Japan's 72 Microseasons").
 * English names only for all rendered properties.
 *
 * Each season entry:
 * - id: 1..72 (1 = Beginning of Spring on Feb 4)
 * - majorSeason: One of the 24 major solar terms in English
 * - name: English microseason name
 * - approximateRange: Display date range string (English)
 * - startMonth: 1..12
 * - startDay: 1..31
 */

export const seasons = [
  // --- Spring (1..18) ---
  // Risshun (Beginning of Spring)
  {
    id: 1,
    majorSeason: "Beginning of Spring",
    name: "East Wind Melts the Ice",
    approximateRange: "Feb 4–Feb 8",
    startMonth: 2,
    startDay: 4,
  },
  {
    id: 2,
    majorSeason: "Beginning of Spring",
    name: "Bush Warblers Start Singing in the Mountains",
    approximateRange: "Feb 9–Feb 13",
    startMonth: 2,
    startDay: 9,
  },
  {
    id: 3,
    majorSeason: "Beginning of Spring",
    name: "Fish Emerge from the Ice",
    approximateRange: "Feb 14–Feb 18",
    startMonth: 2,
    startDay: 14,
  },

  // Usui (Rainwater)
  {
    id: 4,
    majorSeason: "Rainwater",
    name: "Rain Moistens the Soil",
    approximateRange: "Feb 19–Feb 23",
    startMonth: 2,
    startDay: 19,
  },
  {
    id: 5,
    majorSeason: "Rainwater",
    name: "Mist Starts to Linger",
    approximateRange: "Feb 24–Feb 28",
    startMonth: 2,
    startDay: 24,
  },
  {
    id: 6,
    majorSeason: "Rainwater",
    name: "Grass Sprouts, Trees Bud",
    approximateRange: "Mar 1–Mar 5",
    startMonth: 3,
    startDay: 1,
  },

  // Keichitsu (Insects Awaken)
  {
    id: 7,
    majorSeason: "Insects Awaken",
    name: "Hibernating Insects Surface",
    approximateRange: "Mar 6–Mar 10",
    startMonth: 3,
    startDay: 6,
  },
  {
    id: 8,
    majorSeason: "Insects Awaken",
    name: "First Peach Blossoms",
    approximateRange: "Mar 11–Mar 15",
    startMonth: 3,
    startDay: 11,
  },
  {
    id: 9,
    majorSeason: "Insects Awaken",
    name: "Caterpillars Become Butterflies",
    approximateRange: "Mar 16–Mar 20",
    startMonth: 3,
    startDay: 16,
  },

  // Shunbun (Spring Equinox)
  {
    id: 10,
    majorSeason: "Spring Equinox",
    name: "Sparrows Start to Nest",
    approximateRange: "Mar 21–Mar 25",
    startMonth: 3,
    startDay: 21,
  },
  {
    id: 11,
    majorSeason: "Spring Equinox",
    name: "First Cherry Blossoms",
    approximateRange: "Mar 26–Mar 30",
    startMonth: 3,
    startDay: 26,
  },
  {
    id: 12,
    majorSeason: "Spring Equinox",
    name: "Distant Thunder",
    approximateRange: "Mar 31–Apr 4",
    startMonth: 3,
    startDay: 31,
  },

  // Seimei (Pure and Clear)
  {
    id: 13,
    majorSeason: "Pure and Clear",
    name: "Swallows Return",
    approximateRange: "Apr 5–Apr 9",
    startMonth: 4,
    startDay: 5,
  },
  {
    id: 14,
    majorSeason: "Pure and Clear",
    name: "Wild Geese Fly North",
    approximateRange: "Apr 10–Apr 14",
    startMonth: 4,
    startDay: 10,
  },
  {
    id: 15,
    majorSeason: "Pure and Clear",
    name: "First Rainbows",
    approximateRange: "Apr 15–Apr 19",
    startMonth: 4,
    startDay: 15,
  },

  // Kokuu (Grain Rains)
  {
    id: 16,
    majorSeason: "Grain Rains",
    name: "First Reeds Sprout",
    approximateRange: "Apr 20–Apr 24",
    startMonth: 4,
    startDay: 20,
  },
  {
    id: 17,
    majorSeason: "Grain Rains",
    name: "Last Frost, Rice Seedlings Grow",
    approximateRange: "Apr 25–Apr 29",
    startMonth: 4,
    startDay: 25,
  },
  {
    id: 18,
    majorSeason: "Grain Rains",
    name: "Peonies Bloom",
    approximateRange: "Apr 30–May 4",
    startMonth: 4,
    startDay: 30,
  },

  // --- Summer (19..36) ---
  // Rikka (Beginning of Summer)
  {
    id: 19,
    majorSeason: "Beginning of Summer",
    name: "Frogs Start Singing",
    approximateRange: "May 5–May 9",
    startMonth: 5,
    startDay: 5,
  },
  {
    id: 20,
    majorSeason: "Beginning of Summer",
    name: "Worms Surface",
    approximateRange: "May 10–May 14",
    startMonth: 5,
    startDay: 10,
  },
  {
    id: 21,
    majorSeason: "Beginning of Summer",
    name: "Bamboo Shoots Sprout",
    approximateRange: "May 15–May 20",
    startMonth: 5,
    startDay: 15,
  },

  // Shoman (Lesser Ripening)
  {
    id: 22,
    majorSeason: "Lesser Ripening",
    name: "Silkworms Start Feasting on Mulberry Leaves",
    approximateRange: "May 21–May 25",
    startMonth: 5,
    startDay: 21,
  },
  {
    id: 23,
    majorSeason: "Lesser Ripening",
    name: "Safflowers Bloom",
    approximateRange: "May 26–May 30",
    startMonth: 5,
    startDay: 26,
  },
  {
    id: 24,
    majorSeason: "Lesser Ripening",
    name: "Wheat Ripens and Is Harvested",
    approximateRange: "May 31–Jun 5",
    startMonth: 5,
    startDay: 31,
  },

  // Boshu (Grain Beards and Seeds)
  {
    id: 25,
    majorSeason: "Grain Beards and Seeds",
    name: "Praying Mantises Hatch",
    approximateRange: "Jun 6–Jun 10",
    startMonth: 6,
    startDay: 6,
  },
  {
    id: 26,
    majorSeason: "Grain Beards and Seeds",
    name: "Rotten Grass Becomes Fireflies",
    approximateRange: "Jun 11–Jun 15",
    startMonth: 6,
    startDay: 11,
  },
  {
    id: 27,
    majorSeason: "Grain Beards and Seeds",
    name: "Plums Turn Yellow",
    approximateRange: "Jun 16–Jun 20",
    startMonth: 6,
    startDay: 16,
  },

  // Geshi (Summer Solstice)
  {
    id: 28,
    majorSeason: "Summer Solstice",
    name: "Self-Heal Withers",
    approximateRange: "Jun 21–Jun 26",
    startMonth: 6,
    startDay: 21,
  },
  {
    id: 29,
    majorSeason: "Summer Solstice",
    name: "Irises Bloom",
    approximateRange: "Jun 27–Jul 1",
    startMonth: 6,
    startDay: 27,
  },
  {
    id: 30,
    majorSeason: "Summer Solstice",
    name: "Crow-Dipper Sprouts",
    approximateRange: "Jul 2–Jul 6",
    startMonth: 7,
    startDay: 2,
  },

  // Shosho (Lesser Heat)
  {
    id: 31,
    majorSeason: "Lesser Heat",
    name: "Warm Winds Blow",
    approximateRange: "Jul 7–Jul 11",
    startMonth: 7,
    startDay: 7,
  },
  {
    id: 32,
    majorSeason: "Lesser Heat",
    name: "First Lotus Blossoms",
    approximateRange: "Jul 12–Jul 16",
    startMonth: 7,
    startDay: 12,
  },
  {
    id: 33,
    majorSeason: "Lesser Heat",
    name: "Hawks Learn to Fly",
    approximateRange: "Jul 17–Jul 22",
    startMonth: 7,
    startDay: 17,
  },

  // Taisho (Greater Heat)
  {
    id: 34,
    majorSeason: "Greater Heat",
    name: "Paulownia Trees Produce Seeds",
    approximateRange: "Jul 23–Jul 28",
    startMonth: 7,
    startDay: 23,
  },
  {
    id: 35,
    majorSeason: "Greater Heat",
    name: "Earth Is Damp, Air Is Humid",
    approximateRange: "Jul 29–Aug 2",
    startMonth: 7,
    startDay: 29,
  },
  {
    id: 36,
    majorSeason: "Greater Heat",
    name: "Great Rains Sometimes Fall",
    approximateRange: "Aug 3–Aug 7",
    startMonth: 8,
    startDay: 3,
  },

  // --- Autumn (37..54) ---
  // Risshu (Beginning of Autumn)
  {
    id: 37,
    majorSeason: "Beginning of Autumn",
    name: "Cool Winds Blow",
    approximateRange: "Aug 8–Aug 12",
    startMonth: 8,
    startDay: 8,
  },
  {
    id: 38,
    majorSeason: "Beginning of Autumn",
    name: "Evening Cicadas Sing",
    approximateRange: "Aug 13–Aug 17",
    startMonth: 8,
    startDay: 13,
  },
  {
    id: 39,
    majorSeason: "Beginning of Autumn",
    name: "Thick Fog Descends",
    approximateRange: "Aug 18–Aug 22",
    startMonth: 8,
    startDay: 18,
  },

  // Shosho (Manageable Heat)
  {
    id: 40,
    majorSeason: "Manageable Heat",
    name: "Cotton Flowers Bloom",
    approximateRange: "Aug 23–Aug 27",
    startMonth: 8,
    startDay: 23,
  },
  {
    id: 41,
    majorSeason: "Manageable Heat",
    name: "Heat Starts to Die Down",
    approximateRange: "Aug 28–Sep 1",
    startMonth: 8,
    startDay: 28,
  },
  {
    id: 42,
    majorSeason: "Manageable Heat",
    name: "Rice Ripens",
    approximateRange: "Sep 2–Sep 7",
    startMonth: 9,
    startDay: 2,
  },

  // Hakuro (White Dew)
  {
    id: 43,
    majorSeason: "White Dew",
    name: "Dew Glistens White on Grass",
    approximateRange: "Sep 8–Sep 12",
    startMonth: 9,
    startDay: 8,
  },
  {
    id: 44,
    majorSeason: "White Dew",
    name: "Wagtails Sing",
    approximateRange: "Sep 13–Sep 17",
    startMonth: 9,
    startDay: 13,
  },
  {
    id: 45,
    majorSeason: "White Dew",
    name: "Swallows Leave",
    approximateRange: "Sep 18–Sep 22",
    startMonth: 9,
    startDay: 18,
  },

  // Shubun (Autumn Equinox)
  {
    id: 46,
    majorSeason: "Autumn Equinox",
    name: "Thunder Ceases",
    approximateRange: "Sep 23–Sep 27",
    startMonth: 9,
    startDay: 23,
  },
  {
    id: 47,
    majorSeason: "Autumn Equinox",
    name: "Insects Hole Up Underground",
    approximateRange: "Sep 28–Oct 2",
    startMonth: 9,
    startDay: 28,
  },
  {
    id: 48,
    majorSeason: "Autumn Equinox",
    name: "Farmers Drain Fields",
    approximateRange: "Oct 3–Oct 7",
    startMonth: 10,
    startDay: 3,
  },

  // Kanro (Cold Dew)
  {
    id: 49,
    majorSeason: "Cold Dew",
    name: "Wild Geese Return",
    approximateRange: "Oct 8–Oct 12",
    startMonth: 10,
    startDay: 8,
  },
  {
    id: 50,
    majorSeason: "Cold Dew",
    name: "Chrysanthemums Bloom",
    approximateRange: "Oct 13–Oct 17",
    startMonth: 10,
    startDay: 13,
  },
  {
    id: 51,
    majorSeason: "Cold Dew",
    name: "Crickets Chirp Around the Door",
    approximateRange: "Oct 18–Oct 22",
    startMonth: 10,
    startDay: 18,
  },

  // Soko (Frost Falls)
  {
    id: 52,
    majorSeason: "Frost Falls",
    name: "First Frost",
    approximateRange: "Oct 23–Oct 27",
    startMonth: 10,
    startDay: 23,
  },
  {
    id: 53,
    majorSeason: "Frost Falls",
    name: "Light Rains Sometimes Fall",
    approximateRange: "Oct 28–Nov 1",
    startMonth: 10,
    startDay: 28,
  },
  {
    id: 54,
    majorSeason: "Frost Falls",
    name: "Maple Leaves and Ivy Turn Yellow",
    approximateRange: "Nov 2–Nov 6",
    startMonth: 11,
    startDay: 2,
  },

  // --- Winter (55..72) ---
  // Ritto (Beginning of Winter)
  {
    id: 55,
    majorSeason: "Beginning of Winter",
    name: "Camellias Bloom",
    approximateRange: "Nov 7–Nov 11",
    startMonth: 11,
    startDay: 7,
  },
  {
    id: 56,
    majorSeason: "Beginning of Winter",
    name: "Land Starts to Freeze",
    approximateRange: "Nov 12–Nov 16",
    startMonth: 11,
    startDay: 12,
  },
  {
    id: 57,
    majorSeason: "Beginning of Winter",
    name: "Daffodils Bloom",
    approximateRange: "Nov 17–Nov 21",
    startMonth: 11,
    startDay: 17,
  },

  // Shosetsu (Lesser Snow)
  {
    id: 58,
    majorSeason: "Lesser Snow",
    name: "Rainbows Hide",
    approximateRange: "Nov 22–Nov 26",
    startMonth: 11,
    startDay: 22,
  },
  {
    id: 59,
    majorSeason: "Lesser Snow",
    name: "North Wind Blows the Leaves from the Trees",
    approximateRange: "Nov 27–Dec 1",
    startMonth: 11,
    startDay: 27,
  },
  {
    id: 60,
    majorSeason: "Lesser Snow",
    name: "Tachibana Citrus Tree Leaves Start to Turn Yellow",
    approximateRange: "Dec 2–Dec 6",
    startMonth: 12,
    startDay: 2,
  },

  // Taisetsu (Greater Snow)
  {
    id: 61,
    majorSeason: "Greater Snow",
    name: "Cold Sets In, Winter Begins",
    approximateRange: "Dec 7–Dec 11",
    startMonth: 12,
    startDay: 7,
  },
  {
    id: 62,
    majorSeason: "Greater Snow",
    name: "Bears Start Hibernating in Their Dens",
    approximateRange: "Dec 12–Dec 16",
    startMonth: 12,
    startDay: 12,
  },
  {
    id: 63,
    majorSeason: "Greater Snow",
    name: "Salmon Gather and Swim Upstream",
    approximateRange: "Dec 17–Dec 21",
    startMonth: 12,
    startDay: 17,
  },

  // Toji (Winter Solstice)
  {
    id: 64,
    majorSeason: "Winter Solstice",
    name: "Self-Heal Sprouts",
    approximateRange: "Dec 22–Dec 26",
    startMonth: 12,
    startDay: 22,
  },
  {
    id: 65,
    majorSeason: "Winter Solstice",
    name: "Deer Shed Antlers",
    approximateRange: "Dec 27–Dec 31",
    startMonth: 12,
    startDay: 27,
  },
  {
    id: 66,
    majorSeason: "Winter Solstice",
    name: "Wheat Sprouts Under Snow",
    approximateRange: "Jan 1–Jan 4",
    startMonth: 1,
    startDay: 1,
  },

  // Shokan (Lesser Cold)
  {
    id: 67,
    majorSeason: "Lesser Cold",
    name: "Parsley Flourishes",
    approximateRange: "Jan 5–Jan 9",
    startMonth: 1,
    startDay: 5,
  },
  {
    id: 68,
    majorSeason: "Lesser Cold",
    name: "Springs Thaw",
    approximateRange: "Jan 10–Jan 14",
    startMonth: 1,
    startDay: 10,
  },
  {
    id: 69,
    majorSeason: "Lesser Cold",
    name: "Pheasants Start to Call",
    approximateRange: "Jan 15–Jan 19",
    startMonth: 1,
    startDay: 15,
  },

  // Daikan (Greater Cold)
  {
    id: 70,
    majorSeason: "Greater Cold",
    name: "Butterburs Bud",
    approximateRange: "Jan 20–Jan 24",
    startMonth: 1,
    startDay: 20,
  },
  {
    id: 71,
    majorSeason: "Greater Cold",
    name: "Ice Thickens on Streams",
    approximateRange: "Jan 25–Jan 29",
    startMonth: 1,
    startDay: 25,
  },
  {
    id: 72,
    majorSeason: "Greater Cold",
    name: "Hens Start Laying Eggs",
    approximateRange: "Jan 30–Feb 3",
    startMonth: 1,
    startDay: 30,
  },
];

export default seasons;
