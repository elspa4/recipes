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
  /** For recipes that yield pieces instead of servings, e.g. 12 egg bites. Shown as "Makes 12". */
  makes?: number
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
  /** Omit for "coming soon" recipes that haven't been written up yet. */
  totalMinutes?: number
  /** Path relative to /public, e.g. "photos/tuscan-herb-farfalline.jpg". Omit for the placeholder art. */
  photo?: string
  tags?: string[]
  /** Printable cookbook page, relative to /public, e.g. "pdfs/tuscan-herb-farfalline.pdf". Adds a Save button. */
  pdf?: string
  details?: RecipeDetails
}

// Recipes with `details` are written up; the rest show a "Coming Soon" badge until they are.
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
        'Air fry 2 sausage links straight from frozen at 400°F for 10 minutes. Let them rest for a few minutes, then slice into coins.',
        'Meanwhile, bring a pot of salted water to a boil and cook 6 oz farfalline until al dente, about 9 minutes. While everything cooks, mince 2 cloves of garlic.',
        'Heat 1 tbsp olive oil in a skillet over medium-high heat. Sear the sausage coins until browned, 2–3 minutes per side.',
        'Add 2 cups spinach to the same pan and stir until mostly wilted. Add the garlic and cook until fragrant, about 30 seconds. Take the pan off the heat.',
        'Drain the pasta, leaving about ¼ cup of cooking water in the pot. Add 1 tbsp butter, 2 tsp bouillon, 2 tbsp cashew cream, 1–2 tbsp Boursin, and 2 cups Tuscan herb sauce, and stir until it comes together into a silky sauce.',
        'Stir in ¼ cup Parmesan, garlic salt, pepper, and red pepper flakes if using. Return the pot to the heat for 30 seconds to melt everything together.',
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
        'Boil 1 cup cashews in a pot for 20 minutes. Remove them from the pot and let them cool.',
        "Once cooled, blend the boiled cashews with 1 cup water, 1 tsp lemon juice, 1 tsp salt, and 1 tsp nutritional yeast. The recipe's measurements are suggestions, so season to your taste.",
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
        'Make ½ cup basmati rice per the instructions on the bag. Be sure to rinse the dry rice until the water runs clear before cooking, then boil it or cook it in a rice cooker.',
        'While the rice is cooking, press 2/3 block of tofu and chop it into small cubes. Season with 1 tsp soy sauce, garlic salt, cayenne pepper, and mushroom seasoning, then toss with 1 tbsp cornstarch until coated. I recommend throwing it all in a Tupperware and shaking it up.',
        'Add 1 tbsp olive oil and the tofu to a pan over medium-high heat, and cook until the edges turn a lovely golden brown. I like to do this in a wok if you have one. Once done, set aside.',
        'In another pan, add ¼ cup chopped onion and olive oil. Cook down until translucent, and then add 2 tbsp butter and 1 clove garlic. Cook until fragrant. Add 1 jar tikka masala sauce and 2 tbsp cashew cream, and stir until combined.',
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
        'Butter 2 slices of sourdough bread lightly, and then add them to a pan. Turn them over as they turn golden brown, and add them to a plate.',
        'Cut the avocado into thin slices. You really only need a couple, depending on the size of your bread.',
        'Shape your Impossible sausage to the size of your bread, and cook it in the pan you used for your bread until browned on both sides.',
        'Mix ketchup and mayo to make a spread. Spread it on both sides of your toasts.',
        'Add your fillings: sausage, egg & cheese, and avocado on top.',
      ],
    },
  },
  {
    slug: 'tomato-sausage-egg-bites',
    name: 'Tomato Sausage Egg Bites',
    category: 'Breakfast',
    blurb: 'Flaky puff pastry cups filled with sausage, cherry tomatoes, onion and melty cheese, baked into fluffy egg bites.',
    totalMinutes: 45,
    photo: 'photos/tomato-sausage-egg-bites.jpg',
    tags: ['breakfast', 'egg', 'sausage', 'tomato', 'puff pastry', 'cheese', 'brunch', 'make ahead'],
    pdf: 'pdfs/tomato-sausage-egg-bites.pdf',
    details: {
      makes: 12,
      ingredients: [
        {
          title: 'Filling',
          items: [
            { amount: '1 tbsp', item: 'olive oil' },
            { amount: '½', item: 'yellow onion, diced' },
            { amount: '1 cup', item: 'cherry tomatoes, quartered' },
            { amount: '½ roll', item: 'Impossible Sausage savory roll (about 7 oz)' },
            { amount: '¼ cup', item: 'dairy-free Boursin, Garlic & Herb' },
            { amount: '½ cup', item: 'shredded dairy-free cheddar, divided (recommend Violife)' },
            { amount: '¼ cup', item: 'dairy-free Parmesan, divided (recommend Follow Your Heart)' },
          ],
        },
        {
          title: 'Cups & Egg',
          items: [
            { amount: '2 sheets', item: 'puff pastry, thawed' },
            { amount: '1 bottle', item: 'Just Egg (12 oz)' },
            { amount: '¼ cup', item: 'Cashew Cream', recipe: 'cashew-cream-sauce' },
            { item: 'Salt and pepper' },
          ],
        },
      ],
      steps: [
        'Preheat your oven to 350°F.',
        'Dice ½ yellow onion, and chop 1 cup cherry tomatoes into fourths.',
        'Pan-sear the onions in 1 tbsp olive oil until they turn translucent. In the same pan, add ½ roll (about 7 oz) Impossible sausage and the tomatoes. Break up the sausage into crumbles, and cook until golden brown.',
        'Cut circles out of 2 sheets of puff pastry, roughly three inches in diameter. Place them into the cups of a cupcake baking pan.',
        'Add ¼ cup Boursin and half of the shredded cheeses (¼ cup cheddar and 2 tbsp Parmesan) to your mixture, and then fill the puff pastry cups with it.',
        'In a bowl, add 1 bottle (12 oz) Just Egg and ¼ cup cashew cream. Season with salt and pepper.',
        'Pour the egg mix into each cup, and top with the rest of the shredded cheeses (¼ cup cheddar and 2 tbsp Parmesan).',
        'Bake for 25–30 minutes, or until the egg stops being jiggly.',
      ],
      notes:
        "If you don't want to make cashew cream, feel free to use a dairy-free milk. To reheat, simply pop them in the air fryer for a few minutes.",
    },
  },
  {
    slug: 'easiest-steak-fried-rice',
    name: 'Easiest Steak Fried Rice',
    category: 'Mains',
    blurb: 'Plant-based steak tips seared with crispy veggie fried rice, all in one pan.',
    totalMinutes: 8,
    photo: 'photos/easiest-steak-fried-rice.jpg',
    tags: ['rice', 'fried rice', 'steak', 'one pan', 'quick', 'easy', 'weeknight'],
    pdf: 'pdfs/easiest-steak-fried-rice.pdf',
    details: {
      ingredients: [
        {
          items: [
            { amount: '½ bag', item: "Trader Joe's Vegetable Fried Rice" },
            { amount: '½ tbsp', item: 'olive oil' },
            { amount: '1 cup', item: 'Beyond Steak Tips (Original or Korean BBQ)' },
            { item: 'Soy sauce' },
            { item: 'Kimono Mom Umami sauce' },
            { item: 'Sesame oil' },
          ],
        },
      ],
      steps: [
        'Put ½ bag of fried rice into the pan with ½ tbsp olive oil and 1 cup of Beyond Steak Tips.',
        'Pan-sear until the rice is crispy and the tips are golden brown, usually about 5–8 minutes.',
        'Turn the heat off and season to taste with your sauces. Yeah, that’s it.',
      ],
      notes:
        'Picture the scene. It’s a long day of work. You’re tired. You have no idea what to eat. You’re hungry.',
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
        'Make the “crab.” Shred or thinly chop 1/3 block of tofu into tiny strips. I aim for about 1 inch long and very narrow. Crumble some nori, and season with Old Bay, soy sauce, gyoza sauce, mayo, a little bit of sriracha, sesame seeds, and sesame oil. Mixy mixy, but try to maintain the tofu’s shape. You want enough for a light sauce, but not a soup.',
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
  // ── Coming soon: not written up yet (no details), so they show a "Coming Soon" badge ──
  {
    slug: 'starfall-sugar-cookies',
    name: 'Starfall Sugar Cookies',
    category: 'Desserts',
    blurb: 'Soft, chewy sugar cookies loaded with crushed Oreos, white chocolate, and chocolate chips.',
    tags: ['cookies', 'oreo', 'white chocolate', 'chocolate chip', 'baking', 'sweet'],
  },
  {
    slug: 'spaghetti-and-meatballs',
    name: 'Homemade Spaghetti & Meatballs',
    category: 'Mains',
    blurb: 'Plant-based meatballs simmered in a rich tomato sauce over a tangle of spaghetti.',
    tags: ['pasta', 'spaghetti', 'meatballs', 'tomato', 'italian'],
  },
  {
    slug: 'spicy-ramen',
    name: 'Spicy Ramen',
    category: 'Soups',
    blurb: 'A fiery, savory broth with springy noodles and all the toppings.',
    tags: ['ramen', 'noodles', 'spicy', 'soup', 'japanese'],
  },
  {
    slug: 'filet-mignon-caesar-salad',
    name: 'Filet Mignon & Caesar Salad',
    category: 'Mains',
    blurb: 'A seared plant-based filet served alongside a crisp, garlicky Caesar salad.',
    tags: ['steak', 'filet', 'caesar', 'salad', 'dinner'],
  },
  {
    slug: 'vodka-sausage-pasta-spinach-ravioli',
    name: 'Vodka Sausage Pasta & Spinach Ravioli',
    category: 'Mains',
    blurb: 'Spinach ravioli and seared sausage in a silky, blush-pink vodka sauce.',
    tags: ['pasta', 'vodka sauce', 'sausage', 'ravioli', 'spinach', 'italian'],
  },
  {
    slug: 'homemade-cream-pasta',
    name: 'Homemade Cream Pasta',
    category: 'Mains',
    blurb: 'Pasta in a velvety, dairy-free cream sauce, made from scratch.',
    tags: ['pasta', 'cream sauce', 'homemade', 'italian'],
  },
  {
    slug: 'savory-breakfast-scramble',
    name: 'Savory Breakfast Scramble',
    category: 'Breakfast',
    blurb: 'A hearty, savory scramble to start the day right.',
    tags: ['breakfast', 'scramble', 'egg', 'savory'],
  },
]
