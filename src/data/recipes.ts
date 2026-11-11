export type Category = 'Breakfast' | 'Mains' | 'Sides' | 'Sauces' | 'Soups' | 'Desserts' | 'Drinks'

export interface Ingredient {
  /** Shown in bold, e.g. "2 cups". Omit for items like "Salt, to taste". */
  amount?: string
  item: string
  /** Slug of another recipe on the site, e.g. "cashew-cream-sauce": the ingredient links to it. */
  recipe?: string
}

export interface IngredientGroup {
  /** e.g. "Pasta & Sauce". Omit when a recipe has just one list. */
  title?: string
  items: Ingredient[]
}

/** The full recipe, shown on its page. Recipes without one show a "coming soon" page. */
export interface RecipeDetails {
  /** Omit for things like sauces that don't have servings. */
  serves?: number
  ingredients: IngredientGroup[]
  steps: string[]
  notes?: string
}

export interface Recipe {
  slug: string
  name: string
  category: Category
  /** One- or two-line description, shown on the card and under the title on the recipe page. */
  blurb: string
  totalMinutes: number
  /** Path relative to /public, e.g. "photos/tuscan-herb-farfalline.jpg". Omit for the placeholder art. */
  photo?: string
  tags?: string[]
  /** Printable cookbook page, relative to /public, e.g. "pdfs/tuscan-herb-farfalline.pdf". Adds a Save button. */
  pdf?: string
  details?: RecipeDetails
}

// Recipes with `details` are real; the rest are placeholders to fill out the grid until they're written up.
export const recipes: Recipe[] = [
  {
    slug: 'tuscan-herb-farfalline',
    name: 'Tuscan Herb Farfalline',
    category: 'Mains',
    blurb: 'Little butterfly pasta in a creamy, garlicky Tuscan herb sauce, with seared Cajun sausage and wilted spinach.',
    totalMinutes: 25,
    photo: 'photos/tuscan-herb-farfalline.jpg',
    tags: ['pasta', 'creamy', 'spinach', 'sausage'],
    pdf: 'pdfs/tuscan-herb-farfalline.pdf',
    details: {
      serves: 2,
      ingredients: [
        {
          title: 'Sausage & Greens',
          items: [
            { amount: '2 links', item: 'Beyond Sun Sausage, Cajun, frozen' },
            { amount: '1 tbsp', item: 'olive oil (rosemary garlic preferred)' },
            { amount: '2 cups', item: 'fresh spinach, packed' },
            { amount: '2 cloves', item: 'garlic' },
          ],
        },
        {
          title: 'Pasta & Sauce',
          items: [
            { amount: '6 oz', item: 'farfalline pasta' },
            { amount: '1 tbsp', item: "vegan butter (Miyoko's preferred)" },
            { amount: '2 tsp', item: 'Better Than Bouillon, vegetable' },
            { amount: '2 tbsp', item: 'Cashew Cream Sauce', recipe: 'cashew-cream-sauce' },
            { amount: '1–2 tbsp', item: 'dairy-free Boursin, Garlic & Herb' },
            { amount: '2 cups', item: 'LivWell Creamy Tuscan Herb sauce' },
          ],
        },
        {
          title: 'To Finish',
          items: [
            { amount: '¼ cup', item: 'shredded vegan Parmesan' },
            { item: 'Garlic salt and black pepper, to taste' },
            { item: 'Red pepper flakes (optional)' },
          ],
        },
      ],
      steps: [
        'Air fry the sausages straight from frozen at 400°F for 10 minutes. Let them rest for a few minutes, then slice into coins.',
        'Meanwhile, bring a pot of salted water to a boil and cook the farfalline until al dente, about 9 minutes. While everything cooks, mince the garlic.',
        'Heat the olive oil in a skillet over medium-high heat. Sear the sausage coins until browned, 2–3 minutes per side.',
        'Add the spinach to the same pan and stir until mostly wilted. Add the garlic and cook until fragrant, about 30 seconds. Take the pan off the heat.',
        'Drain the pasta, leaving about ¼ cup of cooking water in the pot. Add the butter, bouillon, cashew cream, Boursin, and Tuscan herb sauce, and stir until it comes together into a silky sauce.',
        'Stir in the Parmesan, garlic salt, pepper, and red pepper flakes if using. Return the pot to the heat for 30 seconds to melt everything together.',
        'Fold in the sausage and spinach, and serve: a creamy pasta with a kick!',
      ],
      notes:
        'The bouillon and sausage are already salty, so taste before adding garlic salt. The Cajun sausage brings its own kick, so add red pepper flakes only if you want more heat.',
    },
  },
  {
    slug: 'cashew-cream-sauce',
    name: 'Cashew Cream Sauce',
    category: 'Sauces',
    blurb: 'A silky, savory cream made from boiled cashews: the dairy-free secret behind creamy pastas and sauces.',
    totalMinutes: 30,
    photo: 'photos/cashew-cream-sauce.jpg',
    tags: ['sauce', 'cashew', 'cream', 'dairy-free', 'base'],
    pdf: 'pdfs/cashew-cream-sauce.pdf',
    details: {
      ingredients: [
        {
          items: [
            { amount: '1 cup', item: 'raw unsalted cashews' },
            { amount: '1 cup', item: 'water' },
            { amount: '1 tsp', item: 'lemon juice' },
            { amount: '1 tsp', item: 'salt' },
            { amount: '1 tsp', item: 'nutritional yeast' },
          ],
        },
      ],
      steps: [
        'Boil the cashews in a pot for 20 minutes. Remove them from the pot and let them cool.',
        "Once cooled, blend the boiled cashews with the water, lemon juice, salt, and nutritional yeast. The recipe's measurements are suggestions, so season to your taste.",
      ],
      notes:
        "Tasting too much cashew flavor? Add lemon juice. Tasting too bland? Add salt or nutritional yeast. Too thick? Add water. Too thin? The mixture will thicken naturally over time. Worst case, start over!",
    },
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
