exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('restaurants').del()
  await knex('restaurants').insert([
    {id: 1, name: 'test restaurant 1', email: 'test@test.com'},
  ]);
};
