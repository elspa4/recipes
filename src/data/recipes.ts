export type Category = 'Breakfast' | 'Mains' | 'Sides' | 'Sauces' | 'Soups' | 'Desserts' | 'Drinks'

/** The order categories appear on the home page: mains first, drinks last. */
export const CATEGORY_ORDER: Category[] = ['Mains', 'Sides', 'Soups', 'Breakfast', 'Sauces', 'Desserts', 'Drinks']

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
    slug: 'tofu-tikka-masala',
    name: 'Tofu Tikka Masala',
    category: 'Mains',
    blurb:
      'Crispy, golden tofu over fluffy basmati with a rich, creamy tikka masala sauce and a crackly scallion pancake on the side.',
    totalMinutes: 35,
    photo: 'photos/tofu-tikka-masala.jpg',
    tags: ['tofu', 'curry', 'indian', 'rice', 'creamy', 'tikka masala'],
    pdf: 'pdfs/tofu-tikka-masala.pdf',
    details: {
      ingredients: [
        {
          title: 'Crispy Tofu',
          items: [
            { amount: '2/3 block', item: 'firm tofu' },
            { amount: '1 tbsp', item: 'cornstarch' },
            { amount: '1 tsp', item: 'soy sauce' },
            { item: 'Garlic salt' },
            { item: "Trader Joe's Mushroom seasoning" },
            { item: 'Cayenne powder' },
            { amount: '1 tbsp', item: 'olive oil' },
          ],
        },
        {
          title: 'Masala Sauce',
          items: [
            { amount: '¼ cup', item: 'yellow onion, chopped' },
            { item: 'Olive oil' },
            { amount: '2 tbsp', item: "plant butter (Miyoko's recommended)" },
            { amount: '1 clove', item: 'garlic' },
            { amount: '1 jar', item: 'Maya Kaimal Vegan Tikka Masala' },
            { amount: '2 tbsp', item: 'Cashew Cream', recipe: 'cashew-cream-sauce' },
          ],
        },
        {
          title: 'To Serve',
          items: [
            { amount: '½ cup', item: 'basmati rice' },
            { amount: '1', item: "Trader Joe's scallion pancake" },
          ],
        },
      ],
      steps: [
        'Make the rice per the instructions on the bag. Be sure to rinse the dry rice until the water runs clear before cooking, then boil it or cook it in a rice cooker.',
        'While the rice is cooking, press the tofu and chop it into small cubes. Season with soy sauce, garlic salt, cayenne pepper, and mushroom seasoning, then toss with cornstarch until coated. I recommend throwing it all in a Tupperware and shaking it up.',
        'Add the olive oil and tofu to a pan over medium-high heat, and cook until the edges turn a lovely golden brown. I like to do this in a wok if you have one. Once done, set aside.',
        'In another pan, add the chopped onion and olive oil. Cook down until translucent, and then add the butter and garlic. Cook until fragrant. Add the tikka masala sauce and your cashew cream, and stir until combined.',
        'Pan-sear the scallion pancake until browned on both sides.',
        'To plate, add rice to one half of the bowl and the sauce to the other. Drizzle extra cashew cream over it, to be fancy. Add the tofu on top of the rice. Cut the scallion pancake into slices, and add them on the side.',
      ],
    },
  },
  {
    slug: 'savory-breakfast-toastie',
    name: 'Savory Breakfast Toastie',
    category: 'Breakfast',
    blurb:
      'Golden sourdough stacked with a seared sausage patty, an egg, smoked gouda, and avocado, with a tangy spread.',
    totalMinutes: 20,
    photo: 'photos/savory-breakfast-toastie.jpg',
    tags: ['breakfast', 'sandwich', 'toast', 'egg', 'sausage', 'avocado', 'cheese'],
    pdf: 'pdfs/savory-breakfast-toastie.pdf',
    details: {
      serves: 1,
      ingredients: [
        {
          title: 'Toast',
          items: [
            { amount: '2 slices', item: 'sourdough bread' },
            { item: "Plant-based butter (recommend Miyoko's spreadable oat butter)" },
            { item: 'Ketchup' },
            { item: "Plant-based mayo (recommend Hellmann's)" },
          ],
        },
        {
          title: 'Fillings',
          items: [
            { item: 'Just Egg' },
            { item: 'Dairy-free smoked gouda cheese (recommend Follow Your Heart)' },
            { item: 'Impossible sausage roll' },
            { item: 'Avocado' },
            { item: 'Salt and pepper' },
            { item: 'Nonstick spray' },
          ],
        },
      ],
      steps: [
        'You know those little tiny pans that are for one single egg? Spray one with nonstick spray, then add your Just Egg. Season with salt and pepper.',
        'When one side of your egg is cooked, flip it over and add your cheese slice so it gets nice and melty.',
        'Butter your sourdough bread slices lightly, and then add them to a pan. Turn them over as they turn golden brown, and add them to a plate.',
        'Cut the avocado into thin slices. You really only need a couple, depending on the size of your bread.',
        'Shape your Impossible sausage to the size of your bread, and cook it in the pan you used for your bread until browned on both sides.',
        'Mix ketchup and mayo to make a spread. Spread it on both sides of your toasts.',
        'Add your fillings: sausage, egg & cheese, and avocado on top.',
      ],
    },
  },
  {
    slug: 'crispy-crab-roll',
    name: 'Crispy “Crab” Roll',
    category: 'Mains',
    blurb:
      'A panko-fried sushi roll filled with spicy tofu “crab,” cucumber and avocado, finished with spicy mayo and unagi sauce.',
    totalMinutes: 45,
    photo: 'photos/crispy-crab-roll.jpg',
    tags: ['sushi', 'tofu', 'crab', 'fried', 'crispy', 'japanese', 'roll', 'spicy mayo'],
    pdf: 'pdfs/crispy-crab-roll.pdf',
    details: {
      ingredients: [
        {
          title: '“Crab”',
          items: [
            { amount: '1/3 block', item: 'firm tofu' },
            { item: 'Old Bay seasoning' },
            { item: 'Soy sauce' },
            { item: 'Gyoza sauce' },
            { item: "Plant-based mayo (highly recommend Hellmann's)" },
            { item: 'Sriracha' },
            { item: 'Sesame seeds' },
            { item: 'Sesame oil (recommend Kikkoman)' },
            { item: 'A little crumbled nori' },
          ],
        },
        {
          title: 'Roll',
          items: [
            { item: 'Sushi rice (recommend microwaveable)' },
            { item: 'Nori sheets' },
            { item: 'Cucumber' },
            { item: 'Avocado' },
            { item: 'Rice wine vinegar (optional)' },
          ],
        },
        {
          title: 'Batter & Fry',
          items: [
            { item: 'Flour' },
            { item: 'Cornstarch' },
            { item: 'Water' },
            { item: 'Panko' },
            { item: 'Vegetable oil, for frying' },
          ],
        },
        {
          title: 'To Top',
          items: [
            { item: 'Spicy mayo (plant-based mayo + a touch of sriracha)' },
            { item: 'Unagi sauce' },
          ],
        },
      ],
      steps: [
        'Microwave the sushi rice. Open it and let it cool.',
        'Make the “crab.” Shred or thinly chop the tofu into tiny strips. I aim for about 1 inch long and very narrow. Crumble some nori, and season with Old Bay, soy sauce, gyoza sauce, mayo, a little bit of sriracha, sesame seeds, and sesame oil. Mixy mixy, but try to maintain the tofu’s shape. You want enough for a light sauce, but not a soup.',
        'Thinly chop the cucumber into little chopsticks.',
        'Cut an avocado in half, and use a knife to divide it into thin slices. Remove the slices and set aside.',
        'Mix more spicy mayo: add mayo and then a touch of sriracha, and combine. Set aside.',
        'Lay out plastic wrap, slightly larger than your nori sheet.',
        'Wet your hands with water (and rice wine vinegar, if you happen to have it). Spread the sushi rice on your nori sheet in a thin layer. Carefully flip the sheet rice-side down onto your plastic wrap.',
        'In the middle of your roll, add your crab, cucumber, and avocado in a thin line across the sheet.',
        'Then, roll your sushi up using the plastic wrap. Give it a little press.',
        'Now, in a flat dish, mix together water, flour, and cornstarch until you form a soup.',
        'In another dish, put out some panko.',
        'Get a pan that is large enough to fit your entire sushi roll. Fill it with about an inch of vegetable oil, and turn on the heat.',
        'Carefully roll your sushi roll in the flour soup, and then in the panko.',
        'Add your breaded sushi roll to the bubbling oil to deep fry it. Carefully roll it until each side is golden brown.',
        'Remove from the pan, and slice with a sushi knife.',
        'Top with your spicy mayo and unagi sauce.',
      ],
    },
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
