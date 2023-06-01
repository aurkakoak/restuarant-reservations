exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('restaurants').del()

  // Inserts new entries
  await knex('restaurants').insert([
    {id: 1, name: 'The Italian Kitchen', email: 'contact@italiankitchen.com'},
    {id: 2, name: 'Burger Heaven', email: 'info@burgerheaven.com'},
    {id: 3, name: 'Sushi World', email: 'contact@sushiworld.com'},
    {id: 4, name: 'Peking Palace', email: 'info@pekingpalace.com'},
    {id: 5, name: 'Taco Fiesta', email: 'contact@tacofiesta.com'},
    {id: 6, name: 'Indian Spice', email: 'info@indianspice.com'},
    {id: 7, name: 'Pizza Paradise', email: 'contact@pizzaparadise.com'},
    {id: 8, name: 'Seafood Shack', email: 'info@seafoodshack.com'},
    {id: 9, name: 'Steak House', email: 'contact@steakhouse.com'},
    {id: 10, name: 'Vegan Delights', email: 'info@vegandelights.com'},
    {id: 11, name: 'Diner Deluxe', email: 'contact@dinerdeluxe.com'},
    {id: 12, name: 'BBQ Barn', email: 'info@bbqbarn.com'},
    {id: 13, name: 'Greek Taverna', email: 'contact@greektaverna.com'},
    {id: 14, name: 'French Bistro', email: 'info@frenchbistro.com'},
    {id: 15, name: 'Bagel Boutique', email: 'contact@bagelboutique.com'},
    {id: 16, name: 'Donut Den', email: 'info@donutden.com'},
    {id: 17, name: 'Cafe Comfort', email: 'contact@cafecomfort.com'},
    {id: 18, name: 'Middle Eastern Magic', email: 'info@middleeasternmagic.com'},
    {id: 19, name: 'Thai Tastes', email: 'contact@thaitastes.com'},
    {id: 20, name: 'Vietnamese Village', email: 'info@vietnamesevillage.com'},
  ]);
};
