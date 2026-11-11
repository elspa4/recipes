export type Category = 'Breakfast' | 'Mains' | 'Sides' | 'Soups' | 'Desserts' | 'Drinks'

export interface Recipe {
  slug: string
  name: string
  category: Category
  /** One-line teaser shown on the card. */
  blurb: string
  totalMinutes: number
  /** Path relative to /public, e.g. "photos/tuscan-herb-farfalline.jpg". Omit for the placeholder art. */
  photo?: string
  tags?: string[]
}

// Only the farfalline is real so far. The rest are placeholders to fill out the grid.
export const recipes: Recipe[] = [
  {
    slug: 'tuscan-herb-farfalline',
    name: 'Tuscan Herb Farfalline',
    category: 'Mains',
    blurb: 'Little butterfly pasta in a creamy, garlicky Tuscan herb sauce with Cajun sausage and wilted spinach.',
    totalMinutes: 25,
    photo: 'photos/tuscan-herb-farfalline.jpg',
    tags: ['pasta', 'creamy', 'spinach', 'sausage'],
  },
  {
    slug: 'moonlit-mushroom-stroganoff',
    name: 'Moonlit Mushroom Stroganoff',
    category: 'Mains',
    blurb: 'Silky cashew sour cream, wild mushrooms and a whisper of smoked paprika.',
    totalMinutes: 35,
    tags: ['mushroom', 'creamy', 'noodles'],
  },
  {
    slug: 'starfall-cinnamon-rolls',
    name: 'Starfall Cinnamon Rolls',
    category: 'Breakfast',
    blurb: 'Pillowy swirls glazed with vanilla bean icing and a dusting of gold sugar.',
    totalMinutes: 150,
    tags: ['baking', 'sweet'],
  },
  {
    slug: 'hearthside-lentil-stew',
    name: 'Hearthside Lentil Stew',
    category: 'Soups',
    blurb: 'Slow-simmered lentils, root vegetables and rosemary for long winter nights.',
    totalMinutes: 50,
    tags: ['lentils', 'cozy'],
  },
  {
    slug: 'enchanted-garden-salad',
    name: 'Enchanted Garden Salad',
    category: 'Sides',
    blurb: 'Tender greens, edible flowers and a bright lemon-herb vinaigrette.',
    totalMinutes: 15,
    tags: ['salad', 'fresh'],
  },
  {
    slug: 'midnight-chocolate-torte',
    name: 'Midnight Chocolate Torte',
    category: 'Desserts',
    blurb: 'Dense, dark and decadent, crowned with raspberries and a silky ganache.',
    totalMinutes: 90,
    tags: ['chocolate', 'baking'],
  },
  {
    slug: 'lavender-oat-latte',
    name: 'Lavender Oat Latte',
    category: 'Drinks',
    blurb: 'Floral, frothy and softly sweet with maple and dried lavender.',
    totalMinutes: 10,
    tags: ['coffee', 'oat milk'],
  },
]
