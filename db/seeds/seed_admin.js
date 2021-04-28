
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('admin').del()
    .then(function () {
      // Inserts seed entries
      return knex('admin').insert([
        {
          id: 1, 
          email: 'allison2spartamath@gmail.com',
          password: 'allichi'
        },
        {
          id: 2, 
          email: 'obivincent72@gmail.com',
          password: 'vinchris'
        }
      ]);
    });
};
